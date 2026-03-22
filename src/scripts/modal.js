import { TYPE_LABELS } from './../data/poi-config.ts';

let activeProvince = null;
let currentCategory = 'all';
let currentPrice = 'all';
let modalProvincesData = null;
let modalProvinceId = null;
let isFilterOpen = false;

/**
 * Open the province modal with POI data.
 */
export function openModal(provinceId, provincesData) {
  modalProvinceId = provinceId;
  modalProvincesData = provincesData;
  currentCategory = 'all';
  currentPrice = 'all';
  isFilterOpen = false;

  const data = provincesData[provinceId];
  if (!data) return;

  const mapContainer = document.getElementById('map-container');
  const tooltip = document.getElementById('province-tooltip');

  if (activeProvince) activeProvince.classList.remove('active');
  const activePath = document.querySelector(`[data-province="${provinceId}"]`);
  if (activePath) {
    activePath.classList.add('active');
    activeProvince = activePath;
  }

  if (mapContainer) mapContainer.classList.add('shifted');

  let dialog = document.getElementById('daisy-province-modal');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'daisy-province-modal';
    dialog.className = 'modal';
    document.body.appendChild(dialog);

    dialog.addEventListener('close', () => {
      if (mapContainer) mapContainer.classList.remove('shifted');
      if (activeProvince) activeProvince.classList.remove('active');
      activeProvince = null;
      document.body.style.overflow = '';
      isFilterOpen = false;
    });

    // Close popover when clicking outside of it
    dialog.addEventListener('mousedown', (e) => {
      if (!isFilterOpen) return;
      const popover = document.getElementById('filter-popover');
      const toggleBtn = document.getElementById('toggle-filter-btn');
      if (popover && !popover.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
        toggleFilterPopover(false);
      }
    });
  }

  initModalStructure();
  updatePOIList();

  if (tooltip) tooltip.style.opacity = '0';
  document.body.style.overflow = 'hidden';
  dialog.showModal();
}

/**
 * Initializes the basic modal structure (headers, action bars, etc.)
 */
function initModalStructure() {
  const dialog = document.getElementById('daisy-province-modal');
  if (!dialog) return;

  const data = modalProvincesData[modalProvinceId];
  const color = data.color || '#4a90d9';

  dialog.innerHTML = `
    <style>
      .filter-pill {
        padding: 5px 14px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 600;
        border: 1px solid #e5e7eb;
        background: white;
        color: #7A4B3A;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      .filter-pill:hover {
        border-color: #D5A77B;
        transform: translateY(-1px);
      }
      .filter-pill:active { transform: translateY(0); }
      .filter-pill.active {
        border-color: #3b82f6;
        color: #1d4ed8;
        background: #eff6ff;
        box-shadow: 0 0 0 1px #3b82f6;
      }
      .custom-scrollbar::-webkit-scrollbar { width: 5px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
    </style>

    <div class="modal-box w-11/12 max-w-3xl overflow-hidden p-0 rounded-3xl relative" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-30 text-base-content/40 hover:text-base-content hover:bg-base-200">✕</button>
      </form>
      
      <!-- Modal Header -->
      <div class="p-8 border-b border-base-200/50 bg-white/40">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-3.5 h-3.5 rounded-full shadow-sm" style="background-color: ${color}"></div>
          <span class="text-[10px] uppercase tracking-[0.2em] font-extrabold opacity-40">Provincia</span>
        </div>
        <h3 class="font-logo font-bold text-3xl sm:text-5xl text-base-content mb-3 tracking-tighter">${data.name}</h3>
        <p class="font-map text-base-content/60 text-sm sm:text-lg leading-relaxed max-w-xl">${data.description}</p>
      </div>

      <!-- Action Bar -->
      <div class="px-8 py-4 bg-base-200/20 border-b border-base-200/50 flex items-center justify-between relative z-20">
         <div class="text-[10px] uppercase tracking-widest font-extrabold opacity-30 flex items-center gap-2">
            Puntos de Interés
            <span id="poi-count-badge" class="badge badge-sm font-bold bg-base-300 border-none text-[10px]">0</span>
         </div>
         <button id="toggle-filter-btn" class="btn btn-sm h-9 px-5 rounded-full btn-ghost bg-base-100 border-base-300 shadow-sm flex items-center gap-2 transition-all duration-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span class="font-bold">Filtros</span>
         </button>
      </div>

      <!-- Filter Popover -->
      <div id="filter-popover" class="absolute top-[215px] right-8 w-80 bg-[#fdfcfa]/98 backdrop-blur-2xl border border-[#f0e6d2] shadow-2xl rounded-2xl p-6 z-50 transition-all duration-300 origin-top-right transform scale-95 opacity-0 pointer-events-none">
        <div class="flex items-center justify-between mb-6">
          <h4 class="font-heading font-extrabold text-xl text-base-content">Filtros</h4>
          <div class="flex items-center gap-1.5">
             <button id="reset-filters-btn" class="btn btn-xs btn-circle btn-ghost text-base-content/40 hover:text-primary transition-colors" title="Restablecer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
             </button>
             <button id="close-filter-btn" class="btn btn-xs btn-circle btn-ghost text-base-content/40 hover:text-error transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>
        </div>
        
        <div class="mb-6">
          <h5 class="text-[10px] font-extrabold tracking-[0.15em] text-[#B58C73] uppercase mb-4 opacity-80">Categorías</h5>
          <div class="flex flex-wrap gap-2">
            <button data-cat="all" class="filter-pill active">Todas</button>
            ${Object.entries(TYPE_LABELS).map(([v, l]) => `
              <button data-cat="${v}" class="filter-pill">${l}</button>
            `).join('')}
          </div>
        </div>

        <div>
          <h5 class="text-[10px] font-extrabold tracking-[0.15em] text-[#B58C73] uppercase mb-4 opacity-80">Precio</h5>
          <div class="flex gap-2">
            <button data-price="all" class="filter-pill flex-1 text-center active">Todos</button>
            <button data-price="gratis" class="filter-pill flex-1 text-center">✓ Gratis</button>
            <button data-price="pagado" class="filter-pill flex-1 text-center">💳 Pagado</button>
          </div>
        </div>
      </div>

      <!-- Modal Body (POIs) -->
      <div class="px-8 py-6 overflow-y-auto max-h-[45vh] bg-base-200/5 custom-scrollbar">
        <div id="modal-poi-list"></div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  `;

  // Bind Events
  document.getElementById('toggle-filter-btn').onclick = () => toggleFilterPopover();
  document.getElementById('close-filter-btn').onclick = () => toggleFilterPopover(false);
  document.getElementById('reset-filters-btn').onclick = () => resetFilters();

  document.querySelectorAll('.filter-pill[data-cat]').forEach(btn => {
    btn.onclick = () => {
      currentCategory = btn.getAttribute('data-cat');
      updateFilterPills();
      updatePOIList();
    };
  });

  document.querySelectorAll('.filter-pill[data-price]').forEach(btn => {
    btn.onclick = () => {
      currentPrice = btn.getAttribute('data-price');
      updateFilterPills();
      updatePOIList();
    };
  });
}

