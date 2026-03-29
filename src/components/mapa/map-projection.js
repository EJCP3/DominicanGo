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

    // Cálculo dinámico del centro (Ahora es instantáneo porque el archivo es ligero)
    geojsonData.features.forEach((f) => {
        if (!f.geometry || !f.geometry.coordinates) return;

        const coords = f.geometry.type === 'MultiPolygon'
            ? f.geometry.coordinates
            : [f.geometry.coordinates];

        coords.forEach((p) =>
            p.forEach((r) =>
                r.forEach(([lng, lat]) => {
                    if (lng < minLng) minLng = lng;
                    if (lng > maxLng) maxLng = lng;
                    if (lat < minLat) minLat = lat;
                    if (lat > maxLat) maxLat = lat;
                })
            )
        );
    });

    const PADDING = 20;
    const scaleX = (width - 2 * PADDING) / (maxLng - minLng);
    const scaleY = (height - 2 * PADDING) / (maxLat - minLat);
    const scale = Math.min(scaleX, scaleY);

    // Calcula los márgenes para centrar el mapa exactamente en el SVG
    const offX = PADDING + ((width - 2 * PADDING) - (maxLng - minLng) * scale) / 2;
    const offY = PADDING + ((height - 2 * PADDING) - (maxLat - minLat) * scale) / 2;

    return (coord) => {
        const px = offX + ((coord[0] - minLng) * scale);
        const py = offY + ((maxLat - coord[1]) * scale);
        return [px, py];
    };
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
