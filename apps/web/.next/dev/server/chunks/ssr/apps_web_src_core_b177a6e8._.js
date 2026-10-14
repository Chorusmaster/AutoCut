module.exports = [
"[project]/apps/web/src/core/managers/playback-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PlaybackManager",
    ()=>PlaybackManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class PlaybackManager {
    editor;
    isPlaying;
    currentTime;
    volume;
    muted;
    previousVolume;
    isScrubbing;
    listeners;
    updateListeners;
    seekListeners;
    playbackTimer;
    playbackStartWallTime;
    playbackStartTime;
    timelineScopeBound;
    constructor(editor){
        this.editor = editor;
        this.isPlaying = false;
        this.currentTime = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
        this.volume = 1;
        this.muted = false;
        this.previousVolume = 1;
        this.isScrubbing = false;
        this.listeners = new Set();
        this.updateListeners = new Set();
        this.seekListeners = new Set();
        this.playbackTimer = null;
        this.playbackStartWallTime = 0;
        this.playbackStartTime = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
        this.timelineScopeBound = false;
        this.updateTime = ()=>{
            if (!this.isPlaying) return;
            const fps = this.editor.project.getActive()?.settings.fps;
            const elapsedSeconds = (performance.now() - this.playbackStartWallTime) / 1000;
            const rawTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addMediaTime"])({
                a: this.playbackStartTime,
                b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaTimeFromSeconds"])({
                    seconds: elapsedSeconds
                })
            });
            const newTime = fps ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["roundFrameTime"])({
                time: rawTime,
                fps
            }) : rawTime;
            const maxTime = this.editor.timeline.getTotalDuration();
            if (newTime >= maxTime) {
                this.pause();
                this.currentTime = maxTime;
                this.notify();
                this.notifySeek(maxTime);
                this.dispatchSeekEvent(maxTime);
                return;
            }
            this.currentTime = newTime;
            this.notifyUpdate(newTime);
            this.dispatchUpdateEvent(newTime);
            this.playbackTimer = requestAnimationFrame(this.updateTime);
        };
    }
    bindTimelineScope() {
        if (this.timelineScopeBound) {
            return;
        }
        const reconcile = ()=>{
            this.reconcileTimelineScope();
        };
        this.editor.timeline.subscribe(reconcile);
        this.editor.scenes.subscribe(reconcile);
        this.timelineScopeBound = true;
        this.reconcileTimelineScope();
    }
    play() {
        const maxTime = this.editor.timeline.getTotalDuration();
        if (maxTime <= 0) {
            return;
        }
        if (this.currentTime >= maxTime) {
            this.seek({
                time: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"]
            });
        }
        this.isPlaying = true;
        this.startTimer();
        this.notify();
    }
    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.notify();
    }
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    seek({ time }) {
        this.currentTime = this.clampTimeToTimeline(time);
        if (this.isPlaying) {
            this.playbackStartWallTime = performance.now();
            this.playbackStartTime = this.currentTime;
        }
        this.notify();
        this.notifySeek(this.currentTime);
    }
    setVolume({ volume }) {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        this.volume = clampedVolume;
        this.muted = clampedVolume === 0;
        if (clampedVolume > 0) {
            this.previousVolume = clampedVolume;
        }
        this.notify();
    }
    mute() {
        if (this.volume > 0) {
            this.previousVolume = this.volume;
        }
        this.muted = true;
        this.volume = 0;
        this.notify();
    }
    unmute() {
        this.muted = false;
        this.volume = this.previousVolume;
        this.notify();
    }
    toggleMute() {
        if (this.muted) {
            this.unmute();
        } else {
            this.mute();
        }
    }
    getIsPlaying() {
        return this.isPlaying;
    }
    getCurrentTime() {
        return this.currentTime;
    }
    getVolume() {
        return this.volume;
    }
    isMuted() {
        return this.muted;
    }
    setScrubbing({ isScrubbing }) {
        this.isScrubbing = isScrubbing;
        this.notify();
    }
    getIsScrubbing() {
        return this.isScrubbing;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    onUpdate(listener) {
        this.updateListeners.add(listener);
        return ()=>this.updateListeners.delete(listener);
    }
    onSeek(listener) {
        this.seekListeners.add(listener);
        return ()=>this.seekListeners.delete(listener);
    }
    reconcileTimelineScope() {
        const maxTime = this.editor.timeline.getTotalDuration();
        const nextTime = this.clampTimeToTimeline(this.currentTime);
        const shouldPause = this.isPlaying && nextTime >= maxTime;
        const timeChanged = nextTime !== this.currentTime;
        if (!timeChanged && !shouldPause) {
            return;
        }
        if (shouldPause) {
            this.isPlaying = false;
            this.stopTimer();
        }
        this.currentTime = nextTime;
        this.notify();
        if (timeChanged) {
            this.notifySeek(this.currentTime);
            this.dispatchSeekEvent(this.currentTime);
        }
    }
    notify() {
        this.listeners.forEach((fn)=>{
            fn();
        });
    }
    notifyUpdate(time) {
        this.updateListeners.forEach((fn)=>{
            fn(time);
        });
    }
    notifySeek(time) {
        this.seekListeners.forEach((fn)=>{
            fn(time);
        });
    }
    startTimer() {
        if (this.playbackTimer) {
            cancelAnimationFrame(this.playbackTimer);
        }
        this.playbackStartWallTime = performance.now();
        this.playbackStartTime = this.currentTime;
        this.updateTime();
    }
    stopTimer() {
        if (this.playbackTimer) {
            cancelAnimationFrame(this.playbackTimer);
            this.playbackTimer = null;
        }
    }
    updateTime;
    clampTimeToTimeline(time) {
        const maxTime = this.editor.timeline.getTotalDuration();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampMediaTime"])({
            time,
            min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
            max: maxTime
        });
    }
    dispatchSeekEvent(time) {
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
    }
    dispatchUpdateEvent(time) {
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/timeline-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TimelineManager",
    ()=>TimelineManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/drag-source.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-element-update.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-state.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/animation-targets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$batch$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/batch-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/track/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$tracks$2d$snapshot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/tracks-snapshot.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/upsert-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/remove-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/retime-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/update-scalar-keyframe-curve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/effects/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/masks/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/upsert-effect-param-keyframe.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/element/keyframes/remove-effect-param-keyframe.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$tracks$2d$snapshot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$tracks$2d$snapshot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
class TimelineManager {
    editor;
    listeners;
    previewOverlay;
    previewTracks;
    dragSource;
    constructor(editor){
        this.editor = editor;
        this.listeners = new Set();
        this.previewOverlay = new Map();
        this.previewTracks = null;
        this.dragSource = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$drag$2d$source$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TimelineDragSource"]();
    }
    addTrack({ type, index }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddTrackCommand"]({
            type,
            index
        });
        this.editor.command.execute({
            command
        });
        return command.getTrackId();
    }
    removeTrack({ trackId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveTrackCommand"](trackId);
        this.editor.command.execute({
            command
        });
    }
    insertElement({ element, placement }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InsertElementCommand"]({
            element,
            placement
        });
        this.editor.command.execute({
            command
        });
    }
    updateElementTrim({ elementId, trimStart, trimEnd, startTime, duration, pushHistory = true }) {
        const trackId = this.findTrackIdForElement({
            elementId
        });
        if (!trackId) {
            return;
        }
        const nextUpdates = {
            trimStart,
            trimEnd
        };
        if (startTime !== undefined) {
            nextUpdates.startTime = startTime;
        }
        if (duration !== undefined) {
            nextUpdates.duration = duration;
        }
        this.updateElements({
            updates: [
                {
                    trackId,
                    elementId,
                    patch: nextUpdates
                }
            ],
            pushHistory
        });
    }
    updateElementRetime({ trackId, elementId, retime, pushHistory = true }) {
        this.updateElements({
            updates: [
                {
                    trackId,
                    elementId,
                    patch: {
                        retime
                    }
                }
            ],
            pushHistory
        });
    }
    moveElements({ moves, createTracks }) {
        if (moves.length === 0) {
            return;
        }
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoveElementCommand"]({
            moves,
            createTracks
        });
        this.editor.command.execute({
            command
        });
    }
    toggleTrackMute({ trackId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleTrackMuteCommand"](trackId);
        this.editor.command.execute({
            command
        });
    }
    toggleTrackVisibility({ trackId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$track$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleTrackVisibilityCommand"](trackId);
        this.editor.command.execute({
            command
        });
    }
    splitElements({ elements, splitTime, retainSide = "both" }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SplitElementsCommand"]({
            elements,
            splitTime,
            retainSide
        });
        this.editor.command.execute({
            command
        });
        return command.getRightSideElements();
    }
    getTotalDuration() {
        const activeScene = this.editor.scenes.getActiveSceneOrNull();
        if (!activeScene) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"];
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["calculateTotalDuration"])({
            tracks: activeScene.tracks
        });
    }
    getLastFrameTime() {
        const duration = this.getTotalDuration();
        const fps = this.editor.project.getActive()?.settings.fps;
        if (!fps || duration <= 0) return duration;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lastFrameMediaTime"])({
            duration,
            fps
        });
    }
    getTrackById({ trackId }) {
        const activeScene = this.editor.scenes.getActiveSceneOrNull();
        if (!activeScene) {
            return null;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$element$2d$update$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findTrackInSceneTracks"])({
            tracks: activeScene.tracks,
            trackId
        });
    }
    getElementsWithTracks({ elements }) {
        const result = [];
        for (const { trackId, elementId } of elements){
            const track = this.getTrackById({
                trackId
            });
            const element = track?.elements.find((trackElement)=>trackElement.id === elementId);
            if (track && element) {
                result.push({
                    track,
                    element
                });
            }
        }
        return result;
    }
    deleteElements({ elements }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteElementsCommand"]({
            elements
        });
        this.editor.command.execute({
            command
        });
    }
    toggleSourceAudioSeparation({ trackId, elementId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleSourceAudioSeparationCommand"]({
            trackId,
            elementId
        });
        this.editor.command.execute({
            command
        });
    }
    updateElements({ updates, pushHistory = true }) {
        if (updates.length === 0) {
            return;
        }
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateElementsCommand"]({
            updates
        });
        if (pushHistory) {
            this.editor.command.execute({
                command
            });
        } else {
            command.execute();
        }
    }
    addClipEffect({ trackId, elementId, effectType }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AddClipEffectCommand"]({
            trackId,
            elementId,
            effectType
        });
        this.editor.command.execute({
            command
        });
        return command.getEffectId() ?? "";
    }
    removeClipEffect({ trackId, elementId, effectId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveClipEffectCommand"]({
            trackId,
            elementId,
            effectId
        });
        this.editor.command.execute({
            command
        });
    }
    removeMask({ trackId, elementId, maskId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveMaskCommand"]({
            trackId,
            elementId,
            maskId
        });
        this.editor.command.execute({
            command
        });
    }
    deleteFreeformPathMaskPoints({ trackId, elementId, maskId, pointIds }) {
        if (pointIds.length === 0) {
            return;
        }
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteFreeformPathMaskPointsCommand"]({
            trackId,
            elementId,
            maskId,
            pointIds
        });
        this.editor.command.execute({
            command
        });
    }
    insertFreeformPathMaskPoint({ trackId, elementId, maskId, segmentIndex, canvasPoint, bounds }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InsertFreeformPathMaskPointCommand"]({
            trackId,
            elementId,
            maskId,
            segmentIndex,
            canvasPoint,
            bounds
        });
        this.editor.command.execute({
            command
        });
    }
    updateClipEffectParams({ trackId, elementId, effectId, params, pushHistory = true }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateClipEffectParamsCommand"]({
            trackId,
            elementId,
            effectId,
            params
        });
        if (pushHistory) {
            this.editor.command.execute({
                command
            });
        } else {
            command.execute();
        }
    }
    toggleClipEffect({ trackId, elementId, effectId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleClipEffectCommand"]({
            trackId,
            elementId,
            effectId
        });
        this.editor.command.execute({
            command
        });
    }
    toggleMaskInverted({ trackId, elementId, maskId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleMaskInvertedCommand"]({
            trackId,
            elementId,
            maskId
        });
        this.editor.command.execute({
            command
        });
    }
    reorderClipEffects({ trackId, elementId, fromIndex, toIndex }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReorderClipEffectsCommand"]({
            trackId,
            elementId,
            fromIndex,
            toIndex
        });
        this.editor.command.execute({
            command
        });
    }
    upsertKeyframes({ keyframes }) {
        if (keyframes.length === 0) {
            return;
        }
        const commands = keyframes.map(({ trackId, elementId, propertyPath, time, value, interpolation, keyframeId })=>new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpsertKeyframeCommand"]({
                trackId,
                elementId,
                propertyPath,
                time,
                value,
                interpolation,
                keyframeId
            }));
        const command = commands.length === 1 ? commands[0] : new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$batch$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BatchCommand"](commands);
        this.editor.command.execute({
            command
        });
    }
    removeKeyframes({ keyframes }) {
        if (keyframes.length === 0) {
            return;
        }
        // Pre-sample values at playhead for each (element, property) pair.
        // This preserves "what you see is what you get" when all keyframes are deleted.
        const playheadTime = this.editor.playback.getCurrentTime();
        const valueAtPlayheadMap = new Map();
        for (const { trackId, elementId, propertyPath } of keyframes){
            const key = `${elementId}:${propertyPath}`;
            if (valueAtPlayheadMap.has(key)) {
                continue;
            }
            const element = this.getElementByRef({
                trackId,
                elementId
            });
            if (!element) {
                valueAtPlayheadMap.set(key, null);
                continue;
            }
            const localTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementLocalTime"])({
                timelineTime: playheadTime,
                elementStartTime: element.startTime,
                elementDuration: element.duration
            });
            const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$animation$2d$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationTarget"])({
                element,
                path: propertyPath
            });
            const baseValue = target?.getBaseValue() ?? null;
            if (baseValue === null) {
                valueAtPlayheadMap.set(key, null);
                continue;
            }
            const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
                animations: element.animations,
                propertyPath,
                localTime,
                fallbackValue: baseValue
            });
            valueAtPlayheadMap.set(key, value);
        }
        const commands = keyframes.map(({ trackId, elementId, propertyPath, keyframeId })=>new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveKeyframeCommand"]({
                trackId,
                elementId,
                propertyPath,
                keyframeId,
                valueAtPlayhead: valueAtPlayheadMap.get(`${elementId}:${propertyPath}`) ?? null
            }));
        const command = commands.length === 1 ? commands[0] : new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$batch$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BatchCommand"](commands);
        this.editor.command.execute({
            command
        });
    }
    retimeKeyframe({ trackId, elementId, propertyPath, keyframeId, time }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$retime$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RetimeKeyframeCommand"]({
            trackId,
            elementId,
            propertyPath,
            keyframeId,
            nextTime: time
        });
        this.editor.command.execute({
            command
        });
    }
    updateKeyframeCurves({ keyframes }) {
        if (keyframes.length === 0) {
            return;
        }
        const commands = keyframes.map(({ trackId, elementId, propertyPath, componentKey, keyframeId, patch })=>new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$update$2d$scalar$2d$keyframe$2d$curve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateScalarKeyframeCurveCommand"]({
                trackId,
                elementId,
                propertyPath,
                componentKey,
                keyframeId,
                patch
            }));
        const command = commands.length === 1 ? commands[0] : new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$batch$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BatchCommand"](commands);
        this.editor.command.execute({
            command
        });
    }
    upsertEffectParamKeyframe({ trackId, elementId, effectId, paramKey, time, value, interpolation, keyframeId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$upsert$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpsertEffectParamKeyframeCommand"]({
            trackId,
            elementId,
            effectId,
            paramKey,
            time,
            value,
            interpolation,
            keyframeId
        });
        this.editor.command.execute({
            command
        });
    }
    removeEffectParamKeyframe({ trackId, elementId, effectId, paramKey, keyframeId }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$keyframes$2f$remove$2d$effect$2d$param$2d$keyframe$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveEffectParamKeyframeCommand"]({
            trackId,
            elementId,
            effectId,
            paramKey,
            keyframeId
        });
        this.editor.command.execute({
            command
        });
    }
    isPreviewActive() {
        return this.previewOverlay.size > 0;
    }
    previewElements({ updates }) {
        let changedOverlayCount = 0;
        for (const { elementId, updates: elementUpdates } of updates){
            const existingOverlay = this.previewOverlay.get(elementId);
            const changed = Object.entries(elementUpdates).some(([key, value])=>{
                return !Object.is(existingOverlay?.[key], value);
            });
            if (changed) {
                changedOverlayCount += 1;
                const mergedOverlay = {
                    ...existingOverlay,
                    ...elementUpdates
                };
                this.previewOverlay.set(elementId, mergedOverlay);
            }
        }
        const committedTracks = this.editor.scenes.getActiveSceneOrNull()?.tracks;
        if (!committedTracks) {
            return;
        }
        if (changedOverlayCount === 0) {
            return;
        }
        this.previewTracks = this.applyPreviewOverlay(committedTracks);
        this.notify();
    }
    commitPreview() {
        if (this.previewOverlay.size === 0) return;
        const committedTracks = this.editor.scenes.getActiveSceneOrNull()?.tracks;
        if (!committedTracks) {
            return;
        }
        const afterTracks = this.previewTracks ?? this.applyPreviewOverlay(committedTracks);
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$tracks$2d$snapshot$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TracksSnapshotCommand"]({
            before: committedTracks,
            after: afterTracks
        });
        this.editor.command.push({
            command
        });
        this.previewOverlay.clear();
        this.previewTracks = null;
        this.updateTracks(afterTracks);
    }
    discardPreview() {
        if (this.previewOverlay.size === 0) return;
        this.previewOverlay.clear();
        this.previewTracks = null;
        this.notify();
    }
    applyPreviewOverlay(tracks) {
        if (this.previewOverlay.size === 0) return tracks;
        const applyTrackOverlay = (track)=>{
            const hasOverlay = track.elements.some((element)=>this.previewOverlay.has(element.id));
            if (!hasOverlay) {
                return track;
            }
            const nextElements = track.elements.map((element)=>{
                const overlay = this.previewOverlay.get(element.id);
                return overlay ? {
                    ...element,
                    ...overlay
                } : element;
            });
            return {
                ...track,
                elements: nextElements
            };
        };
        return {
            overlay: tracks.overlay.map((track)=>applyTrackOverlay(track)),
            main: applyTrackOverlay(tracks.main),
            audio: tracks.audio.map((track)=>applyTrackOverlay(track))
        };
    }
    duplicateElements({ elements }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$element$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DuplicateElementsCommand"]({
            elements
        });
        this.editor.command.execute({
            command
        });
        return command.getDuplicatedElements();
    }
    toggleElementsVisibility({ elements }) {
        const shouldHide = elements.some(({ trackId, elementId })=>{
            const element = this.getElementByRef({
                trackId,
                elementId
            });
            return element && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canElementBeHidden"])(element) && !element.hidden;
        });
        const nextUpdates = elements.flatMap(({ trackId, elementId })=>{
            const element = this.getElementByRef({
                trackId,
                elementId
            });
            if (!element || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canElementBeHidden"])(element)) {
                return [];
            }
            return [
                {
                    trackId,
                    elementId,
                    patch: {
                        hidden: shouldHide
                    }
                }
            ];
        });
        this.updateElements({
            updates: nextUpdates
        });
    }
    toggleElementsMuted({ elements }) {
        const shouldMute = elements.some(({ trackId, elementId })=>{
            const element = this.getElementByRef({
                trackId,
                elementId
            });
            return element && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canElementHaveAudio"])(element) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElementMuted"])({
                element
            });
        });
        const nextUpdates = elements.flatMap(({ trackId, elementId })=>{
            const element = this.getElementByRef({
                trackId,
                elementId
            });
            if (!element || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canElementHaveAudio"])(element)) {
                return [];
            }
            return [
                {
                    trackId,
                    elementId,
                    patch: {
                        params: {
                            muted: shouldMute
                        }
                    }
                }
            ];
        });
        this.updateElements({
            updates: nextUpdates
        });
    }
    getPreviewTracks() {
        return this.previewTracks ?? this.editor.scenes.getActiveSceneOrNull()?.tracks ?? null;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((fn)=>{
            fn();
        });
    }
    getElementByRef({ trackId, elementId }) {
        return this.getTrackById({
            trackId
        })?.elements.find((element)=>element.id === elementId);
    }
    findTrackIdForElement({ elementId }) {
        const activeScene = this.editor.scenes.getActiveSceneOrNull();
        if (!activeScene) {
            return null;
        }
        if (activeScene.tracks.main.elements.some((element)=>element.id === elementId)) {
            return activeScene.tracks.main.id;
        }
        for (const track of activeScene.tracks.overlay){
            if (track.elements.some((element)=>element.id === elementId)) {
                return track.id;
            }
        }
        for (const track of activeScene.tracks.audio){
            if (track.elements.some((element)=>element.id === elementId)) {
                return track.id;
            }
        }
        return null;
    }
    updateTracks(newTracks) {
        this.previewOverlay.clear();
        this.previewTracks = null;
        this.editor.scenes.updateSceneTracks({
            tracks: newTracks
        });
        this.notify();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/scenes-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ScenesManager",
    ()=>ScenesManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/bookmarks/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$create$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/create-scene.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$delete$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/delete-scene.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$move$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/move-bookmark.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$remove$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/remove-bookmark.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$rename$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/rename-scene.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$toggle$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/toggle-bookmark.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$update$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/scene/update-bookmark.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$create$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$delete$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$move$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$remove$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$rename$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$toggle$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$update$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$create$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$delete$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$move$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$remove$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$rename$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$toggle$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$update$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
class ScenesManager {
    editor;
    active;
    list;
    listeners;
    constructor(editor){
        this.editor = editor;
        this.active = null;
        this.list = [];
        this.listeners = new Set();
    }
    async createScene({ name, isMain = false }) {
        if (!this.editor.project.getActive()) {
            throw new Error("No active project");
        }
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$create$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CreateSceneCommand"]({
            name,
            isMain
        });
        this.editor.command.execute({
            command
        });
        return command.getSceneId();
    }
    async deleteScene({ sceneId }) {
        const sceneToDelete = this.list.find((s)=>s.id === sceneId);
        if (!sceneToDelete) {
            throw new Error("Scene not found");
        }
        const { canDelete, reason } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canDeleteScene"])({
            scene: sceneToDelete
        });
        if (!canDelete) {
            throw new Error(reason);
        }
        if (!this.editor.project.getActive()) {
            throw new Error("No active project");
        }
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$delete$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteSceneCommand"](sceneId);
        this.editor.command.execute({
            command
        });
    }
    async renameScene({ sceneId, name }) {
        if (!this.editor.project.getActive()) {
            throw new Error("No active project");
        }
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$rename$2d$scene$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenameSceneCommand"]({
            sceneId,
            newName: name
        });
        this.editor.command.execute({
            command
        });
    }
    async switchToScene({ sceneId }) {
        const targetScene = this.list.find((s)=>s.id === sceneId);
        if (!targetScene) {
            throw new Error("Scene not found");
        }
        const activeProject = this.editor.project.getActive();
        if (activeProject) {
            const updatedProject = {
                ...activeProject,
                currentSceneId: sceneId,
                metadata: {
                    ...activeProject.metadata,
                    updatedAt: new Date()
                }
            };
            this.editor.project.setActiveProject({
                project: updatedProject
            });
        }
        this.active = targetScene;
        this.notify();
    }
    async toggleBookmark({ time }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$toggle$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToggleBookmarkCommand"](time);
        this.editor.command.execute({
            command
        });
    }
    isBookmarked({ time }) {
        const activeScene = this.getActiveScene();
        const activeProject = this.editor.project.getActive();
        if (!activeScene || !this.active || !activeProject) return false;
        const frameTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrameTime"])({
            time,
            fps: activeProject.settings.fps
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBookmarkAtTime"])({
            bookmarks: activeScene.bookmarks,
            frameTime
        });
    }
    async removeBookmark({ time }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$remove$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveBookmarkCommand"](time);
        this.editor.command.execute({
            command
        });
    }
    async updateBookmark({ time, updates }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$update$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateBookmarkCommand"]({
            time,
            updates
        });
        this.editor.command.execute({
            command
        });
    }
    async moveBookmark({ fromTime, toTime }) {
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$scene$2f$move$2d$bookmark$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MoveBookmarkCommand"]({
            fromTime,
            toTime
        });
        this.editor.command.execute({
            command
        });
    }
    getBookmarkAtTime({ time }) {
        const activeScene = this.active;
        const activeProject = this.editor.project.getActive();
        if (!activeScene || !activeProject) return null;
        const frameTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFrameTime"])({
            time,
            fps: activeProject.settings.fps
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$bookmarks$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBookmarkAtTime"])({
            bookmarks: activeScene.bookmarks,
            frameTime
        });
    }
    async loadProjectScenes({ projectId }) {
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].loadProject({
                id: projectId
            });
            if (result?.project.scenes) {
                const ensuredScenes = result.project.scenes ?? [];
                const currentScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findCurrentScene"])({
                    scenes: ensuredScenes,
                    currentSceneId: result.project.currentSceneId
                });
                this.list = ensuredScenes;
                this.active = currentScene;
                this.notify();
            }
        } catch (error) {
            console.error("Failed to load project scenes:", error);
            this.list = [];
            this.active = null;
            this.notify();
        }
    }
    initializeScenes({ scenes, currentSceneId }) {
        const ensuredScenes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureMainScene"])({
            scenes
        });
        const currentScene = currentSceneId ? ensuredScenes.find((s)=>s.id === currentSceneId) : null;
        const fallbackScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMainScene"])({
            scenes: ensuredScenes
        });
        this.list = ensuredScenes;
        this.active = currentScene || fallbackScene;
        this.notify();
        const hasAddedMainScene = ensuredScenes.length > scenes.length;
        if (hasAddedMainScene) {
            const activeProject = this.editor.project.getActive();
            if (activeProject) {
                const updatedProject = {
                    ...activeProject,
                    scenes: ensuredScenes,
                    metadata: {
                        ...activeProject.metadata,
                        updatedAt: new Date()
                    }
                };
                this.editor.project.setActiveProject({
                    project: updatedProject
                });
                this.editor.save.markDirty({
                    force: true
                });
            }
        }
    }
    clearScenes() {
        this.list = [];
        this.active = null;
        this.notify();
    }
    getActiveScene() {
        if (!this.active) {
            throw new Error("No active scene.");
        }
        return this.active;
    }
    getActiveSceneOrNull() {
        return this.active;
    }
    getScenes() {
        return this.list;
    }
    setScenes({ scenes, activeSceneId }) {
        this.list = scenes;
        const nextActiveSceneId = activeSceneId ?? this.active?.id ?? null;
        this.active = nextActiveSceneId ? scenes.find((scene)=>scene.id === nextActiveSceneId) ?? null : null;
        this.notify();
        const activeProject = this.editor.project.getActive();
        if (activeProject) {
            const updatedProject = {
                ...activeProject,
                scenes,
                metadata: {
                    ...activeProject.metadata,
                    updatedAt: new Date()
                }
            };
            this.editor.project.setActiveProject({
                project: updatedProject
            });
        }
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((fn)=>{
            fn();
        });
    }
    updateSceneTracks({ tracks }) {
        if (!this.active) return;
        const updatedScene = {
            ...this.active,
            tracks,
            updatedAt: new Date()
        };
        this.list = this.list.map((s)=>s.id === this.active?.id ? updatedScene : s);
        this.active = updatedScene;
        this.notify();
        const activeProject = this.editor.project.getActive();
        if (activeProject) {
            const updatedProject = {
                ...activeProject,
                scenes: this.list,
                metadata: {
                    ...activeProject.metadata,
                    updatedAt: new Date()
                }
            };
            this.editor.project.setActiveProject({
                project: updatedProject
            });
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/project-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ProjectManager",
    ()=>ProjectManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/sonner@1.7.4+21ccd8898788a04d/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/project/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/project/update-project-settings.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$background$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/background/color.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$canvas$2f$sizes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/canvas/sizes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fps/defaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/scene-builder.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/canvas-renderer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$runner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/runner.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fonts$2f$google$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fonts/google-fonts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fps/utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
class ProjectManager {
    editor;
    active;
    savedProjects;
    isLoading;
    isInitialized;
    invalidProjectIds;
    storageMigrationPromise;
    listeners;
    migrationState;
    exportState;
    exportCancelRequested;
    constructor(editor){
        this.editor = editor;
        this.active = null;
        this.savedProjects = [];
        this.isLoading = true;
        this.isInitialized = false;
        this.invalidProjectIds = new Set();
        this.storageMigrationPromise = null;
        this.listeners = new Set();
        this.migrationState = {
            isMigrating: false,
            fromVersion: null,
            toVersion: null,
            projectName: null
        };
        this.exportState = {
            isExporting: false,
            progress: 0,
            result: null
        };
        this.exportCancelRequested = false;
    }
    async ensureStorageMigrations() {
        if (this.storageMigrationPromise) {
            await this.storageMigrationPromise;
            return;
        }
        this.storageMigrationPromise = (async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$runner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runStorageMigrations"])({
                migrations: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["migrations"],
                onProgress: (progress)=>{
                    this.migrationState = progress;
                    this.notify();
                }
            });
        })();
        await this.storageMigrationPromise;
    }
    async createNewProject({ name }) {
        const mainScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDefaultScene"])({
            name: "Main scene",
            isMain: true
        });
        const newProject = {
            metadata: {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])(),
                name,
                duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectDurationFromScenes"])({
                    scenes: [
                        mainScene
                    ]
                }),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            scenes: [
                mainScene
            ],
            currentSceneId: mainScene.id,
            settings: {
                fps: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_FPS"],
                canvasSize: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$canvas$2f$sizes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CANVAS_SIZE"],
                canvasSizeMode: "preset",
                lastCustomCanvasSize: null,
                originalCanvasSize: null,
                background: {
                    type: "color",
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$background$2f$color$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_BACKGROUND_COLOR"]
                }
            },
            version: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CURRENT_PROJECT_VERSION"]
        };
        this.active = newProject;
        this.notify();
        this.editor.media.clearAllAssets();
        this.editor.scenes.initializeScenes({
            scenes: newProject.scenes,
            currentSceneId: newProject.currentSceneId
        });
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveProject({
                project: newProject
            });
            this.updateMetadata(newProject);
            return newProject.metadata.id;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to save new project");
            throw error;
        }
    }
    async loadProject({ id }) {
        if (!this.isInitialized) {
            this.isLoading = true;
            this.notify();
        }
        this.editor.save.pause();
        await this.ensureStorageMigrations();
        this.editor.media.clearAllAssets();
        this.editor.scenes.clearScenes();
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].loadProject({
                id
            });
            if (!result) {
                throw new Error(`Project with id ${id} not found`);
            }
            const project = result.project;
            this.active = project;
            this.notify();
            if (project.scenes && project.scenes.length > 0) {
                this.editor.scenes.initializeScenes({
                    scenes: project.scenes,
                    currentSceneId: project.currentSceneId
                });
            }
            await this.editor.media.loadProjectMedia({
                projectId: id
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fonts$2f$google$2d$fonts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadFonts"])({
                families: [
                    ...new Set((project.scenes ?? []).flatMap((scene)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementFontFamilies"])({
                            tracks: scene.tracks
                        })))
                ]
            });
            if (!project.metadata.thumbnail) {
                try {
                    const didUpdateThumbnail = await this.updateThumbnailFromTimeline();
                    if (didUpdateThumbnail) {
                        await this.saveCurrentProject();
                    }
                } catch (error) {
                    console.error("Failed to generate project thumbnail:", error);
                }
            }
        } catch (error) {
            console.error("Failed to load project:", error);
            throw error;
        } finally{
            this.isLoading = false;
            this.notify();
            this.editor.save.resume();
        }
    }
    async saveCurrentProject() {
        if (!this.active) return;
        try {
            const scenes = this.editor.scenes.getScenes();
            const updatedProject = {
                ...this.active,
                scenes,
                metadata: {
                    ...this.active.metadata,
                    duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProjectDurationFromScenes"])({
                        scenes
                    }),
                    updatedAt: new Date()
                }
            };
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveProject({
                project: updatedProject
            });
            this.active = updatedProject;
            this.updateMetadata(updatedProject);
        } catch (error) {
            console.error("Failed to save project:", error);
        }
    }
    async export({ options }) {
        this.exportCancelRequested = false;
        this.exportState = {
            isExporting: true,
            progress: 0,
            result: null
        };
        this.notify();
        const result = await this.editor.renderer.exportProject({
            options,
            onProgress: ({ progress })=>{
                this.exportState = {
                    ...this.exportState,
                    progress
                };
                this.notify();
            },
            onCancel: ()=>this.exportCancelRequested
        });
        this.exportState = {
            isExporting: false,
            progress: this.exportState.progress,
            result
        };
        this.notify();
        return result;
    }
    cancelExport() {
        this.exportCancelRequested = true;
    }
    clearExportState() {
        this.exportState = {
            isExporting: false,
            progress: 0,
            result: null
        };
        this.notify();
    }
    getExportState() {
        return this.exportState;
    }
    async loadAllProjects() {
        if (!this.isInitialized) {
            this.isLoading = true;
            this.notify();
        }
        try {
            await this.ensureStorageMigrations();
            try {
                const metadata = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].loadAllProjectsMetadata();
                this.savedProjects = metadata;
                this.notify();
            } catch (error) {
                console.error("Failed to load projects:", error);
            } finally{
                this.isLoading = false;
                this.isInitialized = true;
                this.notify();
            }
        } catch (error) {
            console.error("Failed to run migrations:", error);
            this.isLoading = false;
            this.isInitialized = true;
            this.notify();
        }
    }
    async deleteProjects({ ids }) {
        const uniqueIds = Array.from(new Set(ids));
        if (uniqueIds.length === 0) return;
        try {
            await Promise.all(uniqueIds.map((id)=>Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].deleteProjectMedia({
                        projectId: id
                    }),
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].deleteProject({
                        id
                    })
                ])));
            const idSet = new Set(uniqueIds);
            this.savedProjects = this.savedProjects.filter((project)=>!idSet.has(project.id));
            const shouldClearActive = this.active && idSet.has(this.active.metadata.id);
            if (shouldClearActive) {
                this.active = null;
                this.editor.media.clearAllAssets();
                this.editor.scenes.clearScenes();
            }
            this.notify();
        } catch (error) {
            console.error("Failed to delete projects:", error);
        }
    }
    closeProject() {
        this.active = null;
        this.notify();
        this.editor.media.clearAllAssets();
        this.editor.scenes.clearScenes();
    }
    async renameProject({ id, name }) {
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].loadProject({
                id
            });
            if (!result) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Project not found", {
                    description: "Please try again"
                });
                return;
            }
            const updatedProject = {
                ...result.project,
                metadata: {
                    ...result.project.metadata,
                    name,
                    updatedAt: new Date()
                }
            };
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveProject({
                project: updatedProject
            });
            if (this.active?.metadata.id === id) {
                this.active = updatedProject;
                this.notify();
            }
            this.updateMetadata(updatedProject);
        } catch (error) {
            console.error("Failed to rename project:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to rename project", {
                description: error instanceof Error ? error.message : "Please try again"
            });
        }
    }
    async duplicateProjects({ ids }) {
        const uniqueIds = Array.from(new Set(ids));
        if (uniqueIds.length === 0) return [];
        try {
            const getDuplicateBaseName = ({ name })=>{
                const match = name.match(/^\((\d+)\)\s+(.+)$/);
                const number = match ? Number.parseInt(match[1], 10) : null;
                const baseName = match ? match[2] : name;
                return {
                    baseName,
                    number
                };
            };
            const loadResults = await Promise.all(uniqueIds.map(async (projectId)=>{
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].loadProject({
                    id: projectId
                });
                return {
                    projectId,
                    project: result?.project ?? null
                };
            }));
            const missingProjectIds = loadResults.filter((result)=>!result.project).map((result)=>result.projectId);
            if (missingProjectIds.length > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(missingProjectIds.length === 1 ? "Project not found" : "Projects not found", {
                    description: missingProjectIds.length === 1 ? "Please try again" : "Some projects could not be found"
                });
                throw new Error(`Projects not found: ${missingProjectIds.join(", ")}`);
            }
            const projectsToDuplicate = loadResults.flatMap((result)=>result.project ? [
                    result.project
                ] : []);
            const maxNumberByBaseName = new Map();
            for (const project of this.savedProjects){
                const { baseName, number } = getDuplicateBaseName({
                    name: project.name
                });
                if (number === null) continue;
                const currentMax = maxNumberByBaseName.get(baseName);
                if (currentMax === undefined || number > currentMax) {
                    maxNumberByBaseName.set(baseName, number);
                }
            }
            const nextNumberByBaseName = new Map();
            for (const [baseName, maxNumber] of maxNumberByBaseName){
                nextNumberByBaseName.set(baseName, maxNumber + 1);
            }
            const duplicationPlans = projectsToDuplicate.map((project)=>{
                const { baseName } = getDuplicateBaseName({
                    name: project.metadata.name
                });
                const nextNumber = nextNumberByBaseName.get(baseName) ?? 1;
                nextNumberByBaseName.set(baseName, nextNumber + 1);
                const newProjectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])();
                const newProject = {
                    ...project,
                    metadata: {
                        ...project.metadata,
                        id: newProjectId,
                        name: `(${nextNumber}) ${baseName}`,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                };
                return {
                    newProjectId,
                    newProject,
                    sourceProjectId: project.metadata.id
                };
            });
            await Promise.all(duplicationPlans.map(({ newProject })=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveProject({
                    project: newProject
                })));
            await Promise.all(duplicationPlans.map(async ({ sourceProjectId, newProjectId })=>{
                const sourceMediaAssets = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].loadAllMediaAssets({
                    projectId: sourceProjectId
                });
                await Promise.all(sourceMediaAssets.map((mediaAsset)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveMediaAsset({
                        projectId: newProjectId,
                        mediaAsset
                    })));
            }));
            for (const { newProject } of duplicationPlans){
                this.updateMetadata(newProject);
            }
            return duplicationPlans.map((plan)=>plan.newProjectId);
        } catch (error) {
            console.error("Failed to duplicate projects:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to duplicate projects", {
                description: error instanceof Error ? error.message : "Please try again"
            });
            throw error;
        }
    }
    async updateSettings({ settings, pushHistory = true }) {
        if (!this.active) return;
        const command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateProjectSettingsCommand"](settings);
        if (pushHistory) {
            this.editor.command.execute({
                command
            });
            return;
        }
        command.execute();
    }
    ratchetFpsForImportedMedia({ importedAssets }) {
        if (!this.active) return null;
        const nextFps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRaisedProjectFpsForImportedMedia"])({
            currentFps: this.active.settings.fps,
            importedAssets
        });
        if (nextFps === null) return null;
        new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$project$2f$update$2d$project$2d$settings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UpdateProjectSettingsCommand"]({
            fps: nextFps
        }).execute();
        return nextFps;
    }
    async updateThumbnail({ thumbnail }) {
        if (!this.active) return;
        const updatedProject = {
            ...this.active,
            metadata: {
                ...this.active.metadata,
                thumbnail,
                updatedAt: new Date()
            }
        };
        this.active = updatedProject;
        this.notify();
        this.updateMetadata(updatedProject);
        this.editor.save.markDirty();
    }
    async prepareExit() {
        if (!this.active) return;
        try {
            const didUpdateThumbnail = await this.updateThumbnailFromTimeline();
            if (didUpdateThumbnail) {
                await this.editor.save.flush();
            }
        } catch (error) {
            console.error("Failed to generate project thumbnail on exit:", error);
        }
    }
    getFilteredAndSortedProjects({ searchQuery, sortOption }) {
        const filteredProjects = this.savedProjects.filter((project)=>project.name.toLowerCase().includes(searchQuery.toLowerCase()));
        const [key, order] = sortOption.split("-");
        const sortedProjects = [
            ...filteredProjects
        ].sort((a, b)=>{
            const aValue = a[key];
            const bValue = b[key];
            if (order === "asc") {
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            }
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
            return 0;
        });
        return sortedProjects;
    }
    isInvalidProjectId({ id }) {
        return this.invalidProjectIds.has(id);
    }
    markProjectIdAsInvalid({ id }) {
        this.invalidProjectIds.add(id);
        this.notify();
    }
    clearInvalidProjectIds() {
        this.invalidProjectIds.clear();
        this.notify();
    }
    getActive() {
        if (!this.active) {
            throw new Error("No active project");
        }
        return this.active;
    }
    /**
	 * for agents:
	 * in most cases, the project is guaranteed to be active, in which getActive() should be used instead.
	 * for very rare cases, this function may be used.
	 */ getActiveOrNull() {
        return this.active;
    }
    getTimelineViewState() {
        return this.active?.timelineViewState ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULTS"].timeline.viewState;
    }
    setTimelineViewState({ viewState }) {
        if (!this.active) return;
        this.active = {
            ...this.active,
            timelineViewState: viewState ?? undefined
        };
        this.editor.save.markDirty();
        this.notify();
    }
    getSavedProjects() {
        return this.savedProjects;
    }
    getIsLoading() {
        return this.isLoading;
    }
    getIsInitialized() {
        return this.isInitialized;
    }
    getMigrationState() {
        return this.migrationState;
    }
    setActiveProject({ project }) {
        this.active = project;
        this.notify();
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    async updateThumbnailFromTimeline() {
        if (!this.active) return false;
        const tracks = this.editor.scenes.getActiveScene().tracks;
        const mediaAssets = this.editor.media.getAssets();
        const duration = this.editor.timeline.getTotalDuration();
        const { canvasSize, background } = this.active.settings;
        const scene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildScene"])({
            tracks,
            mediaAssets,
            duration: duration || 1,
            canvasSize,
            background
        });
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasRenderer"]({
            width: canvasSize.width,
            height: canvasSize.height,
            fps: this.active.settings.fps
        });
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvasSize.width;
        tempCanvas.height = canvasSize.height;
        await renderer.renderToCanvas({
            node: scene,
            time: 0,
            targetCanvas: tempCanvas
        });
        const thumbnailDataUrl = tempCanvas.toDataURL("image/png");
        await this.updateThumbnail({
            thumbnail: thumbnailDataUrl
        });
        return true;
    }
    updateMetadata(project) {
        const index = this.savedProjects.findIndex((p)=>p.id === project.metadata.id);
        if (index !== -1) {
            this.savedProjects = this.savedProjects.with(index, project.metadata);
        } else {
            this.savedProjects = [
                project.metadata,
                ...this.savedProjects
            ];
        }
        this.notify();
    }
    notify() {
        this.listeners.forEach((fn)=>{
            fn();
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/media-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MediaManager",
    ()=>MediaManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/sonner@1.7.4+21ccd8898788a04d/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$video$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/video-cache/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/waveform-cache/service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$batch$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/batch-command.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/media/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class MediaManager {
    editor;
    assets;
    isLoading;
    listeners;
    constructor(editor){
        this.editor = editor;
        this.assets = [];
        this.isLoading = false;
        this.listeners = new Set();
    }
    async addMediaAsset({ projectId, asset }) {
        const newAsset = {
            ...asset,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateUUID"])()
        };
        this.assets = [
            ...this.assets,
            newAsset
        ];
        this.notify();
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].saveMediaAsset({
                projectId,
                mediaAsset: newAsset
            });
            this.editor.project.ratchetFpsForImportedMedia({
                importedAssets: [
                    newAsset
                ]
            });
            return newAsset;
        } catch (error) {
            console.error("Failed to save media asset:", error);
            this.assets = this.assets.filter((asset)=>asset.id !== newAsset.id);
            this.notify();
            if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].isQuotaExceededError({
                error
            })) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Not enough browser storage", {
                    description: error instanceof Error ? error.message : undefined
                });
            }
            return null;
        }
    }
    removeMediaAsset({ projectId, id }) {
        this.removeMediaAssets({
            projectId,
            ids: [
                id
            ]
        });
    }
    removeMediaAssets({ projectId, ids }) {
        const uniqueIds = [
            ...new Set(ids)
        ];
        if (uniqueIds.length === 0) {
            return;
        }
        const command = uniqueIds.length === 1 ? new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveMediaAssetCommand"]({
            projectId,
            assetId: uniqueIds[0]
        }) : new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$batch$2d$command$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BatchCommand"](uniqueIds.map((id)=>new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$media$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveMediaAssetCommand"]({
                projectId,
                assetId: id
            })));
        this.editor.command.execute({
            command
        });
    }
    async loadProjectMedia({ projectId }) {
        this.isLoading = true;
        this.notify();
        try {
            const mediaAssets = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].loadAllMediaAssets({
                projectId
            });
            this.assets = mediaAssets;
            this.notify();
        } catch (error) {
            console.error("Failed to load media assets:", error);
        } finally{
            this.isLoading = false;
            this.notify();
        }
    }
    async clearProjectMedia({ projectId }) {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waveformCache"].clearAll();
        this.assets.forEach((asset)=>{
            if (asset.url) {
                URL.revokeObjectURL(asset.url);
            }
            if (asset.thumbnailUrl) {
                URL.revokeObjectURL(asset.thumbnailUrl);
            }
        });
        const mediaIds = this.assets.map((asset)=>asset.id);
        this.assets = [];
        this.notify();
        try {
            await Promise.all(mediaIds.map((id)=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storageService"].deleteMediaAsset({
                    projectId,
                    id
                })));
        } catch (error) {
            console.error("Failed to clear media assets from storage:", error);
        }
    }
    clearAllAssets() {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$video$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["videoCache"].clearAll();
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$waveform$2d$cache$2f$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["waveformCache"].clearAll();
        this.assets.forEach((asset)=>{
            if (asset.url) {
                URL.revokeObjectURL(asset.url);
            }
            if (asset.thumbnailUrl) {
                URL.revokeObjectURL(asset.thumbnailUrl);
            }
        });
        this.assets = [];
        this.notify();
    }
    getAssets() {
        return this.assets;
    }
    setAssets({ assets }) {
        this.assets = assets;
        this.notify();
    }
    isLoadingMedia() {
        return this.isLoading;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((fn)=>{
            fn();
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/renderer-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "RendererManager",
    ()=>RendererManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/canvas-renderer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$exporter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/scene-exporter.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/scene-builder.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/audio.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm_bg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$browser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/browser.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$exporter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$exporter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class RendererManager {
    editor;
    renderTree;
    _isDegraded;
    listeners;
    constructor(editor){
        this.editor = editor;
        this.renderTree = null;
        this._isDegraded = false;
        this.listeners = new Set();
    }
    get isDegraded() {
        return this._isDegraded;
    }
    setDegraded(degraded) {
        if (this._isDegraded === degraded) return;
        this._isDegraded = degraded;
        this.notify();
    }
    setRenderTree({ renderTree }) {
        this.renderTree = renderTree;
        this.notify();
    }
    getRenderTree() {
        return this.renderTree;
    }
    async saveSnapshot() {
        const snapshot = await this.createSnapshot();
        if (!snapshot.success) {
            return snapshot;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$browser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["downloadBlob"])({
            blob: snapshot.blob,
            filename: snapshot.filename
        });
        return {
            success: true
        };
    }
    async copySnapshot() {
        if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) {
            return {
                success: false,
                error: "Clipboard image copy is not supported in this browser"
            };
        }
        const snapshot = await this.createSnapshot();
        if (!snapshot.success) {
            return snapshot;
        }
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [snapshot.blob.type || "image/png"]: snapshot.blob
                })
            ]);
            return {
                success: true
            };
        } catch (error) {
            console.error("Copy snapshot failed:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }
    async createSnapshot() {
        try {
            const renderTree = this.getRenderTree();
            const activeProject = this.editor.project.getActive();
            if (!renderTree || !activeProject) {
                return {
                    success: false,
                    error: "No project or scene to capture"
                };
            }
            const duration = this.editor.timeline.getTotalDuration();
            if (duration === 0) {
                return {
                    success: false,
                    error: "Project is empty"
                };
            }
            const { canvasSize, fps } = activeProject.settings;
            const renderTime = Math.min(this.editor.playback.getCurrentTime(), this.editor.timeline.getLastFrameTime());
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasRenderer"]({
                width: canvasSize.width,
                height: canvasSize.height,
                fps
            });
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = canvasSize.width;
            tempCanvas.height = canvasSize.height;
            await renderer.renderToCanvas({
                node: renderTree,
                time: renderTime,
                targetCanvas: tempCanvas
            });
            const blob = await new Promise((resolve)=>{
                tempCanvas.toBlob((result)=>resolve(result), "image/png");
            });
            if (!blob) {
                return {
                    success: false,
                    error: "Failed to create image"
                };
            }
            const timecode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTimecode"])({
                time: renderTime,
                rate: fps
            }).replace(/:/g, "-");
            const safeName = activeProject.metadata.name.replace(/[<>:"/\\|?*]/g, "-").trim() || "snapshot";
            const filename = `${safeName}-${timecode}.png`;
            return {
                success: true,
                blob,
                filename
            };
        } catch (error) {
            console.error("Snapshot capture failed:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }
    async exportProject({ options, onProgress, onCancel }) {
        const { format, quality, fps, includeAudio } = options;
        try {
            const tracks = this.editor.scenes.getActiveScene().tracks;
            const mediaAssets = this.editor.media.getAssets();
            const activeProject = this.editor.project.getActive();
            if (!activeProject) {
                return {
                    success: false,
                    error: "No active project"
                };
            }
            const duration = this.editor.timeline.getTotalDuration();
            if (duration === 0) {
                return {
                    success: false,
                    error: "Project is empty"
                };
            }
            const exportFps = fps ?? activeProject.settings.fps;
            const canvasSize = activeProject.settings.canvasSize;
            let audioBuffer = null;
            if (includeAudio) {
                onProgress?.({
                    progress: 0.05
                });
                audioBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTimelineAudioBuffer"])({
                    tracks,
                    mediaAssets,
                    duration
                });
            }
            const scene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildScene"])({
                tracks,
                mediaAssets,
                duration,
                canvasSize,
                background: activeProject.settings.background
            });
            const exporter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$exporter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SceneExporter"]({
                width: canvasSize.width,
                height: canvasSize.height,
                fps: exportFps,
                format,
                quality,
                shouldIncludeAudio: !!includeAudio,
                audioBuffer: audioBuffer || undefined
            });
            exporter.on("progress", (progress)=>{
                const adjustedProgress = includeAudio ? 0.05 + progress * 0.95 : progress;
                onProgress?.({
                    progress: adjustedProgress
                });
            });
            let cancelled = false;
            const checkCancel = ()=>{
                if (onCancel?.()) {
                    cancelled = true;
                    exporter.cancel();
                }
            };
            const cancelInterval = setInterval(checkCancel, 100);
            try {
                const buffer = await exporter.export({
                    rootNode: scene
                });
                clearInterval(cancelInterval);
                if (cancelled) {
                    return {
                        success: false,
                        cancelled: true
                    };
                }
                if (!buffer) {
                    return {
                        success: false,
                        error: "Export failed to produce buffer"
                    };
                }
                return {
                    success: true,
                    buffer
                };
            } finally{
                clearInterval(cancelInterval);
            }
        } catch (error) {
            console.error("Export failed:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown export error"
            };
        }
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((fn)=>{
            fn();
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/commands.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandManager",
    ()=>CommandManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/ripple/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/ripple/apply.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/ripple/diff.ts [app-ssr] (ecmascript)");
;
class CommandManager {
    editor;
    isRippleEnabled;
    history;
    redoStack;
    reactors;
    constructor(editor){
        this.editor = editor;
        this.isRippleEnabled = false;
        this.history = [];
        this.redoStack = [];
        this.reactors = [];
    }
    execute({ command }) {
        const beforeTracks = this.isRippleEnabled ? this.editor.scenes.getActiveSceneOrNull()?.tracks ?? null : null;
        const previousSelection = this.getSelectionSnapshot();
        const result = command.execute();
        this.applyRippleIfEnabled({
            beforeTracks
        });
        const selectionOverride = this.applySelectionOverride(result);
        this.runReactors();
        this.history.push({
            command,
            previousSelection,
            selectionOverride
        });
        this.redoStack = [];
        return command;
    }
    push({ command }) {
        this.history.push({
            command,
            previousSelection: this.getSelectionSnapshot()
        });
        this.redoStack = [];
    }
    registerReactor(reactor) {
        this.reactors.push(reactor);
    }
    undo() {
        if (this.history.length === 0) return;
        const entry = this.history.pop();
        entry?.command.undo();
        if (entry) {
            // Only restore selection for commands that explicitly changed it.
            // Commands without selection intent leave selection untouched,
            // preserving any UI-driven selection changes (clicks, box select)
            // that happened between commands. Commands that remove editor-owned
            // selection targets must declare a selection override to clear stale refs.
            if (entry.selectionOverride !== undefined) {
                this.editor.selection.restoreSnapshot({
                    snapshot: entry.previousSelection
                });
            }
            this.redoStack.push(entry);
        }
    }
    redo() {
        if (this.redoStack.length === 0) return;
        const entry = this.redoStack.pop();
        if (!entry) {
            return;
        }
        const beforeTracks = this.isRippleEnabled ? this.editor.scenes.getActiveSceneOrNull()?.tracks ?? null : null;
        const previousSelection = this.getSelectionSnapshot();
        const result = entry.command.redo();
        this.applyRippleIfEnabled({
            beforeTracks
        });
        const selectionOverride = this.applySelectionOverride(result);
        this.runReactors();
        this.history.push({
            command: entry.command,
            previousSelection,
            selectionOverride
        });
    }
    canUndo() {
        return this.history.length > 0;
    }
    canRedo() {
        return this.redoStack.length > 0;
    }
    clear() {
        this.history = [];
        this.redoStack = [];
    }
    getSelectionSnapshot() {
        return this.editor.selection.getSnapshot();
    }
    applySelectionOverride(result) {
        if (!result?.selection) {
            return undefined;
        }
        return this.editor.selection.applySelectionPatch({
            patch: result.selection
        });
    }
    runReactors() {
        for (const reactor of this.reactors){
            reactor();
        }
    }
    applyRippleIfEnabled({ beforeTracks }) {
        if (!this.isRippleEnabled || !beforeTracks) {
            return;
        }
        const afterTracks = this.editor.scenes.getActiveSceneOrNull()?.tracks;
        if (!afterTracks) {
            return;
        }
        const adjustments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$diff$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeRippleAdjustments"])({
            beforeTracks,
            afterTracks
        });
        if (adjustments.length === 0) {
            return;
        }
        const tracksWithRipple = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$apply$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyRippleAdjustments"])({
            tracks: afterTracks,
            adjustments
        });
        this.editor.timeline.updateTracks(tracksWithRipple);
    }
}
}),
"[project]/apps/web/src/core/managers/save-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SaveManager",
    ()=>SaveManager
]);
class SaveManager {
    debounceMs;
    isPaused = false;
    isSaving = false;
    hasPendingSave = false;
    saveTimer = null;
    unsubscribeHandlers = [];
    constructor({ editor, debounceMs = 800 }){
        this.editor = editor;
        this.debounceMs = debounceMs;
    }
    editor;
    start() {
        if (this.unsubscribeHandlers.length > 0) return;
        this.unsubscribeHandlers = [
            this.editor.scenes.subscribe(()=>{
                this.markDirty();
            }),
            this.editor.timeline.subscribe(()=>{
                this.markDirty();
            })
        ];
    }
    stop() {
        for (const unsubscribe of this.unsubscribeHandlers){
            unsubscribe();
        }
        this.unsubscribeHandlers = [];
        this.clearTimer();
    }
    pause() {
        this.isPaused = true;
    }
    resume() {
        this.isPaused = false;
        if (this.hasPendingSave) {
            this.queueSave();
        }
    }
    markDirty({ force = false } = {}) {
        if (this.isPaused && !force) return;
        this.hasPendingSave = true;
        this.queueSave();
    }
    async flush() {
        this.hasPendingSave = true;
        await this.saveNow();
    }
    getIsDirty() {
        return this.hasPendingSave || this.isSaving;
    }
    queueSave() {
        if (this.isSaving) return;
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
        }
        this.saveTimer = setTimeout(()=>{
            void this.saveNow();
        }, this.debounceMs);
    }
    async saveNow() {
        if (this.isSaving) return;
        if (!this.hasPendingSave) return;
        const activeProject = this.editor.project.getActive();
        if (!activeProject) return;
        if (this.editor.project.getIsLoading()) return;
        if (this.editor.project.getMigrationState().isMigrating) return;
        this.isSaving = true;
        this.hasPendingSave = false;
        this.clearTimer();
        try {
            await this.editor.project.saveCurrentProject();
        } finally{
            this.isSaving = false;
            if (this.hasPendingSave) {
                this.queueSave();
            }
        }
    }
    clearTimer() {
        if (!this.saveTimer) return;
        clearTimeout(this.saveTimer);
        this.saveTimer = null;
    }
}
}),
"[project]/apps/web/src/core/managers/audio-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AudioManager",
    ()=>AudioManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/rate.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/audio.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-state.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2d$mastering$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/audio-mastering.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/retime/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$audio$2d$stretch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/audio-stretch.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2d$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/input-format.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$sink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/media-sink.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$source$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/source.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/input.js [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
class AudioManager {
    editor;
    audioContext;
    masterGain;
    playbackStartTime;
    playbackStartContextTime;
    scheduleTimer;
    lookaheadSeconds;
    scheduleIntervalMs;
    clips;
    sinks;
    inputs;
    activeClipIds;
    clipIterators;
    queuedSources;
    preparedClipBuffers;
    decodedBuffers;
    playbackSessionId;
    lastIsPlaying;
    lastVolume;
    playbackLatencyCompensationSeconds;
    unsubscribers;
    constructor(editor){
        this.editor = editor;
        this.audioContext = null;
        this.masterGain = null;
        this.playbackStartTime = 0;
        this.playbackStartContextTime = 0;
        this.scheduleTimer = null;
        this.lookaheadSeconds = 2;
        this.scheduleIntervalMs = 500;
        this.clips = [];
        this.sinks = new Map();
        this.inputs = new Map();
        this.activeClipIds = new Set();
        this.clipIterators = new Map();
        this.queuedSources = new Set();
        this.preparedClipBuffers = new Map();
        this.decodedBuffers = new Map();
        this.playbackSessionId = 0;
        this.lastIsPlaying = false;
        this.lastVolume = 1;
        this.playbackLatencyCompensationSeconds = 0;
        this.unsubscribers = [];
        this.handlePlaybackChange = ()=>{
            const isPlaying = this.editor.playback.getIsPlaying();
            const volume = this.editor.playback.getVolume();
            if (volume !== this.lastVolume) {
                this.lastVolume = volume;
                this.updateGain();
            }
            if (isPlaying !== this.lastIsPlaying) {
                this.lastIsPlaying = isPlaying;
                if (isPlaying) {
                    void this.startPlayback({
                        time: this.editor.playback.getCurrentTime() / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"]
                    });
                } else {
                    this.stopPlayback();
                }
            }
        };
        this.handleSeek = (time)=>{
            if (this.editor.playback.getIsScrubbing()) {
                this.stopPlayback();
                return;
            }
            if (this.editor.playback.getIsPlaying()) {
                void this.startPlayback({
                    time: time / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"]
                });
                return;
            }
            this.stopPlayback();
        };
        this.handleTimelineChange = ()=>{
            this.disposeSinks();
            this.preparedClipBuffers.clear();
            this.decodedBuffers.clear();
            if (!this.editor.playback.getIsPlaying()) return;
            void this.startPlayback({
                time: this.editor.playback.getCurrentTime() / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"]
            });
        };
        this.lastVolume = this.editor.playback.getVolume();
        this.unsubscribers.push(this.editor.playback.subscribe(this.handlePlaybackChange), this.editor.timeline.subscribe(this.handleTimelineChange), this.editor.media.subscribe(this.handleTimelineChange), this.editor.playback.onSeek(this.handleSeek));
    }
    dispose() {
        this.stopPlayback();
        for (const unsub of this.unsubscribers){
            unsub();
        }
        this.unsubscribers = [];
        this.disposeSinks();
        this.preparedClipBuffers.clear();
        this.decodedBuffers.clear();
        if (this.audioContext) {
            void this.audioContext.close();
            this.audioContext = null;
            this.masterGain = null;
        }
    }
    handlePlaybackChange;
    handleSeek;
    handleTimelineChange;
    ensureAudioContext() {
        if (this.audioContext) return this.audioContext;
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
        const input = undefined;
    }
    updateGain() {
        if (!this.masterGain) return;
        this.masterGain.gain.value = this.lastVolume;
    }
    getPlaybackTime() {
        if (!this.audioContext) return this.playbackStartTime;
        const elapsed = this.audioContext.currentTime - this.playbackStartContextTime;
        return this.playbackStartTime + elapsed;
    }
    async startPlayback({ time }) {
        const audioContext = this.ensureAudioContext();
        if (!audioContext) return;
        this.stopPlayback();
        this.playbackSessionId++;
        this.playbackLatencyCompensationSeconds = 0;
        const tracks = this.editor.scenes.getActiveScene().tracks;
        const mediaAssets = this.editor.media.getAssets();
        const duration = this.editor.timeline.getTotalDuration();
        if (duration <= 0) return;
        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }
        this.clips = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collectAudioClips"])({
            tracks,
            mediaAssets
        });
        if (!this.editor.playback.getIsPlaying()) return;
        this.playbackStartTime = time;
        this.playbackStartContextTime = audioContext.currentTime;
        this.scheduleUpcomingClips();
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    scheduleUpcomingClips() {
        if (!this.editor.playback.getIsPlaying()) return;
        const currentTime = this.getPlaybackTime();
        const windowEnd = currentTime + this.lookaheadSeconds;
        for (const clip of this.clips){
            if (clip.muted) continue;
            if (this.activeClipIds.has(clip.id)) continue;
            const clipEnd = clip.startTime + clip.duration;
            if (clipEnd <= currentTime) continue;
            if (clip.startTime > windowEnd) continue;
            this.activeClipIds.add(clip.id);
            if (this.shouldUsePreparedClipBuffer({
                clip
            })) {
                void this.schedulePreparedClip({
                    clip,
                    startTime: currentTime,
                    sessionId: this.playbackSessionId
                });
            } else {
                void this.runClipIterator({
                    clip,
                    startTime: currentTime,
                    sessionId: this.playbackSessionId
                });
            }
        }
    }
    stopPlayback() {
        if (this.scheduleTimer && ("TURBOPACK compile-time value", "undefined") !== "undefined") //TURBOPACK unreachable
        ;
        this.scheduleTimer = null;
        for (const iterator of this.clipIterators.values()){
            void iterator.return();
        }
        this.clipIterators.clear();
        this.activeClipIds.clear();
        for (const source of this.queuedSources){
            try {
                source.stop();
            } catch  {}
            source.disconnect();
        }
        this.queuedSources.clear();
    }
    async runClipIterator({ clip, startTime, sessionId }) {
        const audioContext = this.ensureAudioContext();
        if (!audioContext) return;
        const sink = await this.getAudioSink({
            clip
        });
        if (!sink || !this.editor.playback.getIsPlaying()) return;
        if (sessionId !== this.playbackSessionId) return;
        const clipStart = clip.startTime;
        const clipEnd = clip.startTime + clip.duration;
        const playbackTimeAfterSinkReady = this.getPlaybackTime();
        const iteratorStartTime = Math.max(startTime, clipStart, playbackTimeAfterSinkReady);
        if (iteratorStartTime >= clipEnd) {
            return;
        }
        const sourceStartTime = clip.trimStart + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
            clipTime: iteratorStartTime - clip.startTime,
            retime: clip.retime
        });
        const iterator = sink.buffers(sourceStartTime);
        this.clipIterators.set(clip.id, iterator);
        let consecutiveDroppedBufferCount = 0;
        for await (const { buffer, timestamp } of iterator){
            if (!this.editor.playback.getIsPlaying()) return;
            if (sessionId !== this.playbackSessionId) return;
            const timelineTime = clip.startTime + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClipTimeAtSourceTime"])({
                sourceTime: timestamp - clip.trimStart,
                retime: clip.retime
            });
            if (timelineTime >= clipEnd) break;
            const node = audioContext.createBufferSource();
            node.buffer = buffer;
            if (clip.retime) {
                node.playbackRate.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clampRetimeRate"])({
                    rate: clip.retime.rate
                });
            }
            const clipGain = audioContext.createGain();
            clipGain.gain.value = clip.volume;
            node.connect(clipGain);
            clipGain.connect(this.masterGain ?? audioContext.destination);
            const startTimestamp = this.playbackStartContextTime + this.playbackLatencyCompensationSeconds + (timelineTime - this.playbackStartTime);
            if (startTimestamp >= audioContext.currentTime) {
                node.start(startTimestamp);
                consecutiveDroppedBufferCount = 0;
            } else {
                const offset = audioContext.currentTime - startTimestamp;
                if (offset < buffer.duration) {
                    node.start(audioContext.currentTime, offset);
                    consecutiveDroppedBufferCount = 0;
                } else {
                    consecutiveDroppedBufferCount += 1;
                    if (consecutiveDroppedBufferCount >= 5) {
                        const nextCompensationSeconds = Math.max(this.playbackLatencyCompensationSeconds, Math.min(0.25, offset + 0.01));
                        if (nextCompensationSeconds > this.playbackLatencyCompensationSeconds + 0.001) {
                            this.playbackLatencyCompensationSeconds = nextCompensationSeconds;
                        }
                        const resyncStartTime = this.getPlaybackTime();
                        this.clipIterators.delete(clip.id);
                        void this.runClipIterator({
                            clip,
                            startTime: resyncStartTime,
                            sessionId
                        });
                        return;
                    }
                    continue;
                }
            }
            this.queuedSources.add(node);
            node.addEventListener("ended", ()=>{
                node.disconnect();
                clipGain.disconnect();
                this.queuedSources.delete(node);
            });
            const aheadTime = timelineTime - this.getPlaybackTime();
            if (aheadTime >= 1) {
                await this.waitUntilCaughtUp({
                    timelineTime,
                    targetAhead: 1
                });
                if (sessionId !== this.playbackSessionId) return;
            }
        }
        this.clipIterators.delete(clip.id);
    // don't remove from activeClipIds - prevents scheduler from restarting this clip
    // the set is cleared on stopPlayback anyway
    }
    async schedulePreparedClip({ clip, startTime, sessionId }) {
        const audioContext = this.ensureAudioContext();
        if (!audioContext) return;
        const buffer = await this.getPreparedClipBuffer({
            clip
        });
        if (!buffer || !this.editor.playback.getIsPlaying()) return;
        if (sessionId !== this.playbackSessionId) return;
        const clipStart = clip.startTime;
        const clipEnd = clip.startTime + clip.duration;
        const playbackTimeAfterReady = this.getPlaybackTime();
        const effectiveStartTime = Math.max(startTime, clipStart, playbackTimeAfterReady);
        if (effectiveStartTime >= clipEnd) {
            return;
        }
        const node = audioContext.createBufferSource();
        node.buffer = buffer;
        const clipGain = audioContext.createGain();
        node.connect(clipGain);
        clipGain.connect(this.masterGain ?? audioContext.destination);
        const startTimestamp = this.playbackStartContextTime + this.playbackLatencyCompensationSeconds + (effectiveStartTime - this.playbackStartTime);
        const clipOffset = effectiveStartTime - clipStart;
        let actualStartTimestamp = startTimestamp;
        let actualClipOffset = clipOffset;
        if (startTimestamp >= audioContext.currentTime) {
            node.start(startTimestamp, clipOffset);
        } else {
            const lateOffset = audioContext.currentTime - startTimestamp;
            actualStartTimestamp = audioContext.currentTime;
            actualClipOffset = clipOffset + lateOffset;
            node.start(actualStartTimestamp, actualClipOffset);
        }
        this.scheduleClipGainAutomation({
            audioContext,
            clip,
            clipGain,
            startTimestamp: actualStartTimestamp,
            startLocalTime: actualClipOffset
        });
        this.queuedSources.add(node);
        node.addEventListener("ended", ()=>{
            node.disconnect();
            clipGain.disconnect();
            this.queuedSources.delete(node);
        });
    }
    waitUntilCaughtUp({ timelineTime, targetAhead }) {
        return new Promise((resolve)=>{
            const checkInterval = setInterval(()=>{
                if (!this.editor.playback.getIsPlaying()) {
                    clearInterval(checkInterval);
                    resolve();
                    return;
                }
                const playbackTime = this.getPlaybackTime();
                if (timelineTime - playbackTime < targetAhead) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }
    disposeSinks() {
        for (const iterator of this.clipIterators.values()){
            void iterator.return();
        }
        this.clipIterators.clear();
        this.activeClipIds.clear();
        for (const input of this.inputs.values()){
            input.dispose();
        }
        this.inputs.clear();
        this.sinks.clear();
    }
    shouldUsePreparedClipBuffer({ clip }) {
        return this.hasCurveRetime({
            clip
        }) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasAnimatedVolume"])({
            element: clip.timelineElement
        }) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shouldMaintainPitch"])({
            rate: clip.retime?.rate ?? 1,
            maintainPitch: clip.retime?.maintainPitch
        });
    }
    hasCurveRetime({ clip }) {
        const mode = clip.retime?.mode;
        return mode === "curve";
    }
    scheduleClipGainAutomation({ audioContext, clip, clipGain, startTimestamp, startLocalTime }) {
        clipGain.gain.cancelScheduledValues(startTimestamp);
        clipGain.gain.setValueAtTime(clip.volume, startTimestamp);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasAnimatedVolume"])({
            element: clip.timelineElement
        })) {
            return;
        }
        const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildAudioGainAutomation"])({
            element: clip.timelineElement,
            fromLocalTime: startLocalTime,
            toLocalTime: clip.duration
        });
        if (points.length === 0) {
            return;
        }
        clipGain.gain.setValueAtTime(points[0].gain, startTimestamp);
        for(let index = 1; index < points.length; index++){
            const point = points[index];
            const pointTimestamp = startTimestamp + (point.localTime - startLocalTime);
            if (pointTimestamp < audioContext.currentTime) {
                continue;
            }
            clipGain.gain.linearRampToValueAtTime(point.gain, pointTimestamp);
        }
    }
    buildPreparedClipCacheKey({ clip }) {
        return JSON.stringify({
            id: clip.id,
            sourceKey: clip.sourceKey,
            startTime: clip.startTime,
            duration: clip.duration,
            trimStart: clip.trimStart,
            trimEnd: clip.trimEnd,
            retime: clip.retime ?? null
        });
    }
    async getPreparedClipBuffer({ clip }) {
        const cacheKey = this.buildPreparedClipCacheKey({
            clip
        });
        const existing = this.preparedClipBuffers.get(cacheKey);
        if (existing) {
            return existing;
        }
        const promise = (async ()=>{
            const audioContext = this.ensureAudioContext();
            if (!audioContext) {
                return null;
            }
            const decodedBuffer = await this.getDecodedBuffer({
                clip
            });
            if (!decodedBuffer) {
                return null;
            }
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$audio$2d$stretch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderRetimedBuffer"])({
                audioContext,
                sourceBuffer: decodedBuffer,
                trimStart: clip.trimStart,
                clipDuration: clip.duration,
                retime: clip.retime,
                maintainPitch: clip.retime?.maintainPitch === true
            });
        })();
        this.preparedClipBuffers.set(cacheKey, promise);
        return promise;
    }
    async getDecodedBuffer({ clip }) {
        const existing = this.decodedBuffers.get(clip.sourceKey);
        if (existing) {
            return existing;
        }
        const promise = this.decodeClipBuffer({
            clip
        });
        this.decodedBuffers.set(clip.sourceKey, promise);
        return promise;
    }
    async decodeClipBuffer({ clip }) {
        const audioContext = this.ensureAudioContext();
        if (!audioContext) {
            return null;
        }
        const input = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"]({
            source: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$source$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlobSource"](clip.file),
            formats: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2d$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALL_FORMATS"]
        });
        try {
            const audioTrack = await input.getPrimaryAudioTrack();
            if (!audioTrack) {
                return null;
            }
            const sink = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$sink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioBufferSink"](audioTrack);
            const chunks = [];
            let totalSamples = 0;
            for await (const { buffer } of sink.buffers(0)){
                chunks.push(buffer);
                totalSamples += buffer.length;
            }
            if (chunks.length === 0) {
                return null;
            }
            const targetSampleRate = audioContext.sampleRate;
            const nativeSampleRate = chunks[0].sampleRate;
            const numChannels = Math.min(2, chunks[0].numberOfChannels);
            const nativeChannels = Array.from({
                length: numChannels
            }, ()=>new Float32Array(totalSamples));
            let offset = 0;
            for (const chunk of chunks){
                for(let channel = 0; channel < numChannels; channel++){
                    nativeChannels[channel].set(chunk.getChannelData(Math.min(channel, chunk.numberOfChannels - 1)), offset);
                }
                offset += chunk.length;
            }
            const outputSamples = Math.ceil(totalSamples * (targetSampleRate / nativeSampleRate));
            const offlineContext = new OfflineAudioContext(numChannels, outputSamples, targetSampleRate);
            const nativeBuffer = audioContext.createBuffer(numChannels, totalSamples, nativeSampleRate);
            for(let channel = 0; channel < numChannels; channel++){
                nativeBuffer.copyToChannel(nativeChannels[channel], channel);
            }
            const sourceNode = offlineContext.createBufferSource();
            sourceNode.buffer = nativeBuffer;
            sourceNode.connect(offlineContext.destination);
            sourceNode.start(0);
            return await offlineContext.startRendering();
        } catch (error) {
            console.warn("Failed to decode clip audio:", error);
            return null;
        } finally{
            input.dispose();
        }
    }
    async getAudioSink({ clip }) {
        const existingSink = this.sinks.get(clip.sourceKey);
        if (existingSink) return existingSink;
        try {
            const input = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"]({
                source: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$source$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlobSource"](clip.file),
                formats: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2d$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALL_FORMATS"]
            });
            const audioTrack = await input.getPrimaryAudioTrack();
            if (!audioTrack) {
                input.dispose();
                return null;
            }
            const sink = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$sink$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioBufferSink"](audioTrack);
            this.inputs.set(clip.sourceKey, input);
            this.sinks.set(clip.sourceKey, sink);
            return sink;
        } catch (error) {
            console.warn("Failed to initialize audio sink:", error);
            return null;
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/selection-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectionManager",
    ()=>SelectionManager
]);
class SelectionManager {
    selectedElements = [];
    selectedKeyframes = [];
    keyframeSelectionAnchor = null;
    selectedMaskPoints = null;
    listeners = new Set();
    constructor(editor){
        void editor;
    }
    getSelectedElements() {
        return this.selectedElements;
    }
    getSelectedKeyframes() {
        return this.selectedKeyframes;
    }
    getKeyframeSelectionAnchor() {
        return this.keyframeSelectionAnchor;
    }
    getSelectedMaskPointSelection() {
        return this.selectedMaskPoints;
    }
    getActiveSelectionKind() {
        if ((this.selectedMaskPoints?.pointIds.length ?? 0) > 0) {
            return "mask-points";
        }
        if (this.selectedKeyframes.length > 0) {
            return "keyframes";
        }
        if (this.selectedElements.length > 0) {
            return "elements";
        }
        return null;
    }
    getSnapshot() {
        return {
            selectedElements: [
                ...this.selectedElements
            ],
            selectedKeyframes: [
                ...this.selectedKeyframes
            ],
            keyframeSelectionAnchor: this.keyframeSelectionAnchor,
            selectedMaskPoints: this.selectedMaskPoints ? {
                ...this.selectedMaskPoints,
                pointIds: [
                    ...this.selectedMaskPoints.pointIds
                ]
            } : null
        };
    }
    setSelectedElements({ elements }) {
        this.selectedElements = elements;
        this.selectedKeyframes = [];
        this.keyframeSelectionAnchor = null;
        this.selectedMaskPoints = null;
        this.notify();
    }
    setSelectedKeyframes({ keyframes, anchorKeyframe }) {
        this.selectedKeyframes = keyframes;
        if (anchorKeyframe !== undefined) {
            this.keyframeSelectionAnchor = anchorKeyframe;
        } else if (keyframes.length === 0) {
            this.keyframeSelectionAnchor = null;
        }
        this.selectedMaskPoints = null;
        this.notify();
    }
    setSelectedMaskPoints({ selection }) {
        this.selectedMaskPoints = selection && selection.pointIds.length > 0 ? {
            ...selection,
            pointIds: [
                ...selection.pointIds
            ]
        } : null;
        this.selectedKeyframes = [];
        this.keyframeSelectionAnchor = null;
        this.notify();
    }
    clearSelection() {
        this.selectedElements = [];
        this.selectedKeyframes = [];
        this.keyframeSelectionAnchor = null;
        this.selectedMaskPoints = null;
        this.notify();
    }
    clearKeyframeSelection() {
        this.selectedKeyframes = [];
        this.keyframeSelectionAnchor = null;
        this.notify();
    }
    clearMaskPointSelection() {
        if (!this.selectedMaskPoints) {
            return;
        }
        this.selectedMaskPoints = null;
        this.notify();
    }
    clearMostSpecificSelection() {
        const activeSelectionKind = this.getActiveSelectionKind();
        if (activeSelectionKind === "mask-points") {
            this.clearMaskPointSelection();
            return true;
        }
        if (activeSelectionKind === "keyframes") {
            this.clearKeyframeSelection();
            return true;
        }
        if (activeSelectionKind === "elements") {
            this.setSelectedElements({
                elements: []
            });
            return true;
        }
        return false;
    }
    applySelectionPatch({ patch }) {
        if (patch.selectedElements !== undefined) {
            this.selectedElements = [
                ...patch.selectedElements
            ];
        }
        if (patch.selectedKeyframes !== undefined) {
            this.selectedKeyframes = [
                ...patch.selectedKeyframes
            ];
        }
        if (patch.keyframeSelectionAnchor !== undefined) {
            this.keyframeSelectionAnchor = patch.keyframeSelectionAnchor;
        }
        if (patch.selectedMaskPoints !== undefined) {
            this.selectedMaskPoints = patch.selectedMaskPoints ? {
                ...patch.selectedMaskPoints,
                pointIds: [
                    ...patch.selectedMaskPoints.pointIds
                ]
            } : null;
        }
        this.notify();
        return this.getSnapshot();
    }
    restoreSnapshot({ snapshot }) {
        this.selectedElements = [
            ...snapshot.selectedElements
        ];
        this.selectedKeyframes = [
            ...snapshot.selectedKeyframes
        ];
        this.keyframeSelectionAnchor = snapshot.keyframeSelectionAnchor;
        this.selectedMaskPoints = snapshot.selectedMaskPoints ? {
            ...snapshot.selectedMaskPoints,
            pointIds: [
                ...snapshot.selectedMaskPoints.pointIds
            ]
        } : null;
        this.notify();
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((fn)=>{
            fn();
        });
    }
}
}),
"[project]/apps/web/src/core/managers/clipboard-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ClipboardManager",
    ()=>ClipboardManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/clipboard/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/clipboard/handlers/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class ClipboardManager {
    editor;
    entry;
    listeners;
    constructor(editor){
        this.editor = editor;
        this.entry = null;
        this.listeners = new Set();
    }
    getEntry() {
        return this.entry;
    }
    hasEntry() {
        return this.entry !== null;
    }
    copy() {
        const entry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["copyClipboardEntry"])({
            context: this.getCopyContext()
        });
        if (!entry) {
            return false;
        }
        this.entry = entry;
        this.notify();
        return true;
    }
    paste({ time } = {}) {
        if (!this.entry) {
            return false;
        }
        const command = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildPasteClipboardCommand"])({
            entry: this.entry,
            context: this.getPasteContext({
                time
            })
        });
        if (!command) {
            return false;
        }
        this.editor.command.execute({
            command
        });
        return true;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    getCopyContext() {
        return {
            editor: this.editor,
            selectedElements: this.editor.selection.getSelectedElements(),
            selectedKeyframes: this.editor.selection.getSelectedKeyframes()
        };
    }
    getPasteContext({ time }) {
        return {
            editor: this.editor,
            selectedElements: this.editor.selection.getSelectedElements(),
            selectedKeyframes: this.editor.selection.getSelectedKeyframes(),
            time: time ?? this.editor.playback.getCurrentTime()
        };
    }
    notify() {
        this.listeners.forEach((listener)=>{
            listener();
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/core/managers/diagnostics-manager.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DiagnosticsManager",
    ()=>DiagnosticsManager
]);
class DiagnosticsManager {
    editor;
    registrations;
    listeners;
    constructor(editor){
        this.editor = editor;
        this.registrations = [];
        this.listeners = new Set();
    }
    register(registration) {
        this.registrations.push(registration);
        this.notify();
    }
    getActive(options) {
        const candidates = options?.scope !== undefined ? this.registrations.filter((r)=>r.scope === options.scope) : this.registrations;
        return candidates.filter((r)=>r.check(this.editor));
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    notify() {
        this.listeners.forEach((listener)=>{
            listener();
        });
    }
}
}),
"[project]/apps/web/src/core/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "EditorCore",
    ()=>EditorCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$playback$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/playback-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$timeline$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/timeline-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$scenes$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/scenes-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$project$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/project-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$media$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/media-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$renderer$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/renderer-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$commands$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/commands.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$save$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/save-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$audio$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/audio-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$selection$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/selection-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$clipboard$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/clipboard-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$diagnostics$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/managers/diagnostics-manager.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/effects/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/definitions/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/masks/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$transcription$2f$diagnostics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/transcription/diagnostics.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$playback$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$timeline$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$scenes$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$project$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$media$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$renderer$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$audio$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$clipboard$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$transcription$2f$diagnostics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$playback$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$timeline$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$scenes$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$project$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$media$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$renderer$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$audio$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$clipboard$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$transcription$2f$diagnostics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
