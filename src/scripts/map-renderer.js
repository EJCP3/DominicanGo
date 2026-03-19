/**
 * Map Renderer
 * Loads GeoJSON data and renders province SVG paths into the map container.
 * Also renders geographic overlays: water bodies, islands.
 */
import {
    nameToSlug,
    provinceColors,
    dataProvinces,
    displayNames,
    GEOJSON_URL,
} from './map-config.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_WIDTH = 960;
const SVG_HEIGHT = 500;
const PADDING = 40;
const MAX_POINTS_PER_RING = 120;

/**
 * Fetch the GeoJSON and render all province paths + labels into the SVG.
 */
export async function loadAndRenderMap() {
    const provincesGroup = document.getElementById('provinces-group');
    const labelsGroup = document.getElementById('labels-group');
    const loadingText = document.getElementById('map-loading');

    if (!provincesGroup || !labelsGroup) return;

    try {
        const res = await fetch(GEOJSON_URL);
        const geojson = await res.json();
        const features = geojson.features;

        const { px, py } = computeProjection(features);

        features.forEach((f) => {
            renderProvince(f, px, py, provincesGroup, labelsGroup);
        });

        if (loadingText) loadingText.remove();

        // After provinces, add geographic overlays (water, islands)
        renderOverlays(px, py);
    } catch (err) {
        console.error('Failed to load GeoJSON map:', err);
        const loadingText = document.getElementById('map-loading');
        if (loadingText) loadingText.textContent = 'Error al cargar el mapa';
    }
}

/**
 * Compute projection from bounding box into SVG coordinates.
 */
