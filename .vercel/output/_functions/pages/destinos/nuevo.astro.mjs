import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$Layout, a as $$Header } from '../../chunks/Header_Y8jLrYi7.mjs';
import { useSSRContext, defineComponent, ref, reactive } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
/* empty css                                    */
import { g as getUser, b as getProvincesWithDestinations } from '../../chunks/api_BnOIfECD.mjs';
import { T as TYPE_LABELS, a as TIPOS } from '../../chunks/poi-config_9NakrLaT.mjs';
export { renderers } from '../../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FormularioDestino",
  props: {
    provincias: {},
    tipos: {},
    typeLabels: {},
    user: {},
    token: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const step = ref(1);
    const PRESET_SCHEDULES = [
      "Todos los días: 8:00 AM - 5:00 PM",
      "Lunes a Viernes: 9:00 AM - 6:00 PM",
      "Fines de Semana: 10:00 AM - 6:00 PM",
      "Abierto 24 Horas",
      "Cerrado"
    ];
    const destinationId = ref(null);
    const otpCode = ref("");
    const form = reactive({
      nombre: "",
      descripcion: "",
      provincia: "",
      categoria: "",
      precio: "gratis",
      horario_weekdays: "",
      horario_weekend: "",
      etiquetas: [],
      googleMaps: "",
      sitioWeb: "",
      imagenPrincipal: "",
      galeria: [{ type: "url", url: "", file: null, fileName: "" }]
    });
    const currentTag = ref("");
    const isLoading = ref(false);
    const submitError = ref("");
    const otpError = ref("");
    const uploadType = ref("url");
    const localFileName = ref("");
    const localFile = ref(null);
    function addTag() {
      const tag = currentTag.value.trim();
      if (tag && !form.etiquetas.includes(tag)) form.etiquetas.push(tag);
      currentTag.value = "";
    }
    function removeTag(index) {
      form.etiquetas.splice(index, 1);
    }
    function addGalleryUrl() {
      if (form.galeria.length < 6)
        form.galeria.push({ type: "url", url: "", file: null, fileName: "" });
    }
    function removeGalleryUrl(index) {
      form.galeria.splice(index, 1);
    }
    function handleGalleryFileUpload(event, index) {
      const target = event.target;
      if (target.files?.length) {
        form.galeria[index].file = target.files[0];
        form.galeria[index].fileName = target.files[0].name;
      }
    }
    function handleFileUpload(event) {
      const target = event.target;
      if (target.files?.length) {
        localFile.value = target.files[0];
        localFileName.value = target.files[0].name;
      }
    }
    async function submitForm() {
      if (!form.nombre || !form.provincia || !form.categoria || !form.descripcion) {
        submitError.value = "Por favor, completa todos los campos obligatorios (marcados con *).";
        return;
      }
      if (uploadType.value === "url" && !form.imagenPrincipal) {
        submitError.value = "Por favor, ingresa la URL de la imagen principal.";
        return;
      }
      if (uploadType.value === "local" && !localFile.value) {
        submitError.value = "Por favor, selecciona una imagen desde tu PC.";
        return;
      }
      isLoading.value = true;
      submitError.value = "";
      try {
        const apiBase = "https://dominicango-api.onrender.com/api".trim().replace(/\/+$/, "");
        const toBase64 = (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        let finalImagenPrincipal = "https://picsum.photos/seed/default/600/400";
        if (uploadType.value === "url" && form.imagenPrincipal) {
          finalImagenPrincipal = form.imagenPrincipal;
        } else if (uploadType.value === "local" && localFile.value) {
          finalImagenPrincipal = await toBase64(localFile.value);
        }
        const finalGalleryImages = [];
        for (const g of form.galeria) {
          if (g.type === "url" && g.url) finalGalleryImages.push(g.url);
          else if (g.type === "local" && g.file) finalGalleryImages.push(await toBase64(g.file));
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
        const res = await fetch(`${apiBase}/destinations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!res.ok) {
          submitError.value = data?.message || "Error al enviar el destino. Intenta de nuevo.";
          return;
        }
        destinationId.value = data.data?.id || data.id;
        step.value = 2;
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        submitError.value = "Error de conexión. Verifica tu internet e intenta de nuevo.";
      } finally {
        isLoading.value = false;
      }
    }
    async function verifyOTP() {
      if (!otpCode.value.trim() || otpCode.value.length < 6) {
        otpError.value = "Ingresa el código de 6 dígitos que recibiste por correo.";
        return;
      }
      isLoading.value = true;
      otpError.value = "";
      try {
        const apiBase = "https://dominicango-api.onrender.com/api".trim().replace(/\/+$/, "");
        const res = await fetch(`${apiBase}/destinations/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify({ destinationId: destinationId.value, code: otpCode.value.trim() })
        });
        const data = await res.json();
        if (!res.ok) {
          otpError.value = data?.message || "Código incorrecto o expirado. Intenta de nuevo.";
          otpCode.value = "";
          return;
        }
        step.value = 3;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          window.location.href = "/destinos";
        }, 3e3);
      } catch (e) {
        otpError.value = "Error de conexión. Verifica tu internet e intenta de nuevo.";
      } finally {
        isLoading.value = false;
      }
    }
    const __returned__ = { props, step, PRESET_SCHEDULES, destinationId, otpCode, form, currentTag, isLoading, submitError, otpError, uploadType, localFileName, localFile, addTag, removeTag, addGalleryUrl, removeGalleryUrl, handleGalleryFileUpload, handleFileUpload, submitForm, verifyOTP };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-ed30a106>`);
  if ($setup.step === 3) {
    _push(`<div class="bg-base-100 rounded-3xl p-10 md:p-16 shadow-sm border border-base-content/10 text-center max-w-2xl mx-auto my-8 animate-in" data-v-ed30a106><div class="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-8 border-[6px] border-success/30" data-v-ed30a106><svg class="w-12 h-12 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ed30a106><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" data-v-ed30a106></path></svg></div><h2 class="font-heading font-extrabold text-3xl text-base-content mb-4" data-v-ed30a106>¡Destino Publicado!</h2><p class="text-base-content/70 text-lg mb-3 max-w-md mx-auto" data-v-ed30a106> &quot;<strong data-v-ed30a106>${ssrInterpolate($setup.form.nombre)}</strong>&quot; ya está disponible en el directorio 🎉 </p><p class="text-sm text-base-content/40 mb-8" data-v-ed30a106>Redirigiendo a destinos en 3 segundos...</p><a href="/destinos" class="btn btn-primary text-white rounded-full shadow-md px-10" data-v-ed30a106>Ir a Destinos</a></div>`);
  } else if ($setup.step === 2) {
    _push(`<div class="max-w-lg mx-auto my-8 animate-in" data-v-ed30a106><div class="bg-base-100 rounded-3xl p-10 shadow-sm border border-base-content/10 text-center" data-v-ed30a106><div class="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-primary/20" data-v-ed30a106><svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ed30a106><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-ed30a106></path></svg></div><h2 class="font-heading font-extrabold text-2xl text-base-content mb-2" data-v-ed30a106>Verifica tu correo</h2><p class="text-base-content/60 text-sm mb-8 max-w-xs mx-auto" data-v-ed30a106> Hemos enviado un código de 6 dígitos a <strong data-v-ed30a106>${ssrInterpolate($setup.props.user?.email)}</strong>. Ingrésalo aquí para publicar tu destino. </p><div class="mb-4" data-v-ed30a106><input${ssrRenderAttr("value", $setup.otpCode)} type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="_ _ _ _ _ _" class="input input-bordered w-full text-center text-3xl font-bold tracking-[0.5em] rounded-2xl h-16 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-base-100" data-v-ed30a106></div>`);
    if ($setup.otpError) {
      _push(`<div class="alert alert-error mb-4 rounded-2xl text-sm text-left" data-v-ed30a106><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ed30a106><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ed30a106></path></svg> ${ssrInterpolate($setup.otpError)}</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<button${ssrIncludeBooleanAttr($setup.isLoading || $setup.otpCode.length < 6) ? " disabled" : ""} class="btn btn-primary text-white w-full rounded-2xl h-12 font-bold text-base shadow-lg disabled:opacity-60 mb-4" data-v-ed30a106>`);
    if ($setup.isLoading) {
      _push(`<span class="loading loading-spinner loading-sm" data-v-ed30a106></span>`);
    } else {
      _push(`<!---->`);
    }
    _push(` ${ssrInterpolate($setup.isLoading ? "Verificando..." : "Verificar y Publicar")}</button><button class="btn btn-ghost text-base-content/50 text-sm rounded-2xl w-full" data-v-ed30a106> ← Volver al formulario </button></div></div>`);
  } else {
    _push(`<div class="space-y-8 animate-in" data-v-ed30a106><section class="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-content/10" data-v-ed30a106><h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3" data-v-ed30a106>Información Básica</h3><div class="space-y-5" data-v-ed30a106><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Nombre del destino *</label><input${ssrRenderAttr("value", $setup.form.nombre)} type="text" required class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ej. Cueva de las Maravillas" data-v-ed30a106></div><div class="grid grid-cols-1 md:grid-cols-2 gap-5" data-v-ed30a106><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Categoría *</label><select required class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" data-v-ed30a106><option value="" disabled data-v-ed30a106${ssrIncludeBooleanAttr(Array.isArray($setup.form.categoria) ? ssrLooseContain($setup.form.categoria, "") : ssrLooseEqual($setup.form.categoria, "")) ? " selected" : ""}>Selecciona una categoría</option><!--[-->`);
    ssrRenderList($setup.props.tipos, (tipo) => {
      _push(`<option${ssrRenderAttr("value", tipo)} data-v-ed30a106${ssrIncludeBooleanAttr(Array.isArray($setup.form.categoria) ? ssrLooseContain($setup.form.categoria, tipo) : ssrLooseEqual($setup.form.categoria, tipo)) ? " selected" : ""}>${ssrInterpolate($setup.props.typeLabels[tipo])}</option>`);
    });
    _push(`<!--]--></select></div><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Tipo de acceso *</label><div class="flex gap-4" data-v-ed30a106><label class="${ssrRenderClass([$setup.form.precio === "gratis" ? "bg-primary/10 border-primary/60 text-primary shadow-inner" : "border-base-300 hover:border-base-content/30", "flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"])}" data-v-ed30a106><input type="radio" value="gratis"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.form.precio, "gratis")) ? " checked" : ""} class="radio radio-sm radio-primary opacity-0 absolute" data-v-ed30a106><span class="font-medium text-sm" data-v-ed30a106>Gratis</span></label><label class="${ssrRenderClass([$setup.form.precio === "pagado" ? "bg-primary/10 border-primary/60 text-primary shadow-inner" : "border-base-300 hover:border-base-content/30", "flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"])}" data-v-ed30a106><input type="radio" value="pagado"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.form.precio, "pagado")) ? " checked" : ""} class="radio radio-sm radio-primary opacity-0 absolute" data-v-ed30a106><span class="font-medium text-sm" data-v-ed30a106>Pagado</span></label></div></div></div><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Descripción corta *</label><textarea required rows="3" class="textarea textarea-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed" placeholder="Describe por qué este lugar es especial..." data-v-ed30a106>${ssrInterpolate($setup.form.descripcion)}</textarea></div></div></section><section class="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-content/10" data-v-ed30a106><h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3" data-v-ed30a106>Ubicación y Detalles</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5" data-v-ed30a106><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Provincia *</label><select required class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" data-v-ed30a106><option value="" disabled data-v-ed30a106${ssrIncludeBooleanAttr(Array.isArray($setup.form.provincia) ? ssrLooseContain($setup.form.provincia, "") : ssrLooseEqual($setup.form.provincia, "")) ? " selected" : ""}>Selecciona la provincia</option><!--[-->`);
    ssrRenderList($setup.props.provincias, (prov) => {
      _push(`<option${ssrRenderAttr("value", prov.slug)} data-v-ed30a106${ssrIncludeBooleanAttr(Array.isArray($setup.form.provincia) ? ssrLooseContain($setup.form.provincia, prov.slug) : ssrLooseEqual($setup.form.provincia, prov.slug)) ? " selected" : ""}>${ssrInterpolate(prov.name)}</option>`);
    });
    _push(`<!--]--></select></div><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Horario (opcional)</label><div class="space-y-4" data-v-ed30a106><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-ed30a106><div data-v-ed30a106><span class="flex justify-between text-[10px] uppercase font-extrabold opacity-40 ml-1 mb-1 block" data-v-ed30a106>Dias de semana <button class="text-error hover:underline lowercase font-bold text-[9px]" data-v-ed30a106>Cerrado</button></span><input${ssrRenderAttr("value", $setup.form.horario_weekdays)} type="text" list="schedule-presets" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ej. 8:00 AM - 5:00 PM" data-v-ed30a106></div><div data-v-ed30a106><span class="text-[10px] uppercase font-extrabold opacity-40 ml-1 mb-1 flex justify-between items-center" data-v-ed30a106> Fin de semana <button class="text-error hover:underline lowercase font-bold text-[9px]" data-v-ed30a106>Cerrado</button></span><input${ssrRenderAttr("value", $setup.form.horario_weekend)} type="text" list="weekend-presets" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ej. 9:00 AM - 1:00 PM" data-v-ed30a106></div></div><datalist id="schedule-presets" data-v-ed30a106><!--[-->`);
    ssrRenderList($setup.PRESET_SCHEDULES, (preset) => {
      _push(`<option${ssrRenderAttr("value", preset.split(": ")[1] || preset)} data-v-ed30a106></option>`);
    });
    _push(`<!--]--></datalist><div class="flex flex-wrap gap-2 mt-2" data-v-ed30a106><!--[-->`);
    ssrRenderList($setup.PRESET_SCHEDULES.slice(0, 5), (preset) => {
      _push(`<button type="button" class="btn btn-xs btn-outline rounded-lg text-[10px] font-medium border-base-300 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all" data-v-ed30a106>${ssrInterpolate(preset.split(":")[0])}</button>`);
    });
    _push(`<!--]--></div></div></div></div><div class="grid grid-cols-1 gap-5" data-v-ed30a106><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Enlace a Google Maps (opcional)</label><input${ssrRenderAttr("value", $setup.form.googleMaps)} type="url" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://maps.google.com/..." data-v-ed30a106></div><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1" data-v-ed30a106>Sitio Web / Reserva (opcional)</label><input${ssrRenderAttr("value", $setup.form.sitioWeb)} type="url" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://paginaoficial.com" data-v-ed30a106></div></div></section><section class="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-content/10" data-v-ed30a106><h3 class="font-heading font-extrabold text-xl text-base-content mb-2" data-v-ed30a106>Qué encontrarás allí</h3><p class="text-base-content/60 text-sm mb-5 border-b border-base-200 pb-3" data-v-ed30a106>Añade palabras clave para ayudar a otros viajeros (ej. parqueo, comida local, senderismo).</p><div class="flex gap-2 mb-4" data-v-ed30a106><input${ssrRenderAttr("value", $setup.currentTag)} type="text" class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Escribe una etiqueta y presiona Intro..." data-v-ed30a106><button type="button" class="btn btn-secondary text-white rounded-2xl px-6 font-bold shadow-sm" data-v-ed30a106>Agregar</button></div><div class="flex flex-wrap gap-2 min-h-[40px] items-center p-3 bg-base-200/30 rounded-2xl border border-dashed border-base-300" data-v-ed30a106>`);
    if ($setup.form.etiquetas.length === 0) {
      _push(`<span class="text-xs text-base-content/40 italic" data-v-ed30a106>No has añadido etiquetas...</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--[-->`);
    ssrRenderList($setup.form.etiquetas, (tag, index) => {
      _push(`<div class="badge badge-lg h-8 gap-2 bg-white border border-base-300 text-base-content px-3 font-semibold shadow-sm" data-v-ed30a106> #${ssrInterpolate(tag)} <button class="text-base-content/50 hover:text-error transition-colors mt-px" data-v-ed30a106>✕</button></div>`);
    });
    _push(`<!--]--></div></section><section class="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-content/10" data-v-ed30a106><h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3" data-v-ed30a106>Fotografías </h3><div class="space-y-6" data-v-ed30a106><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1 flex items-center gap-2" data-v-ed30a106><svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ed30a106><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-ed30a106></path></svg> Imagen Principal * </label><div class="flex gap-4 mb-3 ml-1" data-v-ed30a106><label class="cursor-pointer flex items-center gap-2" data-v-ed30a106><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.uploadType, "url")) ? " checked" : ""} value="url" class="radio radio-sm radio-primary" data-v-ed30a106><span class="text-sm font-medium" data-v-ed30a106>Usar URL</span></label><label class="cursor-pointer flex items-center gap-2" data-v-ed30a106><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual($setup.uploadType, "local")) ? " checked" : ""} value="local" class="radio radio-sm radio-primary" data-v-ed30a106><span class="text-sm font-medium" data-v-ed30a106>Subir desde PC</span></label></div>`);
    if ($setup.uploadType === "url") {
      _push(`<div data-v-ed30a106><input${ssrRenderAttr("value", $setup.form.imagenPrincipal)} type="url"${ssrIncludeBooleanAttr($setup.uploadType === "url") ? " required" : ""} class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="https://ejemplo.com/foto-principal.jpg" data-v-ed30a106></div>`);
    } else {
      _push(`<div data-v-ed30a106><input type="file" accept="image/*"${ssrIncludeBooleanAttr($setup.uploadType === "local") ? " required" : ""} class="file-input file-input-bordered w-full rounded-2xl bg-base-100" data-v-ed30a106>`);
      if ($setup.localFileName) {
        _push(`<p class="text-xs text-success mt-2 font-medium ml-2" data-v-ed30a106>✓ ${ssrInterpolate($setup.localFileName)} seleccionado</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    }
    _push(`</div><div data-v-ed30a106><label class="text-sm text-base-content/70 font-bold block mb-2 ml-1 flex justify-between" data-v-ed30a106><span data-v-ed30a106>Galería Extra (Opcional, Máx 6)</span><span class="text-xs font-normal opacity-70" data-v-ed30a106>${ssrInterpolate($setup.form.galeria.length)}/6 permitidas</span></label><div class="space-y-4" data-v-ed30a106><!--[-->`);
    ssrRenderList($setup.form.galeria, (item, index) => {
      _push(`<div class="p-4 rounded-2xl bg-base-200/50 border border-base-200 relative" data-v-ed30a106>`);
      if ($setup.form.galeria.length > 1) {
        _push(`<button class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost text-error hover:bg-error hover:text-white" data-v-ed30a106>✕</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-4 mb-3" data-v-ed30a106><label class="cursor-pointer flex items-center gap-2" data-v-ed30a106><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(item.type, "url")) ? " checked" : ""} value="url" class="radio radio-xs radio-primary" data-v-ed30a106><span class="text-xs font-medium" data-v-ed30a106>Usar URL</span></label><label class="cursor-pointer flex items-center gap-2" data-v-ed30a106><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(item.type, "local")) ? " checked" : ""} value="local" class="radio radio-xs radio-primary" data-v-ed30a106><span class="text-xs font-medium" data-v-ed30a106>Subir desde PC</span></label></div>`);
      if (item.type === "url") {
        _push(`<div data-v-ed30a106><input${ssrRenderAttr("value", item.url)} type="url" class="input input-sm input-bordered w-full rounded-xl bg-base-100 text-sm"${ssrRenderAttr("placeholder", `URL Imagen ${index + 1}...`)} data-v-ed30a106></div>`);
      } else {
        _push(`<div data-v-ed30a106><input type="file" accept="image/*" class="file-input file-input-sm file-input-bordered w-full rounded-xl bg-base-100" data-v-ed30a106>`);
        if (item.fileName) {
          _push(`<p class="text-[10px] text-success mt-1 font-medium ml-1" data-v-ed30a106>✓ ${ssrInterpolate(item.fileName)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    });
    _push(`<!--]-->`);
    if ($setup.form.galeria.length < 6) {
      _push(`<button class="btn btn-sm btn-ghost text-primary mt-2 rounded-xl" data-v-ed30a106>+ Añadir otra imagen</button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div></section>`);
    if ($setup.submitError) {
      _push(`<div class="alert alert-error rounded-2xl text-sm" data-v-ed30a106><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ed30a106><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ed30a106></path></svg> ${ssrInterpolate($setup.submitError)}</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="pt-4 flex justify-end gap-4" data-v-ed30a106><a href="/destinos" class="btn btn-ghost rounded-full px-6 text-base-content/70 hover:text-base-content" data-v-ed30a106>Cancelar</a><button type="button"${ssrIncludeBooleanAttr($setup.isLoading) ? " disabled" : ""} class="btn btn-primary text-base-content rounded-full px-10 shadow-lg font-bold disabled:opacity-70 disabled:text-white transition-all hover:-translate-y-1" data-v-ed30a106>`);
    if ($setup.isLoading) {
      _push(`<span class="loading loading-spinner loading-sm" data-v-ed30a106></span>`);
    } else {
      _push(`<!---->`);
    }
    _push(` ${ssrInterpolate($setup.isLoading ? "Enviando..." : "Enviar Destino")} `);
    if (!$setup.isLoading) {
      _push(`<svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ed30a106><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-v-ed30a106></path></svg>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</button></div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/destinos/FormularioDestino.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FormularioDestino = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ed30a106"]]);

const $$Astro = createAstro();
const $$Nuevo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nuevo;
  const token = Astro2.cookies.get("auth_token")?.value;
  const [user, { provinces }] = await Promise.all([
    getUser(token),
    getProvincesWithDestinations()
  ]);
  if (!user) {
    return Astro2.redirect("/?error=auth_required");
  }
  const provinciasList = Object.entries(provinces).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([slug, prov]) => ({ slug, name: prov.name }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Comparte un Destino \u2014 DominicanGo", "description": "Agrega un nuevo destino a nuestro directorio tur\xEDstico de Rep\xFAblica Dominicana.", "showWidgets": false }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 bg-[#FDFBF7]"> <div class="max-w-[800px] mx-auto px-4 sm:px-6"> <div class="text-center mb-10"> <h1 class="font-heading font-extrabold text-4xl md:text-5xl text-base-content mb-3">
Comparte un <span class="text-secondary">Destino</span> </h1> <p class="text-base-content/70 max-w-xl text-lg mx-auto">
¿Conoces un lugar increíble en República Dominicana? Colabora con nuestra comunidad compartiendo este destino para que todos puedan descubrirlo.
</p> </div> ${renderComponent($$result2, "FormularioDestino", FormularioDestino, { "client:load": true, "provincias": provinciasList, "tipos": TIPOS, "typeLabels": TYPE_LABELS, "user": user, "token": token, "client:component-hydration": "load", "client:component-path": "@/components/destinos/FormularioDestino.vue", "client:component-export": "default" })} </div> </main> ` })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/nuevo.astro", void 0);

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/nuevo.astro";
const $$url = "/destinos/nuevo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nuevo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