/**
 * Toggles the filter popover with animation.
 */
function toggleFilterPopover(forceState) {
  isFilterOpen = forceState !== undefined ? forceState : !isFilterOpen;
  const popover = document.getElementById('filter-popover');
  const btn = document.getElementById('toggle-filter-btn');
  if (!popover || !btn) return;

  if (isFilterOpen) {
    popover.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
    popover.classList.add('scale-100', 'opacity-100');
    btn.classList.add('btn-primary', 'text-white', 'shadow-md');
    btn.classList.remove('btn-ghost', 'bg-base-100');
  } else {
    popover.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
    popover.classList.remove('scale-100', 'opacity-100');
    btn.classList.remove('btn-primary', 'text-white', 'shadow-md');
    btn.classList.add('btn-ghost', 'bg-base-100');
  }
}

/**
 * Updates only the POI list content.
 */
function updatePOIList() {
  const list = document.getElementById('modal-poi-list');
  const badge = document.getElementById('poi-count-badge');
  const data = modalProvincesData[modalProvinceId];
  if (!list || !data) return;

  const filteredPois = data.pois.filter((poi) => {
    const categoryMatch = currentCategory === 'all' || poi.type === currentCategory;
    const priceMatch = currentPrice === 'all' || poi.price === currentPrice;
    return categoryMatch && priceMatch;
  });

  if (badge) badge.innerText = filteredPois.length;

  list.innerHTML = filteredPois.length > 0 
    ? filteredPois.map((poi) => `
      <div class="card card-side bg-base-100 shadow-sm border border-base-200 mb-4 hover:shadow-md transition-shadow duration-300 overflow-hidden group animate-in fade-in slide-in-from-bottom-2 duration-500">
        <figure class="w-1/3 sm:w-40 md:w-48 shrink-0 relative overflow-hidden">
          <img src="${poi.image}" alt="${poi.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div class="absolute top-2 left-2">
            <span class="badge badge-sm font-bold uppercase tracking-tighter text-[9px] ${poi.price === 'gratis' ? 'badge-success text-white' : 'badge-warning'}">${poi.price}</span>
          </div>
        </figure>
        <div class="card-body p-4 sm:p-5 w-2/3">
          <div class="flex items-center gap-2 mb-1">
             <span class="text-[10px] font-bold opacity-40 uppercase tracking-widest">${TYPE_LABELS[poi.type] || poi.type}</span>
          </div>
          <h2 class="card-title text-base sm:text-lg text-base-content font-heading leading-tight">${poi.name}</h2>
          <p class="font-map text-xs sm:text-sm text-base-content/80 line-clamp-2 sm:line-clamp-3">${poi.description}</p>
          <div class="card-actions justify-end mt-2 sm:mt-4">
            <button class="btn btn-primary btn-xs sm:btn-sm rounded-full px-4 sm:px-6">Ver más</button>
          </div>
        </div>
      </div>
    `).join('')
    : `
      <div class="py-16 text-center opacity-30 animate-in fade-in duration-500">
        <div class="text-5xl mb-3">🏝️</div>
        <p class="font-medium">No hay resultados para esta selección</p>
      </div>
    `;
}

/**
 * Updates the active status of filter pills.
 */
function updateFilterPills() {
  document.querySelectorAll('.filter-pill[data-cat]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === currentCategory);
  });
  document.querySelectorAll('.filter-pill[data-price]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-price') === currentPrice);
  });
}

/**
 * Resets all filters.
 */
function resetFilters() {
  currentCategory = 'all';
  currentPrice = 'all';
  updateFilterPills();
  updatePOIList();
}

/**
 * Close the province modal.
 */
export function closeModal() {
  const dialog = document.getElementById('daisy-province-modal');
  if (dialog) dialog.close();
}

