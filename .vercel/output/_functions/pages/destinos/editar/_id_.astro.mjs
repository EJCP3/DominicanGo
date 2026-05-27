import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$Layout, a as $$Header } from '../../../chunks/Header_Y8jLrYi7.mjs';
import { useSSRContext, defineComponent, reactive, onMounted, ref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
/* empty css                                      */
import { g as getUser, e as baseProvinces } from '../../../chunks/api_BnOIfECD.mjs';
import { T as TYPE_LABELS, a as TIPOS } from '../../../chunks/poi-config_9NakrLaT.mjs';
export { renderers } from '../../../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EditarDestino",
  props: {
    destination: {},
    provincias: {},
    tipos: {},
    typeLabels: {},
    token: {},
    isAdmin: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const form = reactive({
      nombre: props.destination.name,
      descripcion: props.destination.description,
      provincia: props.destination.provinceId,
      categoria: props.destination.type,
      precio: props.destination.price,
      horario_weekdays: props.destination.hoursWeekdays || "",
      horario_weekend: props.destination.hoursWeekend || "",
      etiquetas: [...props.destination.tags || []],
      sitioWeb: props.destination.website || "",
      imagenPrincipal: props.destination.image,
      // Gallery state for editing: allows mixing existing URLs and new local files
      galeria: props.destination.images.map((img) => ({
        type: "url",
        url: img,
        file: null,
        fileName: ""
      }))
    });
    onMounted(() => {
      if (form.galeria.length === 0) {
        addGallerySlot();
      }
    });
    const currentTag = ref("");
    const isLoading = ref(false);
    const errorMsg = ref("");
    const successMsg = ref("");
    const uploadType = ref("url");
    const localFileName = ref("");
    const localFile = ref(null);
    const timeLeft = ref("");
    const canEdit = ref(true);
    onMounted(() => {
      if (!props.isAdmin) {
        const checkTimer = () => {
          const created = new Date(props.destination.createdAt).getTime();
          const now = Date.now();
          const remaining = 60 * 60 * 1e3 - (now - created);
          if (remaining <= 0) {
            canEdit.value = false;
            timeLeft.value = "Tiempo de edición expirado";
          } else {
            const mins = Math.floor(remaining / 6e4);
            const secs = Math.floor(remaining % 6e4 / 1e3);
            timeLeft.value = `${mins}m ${secs}s restantes`;
          }
        };
        checkTimer();
        setInterval(checkTimer, 1e3);
      }
    });
    function addTag() {
      const tag = currentTag.value.trim();
      if (tag && !form.etiquetas.includes(tag)) form.etiquetas.push(tag);
      currentTag.value = "";
    }
    function removeTag(index) {
      form.etiquetas.splice(index, 1);
    }
    const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    function handleFileUpload(event) {
      const target = event.target;
      if (target.files?.length) {
        localFile.value = target.files[0];
        localFileName.value = target.files[0].name;
      }
    }
    function addGallerySlot() {
      if (form.galeria.length < 6) {
        form.galeria.push({ type: "url", url: "", file: null, fileName: "" });
      }
    }
    function removeGallerySlot(index) {
      form.galeria.splice(index, 1);
      if (form.galeria.length === 0) addGallerySlot();
    }
    function handleGalleryFileUpload(event, index) {
      const target = event.target;
      if (target.files?.length) {
        form.galeria[index].file = target.files[0];
        form.galeria[index].fileName = target.files[0].name;
      }
    }
    async function submitEdit() {
      if (!canEdit.value) {
        errorMsg.value = "El tiempo de edición ha expirado.";
        return;
      }
      if (!form.nombre || !form.provincia || !form.categoria || !form.descripcion) {
        errorMsg.value = "Por favor, completa los campos obligatorios.";
        return;
      }
      isLoading.value = true;
      errorMsg.value = "";
      successMsg.value = "";
      try {
        const apiBase = "https://dominicango-api.onrender.com/api".trim().replace(/\/+$/, "");
        let finalImagenPrincipal = form.imagenPrincipal;
        if (uploadType.value === "local" && localFile.value) {
          finalImagenPrincipal = await toBase64(localFile.value);
        }
        const finalGalleryImages = [];
        for (const item of form.galeria) {
          if (item.type === "url" && item.url) {
            finalGalleryImages.push(item.url);
          } else if (item.type === "local" && item.file) {
            finalGalleryImages.push(await toBase64(item.file));
          }
        }
        const body = {
          name: form.nombre,
          description: form.descripcion,
          provinceId: form.provincia,
          type: form.categoria,
          price: form.precio,
          hoursWeekdays: form.horario_weekdays || void 0,
          hoursWeekend: form.horario_weekend || void 0,
          tags: form.etiquetas,
          website: form.sitioWeb || void 0,
          image: finalImagenPrincipal,
          images: finalGalleryImages
        };
        const res = await fetch(`${apiBase}/destinations/${props.destination.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al actualizar");
        successMsg.value = "¡Destino actualizado exitosamente!";
        setTimeout(() => {
          window.location.href = `/destinos`;
        }, 1500);
      } catch (e) {
        errorMsg.value = e.message;
      } finally {
        isLoading.value = false;
      }
    }
    const __returned__ = { props, form, currentTag, isLoading, errorMsg, successMsg, uploadType, localFileName, localFile, timeLeft, canEdit, addTag, removeTag, toBase64, handleFileUpload, addGallerySlot, removeGallerySlot, handleGalleryFileUpload, submitEdit };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 animate-in" }, _attrs))} data-v-4e7cd99f>`);
  if (!$props.isAdmin && $setup.timeLeft) {
    _push(`<div class="${ssrRenderClass([$setup.canEdit ? "alert-info" : "alert-error", "alert rounded-2xl text-sm"])}" data-v-4e7cd99f><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e7cd99f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-4e7cd99f></path></svg><span data-v-4e7cd99f><strong data-v-4e7cd99f>Ventana de edición:</strong> ${ssrInterpolate($setup.timeLeft)}</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]" data-v-4e7cd99f><h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3" data-v-4e7cd99f> Información Básica </h3><div class="space-y-5" data-v-4e7cd99f><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Nombre del destino *</label><input${ssrRenderAttr("value", $setup.form.nombre)} type="text" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Nombre del destino"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5" data-v-4e7cd99f><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Categoría *</label><select class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f><!--[-->`);
  ssrRenderList($setup.props.tipos, (tipo) => {
    _push(`<option${ssrRenderAttr("value", tipo)} data-v-4e7cd99f${ssrIncludeBooleanAttr(Array.isArray($setup.form.categoria) ? ssrLooseContain($setup.form.categoria, tipo) : ssrLooseEqual($setup.form.categoria, tipo)) ? " selected" : ""}>${ssrInterpolate($setup.props.typeLabels[tipo])}</option>`);
  });
  _push(`<!--]--></select></div><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Tipo de acceso *</label><div class="flex gap-4" data-v-4e7cd99f><label class="${ssrRenderClass([$setup.form.precio === "gratis" ? "bg-[#FFF1E0] border-[#D5A77B] text-[#5A3824]" : "border-base-300", "flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"])}" data-v-4e7cd99f><input type="radio" value="gratis"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.form.precio, "gratis")) ? " checked" : ""} class="radio radio-sm radio-primary opacity-0 absolute" data-v-4e7cd99f><span class="font-medium text-sm" data-v-4e7cd99f>Gratis</span></label><label class="${ssrRenderClass([$setup.form.precio === "pagado" ? "bg-[#FFF1E0] border-[#D5A77B] text-[#5A3824]" : "border-base-300", "flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"])}" data-v-4e7cd99f><input type="radio" value="pagado"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.form.precio, "pagado")) ? " checked" : ""} class="radio radio-sm radio-primary opacity-0 absolute" data-v-4e7cd99f><span class="font-medium text-sm" data-v-4e7cd99f>Pagado</span></label></div></div></div><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Descripción *</label><textarea rows="3" class="textarea textarea-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed" placeholder="Describe este destino..."${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f>${ssrInterpolate($setup.form.descripcion)}</textarea></div></div></section><section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]" data-v-4e7cd99f><h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3" data-v-4e7cd99f> Ubicación y Detalles </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5" data-v-4e7cd99f><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Provincia *</label><select class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f><!--[-->`);
  ssrRenderList($setup.props.provincias, (prov) => {
    _push(`<option${ssrRenderAttr("value", prov.slug)} data-v-4e7cd99f${ssrIncludeBooleanAttr(Array.isArray($setup.form.provincia) ? ssrLooseContain($setup.form.provincia, prov.slug) : ssrLooseEqual($setup.form.provincia, prov.slug)) ? " selected" : ""}>${ssrInterpolate(prov.name)}</option>`);
  });
  _push(`<!--]--></select></div><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Sitio Web (opcional)</label><input${ssrRenderAttr("value", $setup.form.sitioWeb)} type="url" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://..."${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-5" data-v-4e7cd99f><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Horario semana (opcional)</label><input${ssrRenderAttr("value", $setup.form.horario_weekdays)} type="text" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="9:00 AM - 5:00 PM"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f></div><div data-v-4e7cd99f><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-4e7cd99f>Horario fin de semana (opcional)</label><input${ssrRenderAttr("value", $setup.form.horario_weekend)} type="text" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="10:00 AM - 3:00 PM"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f></div></div></section><section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]" data-v-4e7cd99f><h3 class="font-heading font-extrabold text-xl text-base-content mb-2" data-v-4e7cd99f>Etiquetas</h3><p class="text-base-content/60 text-sm mb-5 border-b border-base-200 pb-3" data-v-4e7cd99f> Palabras clave para ayudar a otros viajeros. </p><div class="flex gap-2 mb-4" data-v-4e7cd99f><input${ssrRenderAttr("value", $setup.currentTag)} type="text" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Escribe una etiqueta y presiona Intro..."${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f><button type="button"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} class="btn btn-secondary text-white rounded-2xl px-6 font-bold shadow-sm" data-v-4e7cd99f>Agregar</button></div><div class="flex flex-wrap gap-2 min-h-[40px] items-center p-3 bg-base-200/30 rounded-2xl border border-dashed border-base-300" data-v-4e7cd99f>`);
  if ($setup.form.etiquetas.length === 0) {
    _push(`<span class="text-xs text-base-content/40 italic" data-v-4e7cd99f>No hay etiquetas...</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList($setup.form.etiquetas, (tag, index) => {
    _push(`<div class="badge badge-lg h-8 gap-2 bg-white border border-base-300 text-base-content px-3 font-semibold shadow-sm" data-v-4e7cd99f> #${ssrInterpolate(tag)} <button class="text-base-content/50 hover:text-error transition-colors mt-px"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f>✕</button></div>`);
  });
  _push(`<!--]--></div></section><section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]" data-v-4e7cd99f><h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3 flex items-center gap-2" data-v-4e7cd99f><svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4e7cd99f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-4e7cd99f></path></svg> Imagen Principal </h3><div class="flex gap-4 mb-4" data-v-4e7cd99f><label class="cursor-pointer flex items-center gap-2" data-v-4e7cd99f><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.uploadType, "url")) ? " checked" : ""} value="url" class="radio radio-sm radio-primary" data-v-4e7cd99f><span class="text-sm font-medium" data-v-4e7cd99f>Usar URL</span></label><label class="cursor-pointer flex items-center gap-2" data-v-4e7cd99f><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.uploadType, "local")) ? " checked" : ""} value="local" class="radio radio-sm radio-primary" data-v-4e7cd99f><span class="text-sm font-medium" data-v-4e7cd99f>Subir desde PC</span></label></div>`);
  if ($setup.uploadType === "url") {
    _push(`<div data-v-4e7cd99f><input${ssrRenderAttr("value", $setup.form.imagenPrincipal)} type="url" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://ejemplo.com/imagen.jpg"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f></div>`);
  } else {
    _push(`<div data-v-4e7cd99f><input type="file" accept="image/*"${ssrIncludeBooleanAttr($setup.uploadType === "local") ? " required" : ""} class="file-input file-input-bordered w-full rounded-2xl bg-base-100"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f>`);
    if ($setup.localFileName) {
      _push(`<p class="text-xs text-success mt-2 font-medium ml-2" data-v-4e7cd99f>✓ ${ssrInterpolate($setup.localFileName)} seleccionado</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  }
  if ($setup.uploadType === "url" && $setup.form.imagenPrincipal) {
    _push(`<div class="mt-4 rounded-2xl overflow-hidden max-h-48 border border-base-200" data-v-4e7cd99f><img${ssrRenderAttr("src", $setup.form.imagenPrincipal)} class="w-full object-cover max-h-48" data-v-4e7cd99f></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</section><section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]" data-v-4e7cd99f><h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3 flex justify-between items-center" data-v-4e7cd99f><span data-v-4e7cd99f>Galería Extra (Máx 6)</span><span class="text-xs font-normal opacity-50" data-v-4e7cd99f>${ssrInterpolate($setup.form.galeria.filter((i) => i.url || i.file).length)}/6</span></h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-4e7cd99f><!--[-->`);
  ssrRenderList($setup.form.galeria, (item, index) => {
    _push(`<div class="p-4 rounded-2xl bg-base-200/50 border border-base-200 relative" data-v-4e7cd99f><button class="absolute -top-2 -right-2 btn btn-xs btn-circle btn-error text-white shadow-lg z-10"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f>✕</button><div class="flex gap-3 mb-3" data-v-4e7cd99f><label class="flex items-center gap-1.5 cursor-pointer" data-v-4e7cd99f><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(item.type, "url")) ? " checked" : ""} value="url" class="radio radio-xs radio-primary" data-v-4e7cd99f><span class="text-[11px] font-bold" data-v-4e7cd99f>URL</span></label><label class="flex items-center gap-1.5 cursor-pointer" data-v-4e7cd99f><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(item.type, "local")) ? " checked" : ""} value="local" class="radio radio-xs radio-primary" data-v-4e7cd99f><span class="text-[11px] font-bold" data-v-4e7cd99f>PC</span></label></div>`);
    if (item.type === "url") {
      _push(`<div class="space-y-3" data-v-4e7cd99f><input${ssrRenderAttr("value", item.url)} type="url" class="input input-sm input-bordered w-full rounded-xl bg-base-100" placeholder="https://..."${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f>`);
      if (item.url) {
        _push(`<div class="w-full h-20 rounded-lg overflow-hidden border border-base-300" data-v-4e7cd99f><img${ssrRenderAttr("src", item.url)} class="w-full h-full object-cover" data-v-4e7cd99f></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    } else {
      _push(`<div class="space-y-2" data-v-4e7cd99f><input type="file" accept="image/*" class="file-input file-input-xs file-input-bordered w-full"${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} data-v-4e7cd99f>`);
      if (item.fileName) {
        _push(`<p class="text-[10px] text-success font-bold truncate" data-v-4e7cd99f>✓ ${ssrInterpolate(item.fileName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    }
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
  if ($setup.form.galeria.length < 6) {
    _push(`<button${ssrIncludeBooleanAttr(!$setup.canEdit) ? " disabled" : ""} class="btn btn-sm btn-ghost text-primary mt-4 rounded-xl border border-dashed border-primary/30 w-full" data-v-4e7cd99f> + Añadir otra imagen </button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</section>`);
  if ($setup.successMsg) {
    _push(`<div class="alert alert-success rounded-2xl text-sm font-bold shadow-lg text-white" data-v-4e7cd99f><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e7cd99f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-4e7cd99f></path></svg> ${ssrInterpolate($setup.successMsg)}</div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.errorMsg) {
    _push(`<div class="alert alert-error rounded-2xl text-sm font-bold shadow-lg text-white" data-v-4e7cd99f><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e7cd99f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-4e7cd99f></path></svg> ${ssrInterpolate($setup.errorMsg)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="pt-4 flex justify-end gap-4 border-t border-base-200 pt-8" data-v-4e7cd99f><a href="/destinos" class="btn btn-ghost rounded-full px-8 text-base-content/50 hover:text-base-content font-bold" data-v-4e7cd99f>Cancelar</a><button type="button"${ssrIncludeBooleanAttr($setup.isLoading || !$setup.canEdit) ? " disabled" : ""} class="btn btn-primary text-base-content rounded-full px-12 shadow-xl font-extrabold disabled:opacity-70 transition-all hover:-translate-y-1 hover:shadow-primary/20" data-v-4e7cd99f>`);
  if ($setup.isLoading) {
    _push(`<span class="loading loading-spinner loading-sm" data-v-4e7cd99f></span>`);
  } else {
    _push(`<!---->`);
  }
  _push(` ${ssrInterpolate($setup.isLoading ? "Aplicando cambios..." : "Guardar y Publicar")}</button></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/destinos/EditarDestino.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EditarDestino = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4e7cd99f"]]);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const token = Astro2.cookies.get("auth_token")?.value;
  const user = await getUser(token);
  if (!user) {
    return Astro2.redirect("/?error=auth_required");
  }
  const { id } = Astro2.params;
  let destination = null;
  try {
    const apiBase = "https://dominicango-api.onrender.com/api";
    const res = await fetch(`${apiBase}/destinations/${id}`);
    if (res.ok) {
      const json = await res.json();
      destination = json.data || json;
    }
  } catch (e) {
  }
  if (!destination) {
    return Astro2.redirect("/destinos");
  }
  const isOwner = user.id === destination.authorId;
  const isAdmin = user.role?.toUpperCase() === "ADMIN";
  const canAccess = isOwner || isAdmin;
  if (!canAccess) {
    return Astro2.redirect("/destinos");
  }
  const oneHour = 60 * 60 * 1e3;
  const withinEditWindow = isAdmin || Date.now() - new Date(destination.createdAt).getTime() < oneHour;
  if (!withinEditWindow) {
    return Astro2.redirect(`/destinos?error=edit_expired`);
  }
  await fetch(`${"https://dominicango-api.onrender.com/api"}/destinations?limit=1` );
  const provinciasList = Object.entries(baseProvinces).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([slug, prov]) => ({ slug, name: prov.name }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Editar: ${destination.name} — DominicanGo`, "description": "Edita los detalles de este destino.", "showWidgets": false }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 bg-[#FDFBF7]"> <div class="max-w-[800px] mx-auto px-4 sm:px-6"> <div class="text-center mb-10"> <h1 class="font-heading font-extrabold text-4xl md:text-5xl text-base-content mb-3">
Editar <span class="text-secondary">Destino</span> </h1> <p class="text-base-content/70 max-w-xl text-lg mx-auto">
Actualiza los detalles de <strong>${destination.name}</strong>.
${!isAdmin && renderTemplate`<span class="block text-sm text-warning mt-1">
⏱ Solo puedes editar en los primeros 60 minutos desde su creación.
</span>`} </p> </div> ${renderComponent($$result2, "EditarDestino", EditarDestino, { "client:load": true, "destination": destination, "provincias": provinciasList, "tipos": TIPOS, "typeLabels": TYPE_LABELS, "token": token, "isAdmin": isAdmin, "client:component-hydration": "load", "client:component-path": "@/components/destinos/EditarDestino.vue", "client:component-export": "default" })} </div> </main> ` })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/editar/[id].astro", void 0);
const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/editar/[id].astro";
const $$url = "/destinos/editar/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
