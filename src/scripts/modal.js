/**
 * Modal Controller — Light theme using daisyUI
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

  if (mapContainer) {
    mapContainer.classList.add('shifted');
  }

  // Remove the old modal overlay if it exists (legacy non-daisyUI structure)
  const oldOverlay = document.getElementById('modal-overlay');
  if (oldOverlay) {
    oldOverlay.remove();
  }

  // Ensure daisyUI dialog container exists
  let dialog = document.getElementById('daisy-province-modal');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'daisy-province-modal';
    dialog.className = 'modal';
    document.body.appendChild(dialog);

    // Event listener to handle closing state cleanly (like clicking outside or ESC)
    dialog.addEventListener('close', () => {
      if (mapContainer) {
        mapContainer.classList.remove('shifted');
      }
      if (activeProvince) {
        activeProvince.classList.remove('active');
        activeProvince = null;
      }
      document.body.style.overflow = '';
    });
  }

  // Build POI cards — daisyUI card-side variant
  const poisHtml = data.pois
    .map(
      (poi) => `
      <div class="card card-side bg-base-100 shadow-sm border border-base-200 mb-4 hover:shadow-md transition-shadow duration-300">
        <figure class="w-1/3 sm:w-48 overflow-hidden shrink-0">
          <img src="${poi.image}" alt="${poi.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
        </figure>
        <div class="card-body p-4 sm:p-6 w-2/3">
          <h2 class="card-title text-lg sm:text-xl text-base-content font-heading">${poi.name}</h2>
          <p class="font-map text-sm sm:text-base text-base-content/80 leading-relaxed">${poi.description}</p>
          <div class="card-actions justify-end mt-4">
            <button class="btn btn-primary btn-sm rounded-full px-6">Ver más</button>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  // Inject the native daisyUI modal structure into the dialog
  // Using background blur/opacity to integrate softly with the clean map design
  dialog.innerHTML = `
    <div class="modal-box w-11/12 max-w-3xl overflow-hidden p-0 rounded-3xl" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px);">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 text-base-content/60 hover:text-base-content">✕</button>
      </form>
      
      <!-- Modal Header -->
      <div class="p-6 border-b border-base-200/50">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-3 h-3 rounded-full shadow-sm" style="background-color: ${data.color}"></div>
          <span class="text-xs uppercase tracking-wider font-semibold opacity-50">Provincia</span>
        </div>
        <h3 class="font-logo font-bold text-3xl sm:text-4xl text-base-content mb-2">${data.name}</h3>
        <p class="font-map text-base-content/70 text-sm sm:text-base">${data.description}</p>
      </div>

      <!-- Modal Body (POIs) -->
      <div class="p-6 overflow-y-auto max-h-[60vh] bg-base-200/20 custom-scrollbar">
        <div class="text-xs uppercase tracking-wider font-semibold opacity-50 mb-4">
          Puntos de Interés
        </div>
        <div>
          ${poisHtml}
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  `;

  if (tooltip) tooltip.style.opacity = '0';
  document.body.style.overflow = 'hidden';

  // Show the modal natively
  dialog.showModal();
}

/**
 * Close the province modal.
 * Keeping this for backward compatibility if called from inline HTML event listeners.
 */
export function closeModal() {
  const dialog = document.getElementById('daisy-province-modal');
  if (dialog) {
    dialog.close(); // Triggers the 'close' event listener added in openModal
  }
}
