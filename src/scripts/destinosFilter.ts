
    import { ICONS, TYPE_LABELS } from "../data/poi-config";

    // ── Inject icons ────────────────────────────────────────────────────────────
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

    // ── Modal ───────────────────────────────────────────────────────────────────
    const modal = document.getElementById("poi-modal")!;
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
        
        // Setup Media (Carousel or Static)
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
        modalTags.innerHTML = (d.modalTags ?? "")
            .split(",")
            .filter(Boolean)
            .map(
                (t) =>
                    `<span class="px-2.5 py-1 rounded-full bg-base-200 text-base-content/70 text-[11px] font-medium">${t}</span>`,
            )
            .join("");
        const free = d.modalPrice === "gratis";
        modalPrice.textContent = free ? "✓ GRATIS" : "💳 PAGADO";
        modalPrice.className = `badge badge-sm font-bold shadow-sm ${free ? "badge-success" : "badge-warning"}`;
        modalLink.href = d.href ?? "#";
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    }
    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";
        stopModalCarousel();
    }
    modalClose.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // ── Filters ─────────────────────────────────────────────────────────────────
    const searchInput = document.getElementById(
        "search-input",
    ) as HTMLInputElement;
    const resultCount = document.getElementById("result-count")!;
    const emptyState = document.getElementById("empty-state")!;
    const resetBtn = document.getElementById("reset-filters")!;
    const resetEmpty = document.getElementById("reset-empty")!;
    const activeChips = document.getElementById("active-chips")!;
    const grid = document.getElementById("destinos-grid")!;

    let cards: HTMLElement[] = [];
    const state: Record<string, string | null> = {
        tipo: null,
        provincia: null,
        region: null,
        precio: null,
        search: "",
    };

    function fillCountBadges() {
        document
            .querySelectorAll<HTMLElement>("[data-count]")
            .forEach((badge) => {
                const t = badge.dataset.count!;
                badge.textContent = String(
                    cards.filter((c) => c.dataset.tipo === t).length,
                );
            });
    }

    function applyFilters() {
        const q = (state.search ?? "").toLowerCase();
        let visible = 0;
        cards.forEach((card) => {
            const ok =
                (!q ||
                    card.dataset.name!.includes(q) ||
                    card.dataset.description!.includes(q) ||
                    card.dataset.tags!.includes(q)) &&
                (!state.tipo || card.dataset.tipo === state.tipo) &&
                (!state.provincia ||
                    card.dataset.provincia === state.provincia) &&
                (!state.region || card.dataset.region === state.region) &&
                (!state.precio || card.dataset.precio === state.precio);
            card.style.display = ok ? "" : "none";
            if (ok) visible++;
        });
        resultCount.textContent = `${visible} destino${visible !== 1 ? "s" : ""}`;
        const hasFilter = Object.entries(state).some(([k, v]) =>
            k === "search" ? (v ?? "") !== "" : v !== null,
        );
        const showEmpty = hasFilter && visible === 0;
        emptyState.classList.toggle("hidden", !showEmpty);
        grid.classList.toggle("hidden", showEmpty);
        resetBtn.classList.toggle("hidden", !hasFilter);
        renderChips();
    }

    document.querySelectorAll<HTMLElement>(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.filter!;
            const val = btn.dataset.value!;
            state[key] = state[key] === val ? null : val;
            document
                .querySelectorAll<HTMLElement>(`[data-filter="${key}"]`)
                .forEach((b) => b.classList.remove("active"));
            if (state[key]) btn.classList.add("active");
            applyFilters();
        });
    });

    searchInput.addEventListener("input", () => {
        state.search = searchInput.value;
        applyFilters();
    });

    function resetAll() {
        Object.keys(state).forEach((k) => {
            state[k] = k === "search" ? "" : null;
        });
        searchInput.value = "";
        document
            .querySelectorAll<HTMLElement>(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
        applyFilters();
    }
    resetBtn.addEventListener("click", resetAll);
    resetEmpty.addEventListener("click", resetAll);

    function renderChips() {
        document.querySelectorAll(".chip").forEach((c) => c.remove());
        Object.entries(state).forEach(([key, val]) => {
            if (!val) return;
            const label =
                key === "search" ? `"${val}"` : (TYPE_LABELS[val] ?? val);
            const chip = document.createElement("button");
            chip.className = "chip";
            chip.classList.add("badge", "badge", "badge-neutral");
            chip.textContent = label + " ✕";
            chip.addEventListener("click", () => {
                state[key] = key === "search" ? "" : null;
                if (key === "search") searchInput.value = "";
                document
                    .querySelectorAll<HTMLElement>(`[data-filter="${key}"]`)
                    .forEach((b) => b.classList.remove("active"));
                applyFilters();
            });
            activeChips.appendChild(chip);
        });
    }

    // Boot — defer until after first paint
    requestAnimationFrame(() => {
        cards = Array.from(
            document.querySelectorAll<HTMLElement>(".destino-card"),
        );
        fillCountBadges();
        resultCount.textContent = `${cards.length} destinos`;
        cards.forEach((card) =>
            card.addEventListener("click", () => openModal(card)),
        );
    });
