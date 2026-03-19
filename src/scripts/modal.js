/**
 * Modal Controller — Light theme
 * Handles opening, closing, and populating the province detail modal.
 */

let activeProvince = null;

/**
 * Open the province modal with POI data.
 */
export function openModal(provinceId, provincesData) {
  const data = provincesData[provinceId];
  if (!data) return;

  const mapContainer = document.getElementById('map-container');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalPanel = document.getElementById('modal-panel');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalPois = document.getElementById('modal-pois');
  const modalColorDot = document.getElementById('modal-color-dot');
  const tooltip = document.getElementById('province-tooltip');

  // Set active province highlight
  if (activeProvince) {
    activeProvince.classList.remove('active');
  }
  const activePath = document.querySelector(
    `[data-province="${provinceId}"]`,
  );
  if (activePath) {
    activePath.classList.add('active');
    activeProvince = activePath;
  }

  mapContainer?.classList.add('shifted');

  modalTitle.textContent = data.name;
  modalDescription.textContent = data.description;
  modalColorDot.style.backgroundColor = data.color;

  // Build POI cards — light themed
  modalPois.innerHTML = data.pois
    .map(
      (poi) => `
      <div class="poi-card group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white">
        <div class="sm:flex">
          <div class="sm:w-44 h-40 sm:h-auto overflow-hidden flex-shrink-0">
            <img src="${poi.image}" alt="${poi.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          </div>
          <div class="p-4 flex flex-col justify-between flex-1">
            <div>
              <h5 class="font-heading font-semibold text-lg text-gray-800 mb-1">${poi.name}</h5>
              <p class="text-gray-500 text-sm leading-relaxed">${poi.description}</p>
            </div>
            <button class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors group/btn">
              Ver más
              <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `,
    )
    .join('');

  modalOverlay.classList.remove('hidden');
  modalOverlay.classList.add('flex');
  modalPanel.classList.remove('closing');

  if (tooltip) tooltip.style.opacity = '0';
  document.body.style.overflow = 'hidden';
}

/**
 * Close the province modal.
 */
export function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalPanel = document.getElementById('modal-panel');
  const mapContainer = document.getElementById('map-container');

  modalPanel?.classList.add('closing');

  setTimeout(() => {
    modalOverlay?.classList.add('hidden');
    modalOverlay?.classList.remove('flex');
    modalPanel?.classList.remove('closing');
    mapContainer?.classList.remove('shifted');

    if (activeProvince) {
      activeProvince.classList.remove('active');
      activeProvince = null;
    }

    document.body.style.overflow = '';
  }, 300);
}
