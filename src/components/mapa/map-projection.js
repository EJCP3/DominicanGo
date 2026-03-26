/**
 * map-projection.js
 * Extracted utility functions for D3 map projections and geometry
 */

/**
 * Computes a custom scaled and translated projection for rendering exactly the DR.
 */
export function computeProjection(geojsonData, width, height) {
    if (!geojsonData || !geojsonData.features) return null;

    let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;

    geojsonData.features.forEach((f) => {
        const coords =
            f.geometry.type === 'MultiPolygon'
                ? f.geometry.coordinates
                : [f.geometry.coordinates];
        coords.forEach((p) =>
            p.forEach((r) =>
                r.forEach(([lng, lat]) => {
                    if (lng < minLng) minLng = lng;
                    if (lng > maxLng) maxLng = lng;
                    if (lat < minLat) minLat = lat;
                    if (lat > maxLat) maxLat = lat;
                }),
            ),
        );
    });

    const PADDING = 20;
    const scaleX = (width - 2 * PADDING) / (maxLng - minLng);
    const scaleY = (height - 2 * PADDING) / (maxLat - minLat);
    const scale = Math.min(scaleX, scaleY);
    
    // Calculate offsets to center the map within the SVG viewBox
    const offX = PADDING + ((width - 2 * PADDING) - (maxLng - minLng) * scale) / 2;
    const offY = PADDING + ((height - 2 * PADDING) - (maxLat - minLat) * scale) / 2;

    return (coord) => {
        const px = offX + ((coord[0] - minLng) * scale);
        const py = offY + ((maxLat - coord[1]) * scale); // Invert Y exactly like original
        return [px, py];
    };
}

/**
 * Visvalingam-Whyatt like line simplification to reduce DOM nodes on complex coastlines
 * Essential for good performance on mobile with large GeoJSON files.
 */
export function simplifyRing(ring, tolerance = 0.5) {
    if (ring.length <= 4) return ring; // Triangle is minimum

    // Fast distance function (squared Euclidean)
    const distSq = (a, b) => {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return dx * dx + dy * dy;
    };

    // Calculate perpendicular distance of point from line segment
    const pointLineDistSq = (p, a, b) => {
        const l2 = distSq(a, b);
        if (l2 === 0) return distSq(p, a);
        let t = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / l2;
        t = Math.max(0, Math.min(1, t));
        return distSq(p, [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    };

    // Radial Distance simplification (fast initial pass)
    let newRing = [ring[0]];
    let prevPoint = ring[0];
    for (let i = 1; i < ring.length - 1; i++) {
        if (distSq(ring[i], prevPoint) > tolerance * tolerance) {
            newRing.push(ring[i]);
            prevPoint = ring[i];
        }
    }
    newRing.push(ring[ring.length - 1]);
    return newRing;
}

/**
 * Calculate visual center of polygon using simple centroid method
 */
export function computeRingCenter(ring) {
    let signedArea = 0;
    let cx = 0;
    let cy = 0;
    for (let i = 0; i < ring.length - 1; i++) {
        const x0 = ring[i][0];
        const y0 = ring[i][1];
        const x1 = ring[i + 1][0];
        const y1 = ring[i + 1][1];
        const a = x0 * y1 - x1 * y0;
        signedArea += a;
        cx += (x0 + x1) * a;
        cy += (y0 + y1) * a;
    }
    signedArea *= 0.5;
    if (signedArea === 0) return ring[0];
    cx /= 6 * signedArea;
    cy /= 6 * signedArea;
    return [cx, cy];
}
