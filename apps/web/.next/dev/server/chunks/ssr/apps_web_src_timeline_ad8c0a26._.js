module.exports = [
"[project]/apps/web/src/timeline/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MASKABLE_ELEMENT_TYPES",
    ()=>MASKABLE_ELEMENT_TYPES,
    "RETIMABLE_ELEMENT_TYPES",
    ()=>RETIMABLE_ELEMENT_TYPES,
    "VISUAL_ELEMENT_TYPES",
    ()=>VISUAL_ELEMENT_TYPES
]);
function elementTypes(...types) {
    return types;
}
const MASKABLE_ELEMENT_TYPES = elementTypes("video", "image", "graphic");
const RETIMABLE_ELEMENT_TYPES = elementTypes("video", "audio");
const VISUAL_ELEMENT_TYPES = elementTypes("video", "image", "text", "sticker", "graphic");
}),
"[project]/apps/web/src/timeline/drag.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/apps/web/src/timeline/track-capabilities.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canTrackBeHidden",
    ()=>canTrackBeHidden,
    "canTrackHaveAudio",
    ()=>canTrackHaveAudio
]);
function canTrackHaveAudio(track) {
    return track.type === "audio" || track.type === "video";
}
function canTrackBeHidden(track) {
    return track.type !== "audio";
}
}),
"[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findTrackInSceneTracks",
    ()=>findTrackInSceneTracks,
    "updateElementInSceneTracks",
    ()=>updateElementInSceneTracks,
    "updateTrackInSceneTracks",
    ()=>updateTrackInSceneTracks
]);
function findTrackInSceneTracks({ tracks, trackId }) {
    if (tracks.main.id === trackId) {
        return tracks.main;
    }
    return tracks.overlay.find((track)=>track.id === trackId) ?? tracks.audio.find((track)=>track.id === trackId) ?? null;
}
function updateTrackInSceneTracks({ tracks, trackId, update }) {
    if (tracks.main.id === trackId) {
        return {
            ...tracks,
            main: update(tracks.main)
        };
    }
    const overlayTrackIndex = tracks.overlay.findIndex((track)=>track.id === trackId);
    if (overlayTrackIndex >= 0) {
        return {
            ...tracks,
            overlay: tracks.overlay.map((track, index)=>index === overlayTrackIndex ? update(track) : track)
        };
    }
    const audioTrackIndex = tracks.audio.findIndex((track)=>track.id === trackId);
    if (audioTrackIndex >= 0) {
        return {
            ...tracks,
            audio: tracks.audio.map((track, index)=>index === audioTrackIndex ? update(track) : track)
        };
    }
    return tracks;
}
function updateElementInTrack({ track, elementId, update, elementPredicate }) {
    const nextElements = track.elements.map((element)=>{
        if (element.id !== elementId) {
            return element;
        }
        if (elementPredicate && !elementPredicate(element)) {
            return element;
        }
        return update(element);
    });
    return {
        ...track,
        elements: nextElements
    };
}
function updateElementInSceneTracks({ tracks, trackId, elementId, update, elementPredicate }) {
    if (tracks.main.id === trackId) {
        return {
            ...tracks,
            main: updateElementInTrack({
                track: tracks.main,
                elementId,
                update,
                elementPredicate
            })
        };
    }
    const overlayTrackIndex = tracks.overlay.findIndex((track)=>track.id === trackId);
    if (overlayTrackIndex >= 0) {
        return {
            ...tracks,
            overlay: tracks.overlay.map((track, index)=>index === overlayTrackIndex ? updateElementInTrack({
                    track,
                    elementId,
                    update,
                    elementPredicate
                }) : track)
        };
    }
    const audioTrackIndex = tracks.audio.findIndex((track)=>track.id === trackId);
    if (audioTrackIndex >= 0) {
        return {
            ...tracks,
            audio: tracks.audio.map((track, index)=>index === audioTrackIndex ? updateElementInTrack({
                    track,
                    elementId,
                    update,
                    elementPredicate
                }) : track)
        };
    }
    return tracks;
}
}),
"[project]/apps/web/src/timeline/creation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DEFAULT_NEW_ELEMENT_DURATION",
    ()=>DEFAULT_NEW_ELEMENT_DURATION,
    "toElementDurationTicks",
    ()=>toElementDurationTicks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const DEFAULT_NEW_ELEMENT_DURATION = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTime"])({
    ticks: 5 * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"]
});
function toElementDurationTicks({ seconds }) {
    if (seconds == null) {
        return DEFAULT_NEW_ELEMENT_DURATION;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTimeFromSeconds"])({
        seconds
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/defaults.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DEFAULTS",
    ()=>DEFAULTS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/creation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const defaultTransform = {
    scaleX: 1,
    scaleY: 1,
    position: {
        x: 0,
        y: 0
    },
    rotate: 0
};
const defaultOpacity = 1;
const defaultBlendMode = "normal";
const defaultVolume = 0;
const defaultTextLetterSpacing = 0;
const defaultTextLineHeight = 1.2;
const defaultTextBackground = {
    enabled: false,
    color: "#000000",
    cornerRadius: 0,
    paddingX: 30,
    paddingY: 42,
    offsetX: 0,
    offsetY: 0
};
const defaultTextElement = {
    type: "text",
    name: "Text",
    duration: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_NEW_ELEMENT_DURATION"],
    startTime: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
    trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
    trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
    params: {
        content: "Default text",
        fontSize: 15,
        fontFamily: "Arial",
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        letterSpacing: defaultTextLetterSpacing,
        lineHeight: defaultTextLineHeight,
        "background.enabled": defaultTextBackground.enabled,
        "background.color": defaultTextBackground.color,
        "background.cornerRadius": defaultTextBackground.cornerRadius,
        "background.paddingX": defaultTextBackground.paddingX,
        "background.paddingY": defaultTextBackground.paddingY,
        "background.offsetX": defaultTextBackground.offsetX,
        "background.offsetY": defaultTextBackground.offsetY,
        "transform.positionX": defaultTransform.position.x,
        "transform.positionY": defaultTransform.position.y,
        "transform.scaleX": defaultTransform.scaleX,
        "transform.scaleY": defaultTransform.scaleY,
        "transform.rotate": defaultTransform.rotate,
        opacity: defaultOpacity,
        blendMode: defaultBlendMode
    }
};
const defaultTimelineViewState = {
    zoomLevel: 1,
    scrollLeft: 0,
    playheadTime: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
};
const DEFAULTS = {
    element: {
        transform: defaultTransform,
        opacity: defaultOpacity,
        blendMode: defaultBlendMode,
        volume: defaultVolume
    },
    text: {
        letterSpacing: defaultTextLetterSpacing,
        lineHeight: defaultTextLineHeight,
        background: defaultTextBackground,
        element: defaultTextElement
    },
    timeline: {
        viewState: defaultTimelineViewState
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/audio-constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VOLUME_DB_MAX",
    ()=>VOLUME_DB_MAX,
    "VOLUME_DB_MIN",
    ()=>VOLUME_DB_MIN
]);
const VOLUME_DB_MIN = -60;
const VOLUME_DB_MAX = 20;
}),
"[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildEffectElement",
    ()=>buildEffectElement,
    "buildElementFromMedia",
    ()=>buildElementFromMedia,
    "buildGraphicElement",
    ()=>buildGraphicElement,
    "buildLibraryAudioElement",
    ()=>buildLibraryAudioElement,
    "buildStickerElement",
    ()=>buildStickerElement,
    "buildTextElement",
    ()=>buildTextElement,
    "canElementBeHidden",
    ()=>canElementBeHidden,
    "canElementHaveAudio",
    ()=>canElementHaveAudio,
    "getElementFontFamilies",
    ()=>getElementFontFamilies,
    "getElementsAtTime",
    ()=>getElementsAtTime,
    "hasElementEffects",
    ()=>hasElementEffects,
    "hasMediaId",
    ()=>hasMediaId,
    "isMaskableElement",
    ()=>isMaskableElement,
    "isRetimableElement",
    ()=>isRetimableElement,
    "isVisualElement",
    ()=>isVisualElement,
    "requiresMediaId",
    ()=>requiresMediaId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/creation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/effects/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$string$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/string.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function canElementHaveAudio(element) {
    return element.type === "audio" || element.type === "video";
}
function isVisualElement(element) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VISUAL_ELEMENT_TYPES"].includes(element.type);
}
function isMaskableElement(element) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MASKABLE_ELEMENT_TYPES"].includes(element.type);
}
function isRetimableElement(element) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RETIMABLE_ELEMENT_TYPES"].includes(element.type);
}
function canElementBeHidden(element) {
    return isVisualElement(element);
}
function hasElementEffects({ element }) {
    return isVisualElement(element) && (element.effects?.length ?? 0) > 0;
}
function hasMediaId(element) {
    return "mediaId" in element;
}
function requiresMediaId({ element }) {
    return element.type === "video" || element.type === "image" || element.type === "audio" && element.sourceType === "upload";
}
function buildDefaultElementParams({ type }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDefaultParamValues"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBuiltInElementParams"])({
        type
    }));
}
function buildTextElement({ raw, startTime }) {
    const t = raw;
    return {
        type: "text",
        name: t.name ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULTS"].text.element.name,
        duration: t.duration ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_NEW_ELEMENT_DURATION"],
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        params: {
            ...buildDefaultElementParams({
                type: "text"
            }),
            ...t.params ?? {}
        }
    };
}
function buildEffectElement({ effectType, startTime, duration }) {
    const instance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildDefaultEffectInstance"])({
        effectType
    });
    return {
        type: "effect",
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$string$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capitalizeFirstLetter"])({
            string: instance.type
        }),
        effectType,
        params: instance.params,
        duration: duration ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_NEW_ELEMENT_DURATION"],
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
    };
}
function buildStickerElement({ stickerId, name, startTime, intrinsicWidth, intrinsicHeight }) {
    const stickerNameFromId = stickerId.split(":").slice(1).pop()?.replaceAll("-", " ") ?? stickerId;
    return {
        type: "sticker",
        name: name ?? stickerNameFromId,
        stickerId,
        intrinsicWidth,
        intrinsicHeight,
        duration: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_NEW_ELEMENT_DURATION"],
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        params: buildDefaultElementParams({
            type: "sticker"
        })
    };
}
function buildGraphicElement({ definitionId, name, startTime, params }) {
    const instance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildDefaultGraphicInstance"])({
        definitionId
    });
    return {
        type: "graphic",
        name: name ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$string$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capitalizeFirstLetter"])({
            string: instance.definitionId
        }),
        definitionId: instance.definitionId,
        params: mergeParamValues({
            base: {
                ...buildDefaultElementParams({
                    type: "graphic"
                }),
                ...instance.params
            },
            overrides: params
        }),
        duration: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_NEW_ELEMENT_DURATION"],
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
    };
}
function mergeParamValues({ base, overrides }) {
    const result = {
        ...base
    };
    for (const [key, value] of Object.entries(overrides ?? {})){
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return result;
}
function buildVideoElement({ mediaId, name, duration, startTime }) {
    return {
        type: "video",
        mediaId,
        name,
        duration,
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        sourceDuration: duration,
        isSourceAudioEnabled: true,
        hidden: false,
        params: buildDefaultElementParams({
            type: "video"
        })
    };
}
function buildImageElement({ mediaId, name, duration, startTime }) {
    return {
        type: "image",
        mediaId,
        name,
        duration,
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        hidden: false,
        params: buildDefaultElementParams({
            type: "image"
        })
    };
}
function buildUploadAudioElement({ mediaId, name, duration, startTime, buffer }) {
    const element = {
        type: "audio",
        sourceType: "upload",
        mediaId,
        name,
        duration,
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        sourceDuration: duration,
        params: buildDefaultElementParams({
            type: "audio"
        })
    };
    if (buffer) {
        element.buffer = buffer;
    }
    return element;
}
function buildElementFromMedia({ mediaId, mediaType, name, duration, startTime, buffer }) {
    switch(mediaType){
        case "audio":
            return buildUploadAudioElement({
                mediaId,
                name,
                duration,
                startTime,
                buffer
            });
        case "video":
            return buildVideoElement({
                mediaId,
                name,
                duration,
                startTime
            });
        case "image":
            return buildImageElement({
                mediaId,
                name,
                duration,
                startTime
            });
    }
}
function buildLibraryAudioElement({ sourceUrl, name, duration, startTime, buffer }) {
    const element = {
        type: "audio",
        sourceType: "library",
        sourceUrl,
        name,
        duration,
        startTime,
        trimStart: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        trimEnd: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
        sourceDuration: duration,
        params: buildDefaultElementParams({
            type: "audio"
        })
    };
    if (buffer) {
        element.buffer = buffer;
    }
    return element;
}
function getElementsAtTime({ tracks, time }) {
    const result = [];
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    for (const track of orderedTracks){
        for (const element of track.elements){
            const elementStart = element.startTime;
            const elementEnd = element.startTime + element.duration;
            if (time > elementStart && time < elementEnd) {
                result.push({
                    trackId: track.id,
                    elementId: element.id
                });
            }
        }
    }
    return result;
}
function getElementFontFamilies({ tracks }) {
    const families = new Set();
    for (const track of [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ]){
        for (const element of track.elements){
            if (element.type === "text" && typeof element.params.fontFamily === "string") {
                families.add(element.params.fontFamily);
            }
            if ("masks" in element) {
                for (const mask of element.masks ?? []){
                    if (mask.type === "text" && mask.params.fontFamily) {
                        families.add(mask.params.fontFamily);
                    }
                }
            }
        }
    }
    return [
        ...families
    ];
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/audio-separation/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildSeparatedAudioElement",
    ()=>buildSeparatedAudioElement,
    "canExtractSourceAudio",
    ()=>canExtractSourceAudio,
    "canRecoverSourceAudio",
    ()=>canRecoverSourceAudio,
    "canToggleSourceAudio",
    ()=>canToggleSourceAudio,
    "doesElementHaveEnabledAudio",
    ()=>doesElementHaveEnabledAudio,
    "getSourceAudioActionLabel",
    ()=>getSourceAudioActionLabel,
    "isSourceAudioEnabled",
    ()=>isSourceAudioEnabled,
    "isSourceAudioSeparated",
    ()=>isSourceAudioSeparated
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function isSourceAudioEnabled({ element }) {
    return element.isSourceAudioEnabled !== false;
}
function isSourceAudioSeparated({ element }) {
    return !isSourceAudioEnabled({
        element
    });
}
function canExtractSourceAudio(element, mediaAsset) {
    return element.type === "video" && isSourceAudioEnabled({
        element
    }) && !!mediaAsset && mediaAsset.hasAudio !== false;
}
function canRecoverSourceAudio(element) {
    return element.type === "video" && isSourceAudioSeparated({
        element
    });
}
function canToggleSourceAudio(element, mediaAsset) {
    return canRecoverSourceAudio(element) || canExtractSourceAudio(element, mediaAsset);
}
function doesElementHaveEnabledAudio({ element, mediaAsset }) {
    if (element.type === "audio") {
        return true;
    }
    return !!mediaAsset && mediaAsset.hasAudio !== false && isSourceAudioEnabled({
        element
    });
}
function buildSeparatedAudioElement({ sourceElement }) {
    return {
        type: "audio",
        sourceType: "upload",
        mediaId: sourceElement.mediaId,
        name: sourceElement.name,
        duration: sourceElement.duration,
        startTime: sourceElement.startTime,
        trimStart: sourceElement.trimStart,
        trimEnd: sourceElement.trimEnd,
        sourceDuration: sourceElement.sourceDuration,
        params: {
            volume: typeof sourceElement.params.volume === "number" ? sourceElement.params.volume : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULTS"].element.volume,
            muted: sourceElement.params.muted === true
        },
        retime: sourceElement.retime ? {
            rate: sourceElement.retime.rate,
            maintainPitch: sourceElement.retime.maintainPitch
        } : undefined,
        animations: cloneVolumeAnimations({
            animations: sourceElement.animations
        })
    };
}
function getSourceAudioActionLabel({ element }) {
    return isSourceAudioSeparated({
        element
    }) ? "Recover audio" : "Extract audio";
}
function cloneVolumeAnimations({ animations }) {
    const volumeData = animations?.volume;
    if (!volumeData) {
        return undefined;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneAnimations"])({
        animations: {
            volume: volumeData
        },
        shouldRegenerateKeyframeIds: true
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/scale.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_TIMELINE_PIXELS_PER_SECOND",
    ()=>BASE_TIMELINE_PIXELS_PER_SECOND,
    "TIMELINE_ZOOM_MAX",
    ()=>TIMELINE_ZOOM_MAX,
    "TIMELINE_ZOOM_MIN",
    ()=>TIMELINE_ZOOM_MIN
]);
const BASE_TIMELINE_PIXELS_PER_SECOND = 50;
const TIMELINE_ZOOM_MIN = 0.1;
const TIMELINE_ZOOM_MAX = 100;
}),
"[project]/apps/web/src/timeline/zoom-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getTimelinePaddingPx",
    ()=>getTimelinePaddingPx,
    "getTimelineZoomMin",
    ()=>getTimelineZoomMin,
    "getZoomPercent",
    ()=>getZoomPercent,
    "sliderToZoom",
    ()=>sliderToZoom,
    "zoomToSlider",
    ()=>zoomToSlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scale.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const PADDING_MAX_RATIO = 0.75;
