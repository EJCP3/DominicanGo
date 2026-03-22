
import { ICONS, TYPE_LABELS } from "../data/poi-config";

document.addEventListener("astro:page-load", () => {
    // ── Inject icons (global, se inyectan en todo el sitio) ────────────────
    document.querySelectorAll<HTMLElement>(".icon-svg").forEach((el) => {
        const icon = el.dataset.icon ?? "";
        if (ICONS[icon]) el.innerHTML = ICONS[icon];
    });
    document
        .querySelectorAll<HTMLElement>(".card-type-badge")
        .forEach((badge) => {
            const type = badge.dataset.type ?? "";
            const iconEl = badge.querySelector<HTMLElement>(".card-icon");
            if (iconEl && ICONS[type]) iconEl.innerHTML = ICONS[type];
        });

    // ── Filters & Modal (solo aplicables a la página de destinos y grilla) ──
    const grid = document.getElementById("destinos-grid");
    if (!grid) return; // Si no estamos en la página del grid, hasta aquí llegamos.

    const modal = document.getElementById("poi-modal");
    if (!modal) return;

    const backdrop = document.getElementById("modal-backdrop")!;
    const modalClose = document.getElementById("modal-close")!;
    const modalGallery = document.getElementById("modal-gallery")!;
    const modalName = document.getElementById("modal-name")!;
    const modalDesc = document.getElementById("modal-desc")!;
    const modalProv = document.getElementById("modal-province")!;
    const modalProvDot = document.getElementById("modal-prov-dot")!;
    const modalRegion = document.getElementById("modal-region")!;
    const modalTypePill = document.getElementById("modal-type-pill")!;
    const modalTags = document.getElementById("modal-tags")!;
    const modalPrice = document.getElementById("modal-price-badge")!;
    const modalLink = document.getElementById("modal-link") as HTMLAnchorElement;
    let modalCarouselInterval: ReturnType<typeof setInterval> | null = null;

    function startModalCarousel() {
        stopModalCarousel();
        modalCarouselInterval = setInterval(() => {
            if (!modalGallery.classList.contains("carousel")) return;
            const maxScroll = modalGallery.scrollWidth - modalGallery.clientWidth;
            if (modalGallery.scrollLeft >= maxScroll - 10) {
                modalGallery.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                modalGallery.scrollBy({ left: modalGallery.clientWidth, behavior: "smooth" });
            }
        }, 3500);
    }

    function stopModalCarousel() {
        if (modalCarouselInterval) {
            clearInterval(modalCarouselInterval);
            modalCarouselInterval = null;
        }
    }

    function openModal(card: HTMLElement) {
        const d = card.dataset;
        const imagesStr = d.modalImages || "";
        if (imagesStr) {
            const images = imagesStr.split(",");
            modalGallery.className = "carousel pretty-scroll scroll-smooth w-full h-full rounded-t-3xl snap-x snap-mandatory overflow-x-auto";
            modalGallery.innerHTML = images.map((img: string) => `<div class="carousel-item w-full flex-none snap-start relative"><img src="${img}" alt="${d.modalName ?? ""}" class="w-full h-full object-cover" /></div>`).join("");
            startModalCarousel();
        } else {
            modalGallery.className = "w-full h-full m-0";
            modalGallery.innerHTML = `<img src="${d.modalImage ?? ""}" alt="${d.modalName ?? ""}" class="w-full h-full object-cover" />`;
            stopModalCarousel();
        }
        modalName.textContent = d.modalName ?? "";
        modalDesc.textContent = d.modalDesc ?? "";
        modalProv.textContent = d.modalProvince ?? "";
        modalProvDot.style.background = d.modalProvinceColor ?? "#ccc";
        modalRegion.textContent = d.modalRegion ?? "";
        const type = d.modalType ?? "";
        modalTypePill.innerHTML = `<span class="w-3.5 h-3.5 mr-1">${ICONS[type] ?? ""}</span>${TYPE_LABELS[type] ?? type}`;
        modalTags.innerHTML = (d.modalTags ?? "").split(",").filter(Boolean)
            .map((t) => `<span class="px-2.5 py-1 rounded-full bg-base-200 text-base-content/70 text-[11px] font-medium">${t}</span>`)
            .join("");
        const free = d.modalPrice === "gratis";
        modalPrice.textContent = free ? "✓ GRATIS" : "💳 PAGADO";
        modalPrice.className = `badge badge-sm font-bold shadow-sm ${free ? "badge-success" : "badge-warning"}`;
        modalLink.href = d.href ?? "#";
        modal!.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("open");
        document.body.style.overflow = "";
        stopModalCarousel();
    }

    modalClose.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);

    // We should be careful with global listeners like keydown.
    // Defining it dynamically prevents duplicate bugs!
    const keydownHandler = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", keydownHandler);

    document.addEventListener("astro:before-swap", () => {
        document.removeEventListener("keydown", keydownHandler);
    }, { once: true });

    // Filter Elements
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    const selectTipo = document.getElementById("filter-select-tipo") as HTMLSelectElement;
    const selectProvincia = document.getElementById("filter-select-provincia") as HTMLSelectElement;
    const resultCount = document.getElementById("result-count")!;
    const emptyState = document.getElementById("empty-state")!;
    const resetBtn = document.getElementById("reset-filters")!;
    const resetEmpty = document.getElementById("reset-empty")!;
    const activeChips = document.getElementById("active-chips")!;

    let cards: HTMLElement[] = [];
    const state: Record<string, string | null> = { tipo: null, provincia: null, region: null, precio: null, search: "" };

    function fillCountBadges() {
        document.querySelectorAll<HTMLElement>("[data-count]").forEach((badge) => {
            const t = badge.dataset.count!;
            badge.textContent = String(cards.filter((c) => c.dataset.tipo === t).length);
        });
    }

    function applyFilters() {
        const q = (state.search ?? "").toLowerCase();
        let visible = 0;

        cards.forEach((card) => {
            const dName = (card.dataset.name ?? "").toLowerCase();
            const dDesc = (card.dataset.description ?? "").toLowerCase();
            const dTags = (card.dataset.tags ?? "").toLowerCase();

            const ok =
                (!q || dName.includes(q) || dDesc.includes(q) || dTags.includes(q)) &&
                (!state.tipo || card.dataset.tipo === state.tipo) &&
                (!state.provincia || card.dataset.provincia === state.provincia) &&
                (!state.region || card.dataset.region === state.region) &&
                (!state.precio || card.dataset.precio === state.precio);

            card.style.display = ok ? "" : "none";
            if (ok) visible++;
        });

        if (resultCount) resultCount.textContent = `${visible} destino${visible !== 1 ? "s" : ""}`;
        const hasFilter = Object.entries(state).some(([k, v]) => k === "search" ? (v ?? "") !== "" : v !== null);
        const showEmpty = hasFilter && visible === 0;

        if (emptyState) emptyState.classList.toggle("hidden", !showEmpty);
        if (grid) grid.classList.toggle("hidden", showEmpty);
        if (resetBtn) resetBtn.classList.toggle("hidden", !hasFilter);

        renderChips();
    }

    // Buttons logic (Región & Precio)
    document.querySelectorAll<HTMLElement>(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.filter!;
            const val = btn.dataset.value!;
            state[key] = state[key] === val ? null : val;
            document.querySelectorAll<HTMLElement>(`[data-filter="${key}"]`).forEach((b) => b.classList.remove("active"));
            if (state[key]) btn.classList.add("active");
            applyFilters();
        });
    });

    // Selects logic (Tipo & Provincia)
    if (selectTipo) {
        selectTipo.addEventListener("change", () => {
            state.tipo = selectTipo.value || null;
            applyFilters();
        });
    }
    if (selectProvincia) {
        selectProvincia.addEventListener("change", () => {
            state.provincia = selectProvincia.value || null;
            applyFilters();
        });
    }

    if (searchInput) searchInput.addEventListener("input", () => { state.search = searchInput.value; applyFilters(); });

    function resetAll() {
        Object.keys(state).forEach((k) => state[k] = k === "search" ? "" : null);
        if (searchInput) searchInput.value = "";
        if (selectTipo) selectTipo.value = "";
        if (selectProvincia) selectProvincia.value = "";
        document.querySelectorAll<HTMLElement>(".filter-btn").forEach((b) => b.classList.remove("active"));
        applyFilters();
    }

    if (resetBtn) resetBtn.addEventListener("click", resetAll);
    if (resetEmpty) resetEmpty.addEventListener("click", resetAll);

    function renderChips() {
        if (!activeChips) return;
        document.querySelectorAll(".chip").forEach((c) => c.remove());
        Object.entries(state).forEach(([key, val]) => {
            if (!val) return;
            // Use province name / type label if applicable
            let label = val;
            if (key === "search") label = `"${val}"`;
            else if (key === "tipo") label = TYPE_LABELS[val] ?? val;
            else if (key === "provincia") {
                const opt = selectProvincia?.querySelector(`option[value="${val}"]`);
                label = opt ? opt.textContent || val : val;
            }

            const chip = document.createElement("button");
            chip.className = "chip badge badge-neutral h-7 px-3 text-xs text-primary font-semibold uppercase tracking-wider gap-1.5 shrink-0 border-none bg-base-300 hover:bg-error hover:text-white transition-colors cursor-pointer group";
            chip.innerHTML = `${label} <span class="text-[14px] leading-none mb-px">×</span>`;

            chip.addEventListener("click", () => {
                state[key] = key === "search" ? "" : null;
                if (key === "search" && searchInput) searchInput.value = "";
                if (key === "tipo" && selectTipo) selectTipo.value = "";
                if (key === "provincia" && selectProvincia) selectProvincia.value = "";

                document.querySelectorAll<HTMLElement>(`[data-filter="${key}"]`).forEach((b) => b.classList.remove("active"));
                applyFilters();
            });
            activeChips.appendChild(chip);
        });
    }

    // Close panel when clicking outside
    document.addEventListener("click", (event) => {
        const currentPanel = document.getElementById("filtros-panel");
        const currentBtn = document.getElementById("btn-abrir-filtros");
        if (!currentPanel) return;

        const target = event.target as Node;
        const isInsidePanel = currentPanel.contains(target);
        const isClickOnBtn = currentBtn ? currentBtn.contains(target) : false;

        if (!isInsidePanel && !isClickOnBtn && currentPanel.classList.contains("popup-open")) {
            currentPanel.classList.remove("popup-open");
        }
    });

    requestAnimationFrame(() => {
        cards = Array.from(document.querySelectorAll<HTMLElement>(".destino-card"));
        fillCountBadges();
        if (resultCount) resultCount.textContent = `${cards.length} destinos`;
    });
});
