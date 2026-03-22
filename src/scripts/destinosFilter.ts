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

    // ── Modal (solo aplicable a la página de destinos y grilla) ──
    const grid = document.getElementById("destinos-grid");
    if (!grid) return;

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

    const keydownHandler = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", keydownHandler);

    document.addEventListener("astro:before-swap", () => {
        document.removeEventListener("keydown", keydownHandler);
    }, { once: true });

    // Fill count badges
    requestAnimationFrame(() => {
        const cards = Array.from(document.querySelectorAll<HTMLElement>(".destino-card"));
        document.querySelectorAll<HTMLElement>("[data-count]").forEach((badge) => {
            const t = badge.dataset.count!;
            badge.textContent = String(cards.filter((c) => c.dataset.tipo === t).length);
        });
    });
});
