/**
 * SVG Map Renderer
 * Handles GeoJSON parsing, drawing SVG paths, and POI overlays
 * with performance optimizations to avoid blocking the main thread.
 */

import {
  nameToSlug,
  provinceColors,
  dataProvinces,
  displayNames,
} from './map-config';

// Import projection, simplification and centroid utilities
import { computeProjection, simplifyRing, computeRingCenter } from './map-projection';

const DR_GEOJSON_LINK = 'https://raw.githubusercontent.com/jeasoft/provinces_geojson/master/provinces_municipality_summary.geojson';

export async function loadAndRenderMap(svgElement, overlayContainerId, onProvinceClick = null) {
  if (!svgElement) return;
  const overlayContainer = document.getElementById(overlayContainerId);

  // Hardcoded SVG canvas dimensions to match the design (MapSection.astro)
  const SVG_WIDTH = 960;
  const SVG_HEIGHT = 500;

  try {
    const response = await fetch(DR_GEOJSON_LINK);
    // Deep-clone the parsed JSON to prevent any mutation of the shared object
    // across re-renders, which is a primary cause of non-deterministic color assignment.
    const data = JSON.parse(JSON.stringify(await response.json()));

    // 0. Clear previous SVG content to avoid duplicates on re-render
    const provincesGroup = document.getElementById('provinces-group');
    const labelsGroup = document.getElementById('labels-group');
    if (provincesGroup) provincesGroup.innerHTML = '';
    if (labelsGroup) labelsGroup.innerHTML = '';
    
    // Normalize mapping dictionary for comparison
    const normalizedNameToSlug = {};
    for (const [key, val] of Object.entries(nameToSlug)) {
      normalizedNameToSlug[key.normalize('NFC').toUpperCase()] = val;
    }

    const projection = computeProjection(data, SVG_WIDTH, SVG_HEIGHT);
    if (!projection) return;

    // Use a DocumentFragment to minimize reflows during DOM insertion
    const fragment = document.createDocumentFragment();

    data.features.forEach((feature) => {
      // 1. Process Geometry & Path String
      let d = '';
      if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates.forEach((ring) => {
          const projectedRing = ring.map(projection);
          const simpleRing = simplifyRing(projectedRing, 1.5); // Tune tolerance
          d +=
            'M' + simpleRing.map((c) => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join('L') + 'Z ';
        });
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => {
            const projectedRing = ring.map(projection);
            const simpleRing = simplifyRing(projectedRing, 1.5);
            d +=
              'M' + simpleRing.map((c) => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join('L') + 'Z ';
          });
        });
      }

      // 2. Map Name to Config — STRICT lookup, no invented slugs.
      const rawProp = feature.properties ? (feature.properties.province_name || feature.properties.PROV || '') : '';
      const rawName = String(rawProp).trim().normalize('NFC').toUpperCase();
      const slug = normalizedNameToSlug[rawName] || null;

      const hasData = slug !== null && dataProvinces.has(slug);
      // Static fallback color — never dynamic, so unmapped provinces always render the same
      const color = slug ? (provinceColors[slug] ?? '#CCCCCC') : '#CCCCCC';

      // 3. Create SVG Path element
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d.trim());
      path.setAttribute('fill', color);
      path.setAttribute('data-province', slug);
      path.setAttribute('data-name', rawName);

      // Modern sleek stroke
      path.setAttribute('stroke', 'oklch(var(--b1))');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('stroke-linejoin', 'round');

      path.classList.add('transition-all', 'duration-300', 'origin-center');
      if (hasData) {
        path.classList.add('cursor-pointer', 'hover:brightness-95', 'focus:outline-none', 'map-province');
        // Agregamos tabIndex pasivo para mostrar estilo de teclado
        path.setAttribute('tabindex', '0');

        if (onProvinceClick) {
          path.addEventListener('click', () => onProvinceClick(slug));
          path.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') onProvinceClick(slug);
          });
        }
      } else {
        path.classList.add('pointer-events-none');
      }

      fragment.appendChild(path);

      // 4. Find largest polygon ring for placing the visual text label
      let largestRing = null;
      let maxArea = 0;

      const checkRing = (ring) => {
        // crude bbox area for finding biggest ring
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        ring.forEach(c => {
          if (c[0] < minX) minX = c[0]; if (c[0] > maxX) maxX = c[0];
          if (c[1] < minY) minY = c[1]; if (c[1] > maxY) maxY = c[1];
        });
        const area = (maxX - minX) * (maxY - minY);
        if (area > maxArea) {
          maxArea = area;
          largestRing = ring;
        }
      };

      if (feature.geometry.type === 'Polygon') {
        checkRing(feature.geometry.coordinates[0]);
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((p) => checkRing(p[0]));
      }

      const labelText = displayNames[slug];
      if (largestRing && labelText) {
        const projectedRing = largestRing.map(projection);
        const center = computeRingCenter(projectedRing);

        // Render SVG label precisely over the SVG (for ALL provinces that have a display name)
        renderOverlays(labelsGroup, center, slug, color);
      }
    });

    // Add all paths to the correct SVG group to preserve z-index (labels on top)
    if (provincesGroup) provincesGroup.appendChild(fragment);
    else svgElement.appendChild(fragment);

    // Render geographic overlay features (lakes, islands)
    renderGeographicFeatures(projection);

  } catch (err) {
    console.error('Error loading GeoJSON:', err);
  }
}

/**
 * Render extra geographic labels and shapes after provinces are drawn:
 * - Bahía de Samaná
 * - Lago Enriquillo
 * - Isla Saona, Isla Catalina, Isla Beata
 */
function renderGeographicFeatures(projection) {
  const group = document.getElementById('overlays-group') || document.getElementById('labels-group');
  if (!group) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function addLabel(lngDeg, latDeg, text, fontSize = 6, opacity = 0.8, color = '#5ba8c4') {
    const [x, y] = projection([lngDeg, latDeg]);
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('x', x.toFixed(1));
    t.setAttribute('y', y.toFixed(1));
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

  // Bahía de Samaná
  addLabel(-69.45, 19.08, 'Bahía de Samaná', 6.5, 0.75);
  addLabel(-71.65, 18.52, 'L. Enriquillo', 5, 0.9, '#1a6070');
  // Islands — italic text labels only
  addLabel(-68.67, 18.14, 'Isla Saona', 5.5, 0.75, '#4a8a96');
  addLabel(-68.97, 18.37, 'Isla Catalina', 5, 0.75, '#4a8a96');
  addLabel(-71.52, 17.62, 'Isla Beata', 5.5, 0.75, '#4a8a96');
}

/**
 * Renders SVG text labels precisely over the geographic paths
 */
function renderOverlays(labelsGroup, center, slug, color) {
  const shortName = displayNames[slug] || slug.toUpperCase();

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', center[0].toFixed(0));
  text.setAttribute('y', center[1].toFixed(0));
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('fill', '#5a7a6e');
  text.setAttribute('font-size', '6');
  text.setAttribute('font-family', "'Outfit', sans-serif");
  text.setAttribute('font-weight', '600');
  text.setAttribute('letter-spacing', '0.5');
  text.setAttribute('class', 'pointer-events-none');
  text.textContent = shortName;

  labelsGroup.appendChild(text);
}
