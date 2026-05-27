import { useSSRContext, defineComponent, watch, onMounted, onUnmounted, ref, mergeProps } from 'vue';
import { ssrRenderTeleport, ssrRenderAttr, ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './Header_Y8jLrYi7.mjs';
/* empty css                          */

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LoginRequiredModal",
  props: {
    isOpen: { type: Boolean },
    loginUrl: {}
  },
  emits: ["close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    watch(() => props.isOpen, (val) => {
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
    const handleKeydown = (e) => {
      if (e.key === "Escape" && props.isOpen) {
        emit("close");
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    });
    const __returned__ = { props, emit, handleKeydown };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderTeleport(_push, (_push2) => {
    if ($props.isOpen) {
      _push2(`<div class="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"><div class="bg-base-100 w-full max-w-sm rounded-[24px] shadow-2xl relative overflow-hidden transform transition-all flex flex-col items-center p-8 text-center" role="dialog" aria-modal="true" aria-labelledby="modal-headline"><button class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-base-content/50 hover:bg-base-200" aria-label="Cerrar modal"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6"><svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><h3 id="modal-headline" class="text-2xl font-black font-heading text-base-content mb-2 tracking-tight"> Inicia sesión para interactuar </h3><p class="text-sm text-base-content/60 mb-8 leading-relaxed"> Para poder comentar, dar me gusta o guardar en tus favoritos, necesitas iniciar sesión en DominicanGo. </p><a${ssrRenderAttr("href", $props.loginUrl)} class="btn flex items-center justify-center gap-3 w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-xl h-12 text-base font-bold shadow-sm transition-all"><svg class="w-5 h-5" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg> Continuar con Google </a></div></div>`);
    } else {
      _push2(`<!---->`);
    }
  }, "body", false, _parent);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/LoginRequiredModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const LoginRequiredModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SocialActions",
  props: {
    targetType: {},
    targetId: {},
    token: {},
    loginUrl: {},
    title: {},
    subtitle: {},
    shareUrl: {},
    shareTitle: {},
    initialFavorited: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const counts = ref({ LIKE: 0, DISLIKE: 0 });
    const userReaction = ref(null);
    const loading = ref(true);
    const isFavorited = ref(props.initialFavorited || false);
    const favLoading = ref(false);
    const showLoginModal = ref(false);
    const apiBase = "https://dominicango-api.onrender.com/api".trim().replace(/\/+$/, "");
    const fetchReactions = async () => {
      try {
        const headers = {};
        if (props.token) headers["Authorization"] = `Bearer ${props.token}`;
        const res = await fetch(`${apiBase}/interactions/${props.targetType}/${props.targetId}`, { headers });
        if (res.ok) {
          const { data } = await res.json();
          counts.value = data.counts || { LIKE: 0, DISLIKE: 0 };
          userReaction.value = data.userReaction;
        }
      } catch (e) {
        console.error("Error fetching reactions:", e);
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      fetchReactions();
    });
    const toggleReaction = async (type) => {
      if (!props.token) {
        showLoginModal.value = true;
        return;
      }
      const previousReaction = userReaction.value;
      if (previousReaction === type) {
        counts.value[type]--;
        userReaction.value = null;
      } else {
        if (previousReaction) {
          counts.value[previousReaction]--;
        }
        counts.value[type]++;
        userReaction.value = type;
      }
      try {
        const res = await fetch(`${apiBase}/interactions/react`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify({
            targetType: props.targetType,
            destinationId: props.targetType === "DESTINATION" ? props.targetId : void 0,
            blogId: props.targetType === "BLOG" ? props.targetId : void 0,
            type
          })
        });
        if (res.status === 401) {
          showLoginModal.value = true;
        }
        if (!res.ok) throw new Error("Reaction failed");
      } catch (e) {
        console.error("Error toggling reaction:", e);
        if (previousReaction === type) {
          counts.value[type]++;
        } else {
          if (previousReaction) counts.value[previousReaction]++;
          counts.value[type]--;
        }
        userReaction.value = previousReaction;
      }
    };
    const toggleFavorite = async (e) => {
      e.preventDefault();
      if (!props.token) {
        showLoginModal.value = true;
        return;
      }
      const prevFav = isFavorited.value;
      isFavorited.value = !isFavorited.value;
      favLoading.value = true;
      try {
        const body = {
          type: props.targetType
        };
        if (props.targetType === "DESTINATION") body.destinationId = props.targetId;
        else body.blogId = props.targetId;
        const res = await fetch(`${apiBase}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify(body)
        });
        if (res.status === 401) showLoginModal.value = true;
        if (!res.ok) throw new Error("Favorite failed");
      } catch (err) {
        isFavorited.value = prevFav;
        console.error("Error toggling favorite:", err);
      } finally {
        favLoading.value = false;
      }
    };
    const share = () => {
      if (navigator.share) {
        navigator.share({
          title: props.shareTitle || document.title,
          url: props.shareUrl || window.location.href
        }).catch(() => {
        });
      } else {
        const url = props.shareUrl || window.location.href;
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("¡URL copiada al portapapeles!");
      }
    };
    const __returned__ = { props, counts, userReaction, loading, isFavorited, favLoading, showLoginModal, apiBase, fetchReactions, toggleReaction, toggleFavorite, share, LoginRequiredModal };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "group/card bg-white rounded-3xl p-5 transition-all duration-700 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 md:gap-6 relative overflow-visible" }, _attrs))}><div class="text-left md:text-center space-y-1"><h3 class="font-heading font-black text-lg md:text-2xl text-base-content tracking-tighter leading-none group-hover/card:text-primary transition-colors duration-500">${ssrInterpolate($props.title || "¿Te gustó?")}</h3><p class="text-base-content/40 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">${ssrInterpolate($props.subtitle || "Comparte tu experiencia")}</p></div><div class="join bg-neutral/3 p-1"><button class="${ssrRenderClass([[
    $setup.userReaction === "LIKE" ? "bg-primary text-white z-10" : "text-base-content/40 hover:text-primary hover:bg-primary/10"
  ], "btn btn-ghost join-item h-10 md:h-11 px-3 md:px-5 gap-2 transition-all duration-300 active:scale-95 group/btn border-none"])}"${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""}><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="${ssrRenderClass([{ "fill-current": $setup.userReaction === "LIKE" }, "w-4 h-4 md:w-4.5 md:h-4.5"])}"><path stroke-linecap="round" stroke-linejoin="round" d="M7 10v12 M2 10v12 M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path></svg><span class="font-black text-[10px] md:text-xs tracking-tight">${ssrInterpolate($setup.counts.LIKE)}</span></button><button class="${ssrRenderClass([[
    $setup.userReaction === "DISLIKE" ? "bg-error text-white z-10" : "text-base-content/40 hover:text-error hover:bg-error/10"
  ], "btn btn-ghost join-item h-10 md:h-11 px-3 md:px-5 gap-2 transition-all duration-300 active:scale-95 group/btn border-none"])}"${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""}><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="${ssrRenderClass([{ "fill-current": $setup.userReaction === "DISLIKE" }, "w-4 h-4 md:w-4.5 md:h-4.5"])}"><path stroke-linecap="round" stroke-linejoin="round" d="M17 14V2 M22 14V2 M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path></svg><span class="font-black text-[10px] md:text-xs tracking-tight">${ssrInterpolate($setup.counts.DISLIKE)}</span></button>`);
  if ($props.token) {
    _push(`<button class="${ssrRenderClass([$setup.isFavorited ? "bg-secondary text-white z-10" : "text-base-content hover:text-secondary hover:bg-secondary/10", "btn btn-ghost join-item h-10 md:h-11 w-10 md:w-14 flex items-center justify-center transition-all duration-500 active:scale-90 relative group/fav border-none"])}"${ssrIncludeBooleanAttr($setup.favLoading) ? " disabled" : ""}>`);
    if ($setup.favLoading) {
      _push(`<span class="loading loading-spinner loading-xs"></span>`);
    } else {
      _push(`<svg class="${ssrRenderClass([{ "fill-current": $setup.isFavorited }, "w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover/fav:scale-125"])}" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`);
    }
    _push(`</button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-ghost join-item h-10 md:h-11 w-10 md:w-14 flex items-center justify-center text-base-content/40 hover:text-primary hover:bg-primary/5 active:scale-90 transition-all duration-500 group/share border-none"><svg class="w-4 h-4 md:w-5 md:h-5 transition-all duration-500 group-hover/share:rotate-12 group-hover/share:scale-110" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg></button></div>`);
  _push(ssrRenderComponent($setup["LoginRequiredModal"], {
    isOpen: $setup.showLoginModal,
    loginUrl: $setup.props.loginUrl || "/api/auth/google",
    onClose: ($event) => $setup.showLoginModal = false
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/interactions/SocialActions.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SocialActions = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Comments",
  props: {
    targetType: {},
    targetId: {},
    token: {},
    loginUrl: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const comments = ref([]);
    const currentUser = ref(null);
    const loading = ref(true);
    const submitting = ref(false);
    const reactingCommentId = ref(null);
    const newComment = ref("");
    const showLoginModal = ref(false);
    const apiBase = "https://dominicango-api.onrender.com/api".trim().replace(/\/+$/, "");
    const fetchComments = async () => {
      try {
        const headers = {};
        if (props.token) headers["Authorization"] = `Bearer ${props.token}`;
        const res = await fetch(`${apiBase}/interactions/${props.targetType}/${props.targetId}`, { headers });
        if (res.ok) {
          const { data } = await res.json();
          comments.value = data.comments;
          currentUser.value = data.currUser;
        }
      } catch (e) {
        console.error("Error fetching comments:", e);
      } finally {
        loading.value = false;
      }
    };
    const submitComment = async () => {
      if (!newComment.value.trim()) return;
      submitting.value = true;
      try {
        const headers = { "Content-Type": "application/json" };
        if (props.token) headers["Authorization"] = `Bearer ${props.token}`;
        const res = await fetch(`${apiBase}/interactions/comment`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            targetType: props.targetType,
            destinationId: props.targetType === "DESTINATION" ? props.targetId : void 0,
            blogId: props.targetType === "BLOG" ? props.targetId : void 0,
            content: newComment.value.trim()
          })
        });
        if (res.status === 401) {
          showLoginModal.value = true;
          return;
        }
        if (res.ok) {
          const { data } = await res.json();
          data.likes = 0;
          data.dislikes = 0;
          data.userReaction = null;
          comments.value.unshift(data);
          newComment.value = "";
        }
      } catch (e) {
        console.error("Error submitting comment:", e);
      } finally {
        submitting.value = false;
      }
    };
    const toggleCommentReaction = async (comment, type) => {
      if (!props.token) {
        showLoginModal.value = true;
        return;
      }
      reactingCommentId.value = comment.id;
      const originalReaction = comment.userReaction;
      if (originalReaction === type) {
        comment.userReaction = null;
        if (type === "LIKE") comment.likes--;
        else comment.dislikes--;
      } else {
        comment.userReaction = type;
        if (type === "LIKE") {
          comment.likes++;
          if (originalReaction === "DISLIKE") comment.dislikes--;
        } else {
          comment.dislikes++;
          if (originalReaction === "LIKE") comment.likes--;
        }
      }
      try {
        const res = await fetch(`${apiBase}/interactions/react`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify({
            targetType: "COMMENT",
            commentId: comment.id,
            type
          })
        });
        if (res.status === 401) {
          showLoginModal.value = true;
          return;
        }
        if (!res.ok) {
          throw new Error("API Error");
        }
      } catch (e) {
        console.error("Error reacting to comment:", e);
        comment.userReaction = originalReaction;
        fetchComments();
      } finally {
        reactingCommentId.value = null;
      }
    };
    const formatDate = (isoString) => {
      const date = new Date(isoString);
      const now = /* @__PURE__ */ new Date();
      const seconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
      if (seconds < 60) return `Hace ${seconds} seg`;
      const mins = Math.floor(seconds / 60);
      if (mins < 60) return `Hace ${mins} min`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `Hace ${hours} h`;
      const days = Math.floor(hours / 24);
      if (days < 30) return `Hace ${days} d`;
      return date.toLocaleDateString("es-DO", { month: "short", day: "numeric", year: "numeric" });
    };
    onMounted(() => {
      fetchComments();
    });
    const __returned__ = { props, comments, currentUser, loading, submitting, reactingCommentId, newComment, showLoginModal, apiBase, fetchComments, submitComment, toggleCommentReaction, formatDate, LoginRequiredModal };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-12 bg-base-100 rounded-3xl p-6 md:p-8 shadow-sm border border-base-content/10" }, _attrs))}><h3 class="font-heading text-2xl font-bold text-base-content mb-6 flex items-center gap-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Comentarios (${ssrInterpolate($setup.comments.length)}) </h3><form class="mb-12 relative z-10"><div class="flex flex-col sm:flex-row gap-4"><div class="avatar shrink-0 hidden sm:flex"><div class="w-12 h-12 rounded-full bg-neutral text-neutral-content flex items-center justify-center overflow-hidden border border-base-200 shadow-inner">`);
  if ($setup.currentUser) {
    _push(`<!--[-->`);
    if ($setup.currentUser.foto) {
      _push(`<img${ssrRenderAttr("src", $setup.currentUser.foto)}${ssrRenderAttr("alt", $setup.currentUser.name)}>`);
    } else {
      _push(`<span class="text-lg font-bold">${ssrInterpolate($setup.currentUser.name.charAt(0).toUpperCase())}</span>`);
    }
    _push(`<!--]-->`);
  } else {
    _push(`<span class="text-lg font-bold">U</span>`);
  }
  _push(`</div></div><div class="flex-1 filter drop-shadow-sm"><textarea class="textarea textarea-bordered w-full resize-none h-24 focus:border-primary transition-colors bg-base-100/80 backdrop-blur-sm placeholder:text-base-content/40 text-base" placeholder="Escribe tu opinión o experiencia..."${ssrIncludeBooleanAttr($setup.submitting) ? " disabled" : ""} required aria-label="Texto de comentario">${ssrInterpolate($setup.newComment)}</textarea><div class="flex justify-end mt-3"><button type="submit" class="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform"${ssrIncludeBooleanAttr($setup.submitting || (!$setup.props.token ? false : !$setup.newComment.trim())) ? " disabled" : ""}>`);
  if ($setup.submitting) {
    _push(`<span class="loading loading-spinner"></span>`);
  } else {
    _push(`<!---->`);
  }
  _push(` Comentar </button></div></div></div></form>`);
  if ($setup.loading) {
    _push(`<div class="flex justify-center py-12"><span class="loading loading-spinner text-primary loading-lg"></span></div>`);
  } else if ($setup.comments.length === 0) {
    _push(`<div class="text-center py-10 text-base-content/60 italic bg-base-200/40 rounded-3xl border border-dashed border-base-300"> Aún no hay opiniones. ¡Sé el primero en compartir la tuya! </div>`);
  } else {
    _push(`<div class="space-y-6"><!--[-->`);
    ssrRenderList($setup.comments, (c) => {
      _push(`<div class="flex gap-4 group"><div class="avatar shrink-0"><div class="w-12 h-12 rounded-full bg-neutral text-neutral-content flex items-center justify-center overflow-hidden border border-base-200 shadow-sm mt-1">`);
      if (c.user.foto) {
        _push(`<img${ssrRenderAttr("src", c.user.foto)}${ssrRenderAttr("alt", c.user.name)}>`);
      } else {
        _push(`<span class="text-lg font-bold">${ssrInterpolate(c.user.name.charAt(0).toUpperCase())}</span>`);
      }
      _push(`</div></div><div class="flex-1 bg-base-200/50 hover:bg-base-200 transition-colors rounded-2xl rounded-tl-[4px] p-5 w-full relative"><svg class="absolute top-4 right-4 text-base-content/5 w-8 h-8 pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg><div class="flex items-baseline justify-between mb-2"><h4 class="font-bold text-[15px] text-base-content">${ssrInterpolate(c.user.name)}</h4><span class="text-[11px] text-base-content/50 font-bold tracking-wide uppercase">${ssrInterpolate($setup.formatDate(c.createdAt))}</span></div><p class="text-base-content/80 text-sm md:text-[15px] whitespace-pre-wrap leading-relaxed relative z-10">${ssrInterpolate(c.content)}</p><div class="mt-3 flex items-center gap-3 relative z-10 border-t border-base-content/5 pt-3"><button class="${ssrRenderClass([c.userReaction === "LIKE" ? "btn-primary text-primary-content shadow-sm shadow-primary/20 scale-105" : "btn-ghost text-base-content/60 hover:text-primary hover:bg-primary/10", "btn btn-xs rounded-full gap-1.5 font-bold transition-all active:scale-95 hover:scale-105"])}"${ssrIncludeBooleanAttr($setup.reactingCommentId === c.id) ? " disabled" : ""} aria-label="Me gusta este comentario"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="${ssrRenderClass({ "fill-current": c.userReaction === "LIKE" })}"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg> ${ssrInterpolate(c.likes || 0)}</button><button class="${ssrRenderClass([c.userReaction === "DISLIKE" ? "btn-error text-error-content shadow-sm shadow-error/20 scale-105" : "btn-ghost text-base-content/60 hover:text-error hover:bg-error/10", "btn btn-xs rounded-full gap-1.5 font-bold transition-all active:scale-95 hover:scale-105"])}"${ssrIncludeBooleanAttr($setup.reactingCommentId === c.id) ? " disabled" : ""} aria-label="No me gusta este comentario"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="${ssrRenderClass({ "fill-current": c.userReaction === "DISLIKE" })}"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg> ${ssrInterpolate(c.dislikes || 0)}</button></div></div></div>`);
    });
    _push(`<!--]--></div>`);
  }
  _push(ssrRenderComponent($setup["LoginRequiredModal"], {
    isOpen: $setup.showLoginModal,
    loginUrl: $setup.props.loginUrl || "/api/auth/google",
    onClose: ($event) => $setup.showLoginModal = false
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/interactions/Comments.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Comments = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeleteContentModal",
  props: {
    show: { type: Boolean },
    resourceId: {},
    resourceType: {},
    resourceTitle: {},
    token: {}
  },
  emits: ["close", "deleted", "update:show"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const internalShow = ref(props.show);
    const reason = ref("");
    const isLoading = ref(false);
    const errorMsg = ref("");
    const successMsg = ref("");
    watch(() => props.show, (newVal) => {
      internalShow.value = newVal;
    });
    watch(internalShow, (newVal) => {
      if (newVal) {
        reason.value = "";
        errorMsg.value = "";
        successMsg.value = "";
      }
    });
    const open = () => {
      internalShow.value = true;
    };
    const close = () => {
      if (!isLoading.value) {
        internalShow.value = false;
        emit("close");
      }
    };
    const handleOpenEvent = () => {
      open();
    };
    onMounted(() => {
      document.addEventListener("open-delete-modal", handleOpenEvent);
    });
    onUnmounted(() => {
      document.removeEventListener("open-delete-modal", handleOpenEvent);
    });
    const confirmDelete = async () => {
      if (!reason.value.trim()) {
        errorMsg.value = "Por favor, explica el motivo para que el administrador pueda revisarlo.";
        return;
      }
      isLoading.value = true;
      errorMsg.value = "";
      try {
        const apiBase = "https://dominicango-api.onrender.com/api".trim().replace(/\/+$/, "");
        const endpoint = props.resourceType === "destination" ? "destinations" : "blogs";
        const res = await fetch(`${apiBase}/${endpoint}/${props.resourceId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${props.token}`
          },
          body: JSON.stringify({ reason: reason.value.trim() })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al eliminar");
        successMsg.value = "¡Contenido eliminado! Tu motivo ha sido enviado al administrador.";
        emit("deleted");
        setTimeout(() => {
          close();
          window.location.href = props.resourceType === "destination" ? "/destinos" : "/blog";
        }, 1800);
      } catch (err) {
        errorMsg.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };
    const __returned__ = { props, emit, internalShow, reason, isLoading, errorMsg, successMsg, open, close, handleOpenEvent, confirmDelete };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderTeleport(_push, (_push2) => {
    if ($setup.internalShow) {
      _push2(`<div class="fixed inset-0 z-999 flex items-end sm:items-center justify-center p-0 sm:p-4" data-v-79260b86><div class="absolute inset-0 bg-black/50 backdrop-blur-sm" data-v-79260b86></div><div class="relative bg-white sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg shadow-2xl overflow-hidden modal-panel" data-v-79260b86><div class="h-1.5 w-full bg-linear-to-r from-error via-red-400 to-error" data-v-79260b86></div><div class="flex items-start justify-between p-6 sm:p-8 pb-0" data-v-79260b86><div class="flex items-center gap-3" data-v-79260b86><div class="w-11 h-11 rounded-2xl bg-error/10 flex items-center justify-center shrink-0" data-v-79260b86><svg class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-79260b86><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-79260b86></path></svg></div><div data-v-79260b86><h3 class="font-heading font-extrabold text-lg text-base-content leading-tight" data-v-79260b86>Eliminar contenido</h3><p class="text-xs text-base-content/50 mt-0.5" data-v-79260b86>Esta acción es permanente</p></div></div><button class="w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center text-base-content/50 hover:text-base-content transition-colors shrink-0" data-v-79260b86><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-79260b86><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-79260b86></path></svg></button></div><div class="p-6 sm:p-8 space-y-5" data-v-79260b86><div class="flex items-center gap-3 bg-base-100 rounded-2xl px-4 py-3 border border-base-200" data-v-79260b86><svg class="w-4 h-4 text-base-content/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-79260b86><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-79260b86></path></svg><span class="text-sm font-semibold text-base-content line-clamp-1" data-v-79260b86>${ssrInterpolate($props.resourceTitle)}</span></div><div class="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3" data-v-79260b86><svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-79260b86><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-79260b86></path></svg><p class="text-xs text-amber-700 leading-relaxed" data-v-79260b86>Tu motivo será enviado al buzón del administrador para revisión. No podrás deshacer esta acción.</p></div><div class="space-y-2" data-v-79260b86><label class="flex items-center gap-1.5 text-sm font-bold text-base-content/80" data-v-79260b86><svg class="w-3.5 h-3.5 text-error" fill="currentColor" viewBox="0 0 20 20" data-v-79260b86><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" data-v-79260b86></path></svg> Motivo de la eliminación </label><textarea rows="3" placeholder="Ej: El lugar ya no existe, contiene información incorrecta, es un duplicado..." class="w-full rounded-2xl border border-base-200 bg-base-50 px-4 py-3 text-sm text-base-content placeholder:text-base-content/30 resize-none focus:outline-none focus:ring-2 focus:ring-error/20 focus:border-error/40 transition-all"${ssrIncludeBooleanAttr($setup.isLoading || !!$setup.successMsg) ? " disabled" : ""} data-v-79260b86>${ssrInterpolate($setup.reason)}</textarea></div>`);
      if ($setup.errorMsg) {
        _push2(`<div class="flex items-center gap-2.5 bg-error/8 border border-error/20 rounded-2xl px-4 py-3" data-v-79260b86><svg class="w-4 h-4 text-error shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-79260b86><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-79260b86></path></svg><span class="text-sm text-error" data-v-79260b86>${ssrInterpolate($setup.errorMsg)}</span></div>`);
      } else {
        _push2(`<!---->`);
      }
      if ($setup.successMsg) {
        _push2(`<div class="flex items-center gap-2.5 bg-success/10 border border-success/20 rounded-2xl px-4 py-3" data-v-79260b86><svg class="w-4 h-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-79260b86><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-79260b86></path></svg><span class="text-sm text-success font-medium" data-v-79260b86>${ssrInterpolate($setup.successMsg)}</span></div>`);
      } else {
        _push2(`<!---->`);
      }
      _push2(`</div><div class="px-6 sm:px-8 pb-6 sm:pb-8 flex gap-3 justify-end" data-v-79260b86><button type="button" class="px-5 py-2.5 rounded-full text-sm font-semibold text-base-content/70 hover:text-base-content bg-base-100 hover:bg-base-200 border border-base-200 transition-all"${ssrIncludeBooleanAttr($setup.isLoading) ? " disabled" : ""} data-v-79260b86> Cancelar </button><button type="button" class="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-error hover:bg-error/90 shadow-sm shadow-error/20 transition-all flex items-center gap-2 disabled:opacity-50"${ssrIncludeBooleanAttr($setup.isLoading || !!$setup.successMsg) ? " disabled" : ""} data-v-79260b86>`);
      if ($setup.isLoading) {
        _push2(`<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" data-v-79260b86></span>`);
      } else {
        _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-79260b86><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-79260b86></path></svg>`);
      }
      _push2(` ${ssrInterpolate($setup.isLoading ? "Eliminando..." : "Eliminar")}</button></div></div></div>`);
    } else {
      _push2(`<!---->`);
    }
  }, "body", false, _parent);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/DeleteContentModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DeleteContentModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-79260b86"]]);

export { Comments as C, DeleteContentModal as D, SocialActions as S };
