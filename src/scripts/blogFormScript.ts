// blogFormScript.ts

export function initBlogForm(destinationsList: { id: string; value: string; provinceName: string }[]) {
    // Populating the dropdown
    const destinationSelect = document.getElementById("post-destination") as HTMLSelectElement;
    if (!destinationSelect) return;

    destinationsList.forEach((dest) => {
        const option = document.createElement("option");
        option.value = dest.value;
        option.textContent = `${dest.id} (${dest.provinceName})`;
        destinationSelect.appendChild(option);
    });

    // Initialize Quill Rich Text Editor
    // @ts-ignore
    const quill = new Quill("#quill-editor", {
        theme: "snow",
        placeholder: "Érase una vez en un rincón paradisíaco de República Dominicana...",
        modules: {
            toolbar: [
                [{ header: [2, 3, false] }],
                ["bold", "italic", "underline", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
            ],
        },
    });

    // Image Preview & State Logic
    const imageInput = document.getElementById("post-image") as HTMLInputElement;
    const previewContainer = document.getElementById("image-preview") as HTMLElement;
    let selectedFiles: File[] = [];

    imageInput.addEventListener("change", function () {
        if (!this.files) return;
        Array.from(this.files).forEach((file) => {
            if (!file.type.startsWith("image/")) return;
            const exists = selectedFiles.some((f) => f.name === file.name && f.size === file.size);
            if (!exists) {
                selectedFiles.push(file);
            }
        });
        this.value = ""; // Clear input to allow re-selecting same file
        renderPreviews();
    });

    function renderPreviews() {
        previewContainer.innerHTML = "";
        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const wrap = document.createElement("div");
                wrap.className = "relative group w-20 h-20";

                const img = document.createElement("img");
                img.src = e.target?.result as string;
                img.className = "w-full h-full object-cover rounded-xl border border-primary/20 shadow-sm";

                const removeBtn = document.createElement("button");
                removeBtn.type = "button";
                removeBtn.innerHTML = "&times;";
                removeBtn.className =
                    "absolute -top-2 -right-2 bg-error text-error-content rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer disabled:opacity-50";
                removeBtn.onclick = () => {
                    selectedFiles.splice(index, 1);
                    renderPreviews();
                };

                wrap.appendChild(img);
                wrap.appendChild(removeBtn);
                previewContainer.appendChild(wrap);
            };
            reader.readAsDataURL(file);
        });
    }

    // Handling Form Submission
    const form = document.getElementById("new-post-form") as HTMLFormElement;
    const successAlert = document.getElementById("success-alert") as HTMLElement;
    const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (quill.getText().trim().length === 0) {
            alert("Por favor, escribe tu historia.");
            return;
        }

        if (selectedFiles.length === 0) {
            alert("Por favor, selecciona al menos una imagen principal para tu viaje.");
            return;
        }

        const title = (document.getElementById("post-title") as HTMLInputElement).value;
        const destination = (document.getElementById("post-destination") as HTMLSelectElement).value;
        const type = (document.getElementById("post-type") as HTMLSelectElement).value;
        const content = quill.root.innerHTML;
        const fileNames = selectedFiles.map((f) => f.name);

        const postPayload = {
            title,
            destinationValue: destination,
            storyType: type,
            content,
            imageNames: fileNames,
            dateSubmitted: new Date().toISOString(),
        };

        console.log("=== NEW BLOG POST PREPARED FOR BACKEND ===");
        console.log(postPayload);
        console.log("==========================================");

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading loading-spinner"></span> Procesando...';

        setTimeout(() => {
            successAlert.classList.remove("hidden");
            form.reset();
            quill.root.innerHTML = "";
            selectedFiles = [];
            renderPreviews();

            submitBtn.disabled = false;
            submitBtn.textContent = "Publicar otra historia";

            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1200);
    });
}