class EditorCore {
    static instance = null;
    timeline;
    command;
    playback;
    scenes;
    project;
    media;
    renderer;
    save;
    audio;
    selection;
    clipboard;
    diagnostics;
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerDefaultEffects"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerDefaultMasks"])();
        this.command = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$commands$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandManager"](this);
        this.timeline = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$timeline$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TimelineManager"](this);
        this.playback = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$playback$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaybackManager"](this);
        this.scenes = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$scenes$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScenesManager"](this);
        this.project = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$project$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProjectManager"](this);
        this.media = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$media$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MediaManager"](this);
        this.renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$renderer$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RendererManager"](this);
        this.save = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$save$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SaveManager"]({
            editor: this
        });
        this.audio = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$audio$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AudioManager"](this);
        this.selection = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$selection$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectionManager"](this);
        this.clipboard = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$clipboard$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClipboardManager"](this);
        this.diagnostics = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$managers$2f$diagnostics$2d$manager$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DiagnosticsManager"](this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$transcription$2f$diagnostics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerTranscriptionDiagnostics"])({
            diagnostics: this.diagnostics
        });
        this.playback.bindTimelineScope();
        this.command.registerReactor(()=>{
            const activeScene = this.scenes.getActiveSceneOrNull();
            if (!activeScene) {
                return;
            }
            const tracks = activeScene.tracks;
            const prunedTracks = {
                ...tracks,
                overlay: tracks.overlay.filter((track)=>track.elements.length > 0),
                audio: tracks.audio.filter((track)=>track.elements.length > 0)
            };
            if (prunedTracks.overlay.length !== tracks.overlay.length || prunedTracks.audio.length !== tracks.audio.length) {
                this.timeline.updateTracks(prunedTracks);
            }
        });
        this.save.start();
    }
    static getInstance() {
        if (!EditorCore.instance) {
            EditorCore.instance = new EditorCore();
        }
        return EditorCore.instance;
    }
    static reset() {
        EditorCore.instance = null;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=apps_web_src_core_b177a6e8._.js.map