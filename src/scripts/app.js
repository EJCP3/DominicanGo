/**
 * Main App Entry Point
 * Wires together the map renderer, province events, modal, and smooth scrolling.
 */
import { loadAndRenderMap } from './map-renderer.js';
import { openModal, closeModal } from './modal.js';
import { provinceColors, displayNames } from './map-config.js';
import { gsap } from 'gsap';


function initApp() {
    // Si no estamos en la página del mapa, salir temprano.
    if (!document.getElementById('map-container')) return;

    const svgElement = document.getElementById('rd-map');
    if (!svgElement) return;

    loadAndRenderMap(svgElement, 'map-container').then(() => {
        // Remove map loading text
        document.getElementById('map-loading')?.remove();
        
        bindProvinceEvents();

        // Reveal Map Animation
        gsap.from(".map-province", {
            duration: 0.8,
            scale: 0.5,
            opacity: 0,
            stagger: 0.015,
            ease: "back.out(1.5)",
            transformOrigin: "50% 50%"
        });
        
        // Ensure SVG label text fades in after the map
        gsap.from("#labels-group text", {
            duration: 0.5,
            opacity: 0,
            delay: 1,
            stagger: 0.01
        });

        // Floating Hero Elements
        gsap.to("#map-compass", { 
            y: -10, 
            repeat: -1, 
            yoyo: true, 
            duration: 2.5, 
            ease: "sine.inOut" 
        });
        
        gsap.to("#hint-bar", { 
            y: -6, 
            repeat: -1, 
            yoyo: true, 
            duration: 2, 
            ease: "sine.inOut" 
        });
    });

    // ====== Smooth Scroll for Anchor Links ======
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ====== Province Hover & Click Events ======
function bindProvinceEvents() {
    const tooltip = document.getElementById('province-tooltip');
    const tooltipText = document.getElementById('tooltip-text');
    const allPaths = document.querySelectorAll('.map-province');
    const provinces = window.__PROVINCES__ || {};

    allPaths.forEach((path) => {
        const slug = path.getAttribute('data-province');

        path.addEventListener('mouseenter', () => {
            if (slug && provinces[slug]) {
                tooltipText.textContent = provinces[slug].name;
            } else {
                const fill = path.getAttribute('fill');
                let foundName = null;
                for (const [s, c] of Object.entries(provinceColors)) {
                    if (c === fill) {
                        foundName = displayNames[s] || s;
                        break;
                    }
                }
                tooltipText.textContent = foundName || 'Provincia';
            }
            if (tooltip) tooltip.style.opacity = '1';
        });

        path.addEventListener('mouseleave', () => {
            if (tooltip) tooltip.style.opacity = '0';
        });

        path.addEventListener('click', () => {
            if (slug && provinces[slug]) {
                openModal(slug, provinces);
            }
        });
    });
}

// Registramos el rastreo de eventos globales SOLO UNA VEZ para evitar fugas CPU.
if (!window._appGlobalEventsInstalled) {
    window._appGlobalEventsInstalled = true;

    // ====== Tooltip Mouse Tracking ======
    document.addEventListener('mousemove', (e) => {
        const tooltip = document.getElementById('province-tooltip');
        if (tooltip && tooltip.style.opacity !== '0') {
            tooltip.style.left = e.clientX + 15 + 'px';
            tooltip.style.top = e.clientY - 10 + 'px';
        }
    }, { passive: true });

    // ====== Modal Close Handlers ======
    window.closeModal = closeModal;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Ejecutar en transiciones SPA
document.addEventListener("astro:page-load", initApp);