const PADDING_MIN_RATIO = 0.15;
const PADDING_MIN_AT_ZOOM_PERCENT = 0.2;
function getTimelineZoomMin({ duration, containerWidth }) {
    const safeDurationSeconds = Math.max(duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"], 1);
    const safeContainerWidth = containerWidth ?? 1000;
    const contentRatioAtMinZoom = 1 - PADDING_MAX_RATIO;
    const availableWidth = safeContainerWidth * contentRatioAtMinZoom;
    const zoomToFit = availableWidth / (safeDurationSeconds * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_TIMELINE_PIXELS_PER_SECOND"]);
    return Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_ZOOM_MAX"], zoomToFit);
}
function getTimelinePaddingPx({ containerWidth, zoomLevel, minZoom }) {
    const zoomPercent = getZoomPercent({
        zoomLevel,
        minZoom
    });
    const paddingTransitionPercent = Math.min(zoomPercent / PADDING_MIN_AT_ZOOM_PERCENT, 1);
    const paddingRatio = PADDING_MAX_RATIO - (PADDING_MAX_RATIO - PADDING_MIN_RATIO) * paddingTransitionPercent;
    return containerWidth * paddingRatio;
}
function getZoomPercent({ zoomLevel, minZoom }) {
    return (zoomLevel - minZoom) / (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_ZOOM_MAX"] - minZoom);
}
function sliderToZoom({ sliderPosition, minZoom, maxZoom = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_ZOOM_MAX"] }) {
    const clampedPosition = Math.max(0, Math.min(1, sliderPosition));
    return minZoom * (maxZoom / minZoom) ** clampedPosition;
}
function zoomToSlider({ zoomLevel, minZoom, maxZoom = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_ZOOM_MAX"] }) {
    const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
    return Math.log(clampedZoom / minZoom) / Math.log(maxZoom / minZoom);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/ruler-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatRulerLabel",
    ()=>formatRulerLabel,
    "getRulerConfig",
    ()=>getRulerConfig,
    "shouldShowLabel",
    ()=>shouldShowLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scale.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fps/utils.ts [app-ssr] (ecmascript)");
;
;
/**
 * frame intervals for labels - starts at 2 so there's always at least
 * one tick between labels even at max zoom.
 * pattern: 2, 3, 5, 10, 15 (matches CapCut)
 */ const LABEL_FRAME_INTERVALS = [
    2,
    3,
    5,
    10,
    15
];
/**
 * frame intervals for ticks - can go down to 1 for max granularity.
 */ const TICK_FRAME_INTERVALS = [
    1,
    2,
    3,
    5,
    10,
    15
];
/**
 * second intervals for when we're zoomed out past frame-level detail.
 */ const SECOND_MULTIPLIERS = [
    1,
    2,
    3,
    5,
    10,
    15,
    30,
    60,
    120,
    300,
    600,
    900,
    1800,
    3600
];
/**
 * minimum pixel spacing between labels to keep them readable
 */ const MIN_LABEL_SPACING_PX = 120;
/**
 * minimum pixel spacing between ticks. much denser than labels.
 */ const MIN_TICK_SPACING_PX = 18;
function getRulerConfig({ zoomLevel, fps }) {
    const fpsFloat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frameRateToFloat"])(fps);
    const pixelsPerSecond = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_TIMELINE_PIXELS_PER_SECOND"] * zoomLevel;
    const pixelsPerFrame = pixelsPerSecond / fpsFloat;
    const labelIntervalSeconds = findOptimalInterval({
        pixelsPerFrame,
        pixelsPerSecond,
        fps: fpsFloat,
        minSpacingPx: MIN_LABEL_SPACING_PX,
        frameIntervals: LABEL_FRAME_INTERVALS
    });
    const rawTickIntervalSeconds = findOptimalInterval({
        pixelsPerFrame,
        pixelsPerSecond,
        fps: fpsFloat,
        minSpacingPx: MIN_TICK_SPACING_PX,
        frameIntervals: TICK_FRAME_INTERVALS
    });
    // ensure tick interval divides evenly into label interval so labels always land on ticks
    const tickIntervalSeconds = ensureTickDividesLabel({
        tickIntervalSeconds: rawTickIntervalSeconds,
        labelIntervalSeconds,
        pixelsPerFrame,
        pixelsPerSecond,
        fps: fpsFloat
    });
    return {
        labelIntervalSeconds,
        tickIntervalSeconds
    };
}
/**
 * adjusts tick interval to ensure it divides evenly into the label interval.
 * this guarantees labels always land on tick positions.
 */ function ensureTickDividesLabel({ tickIntervalSeconds, labelIntervalSeconds, pixelsPerFrame, pixelsPerSecond, fps }) {
    const labelFrames = Math.round(labelIntervalSeconds * fps);
    const tickFrames = Math.round(tickIntervalSeconds * fps);
    // if tick already divides label evenly, we're good
    if (labelFrames % tickFrames === 0) {
        return tickIntervalSeconds;
    }
    // find the smallest tick interval that divides the label interval and has adequate spacing
    for (const candidateFrames of TICK_FRAME_INTERVALS){
        if (labelFrames % candidateFrames === 0) {
            const candidateSpacing = pixelsPerFrame * candidateFrames;
            // accept if spacing meets minimum threshold
            if (candidateSpacing >= MIN_TICK_SPACING_PX) {
                return candidateFrames / fps;
            }
        }
    }
    // try second-level tick intervals that divide the label interval cleanly
    for (const candidateSeconds of SECOND_MULTIPLIERS){
        const ratio = labelIntervalSeconds / candidateSeconds;
        const isDivisor = Math.abs(ratio - Math.round(ratio)) < 0.0001;
        if (isDivisor) {
            const candidateSpacing = pixelsPerSecond * candidateSeconds;
            if (candidateSpacing >= MIN_TICK_SPACING_PX) {
                return candidateSeconds;
            }
        }
    }
    // fallback: use the label interval itself (no intermediate ticks)
    return labelIntervalSeconds;
}
function findOptimalInterval({ pixelsPerFrame, pixelsPerSecond, fps, minSpacingPx, frameIntervals }) {
    // try frame-level intervals first
    for (const frameInterval of frameIntervals){
        const pixelSpacing = pixelsPerFrame * frameInterval;
        if (pixelSpacing >= minSpacingPx) {
            return frameInterval / fps;
        }
    }
    // then try second-level intervals
    for (const secondMultiplier of SECOND_MULTIPLIERS){
        const pixelSpacing = pixelsPerSecond * secondMultiplier;
        if (pixelSpacing >= minSpacingPx) {
            return secondMultiplier;
        }
    }
    return 60;
}
function shouldShowLabel({ time, labelIntervalSeconds }) {
    const epsilon = 0.0001;
    const remainder = time % labelIntervalSeconds;
    return remainder < epsilon || remainder > labelIntervalSeconds - epsilon;
}
function formatRulerLabel({ timeInSeconds, fps }) {
    if (isSecondBoundary({
        timeInSeconds
    })) {
        return formatTimestamp({
            timeInSeconds
        });
    }
    const frameWithinSecond = getFrameWithinSecond({
        timeInSeconds,
        fps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frameRateToFloat"])(fps)
    });
    return `${frameWithinSecond}f`;
}
/**
 * checks if a time falls exactly on a second boundary.
 */ function isSecondBoundary({ timeInSeconds }) {
    const epsilon = 0.0001;
    const remainder = timeInSeconds % 1;
    return remainder < epsilon || remainder > 1 - epsilon;
}
/**
 * gets the frame number within the current second.
 */ function getFrameWithinSecond({ timeInSeconds, fps }) {
    const fractionalPart = timeInSeconds % 1;
    return Math.round(fractionalPart * fps);
}
/**
 * formats a timestamp as MM:SS or H:MM:SS when >= 1 hour.
 */ function formatTimestamp({ timeInSeconds }) {
    const totalSeconds = Math.round(timeInSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = totalSeconds % 60;
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    if (hours > 0) {
        return `${hours}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
}
}),
"[project]/apps/web/src/timeline/pixel-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TIMELINE_INDICATOR_LINE_WIDTH_PX",
    ()=>TIMELINE_INDICATOR_LINE_WIDTH_PX,
    "getCenteredLineLeft",
    ()=>getCenteredLineLeft,
    "getTimelinePixelsPerSecond",
    ()=>getTimelinePixelsPerSecond,
    "snapPixelToDeviceGrid",
    ()=>snapPixelToDeviceGrid,
    "timelineTimeToPixels",
    ()=>timelineTimeToPixels,
    "timelineTimeToSnappedPixels",
    ()=>timelineTimeToSnappedPixels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scale.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const TIMELINE_INDICATOR_LINE_WIDTH_PX = 2;
function getDevicePixelRatio({ devicePixelRatio }) {
    if (typeof devicePixelRatio === "number" && Number.isFinite(devicePixelRatio) && devicePixelRatio > 0) {
        return devicePixelRatio;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        return 1;
    }
    //TURBOPACK unreachable
    ;
}
function getTimelinePixelsPerSecond({ zoomLevel }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_TIMELINE_PIXELS_PER_SECOND"] * zoomLevel;
}
function timelineTimeToPixels({ time, zoomLevel }) {
    return time / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"] * getTimelinePixelsPerSecond({
        zoomLevel
    });
}
function snapPixelToDeviceGrid({ pixel, devicePixelRatio }) {
    const safeDevicePixelRatio = getDevicePixelRatio({
        devicePixelRatio
    });
    return Math.round(pixel * safeDevicePixelRatio) / safeDevicePixelRatio;
}
function timelineTimeToSnappedPixels({ time, zoomLevel, devicePixelRatio }) {
    const rawPixel = timelineTimeToPixels({
        time,
        zoomLevel
    });
    return snapPixelToDeviceGrid({
        pixel: rawPixel,
        devicePixelRatio
    });
}
function getCenteredLineLeft({ centerPixel, lineWidthPx = TIMELINE_INDICATOR_LINE_WIDTH_PX }) {
    return centerPixel - lineWidthPx / 2;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "calculateTotalDuration",
    ()=>calculateTotalDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/drag.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-capabilities.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-separation/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$zoom$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/zoom-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$ruler$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/ruler-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/pixel-utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$zoom$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$zoom$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
function calculateTotalDuration({ tracks }) {
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    if (orderedTracks.length === 0) return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    let maxEnd = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    for (const track of orderedTracks){
        for (const element of track.elements){
            const elementEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                a: element.startTime,
                b: element.duration
            });
            if (elementEnd > maxEnd) maxEnd = elementEnd;
        }
    }
    return maxEnd;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/drag-source.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimelineDragSource",
    ()=>TimelineDragSource
]);
const TIMELINE_DRAG_MIME = "application/x-timeline-drag";
class TimelineDragSource {
    active = null;
    begin({ dataTransfer, dragData }) {
        dataTransfer.setData(TIMELINE_DRAG_MIME, JSON.stringify(dragData));
        dataTransfer.effectAllowed = "copy";
        this.active = dragData;
    }
    end() {
        this.active = null;
    }
    getActive() {
        return this.active;
    }
    isActive() {
        return this.active !== null;
    }
}
}),
"[project]/apps/web/src/timeline/audio-state.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildAudioGainAutomation",
    ()=>buildAudioGainAutomation,
    "buildWaveformGainSamples",
    ()=>buildWaveformGainSamples,
    "clampDb",
    ()=>clampDb,
    "dBToLinear",
    ()=>dBToLinear,
    "getElementVolume",
    ()=>getElementVolume,
    "hasAnimatedVolume",
    ()=>hasAnimatedVolume,
    "isElementMuted",
    ()=>isElementMuted,
    "resolveEffectiveAudioGain",
    ()=>resolveEffectiveAudioGain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/values.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const DEFAULT_STEP_SECONDS = 1 / 60;
function clampDb(value) {
    if (!Number.isFinite(value)) {
        return 0;
    }
    return Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOLUME_DB_MAX"], Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VOLUME_DB_MIN"], value));
}
function dBToLinear(db) {
    return 10 ** (clampDb(db) / 20);
}
function getElementVolume({ element }) {
    const value = element.params.volume;
    return typeof value === "number" ? value : 0;
}
function isElementMuted({ element }) {
    return element.params.muted === true;
}
function hasAnimatedVolume({ element }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasKeyframesForPath"])({
        animations: element.animations,
        propertyPath: "volume"
    });
}
;
function resolveEffectiveAudioGain({ element, trackMuted = false, localTime }) {
    if (trackMuted || isElementMuted({
        element
    })) {
        return 0;
    }
    const resolvedDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveNumberAtTime"])({
        baseValue: getElementVolume({
            element
        }),
        animations: element.animations,
        propertyPath: "volume",
        localTime: Math.round(localTime * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"])
    });
    return dBToLinear(resolvedDb);
}
function buildWaveformGainSamples({ element, count }) {
    const durationSeconds = element.duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"];
    return Array.from({
        length: count
    }, (_, i)=>{
        const localTime = (i + 0.5) / count * durationSeconds;
        return resolveEffectiveAudioGain({
            element,
            localTime
        });
    });
}
function buildAudioGainAutomation({ element, trackMuted = false, fromLocalTime, toLocalTime, stepSeconds = DEFAULT_STEP_SECONDS }) {
    const startTime = Math.max(0, fromLocalTime);
    const endTime = Math.max(startTime, toLocalTime);
    const safeStep = Number.isFinite(stepSeconds) && stepSeconds > 0 ? stepSeconds : DEFAULT_STEP_SECONDS;
    const points = [];
    for(let localTime = startTime; localTime < endTime; localTime += safeStep){
        points.push({
            localTime,
            gain: resolveEffectiveAudioGain({
                element,
                trackMuted,
                localTime
            })
        });
    }
    points.push({
        localTime: endTime,
        gain: resolveEffectiveAudioGain({
            element,
            trackMuted,
            localTime: endTime
        })
    });
    return points;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "resolveAnimationTarget",
    ()=>resolveAnimationTarget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/effect-param-channel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/graphic-param-channel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/effects/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/definitions/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
// Leaf params expose a single component named "value". Composite params don't
// carry numeric ranges yet — revisit when one does.
function paramNumericRanges({ param }) {
    const range = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getParamNumericRange"])({
        param
    });
    return range ? {
        value: range
    } : undefined;
}
function buildParamDescriptor({ param, baseParams, setParams }) {
    if (param.keyframable === false) {
        return null;
    }
    return {
        channelLayout: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getParamChannelLayout"])({
            param
        }),
        defaultInterpolation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getParamDefaultInterpolation"])({
            param
        }),
        numericRanges: paramNumericRanges({
            param
        }),
        coerceValue: ({ value })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coerceParamValue"])({
                param,
                value
            }),
        getBaseValue: ()=>baseParams[param.key] ?? param.default,
        setBaseValue: ({ value })=>{
            const coercedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coerceParamValue"])({
                param,
                value
            });
            if (coercedValue === null) {
                return setParams(baseParams);
            }
            return setParams({
                ...baseParams,
                [param.key]: coercedValue
            });
        }
    };
}
function buildElementParamDescriptor({ element, paramKey }) {
    const param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementParam"])({
        element,
        key: paramKey
    });
    if (!param) {
        return null;
    }
    return buildParamDescriptor({
        param,
        baseParams: element.params,
        setParams: (params)=>({
                ...element,
                params
            })
    });
}
function buildGraphicParamDescriptor({ element, paramKey }) {
    if (element.type !== "graphic") {
        return null;
    }
    const definition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getGraphicDefinition"])({
        definitionId: element.definitionId
    });
    const param = definition.params.find((candidate)=>candidate.key === paramKey);
    if (!param) {
        return null;
    }
    return buildParamDescriptor({
        param,
        baseParams: element.params,
        setParams: (params)=>({
                ...element,
                params
            })
    });
}
function buildEffectParamDescriptor({ element, effectId, paramKey }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"])(element)) {
        return null;
    }
    const effect = element.effects?.find((candidate)=>candidate.id === effectId);
    if (!effect) {
        return null;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerDefaultEffects"])();
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["effectsRegistry"].get(effect.type);
    const param = definition.params.find((candidate)=>candidate.key === paramKey);
    if (!param) {
        return null;
    }
    return buildParamDescriptor({
        param,
        baseParams: effect.params,
        setParams: (params)=>({
                ...element,
                effects: element.effects?.map((candidate)=>candidate.id !== effectId ? candidate : {
                        ...candidate,
                        params
                    }) ?? element.effects
            })
    });
}
function resolveAnimationTarget({ element, path }) {
    const elementParamTarget = buildElementParamDescriptor({
        element,
        paramKey: path
    });
    if (elementParamTarget) {
        return elementParamTarget;
    }
    const graphicParamTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseGraphicParamPath"])({
        propertyPath: path
    });
    if (graphicParamTarget) {
        return buildGraphicParamDescriptor({
            element,
            paramKey: graphicParamTarget.paramKey
        });
    }
    const effectParamTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEffectParamPath"])({
        propertyPath: path
    });
    if (effectParamTarget) {
        return buildEffectParamDescriptor({
            element,
            effectId: effectParamTarget.effectId,
            paramKey: effectParamTarget.paramKey
        });
    }
    return null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/tracks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TRACK_NAMES",
    ()=>DEFAULT_TRACK_NAMES
]);
const DEFAULT_TRACK_NAMES = {
    video: "Video track",
    text: "Text track",
    audio: "Audio track",
    graphic: "Graphic track",
    effect: "Effect track"
};
}),
"[project]/apps/web/src/timeline/placement/track-factory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildEmptyTrack",
    ()=>buildEmptyTrack
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$tracks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/tracks.ts [app-ssr] (ecmascript)");
;
function buildEmptyTrack({ id, type, name }) {
    const trackName = name ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$tracks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_TRACK_NAMES"][type];
    switch(type){
        case "video":
            return {
                id,
                name: trackName,
                type: "video",
                elements: [],
                hidden: false,
                muted: false
            };
        case "text":
            return {
                id,
                name: trackName,
                type: "text",
                elements: [],
                hidden: false
            };
        case "graphic":
            return {
                id,
                name: trackName,
                type: "graphic",
                elements: [],
                hidden: false
            };
        case "audio":
            return {
                id,
                name: trackName,
                type: "audio",
                elements: [],
                muted: false
            };
        case "effect":
            return {
                id,
                name: trackName,
                type: "effect",
                elements: [],
                hidden: false
            };
        default:
            throw new Error(`Unsupported track type: ${type}`);
    }
}
}),
"[project]/apps/web/src/timeline/placement/apply.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyPlacement",
    ()=>applyPlacement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/track-factory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
;
;
;
function applyPlacement({ tracks, placementResult, elements, newTrackInsertIndexOverride }) {
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    if (placementResult.kind === "existingTrack") {
        const targetTrack = orderedTracks[placementResult.trackIndex];
        if (!targetTrack) {
            return null;
        }
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTrackInSceneTracks"])({
            tracks,
            trackId: targetTrack.id,
            update: (track)=>({
                    ...track,
                    elements: [
                        ...track.elements,
                        ...elements
                    ]
                })
        });
        return {
            updatedTracks,
            targetTrackId: targetTrack.id
        };
    }
    const newTrackId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
    const insertIndex = newTrackInsertIndexOverride ?? placementResult.insertIndex;
    const updatedTracks = placementResult.trackType === "audio" ? {
        ...tracks,
        audio: insertIntoAudioTracks({
            tracks,
            insertIndex,
            track: buildPlacedAudioTrack({
                id: newTrackId,
                elements
            })
        })
    } : {
        ...tracks,
        overlay: insertIntoOverlayTracks({
            tracks,
            insertIndex,
            track: buildPlacedOverlayTrack({
                id: newTrackId,
                type: placementResult.trackType,
                elements
            })
        })
    };
    return {
        updatedTracks,
        targetTrackId: newTrackId
    };
}
function insertIntoOverlayTracks({ tracks, insertIndex, track }) {
    const normalizedInsertIndex = Math.max(0, Math.min(insertIndex, tracks.overlay.length));
    const nextTracks = [
        ...tracks.overlay
    ];
    nextTracks.splice(normalizedInsertIndex, 0, track);
    return nextTracks;
}
function insertIntoAudioTracks({ tracks, insertIndex, track }) {
    const audioInsertIndex = Math.max(0, Math.min(insertIndex - tracks.overlay.length - 1, tracks.audio.length));
    const nextTracks = [
        ...tracks.audio
    ];
    nextTracks.splice(audioInsertIndex, 0, track);
    return nextTracks;
}
function buildPlacedAudioTrack({ id, elements }) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
            id,
            type: "audio"
        }),
        elements: elements
    };
}
function buildPlacedOverlayTrack({ id, type, elements }) {
    switch(type){
        case "video":
            return {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
                    id,
                    type: "video"
                }),
                elements: elements
            };
        case "text":
            return {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
                    id,
                    type: "text"
                }),
                elements: elements
            };
        case "graphic":
            return {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
                    id,
                    type: "graphic"
                }),
                elements: elements
            };
        case "effect":
            return {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
                    id,
                    type: "effect"
                }),
                elements: elements
            };
    }
}
}),
"[project]/apps/web/src/timeline/placement/compatibility.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canElementGoOnTrack",
    ()=>canElementGoOnTrack,
    "getTrackTypeForElementType",
    ()=>getTrackTypeForElementType,
    "validateElementTrackCompatibility",
    ()=>validateElementTrackCompatibility
]);
const ELEMENT_TRACK_MAP = {
    audio: "audio",
    text: "text",
    sticker: "graphic",
    graphic: "graphic",
    effect: "effect",
    video: "video",
    image: "video"
};
function getTrackTypeForElementType({ elementType }) {
    return ELEMENT_TRACK_MAP[elementType];
}
function canElementGoOnTrack({ elementType, trackType }) {
    return getTrackTypeForElementType({
        elementType
    }) === trackType;
}
function validateElementTrackCompatibility({ element, track }) {
    const isValid = canElementGoOnTrack({
        elementType: element.type,
        trackType: track.type
    });
    if (!isValid) {
        return {
            isValid: false,
            errorMessage: `${element.type} elements cannot be placed on ${track.type} tracks`
        };
    }
    return {
        isValid: true
    };
}
}),
"[project]/apps/web/src/timeline/placement/insert-index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultInsertIndexForTrack",
    ()=>getDefaultInsertIndexForTrack,
    "getHighestInsertIndexForTrack",
    ()=>getHighestInsertIndexForTrack,
    "resolvePreferredNewTrackPlacement",
    ()=>resolvePreferredNewTrackPlacement
]);
function getDefaultInsertIndexForTrack({ tracks, trackType }) {
    if (trackType === "audio") {
        return tracks.overlay.length + 1 + tracks.audio.length;
    }
    if (trackType === "effect") {
        return 0;
    }
    return tracks.overlay.length;
}
function getHighestInsertIndexForTrack({ tracks, trackType }) {
    if (trackType === "audio") {
        return tracks.overlay.length + 1;
    }
    return 0;
}
function resolvePreferredNewTrackPlacement({ tracks, trackType, preferredIndex, direction }) {
    const trackCount = tracks.overlay.length + 1 + tracks.audio.length;
    if (trackCount === 0) {
        return {
            insertIndex: 0,
            insertPosition: trackType === "audio" ? "below" : null
        };
    }
    const safePreferredIndex = Math.min(Math.max(preferredIndex, 0), trackCount - 1);
    const mainTrackIndex = tracks.overlay.length;
    if (trackType === "audio") {
        if (safePreferredIndex <= mainTrackIndex) {
            return {
                insertIndex: mainTrackIndex + 1,
                insertPosition: "below"
            };
        }
        return {
            insertIndex: direction === "above" ? safePreferredIndex : safePreferredIndex + 1,
            insertPosition: direction
        };
    }
    const insertIndex = direction === "above" ? safePreferredIndex : safePreferredIndex + 1;
    if (mainTrackIndex >= 0 && insertIndex > mainTrackIndex) {
        return {
            insertIndex: mainTrackIndex,
            insertPosition: "above"
        };
    }
    return {
        insertIndex,
        insertPosition: direction
    };
}
}),
"[project]/apps/web/src/timeline/placement/main-track.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MAIN_TRACK_NAME",
    ()=>MAIN_TRACK_NAME,
    "enforceMainTrackStart",
    ()=>enforceMainTrackStart,
    "getEarliestMainTrackElement",
    ()=>getEarliestMainTrackElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const MAIN_TRACK_NAME = "Main Track";
function getEarliestMainTrackElement({ mainTrack, excludeElementId }) {
    const elements = mainTrack.elements.filter((element)=>{
        return !excludeElementId || element.id !== excludeElementId;
    });
    if (elements.length === 0) {
        return null;
    }
    return elements.reduce((earliestElement, element)=>{
        return element.startTime < earliestElement.startTime ? element : earliestElement;
    });
}
function enforceMainTrackStart({ tracks, targetTrackId, requestedStartTime, excludeElementId }) {
    if (tracks.main.id !== targetTrackId) {
        return requestedStartTime;
    }
    const earliestElement = getEarliestMainTrackElement({
        mainTrack: tracks.main,
        excludeElementId
    });
    if (!earliestElement) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    }
    if (requestedStartTime <= earliestElement.startTime) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    }
    return requestedStartTime;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/placement/overlap.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canPlaceTimeSpansOnTrack",
    ()=>canPlaceTimeSpansOnTrack
]);
function wouldElementOverlap({ elements, startTime, endTime, excludeElementId }) {
    return elements.some((element)=>{
        if (excludeElementId && element.id === excludeElementId) {
            return false;
        }
        const elementEnd = element.startTime + element.duration;
        return startTime < elementEnd && endTime > element.startTime;
    });
}
function canPlaceTimeSpansOnTrack({ track, timeSpans }) {
    return timeSpans.every(({ startTime, duration, excludeElementId })=>{
        return !wouldElementOverlap({
            elements: track.elements,
            startTime,
            endTime: startTime + duration,
            excludeElementId
        });
    });
}
}),
"[project]/apps/web/src/timeline/placement/resolve.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "resolveTrackPlacement",
    ()=>resolveTrackPlacement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/insert-index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/compatibility.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/main-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$overlap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/overlap.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function buildExistingTrackResult({ track, trackIndex, tracks, timeSpans }) {
    const firstSpan = timeSpans[0];
    const requestedStartTime = firstSpan?.startTime ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    const adjustedStartTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enforceMainTrackStart"])({
        tracks,
        targetTrackId: track.id,
        requestedStartTime,
        excludeElementId: firstSpan?.excludeElementId
    });
    return {
        kind: "existingTrack",
        trackId: track.id,
        trackIndex,
        trackType: track.type,
        ...adjustedStartTime !== requestedStartTime ? {
            adjustedStartTime
        } : {}
    };
}
function buildNewTrackResult({ trackType, insertIndex, insertPosition }) {
    return {
        kind: "newTrack",
        trackType,
        insertIndex,
        insertPosition
    };
}
function findFirstAvailableTrackIndex({ tracks, trackType, timeSpans }) {
    return tracks.findIndex((track)=>{
        return track.type === trackType && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$overlap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canPlaceTimeSpansOnTrack"])({
            track,
            timeSpans
        });
    });
}
function resolveAlwaysNewTrack({ tracks, trackType, position }) {
    const insertIndex = position === "highest" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHighestInsertIndexForTrack"])({
        tracks,
        trackType
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultInsertIndexForTrack"])({
        tracks,
        trackType
    });
    return buildNewTrackResult({
        trackType,
        insertIndex,
        insertPosition: null
    });
}
function getInsertDirection({ hoverDirection, verticalDragDirection }) {
    if (verticalDragDirection === "up") {
        return "above";
    }
    if (verticalDragDirection === "down") {
        return "below";
    }
    return hoverDirection;
}
function resolveTrackPlacement({ tracks, ...placement }) {
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    const trackType = "trackType" in placement ? placement.trackType : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTrackTypeForElementType"])({
        elementType: placement.elementType
    });
    const { timeSpans, strategy } = placement;
    if (strategy.type === "explicit") {
        const trackIndex = orderedTracks.findIndex((track)=>track.id === strategy.trackId);
        if (trackIndex < 0) {
            return null;
        }
        const track = orderedTracks[trackIndex];
        if (track.type !== trackType) {
            return null;
        }
        return buildExistingTrackResult({
            track,
            trackIndex,
            tracks,
            timeSpans
        });
    }
    if (strategy.type === "firstAvailable") {
        const existingTrackIndex = findFirstAvailableTrackIndex({
            tracks: orderedTracks,
            trackType,
            timeSpans
        });
        if (existingTrackIndex >= 0) {
            return buildExistingTrackResult({
                track: orderedTracks[existingTrackIndex],
                trackIndex: existingTrackIndex,
                tracks,
                timeSpans
            });
        }
        return resolveAlwaysNewTrack({
            tracks,
            trackType,
            position: "highest"
        });
    }
    if (strategy.type === "preferIndex") {
        const preferredTrack = orderedTracks[strategy.trackIndex];
        const isPreferredTrackCompatible = !!preferredTrack && preferredTrack.type === trackType;
        const canUseExistingTrack = !strategy.createNewTrackOnly && isPreferredTrackCompatible && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$overlap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canPlaceTimeSpansOnTrack"])({
            track: preferredTrack,
            timeSpans
        });
        if (canUseExistingTrack) {
            return buildExistingTrackResult({
                track: preferredTrack,
                trackIndex: strategy.trackIndex,
                tracks,
                timeSpans
            });
        }
        const { insertIndex, insertPosition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePreferredNewTrackPlacement"])({
            tracks,
            trackType,
            preferredIndex: strategy.trackIndex,
            direction: getInsertDirection({
                hoverDirection: strategy.hoverDirection,
                verticalDragDirection: !isPreferredTrackCompatible ? strategy.verticalDragDirection : null
            })
        });
        return buildNewTrackResult({
            trackType,
            insertIndex,
            insertPosition
        });
    }
    if (strategy.type === "aboveSource") {
        const aboveTrackIndex = strategy.sourceTrackIndex - 1;
        const aboveTrack = orderedTracks[aboveTrackIndex];
        if (aboveTrack && aboveTrack.type === trackType && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$overlap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canPlaceTimeSpansOnTrack"])({
            track: aboveTrack,
            timeSpans
        })) {
            return buildExistingTrackResult({
                track: aboveTrack,
                trackIndex: aboveTrackIndex,
                tracks,
                timeSpans
            });
        }
        const firstAvailableTrackIndex = findFirstAvailableTrackIndex({
            tracks: orderedTracks,
            trackType,
            timeSpans
        });
        if (firstAvailableTrackIndex >= 0) {
            return buildExistingTrackResult({
                track: orderedTracks[firstAvailableTrackIndex],
                trackIndex: firstAvailableTrackIndex,
                tracks,
                timeSpans
            });
        }
        const insertIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHighestInsertIndexForTrack"])({
            tracks,
            trackType
        });
        return buildNewTrackResult({
            trackType,
            insertIndex,
            insertPosition: null
        });
    }
    return resolveAlwaysNewTrack({
        tracks,
        trackType,
        position: strategy.position
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/placement/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/apply.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/compatibility.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/insert-index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/main-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/track-factory.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/update-pipeline.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "applyElementUpdate",
    ()=>applyElementUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/retime/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/rate.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$split$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/split.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const deriveRules = [
    {
        triggers: [
            "retime"
        ],
        apply: ({ element, originalElement, patch })=>{
            if (!("retime" in patch) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRetimableElement"])(element)) {
                return {
                    element
                };
            }
            const nextRetime = patch.retime ? {
                ...patch.retime,
                rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampRetimeRate"])({
                    rate: patch.retime.rate
                })
            } : undefined;
            const sourceDuration = getSourceDuration({
                trimStart: originalElement.trimStart,
                trimEnd: originalElement.trimEnd,
                duration: originalElement.duration,
                sourceDuration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRetimableElement"])(originalElement) ? originalElement.sourceDuration : undefined,
                retime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRetimableElement"])(originalElement) ? originalElement.retime : undefined
            });
            const visibleSourceSpan = Math.max(0, sourceDuration - element.trimStart - element.trimEnd);
            const nextDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTimelineDurationForSourceSpan"])({
                    sourceSpan: visibleSourceSpan,
                    retime: nextRetime
                })
            });
            return {
                element: {
                    ...element,
                    retime: nextRetime,
                    duration: nextDuration
                },
                changedFields: [
                    "retime",
                    "duration"
                ]
            };
        }
    }
];
const enforceRules = [
    {
        triggers: [
            "duration"
        ],
        apply: ({ element })=>({
                element: {
                    ...element,
                    animations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampAnimationsToDuration"])({
                        animations: element.animations,
                        duration: element.duration
                    })
                }
            })
    },
    {
        triggers: [
            "startTime"
        ],
        apply: ({ element, context })=>{
            const requestedStartTime = element.startTime < __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"] ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"] : element.startTime;
            if (context.trackId !== context.tracks.main.id) {
                return {
                    element: {
                        ...element,
                        startTime: requestedStartTime
                    }
                };
            }
            const earliestElement = context.tracks.main.elements.filter((candidate)=>candidate.id !== element.id).reduce((earliest, candidate)=>{
                if (!earliest || candidate.startTime < earliest.startTime) {
                    return candidate;
                }
                return earliest;
            }, null);
            return {
                element: {
                    ...element,
                    startTime: !earliestElement || requestedStartTime <= earliestElement.startTime ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"] : requestedStartTime
                }
            };
        }
    }
];
function applyElementUpdate({ element, patch, context }) {
    let nextElement = {
        ...element,
        ...patch,
        params: {
            ...element.params,
            ...patch.params ?? {}
        }
    };
    const changedFields = new Set(Object.keys(patch));
    for (const rule of deriveRules){
        if (!shouldApplyRule({
            rule,
            changedFields
        })) {
            continue;
        }
        const result = rule.apply({
            element: nextElement,
            originalElement: element,
            patch,
            context
        });
        nextElement = result.element;
        for (const field of result.changedFields ?? []){
            changedFields.add(field);
        }
    }
    for (const rule of enforceRules){
        if (!shouldApplyRule({
            rule,
            changedFields
        })) {
            continue;
        }
        nextElement = rule.apply({
            element: nextElement,
            originalElement: element,
            patch,
            context
        }).element;
    }
    return nextElement;
}
function shouldApplyRule({ rule, changedFields }) {
    return rule.triggers.some((trigger)=>changedFields.has(trigger));
}
function getSourceDuration({ trimStart, trimEnd, duration, sourceDuration, retime }) {
    if (typeof sourceDuration === "number") {
        return sourceDuration;
    }
    return trimStart + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$split$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSourceSpanAtClipTime"])({
        clipTime: duration,
        retime
    }) + trimEnd;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildDefaultScene",
    ()=>buildDefaultScene,
    "canDeleteScene",
    ()=>canDeleteScene,
    "ensureMainScene",
    ()=>ensureMainScene,
    "findCurrentScene",
    ()=>findCurrentScene,
    "getFallbackSceneAfterDelete",
    ()=>getFallbackSceneAfterDelete,
    "getMainScene",
    ()=>getMainScene,
    "getProjectDurationFromScenes",
    ()=>getProjectDurationFromScenes,
    "updateSceneInArray",
    ()=>updateSceneInArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/main-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function getMainScene({ scenes }) {
    return scenes.find((scene)=>scene.isMain) || null;
}
function ensureMainScene({ scenes }) {
    const hasMain = scenes.some((scene)=>scene.isMain);
    if (!hasMain) {
        const mainScene = buildDefaultScene({
            name: "Main scene",
            isMain: true
        });
        return [
            mainScene,
            ...scenes
        ];
    }
    return scenes;
}
function buildDefaultScene({ name, isMain }) {
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])(),
        name,
        isMain,
        tracks: {
            overlay: [],
            main: {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])(),
                name: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MAIN_TRACK_NAME"],
                type: "video",
                elements: [],
                muted: false,
                hidden: false
            },
            audio: []
        },
        bookmarks: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
}
function canDeleteScene({ scene }) {
    if (scene.isMain) {
        return {
            canDelete: false,
            reason: "Cannot delete main scene"
        };
    }
    return {
        canDelete: true
    };
}
function getFallbackSceneAfterDelete({ scenes, deletedSceneId, currentSceneId }) {
    if (currentSceneId !== deletedSceneId) {
        return scenes.find((s)=>s.id === currentSceneId) || null;
    }
    return getMainScene({
        scenes
    });
}
function findCurrentScene({ scenes, currentSceneId }) {
    return scenes.find((s)=>s.id === currentSceneId) || getMainScene({
        scenes
    }) || scenes[0] || null;
}
function getProjectDurationFromScenes({ scenes }) {
    const mainScene = getMainScene({
        scenes
    }) ?? scenes[0] ?? null;
    if (!mainScene?.tracks) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["calculateTotalDuration"])({
        tracks: mainScene.tracks
    });
}
function updateSceneInArray({ scenes, sceneId, updates }) {
    return scenes.map((scene)=>scene.id === sceneId ? {
            ...scene,
            ...updates
        } : scene);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "findBookmarkIndex",
    ()=>findBookmarkIndex,
    "getBookmarkAtTime",
    ()=>getBookmarkAtTime,
    "getBookmarksActiveAtTime",
    ()=>getBookmarksActiveAtTime,
    "getFrameTime",
    ()=>getFrameTime,
    "isBookmarkAtTime",
    ()=>isBookmarkAtTime,
    "moveBookmarkInArray",
    ()=>moveBookmarkInArray,
    "removeBookmarkFromArray",
    ()=>removeBookmarkFromArray,
    "toggleBookmarkInArray",
    ()=>toggleBookmarkInArray,
    "updateBookmarkInArray",
    ()=>updateBookmarkInArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function bookmarkTimeEqual({ bookmarkTime, frameTime }) {
    return bookmarkTime === frameTime;
}
function findBookmarkIndex({ bookmarks, frameTime }) {
    return bookmarks.findIndex((bookmark)=>bookmarkTimeEqual({
            bookmarkTime: bookmark.time,
            frameTime
        }));
}
function isBookmarkAtTime({ bookmarks, frameTime }) {
    return bookmarks.some((bookmark)=>bookmarkTimeEqual({
            bookmarkTime: bookmark.time,
            frameTime
        }));
}
function toggleBookmarkInArray({ bookmarks, frameTime }) {
    const bookmarkIndex = findBookmarkIndex({
        bookmarks,
        frameTime
    });
    if (bookmarkIndex !== -1) {
        return bookmarks.filter((_, index)=>index !== bookmarkIndex);
    }
    const newBookmarks = [
        ...bookmarks,
        {
            time: frameTime
        }
    ];
    return newBookmarks.slice().sort((a, b)=>a.time - b.time);
}
function removeBookmarkFromArray({ bookmarks, frameTime }) {
    return bookmarks.filter((bookmark)=>!bookmarkTimeEqual({
            bookmarkTime: bookmark.time,
            frameTime
        }));
}
function updateBookmarkInArray({ bookmarks, frameTime, updates }) {
    const index = findBookmarkIndex({
        bookmarks,
        frameTime
    });
    if (index === -1) {
        return bookmarks;
    }
    const updated = {
        ...bookmarks[index],
        ...updates
    };
    const result = [
        ...bookmarks
    ];
    result[index] = updated;
    return result;
}
function moveBookmarkInArray({ bookmarks, fromTime, toTime }) {
    const index = findBookmarkIndex({
        bookmarks,
        frameTime: fromTime
    });
    if (index === -1) {
        return bookmarks;
    }
    const updated = {
        ...bookmarks[index],
        time: toTime
    };
    const result = [
        ...bookmarks
    ];
    result[index] = updated;
    return result.slice().sort((a, b)=>a.time - b.time);
}
function getFrameTime({ time, fps }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundFrameTime"])({
        time,
        fps
    });
}
function getBookmarkAtTime({ bookmarks, frameTime }) {
    const index = findBookmarkIndex({
        bookmarks,
        frameTime
    });
    return index === -1 ? null : bookmarks[index];
}
function getBookmarksActiveAtTime({ bookmarks, time }) {
    return bookmarks.filter((bookmark)=>{
        const start = bookmark.time;
        const end = bookmark.duration != null && bookmark.duration > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
            a: start,
            b: bookmark.duration
        }) : start;
        return time >= start && time <= end;
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/bookmarks/snap-source.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBookmarkSnapPoints",
    ()=>getBookmarkSnapPoints
]);
function getBookmarkSnapPoints({ bookmarks, excludeBookmarkTime }) {
    return bookmarks.flatMap((bookmark)=>{
        if (excludeBookmarkTime != null && bookmark.time === excludeBookmarkTime) {
            return [];
        }
        return [
            {
                time: bookmark.time,
                type: "bookmark"
            }
        ];
    });
}
}),
"[project]/apps/web/src/timeline/bookmarks/preview-overlay-source.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "bookmarkNotesPreviewOverlay",
    ()=>bookmarkNotesPreviewOverlay,
    "getBookmarkPreviewOverlaySource",
    ()=>getBookmarkPreviewOverlaySource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$overlays$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/overlays.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const bookmarkNotesPreviewOverlay = {
    id: "bookmark-notes",
    label: "Show bookmark notes",
    defaultVisible: true
};
function BookmarkNotesOverlay({ bookmarks }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5",
        "aria-live": "polite",
        children: bookmarks.map((bookmark)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex max-w-[min(200px,50vw)] px-2.5 py-1.5 text-left text-white text-xs shadow-md backdrop-blur-sm",
                style: {
                    backgroundColor: "rgb(0 0 0 / 0.5)",
                    borderLeft: bookmark.color ? `3px solid ${bookmark.color}` : "3px solid var(--primary)"
                },
                children: bookmark.note
            }, bookmark.time, false, {
                fileName: "[project]/apps/web/src/timeline/bookmarks/preview-overlay-source.tsx",
                lineNumber: 24,
                columnNumber: 5
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/timeline/bookmarks/preview-overlay-source.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this);
}
function getBookmarkPreviewOverlaySource({ bookmarks, time, isVisible }) {
    const bookmarksWithNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBookmarksActiveAtTime"])({
        bookmarks,
        time
    }).flatMap((bookmark)=>{
        if (bookmark.note == null || bookmark.note.trim() === "") {
            return [];
        }
        return [
            {
                time: bookmark.time,
                note: bookmark.note,
                color: bookmark.color
            }
        ];
    });
    if (!isVisible || bookmarksWithNotes.length === 0) {
        return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$overlays$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_PREVIEW_OVERLAY_SOURCE_RESULT"],
            definitions: [
                bookmarkNotesPreviewOverlay
            ]
        };
    }
    return {
        definitions: [
            bookmarkNotesPreviewOverlay
        ],
        instances: [
            {
                id: bookmarkNotesPreviewOverlay.id,
                mount: {
                    kind: "hud",
                    anchor: "top-left",
                    order: 0
                },
                plane: "over-interaction",
                pointerEvents: "none",
                render: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BookmarkNotesOverlay, {
                        bookmarks: bookmarksWithNotes
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/preview-overlay-source.tsx",
                        lineNumber: 82,
                        columnNumber: 19
                    }, this)
            }
        ]
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/components/interaction.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TIMELINE_DRAG_THRESHOLD_PX",
    ()=>TIMELINE_DRAG_THRESHOLD_PX,
    "TIMELINE_HORIZONTAL_WHEEL_STEP_PX",
    ()=>TIMELINE_HORIZONTAL_WHEEL_STEP_PX,
    "TIMELINE_ZOOM_ANCHOR_PLAYHEAD_THRESHOLD",
    ()=>TIMELINE_ZOOM_ANCHOR_PLAYHEAD_THRESHOLD,
    "TIMELINE_ZOOM_BUTTON_FACTOR",
    ()=>TIMELINE_ZOOM_BUTTON_FACTOR
]);
const TIMELINE_DRAG_THRESHOLD_PX = 5;
const TIMELINE_HORIZONTAL_WHEEL_STEP_PX = 40;
const TIMELINE_ZOOM_BUTTON_FACTOR = 1.7;
const TIMELINE_ZOOM_ANCHOR_PLAYHEAD_THRESHOLD = 0.15;
}),
"[project]/apps/web/src/timeline/drag-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getMouseTimeFromClientX",
    ()=>getMouseTimeFromClientX
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scale.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function getMouseTimeFromClientX({ clientX, containerRect, zoomLevel, scrollLeft }) {
    const mouseX = clientX - containerRect.left + scrollLeft;
    const seconds = Math.max(0, mouseX / (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_TIMELINE_PIXELS_PER_SECOND"] * zoomLevel));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTime"])({
        ticks: Math.round(seconds * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"])
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/snapping/build.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTimelineSnapPoints",
    ()=>buildTimelineSnapPoints
]);
function buildTimelineSnapPoints({ sources }) {
    const snapPoints = [];
    for (const source of sources){
        for (const snapPoint of source()){
            snapPoints.push(snapPoint);
        }
    }
    return snapPoints;
}
}),
"[project]/apps/web/src/timeline/snapping/resolve.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveTimelineSnap",
    ()=>resolveTimelineSnap
]);
function resolveTimelineSnap({ targetTime, snapPoints, maxSnapDistance }) {
    let closestSnapPoint = null;
    let closestDistance = Infinity;
    for (const snapPoint of snapPoints){
        const distance = Math.abs(targetTime - snapPoint.time);
        if (distance <= maxSnapDistance && distance < closestDistance) {
            closestDistance = distance;
            closestSnapPoint = snapPoint;
        }
    }
    return {
        snappedTime: closestSnapPoint ? closestSnapPoint.time : targetTime,
        snapPoint: closestSnapPoint,
        snapDistance: closestDistance
    };
}
}),
"[project]/apps/web/src/timeline/snapping/threshold.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getTimelineSnapThresholdInTicks",
    ()=>getTimelineSnapThresholdInTicks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scale.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const DEFAULT_TIMELINE_SNAP_THRESHOLD_PX = 10;
function getTimelineSnapThresholdInTicks({ zoomLevel, snapThresholdPx = DEFAULT_TIMELINE_SNAP_THRESHOLD_PX }) {
    const pixelsPerSecond = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BASE_TIMELINE_PIXELS_PER_SECOND"] * zoomLevel;
    return snapThresholdPx / pixelsPerSecond * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"];
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/snapping/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$build$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/snapping/build.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/snapping/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$threshold$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/snapping/threshold.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$threshold$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$threshold$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/element-snap-source.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getElementEdgeSnapPoints",
    ()=>getElementEdgeSnapPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function getElementEdgeSnapPoints({ tracks, excludeElementIds }) {
    const snapPoints = [];
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    for (const track of orderedTracks){
        for (const element of track.elements){
            if (excludeElementIds?.has(element.id)) {
                continue;
            }
            snapPoints.push({
                time: element.startTime,
                type: "element-start",
                elementId: element.id,
                trackId: track.id
            }, {
                time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                    a: element.startTime,
                    b: element.duration
                }),
                type: "element-end",
                elementId: element.id,
                trackId: track.id
            });
        }
    }
    return snapPoints;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/playhead-snap-source.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPlayheadSnapPoints",
    ()=>getPlayheadSnapPoints
]);
function getPlayheadSnapPoints({ playheadTime }) {
    return [
        {
            time: playheadTime,
            type: "playhead"
        }
    ];
}
}),
"[project]/apps/web/src/timeline/animation-snap-points.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getAnimationKeyframeSnapPointsForTimeline",
    ()=>getAnimationKeyframeSnapPointsForTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function getAnimationKeyframeSnapPointsForTimeline({ tracks, excludeElementIds }) {
    const snapPoints = [];
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    for (const track of orderedTracks){
        for (const element of track.elements){
            if (excludeElementIds?.has(element.id)) {
                continue;
            }
            for (const keyframe of (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementKeyframes"])({
                animations: element.animations
            })){
                snapPoints.push({
                    time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                        a: element.startTime,
                        b: keyframe.time
                    }),
                    type: "keyframe",
                    elementId: element.id,
                    trackId: track.id
                });
            }
        }
    }
    return snapPoints;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/bookmarks/hooks/use-bookmark-drag.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useBookmarkDrag",
    ()=>useBookmarkDrag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-shift-key.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/components/interaction.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/drag-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/snapping/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$build$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/snapping/build.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$threshold$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/snapping/threshold.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/snapping/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/snap-source.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-snap-source.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$playhead$2d$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/playhead-snap-source.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$snap$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-snap-points.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$threshold$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$snap$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$threshold$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$snap$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
function useBookmarkDrag({ zoomLevel, scrollRef, snappingEnabled, onSnapPointChange }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const isShiftHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShiftKey"])();
    const tracks = editor.scenes.getActiveScene().tracks;
    const activeScene = editor.scenes.getActiveScene();
    const bookmarks = activeScene?.bookmarks ?? [];
    const playheadTime = editor.playback.getCurrentTime();
    const duration = editor.timeline.getTotalDuration();
    const [dragState, setDragState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isDragging: false,
        bookmarkTime: null,
        currentTime: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
    });
    const [isPendingDrag, setIsPendingDrag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pendingDragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastMouseXRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const startDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ bookmarkTime, initialCurrentTime })=>{
        setDragState({
            isDragging: true,
            bookmarkTime,
            currentTime: initialCurrentTime
        });
    }, []);
    const endDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setDragState({
            isDragging: false,
            bookmarkTime: null,
            currentTime: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
        });
    }, []);
    const getSnapResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ rawTime, excludeBookmarkTime })=>{
        const shouldSnap = snappingEnabled && !isShiftHeldRef.current;
        if (!shouldSnap) {
            return {
                snappedTime: rawTime,
                snapPoint: null
            };
        }
        const snapPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$build$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTimelineSnapPoints"])({
            sources: [
                ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementEdgeSnapPoints"])({
                        tracks
                    }),
                ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$playhead$2d$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPlayheadSnapPoints"])({
                        playheadTime
                    }),
                ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBookmarkSnapPoints"])({
                        bookmarks,
                        excludeBookmarkTime
                    }),
                ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$snap$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAnimationKeyframeSnapPointsForTimeline"])({
                        tracks
                    })
            ]
        });
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTimelineSnap"])({
            targetTime: rawTime,
            snapPoints,
            maxSnapDistance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$snapping$2f$threshold$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTimelineSnapThresholdInTicks"])({
                zoomLevel
            })
        });
        return {
            snappedTime: result.snappedTime,
            snapPoint: result.snapPoint
        };
    }, [
        snappingEnabled,
        tracks,
        playheadTime,
        bookmarks,
        zoomLevel,
        isShiftHeldRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!dragState.isDragging && !isPendingDrag) return;
        const handleMouseMove = (event)=>{
            lastMouseXRef.current = event.clientX;
            const scrollContainer = scrollRef.current;
            if (!scrollContainer) return;
            if (isPendingDrag && pendingDragRef.current) {
                const { startMouseX, startMouseY, bookmarkTime } = pendingDragRef.current;
                const deltaX = Math.abs(event.clientX - startMouseX);
                const deltaY = Math.abs(event.clientY - startMouseY);
                if (deltaX <= __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_DRAG_THRESHOLD_PX"] && deltaY <= __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_DRAG_THRESHOLD_PX"]) {
                    return;
                }
                const activeProject = editor.project.getActive();
                if (!activeProject) return;
                const scrollLeft = scrollContainer.scrollLeft;
                const mouseTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMouseTimeFromClientX"])({
                    clientX: event.clientX,
                    containerRect: scrollContainer.getBoundingClientRect(),
                    zoomLevel,
                    scrollLeft
                });
                const clampedTime = mouseTime > duration ? duration : mouseTime;
                const frameSnappedTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundFrameTime"])({
                    time: clampedTime,
                    fps: activeProject.settings.fps
                });
                const { snappedTime: initialTime } = getSnapResult({
                    rawTime: frameSnappedTime,
                    excludeBookmarkTime: bookmarkTime
                });
                startDrag({
                    bookmarkTime,
                    initialCurrentTime: initialTime
                });
                pendingDragRef.current = null;
                setIsPendingDrag(false);
                return;
            }
            if (!dragState.isDragging || dragState.bookmarkTime === null) return;
            const activeProject = editor.project.getActive();
            if (!activeProject) return;
            const scrollLeft = scrollContainer.scrollLeft;
            const mouseTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMouseTimeFromClientX"])({
                clientX: event.clientX,
                containerRect: scrollContainer.getBoundingClientRect(),
                zoomLevel,
                scrollLeft
            });
            const clampedTime = mouseTime > duration ? duration : mouseTime;
            const frameSnappedTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundFrameTime"])({
                time: clampedTime,
                fps: activeProject.settings.fps
            });
            const snapResult = getSnapResult({
                rawTime: frameSnappedTime,
                excludeBookmarkTime: dragState.bookmarkTime
            });
            setDragState((previousDragState)=>({
                    ...previousDragState,
                    currentTime: snapResult.snappedTime
                }));
            onSnapPointChange?.(snapResult.snapPoint);
        };
        document.addEventListener("mousemove", handleMouseMove);
        return ()=>document.removeEventListener("mousemove", handleMouseMove);
    }, [
        dragState.isDragging,
        dragState.bookmarkTime,
        zoomLevel,
        duration,
        editor.project,
        scrollRef,
        isPendingDrag,
        startDrag,
        getSnapResult,
        onSnapPointChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!dragState.isDragging) return;
        const handleMouseUp = ()=>{
            if (dragState.bookmarkTime === null) {
                endDrag();
                onSnapPointChange?.(null);
                return;
            }
            const clampedTime = dragState.currentTime > duration ? duration : dragState.currentTime;
            editor.scenes.moveBookmark({
                fromTime: dragState.bookmarkTime,
                toTime: clampedTime
            });
            endDrag();
            onSnapPointChange?.(null);
        };
        document.addEventListener("mouseup", handleMouseUp);
        return ()=>document.removeEventListener("mouseup", handleMouseUp);
    }, [
        dragState.isDragging,
        dragState.bookmarkTime,
        dragState.currentTime,
        duration,
        endDrag,
        onSnapPointChange,
        editor.scenes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isPendingDrag) return;
        const handleMouseUp = ()=>{
            pendingDragRef.current = null;
            setIsPendingDrag(false);
            onSnapPointChange?.(null);
        };
        document.addEventListener("mouseup", handleMouseUp);
        return ()=>document.removeEventListener("mouseup", handleMouseUp);
    }, [
        isPendingDrag,
        onSnapPointChange
    ]);
    const handleBookmarkMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ event, bookmark })=>{
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        pendingDragRef.current = {
            bookmarkTime: bookmark.time,
            startMouseX: event.clientX,
            startMouseY: event.clientY
        };
        setIsPendingDrag(true);
    }, []);
    return {
        dragState,
        handleBookmarkMouseDown,
        lastMouseXRef
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/components/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TIMELINE_BOOKMARK_COLOR",
    ()=>DEFAULT_TIMELINE_BOOKMARK_COLOR,
    "SELECTED_TRACK_ROW_CLASS",
    ()=>SELECTED_TRACK_ROW_CLASS,
    "TIMELINE_AUDIO_WAVEFORM_COLOR",
    ()=>TIMELINE_AUDIO_WAVEFORM_COLOR,
    "TIMELINE_TRACK_THEME",
    ()=>TIMELINE_TRACK_THEME,
    "getTimelineElementClassName",
    ()=>getTimelineElementClassName
]);
const TIMELINE_AUDIO_WAVEFORM_COLOR = "rgba(255, 255, 255, 0.7)";
const TIMELINE_TRACK_THEME = {
    video: {
        elementClassName: "transparent"
    },
    text: {
        elementClassName: "bg-[#5DBAA0]"
    },
    audio: {
        elementClassName: "bg-[#8F5DBA]",
        waveformColor: TIMELINE_AUDIO_WAVEFORM_COLOR
    },
    graphic: {
        elementClassName: "bg-[#BA5D7A]"
    },
    effect: {
        elementClassName: "bg-[#5d93ba]"
    }
};
const SELECTED_TRACK_ROW_CLASS = "bg-accent/50";
const DEFAULT_TIMELINE_BOOKMARK_COLOR = "#009dff";
function getTimelineElementClassName({ type }) {
    return TIMELINE_TRACK_THEME[type].elementClassName.trim();
}
}),
"[project]/apps/web/src/timeline/components/layout.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXPANDED_GROUP_HEADER_HEIGHT_PX",
    ()=>EXPANDED_GROUP_HEADER_HEIGHT_PX,
    "KEYFRAME_DIAMOND_SIZE_PX",
    ()=>KEYFRAME_DIAMOND_SIZE_PX,
    "KEYFRAME_LANE_HEIGHT_PX",
    ()=>KEYFRAME_LANE_HEIGHT_PX,
    "TIMELINE_BOOKMARK_ROW_HEIGHT_PX",
    ()=>TIMELINE_BOOKMARK_ROW_HEIGHT_PX,
    "TIMELINE_CONTENT_TOP_PADDING_PX",
    ()=>TIMELINE_CONTENT_TOP_PADDING_PX,
    "TIMELINE_RULER_HEIGHT_PX",
    ()=>TIMELINE_RULER_HEIGHT_PX,
    "TIMELINE_SCROLLBAR_SIZE_PX",
    ()=>TIMELINE_SCROLLBAR_SIZE_PX,
    "TIMELINE_TRACK_GAP_PX",
    ()=>TIMELINE_TRACK_GAP_PX,
    "TIMELINE_TRACK_HEIGHTS_PX",
    ()=>TIMELINE_TRACK_HEIGHTS_PX,
    "TIMELINE_TRACK_LABELS_COLUMN_WIDTH_PX",
    ()=>TIMELINE_TRACK_LABELS_COLUMN_WIDTH_PX
]);
const TIMELINE_TRACK_HEIGHTS_PX = {
    video: 65,
    text: 25,
    audio: 50,
    graphic: 25,
    effect: 25
};
const KEYFRAME_LANE_HEIGHT_PX = 20;
const KEYFRAME_DIAMOND_SIZE_PX = 14;
const EXPANDED_GROUP_HEADER_HEIGHT_PX = 18;
const TIMELINE_TRACK_GAP_PX = 6;
const TIMELINE_TRACK_LABELS_COLUMN_WIDTH_PX = 112;
const TIMELINE_RULER_HEIGHT_PX = 22;
const TIMELINE_BOOKMARK_ROW_HEIGHT_PX = 16;
const TIMELINE_SCROLLBAR_SIZE_PX = 12;
const TIMELINE_CONTENT_TOP_PADDING_PX = 2;
}),
"[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TimelineBookmarksRow",
    ()=>TimelineBookmarksRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/components/theme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$layout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/components/layout.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fps/defaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowTurnBackwardIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowTurnBackwardIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowTurnBackwardIcon.js [app-ssr] (ecmascript) <export default as ArrowTurnBackwardIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/Delete02Icon.js [app-ssr] (ecmascript) <export default as Delete02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/popover.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/color-picker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$string$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/string.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/math.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/pixel-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const MIN_BOOKMARK_WIDTH_PX = 2;
const BOOKMARK_MARKER_WIDTH_PX = 12;
const BOOKMARK_MARKER_HEIGHT_PX = 15;
const BOOKMARK_HALF_WIDTH_PX = BOOKMARK_MARKER_WIDTH_PX / 2;
const BOOKMARK_MARKER_CLIP_PATH = "polygon(50% 100%, 12% 72%, 12% 10%, 88% 10%, 88% 72%)";
function seekToBookmarkTime({ editor, time }) {
    const activeProject = editor.project.getActive();
    const duration = editor.timeline.getTotalDuration();
    const rate = activeProject?.settings.fps ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_FPS"];
    const snappedTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapSeekMediaTime"])({
        time,
        duration,
        fps: rate
    });
    editor.playback.seek({
        time: snappedTime
    });
}
function TimelineBookmarksRow({ zoomLevel, dynamicTimelineWidth, dragState, onBookmarkMouseDown, handleWheel, handleTimelineContentClick, handleRulerTrackingMouseDown, handleRulerMouseDown }) {
    const bookmarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.scenes.getActiveScene().bookmarks);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex-1 overflow-hidden",
        style: {
            height: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$layout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_BOOKMARK_ROW_HEIGHT_PX"]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "relative w-full cursor-default select-none border-0 bg-transparent p-0",
            style: {
                height: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$layout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_BOOKMARK_ROW_HEIGHT_PX"],
                width: `${dynamicTimelineWidth}px`
            },
            "aria-label": "Timeline ruler",
            type: "button",
            onWheel: handleWheel,
            onClick: (event)=>{
                if (!event.currentTarget.contains(event.target)) return;
                handleTimelineContentClick(event);
            },
            onMouseDown: (event)=>{
                if (!event.currentTarget.contains(event.target)) return;
                handleRulerMouseDown(event);
                handleRulerTrackingMouseDown(event);
            },
            children: bookmarks.map((bookmark)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TimelineBookmark, {
                    bookmark: bookmark,
                    zoomLevel: zoomLevel,
                    dragState: dragState,
                    onBookmarkMouseDown: onBookmarkMouseDown
                }, `bookmark-${bookmark.time}`, false, {
                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                    lineNumber: 109,
                    columnNumber: 6
                }, this))
        }, void 0, false, {
            fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
            lineNumber: 89,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
        lineNumber: 85,
        columnNumber: 3
    }, this);
}
function TimelineBookmark({ bookmark, zoomLevel, dragState, onBookmarkMouseDown }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const duration = editor.timeline.getTotalDuration();
    const [isPopoverOpen, setIsPopoverOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isDragging = dragState.isDragging && dragState.bookmarkTime !== null && dragState.bookmarkTime === bookmark.time;
    const displayTime = isDragging ? dragState.currentTime : bookmark.time;
    const time = bookmark.time;
    const bookmarkDuration = bookmark.duration ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    const durationWidth = bookmarkDuration > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["timelineTimeToPixels"])({
        time: bookmarkDuration,
        zoomLevel
    }) : 0;
    const hasDurationRange = durationWidth > MIN_BOOKMARK_WIDTH_PX;
    const bookmarkWidth = BOOKMARK_MARKER_WIDTH_PX + Math.max(durationWidth, 0);
    const left = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$pixel$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["timelineTimeToSnappedPixels"])({
        time: displayTime,
        zoomLevel
    });
    const bookmarkLeft = left - BOOKMARK_HALF_WIDTH_PX;
    const rightHalfLeft = BOOKMARK_HALF_WIDTH_PX + Math.max(durationWidth, 0);
    const iconColor = bookmark.color ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_TIMELINE_BOOKMARK_COLOR"];
    const handleSeek = ()=>seekToBookmarkTime({
            editor,
            time
        });
    const handleClick = (event)=>{
        event.preventDefault();
        event.stopPropagation();
        if (event.detail === 2) {
            setIsPopoverOpen(true);
        } else {
            handleSeek();
        }
    };
    const handleKeyDown = (event)=>{
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        handleSeek();
    };
    const handleMouseDown = (event)=>{
        onBookmarkMouseDown({
            event,
            bookmark
        });
        event.preventDefault();
        event.stopPropagation();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popover"], {
        open: isPopoverOpen,
        onOpenChange: setIsPopoverOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PopoverAnchor"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "absolute top-0 h-full min-w-0.5 border-0 bg-transparent p-0",
                    style: {
                        left: `${bookmarkLeft}px`,
                        width: `${bookmarkWidth}px`
                    },
                    "aria-label": `Bookmark at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumberForDisplay"])({
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
                            time
                        }),
                        fractionDigits: 1
                    })}s`,
                    type: "button",
                    onMouseDown: handleMouseDown,
                    onClick: handleClick,
                    onKeyDown: handleKeyDown,
                    children: [
                        hasDurationRange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute opacity-30",
                            style: {
                                top: 1.5,
                                height: BOOKMARK_MARKER_HEIGHT_PX - 2.5,
                                left: BOOKMARK_HALF_WIDTH_PX,
                                width: durationWidth,
                                backgroundColor: iconColor
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                            lineNumber: 199,
                            columnNumber: 7
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 overflow-hidden",
                            style: {
                                left: 0,
                                width: BOOKMARK_HALF_WIDTH_PX,
                                height: BOOKMARK_MARKER_HEIGHT_PX
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0",
                                    style: {
                                        width: BOOKMARK_MARKER_WIDTH_PX,
                                        height: BOOKMARK_MARKER_HEIGHT_PX,
                                        clipPath: BOOKMARK_MARKER_CLIP_PATH,
                                        backgroundColor: "hsl(var(--background))"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                                    lineNumber: 218,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute",
                                    style: {
                                        top: 1,
                                        left: 1,
                                        width: BOOKMARK_MARKER_WIDTH_PX - 2,
                                        height: BOOKMARK_MARKER_HEIGHT_PX - 2,
                                        clipPath: BOOKMARK_MARKER_CLIP_PATH,
                                        backgroundColor: iconColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                                    lineNumber: 227,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                            lineNumber: 210,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 overflow-hidden",
                            style: {
                                left: rightHalfLeft,
                                width: BOOKMARK_HALF_WIDTH_PX,
                                height: BOOKMARK_MARKER_HEIGHT_PX
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0",
                                    style: {
                                        left: -BOOKMARK_HALF_WIDTH_PX,
                                        width: BOOKMARK_MARKER_WIDTH_PX,
                                        height: BOOKMARK_MARKER_HEIGHT_PX,
                                        clipPath: BOOKMARK_MARKER_CLIP_PATH,
                                        backgroundColor: "hsl(var(--background))"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                                    lineNumber: 247,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute",
                                    style: {
                                        top: 1,
                                        left: 1 - BOOKMARK_HALF_WIDTH_PX,
                                        width: BOOKMARK_MARKER_WIDTH_PX - 2,
                                        height: BOOKMARK_MARKER_HEIGHT_PX - 2,
                                        clipPath: BOOKMARK_MARKER_CLIP_PATH,
                                        backgroundColor: iconColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                                    lineNumber: 257,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                            lineNumber: 239,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                    lineNumber: 186,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                lineNumber: 185,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PopoverContent"], {
                className: "w-64 flex flex-col gap-3 p-3",
                align: "start",
                side: "bottom",
                sideOffset: 8,
                onOpenAutoFocus: (event)=>event.preventDefault(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BookmarkPopoverContent, {
                    bookmark: bookmark,
                    time: time,
                    timelineDuration: duration,
                    onPopoverClose: ()=>setIsPopoverOpen(false)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                    lineNumber: 278,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                lineNumber: 271,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
        lineNumber: 184,
        columnNumber: 3
    }, this);
}
function BookmarkPopoverContent({ bookmark, time, timelineDuration, onPopoverClose }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const [draftColorHex, setDraftColorHex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((bookmark.color ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_TIMELINE_BOOKMARK_COLOR"]).replace("#", "").toUpperCase());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setDraftColorHex((bookmark.color ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_TIMELINE_BOOKMARK_COLOR"]).replace("#", "").toUpperCase());
    }, [
        bookmark.color
    ]);
    const handleRemove = ()=>{
        editor.scenes.removeBookmark({
            time
        });
        onPopoverClose();
    };
    const handleUpdate = ({ note, color, duration })=>{
        const updates = {};
        if (note !== undefined && note !== bookmark.note) updates.note = note;
        if (color !== undefined && color.toUpperCase() !== (bookmark.color ?? "").toUpperCase()) {
            updates.color = color;
        }
        if (duration !== undefined && duration !== bookmark.duration) {
            updates.duration = duration;
        }
        if (Object.keys(updates).length === 0) return;
        editor.scenes.updateBookmark({
            time,
            updates
        });
    };
    const maxDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
        time: timelineDuration > time ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subMediaTime"])({
            a: timelineDuration,
            b: time
        }) : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
    });
    const durationSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
        time: bookmark.duration ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs",
                        children: "Note"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                        lineNumber: 352,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                        placeholder: "Add a note...",
                        value: bookmark.note ?? "",
                        onChange: (event)=>handleUpdate({
                                note: event.target.value
                            }),
                        className: "h-8 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                        lineNumber: 353,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                lineNumber: 351,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs",
                        children: "Color"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                        lineNumber: 361,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$color$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$string$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uppercase"])({
                                    string: draftColorHex
                                }),
                                onChange: (color)=>setDraftColorHex((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$string$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uppercase"])({
                                        string: color
                                    })),
                                onChangeEnd: (color)=>handleUpdate({
                                        color: `#${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$string$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uppercase"])({
                                            string: color
                                        })}`
                                    }),
                                className: "bg-background border"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                                lineNumber: 363,
                                columnNumber: 6
                            }, this),
                            bookmark.color && bookmark.color.replace(/^#/, "").toUpperCase() !== __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$components$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_TIMELINE_BOOKMARK_COLOR"].replace(/^#/, "").toUpperCase() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "text",
                                size: "text",
                                "aria-label": "Reset to default color",
                                className: "absolute top-1/2 right-1 -translate-y-1/2 mr-1",
                                onClick: ()=>editor.scenes.updateBookmark({
                                        time,
                                        updates: {
                                            color: undefined
                                        }
                                    }),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowTurnBackwardIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowTurnBackwardIcon$3e$__["ArrowTurnBackwardIcon"],
                                    className: "!size-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                                    lineNumber: 390,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                                lineNumber: 377,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                        lineNumber: 362,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                lineNumber: 360,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-xs",
                        children: "Duration"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                        lineNumber: 399,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            type: "number",
                            min: 0,
                            step: 0.1,
                            value: durationSeconds,
                            onChange: (event)=>{
                                const parsed = parseFloat(event.target.value);
                                const value = Number.isNaN(parsed) ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])({
                                    value: parsed,
                                    min: 0,
                                    max: maxDuration
                                });
                                handleUpdate({
                                    duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTimeFromSeconds"])({
                                        seconds: value
                                    })
                                });
                            },
                            className: "h-8 text-sm",
                            containerClassName: "w-full"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                            lineNumber: 401,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                        lineNumber: 400,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                lineNumber: 398,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "text-destructive hover:bg-destructive/10",
                onClick: handleRemove,
                onKeyDown: (event)=>{
                    if (event.key === "Enter" || event.key === " ") {
                        handleRemove();
                    }
                },
                "aria-label": "delete bookmark",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__["Delete02Icon"],
                        className: "!size-3.5"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                        lineNumber: 437,
                        columnNumber: 5
                    }, this),
                    "Delete"
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx",
                lineNumber: 424,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/timeline/bookmarks/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$snap$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/snap-source.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$preview$2d$overlay$2d$source$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/preview-overlay-source.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$hooks$2f$use$2d$bookmark$2d$drag$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/hooks/use-bookmark-drag.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$components$2f$bookmarks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/components/bookmarks.tsx [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$preview$2d$overlay$2d$source$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$hooks$2f$use$2d$bookmark$2d$drag$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$components$2f$bookmarks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$preview$2d$overlay$2d$source$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$hooks$2f$use$2d$bookmark$2d$drag$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$components$2f$bookmarks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=apps_web_src_timeline_ad8c0a26._.js.map