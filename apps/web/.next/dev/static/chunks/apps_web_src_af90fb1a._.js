(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/transcription/audio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_CHUNK_LENGTH_SECONDS",
    ()=>DEFAULT_CHUNK_LENGTH_SECONDS,
    "DEFAULT_STRIDE_SECONDS",
    ()=>DEFAULT_STRIDE_SECONDS,
    "DEFAULT_TRANSCRIPTION_SAMPLE_RATE",
    ()=>DEFAULT_TRANSCRIPTION_SAMPLE_RATE
]);
const DEFAULT_TRANSCRIPTION_SAMPLE_RATE = 16000;
const DEFAULT_CHUNK_LENGTH_SECONDS = 30;
const DEFAULT_STRIDE_SECONDS = 5;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/transcription/worker.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$huggingface$2b$transformers$40$3$2e$8$2e$1$2f$node_modules$2f40$huggingface$2f$transformers$2f$dist$2f$transformers$2e$web$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/@huggingface+transformers@3.8.1/node_modules/@huggingface/transformers/dist/transformers.web.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$transcription$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/transcription/audio.ts [app-client] (ecmascript)");
;
;
let transcriber = null;
let cancelled = false;
let lastReportedProgress = -1;
const fileBytes = new Map();
self.onmessage = async (event)=>{
    const message = event.data;
    switch(message.type){
        case "init":
            await handleInit({
                modelId: message.modelId
            });
            break;
        case "transcribe":
            await handleTranscribe({
                audio: message.audio,
                language: message.language
            });
            break;
        case "cancel":
            cancelled = true;
            self.postMessage({
                type: "cancelled"
            });
            break;
    }
};
async function handleInit({ modelId }) {
    lastReportedProgress = -1;
    fileBytes.clear();
    try {
        transcriber = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$huggingface$2b$transformers$40$3$2e$8$2e$1$2f$node_modules$2f40$huggingface$2f$transformers$2f$dist$2f$transformers$2e$web$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipeline"])("automatic-speech-recognition", modelId, {
            dtype: "q4",
            device: "auto",
            progress_callback: (progressInfo)=>{
                const file = progressInfo.file;
                if (!file) return;
                const loaded = progressInfo.loaded ?? 0;
                const total = progressInfo.total ?? 0;
                if (progressInfo.status === "progress" && total > 0) {
                    fileBytes.set(file, {
                        loaded,
                        total
                    });
                } else if (progressInfo.status === "done") {
                    const existing = fileBytes.get(file);
                    if (existing) {
                        fileBytes.set(file, {
                            loaded: existing.total,
                            total: existing.total
                        });
                    }
                }
                // sum all bytes
                let totalLoaded = 0;
                let totalSize = 0;
                for (const { loaded, total } of fileBytes.values()){
                    totalLoaded += loaded;
                    totalSize += total;
                }
                if (totalSize === 0) return;
                const overallProgress = totalLoaded / totalSize * 100;
                const roundedProgress = Math.floor(overallProgress);
                if (roundedProgress !== lastReportedProgress) {
                    lastReportedProgress = roundedProgress;
                    self.postMessage({
                        type: "init-progress",
                        progress: roundedProgress
                    });
                }
            }
        });
        self.postMessage({
            type: "init-complete"
        });
    } catch (error) {
        self.postMessage({
            type: "init-error",
            error: error instanceof Error ? error.message : "Failed to load model"
        });
    }
}
async function handleTranscribe({ audio, language }) {
    if (!transcriber) {
        self.postMessage({
            type: "transcribe-error",
            error: "Model not initialized"
        });
        return;
    }
    cancelled = false;
    try {
        const rawResult = await transcriber(audio, {
            chunk_length_s: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$transcription$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_LENGTH_SECONDS"],
            stride_length_s: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$transcription$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_STRIDE_SECONDS"],
            language: language === "auto" ? undefined : language,
            return_timestamps: true
        });
        if (cancelled) return;
        const result = Array.isArray(rawResult) ? rawResult[0] : rawResult;
        const segments = [];
        if (result.chunks) {
            for (const chunk of result.chunks){
                if (chunk.timestamp && chunk.timestamp.length >= 2) {
                    segments.push({
                        text: chunk.text,
                        start: chunk.timestamp[0] ?? 0,
                        end: chunk.timestamp[1] ?? chunk.timestamp[0] ?? 0
                    });
                }
            }
        }
        self.postMessage({
            type: "transcribe-complete",
            text: result.text,
            segments
        });
    } catch (error) {
        if (cancelled) return;
        self.postMessage({
            type: "transcribe-error",
            error: error instanceof Error ? error.message : "Transcription failed"
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_af90fb1a._.js.map