function computeProjection(features) {
    let minLng = Infinity,
        maxLng = -Infinity,
        minLat = Infinity,
        maxLat = -Infinity;

    features.forEach((f) => {
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

    const scaleX = (SVG_WIDTH - 2 * PADDING) / (maxLng - minLng);
    const scaleY = (SVG_HEIGHT - 2 * PADDING) / (maxLat - minLat);
    const scale = Math.min(scaleX, scaleY);
    const offX =
        PADDING + ((SVG_WIDTH - 2 * PADDING) - (maxLng - minLng) * scale) / 2;
    const offY =
        PADDING + ((SVG_HEIGHT - 2 * PADDING) - (maxLat - minLat) * scale) / 2;

    return {
        px: (lng) => offX + (lng - minLng) * scale,
        py: (lat) => offY + (maxLat - lat) * scale,
        scale,
        minLng,
        minLat,
        maxLat,
        offX,
        offY,
    };
}

/**
 * Render a single GeoJSON feature as an SVG path + optional label.
 */
function renderProvince(feature, px, py, provincesGroup, labelsGroup) {
    const name = feature.properties.province_name;
    const slug = nameToSlug[name] || name.toLowerCase().replace(/[^a-z]/g, '-');
    const color = provinceColors[slug] || '#c8dcc8';
    const hasData = dataProvinces.has(slug);

    const coords =
        feature.geometry.type === 'MultiPolygon'
            ? feature.geometry.coordinates
            : [feature.geometry.coordinates];

    let pathD = '';
    let maxArea = 0,
        cx = 0,
        cy = 0;

    coords.forEach((polygon) => {
        polygon.forEach((ring, ri) => {
            const simplified = simplifyRing(ring, MAX_POINTS_PER_RING);
            let d = '';
            simplified.forEach(([lng, lat], i) => {
                d +=
                    (i === 0 ? 'M' : 'L') +
                    px(lng).toFixed(1) +
                    ',' +
                    py(lat).toFixed(1);
            });
            d += 'Z';
            pathD += d + ' ';

            if (ri === 0) {
                const { area, centerX, centerY } = computeRingCenter(ring, px, py);
                if (area > maxArea) {
                    maxArea = area;
                    cx = centerX;
                    cy = centerY;
                }
            }
        });
    });

    // Create SVG <path>
    // stroke matches fill to eliminate white anti-alias gaps between provinces
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('class', 'province-path');
    path.setAttribute('fill', color);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '1');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('d', pathD.trim());
    if (hasData) path.setAttribute('data-province', slug);
    provincesGroup.appendChild(path);

    // Create label <text> for provinces with enough area
    const label = displayNames[slug];
    if (label && maxArea > 100) {
        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', cx.toFixed(0));
        text.setAttribute('y', cy.toFixed(0));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#5a7a6e');
        text.setAttribute('font-size', '6');
        text.setAttribute('font-family', "'Outfit', sans-serif");
        text.setAttribute('font-weight', '600');
        text.setAttribute('letter-spacing', '0.5');
        text.setAttribute('class', 'pointer-events-none');
        text.textContent = label;
        labelsGroup.appendChild(text);
    }
}

/**
 * Render extra geographic labels after provinces are drawn:
 * - Bahía de Samaná (italic text in the water area)
 * - Lago Enriquillo (italic text)
 * - Isla Saona, Isla Catalina, Isla Beata (small shape + label)
 */
function renderOverlays(px, py) {
    const group = document.getElementById('overlays-group');
    if (!group) return;

    /** Add an italic water/geo label */
    function addLabel(lngDeg, latDeg, text, fontSize = 6, opacity = 0.8, color = '#5ba8c4') {
        const t = document.createElementNS(SVG_NS, 'text');
        t.setAttribute('x', px(lngDeg).toFixed(1));
        t.setAttribute('y', py(latDeg).toFixed(1));
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('fill', color);
        t.setAttribute('font-size', fontSize);
        t.setAttribute('font-family', "'Outfit', sans-serif");
        t.setAttribute('font-style', 'italic');
        t.setAttribute('font-weight', '400');
        t.setAttribute('letter-spacing', '0.6');
        t.setAttribute('opacity', opacity);
        t.setAttribute('class', 'pointer-events-none');
        t.textContent = text;
        group.appendChild(t);
    }

    /** Add a tiny island shape + label below it */
    function addIsland(lngDeg, latDeg, rx, ry, labelText) {
        const el = document.createElementNS(SVG_NS, 'ellipse');
        el.setAttribute('cx', px(lngDeg).toFixed(1));
        el.setAttribute('cy', py(latDeg).toFixed(1));
        el.setAttribute('rx', rx);
        el.setAttribute('ry', ry);
        el.setAttribute('fill', '#b0d8dc');
        el.setAttribute('stroke', '#7ab8c4');
        el.setAttribute('stroke-width', '0.6');
        el.setAttribute('class', 'pointer-events-none');
        group.appendChild(el);

        addLabel(lngDeg, latDeg + (ry / 70), labelText, 5.5, 0.75, '#4a8a96');
    }

    // ----------------------------------------------------------------
    // Bahía de Samaná — italic text in the water between the peninsula
    // and the main coast (~lng -69.5, lat 19.05)
    // ----------------------------------------------------------------
    addLabel(-69.45, 19.08, 'Bahía de Samaná', 6.5, 0.75);

    // ----------------------------------------------------------------
    // Lago Enriquillo — distinctive water ellipse + label
    // ----------------------------------------------------------------
    {
        const le = document.createElementNS(SVG_NS, 'ellipse');
        le.setAttribute('cx', px(-71.55).toFixed(1));
        le.setAttribute('cy', py(18.52).toFixed(1));
        // Keep small so it fits inside Bahoruco/Independencia area
        le.setAttribute('rx', '14');
        le.setAttribute('ry', '6');
        le.setAttribute('fill', '#5ab4d0');
        le.setAttribute('fill-opacity', '0.72');
        le.setAttribute('stroke', '#3898b8');
        le.setAttribute('stroke-width', '0.8');
        le.setAttribute('class', 'pointer-events-none');
        group.appendChild(le);
    }
    addLabel(-71.55, 18.52, 'L. Enriquillo', 5, 0.9, '#1a6070');

    // Islands — italic text labels only (no shapes)
    addLabel(-68.67, 18.14, 'Isla Saona', 5.5, 0.75, '#4a8a96');
    addLabel(-68.97, 18.37, 'Isla Catalina', 5, 0.75, '#4a8a96');
    addLabel(-71.52, 17.62, 'Isla Beata', 5.5, 0.75, '#4a8a96');
}

function simplifyRing(ring, maxPoints) {
    const step = Math.max(1, Math.floor(ring.length / maxPoints));
    const pts = [];
    for (let i = 0; i < ring.length; i += step) pts.push(ring[i]);
    if (pts[pts.length - 1] !== ring[ring.length - 1]) {
        pts.push(ring[ring.length - 1]);
    }
    return pts;
}

function computeRingCenter(ring, px, py) {
    let area = 0,
        sx = 0,
        sy = 0;
    for (let i = 0; i < ring.length; i++) {
        const [x1, y1] = [px(ring[i][0]), py(ring[i][1])];
        const j = (i + 1) % ring.length;
        const [x2, y2] = [px(ring[j][0]), py(ring[j][1])];
        area += x1 * y2 - x2 * y1;
        sx += x1;
        sy += y1;
    }
    return {
        area: Math.abs(area) / 2,
        centerX: sx / ring.length,
        centerY: sy / ring.length,
    };
}
