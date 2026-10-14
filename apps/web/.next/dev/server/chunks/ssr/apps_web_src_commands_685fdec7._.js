module.exports = [
"[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Command",
    ()=>Command,
    "createElementSelectionResult",
    ()=>createElementSelectionResult
]);
function createElementSelectionResult(selectedElements) {
    return {
        selection: {
            selectedElements,
            selectedKeyframes: [],
            keyframeSelectionAnchor: null,
            selectedMaskPoints: null
        }
    };
}
class Command {
    undo() {
        throw new Error("Undo not implemented for this command");
    }
    redo() {
        return this.execute();
    }
}
}),
"[project]/apps/web/src/commands/batch-command.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BatchCommand",
    ()=>BatchCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
;
class BatchCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    commands;
    constructor(commands){
        super(), this.commands = commands;
    }
    execute() {
        let latestSelectionResult;
        for (const command of this.commands){
            const result = command.execute();
            if (result?.selection !== undefined) {
                latestSelectionResult = result;
            }
        }
        return latestSelectionResult;
    }
    undo() {
        for (const command of [
            ...this.commands
        ].reverse()){
            command.undo();
        }
    }
    redo() {
        let latestSelectionResult;
        for (const command of this.commands){
            const result = command.redo();
            if (result?.selection !== undefined) {
                latestSelectionResult = result;
            }
        }
        return latestSelectionResult;
    }
}
}),
"[project]/apps/web/src/commands/timeline/track/add-track.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AddTrackCommand",
    ()=>AddTrackCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/track-factory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/insert-index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class AddTrackCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    trackId;
    savedState = null;
    constructor({ type, index }){
        super();
        this.type = type;
        this.index = index;
        this.trackId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
    }
    type;
    index;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const insertIndex = this.index ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$insert$2d$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultInsertIndexForTrack"])({
            tracks: this.savedState,
            trackType: this.type
        });
        const updatedTracks = this.type === "audio" ? buildAudioTrackState({
            tracks: this.savedState,
            insertIndex,
            trackId: this.trackId
        }) : buildOverlayTrackState({
            tracks: this.savedState,
            insertIndex,
            trackId: this.trackId,
            trackType: this.type
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
    getTrackId() {
        return this.trackId;
    }
}
function buildAudioTrackState({ tracks, insertIndex, trackId }) {
    const audioInsertIndex = Math.max(0, insertIndex - tracks.overlay.length - 1);
    const newTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
        id: trackId,
        type: "audio"
    });
    return {
        ...tracks,
        audio: [
            ...tracks.audio.slice(0, audioInsertIndex),
            newTrack,
            ...tracks.audio.slice(audioInsertIndex)
        ]
    };
}
function buildOverlayTrackState({ tracks, insertIndex, trackId, trackType }) {
    const overlayInsertIndex = Math.min(insertIndex, tracks.overlay.length);
    const newTrack = trackType === "video" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
        id: trackId,
        type: "video"
    }) : trackType === "text" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
        id: trackId,
        type: "text"
    }) : trackType === "graphic" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
        id: trackId,
        type: "graphic"
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
        id: trackId,
        type: "effect"
    });
    return {
        ...tracks,
        overlay: [
            ...tracks.overlay.slice(0, overlayInsertIndex),
            newTrack,
            ...tracks.overlay.slice(overlayInsertIndex)
        ]
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/track/remove-track.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveTrackCommand",
    ()=>RemoveTrackCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class RemoveTrackCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    trackId;
    savedState;
    constructor(trackId){
        super(), this.trackId = trackId, this.savedState = null;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = {
            ...this.savedState,
            overlay: this.savedState.overlay.filter((track)=>track.id !== this.trackId),
            audio: this.savedState.audio.filter((track)=>track.id !== this.trackId)
        };
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/track/toggle-track-mute.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ToggleTrackMuteCommand",
    ()=>ToggleTrackMuteCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-capabilities.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class ToggleTrackMuteCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    trackId;
    savedState;
    constructor(trackId){
        super(), this.trackId = trackId, this.savedState = null;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const targetTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findTrackInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId
        });
        if (!targetTrack) {
            return;
        }
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTrackInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            update: (track)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canTrackHaveAudio"])(track) ? {
                    ...track,
                    muted: !track.muted
                } : track
        });
        editor.timeline.updateTracks(updatedTracks);
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/track/toggle-track-visibility.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ToggleTrackVisibilityCommand",
    ()=>ToggleTrackVisibilityCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-capabilities.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class ToggleTrackVisibilityCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    trackId;
    savedState;
    constructor(trackId){
        super(), this.trackId = trackId, this.savedState = null;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const targetTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findTrackInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId
        });
        if (!targetTrack) {
            return;
        }
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTrackInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            update: (track)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canTrackBeHidden"])(track)) {
                    return {
                        ...track,
                        hidden: !track.hidden
                    };
                }
                return track;
            }
        });
        editor.timeline.updateTracks(updatedTracks);
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/track/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$add$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/add-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$remove$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/remove-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$mute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/toggle-track-mute.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$visibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/toggle-track-visibility.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$add$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$remove$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$mute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$visibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$add$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$remove$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$mute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$visibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/insert-element.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "InsertElementCommand",
    ()=>InsertElementCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/creation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fps/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/apply.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/compatibility.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
class InsertElementCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    elementId;
    savedState = null;
    targetTrackId = null;
    constructor({ element, placement }){
        super();
        this.elementId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
        this.element = element;
        this.placement = placement;
    }
    element;
    placement;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        if (!this.validateElementBasics({
            element: this.element
        })) {
            return;
        }
        const totalElementsInTimeline = this.savedState.main.elements.length + this.savedState.overlay.reduce((total, track)=>total + track.elements.length, 0) + this.savedState.audio.reduce((total, track)=>total + track.elements.length, 0);
        const isFirstElement = totalElementsInTimeline === 0;
        const newElement = this.buildElement({
            element: this.element
        });
        const updateResult = this.applyPlacementResult({
            tracks: this.savedState,
            element: newElement
        });
        if (!updateResult) {
            return;
        }
        const { updatedTracks, targetTrackId } = updateResult;
        this.targetTrackId = targetTrackId;
        const isVisualMedia = newElement.type === "video" || newElement.type === "image";
        if (isFirstElement && isVisualMedia) {
            const mediaAssets = editor.media.getAssets();
            const activeProject = editor.project.getActive();
            const asset = mediaAssets.find((item)=>item.id === newElement.mediaId);
            if (asset?.width && asset?.height) {
                const nextCanvasSize = {
                    width: asset.width,
                    height: asset.height
                };
                const shouldSetOriginalCanvasSize = !activeProject?.settings.originalCanvasSize;
                editor.project.updateSettings({
                    settings: {
                        canvasSize: nextCanvasSize,
                        ...shouldSetOriginalCanvasSize ? {
                            originalCanvasSize: nextCanvasSize
                        } : {}
                    },
                    pushHistory: false
                });
            }
            if (asset?.type === "video" && asset?.fps) {
                editor.project.updateSettings({
                    settings: {
                        fps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["floatToFrameRate"])(asset.fps)
                    },
                    pushHistory: false
                });
            }
        }
        editor.timeline.updateTracks(updatedTracks);
        return {
            selection: {
                selectedElements: [
                    {
                        trackId: targetTrackId,
                        elementId: this.elementId
                    }
                ],
                selectedKeyframes: [],
                keyframeSelectionAnchor: null,
                selectedMaskPoints: null
            }
        };
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
    getElementId() {
        return this.elementId;
    }
    getTrackId() {
        return this.targetTrackId;
    }
    buildElement({ element }) {
        return {
            ...element,
            id: this.elementId,
            startTime: element.startTime,
            trimStart: element.trimStart ?? 0,
            trimEnd: element.trimEnd ?? 0,
            duration: element.duration ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$creation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_NEW_ELEMENT_DURATION"]
        };
    }
    validateElementBasics({ element }) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["requiresMediaId"])({
            element
        }) && !("mediaId" in element)) {
            console.error("Element requires mediaId");
            return false;
        }
        if (element.type === "audio" && element.sourceType === "library" && !element.sourceUrl) {
            console.error("Library audio element must have sourceUrl");
            return false;
        }
        if (element.type === "sticker" && !element.stickerId) {
            console.error("Sticker element must have stickerId");
            return false;
        }
        if (element.type === "graphic") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerDefaultGraphics"])();
            if (!element.definitionId || !__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["graphicsRegistry"].has(element.definitionId)) {
                console.error("Graphic element must have a valid definitionId");
                return false;
            }
        }
        if (element.type === "text" && !element.params.content) {
            console.error("Text element must have content");
            return false;
        }
        if (element.type === "effect" && !element.effectType) {
            console.error("Effect element must have effectType");
            return false;
        }
        return true;
    }
    applyPlacementResult({ tracks, element }) {
        const placement = this.placement;
        if (placement.mode === "auto" && placement.trackType && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canElementGoOnTrack"])({
            elementType: element.type,
            trackType: placement.trackType
        })) {
            console.error(`${element.type} elements cannot be placed on ${placement.trackType} tracks`);
            return null;
        }
        const placementResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTrackPlacement"])({
            tracks,
            ...placement.mode === "auto" && placement.trackType ? {
                trackType: placement.trackType
            } : {
                elementType: element.type
            },
            timeSpans: [
                {
                    startTime: element.startTime,
                    duration: element.duration
                }
            ],
            strategy: placement.mode === "explicit" ? {
                type: "explicit",
                trackId: placement.trackId
            } : {
                type: "firstAvailable"
            }
        });
        if (!placementResult) {
            if (placement.mode === "explicit") {
                const targetTrack = tracks.main.id === placement.trackId ? tracks.main : tracks.overlay.find((track)=>track.id === placement.trackId) ?? tracks.audio.find((track)=>track.id === placement.trackId);
                if (!targetTrack) {
                    console.error("Track not found:", placement.trackId);
                    return null;
                }
                const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateElementTrackCompatibility"])({
                    element,
                    track: targetTrack
                });
                console.error(validation.errorMessage);
            }
            return null;
        }
        const elementToPlace = placementResult.kind === "existingTrack" ? {
            ...element,
            startTime: placementResult.adjustedStartTime !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                time: placementResult.adjustedStartTime
            }) : element.startTime
        } : element;
        const appliedPlacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyPlacement"])({
            tracks,
            placementResult,
            elements: [
                elementToPlace
            ],
            newTrackInsertIndexOverride: placement.mode === "auto" && typeof placement.insertIndex === "number" ? placement.insertIndex : undefined
        });
        if (!appliedPlacement) {
            return null;
        }
        return {
            updatedTracks: appliedPlacement.updatedTracks,
            targetTrackId: appliedPlacement.targetTrackId
        };
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/delete-elements.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DeleteElementsCommand",
    ()=>DeleteElementsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function removeTrackElements({ track, elements }) {
    const nextElements = track.elements.filter((element)=>!elements.some((target)=>target.trackId === track.id && target.elementId === element.id));
    return {
        ...track,
        elements: nextElements
    };
}
class DeleteElementsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    elements;
    constructor({ elements }){
        super();
        this.elements = elements;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = {
            overlay: this.savedState.overlay.map((track)=>removeTrackElements({
                    track,
                    elements: this.elements
                })),
            main: removeTrackElements({
                track: this.savedState.main,
                elements: this.elements
            }),
            audio: this.savedState.audio.map((track)=>removeTrackElements({
                    track,
                    elements: this.elements
                }))
        };
        editor.timeline.updateTracks(updatedTracks);
        return {
            selection: {
                selectedElements: [],
                selectedKeyframes: [],
                keyframeSelectionAnchor: null,
                selectedMaskPoints: null
            }
        };
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/duplicate-elements.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DuplicateElementsCommand",
    ()=>DuplicateElementsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/apply.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class DuplicateElementsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    duplicatedElements = [];
    savedState = null;
    elements;
    constructor({ elements }){
        super();
        this.elements = elements;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        this.duplicatedElements = [];
        let updatedTracks = this.savedState;
        for (const track of [
            ...this.savedState.overlay,
            this.savedState.main,
            ...this.savedState.audio
        ]){
            const elementsToDuplicate = this.elements.filter((elementEntry)=>elementEntry.trackId === track.id);
            if (elementsToDuplicate.length === 0) {
                continue;
            }
            const elementIdsToDuplicate = new Set(elementsToDuplicate.map((element)=>element.elementId));
            const newTrackElements = [];
            for (const element of track.elements){
                if (!elementIdsToDuplicate.has(element.id)) {
                    continue;
                }
                const newId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
                newTrackElements.push(buildDuplicateElement({
                    element,
                    id: newId,
                    startTime: element.startTime
                }));
            }
            const placementResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTrackPlacement"])({
                tracks: updatedTracks,
                trackType: track.type,
                timeSpans: [],
                strategy: {
                    type: "alwaysNew",
                    position: "highest"
                }
            });
            if (!placementResult || placementResult.kind !== "newTrack") {
                continue;
            }
            const applied = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyPlacement"])({
                tracks: updatedTracks,
                placementResult,
                elements: newTrackElements
            });
            if (!applied) {
                continue;
            }
            updatedTracks = applied.updatedTracks;
            for (const element of newTrackElements){
                this.duplicatedElements.push({
                    trackId: applied.targetTrackId,
                    elementId: element.id
                });
            }
        }
        editor.timeline.updateTracks(updatedTracks);
        if (this.duplicatedElements.length > 0) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElementSelectionResult"])(this.duplicatedElements);
        }
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
    getDuplicatedElements() {
        return this.duplicatedElements;
    }
}
function buildDuplicateElement({ element, id, startTime }) {
    return {
        ...element,
        id,
        name: `${element.name} (copy)`,
        startTime,
        animations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneAnimations"])({
            animations: element.animations,
            shouldRegenerateKeyframeIds: true
        })
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/split-elements.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SplitElementsCommand",
    ()=>SplitElementsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/retime/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$split$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/split.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
class SplitElementsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    rightSideElements = [];
    elements;
    splitTime;
    retainSide;
    constructor({ elements, splitTime, retainSide = "both" }){
        super();
        this.elements = elements;
        this.splitTime = splitTime;
        this.retainSide = retainSide;
    }
    getRightSideElements() {
        return this.rightSideElements;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        this.rightSideElements = [];
        const splitTrack = (track)=>{
            const elementsToSplit = this.elements.filter((target)=>target.trackId === track.id);
            if (elementsToSplit.length === 0) {
                return track;
            }
            const elements = track.elements.flatMap((element)=>{
                const shouldSplit = elementsToSplit.some((target)=>target.elementId === element.id);
                if (!shouldSplit) {
                    return [
                        element
                    ];
                }
                const effectiveStart = element.startTime;
                const effectiveEnd = element.startTime + element.duration;
                if (this.splitTime <= effectiveStart || this.splitTime >= effectiveEnd) {
                    return [
                        element
                    ];
                }
                const relativeTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subMediaTime"])({
                    a: this.splitTime,
                    b: element.startTime
                });
                const leftVisibleDuration = relativeTime;
                const rightVisibleDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subMediaTime"])({
                    a: element.duration,
                    b: relativeTime
                });
                const retimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRetimableElement"])(element) ? element.retime : undefined;
                // Snap the source-side split point exactly once and derive the right
                // half from it. Independently rounding both spans (left and total)
                // would let a 1-tick rounding error desynchronise them, breaking the
                // invariant `leftSourceSpan + rightSourceSpan == totalSourceSpan`.
                // See the same discipline in `compute-resize.ts` (snap-once comment).
                const leftSourceSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                    time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$split$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSourceSpanAtClipTime"])({
                        clipTime: leftVisibleDuration,
                        retime: retimeRef
                    })
                });
                const totalSourceSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                    time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$split$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSourceSpanAtClipTime"])({
                        clipTime: element.duration,
                        retime: retimeRef
                    })
                });
                const rightSourceSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subMediaTime"])({
                    a: totalSourceSpan,
                    b: leftSourceSpan
                });
                const { leftAnimations, rightAnimations } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splitAnimationsAtTime"])({
                    animations: element.animations,
                    splitTime: relativeTime,
                    shouldIncludeSplitBoundary: true
                });
                let splitResult;
                const leftTrimEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                    a: element.trimEnd,
                    b: rightSourceSpan
                });
                const rightTrimStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                    a: element.trimStart,
                    b: leftSourceSpan
                });
                if (this.retainSide === "left") {
                    splitResult = [
                        {
                            ...element,
                            duration: leftVisibleDuration,
                            trimEnd: leftTrimEnd,
                            name: `${element.name} (left)`,
                            animations: leftAnimations,
                            ...retimeRef !== undefined ? {
                                retime: retimeRef
                            } : {}
                        }
                    ];
                } else if (this.retainSide === "right") {
                    const newId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
                    this.rightSideElements.push({
                        trackId: track.id,
                        elementId: newId
                    });
                    splitResult = [
                        {
                            ...element,
                            id: newId,
                            startTime: this.splitTime,
                            duration: rightVisibleDuration,
                            trimStart: rightTrimStart,
                            name: `${element.name} (right)`,
                            animations: rightAnimations,
                            ...retimeRef !== undefined ? {
                                retime: retimeRef
                            } : {}
                        }
                    ];
                } else {
                    const secondElementId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
                    this.rightSideElements.push({
                        trackId: track.id,
                        elementId: secondElementId
                    });
                    splitResult = [
                        {
                            ...element,
                            duration: leftVisibleDuration,
                            trimEnd: leftTrimEnd,
                            name: `${element.name} (left)`,
                            animations: leftAnimations,
                            ...retimeRef !== undefined ? {
                                retime: retimeRef
                            } : {}
                        },
                        {
                            ...element,
                            id: secondElementId,
                            startTime: this.splitTime,
                            duration: rightVisibleDuration,
                            trimStart: rightTrimStart,
                            name: `${element.name} (right)`,
                            animations: rightAnimations,
                            ...retimeRef !== undefined ? {
                                retime: retimeRef
                            } : {}
                        }
                    ];
                }
                return splitResult;
            });
            return {
                ...track,
                elements
            };
        };
        const updatedTracks = {
            overlay: this.savedState.overlay.map((track)=>splitTrack(track)),
            main: splitTrack(this.savedState.main),
            audio: this.savedState.audio.map((track)=>splitTrack(track))
        };
        editor.timeline.updateTracks(updatedTracks);
        if (this.rightSideElements.length > 0) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElementSelectionResult"])(this.rightSideElements);
        }
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/update-elements.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "UpdateElementsCommand",
    ()=>UpdateElementsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$update$2d$pipeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/update-pipeline.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$update$2d$pipeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$update$2d$pipeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class UpdateElementsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    updates;
    constructor({ updates }){
        super();
        this.updates = updates;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        let updatedTracks = this.savedState;
        for (const updateEntry of this.updates){
            const currentTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findTrackInSceneTracks"])({
                tracks: updatedTracks,
                trackId: updateEntry.trackId
            });
            const currentElement = currentTrack?.elements.find((element)=>element.id === updateEntry.elementId);
            if (!currentTrack || !currentElement) {
                continue;
            }
            const nextElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$update$2d$pipeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyElementUpdate"])({
                element: currentElement,
                patch: updateEntry.patch,
                context: {
                    tracks: updatedTracks,
                    trackId: updateEntry.trackId
                }
            });
            updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
                tracks: updatedTracks,
                trackId: updateEntry.trackId,
                elementId: updateEntry.elementId,
                update: ()=>nextElement
            });
        }
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/toggle-source-audio-separation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ToggleSourceAudioSeparationCommand",
    ()=>ToggleSourceAudioSeparationCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-separation/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/apply.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class ToggleSourceAudioSeparationCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    params;
    savedState;
    constructor(params){
        super(), this.params = params, this.savedState = null;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const sourceTrack = [
            ...this.savedState.overlay,
            this.savedState.main,
            ...this.savedState.audio
        ].find((track)=>track.id === this.params.trackId);
        if (!sourceTrack) {
            return;
        }
        const sourceElement = sourceTrack.elements.find((element)=>element.id === this.params.elementId);
        if (!sourceElement || sourceElement.type !== "video") {
            return;
        }
        const videoElement = sourceElement;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSourceAudioSeparated"])({
            element: videoElement
        })) {
            editor.timeline.updateTracks(updateSourceAudioEnabled({
                tracks: this.savedState,
                trackId: this.params.trackId,
                elementId: this.params.elementId,
                isSourceAudioEnabled: true
            }));
            return;
        }
        const mediaAsset = editor.media.getAssets().find((asset)=>asset.id === videoElement.mediaId);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canExtractSourceAudio"])(videoElement, mediaAsset)) {
            return;
        }
        if (videoElement.duration <= 0) {
            return;
        }
        const separatedAudioElement = {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildSeparatedAudioElement"])({
                sourceElement: videoElement
            }),
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])()
        };
        const placementResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTrackPlacement"])({
            tracks: this.savedState,
            trackType: "audio",
            timeSpans: [
                {
                    startTime: separatedAudioElement.startTime,
                    duration: separatedAudioElement.duration
                }
            ],
            strategy: {
                type: "firstAvailable"
            }
        });
        if (!placementResult) {
            return;
        }
        const appliedPlacement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyPlacement"])({
            tracks: this.savedState,
            placementResult,
            elements: [
                separatedAudioElement
            ]
        });
        if (!appliedPlacement) {
            return;
        }
        editor.timeline.updateTracks(updateSourceAudioEnabled({
            tracks: appliedPlacement.updatedTracks,
            trackId: this.params.trackId,
            elementId: this.params.elementId,
            isSourceAudioEnabled: false
        }));
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
function updateSourceAudioEnabled({ tracks, trackId, elementId, isSourceAudioEnabled }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
        tracks,
        trackId,
        elementId,
        elementPredicate: (element)=>element.type === "video",
        update: (element)=>({
                ...element,
                isSourceAudioEnabled
            })
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/move-elements.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MoveElementCommand",
    ()=>MoveElementCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/track-factory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/compatibility.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class MoveElementCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    constructor({ moves, createTracks = [] }){
        super();
        this.moves = moves;
        this.createTracks = createTracks;
    }
    moves;
    createTracks;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        let tracksToUpdate = this.savedState;
        for (const createTrack of [
            ...this.createTracks
        ].sort((firstTrack, secondTrack)=>firstTrack.index - secondTrack.index)){
            tracksToUpdate = insertTrackAtDisplayIndex({
                tracks: tracksToUpdate,
                track: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$track$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEmptyTrack"])({
                    id: createTrack.id,
                    type: createTrack.type
                }),
                insertIndex: createTrack.index
            });
        }
        const movedElementsById = new Map();
        for (const move of this.moves){
            const sourceTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findTrackInSceneTracks"])({
                tracks: this.savedState,
                trackId: move.sourceTrackId
            });
            const sourceElement = sourceTrack?.elements.find((trackElement)=>trackElement.id === move.elementId);
            if (!sourceTrack || !sourceElement) {
                throw new Error("Source track or element not found");
            }
            const targetTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findTrackInSceneTracks"])({
                tracks: tracksToUpdate,
                trackId: move.targetTrackId
            });
            if (!targetTrack) {
                throw new Error("Target track not found");
            }
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$compatibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateElementTrackCompatibility"])({
                element: sourceElement,
                track: targetTrack
            });
            if (!validation.isValid) {
                throw new Error(validation.errorMessage);
            }
            movedElementsById.set(move.elementId, {
                ...sourceElement,
                startTime: move.newStartTime
            });
        }
        const movedElementIds = new Set(this.moves.map((move)=>move.elementId));
        const movedElementsByTargetTrackId = new Map();
        for (const move of this.moves){
            const movedElement = movedElementsById.get(move.elementId);
            if (!movedElement) {
                continue;
            }
            const nextTargetElements = movedElementsByTargetTrackId.get(move.targetTrackId) ?? [];
            nextTargetElements.push(movedElement);
            movedElementsByTargetTrackId.set(move.targetTrackId, nextTargetElements);
        }
        const updatedTracks = mapSceneTracks({
            tracks: tracksToUpdate,
            update: (track)=>({
                    ...track,
                    elements: [
                        ...track.elements.filter((element)=>!movedElementIds.has(element.id)),
                        ...movedElementsByTargetTrackId.get(track.id) ?? []
                    ]
                })
        });
        editor.timeline.updateTracks(updatedTracks);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElementSelectionResult"])(this.moves.map(({ elementId, targetTrackId })=>({
                trackId: targetTrackId,
                elementId
            })));
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
function mapSceneTracks({ tracks, update }) {
    return {
        overlay: tracks.overlay.map((track)=>update(track)),
        main: update(tracks.main),
        audio: tracks.audio.map((track)=>update(track))
    };
}
function insertTrackAtDisplayIndex({ tracks, track, insertIndex }) {
    if (track.type === "audio") {
        const audioInsertIndex = Math.max(0, Math.min(insertIndex - tracks.overlay.length - 1, tracks.audio.length));
        return {
            ...tracks,
            audio: [
                ...tracks.audio.slice(0, audioInsertIndex),
                track,
                ...tracks.audio.slice(audioInsertIndex)
            ]
        };
    }
    const overlayInsertIndex = Math.max(0, Math.min(insertIndex, tracks.overlay.length));
    return {
        ...tracks,
        overlay: [
            ...tracks.overlay.slice(0, overlayInsertIndex),
            track,
            ...tracks.overlay.slice(overlayInsertIndex)
        ]
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/remove-effect-param-keyframe.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveEffectParamKeyframeCommand",
    ()=>RemoveEffectParamKeyframeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/effect-param-channel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class RemoveEffectParamKeyframeCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    effectId;
    paramKey;
    keyframeId;
    constructor({ trackId, elementId, effectId, paramKey, keyframeId }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.effectId = effectId;
        this.paramKey = paramKey;
        this.keyframeId = keyframeId;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"],
            update: (element)=>{
                const animations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeEffectParamKeyframe"])({
                    animations: element.animations,
                    effectId: this.effectId,
                    paramKey: this.paramKey,
                    keyframeId: this.keyframeId
                });
                return {
                    ...element,
                    animations
                };
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/remove-keyframe.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveKeyframeCommand",
    ()=>RemoveKeyframeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function removeKeyframeAndPersist({ element, propertyPath, keyframeId, valueAtPlayhead }) {
    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationTarget"])({
        element,
        path: propertyPath
    });
    if (!target) {
        return element;
    }
    const nextAnimations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeElementKeyframe"])({
        animations: element.animations,
        propertyPath,
        keyframeId
    });
    const isChannelNowEmpty = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasKeyframesForPath"])({
        animations: nextAnimations,
        propertyPath
    });
    // When clearing all keyframes, preserve the value at the playhead (what the user was seeing)
    const shouldPersistToBase = isChannelNowEmpty && valueAtPlayhead !== null;
    const baseElement = shouldPersistToBase ? target.setBaseValue({
        value: valueAtPlayhead
    }) : element;
    return {
        ...baseElement,
        animations: nextAnimations
    };
}
class RemoveKeyframeCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    propertyPath;
    keyframeId;
    valueAtPlayhead;
    constructor({ trackId, elementId, propertyPath, keyframeId, valueAtPlayhead }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.propertyPath = propertyPath;
        this.keyframeId = keyframeId;
        this.valueAtPlayhead = valueAtPlayhead;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            update: (element)=>removeKeyframeAndPersist({
                    element,
                    propertyPath: this.propertyPath,
                    keyframeId: this.keyframeId,
                    valueAtPlayhead: this.valueAtPlayhead
                })
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/retime-keyframe.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RetimeKeyframeCommand",
    ()=>RetimeKeyframeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class RetimeKeyframeCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    propertyPath;
    keyframeId;
    nextTime;
    constructor({ trackId, elementId, propertyPath, keyframeId, nextTime }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.propertyPath = propertyPath;
        this.keyframeId = keyframeId;
        this.nextTime = nextTime;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            update: (element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationTarget"])({
                    element,
                    path: this.propertyPath
                })) {
                    return element;
                }
                const boundedTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maxMediaTime"])({
                    a: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
                    b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["minMediaTime"])({
                        a: this.nextTime,
                        b: element.duration
                    })
                });
                return {
                    ...element,
                    animations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["retimeElementKeyframe"])({
                        animations: element.animations,
                        propertyPath: this.propertyPath,
                        keyframeId: this.keyframeId,
                        time: boundedTime
                    })
                };
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/update-scalar-keyframe-curve.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "UpdateScalarKeyframeCurveCommand",
    ()=>UpdateScalarKeyframeCurveCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class UpdateScalarKeyframeCurveCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    propertyPath;
    componentKey;
    keyframeId;
    patch;
    constructor({ trackId, elementId, propertyPath, componentKey, keyframeId, patch }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.propertyPath = propertyPath;
        this.componentKey = componentKey;
        this.keyframeId = keyframeId;
        this.patch = patch;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            update: (element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationTarget"])({
                    element,
                    path: this.propertyPath
                })) {
                    return element;
                }
                return {
                    ...element,
                    animations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateScalarKeyframeCurve"])({
                        animations: element.animations,
                        propertyPath: this.propertyPath,
                        componentKey: this.componentKey,
                        keyframeId: this.keyframeId,
                        patch: this.patch
                    })
                };
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/upsert-effect-param-keyframe.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "UpsertEffectParamKeyframeCommand",
    ()=>UpsertEffectParamKeyframeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/effect-param-channel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
class UpsertEffectParamKeyframeCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    effectId;
    paramKey;
    time;
    value;
    interpolation;
    keyframeId;
    constructor({ trackId, elementId, effectId, paramKey, time, value, interpolation, keyframeId }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.effectId = effectId;
        this.paramKey = paramKey;
        this.time = time;
        this.value = value;
        this.interpolation = interpolation;
        this.keyframeId = keyframeId;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"],
            update: (element)=>{
                const boundedTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maxMediaTime"])({
                    a: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
                    b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["minMediaTime"])({
                        a: this.time,
                        b: element.duration
                    })
                });
                const propertyPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildEffectParamPath"])({
                    effectId: this.effectId,
                    paramKey: this.paramKey
                });
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationTarget"])({
                    element,
                    path: propertyPath
                });
                if (!target) {
                    return element;
                }
                const animations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["upsertPathKeyframe"])({
                    animations: element.animations,
                    propertyPath,
                    time: boundedTime,
                    value: this.value,
                    interpolation: this.interpolation,
                    keyframeId: this.keyframeId,
                    channelLayout: target.channelLayout,
                    coerceValue: target.coerceValue
                });
                return {
                    ...element,
                    animations
                };
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/upsert-keyframe.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "UpsertKeyframeCommand",
    ()=>UpsertKeyframeCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class UpsertKeyframeCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    propertyPath;
    time;
    value;
    interpolation;
    keyframeId;
    constructor({ trackId, elementId, propertyPath, time, value, interpolation, keyframeId }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.propertyPath = propertyPath;
        this.time = time;
        this.value = value;
        this.interpolation = interpolation;
        this.keyframeId = keyframeId;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            update: (element)=>{
                const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationTarget"])({
                    element,
                    path: this.propertyPath
                });
                if (!target) {
                    return element;
                }
                const boundedTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maxMediaTime"])({
                    a: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
                    b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["minMediaTime"])({
                        a: this.time,
                        b: element.duration
                    })
                });
                return {
                    ...element,
                    animations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["upsertPathKeyframe"])({
                        animations: element.animations,
                        propertyPath: this.propertyPath,
                        time: boundedTime,
                        value: this.value,
                        interpolation: this.interpolation,
                        keyframeId: this.keyframeId,
                        channelLayout: target.channelLayout,
                        coerceValue: target.coerceValue
                    })
                };
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/remove-effect-param-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/remove-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/retime-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/update-scalar-keyframe-curve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/upsert-effect-param-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/upsert-keyframe.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/effects/add-effect.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AddClipEffectCommand",
    ()=>AddClipEffectCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/effects/index.ts [app-ssr] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function addEffectToElement({ element, effectType }) {
    const instance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildDefaultEffectInstance"])({
        effectType
    });
    const currentEffects = element.effects ?? [];
    return {
        ...element,
        effects: [
            ...currentEffects,
            instance
        ]
    };
}
class AddClipEffectCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    effectId = null;
    trackId;
    elementId;
    effectType;
    constructor({ trackId, elementId, effectType }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.effectType = effectType;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"],
            update: (element)=>{
                const updated = addEffectToElement({
                    element: element,
                    effectType: this.effectType
                });
                const effects = updated.effects ?? [];
                this.effectId = effects[effects.length - 1]?.id ?? null;
                return updated;
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
    getEffectId() {
        return this.effectId;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/effects/remove-effect.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveClipEffectCommand",
    ()=>RemoveClipEffectCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function removeEffectFromElement({ element, effectId }) {
    const currentEffects = element.effects ?? [];
    const filtered = currentEffects.filter((effect)=>effect.id !== effectId);
    return {
        ...element,
        effects: filtered
    };
}
class RemoveClipEffectCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    effectId;
    constructor({ trackId, elementId, effectId }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.effectId = effectId;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"],
            update: (element)=>{
                return removeEffectFromElement({
                    element: element,
                    effectId: this.effectId
                });
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/effects/toggle-effect.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ToggleClipEffectCommand",
    ()=>ToggleClipEffectCommand,
    "toggleEffectOnElement",
    ()=>toggleEffectOnElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function toggleEffectOnElement({ element, effectId }) {
    const currentEffects = element.effects ?? [];
    const updated = currentEffects.map((effect)=>effect.id === effectId ? {
            ...effect,
            enabled: !effect.enabled
        } : effect);
    return {
        ...element,
        effects: updated
    };
}
class ToggleClipEffectCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    effectId;
    constructor({ trackId, elementId, effectId }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.effectId = effectId;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"],
            update: (element)=>{
                return toggleEffectOnElement({
                    element: element,
                    effectId: this.effectId
                });
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/effects/update-effect-params.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "UpdateClipEffectParamsCommand",
    ()=>UpdateClipEffectParamsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function updateEffectParamsOnElement({ element, effectId, params }) {
    const currentEffects = element.effects ?? [];
    const updated = currentEffects.map((effect)=>{
        if (effect.id !== effectId) {
            return effect;
        }
        const nextParams = {
            ...effect.params
        };
        for (const [key, value] of Object.entries(params)){
            if (value !== undefined) {
                nextParams[key] = value;
            }
        }
        return {
            ...effect,
            params: nextParams
        };
    });
    return {
        ...element,
        effects: updated
    };
}
class UpdateClipEffectParamsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    effectId;
    params;
    constructor({ trackId, elementId, effectId, params }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.effectId = effectId;
        this.params = params;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"],
            update: (element)=>{
                return updateEffectParamsOnElement({
                    element: element,
                    effectId: this.effectId,
                    params: this.params
                });
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/effects/reorder-effect.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ReorderClipEffectsCommand",
    ()=>ReorderClipEffectsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function reorderEffectsOnElement({ element, fromIndex, toIndex }) {
    const effects = [
        ...element.effects ?? []
    ];
    const [moved] = effects.splice(fromIndex, 1);
    effects.splice(toIndex, 0, moved);
    return {
        ...element,
        effects
    };
}
class ReorderClipEffectsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    fromIndex;
    toIndex;
    constructor({ trackId, elementId, fromIndex, toIndex }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"],
            update: (element)=>{
                return reorderEffectsOnElement({
                    element: element,
                    fromIndex: this.fromIndex,
                    toIndex: this.toIndex
                });
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/effects/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$add$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/add-effect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$remove$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/remove-effect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$toggle$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/toggle-effect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$update$2d$effect$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/update-effect-params.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$reorder$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/reorder-effect.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$add$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$remove$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$toggle$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$update$2d$effect$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$reorder$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$add$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$remove$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$toggle$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$update$2d$effect$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$reorder$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/masks/delete-custom-mask-points.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DeleteFreeformPathMaskPointsCommand",
    ()=>DeleteFreeformPathMaskPointsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/freeform/path.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function deletePointsFromFreeformPathMask({ mask, pointIds }) {
    const points = mask.params.path;
    const nextPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeFreeformPathPoints"])({
        points,
        pointIds
    });
    if (nextPoints.length === points.length) {
        return mask;
    }
    return {
        ...mask,
        params: {
            ...mask.params,
            path: nextPoints,
            closed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFreeformPathClosedStateAfterPointRemoval"])({
                wasClosed: mask.params.closed,
                remainingPointCount: nextPoints.length
            })
        }
    };
}
function deletePointsFromElementMask({ element, maskId, pointIds }) {
    const currentMasks = element.masks ?? [];
    let didDeletePoints = false;
    const nextMasks = currentMasks.map((mask)=>{
        if (mask.id !== maskId || mask.type !== "freeform") {
            return mask;
        }
        const nextMask = deletePointsFromFreeformPathMask({
            mask,
            pointIds
        });
        didDeletePoints ||= nextMask !== mask;
        return nextMask;
    });
    return {
        element: didDeletePoints ? {
            ...element,
            masks: nextMasks
        } : element,
        didDeletePoints
    };
}
class DeleteFreeformPathMaskPointsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    maskId;
    pointIds;
    constructor({ trackId, elementId, maskId, pointIds }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.maskId = maskId;
        this.pointIds = pointIds;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        let didDeletePoints = false;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"],
            update: (element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"])(element)) return element;
                const result = deletePointsFromElementMask({
                    element,
                    maskId: this.maskId,
                    pointIds: this.pointIds
                });
                didDeletePoints ||= result.didDeletePoints;
                return result.element;
            }
        });
        if (didDeletePoints) {
            editor.timeline.updateTracks(updatedTracks);
            return {
                selection: {
                    selectedMaskPoints: null
                }
            };
        }
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/masks/insert-custom-mask-point.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "InsertFreeformPathMaskPointCommand",
    ()=>InsertFreeformPathMaskPointCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$definition$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/freeform/definition.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function insertPointIntoFreeformPathMask({ mask, segmentIndex, canvasPoint, bounds }) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$definition$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["insertPointOnFreeformSegment"])({
        params: mask.params,
        segmentIndex,
        canvasPoint,
        bounds
    });
    if (!result) {
        return {
            mask,
            insertedPointId: null
        };
    }
    return {
        mask: {
            ...mask,
            params: result.params
        },
        insertedPointId: result.pointId
    };
}
function insertPointIntoElementMask({ element, maskId, segmentIndex, canvasPoint, bounds }) {
    const currentMasks = element.masks ?? [];
    let insertedPointId = null;
    let didInsertPoint = false;
    const nextMasks = currentMasks.map((mask)=>{
        if (mask.id !== maskId || mask.type !== "freeform") {
            return mask;
        }
        const result = insertPointIntoFreeformPathMask({
            mask,
            segmentIndex,
            canvasPoint,
            bounds
        });
        if (result.insertedPointId) {
            insertedPointId = result.insertedPointId;
            didInsertPoint = true;
        }
        return result.mask;
    });
    return {
        element: didInsertPoint ? {
            ...element,
            masks: nextMasks
        } : element,
        didInsertPoint,
        insertedPointId
    };
}
class InsertFreeformPathMaskPointCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    maskId;
    segmentIndex;
    canvasPoint;
    bounds;
    constructor({ trackId, elementId, maskId, segmentIndex, canvasPoint, bounds }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.maskId = maskId;
        this.segmentIndex = segmentIndex;
        this.canvasPoint = canvasPoint;
        this.bounds = bounds;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        let didInsertPoint = false;
        let insertedPointId = null;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"],
            update: (element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"])(element)) return element;
                const result = insertPointIntoElementMask({
                    element,
                    maskId: this.maskId,
                    segmentIndex: this.segmentIndex,
                    canvasPoint: this.canvasPoint,
                    bounds: this.bounds
                });
                didInsertPoint ||= result.didInsertPoint;
                insertedPointId ??= result.insertedPointId;
                return result.element;
            }
        });
        if (!didInsertPoint || !insertedPointId) {
            return undefined;
        }
        editor.timeline.updateTracks(updatedTracks);
        return {
            selection: {
                selectedMaskPoints: {
                    trackId: this.trackId,
                    elementId: this.elementId,
                    maskId: this.maskId,
                    pointIds: [
                        insertedPointId
                    ]
                }
            }
        };
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/masks/remove-mask.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveMaskCommand",
    ()=>RemoveMaskCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function removeMaskFromElement({ element, maskId }) {
    const currentMasks = element.masks ?? [];
    const filteredMasks = currentMasks.filter((mask)=>mask.id !== maskId);
    return {
        ...element,
        masks: filteredMasks
    };
}
class RemoveMaskCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    maskId;
    constructor({ trackId, elementId, maskId }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.maskId = maskId;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"],
            update: (element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"])(element)) return element;
                return removeMaskFromElement({
                    element,
                    maskId: this.maskId
                });
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/masks/toggle-mask-inverted.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ToggleMaskInvertedCommand",
    ()=>ToggleMaskInvertedCommand,
    "toggleMaskInvertedOnElement",
    ()=>toggleMaskInvertedOnElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function toggleMaskInvertedOnElement({ element, maskId }) {
    const currentMasks = element.masks ?? [];
    const toggleMask = (mask)=>({
            ...mask,
            params: {
                ...mask.params,
                inverted: !mask.params.inverted
            }
        });
    const updatedMasks = currentMasks.map((mask)=>mask.id !== maskId ? mask : toggleMask(mask));
    return {
        ...element,
        masks: updatedMasks
    };
}
class ToggleMaskInvertedCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    maskId;
    constructor({ trackId, elementId, maskId }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.maskId = maskId;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            elementPredicate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"],
            update: (element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMaskableElement"])(element)) return element;
                return toggleMaskInvertedOnElement({
                    element,
                    maskId: this.maskId
                });
            }
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/masks/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$delete$2d$custom$2d$mask$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/delete-custom-mask-points.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$insert$2d$custom$2d$mask$2d$point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/insert-custom-mask-point.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$remove$2d$mask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/remove-mask.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$toggle$2d$mask$2d$inverted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/toggle-mask-inverted.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$delete$2d$custom$2d$mask$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$insert$2d$custom$2d$mask$2d$point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$remove$2d$mask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$toggle$2d$mask$2d$inverted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$delete$2d$custom$2d$mask$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$insert$2d$custom$2d$mask$2d$point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$remove$2d$mask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$toggle$2d$mask$2d$inverted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$insert$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/insert-element.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$delete$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/delete-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$duplicate$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/duplicate-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$split$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/split-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$update$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/update-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$toggle$2d$source$2d$audio$2d$separation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/toggle-source-audio-separation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$move$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/move-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/index.ts [app-ssr] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$insert$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$delete$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$duplicate$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$split$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$update$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$toggle$2d$source$2d$audio$2d$separation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$move$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$insert$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$delete$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$duplicate$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$split$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$update$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$toggle$2d$source$2d$audio$2d$separation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$move$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/clipboard/paste.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PasteCommand",
    ()=>PasteCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/apply.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/placement/main-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class PasteCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    pastedElements = [];
    time;
    clipboardItems;
    constructor({ time, clipboardItems }){
        super();
        this.time = time;
        this.clipboardItems = clipboardItems;
    }
    execute() {
        if (this.clipboardItems.length === 0) return undefined;
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        this.pastedElements = [];
        const minStart = this.clipboardItems.reduce((earliestStartTime, item)=>item.element.startTime < earliestStartTime ? item.element.startTime : earliestStartTime, this.clipboardItems[0].element.startTime);
        let updatedTracks = this.savedState;
        const itemsByTrackId = groupClipboardItemsByTrackId({
            clipboardItems: this.clipboardItems
        });
        for (const [trackId, items] of itemsByTrackId){
            const elementsToAdd = buildPastedElements({
                items,
                minStart,
                time: this.time
            });
            if (elementsToAdd.length === 0) {
                continue;
            }
            const trackType = items[0].trackType;
            const sourceTrackIndex = [
                ...updatedTracks.overlay,
                updatedTracks.main,
                ...updatedTracks.audio
            ].findIndex((track)=>track.id === trackId);
            const placementResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTrackPlacement"])({
                tracks: updatedTracks,
                trackType,
                timeSpans: elementsToAdd.map((element)=>({
                        startTime: element.startTime,
                        duration: element.duration
                    })),
                strategy: {
                    type: "aboveSource",
                    sourceTrackIndex
                }
            });
            if (!placementResult) {
                continue;
            }
            let elementsForPlacement = elementsToAdd;
            if (placementResult.kind === "existingTrack") {
                const targetTrack = placementResult.trackIndex < updatedTracks.overlay.length ? updatedTracks.overlay[placementResult.trackIndex] : placementResult.trackIndex === updatedTracks.overlay.length ? updatedTracks.main : updatedTracks.audio[placementResult.trackIndex - updatedTracks.overlay.length - 1];
                if (targetTrack?.id === updatedTracks.main.id) {
                    const earliestElement = elementsToAdd.reduce((earliest, element)=>element.startTime < earliest.startTime ? element : earliest);
                    const adjustedEarliestStartTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$main$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enforceMainTrackStart"])({
                        tracks: updatedTracks,
                        targetTrackId: targetTrack.id,
                        requestedStartTime: earliestElement.startTime
                    });
                    const delta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subMediaTime"])({
                        a: adjustedEarliestStartTime,
                        b: earliestElement.startTime
                    });
                    if (delta !== __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]) {
                        elementsForPlacement = elementsToAdd.map((element)=>({
                                ...element,
                                startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maxMediaTime"])({
                                    a: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
                                    b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                                        a: element.startTime,
                                        b: delta
                                    })
                                })
                            }));
                    }
                }
            }
            const applied = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$placement$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyPlacement"])({
                tracks: updatedTracks,
                placementResult,
                elements: elementsForPlacement
            });
            if (!applied) {
                continue;
            }
            updatedTracks = applied.updatedTracks;
            for (const element of elementsForPlacement){
                this.pastedElements.push({
                    trackId: applied.targetTrackId,
                    elementId: element.id
                });
            }
        }
        editor.timeline.updateTracks(updatedTracks);
        if (this.pastedElements.length > 0) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElementSelectionResult"])(this.pastedElements);
        }
        return undefined;
    }
    undo() {
        if (this.savedState) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.timeline.updateTracks(this.savedState);
        }
    }
    getPastedElements() {
        return this.pastedElements;
    }
}
function groupClipboardItemsByTrackId({ clipboardItems }) {
    const groupedItems = new Map();
    for (const item of clipboardItems){
        const existingItems = groupedItems.get(item.trackId) ?? [];
        groupedItems.set(item.trackId, [
            ...existingItems,
            item
        ]);
    }
    return groupedItems;
}
function buildPastedElements({ items, minStart, time }) {
    const elementsToAdd = [];
    for (const item of items){
        const relativeOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subMediaTime"])({
            a: item.element.startTime,
            b: minStart
        });
        const startTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maxMediaTime"])({
            a: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
            b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                a: time,
                b: relativeOffset
            })
        });
        const newElementId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
        elementsToAdd.push({
            ...item.element,
            id: newElementId,
            startTime,
            animations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneAnimations"])({
                animations: item.element.animations,
                shouldRegenerateKeyframeIds: true
            })
        });
    }
    return elementsToAdd;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/clipboard/paste-keyframes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PasteKeyframesCommand",
    ()=>PasteKeyframesCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function pasteKeyframesIntoElement({ element, time, clipboardItems }) {
    let nextElement = element;
    for (const item of clipboardItems){
        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationTarget"])({
            element: nextElement,
            path: item.propertyPath
        });
        if (!target) {
            continue;
        }
        const keyframeTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maxMediaTime"])({
            a: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
            b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["minMediaTime"])({
                a: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                    a: time,
                    b: item.timeOffset
                }),
                b: nextElement.duration
            })
        });
        const nextAnimations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["upsertPathKeyframe"])({
            animations: nextElement.animations,
            propertyPath: item.propertyPath,
            time: keyframeTime,
            value: item.value,
            interpolation: item.interpolation,
            keyframeId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])(),
            channelLayout: target.channelLayout,
            coerceValue: target.coerceValue
        });
        const pastedKeyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyframeAtTime"])({
            animations: nextAnimations,
            propertyPath: item.propertyPath,
            time: keyframeTime
        });
        let patchedAnimations = nextAnimations;
        if (pastedKeyframe) {
            for (const curvePatch of item.curvePatches){
                const nextPatchedAnimations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateScalarKeyframeCurve"])({
                    animations: patchedAnimations,
                    propertyPath: item.propertyPath,
                    componentKey: curvePatch.componentKey,
                    keyframeId: pastedKeyframe.id,
                    patch: curvePatch.patch
                });
                patchedAnimations = nextPatchedAnimations ?? patchedAnimations;
            }
        }
        nextElement = {
            ...nextElement,
            animations: patchedAnimations
        };
    }
    return nextElement;
}
class PasteKeyframesCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedState = null;
    trackId;
    elementId;
    time;
    clipboardItems;
    constructor({ trackId, elementId, time, clipboardItems }){
        super();
        this.trackId = trackId;
        this.elementId = elementId;
        this.time = time;
        this.clipboardItems = clipboardItems;
    }
    execute() {
        if (this.clipboardItems.length === 0) {
            return undefined;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedState = editor.scenes.getActiveScene().tracks;
        const updatedTracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateElementInSceneTracks"])({
            tracks: this.savedState,
            trackId: this.trackId,
            elementId: this.elementId,
            update: (element)=>pasteKeyframesIntoElement({
                    element,
                    time: this.time,
                    clipboardItems: this.clipboardItems
                })
        });
        editor.timeline.updateTracks(updatedTracks);
        return undefined;
    }
    undo() {
        if (!this.savedState) {
            return;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        editor.timeline.updateTracks(this.savedState);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/clipboard/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/paste.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2d$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/paste-keyframes.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2d$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2d$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/tracks-snapshot.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TracksSnapshotCommand",
    ()=>TracksSnapshotCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class TracksSnapshotCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    constructor({ before, after }){
        super();
        this.before = before;
        this.after = after;
    }
    before;
    after;
    execute() {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance().timeline.updateTracks(this.after);
        return undefined;
    }
    undo() {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance().timeline.updateTracks(this.before);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$tracks$2d$snapshot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/tracks-snapshot.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$tracks$2d$snapshot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$tracks$2d$snapshot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/project/update-project-settings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "UpdateProjectSettingsCommand",
    ()=>UpdateProjectSettingsCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class UpdateProjectSettingsCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    updates;
    savedSettings;
    savedUpdatedAt;
    constructor(updates){
        super(), this.updates = updates, this.savedSettings = null, this.savedUpdatedAt = null;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const activeProject = editor.project.getActive();
        if (!activeProject) return;
        this.savedSettings = activeProject.settings;
        this.savedUpdatedAt = activeProject.metadata.updatedAt;
        const updatedProject = {
            ...activeProject,
            settings: {
                ...activeProject.settings,
                ...this.updates
            },
            metadata: {
                ...activeProject.metadata,
                updatedAt: new Date()
            }
        };
        editor.project.setActiveProject({
            project: updatedProject
        });
        editor.save.markDirty();
    }
    undo() {
        if (!this.savedSettings || !this.savedUpdatedAt) return;
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const activeProject = editor.project.getActive();
        if (!activeProject) return;
        const updatedProject = {
            ...activeProject,
            settings: this.savedSettings,
            metadata: {
                ...activeProject.metadata,
                updatedAt: this.savedUpdatedAt
            }
        };
        editor.project.setActiveProject({
            project: updatedProject
        });
        editor.save.markDirty();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/project/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/project/update-project-settings.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/media/add-media-asset.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AddMediaAssetCommand",
    ()=>AddMediaAssetCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/sonner@1.7.4+21ccd8898788a04d/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fps/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/project/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/project/update-project-settings.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
class AddMediaAssetCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    assetId;
    savedAssets = null;
    createdAsset = null;
    previousProjectFps = null;
    appliedProjectFps = null;
    constructor({ projectId, asset }){
        super();
        this.projectId = projectId;
        this.asset = asset;
        this.assetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
    }
    projectId;
    asset;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedAssets = [
            ...editor.media.getAssets()
        ];
        this.createdAsset = {
            ...this.asset,
            id: this.assetId
        };
        editor.media.setAssets({
            assets: [
                ...this.savedAssets,
                this.createdAsset
            ]
        });
        this.previousProjectFps = editor.project.getActiveOrNull()?.settings.fps ?? null;
        this.appliedProjectFps = editor.project.ratchetFpsForImportedMedia({
            importedAssets: [
                this.createdAsset
            ]
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveMediaAsset({
            projectId: this.projectId,
            mediaAsset: this.createdAsset
        }).catch((error)=>{
            console.error("Failed to save media item:", error);
            const currentAssets = editor.media.getAssets();
            editor.media.setAssets({
                assets: currentAssets.filter((asset)=>asset.id !== this.assetId)
            });
            const currentTracks = editor.scenes.getActiveScene().tracks;
            const orphanedElements = [];
            for (const track of [
                ...currentTracks.overlay,
                currentTracks.main,
                ...currentTracks.audio
            ]){
                for (const element of track.elements){
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasMediaId"])(element) && element.mediaId === this.assetId) {
                        orphanedElements.push({
                            trackId: track.id,
                            elementId: element.id
                        });
                    }
                }
            }
            if (orphanedElements.length > 0) {
                editor.timeline.deleteElements({
                    elements: orphanedElements
                });
            }
            this.restoreProjectFpsAfterFailedSave({
                editor
            });
            if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].isQuotaExceededError({
                error
            })) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Not enough browser storage", {
                    description: error instanceof Error ? error.message : undefined
                });
            }
        });
        return undefined;
    }
    undo() {
        if (this.savedAssets) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.media.setAssets({
                assets: this.savedAssets
            });
            if (this.createdAsset) {
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].deleteMediaAsset({
                    projectId: this.projectId,
                    id: this.assetId
                }).catch((error)=>{
                    console.error("Failed to delete media item on undo:", error);
                });
            }
        }
    }
    getAssetId() {
        return this.assetId;
    }
    restoreProjectFpsAfterFailedSave({ editor }) {
        if (this.previousProjectFps === null || this.appliedProjectFps === null) return;
        const activeProject = editor.project.getActiveOrNull();
        if (!activeProject) return;
        if (!this.appliedProjectFps || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frameRatesEqual"])({
            a: activeProject.settings.fps,
            b: this.appliedProjectFps
        })) return;
        const highestRemainingVideoFps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHighestImportedVideoFps"])({
            mediaAssets: editor.media.getAssets()
        });
        const appliedFpsFloat = this.appliedProjectFps.numerator / this.appliedProjectFps.denominator;
        if (highestRemainingVideoFps !== null && highestRemainingVideoFps >= appliedFpsFloat) {
            return;
        }
        new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateProjectSettingsCommand"]({
            fps: this.previousProjectFps
        }).execute();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/media/remove-media-asset.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveMediaAssetCommand",
    ()=>RemoveMediaAssetCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$waveform$2d$summary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/waveform-summary.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$video$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/video-cache/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/waveform-cache/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
class RemoveMediaAssetCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedAssets = null;
    savedTracks = null;
    removedAsset = null;
    constructor({ projectId, assetId }){
        super();
        this.projectId = projectId;
        this.assetId = assetId;
    }
    projectId;
    assetId;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const assets = editor.media.getAssets();
        this.savedAssets = [
            ...assets
        ];
        this.savedTracks = editor.scenes.getActiveScene().tracks;
        this.removedAsset = assets.find((media)=>media.id === this.assetId) ?? null;
        if (!this.removedAsset) {
            console.error("Media asset not found:", this.assetId);
            return;
        }
        if (this.removedAsset.url) {
            URL.revokeObjectURL(this.removedAsset.url);
        }
        if (this.removedAsset.thumbnailUrl) {
            URL.revokeObjectURL(this.removedAsset.thumbnailUrl);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$video$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["videoCache"].clearVideo({
            mediaId: this.assetId
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waveformCache"].clearSource({
            sourceKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$waveform$2d$summary$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildWaveformSourceKey"])({
                kind: "media",
                id: this.assetId
            })
        });
        editor.media.setAssets({
            assets: assets.filter((media)=>media.id !== this.assetId)
        });
        const elementsToRemove = [];
        for (const track of [
            ...this.savedTracks.overlay,
            this.savedTracks.main,
            ...this.savedTracks.audio
        ]){
            for (const element of track.elements){
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasMediaId"])(element) && element.mediaId === this.assetId) {
                    elementsToRemove.push({
                        trackId: track.id,
                        elementId: element.id
                    });
                }
            }
        }
        if (elementsToRemove.length > 0) {
            editor.timeline.deleteElements({
                elements: elementsToRemove
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].deleteMediaAsset({
            projectId: this.projectId,
            id: this.assetId
        }).catch((error)=>{
            console.error("Failed to delete media item:", error);
        });
    }
    undo() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        if (this.savedAssets && this.removedAsset) {
            const restoredAsset = {
                ...this.removedAsset,
                url: URL.createObjectURL(this.removedAsset.file)
            };
            editor.media.setAssets({
                assets: this.savedAssets.map((a)=>a.id === this.assetId ? restoredAsset : a)
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveMediaAsset({
                projectId: this.projectId,
                mediaAsset: restoredAsset
            }).catch((error)=>{
                console.error("Failed to restore media item on undo:", error);
            });
        }
        if (this.savedTracks) {
            editor.timeline.updateTracks(this.savedTracks);
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/media/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$add$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/media/add-media-asset.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$remove$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/media/remove-media-asset.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$add$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$remove$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$add$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$remove$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/create-scene.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "CreateSceneCommand",
    ()=>CreateSceneCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class CreateSceneCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedScenes = null;
    createdScene = null;
    constructor({ name, isMain = false }){
        super();
        this.name = name;
        this.isMain = isMain;
    }
    name;
    isMain;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        this.savedScenes = [
            ...editor.scenes.getScenes()
        ];
        this.createdScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDefaultScene"])({
            name: this.name,
            isMain: this.isMain
        });
        const updatedScenes = [
            ...this.savedScenes,
            this.createdScene
        ];
        editor.scenes.setScenes({
            scenes: updatedScenes
        });
        return undefined;
    }
    undo() {
        if (this.savedScenes) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.scenes.setScenes({
                scenes: this.savedScenes
            });
        }
    }
    getSceneId() {
        return this.createdScene?.id ?? "";
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/delete-scene.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DeleteSceneCommand",
    ()=>DeleteSceneCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class DeleteSceneCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    sceneId;
    savedScenes;
    savedActiveSceneId;
    deletedScene;
    constructor(sceneId){
        super(), this.sceneId = sceneId, this.savedScenes = null, this.savedActiveSceneId = null, this.deletedScene = null;
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const scenes = editor.scenes.getScenes();
        const activeScene = editor.scenes.getActiveScene();
        this.savedScenes = [
            ...scenes
        ];
        this.savedActiveSceneId = activeScene?.id ?? null;
        this.deletedScene = scenes.find((s)=>s.id === this.sceneId) ?? null;
        if (!this.deletedScene) {
            console.error("Scene not found:", this.sceneId);
            return;
        }
        const { canDelete, reason } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canDeleteScene"])({
            scene: this.deletedScene
        });
        if (!canDelete) {
            console.error("Cannot delete scene:", reason);
            return;
        }
        const updatedScenes = scenes.filter((s)=>s.id !== this.sceneId);
        const newActiveScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFallbackSceneAfterDelete"])({
            scenes: updatedScenes,
            deletedSceneId: this.sceneId,
            currentSceneId: activeScene?.id ?? null
        });
        editor.scenes.setScenes({
            scenes: updatedScenes,
            activeSceneId: newActiveScene?.id
        });
    }
    undo() {
        if (this.savedScenes && this.deletedScene) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.scenes.setScenes({
                scenes: this.savedScenes,
                activeSceneId: this.savedActiveSceneId ?? undefined
            });
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/rename-scene.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RenameSceneCommand",
    ()=>RenameSceneCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class RenameSceneCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedScenes = null;
    previousName = null;
    constructor({ sceneId, newName }){
        super();
        this.sceneId = sceneId;
        this.newName = newName;
    }
    sceneId;
    newName;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const scenes = editor.scenes.getScenes();
        this.savedScenes = [
            ...scenes
        ];
        const scene = scenes.find((s)=>s.id === this.sceneId);
        if (!scene) {
            console.error("Scene not found:", this.sceneId);
            return;
        }
        this.previousName = scene.name;
        const updatedScenes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateSceneInArray"])({
            scenes,
            sceneId: this.sceneId,
            updates: {
                name: this.newName,
                updatedAt: new Date()
            }
        });
        editor.scenes.setScenes({
            scenes: updatedScenes
        });
    }
    undo() {
        if (this.savedScenes && this.previousName !== null) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.scenes.setScenes({
                scenes: this.savedScenes
            });
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/toggle-bookmark.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ToggleBookmarkCommand",
    ()=>ToggleBookmarkCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class ToggleBookmarkCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    time;
    savedScenes;
    frameTime;
    constructor(time){
        super(), this.time = time, this.savedScenes = null, this.frameTime = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const activeScene = editor.scenes.getActiveScene();
        const activeProject = editor.project.getActive();
        if (!activeScene || !activeProject) {
            return;
        }
        const scenes = editor.scenes.getScenes();
        this.savedScenes = [
            ...scenes
        ];
        this.frameTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrameTime"])({
            time: this.time,
            fps: activeProject.settings.fps
        });
        const updatedBookmarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toggleBookmarkInArray"])({
            bookmarks: activeScene.bookmarks,
            frameTime: this.frameTime
        });
        const updatedScenes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateSceneInArray"])({
            scenes,
            sceneId: activeScene.id,
            updates: {
                bookmarks: updatedBookmarks
            }
        });
        editor.scenes.setScenes({
            scenes: updatedScenes
        });
    }
    undo() {
        if (this.savedScenes) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.scenes.setScenes({
                scenes: this.savedScenes
            });
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/remove-bookmark.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveBookmarkCommand",
    ()=>RemoveBookmarkCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class RemoveBookmarkCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    time;
    savedScenes;
    frameTime;
    constructor(time){
        super(), this.time = time, this.savedScenes = null, this.frameTime = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
    }
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const activeScene = editor.scenes.getActiveScene();
        const activeProject = editor.project.getActive();
        if (!activeScene || !activeProject) {
            return;
        }
        const scenes = editor.scenes.getScenes();
        this.savedScenes = [
            ...scenes
        ];
        this.frameTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrameTime"])({
            time: this.time,
            fps: activeProject.settings.fps
        });
        const updatedBookmarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeBookmarkFromArray"])({
            bookmarks: activeScene.bookmarks,
            frameTime: this.frameTime
        });
        if (updatedBookmarks.length === activeScene.bookmarks.length) {
            return;
        }
        const updatedScenes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateSceneInArray"])({
            scenes,
            sceneId: activeScene.id,
            updates: {
                bookmarks: updatedBookmarks
            }
        });
        editor.scenes.setScenes({
            scenes: updatedScenes
        });
    }
    undo() {
        if (this.savedScenes) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.scenes.setScenes({
                scenes: this.savedScenes
            });
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/update-bookmark.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "UpdateBookmarkCommand",
    ()=>UpdateBookmarkCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class UpdateBookmarkCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedScenes = null;
    constructor({ time, updates }){
        super();
        this.time = time;
        this.updates = updates;
    }
    time;
    updates;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const activeScene = editor.scenes.getActiveScene();
        const activeProject = editor.project.getActive();
        if (!activeScene || !activeProject) {
            return;
        }
        const scenes = editor.scenes.getScenes();
        this.savedScenes = [
            ...scenes
        ];
        const frameTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrameTime"])({
            time: this.time,
            fps: activeProject.settings.fps
        });
        const updatedBookmarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateBookmarkInArray"])({
            bookmarks: activeScene.bookmarks,
            frameTime,
            updates: this.updates
        });
        const updatedScenes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateSceneInArray"])({
            scenes,
            sceneId: activeScene.id,
            updates: {
                bookmarks: updatedBookmarks
            }
        });
        editor.scenes.setScenes({
            scenes: updatedScenes
        });
    }
    undo() {
        if (this.savedScenes) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.scenes.setScenes({
                scenes: this.savedScenes
            });
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/move-bookmark.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MoveBookmarkCommand",
    ()=>MoveBookmarkCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class MoveBookmarkCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Command"] {
    savedScenes = null;
    constructor({ fromTime, toTime }){
        super();
        this.fromTime = fromTime;
        this.toTime = toTime;
    }
    fromTime;
    toTime;
    execute() {
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
        const activeScene = editor.scenes.getActiveScene();
        const activeProject = editor.project.getActive();
        if (!activeScene || !activeProject) {
            return;
        }
        const scenes = editor.scenes.getScenes();
        this.savedScenes = [
            ...scenes
        ];
        const fromFrameTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrameTime"])({
            time: this.fromTime,
            fps: activeProject.settings.fps
        });
        const toFrameTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrameTime"])({
            time: this.toTime,
            fps: activeProject.settings.fps
        });
        const updatedBookmarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["moveBookmarkInArray"])({
            bookmarks: activeScene.bookmarks,
            fromTime: fromFrameTime,
            toTime: toFrameTime
        });
        const updatedScenes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateSceneInArray"])({
            scenes,
            sceneId: activeScene.id,
            updates: {
                bookmarks: updatedBookmarks
            }
        });
        editor.scenes.setScenes({
            scenes: updatedScenes
        });
    }
    undo() {
        if (this.savedScenes) {
            const editor = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditorCore"].getInstance();
            editor.scenes.setScenes({
                scenes: this.savedScenes
            });
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/scene/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$create$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/create-scene.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$delete$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/delete-scene.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$rename$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/rename-scene.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$toggle$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/toggle-bookmark.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$remove$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/remove-bookmark.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$update$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/update-bookmark.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$move$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/move-bookmark.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$create$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$delete$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$rename$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$toggle$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$remove$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$update$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$move$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$create$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$delete$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$rename$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$toggle$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$remove$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$update$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$move$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$base$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/base-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$batch$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/batch-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/media/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/project/index.ts [app-ssr] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/track/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AddTrackCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$add$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddTrackCommand"],
    "RemoveTrackCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$remove$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveTrackCommand"],
    "ToggleTrackMuteCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$mute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleTrackMuteCommand"],
    "ToggleTrackVisibilityCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$visibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleTrackVisibilityCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$add$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/add-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$remove$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/remove-track.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$mute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/toggle-track-mute.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$visibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/toggle-track-visibility.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$add$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$remove$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$mute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$visibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$add$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$remove$2d$track$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$mute$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$toggle$2d$track$2d$visibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/keyframes/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RemoveEffectParamKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveEffectParamKeyframeCommand"],
    "RemoveKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveKeyframeCommand"],
    "RetimeKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RetimeKeyframeCommand"],
    "UpdateScalarKeyframeCurveCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateScalarKeyframeCurveCommand"],
    "UpsertEffectParamKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpsertEffectParamKeyframeCommand"],
    "UpsertKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpsertKeyframeCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/remove-effect-param-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/remove-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/retime-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/update-scalar-keyframe-curve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/upsert-effect-param-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/upsert-keyframe.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/effects/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AddClipEffectCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$add$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddClipEffectCommand"],
    "RemoveClipEffectCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$remove$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveClipEffectCommand"],
    "ReorderClipEffectsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$reorder$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReorderClipEffectsCommand"],
    "ToggleClipEffectCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$toggle$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleClipEffectCommand"],
    "UpdateClipEffectParamsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$update$2d$effect$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateClipEffectParamsCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$add$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/add-effect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$remove$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/remove-effect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$toggle$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/toggle-effect.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$update$2d$effect$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/update-effect-params.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$reorder$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/reorder-effect.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$add$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$remove$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$toggle$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$update$2d$effect$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$reorder$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$add$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$remove$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$toggle$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$update$2d$effect$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$reorder$2d$effect$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/masks/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DeleteFreeformPathMaskPointsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$delete$2d$custom$2d$mask$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteFreeformPathMaskPointsCommand"],
    "InsertFreeformPathMaskPointCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$insert$2d$custom$2d$mask$2d$point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InsertFreeformPathMaskPointCommand"],
    "RemoveMaskCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$remove$2d$mask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveMaskCommand"],
    "ToggleMaskInvertedCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$toggle$2d$mask$2d$inverted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleMaskInvertedCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$delete$2d$custom$2d$mask$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/delete-custom-mask-points.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$insert$2d$custom$2d$mask$2d$point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/insert-custom-mask-point.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$remove$2d$mask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/remove-mask.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$toggle$2d$mask$2d$inverted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/toggle-mask-inverted.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$delete$2d$custom$2d$mask$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$insert$2d$custom$2d$mask$2d$point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$remove$2d$mask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$toggle$2d$mask$2d$inverted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$delete$2d$custom$2d$mask$2d$points$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$insert$2d$custom$2d$mask$2d$point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$remove$2d$mask$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$toggle$2d$mask$2d$inverted$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/element/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AddClipEffectCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddClipEffectCommand"],
    "DeleteElementsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$delete$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteElementsCommand"],
    "DeleteFreeformPathMaskPointsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteFreeformPathMaskPointsCommand"],
    "DuplicateElementsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$duplicate$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DuplicateElementsCommand"],
    "InsertElementCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$insert$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InsertElementCommand"],
    "InsertFreeformPathMaskPointCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InsertFreeformPathMaskPointCommand"],
    "MoveElementCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$move$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoveElementCommand"],
    "RemoveClipEffectCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveClipEffectCommand"],
    "RemoveEffectParamKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveEffectParamKeyframeCommand"],
    "RemoveKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveKeyframeCommand"],
    "RemoveMaskCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveMaskCommand"],
    "ReorderClipEffectsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReorderClipEffectsCommand"],
    "RetimeKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RetimeKeyframeCommand"],
    "SplitElementsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$split$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SplitElementsCommand"],
    "ToggleClipEffectCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleClipEffectCommand"],
    "ToggleMaskInvertedCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleMaskInvertedCommand"],
    "ToggleSourceAudioSeparationCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$toggle$2d$source$2d$audio$2d$separation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleSourceAudioSeparationCommand"],
    "UpdateClipEffectParamsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateClipEffectParamsCommand"],
    "UpdateElementsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$update$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateElementsCommand"],
    "UpdateScalarKeyframeCurveCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateScalarKeyframeCurveCommand"],
    "UpsertEffectParamKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpsertEffectParamKeyframeCommand"],
    "UpsertKeyframeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpsertKeyframeCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$insert$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/insert-element.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$delete$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/delete-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$duplicate$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/duplicate-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$split$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/split-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$update$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/update-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$toggle$2d$source$2d$audio$2d$separation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/toggle-source-audio-separation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$move$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/move-elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$insert$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$delete$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$duplicate$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$split$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$update$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$toggle$2d$source$2d$audio$2d$separation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$move$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$insert$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$delete$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$duplicate$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$split$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$update$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$toggle$2d$source$2d$audio$2d$separation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$move$2d$elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/media/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AddMediaAssetCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$add$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddMediaAssetCommand"],
    "RemoveMediaAssetCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$remove$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveMediaAssetCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/media/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$add$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/media/add-media-asset.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$remove$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/media/remove-media-asset.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$add$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$remove$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$add$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$remove$2d$media$2d$asset$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/commands/timeline/clipboard/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PasteCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PasteCommand"],
    "PasteKeyframesCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2d$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PasteKeyframesCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/paste.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2d$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/paste-keyframes.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2d$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$paste$2d$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=apps_web_src_commands_685fdec7._.js.map