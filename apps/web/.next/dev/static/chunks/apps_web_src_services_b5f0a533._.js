(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/services/storage/indexeddb-adapter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IndexedDBAdapter",
    ()=>IndexedDBAdapter,
    "deleteDatabase",
    ()=>deleteDatabase
]);
class IndexedDBAdapter {
    dbName;
    storeName;
    version;
    constructor({ dbName, storeName, version = 1 }){
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
    }
    async getDB() {
        return new Promise((resolve, reject)=>{
            const request = indexedDB.open(this.dbName, this.version);
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve(request.result);
            request.onupgradeneeded = (event)=>{
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, {
                        keyPath: "id"
                    });
                }
            };
        });
    }
    async get(key) {
        const db = await this.getDB();
        const transaction = db.transaction([
            this.storeName
        ], "readonly");
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject)=>{
            const request = store.get(key);
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve(request.result || null);
        });
    }
    async set({ key, value }) {
        const db = await this.getDB();
        const transaction = db.transaction([
            this.storeName
        ], "readwrite");
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject)=>{
            const request = store.put({
                id: key,
                ...value
            });
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve();
        });
    }
    async remove(key) {
        const db = await this.getDB();
        const transaction = db.transaction([
            this.storeName
        ], "readwrite");
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject)=>{
            const request = store.delete(key);
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve();
        });
    }
    async list() {
        const db = await this.getDB();
        const transaction = db.transaction([
            this.storeName
        ], "readonly");
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject)=>{
            const request = store.getAllKeys();
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve(request.result);
        });
    }
    async getAll() {
        const db = await this.getDB();
        const transaction = db.transaction([
            this.storeName
        ], "readonly");
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject)=>{
            const request = store.getAll();
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve(request.result || []);
        });
    }
    async clear() {
        const db = await this.getDB();
        const transaction = db.transaction([
            this.storeName
        ], "readwrite");
        const store = transaction.objectStore(this.storeName);
        return new Promise((resolve, reject)=>{
            const request = store.clear();
            request.onerror = ()=>reject(request.error);
            request.onsuccess = ()=>resolve();
        });
    }
}
async function deleteDatabase({ dbName }) {
    return new Promise((resolve, reject)=>{
        const request = indexedDB.deleteDatabase(dbName);
        request.onsuccess = ()=>resolve();
        request.onerror = ()=>reject(request.error);
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/opfs-adapter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPFSAdapter",
    ()=>OPFSAdapter
]);
class OPFSAdapter {
    directoryName;
    constructor(directoryName = "media"){
        this.directoryName = directoryName;
    }
    async getDirectory() {
        const opfsRoot = await navigator.storage.getDirectory();
        return await opfsRoot.getDirectoryHandle(this.directoryName, {
            create: true
        });
    }
    async get(key) {
        try {
            const directory = await this.getDirectory();
            const fileHandle = await directory.getFileHandle(key);
            return await fileHandle.getFile();
        } catch (error) {
            if (error.name === "NotFoundError") {
                return null;
            }
            throw error;
        }
    }
    async set({ key, value: file }) {
        const directory = await this.getDirectory();
        const fileHandle = await directory.getFileHandle(key, {
            create: true
        });
        const writable = await fileHandle.createWritable();
        await writable.write(file);
        await writable.close();
    }
    async remove(key) {
        try {
            const directory = await this.getDirectory();
            await directory.removeEntry(key);
        } catch (error) {
            if (error.name !== "NotFoundError") {
                throw error;
            }
        }
    }
    async list() {
        const directory = await this.getDirectory();
        const keys = [];
        for await (const name of directory.keys()){
            keys.push(name);
        }
        return keys;
    }
    async clear() {
        const directory = await this.getDirectory();
        for await (const name of directory.keys()){
            await directory.removeEntry(name);
        }
    }
    // Helper method to check OPFS support
    static isSupported() {
        return "storage" in navigator && "getDirectory" in navigator.storage;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/quota.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STORAGE_HEADROOM_RESERVE_BYTES",
    ()=>STORAGE_HEADROOM_RESERVE_BYTES,
    "StorageQuotaExceededError",
    ()=>StorageQuotaExceededError,
    "evaluateStorageCapacity",
    ()=>evaluateStorageCapacity,
    "formatStorageBytes",
    ()=>formatStorageBytes,
    "isStorageQuotaExceededError",
    ()=>isStorageQuotaExceededError,
    "readStorageQuotaStatus",
    ()=>readStorageQuotaStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/math.ts [app-client] (ecmascript)");
;
const BYTE_UNITS = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB"
];
const STORAGE_HEADROOM_RESERVE_BYTES = 50 * 1024 * 1024;
function normalizeByteValue({ value }) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
        return null;
    }
    return value;
}
function formatStorageBytes({ bytes }) {
    if (!Number.isFinite(bytes) || bytes <= 0) {
        return "0 B";
    }
    let value = bytes;
    let unitIndex = 0;
    while(value >= 1024 && unitIndex < BYTE_UNITS.length - 1){
        value /= 1024;
        unitIndex += 1;
    }
    const precision = value >= 10 || unitIndex === 0 ? 0 : 1;
    return `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumberForDisplay"])({
        value,
        fractionDigits: precision
    })} ${BYTE_UNITS[unitIndex]}`;
}
async function readStorageQuotaStatus() {
    if (typeof navigator === "undefined" || !navigator.storage || typeof navigator.storage.estimate !== "function") {
        return {
            quotaBytes: null,
            usageBytes: null,
            headroomBytes: null,
            availableBytes: null
        };
    }
    const estimate = await navigator.storage.estimate();
    const quotaBytes = normalizeByteValue({
        value: estimate.quota
    });
    const usageBytes = normalizeByteValue({
        value: estimate.usage
    });
    if (quotaBytes === null || usageBytes === null) {
        return {
            quotaBytes,
            usageBytes,
            headroomBytes: null,
            availableBytes: null
        };
    }
    const headroomBytes = Math.max(quotaBytes - usageBytes, 0);
    const availableBytes = Math.max(headroomBytes - STORAGE_HEADROOM_RESERVE_BYTES, 0);
    return {
        quotaBytes,
        usageBytes,
        headroomBytes,
        availableBytes
    };
}
function evaluateStorageCapacity({ requiredBytes, quotaStatus }) {
    if (quotaStatus.availableBytes === null) {
        return {
            canStore: true,
            reason: "estimate-unavailable",
            availableBytes: null
        };
    }
    if (requiredBytes > quotaStatus.availableBytes) {
        return {
            canStore: false,
            reason: "insufficient-space",
            availableBytes: quotaStatus.availableBytes
        };
    }
    return {
        canStore: true,
        reason: "enough-space",
        availableBytes: quotaStatus.availableBytes
    };
}
class StorageQuotaExceededError extends Error {
    requiredBytes;
    constructor({ requiredBytes }){
        super(`Not enough browser storage to save a ${formatStorageBytes({
            bytes: requiredBytes
        })} file.`);
        this.name = "StorageQuotaExceededError";
        this.requiredBytes = requiredBytes;
    }
}
function isStorageQuotaExceededError({ error }) {
    if (error instanceof StorageQuotaExceededError) {
        return true;
    }
    if (!(error instanceof Error)) {
        return false;
    }
    return error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED" || error.message.toLowerCase().includes("quota");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorageMigration",
    ()=>StorageMigration
]);
class StorageMigration {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProjectId",
    ()=>getProjectId,
    "isRecord",
    ()=>isRecord
]);
function isRecord(value) {
    return typeof value === "object" && value !== null;
}
function getProjectId({ project }) {
    const idValue = project.id;
    if (typeof idValue === "string" && idValue.length > 0) {
        return idValue;
    }
    const metadataValue = project.metadata;
    if (!isRecord(metadataValue)) {
        return null;
    }
    const metadataId = metadataValue.id;
    if (typeof metadataId === "string" && metadataId.length > 0) {
        return metadataId;
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v0-to-v1.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV0ToV1",
    ()=>transformProjectV0ToV1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
;
function transformProjectV0ToV1({ project, options = {} }) {
    const { now = new Date() } = options;
    const scenesValue = project.scenes;
    if (Array.isArray(scenesValue) && scenesValue.length > 0) {
        return {
            project,
            skipped: true,
            reason: "already has scenes"
        };
    }
    const sceneId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])();
    const sceneCreatedAt = now.toISOString();
    const sceneUpdatedAt = now.toISOString();
    const mainScene = {
        id: sceneId,
        name: "Main scene",
        isMain: true,
        tracks: [],
        bookmarks: [],
        createdAt: sceneCreatedAt,
        updatedAt: sceneUpdatedAt
    };
    const updatedProject = {
        ...project,
        scenes: [
            mainScene
        ],
        currentSceneId: sceneId,
        version: 1
    };
    const updatedAt = now.toISOString();
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.metadata)) {
        updatedProject.metadata = {
            ...project.metadata,
            updatedAt
        };
    } else {
        updatedProject.updatedAt = updatedAt;
    }
    return {
        project: updatedProject,
        skipped: false
    };
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v0-to-v1.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V0toV1Migration",
    ()=>V0toV1Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v0$2d$to$2d$v1$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v0-to-v1.ts [app-client] (ecmascript) <locals>");
;
;
class V0toV1Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 0;
    to = 1;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v0$2d$to$2d$v1$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["transformProjectV0ToV1"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v1-to-v2.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV1ToV2",
    ()=>transformProjectV1ToV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
// Frozen snapshots of v2-era defaults. See ./README.md.
const DEFAULT_BACKGROUND_BLUR_INTENSITY = 10;
const DEFAULT_BACKGROUND_COLOR = "#000000";
const DEFAULT_CANVAS_SIZE = {
    width: 1920,
    height: 1080
};
const DEFAULT_FPS = 30;
const EMPTY_V1_TO_V2_CONTEXT = {
    legacyTracksBySceneId: {},
    mediaTypesById: {}
};
function transformProjectV1ToV2({ project, context = EMPTY_V1_TO_V2_CONTEXT }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV2Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v2"
        };
    }
    const migratedProject = migrateProject({
        project,
        projectId,
        context
    });
    return {
        project: migratedProject,
        skipped: false
    };
}
function migrateProject({ project, projectId, context }) {
    const createdAt = normalizeDateString({
        value: project.createdAt
    });
    const updatedAt = normalizeDateString({
        value: project.updatedAt
    });
    const metadataValue = project.metadata;
    const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(metadataValue) ? {
        id: getStringValue({
            value: metadataValue.id,
            fallback: projectId
        }),
        name: getStringValue({
            value: metadataValue.name,
            fallback: ""
        }),
        thumbnail: getStringValue({
            value: metadataValue.thumbnail
        }),
        createdAt: normalizeDateString({
            value: metadataValue.createdAt
        }),
        updatedAt: normalizeDateString({
            value: metadataValue.updatedAt
        })
    } : {
        id: projectId,
        name: getStringValue({
            value: project.name,
            fallback: ""
        }),
        thumbnail: getStringValue({
            value: project.thumbnail
        }),
        createdAt,
        updatedAt
    };
    const scenesValue = project.scenes;
    const scenes = Array.isArray(scenesValue) ? scenesValue : [];
    const legacyBookmarks = Array.isArray(project.bookmarks) ? project.bookmarks : null;
    const migratedScenes = scenes.map((scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            return scene;
        }
        const sceneId = getStringValue({
            value: scene.id
        });
        if (!sceneId) {
            return scene;
        }
        const existingTracks = scene.tracks;
        const shouldLoadTracks = !Array.isArray(existingTracks) || existingTracks.length === 0;
        if (!shouldLoadTracks) {
            return scene;
        }
        const tracks = context.legacyTracksBySceneId[sceneId] ?? [];
        const transformedTracks = transformTracks({
            tracks,
            context
        });
        return {
            ...scene,
            tracks: transformedTracks
        };
    });
    const normalizedScenes = applyLegacyBookmarks({
        scenes: migratedScenes,
        legacyBookmarks
    });
    const settingsValue = project.settings;
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(settingsValue) ? {
        fps: getNumberValue({
            value: settingsValue.fps,
            fallback: DEFAULT_FPS
        }),
        canvasSize: getCanvasSizeValue({
            value: settingsValue.canvasSize,
            fallback: DEFAULT_CANVAS_SIZE
        }),
        background: getBackgroundValue({
            value: settingsValue.background
        }),
        originalCanvasSize: null
    } : {
        fps: getNumberValue({
            value: project.fps,
            fallback: DEFAULT_FPS
        }),
        canvasSize: getCanvasSizeValue({
            value: project.canvasSize,
            fallback: DEFAULT_CANVAS_SIZE
        }),
        background: getBackgroundValue({
            value: project.background,
            backgroundType: project.backgroundType,
            backgroundColor: project.backgroundColor,
            blurIntensity: project.blurIntensity
        }),
        originalCanvasSize: null
    };
    const currentSceneId = getCurrentSceneId({
        value: project.currentSceneId,
        scenes: normalizedScenes
    });
    return {
        ...project,
        metadata,
        scenes: normalizedScenes,
        currentSceneId,
        settings,
        version: 2
    };
}
function transformTracks({ tracks, context }) {
    if (!Array.isArray(tracks)) {
        return [];
    }
    let isFirstVideoTrackFound = false;
    const transformedTracks = tracks.map((track)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
            return null;
        }
        const trackType = track.type;
        if (trackType === "media") {
            const isMain = !isFirstVideoTrackFound;
            isFirstVideoTrackFound = true;
            const videoTrack = transformMediaTrack({
                track,
                context,
                isMain
            });
            return videoTrack;
        }
        if (trackType === "text") {
            return transformTextTrack({
                track
            });
        }
        if (trackType === "audio") {
            return transformAudioTrack({
                track
            });
        }
        return null;
    });
    return transformedTracks.filter((track)=>track !== null);
}
function transformMediaTrack({ track, context, isMain }) {
    const elements = Array.isArray(track.elements) ? track.elements : [];
    const transformedElements = elements.map((element)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || element.type !== "media") {
            return null;
        }
        const mediaId = getStringValue({
            value: element.mediaId
        });
        if (!mediaId) {
            return null;
        }
        let mediaType = "video";
        const storedMediaType = context.mediaTypesById[mediaId];
        if (storedMediaType) {
            mediaType = storedMediaType === "image" ? "image" : "video";
        }
        const defaultTransform = {
            scale: 1,
            position: {
                x: 0,
                y: 0
            },
            rotate: 0
        };
        const muted = element.muted === true;
        if (mediaType === "image") {
            const imageElement = {
                id: getStringValue({
                    value: element.id,
                    fallback: ""
                }),
                name: getStringValue({
                    value: element.name,
                    fallback: ""
                }),
                type: "image",
                mediaId,
                duration: getNumberValue({
                    value: element.duration,
                    fallback: 0
                }),
                startTime: getNumberValue({
                    value: element.startTime,
                    fallback: 0
                }),
                trimStart: getNumberValue({
                    value: element.trimStart,
                    fallback: 0
                }),
                trimEnd: getNumberValue({
                    value: element.trimEnd,
                    fallback: 0
                }),
                hidden: false,
                transform: defaultTransform,
                opacity: 1
            };
            return imageElement;
        }
        const videoElement = {
            id: getStringValue({
                value: element.id,
                fallback: ""
            }),
            name: getStringValue({
                value: element.name,
                fallback: ""
            }),
            type: "video",
            mediaId,
            muted,
            hidden: false,
            transform: defaultTransform,
            opacity: 1,
            duration: getNumberValue({
                value: element.duration,
                fallback: 0
            }),
            startTime: getNumberValue({
                value: element.startTime,
                fallback: 0
            }),
            trimStart: getNumberValue({
                value: element.trimStart,
                fallback: 0
            }),
            trimEnd: getNumberValue({
                value: element.trimEnd,
                fallback: 0
            })
        };
        return videoElement;
    });
    const validElements = transformedElements.filter((element)=>element !== null);
    return {
        id: getStringValue({
            value: track.id,
            fallback: ""
        }),
        name: getStringValue({
            value: track.name,
            fallback: ""
        }),
        type: "video",
        elements: validElements,
        isMain,
        muted: false,
        hidden: false
    };
}
function transformTextTrack({ track }) {
    const elements = Array.isArray(track.elements) ? track.elements : [];
    const transformedElements = elements.map((element)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || element.type !== "text") {
            return null;
        }
        const x = getNumberValue({
            value: element.x,
            fallback: 0
        });
        const y = getNumberValue({
            value: element.y,
            fallback: 0
        });
        const rotation = getNumberValue({
            value: element.rotation,
            fallback: 0
        });
        const opacity = getNumberValue({
            value: element.opacity,
            fallback: 1
        });
        const transform = {
            scale: 1,
            position: {
                x,
                y
            },
            rotate: rotation
        };
        return {
            id: getStringValue({
                value: element.id,
                fallback: ""
            }),
            name: getStringValue({
                value: element.name,
                fallback: ""
            }),
            type: "text",
            content: getStringValue({
                value: element.content,
                fallback: ""
            }),
            fontSize: getNumberValue({
                value: element.fontSize,
                fallback: 16
            }),
            fontFamily: getStringValue({
                value: element.fontFamily,
                fallback: "Arial"
            }),
            color: getStringValue({
                value: element.color,
                fallback: "#000000"
            }),
            background: {
                enabled: false,
                color: getStringValue({
                    value: element.backgroundColor,
                    fallback: "transparent"
                }),
                cornerRadius: 0,
                paddingX: 8,
                paddingY: 4,
                offsetX: 0,
                offsetY: 0
            },
            textAlign: parseEnum({
                value: element.textAlign,
                allowed: [
                    "left",
                    "center",
                    "right"
                ],
                fallback: "left"
            }),
            fontWeight: parseEnum({
                value: element.fontWeight,
                allowed: [
                    "normal",
                    "bold"
                ],
                fallback: "normal"
            }),
            fontStyle: parseEnum({
                value: element.fontStyle,
                allowed: [
                    "normal",
                    "italic"
                ],
                fallback: "normal"
            }),
            textDecoration: parseEnum({
                value: element.textDecoration,
                allowed: [
                    "none",
                    "underline",
                    "line-through"
                ],
                fallback: "none"
            }),
            hidden: false,
            transform,
            opacity,
            duration: getNumberValue({
                value: element.duration,
                fallback: 0
            }),
            startTime: getNumberValue({
                value: element.startTime,
                fallback: 0
            }),
            trimStart: getNumberValue({
                value: element.trimStart,
                fallback: 0
            }),
            trimEnd: getNumberValue({
                value: element.trimEnd,
                fallback: 0
            })
        };
    }).filter((element)=>element !== null);
    return {
        id: getStringValue({
            value: track.id,
            fallback: ""
        }),
        name: getStringValue({
            value: track.name,
            fallback: ""
        }),
        type: "text",
        elements: transformedElements,
        hidden: false
    };
}
function transformAudioTrack({ track }) {
    const elements = Array.isArray(track.elements) ? track.elements : [];
    const transformedElements = elements.map((element)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || element.type !== "audio") {
            return null;
        }
        const mediaId = getStringValue({
            value: element.mediaId
        });
        if (!mediaId) {
            return null;
        }
        return {
            id: getStringValue({
                value: element.id,
                fallback: ""
            }),
            name: getStringValue({
                value: element.name,
                fallback: ""
            }),
            type: "audio",
            sourceType: "upload",
            mediaId,
            volume: 1,
            duration: getNumberValue({
                value: element.duration,
                fallback: 0
            }),
            startTime: getNumberValue({
                value: element.startTime,
                fallback: 0
            }),
            trimStart: getNumberValue({
                value: element.trimStart,
                fallback: 0
            }),
            trimEnd: getNumberValue({
                value: element.trimEnd,
                fallback: 0
            })
        };
    }).filter((element)=>element !== null);
    return {
        id: getStringValue({
            value: track.id,
            fallback: ""
        }),
        name: getStringValue({
            value: track.name,
            fallback: ""
        }),
        type: "audio",
        elements: transformedElements,
        muted: false
    };
}
;
function getCurrentSceneId({ value, scenes }) {
    if (typeof value === "string" && value.length > 0) {
        return value;
    }
    const mainSceneId = findMainSceneId({
        scenes
    });
    if (mainSceneId) {
        return mainSceneId;
    }
    return "";
}
function findMainSceneId({ scenes }) {
    for (const scene of scenes){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            continue;
        }
        if (scene.isMain === true && typeof scene.id === "string") {
            return scene.id;
        }
    }
    for (const scene of scenes){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            continue;
        }
        if (typeof scene.id === "string") {
            return scene.id;
        }
    }
    return null;
}
function applyLegacyBookmarks({ scenes, legacyBookmarks }) {
    if (!legacyBookmarks || legacyBookmarks.length === 0) {
        return scenes;
    }
    const mainSceneId = findMainSceneId({
        scenes
    });
    return scenes.map((scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            return scene;
        }
        if (mainSceneId && scene.id !== mainSceneId) {
            return scene;
        }
        if (Array.isArray(scene.bookmarks) && scene.bookmarks.length > 0) {
            return scene;
        }
        return {
            ...scene,
            bookmarks: legacyBookmarks
        };
    });
}
function getBackgroundValue({ value, backgroundType, backgroundColor, blurIntensity }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(value)) {
        const typeValue = value.type;
        if (typeValue === "blur") {
            return {
                type: "blur",
                blurIntensity: getNumberValue({
                    value: value.blurIntensity,
                    fallback: DEFAULT_BACKGROUND_BLUR_INTENSITY
                })
            };
        }
        return {
            type: "color",
            color: getStringValue({
                value: value.color,
                fallback: DEFAULT_BACKGROUND_COLOR
            })
        };
    }
    if (backgroundType === "blur") {
        return {
            type: "blur",
            blurIntensity: getNumberValue({
                value: blurIntensity,
                fallback: DEFAULT_BACKGROUND_BLUR_INTENSITY
            })
        };
    }
    return {
        type: "color",
        color: getStringValue({
            value: backgroundColor,
            fallback: DEFAULT_BACKGROUND_COLOR
        })
    };
}
function getCanvasSizeValue({ value, fallback }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(value)) {
        const width = getNumberValue({
            value: value.width,
            fallback: fallback.width
        });
        const height = getNumberValue({
            value: value.height,
            fallback: fallback.height
        });
        return {
            width,
            height
        };
    }
    return fallback;
}
function getNumberValue({ value, fallback }) {
    return typeof value === "number" ? value : fallback;
}
function getStringValue({ value, fallback }) {
    if (typeof value === "string") {
        return value;
    }
    return fallback;
}
function parseEnum({ value, allowed, fallback }) {
    for (const candidate of allowed){
        if (value === candidate) {
            return candidate;
        }
    }
    return fallback;
}
function normalizeDateString({ value }) {
    if (value instanceof Date) {
        return value.toISOString();
    }
    if (typeof value === "string") {
        return value;
    }
    return new Date().toISOString();
}
function isV2Project({ project }) {
    const versionValue = project.version;
    if (typeof versionValue === "number" && versionValue >= 2) {
        return true;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.metadata) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.settings);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v1-to-v2.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V1toV2Migration",
    ()=>V1toV2Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/indexeddb-adapter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v1$2d$to$2d$v2$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v1-to-v2.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
;
;
;
class V1toV2Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 1;
    to = 2;
    async run({ projectId, project }) {
        const context = await loadV1ToV2Context({
            projectId,
            project
        });
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v1$2d$to$2d$v2$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["transformProjectV1ToV2"])({
            project,
            context
        });
        if (!result.skipped) {
            try {
                await deleteLegacyTimelineDbs({
                    projectId,
                    project: result.project
                });
            } catch (error) {
                console.error(`V1→V2 migration cleanup failed for project ${projectId}:`, error);
            }
        }
        return result;
    }
}
async function loadV1ToV2Context({ projectId, project }) {
    const legacyTracksBySceneId = await loadLegacyTracksBySceneId({
        projectId,
        project
    });
    const mediaTypesById = await loadMediaTypesById({
        projectId,
        legacyTracksBySceneId
    });
    return {
        legacyTracksBySceneId,
        mediaTypesById
    };
}
async function loadLegacyTracksBySceneId({ projectId, project }) {
    const scenes = project.scenes;
    if (!Array.isArray(scenes)) {
        return {};
    }
    const sceneEntries = await Promise.all(scenes.map(async (scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            return null;
        }
        const sceneId = scene.id;
        if (typeof sceneId !== "string") {
            return null;
        }
        const tracks = await loadLegacyTracksForScene({
            projectId,
            sceneId,
            isMain: scene.isMain === true
        });
        return [
            sceneId,
            tracks
        ];
    }));
    return Object.fromEntries(sceneEntries.filter((sceneEntry)=>sceneEntry !== null));
}
async function loadLegacyTracksForScene({ projectId, sceneId, isMain }) {
    const sceneDbName = `video-editor-timelines-${projectId}-${sceneId}`;
    const projectDbName = `video-editor-timelines-${projectId}`;
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexedDBAdapter"](sceneDbName, "timeline", 1);
    let data = await adapter.get("timeline");
    if (!data && isMain) {
        const projectAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexedDBAdapter"](projectDbName, "timeline", 1);
        data = await projectAdapter.get("timeline");
    }
    if (!data || !Array.isArray(data.tracks)) {
        return [];
    }
    return data.tracks;
}
async function loadMediaTypesById({ projectId, legacyTracksBySceneId }) {
    const mediaIds = collectLegacyMediaIds({
        legacyTracksBySceneId
    });
    if (mediaIds.length === 0) {
        return {};
    }
    const mediaMetadataAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexedDBAdapter"](`video-editor-media-${projectId}`, "media-metadata", 1);
    const mediaEntries = await Promise.all(mediaIds.map(async (mediaId)=>{
        const mediaMetadata = await mediaMetadataAdapter.get(mediaId);
        if (!mediaMetadata) {
            return null;
        }
        return [
            mediaId,
            mediaMetadata.type
        ];
    }));
    return Object.fromEntries(mediaEntries.filter((mediaEntry)=>mediaEntry !== null));
}
function collectLegacyMediaIds({ legacyTracksBySceneId }) {
    const mediaIds = new Set();
    for (const tracks of Object.values(legacyTracksBySceneId)){
        if (!Array.isArray(tracks)) {
            continue;
        }
        for (const track of tracks){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || track.type !== "media") {
                continue;
            }
            const elements = track.elements;
            if (!Array.isArray(elements)) {
                continue;
            }
            for (const element of elements){
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || element.type !== "media") {
                    continue;
                }
                if (typeof element.mediaId !== "string") {
                    continue;
                }
                mediaIds.add(element.mediaId);
            }
        }
    }
    return Array.from(mediaIds);
}
async function deleteLegacyTimelineDbs({ projectId, project }) {
    const dbNames = getLegacyTimelineDbNames({
        projectId,
        project
    });
    await Promise.all(dbNames.map((dbName)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDatabase"])({
            dbName
        })));
}
function getLegacyTimelineDbNames({ projectId, project }) {
    const scenes = project.scenes;
    if (!Array.isArray(scenes)) {
        return [
            `video-editor-timelines-${projectId}`
        ];
    }
    const sceneDbNames = scenes.flatMap((scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            return [];
        }
        return typeof scene.id === "string" ? [
            `video-editor-timelines-${projectId}-${scene.id}`
        ] : [];
    });
    return [
        ...sceneDbNames,
        `video-editor-timelines-${projectId}`
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v2-to-v3.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV2ToV3",
    ()=>transformProjectV2ToV3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV2ToV3({ project }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV3Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v3"
        };
    }
    const scenes = getScenes({
        project
    });
    const duration = getDurationFromScenes({
        scenes
    });
    const metadataValue = project.metadata;
    const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(metadataValue) ? {
        ...metadataValue,
        duration
    } : {
        duration
    };
    const migratedProject = {
        ...project,
        metadata,
        version: 3
    };
    return {
        project: migratedProject,
        skipped: false
    };
}
;
function getScenes({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) {
        return [];
    }
    return scenesValue.filter(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"]);
}
function getDurationFromScenes({ scenes }) {
    const mainScene = scenes.find((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(s) && s.isMain === true) ?? scenes.find(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"]) ?? null;
    if (!mainScene || !Array.isArray(mainScene.tracks)) {
        return 0;
    }
    let maxEnd = 0;
    for (const track of mainScene.tracks){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) continue;
        for (const element of track.elements){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) continue;
            const startTime = typeof element.startTime === "number" ? element.startTime : 0;
            const duration = typeof element.duration === "number" ? element.duration : 0;
            maxEnd = Math.max(maxEnd, startTime + duration);
        }
    }
    return maxEnd;
}
function isV3Project({ project }) {
    const versionValue = project.version;
    if (typeof versionValue === "number" && versionValue >= 3) {
        return true;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.metadata) && typeof project.metadata.duration === "number";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v2-to-v3.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V2toV3Migration",
    ()=>V2toV3Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v2$2d$to$2d$v3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v2-to-v3.ts [app-client] (ecmascript) <locals>");
;
;
class V2toV3Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 2;
    to = 3;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v2$2d$to$2d$v3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["transformProjectV2ToV3"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v3-to-v4.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV3ToV4",
    ()=>transformProjectV3ToV4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
const LEGACY_FONT_WEIGHT_MAP = new Map([
    [
        "normal",
        "400"
    ],
    [
        "bold",
        "700"
    ]
]);
const VALID_NUMERIC_FONT_WEIGHTS = new Set([
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
]);
function transformProjectV3ToV4({ project }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV4Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v4"
        };
    }
    const migratedProject = normalizeProjectTextFontWeights({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 4
        },
        skipped: false
    };
}
function normalizeProjectTextFontWeights({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) {
        return project;
    }
    let hasSceneChanges = false;
    const normalizedScenes = scenesValue.map((scene)=>{
        const normalizedScene = normalizeSceneTextFontWeights({
            scene
        });
        if (normalizedScene !== scene) {
            hasSceneChanges = true;
        }
        return normalizedScene;
    });
    if (!hasSceneChanges) {
        return project;
    }
    return {
        ...project,
        scenes: normalizedScenes
    };
}
function normalizeSceneTextFontWeights({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) {
        return scene;
    }
    let hasTrackChanges = false;
    const normalizedTracks = tracksValue.map((track)=>{
        const normalizedTrack = normalizeTrackTextFontWeights({
            track
        });
        if (normalizedTrack !== track) {
            hasTrackChanges = true;
        }
        return normalizedTrack;
    });
    if (!hasTrackChanges) {
        return scene;
    }
    return {
        ...scene,
        tracks: normalizedTracks
    };
}
function normalizeTrackTextFontWeights({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
        return track;
    }
    if (track.type !== "text") {
        return track;
    }
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) {
        return track;
    }
    let hasElementChanges = false;
    const normalizedElements = elementsValue.map((element)=>{
        const normalizedElement = normalizeTextElementFontWeight({
            element
        });
        if (normalizedElement !== element) {
            hasElementChanges = true;
        }
        return normalizedElement;
    });
    if (!hasElementChanges) {
        return track;
    }
    return {
        ...track,
        elements: normalizedElements
    };
}
function normalizeTextElementFontWeight({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || element.type !== "text") {
        return element;
    }
    const normalizedWeight = normalizeFontWeight({
        value: element.fontWeight
    });
    if (normalizedWeight === element.fontWeight) {
        return element;
    }
    return {
        ...element,
        fontWeight: normalizedWeight
    };
}
function normalizeFontWeight({ value }) {
    if (typeof value === "number") {
        const numericWeight = String(value);
        if (VALID_NUMERIC_FONT_WEIGHTS.has(numericWeight)) {
            return numericWeight;
        }
        return value;
    }
    if (typeof value !== "string") {
        return value;
    }
    const normalized = value.trim().toLowerCase();
    const mapped = LEGACY_FONT_WEIGHT_MAP.get(normalized);
    if (mapped !== undefined) {
        return mapped;
    }
    if (VALID_NUMERIC_FONT_WEIGHTS.has(normalized)) {
        return normalized;
    }
    return value;
}
;
function isV4Project({ project }) {
    const versionValue = project.version;
    return typeof versionValue === "number" && versionValue >= 4;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v3-to-v4.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V3toV4Migration",
    ()=>V3toV4Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v3$2d$to$2d$v4$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v3-to-v4.ts [app-client] (ecmascript) <locals>");
;
;
class V3toV4Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 3;
    to = 4;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v3$2d$to$2d$v4$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["transformProjectV3ToV4"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v4-to-v5.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV4ToV5",
    ()=>transformProjectV4ToV5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
const KNOWN_STICKER_PROVIDER_IDS = new Set([
    "icons",
    "emoji",
    "flags",
    "shapes"
]);
function transformProjectV4ToV5({ project }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV5Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v5"
        };
    }
    const migratedProject = migrateProjectStickerElements({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 5
        },
        skipped: false
    };
}
function migrateProjectStickerElements({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) {
        return project;
    }
    let hasSceneChanges = false;
    const migratedScenes = scenesValue.map((scene)=>{
        const migratedScene = migrateSceneStickerElements({
            scene
        });
        if (migratedScene !== scene) {
            hasSceneChanges = true;
        }
        return migratedScene;
    });
    if (!hasSceneChanges) {
        return project;
    }
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneStickerElements({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) {
        return scene;
    }
    let hasTrackChanges = false;
    const migratedTracks = tracksValue.map((track)=>{
        const migratedTrack = migrateTrackStickerElements({
            track
        });
        if (migratedTrack !== track) {
            hasTrackChanges = true;
        }
        return migratedTrack;
    });
    if (!hasTrackChanges) {
        return scene;
    }
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackStickerElements({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
        return track;
    }
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) {
        return track;
    }
    let hasElementChanges = false;
    const migratedElements = elementsValue.map((element)=>{
        const migratedElement = migrateStickerElement({
            element
        });
        if (migratedElement !== element) {
            hasElementChanges = true;
        }
        return migratedElement;
    });
    if (!hasElementChanges) {
        return track;
    }
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateStickerElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || element.type !== "sticker") {
        return element;
    }
    const existingStickerId = typeof element.stickerId === "string" ? element.stickerId : null;
    const legacyIconName = typeof element.iconName === "string" ? element.iconName : null;
    const normalizedStickerId = normalizeStickerId({
        value: existingStickerId ?? legacyIconName
    }) ?? null;
    const hasLegacyIconName = "iconName" in element;
    const hasLegacyColor = "color" in element;
    const shouldUpdateStickerId = normalizedStickerId !== existingStickerId;
    if (!hasLegacyIconName && !hasLegacyColor && !shouldUpdateStickerId) {
        return element;
    }
    const { iconName: _legacyIconName, color: _legacyColor, ...remaining } = element;
    return normalizedStickerId ? {
        ...remaining,
        stickerId: normalizedStickerId
    } : remaining;
}
function normalizeStickerId({ value }) {
    if (typeof value !== "string" || value.length === 0) {
        return null;
    }
    const separatorIndex = value.indexOf(":");
    if (separatorIndex === -1) {
        return `icons:${value}`;
    }
    const maybeProvider = value.slice(0, separatorIndex);
    if (KNOWN_STICKER_PROVIDER_IDS.has(maybeProvider)) {
        return value;
    }
    return `icons:${value}`;
}
function isV5Project({ project }) {
    const versionValue = project.version;
    return typeof versionValue === "number" && versionValue >= 5;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v4-to-v5.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V4toV5Migration",
    ()=>V4toV5Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v4$2d$to$2d$v5$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v4-to-v5.ts [app-client] (ecmascript)");
;
;
class V4toV5Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 4;
    to = 5;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v4$2d$to$2d$v5$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV4ToV5"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v5-to-v6.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV5ToV6",
    ()=>transformProjectV5ToV6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV5ToV6({ project }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV6Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v6"
        };
    }
    const migratedProject = migrateProjectBookmarks({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 6
        },
        skipped: false
    };
}
function migrateProjectBookmarks({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) {
        return project;
    }
    let hasSceneChanges = false;
    const migratedScenes = scenesValue.map((scene)=>{
        const migratedScene = migrateSceneBookmarks({
            scene
        });
        if (migratedScene !== scene) {
            hasSceneChanges = true;
        }
        return migratedScene;
    });
    if (!hasSceneChanges) {
        return project;
    }
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneBookmarks({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const bookmarksValue = scene.bookmarks;
    if (!Array.isArray(bookmarksValue)) {
        return scene;
    }
    const needsMigration = bookmarksValue.some((bookmark)=>typeof bookmark === "number");
    if (!needsMigration) {
        return scene;
    }
    const migratedBookmarks = bookmarksValue.map((bookmark)=>typeof bookmark === "number" ? {
            time: bookmark
        } : bookmark);
    return {
        ...scene,
        bookmarks: migratedBookmarks
    };
}
function isV6Project({ project }) {
    const versionValue = project.version;
    return typeof versionValue === "number" && versionValue >= 6;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v5-to-v6.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V5toV6Migration",
    ()=>V5toV6Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v5$2d$to$2d$v6$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v5-to-v6.ts [app-client] (ecmascript)");
;
;
class V5toV6Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 5;
    to = 6;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v5$2d$to$2d$v6$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV5ToV6"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v6-to-v7.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV6ToV7",
    ()=>transformProjectV6ToV7
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV6ToV7({ project }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV7Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v7"
        };
    }
    const migratedProject = migrateProjectTextElements({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 7
        },
        skipped: false
    };
}
function migrateProjectTextElements({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    let hasChanges = false;
    const migratedScenes = scenesValue.map((scene)=>{
        const migrated = migrateSceneTextElements({
            scene
        });
        if (migrated !== scene) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return project;
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneTextElements({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) return scene;
    let hasChanges = false;
    const migratedTracks = tracksValue.map((track)=>{
        const migrated = migrateTrackTextElements({
            track
        });
        if (migrated !== track) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return scene;
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackTextElements({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) return track;
    let hasChanges = false;
    const migratedElements = elementsValue.map((element)=>{
        const migrated = migrateTextElement({
            element
        });
        if (migrated !== element) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return track;
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateTextElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
    if (element.type !== "text") return element;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element.background)) return element;
    const backgroundColor = typeof element.backgroundColor === "string" ? element.backgroundColor : "transparent";
    const { backgroundColor: _removed, ...rest } = element;
    return {
        ...rest,
        background: {
            color: backgroundColor,
            cornerRadius: 0,
            paddingX: 8,
            paddingY: 4,
            offsetX: 0,
            offsetY: 0
        }
    };
}
function isV7Project({ project }) {
    return typeof project.version === "number" && project.version >= 7;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v6-to-v7.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V6toV7Migration",
    ()=>V6toV7Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v6$2d$to$2d$v7$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v6-to-v7.ts [app-client] (ecmascript)");
;
;
class V6toV7Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 6;
    to = 7;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v6$2d$to$2d$v7$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV6ToV7"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v7-to-v8.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV7ToV8",
    ()=>transformProjectV7ToV8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV7ToV8({ project }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV8Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v8"
        };
    }
    const migratedProject = migrateProjectElements({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 8
        },
        skipped: false
    };
}
function migrateProjectElements({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    let hasChanges = false;
    const migratedScenes = scenesValue.map((scene)=>{
        const migrated = migrateSceneElements({
            scene
        });
        if (migrated !== scene) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return project;
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneElements({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) return scene;
    let hasChanges = false;
    const migratedTracks = tracksValue.map((track)=>{
        const migrated = migrateTrackElements({
            track
        });
        if (migrated !== track) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return scene;
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackElements({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) return track;
    let hasChanges = false;
    const migratedElements = elementsValue.map((element)=>{
        const migrated = migrateElement({
            element
        });
        if (migrated !== element) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return track;
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
    if (element.type !== "video" && element.type !== "audio") return element;
    if (typeof element.sourceDuration === "number") return element;
    const trimStart = typeof element.trimStart === "number" ? element.trimStart : 0;
    const duration = typeof element.duration === "number" ? element.duration : 0;
    const trimEnd = typeof element.trimEnd === "number" ? element.trimEnd : 0;
    return {
        ...element,
        sourceDuration: trimStart + duration + trimEnd
    };
}
function isV8Project({ project }) {
    return typeof project.version === "number" && project.version >= 8;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v7-to-v8.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V7toV8Migration",
    ()=>V7toV8Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v7$2d$to$2d$v8$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v7-to-v8.ts [app-client] (ecmascript)");
;
;
class V7toV8Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 7;
    to = 8;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v7$2d$to$2d$v8$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV7ToV8"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v8-to-v9.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV8ToV9",
    ()=>transformProjectV8ToV9
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV8ToV9({ project }) {
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    });
    if (!projectId) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (isV9Project({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "already v9"
        };
    }
    const migratedProject = migrateProjectTextElements({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 9
        },
        skipped: false
    };
}
function migrateProjectTextElements({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    let hasChanges = false;
    const migratedScenes = scenesValue.map((scene)=>{
        const migrated = migrateSceneTextElements({
            scene
        });
        if (migrated !== scene) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return project;
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneTextElements({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) return scene;
    let hasChanges = false;
    const migratedTracks = tracksValue.map((track)=>{
        const migrated = migrateTrackTextElements({
            track
        });
        if (migrated !== track) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return scene;
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackTextElements({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    if (track.type !== "text") return track;
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) return track;
    let hasChanges = false;
    const migratedElements = elementsValue.map((element)=>{
        const migrated = migrateTextElement({
            element
        });
        if (migrated !== element) hasChanges = true;
        return migrated;
    });
    if (!hasChanges) return track;
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateTextElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
    if (element.type !== "text") return element;
    const bg = element.background;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(bg)) return element;
    if (typeof bg.enabled === "boolean") return element;
    const color = typeof bg.color === "string" ? bg.color : "transparent";
    const enabled = color !== "transparent";
    return {
        ...element,
        background: {
            ...bg,
            enabled
        }
    };
}
function isV9Project({ project }) {
    return typeof project.version === "number" && project.version >= 9;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v8-to-v9.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V8toV9Migration",
    ()=>V8toV9Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v8$2d$to$2d$v9$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v8-to-v9.ts [app-client] (ecmascript)");
;
;
class V8toV9Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 8;
    to = 9;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v8$2d$to$2d$v9$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV8ToV9"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v9-to-v10.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV9ToV10",
    ()=>transformProjectV9ToV10
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV9ToV10({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 10) {
        return {
            project,
            skipped: true,
            reason: "already v10"
        };
    }
    return {
        project: {
            ...project,
            version: 10
        },
        skipped: false
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v9-to-v10.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V9toV10Migration",
    ()=>V9toV10Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v9$2d$to$2d$v10$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v9-to-v10.ts [app-client] (ecmascript)");
;
;
class V9toV10Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 9;
    to = 10;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v9$2d$to$2d$v10$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV9ToV10"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v10-to-v11.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV10ToV11",
    ()=>transformProjectV10ToV11
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV10ToV11({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 11) {
        return {
            project,
            skipped: true,
            reason: "already v11"
        };
    }
    const migratedProject = migrateProjectScale({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 11
        },
        skipped: false
    };
}
function migrateProjectScale({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    const migratedScenes = scenesValue.map((scene)=>migrateSceneScale({
            scene
        }));
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneScale({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) return scene;
    const migratedTracks = tracksValue.map((track)=>migrateTrackScale({
            track
        }));
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackScale({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) return track;
    const migratedElements = elementsValue.map((element)=>migrateElementScale({
            element
        }));
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateElementScale({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
    const transform = element.transform;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(transform)) return element;
    const scale = transform.scale;
    if (typeof scale !== "number") return element;
    const migratedTransform = {
        ...transform,
        scaleX: scale,
        scaleY: scale
    };
    delete migratedTransform.scale;
    let migratedElement = {
        ...element,
        transform: migratedTransform
    };
    const animations = element.animations;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.channels)) {
        const channels = animations.channels;
        const scaleChannel = channels["transform.scale"];
        if (scaleChannel && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scaleChannel)) {
            const keyframes = scaleChannel.keyframes;
            if (Array.isArray(keyframes)) {
                const newChannels = {
                    ...channels
                };
                delete newChannels["transform.scale"];
                newChannels["transform.scaleX"] = {
                    ...scaleChannel,
                    keyframes: [
                        ...keyframes
                    ]
                };
                newChannels["transform.scaleY"] = {
                    ...scaleChannel,
                    keyframes: keyframes.map((kf)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(kf) ? {
                            ...kf
                        } : kf)
                };
                migratedElement = {
                    ...migratedElement,
                    animations: {
                        ...animations,
                        channels: newChannels
                    }
                };
            }
        }
    }
    return migratedElement;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v10-to-v11.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V10toV11Migration",
    ()=>V10toV11Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v10$2d$to$2d$v11$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v10-to-v11.ts [app-client] (ecmascript)");
;
;
class V10toV11Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 10;
    to = 11;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v10$2d$to$2d$v11$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV10ToV11"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v11-to-v12.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV11ToV12",
    ()=>transformProjectV11ToV12
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV11ToV12({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 12) {
        return {
            project,
            skipped: true,
            reason: "already v12"
        };
    }
    const migratedProject = migrateProjectPosition({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 12
        },
        skipped: false
    };
}
function migrateProjectPosition({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    const migratedScenes = scenesValue.map((scene)=>migrateScenePosition({
            scene
        }));
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateScenePosition({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) return scene;
    const migratedTracks = tracksValue.map((track)=>migrateTrackPosition({
            track
        }));
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackPosition({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) return track;
    const migratedElements = elementsValue.map((element)=>migrateElementPosition({
            element
        }));
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateElementPosition({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
    const animations = element.animations;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.channels)) return element;
    const channels = animations.channels;
    const xChannel = channels["transform.position.x"];
    const yChannel = channels["transform.position.y"];
    if (!xChannel && !yChannel) return element;
    const baseTransform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element.transform) ? element.transform : {};
    const basePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(baseTransform.position) ? baseTransform.position : {};
    const baseX = typeof basePosition.x === "number" ? basePosition.x : 0;
    const baseY = typeof basePosition.y === "number" ? basePosition.y : 0;
    const xKeyframes = getKeyframes({
        channel: xChannel
    });
    const yKeyframes = getKeyframes({
        channel: yChannel
    });
    const allTimes = Array.from(new Set([
        ...xKeyframes.map((kf)=>kf.time),
        ...yKeyframes.map((kf)=>kf.time)
    ])).sort((a, b)=>a - b);
    const vectorKeyframes = allTimes.map((time)=>{
        const xKf = xKeyframes.find((kf)=>Math.abs(kf.time - time) < 0.001);
        const yKf = yKeyframes.find((kf)=>Math.abs(kf.time - time) < 0.001);
        const x = typeof xKf?.value === "number" ? xKf.value : interpolateScalarAtTime({
            keyframes: xKeyframes,
            time,
            fallback: baseX
        });
        const y = typeof yKf?.value === "number" ? yKf.value : interpolateScalarAtTime({
            keyframes: yKeyframes,
            time,
            fallback: baseY
        });
        const interpolation = xKf?.interpolation ?? yKf?.interpolation ?? "linear";
        return {
            id: xKf?.id ?? yKf?.id ?? crypto.randomUUID(),
            time,
            value: {
                x,
                y
            },
            interpolation
        };
    });
    const newChannels = {
        ...channels
    };
    delete newChannels["transform.position.x"];
    delete newChannels["transform.position.y"];
    newChannels["transform.position"] = {
        valueKind: "vector",
        keyframes: vectorKeyframes
    };
    return {
        ...element,
        animations: {
            ...animations,
            channels: newChannels
        }
    };
}
function getKeyframes({ channel }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(channel)) return [];
    if (!Array.isArray(channel.keyframes)) return [];
    return channel.keyframes.flatMap((kf)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(kf)) return [];
        if (typeof kf.id !== "string" || typeof kf.time !== "number" || typeof kf.value !== "number") return [];
        return [
            {
                id: kf.id,
                time: kf.time,
                value: kf.value,
                interpolation: typeof kf.interpolation === "string" ? kf.interpolation : "linear"
            }
        ];
    });
}
function interpolateScalarAtTime({ keyframes, time, fallback }) {
    if (keyframes.length === 0) return fallback;
    const sorted = [
        ...keyframes
    ].sort((a, b)=>a.time - b.time);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (!first || !last) return fallback;
    if (time <= first.time) return first.value;
    if (time >= last.time) return last.value;
    for(let i = 0; i < sorted.length - 1; i++){
        const left = sorted[i];
        const right = sorted[i + 1];
        if (time < left.time || time > right.time) continue;
        if (left.interpolation === "hold") return left.value;
        const t = (time - left.time) / (right.time - left.time);
        return left.value + (right.value - left.value) * t;
    }
    return last.value;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v11-to-v12.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V11toV12Migration",
    ()=>V11toV12Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v11$2d$to$2d$v12$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v11-to-v12.ts [app-client] (ecmascript)");
;
;
class V11toV12Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 11;
    to = 12;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v11$2d$to$2d$v12$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV11ToV12"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v12-to-v13.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV12ToV13",
    ()=>transformProjectV12ToV13
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV12ToV13({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 13) {
        return {
            project,
            skipped: true,
            reason: "already v13"
        };
    }
    const migratedProject = migrateProjectMasks({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 13
        },
        skipped: false
    };
}
function migrateProjectMasks({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    const migratedScenes = scenesValue.map((scene)=>migrateSceneMasks({
            scene
        }));
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneMasks({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) return scene;
    const migratedTracks = tracksValue.map((track)=>migrateTrackMasks({
            track
        }));
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackMasks({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) return track;
    const migratedElements = elementsValue.map((element)=>migrateElementMasks({
            element
        }));
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateElementMasks({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
    const masksValue = element.masks;
    if (!Array.isArray(masksValue)) return element;
    const migratedMasks = masksValue.map((mask)=>migrateMask({
            mask
        }));
    return {
        ...element,
        masks: migratedMasks
    };
}
function migrateMask({ mask }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask)) return mask;
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask.params) ? {
        ...mask.params
    } : {};
    const result = {
        ...mask
    };
    result.params = {
        ...params,
        feather: typeof mask.feather === "number" ? mask.feather : 0,
        inverted: typeof mask.inverted === "boolean" ? mask.inverted : false,
        strokeColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask.stroke) && typeof mask.stroke.color === "string" ? mask.stroke.color : "#ffffff",
        strokeWidth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask.stroke) && typeof mask.stroke.width === "number" ? mask.stroke.width : 0
    };
    delete result.feather;
    delete result.inverted;
    delete result.stroke;
    return result;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v12-to-v13.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V12toV13Migration",
    ()=>V12toV13Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v12$2d$to$2d$v13$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v12-to-v13.ts [app-client] (ecmascript)");
;
;
class V12toV13Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 12;
    to = 13;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v12$2d$to$2d$v13$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV12ToV13"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v13-to-v14.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV13ToV14",
    ()=>transformProjectV13ToV14
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV13ToV14({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 14) {
        return {
            project,
            skipped: true,
            reason: "already v14"
        };
    }
    const migratedProject = migrateProjectSplitMasks({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 14
        },
        skipped: false
    };
}
function migrateProjectSplitMasks({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    const migratedScenes = scenesValue.map((scene)=>migrateSceneSplitMasks({
            scene
        }));
    return {
        ...project,
        scenes: migratedScenes
    };
}
function migrateSceneSplitMasks({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
    const tracksValue = scene.tracks;
    if (!Array.isArray(tracksValue)) return scene;
    const migratedTracks = tracksValue.map((track)=>migrateTrackSplitMasks({
            track
        }));
    return {
        ...scene,
        tracks: migratedTracks
    };
}
function migrateTrackSplitMasks({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    const elementsValue = track.elements;
    if (!Array.isArray(elementsValue)) return track;
    const migratedElements = elementsValue.map((element)=>migrateElementSplitMasks({
            element
        }));
    return {
        ...track,
        elements: migratedElements
    };
}
function migrateElementSplitMasks({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
    const masksValue = element.masks;
    if (!Array.isArray(masksValue)) return element;
    const migratedMasks = masksValue.map((mask)=>migrateSplitMask({
            mask
        }));
    return {
        ...element,
        masks: migratedMasks
    };
}
/**
 * Converts split mask params from position-along-normal to explicit (x, y) anchor.
 *
 * Old: center = (cx + (position-0.5)*W*cos(rot), cy + (position-0.5)*W*sin(rot))
 * New: center = (cx + x*W, cy + y*W)
 *
 * Conversion: x = (position-0.5)*cos(rot), y = (position-0.5)*sin(rot)
 */ function migrateSplitMask({ mask }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask)) return mask;
    if (mask.type !== "split") return mask;
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask.params) ? mask.params : {};
    const position = typeof params.position === "number" ? params.position : 0.5;
    const rotation = typeof params.rotation === "number" ? params.rotation : 0;
    const angleRad = rotation * Math.PI / 180;
    const x = (position - 0.5) * Math.cos(angleRad);
    const y = (position - 0.5) * Math.sin(angleRad);
    const { position: _removed, ...restParams } = params;
    return {
        ...mask,
        params: {
            ...restParams,
            x,
            y
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v13-to-v14.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V13toV14Migration",
    ()=>V13toV14Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v13$2d$to$2d$v14$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v13-to-v14.ts [app-client] (ecmascript)");
;
;
class V13toV14Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 13;
    to = 14;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v13$2d$to$2d$v14$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV13ToV14"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v14-to-v15.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV14ToV15",
    ()=>transformProjectV14ToV15
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
// Frozen snapshot of the v15-era fallback. See ./README.md.
const STICKER_INTRINSIC_SIZE_FALLBACK = 200;
function transformProjectV14ToV15({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 15) {
        return {
            project,
            skipped: true,
            reason: "already v15"
        };
    }
    const migratedProject = backfillStickerIntrinsicDimensions({
        project
    });
    return {
        project: {
            ...migratedProject,
            version: 15
        },
        skipped: false
    };
}
function backfillStickerIntrinsicDimensions({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) return project;
    const migratedScenes = scenesValue.map((scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) return scene;
        const tracksValue = scene.tracks;
        if (!Array.isArray(tracksValue)) return scene;
        const migratedTracks = tracksValue.map((track)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
            const elementsValue = track.elements;
            if (!Array.isArray(elementsValue)) return track;
            const migratedElements = elementsValue.map((element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) return element;
                if (element.type !== "sticker") return element;
                if (typeof element.intrinsicWidth === "number" && typeof element.intrinsicHeight === "number") {
                    return element;
                }
                return {
                    ...element,
                    intrinsicWidth: STICKER_INTRINSIC_SIZE_FALLBACK,
                    intrinsicHeight: STICKER_INTRINSIC_SIZE_FALLBACK
                };
            });
            return {
                ...track,
                elements: migratedElements
            };
        });
        return {
            ...scene,
            tracks: migratedTracks
        };
    });
    return {
        ...project,
        scenes: migratedScenes
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v14-to-v15.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V14toV15Migration",
    ()=>V14toV15Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v14$2d$to$2d$v15$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v14-to-v15.ts [app-client] (ecmascript)");
;
;
class V14toV15Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 14;
    to = 15;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v14$2d$to$2d$v15$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV14ToV15"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v15-to-v16.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV15ToV16",
    ()=>transformProjectV15ToV16
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV15ToV16({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 16) {
        return {
            project,
            skipped: true,
            reason: "already v16"
        };
    }
    return {
        project: {
            ...renameStickerTracksToGraphic({
                project
            }),
            version: 16
        },
        skipped: false
    };
}
function renameStickerTracksToGraphic({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) {
        return project;
    }
    const migratedScenes = scenesValue.map((scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene) || !Array.isArray(scene.tracks)) {
            return scene;
        }
        return {
            ...scene,
            tracks: scene.tracks.map((track)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || track.type !== "sticker") {
                    return track;
                }
                return {
                    ...track,
                    type: "graphic"
                };
            })
        };
    });
    return {
        ...project,
        scenes: migratedScenes
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v15-to-v16.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V15toV16Migration",
    ()=>V15toV16Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v15$2d$to$2d$v16$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v15-to-v16.ts [app-client] (ecmascript)");
;
;
class V15toV16Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 15;
    to = 16;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v15$2d$to$2d$v16$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV15ToV16"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v16-to-v17.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV16ToV17",
    ()=>transformProjectV16ToV17
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV16ToV17({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 17) {
        return {
            project,
            skipped: true,
            reason: "already v17"
        };
    }
    return {
        project: {
            ...backfillMaskStrokeAlign({
                project
            }),
            version: 17
        },
        skipped: false
    };
}
function backfillMaskStrokeAlign({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) {
        return project;
    }
    const migratedScenes = scenesValue.map((scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            return scene;
        }
        const tracksValue = scene.tracks;
        if (!Array.isArray(tracksValue)) {
            return scene;
        }
        const migratedTracks = tracksValue.map((track)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
                return track;
            }
            const elementsValue = track.elements;
            if (!Array.isArray(elementsValue)) {
                return track;
            }
            const migratedElements = elementsValue.map((element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) {
                    return element;
                }
                const masksValue = element.masks;
                if (!Array.isArray(masksValue)) {
                    return element;
                }
                const migratedMasks = masksValue.map((mask)=>{
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask)) {
                        return mask;
                    }
                    const paramsValue = mask.params;
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(paramsValue) || typeof paramsValue.strokeAlign === "string") {
                        return mask;
                    }
                    return {
                        ...mask,
                        params: {
                            ...paramsValue,
                            strokeAlign: "center"
                        }
                    };
                });
                return {
                    ...element,
                    masks: migratedMasks
                };
            });
            return {
                ...track,
                elements: migratedElements
            };
        });
        return {
            ...scene,
            tracks: migratedTracks
        };
    });
    return {
        ...project,
        scenes: migratedScenes
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v16-to-v17.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V16toV17Migration",
    ()=>V16toV17Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v16$2d$to$2d$v17$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v16-to-v17.ts [app-client] (ecmascript)");
;
;
class V16toV17Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 16;
    to = 17;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v16$2d$to$2d$v17$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV16ToV17"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v17-to-v18.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV17ToV18",
    ()=>transformProjectV17ToV18
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
// Frozen snapshots of v18-era volume bounds. See ./README.md.
const VOLUME_DB_MIN = -60;
const VOLUME_DB_MAX = 20;
function transformProjectV17ToV18({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 18) {
        return {
            project,
            skipped: true,
            reason: "already v18"
        };
    }
    return {
        project: {
            ...migrateElementVolumes({
                project
            }),
            version: 18
        },
        skipped: false
    };
}
function migrateElementVolumes({ project }) {
    const scenesValue = project.scenes;
    if (!Array.isArray(scenesValue)) {
        return project;
    }
    const migratedScenes = scenesValue.map((scene)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
            return scene;
        }
        const tracksValue = scene.tracks;
        if (!Array.isArray(tracksValue)) {
            return scene;
        }
        const migratedTracks = tracksValue.map((track)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
                return track;
            }
            const elementsValue = track.elements;
            if (!Array.isArray(elementsValue)) {
                return track;
            }
            const migratedElements = elementsValue.map((element)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) {
                    return element;
                }
                if (element.type !== "audio" && element.type !== "video") {
                    return element;
                }
                const legacyVolume = element.volume;
                return {
                    ...element,
                    volume: typeof legacyVolume === "number" ? linearGainToDb(legacyVolume) : 0
                };
            });
            return {
                ...track,
                elements: migratedElements
            };
        });
        return {
            ...scene,
            tracks: migratedTracks
        };
    });
    return {
        ...project,
        scenes: migratedScenes
    };
}
function linearGainToDb(gain) {
    if (!Number.isFinite(gain)) {
        return 0;
    }
    if (gain <= 0) {
        return VOLUME_DB_MIN;
    }
    return clampDb(20 * Math.log10(gain));
}
function clampDb(value) {
    if (!Number.isFinite(value)) {
        return 0;
    }
    return Math.min(VOLUME_DB_MAX, Math.max(VOLUME_DB_MIN, value));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v17-to-v18.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V17toV18Migration",
    ()=>V17toV18Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v17$2d$to$2d$v18$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v17-to-v18.ts [app-client] (ecmascript)");
;
;
class V17toV18Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 17;
    to = 18;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v17$2d$to$2d$v18$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV17ToV18"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v18-to-v19.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV18ToV19",
    ()=>transformProjectV18ToV19
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV18ToV19({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 19) {
        return {
            project,
            skipped: true,
            reason: "already v19"
        };
    }
    return {
        project: {
            ...migrateCanvasSizeSettings({
                project
            }),
            version: 19
        },
        skipped: false
    };
}
function migrateCanvasSizeSettings({ project }) {
    const settingsValue = project.settings;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(settingsValue)) {
        return project;
    }
    const migratedSettings = {
        ...settingsValue,
        canvasSizeMode: "preset",
        lastCustomCanvasSize: null
    };
    return {
        ...project,
        settings: migratedSettings
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v18-to-v19.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V18toV19Migration",
    ()=>V18toV19Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v18$2d$to$2d$v19$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v18-to-v19.ts [app-client] (ecmascript)");
;
;
class V18toV19Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 18;
    to = 19;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v18$2d$to$2d$v19$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV18ToV19"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v19-to-v20.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV19ToV20",
    ()=>transformProjectV19ToV20
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV19ToV20({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    if (typeof project.version === "number" && project.version >= 20) {
        return {
            project,
            skipped: true,
            reason: "already v20"
        };
    }
    return {
        project: {
            ...migrateVideoSourceAudioState({
                project
            }),
            version: 20
        },
        skipped: false
    };
}
function migrateVideoSourceAudioState({ project }) {
    if (!Array.isArray(project.scenes)) {
        return project;
    }
    return {
        ...project,
        scenes: project.scenes.map((scene)=>migrateScene({
                scene
            }))
    };
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene) || !Array.isArray(scene.tracks)) {
        return scene;
    }
    return {
        ...scene,
        tracks: scene.tracks.map((track)=>migrateTrack({
                track
            }))
    };
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || element.type !== "video") {
        return element;
    }
    return {
        ...element,
        isSourceAudioEnabled: typeof element.isSourceAudioEnabled === "boolean" ? element.isSourceAudioEnabled : true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v19-to-v20.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V19toV20Migration",
    ()=>V19toV20Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v19$2d$to$2d$v20$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v19-to-v20.ts [app-client] (ecmascript)");
;
;
class V19toV20Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 19;
    to = 20;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v19$2d$to$2d$v20$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV19ToV20"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v20-to-v21.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV20ToV21",
    ()=>transformProjectV20ToV21
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
// Frozen snapshot of the v21-era divisor. See ./README.md.
const INTENSITY_TO_SIGMA_DIVISOR = 5;
const LEGACY_DEFAULT_BACKGROUND_BLUR_INTENSITY = 50;
function transformProjectV20ToV21({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 21) {
        return {
            project,
            skipped: true,
            reason: "already v21"
        };
    }
    if (version !== 20) {
        return {
            project,
            skipped: true,
            reason: "not v20"
        };
    }
    return {
        project: {
            ...migrateBackgroundBlurScale({
                project
            }),
            version: 21
        },
        skipped: false
    };
}
function migrateBackgroundBlurScale({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.settings)) {
        return project;
    }
    const settings = {
        ...project.settings
    };
    const background = settings.background;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(background) || background.type !== "blur") {
        return {
            ...project,
            settings
        };
    }
    const raw = background.blurIntensity;
    const blurIntensity = typeof raw === "number" && Number.isFinite(raw) ? raw * INTENSITY_TO_SIGMA_DIVISOR : LEGACY_DEFAULT_BACKGROUND_BLUR_INTENSITY;
    return {
        ...project,
        settings: {
            ...settings,
            background: {
                ...background,
                blurIntensity
            }
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v20-to-v21.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V20toV21Migration",
    ()=>V20toV21Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v20$2d$to$2d$v21$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v20-to-v21.ts [app-client] (ecmascript)");
;
;
class V20toV21Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 20;
    to = 21;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v20$2d$to$2d$v21$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV20ToV21"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v21-to-v22.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV21ToV22",
    ()=>transformProjectV21ToV22
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/converter.js [app-client] (ecmascript) <export default as converter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/parse.js [app-client] (ecmascript) <export default as parse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
;
const COLOR_COMPONENT_KEYS = [
    "r",
    "g",
    "b",
    "a"
];
const toRgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__["converter"])("rgb");
function srgbToLinear({ value }) {
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}
function parseColorToLinearRgba({ color }) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__["parse"])(color);
    const rgb = parsed ? toRgb(parsed) : null;
    if (!rgb) {
        return null;
    }
    return {
        r: srgbToLinear({
            value: rgb.r ?? 0
        }),
        g: srgbToLinear({
            value: rgb.g ?? 0
        }),
        b: srgbToLinear({
            value: rgb.b ?? 0
        }),
        a: Math.max(0, Math.min(1, rgb.alpha ?? 1))
    };
}
function transformProjectV21ToV22({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 22) {
        return {
            project,
            skipped: true,
            reason: "already v22"
        };
    }
    if (version !== 21) {
        return {
            project,
            skipped: true,
            reason: "not v21"
        };
    }
    return {
        project: {
            ...migrateProjectAnimations({
                project
            }),
            version: 22
        },
        skipped: false
    };
}
function migrateProjectAnimations({ project }) {
    const scenes = project.scenes;
    if (!Array.isArray(scenes)) {
        return project;
    }
    return {
        ...project,
        scenes: scenes.map((scene)=>migrateSceneAnimations({
                scene
            }))
    };
}
function migrateSceneAnimations({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const tracks = scene.tracks;
    if (!Array.isArray(tracks)) {
        return scene;
    }
    return {
        ...scene,
        tracks: tracks.map((track)=>migrateTrackAnimations({
                track
            }))
    };
}
function migrateTrackAnimations({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
        return track;
    }
    const elements = track.elements;
    if (!Array.isArray(elements)) {
        return track;
    }
    return {
        ...track,
        elements: elements.map((element)=>migrateElementAnimations({
                element
            }))
    };
}
function migrateElementAnimations({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) {
        return element;
    }
    const animations = element.animations;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations)) {
        return element;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.bindings)) {
        return element;
    }
    const migratedAnimations = migrateLegacyAnimations({
        animations
    });
    if (!migratedAnimations) {
        const { animations: _unusedAnimations, ...elementWithoutAnimations } = element;
        return elementWithoutAnimations;
    }
    return {
        ...element,
        animations: migratedAnimations
    };
}
function migrateLegacyAnimations({ animations }) {
    const legacyChannels = animations.channels;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(legacyChannels)) {
        return null;
    }
    const nextBindings = {};
    const nextChannels = {};
    for (const [propertyPath, channel] of Object.entries(legacyChannels)){
        const migratedChannel = migrateLegacyChannel({
            propertyPath,
            channel
        });
        if (!migratedChannel) {
            continue;
        }
        nextBindings[propertyPath] = migratedChannel.binding;
        Object.assign(nextChannels, migratedChannel.channels);
    }
    if (Object.keys(nextBindings).length === 0) {
        return null;
    }
    return {
        bindings: nextBindings,
        channels: nextChannels
    };
}
function migrateLegacyChannel({ propertyPath, channel }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(channel)) {
        return null;
    }
    switch(channel.valueKind){
        case "number":
            return migrateNumberChannel({
                propertyPath,
                channel
            });
        case "discrete":
            return migrateDiscreteChannel({
                propertyPath,
                channel
            });
        case "vector":
            return migrateVectorChannel({
                propertyPath,
                channel
            });
        case "color":
            return migrateColorChannel({
                propertyPath,
                channel
            });
        default:
            return null;
    }
}
function migrateNumberChannel({ propertyPath, channel }) {
    const legacyKeys = getLegacyScalarKeyframes({
        channel,
        isValidValue: (value)=>typeof value === "number" && Number.isFinite(value)
    });
    if (legacyKeys.length === 0) {
        return null;
    }
    return {
        binding: {
            path: propertyPath,
            kind: "number",
            components: [
                {
                    key: "value",
                    channelId: buildChannelId({
                        propertyPath,
                        componentKey: "value"
                    })
                }
            ]
        },
        channels: {
            [buildChannelId({
                propertyPath,
                componentKey: "value"
            })]: {
                kind: "scalar",
                keys: legacyKeys.map((keyframe)=>toScalarKeyframe({
                        keyframe
                    }))
            }
        }
    };
}
function migrateDiscreteChannel({ propertyPath, channel }) {
    const legacyKeys = getLegacyDiscreteKeyframes({
        channel
    });
    if (legacyKeys.length === 0) {
        return null;
    }
    return {
        binding: {
            path: propertyPath,
            kind: "discrete",
            components: [
                {
                    key: "value",
                    channelId: buildChannelId({
                        propertyPath,
                        componentKey: "value"
                    })
                }
            ]
        },
        channels: {
            [buildChannelId({
                propertyPath,
                componentKey: "value"
            })]: {
                kind: "discrete",
                keys: legacyKeys.map((keyframe)=>({
                        id: keyframe.id,
                        time: keyframe.time,
                        value: keyframe.value
                    }))
            }
        }
    };
}
function migrateVectorChannel({ propertyPath, channel }) {
    const legacyKeys = getLegacyScalarKeyframes({
        channel,
        isValidValue: isLegacyVectorValue
    });
    if (legacyKeys.length === 0) {
        return null;
    }
    const xChannelId = buildChannelId({
        propertyPath,
        componentKey: "x"
    });
    const yChannelId = buildChannelId({
        propertyPath,
        componentKey: "y"
    });
    return {
        binding: {
            path: propertyPath,
            kind: "vector2",
            components: [
                {
                    key: "x",
                    channelId: xChannelId
                },
                {
                    key: "y",
                    channelId: yChannelId
                }
            ]
        },
        channels: {
            [xChannelId]: {
                kind: "scalar",
                keys: legacyKeys.map((keyframe)=>toScalarKeyframe({
                        keyframe: {
                            ...keyframe,
                            value: keyframe.value.x
                        }
                    }))
            },
            [yChannelId]: {
                kind: "scalar",
                keys: legacyKeys.map((keyframe)=>toScalarKeyframe({
                        keyframe: {
                            ...keyframe,
                            value: keyframe.value.y
                        }
                    }))
            }
        }
    };
}
function migrateColorChannel({ propertyPath, channel }) {
    const legacyKeys = getLegacyScalarKeyframes({
        channel,
        isValidValue: (value)=>typeof value === "string"
    });
    if (legacyKeys.length === 0) {
        return null;
    }
    const colorKeys = legacyKeys.flatMap((keyframe)=>{
        const linearRgba = parseColorToLinearRgba({
            color: keyframe.value
        });
        if (!linearRgba) {
            return [];
        }
        return [
            {
                id: keyframe.id,
                time: keyframe.time,
                interpolation: keyframe.interpolation,
                values: linearRgba
            }
        ];
    });
    if (colorKeys.length === 0) {
        return null;
    }
    const channels = Object.fromEntries(COLOR_COMPONENT_KEYS.map((componentKey)=>[
            buildChannelId({
                propertyPath,
                componentKey
            }),
            {
                kind: "scalar",
                keys: colorKeys.map((keyframe)=>toScalarKeyframe({
                        keyframe: {
                            id: keyframe.id,
                            time: keyframe.time,
                            value: keyframe.values[componentKey],
                            interpolation: keyframe.interpolation
                        }
                    }))
            }
        ]));
    return {
        binding: {
            path: propertyPath,
            kind: "color",
            colorSpace: "srgb-linear",
            components: COLOR_COMPONENT_KEYS.map((componentKey)=>({
                    key: componentKey,
                    channelId: buildChannelId({
                        propertyPath,
                        componentKey
                    })
                }))
        },
        channels
    };
}
function getLegacyScalarKeyframes({ channel, isValidValue }) {
    const keyframes = channel.keyframes;
    if (!Array.isArray(keyframes)) {
        return [];
    }
    return keyframes.flatMap((keyframe)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe)) {
            return [];
        }
        if (typeof keyframe.id !== "string" || typeof keyframe.time !== "number" || !Number.isFinite(keyframe.time) || !isValidValue(keyframe.value)) {
            return [];
        }
        return [
            {
                id: keyframe.id,
                time: keyframe.time,
                value: keyframe.value,
                interpolation: keyframe.interpolation === "hold" ? "hold" : "linear"
            }
        ];
    });
}
function getLegacyDiscreteKeyframes({ channel }) {
    const keyframes = channel.keyframes;
    if (!Array.isArray(keyframes)) {
        return [];
    }
    return keyframes.flatMap((keyframe)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe)) {
            return [];
        }
        if (typeof keyframe.id !== "string" || typeof keyframe.time !== "number" || !Number.isFinite(keyframe.time) || typeof keyframe.value !== "string" && typeof keyframe.value !== "boolean") {
            return [];
        }
        return [
            {
                id: keyframe.id,
                time: keyframe.time,
                value: keyframe.value
            }
        ];
    });
}
function isLegacyVectorValue(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(value) && typeof value.x === "number" && Number.isFinite(value.x) && typeof value.y === "number" && Number.isFinite(value.y);
}
function toScalarKeyframe({ keyframe }) {
    return {
        id: keyframe.id,
        time: keyframe.time,
        value: keyframe.value,
        segmentToNext: keyframe.interpolation === "hold" ? "step" : "linear",
        tangentMode: "flat"
    };
}
function buildChannelId({ propertyPath, componentKey }) {
    return `${propertyPath}:${componentKey}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v21-to-v22.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V21toV22Migration",
    ()=>V21toV22Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v21$2d$to$2d$v22$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v21-to-v22.ts [app-client] (ecmascript)");
;
;
class V21toV22Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 21;
    to = 22;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v21$2d$to$2d$v22$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV21ToV22"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v22-to-v23.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV22ToV23",
    ()=>transformProjectV22ToV23
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
// Frozen snapshot of the v23-era tick rate. See ./README.md.
const TICKS_PER_SECOND = 120_000;
const ARBITRARY_FPS_DENOMINATOR = 1_000_000;
const STANDARD_FRAME_RATES = [
    {
        value: 24_000 / 1_001,
        numerator: 24_000,
        denominator: 1_001
    },
    {
        value: 24,
        numerator: 24,
        denominator: 1
    },
    {
        value: 25,
        numerator: 25,
        denominator: 1
    },
    {
        value: 30_000 / 1_001,
        numerator: 30_000,
        denominator: 1_001
    },
    {
        value: 30,
        numerator: 30,
        denominator: 1
    },
    {
        value: 48,
        numerator: 48,
        denominator: 1
    },
    {
        value: 50,
        numerator: 50,
        denominator: 1
    },
    {
        value: 60_000 / 1_001,
        numerator: 60_000,
        denominator: 1_001
    },
    {
        value: 60,
        numerator: 60,
        denominator: 1
    },
    {
        value: 120,
        numerator: 120,
        denominator: 1
    }
];
const STANDARD_FRAME_RATE_TOLERANCE = 0.01;
function transformProjectV22ToV23({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 23) {
        return {
            project,
            skipped: true,
            reason: "already v23"
        };
    }
    if (version !== 22) {
        return {
            project,
            skipped: true,
            reason: "not v22"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 23
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    const nextProject = {
        ...project
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.metadata)) {
        nextProject.metadata = migrateMetadata({
            metadata: project.metadata
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.settings)) {
        nextProject.settings = migrateSettings({
            settings: project.settings
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.timelineViewState)) {
        nextProject.timelineViewState = migrateTimelineViewState({
            timelineViewState: project.timelineViewState
        });
    }
    if (Array.isArray(project.scenes)) {
        nextProject.scenes = project.scenes.map((scene)=>migrateScene({
                scene
            }));
    }
    return nextProject;
}
function migrateMetadata({ metadata }) {
    return migrateTimeFields({
        record: metadata,
        keys: [
            "duration"
        ]
    });
}
function migrateSettings({ settings }) {
    const nextSettings = {
        ...settings
    };
    if ("fps" in settings) {
        nextSettings.fps = migrateFrameRate({
            fps: settings.fps
        });
    }
    return nextSettings;
}
function migrateTimelineViewState({ timelineViewState }) {
    return migrateTimeFields({
        record: timelineViewState,
        keys: [
            "playheadTime"
        ]
    });
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const nextScene = {
        ...scene
    };
    if (Array.isArray(scene.bookmarks)) {
        nextScene.bookmarks = scene.bookmarks.map((bookmark)=>migrateBookmark({
                bookmark
            }));
    }
    if (Array.isArray(scene.tracks)) {
        nextScene.tracks = scene.tracks.map((track)=>migrateTrack({
                track
            }));
    }
    return nextScene;
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
        return track;
    }
    if (!Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) {
        return element;
    }
    const nextElement = migrateTimeFields({
        record: element,
        keys: [
            "duration",
            "startTime",
            "trimStart",
            "trimEnd",
            "sourceDuration"
        ]
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element.animations)) {
        nextElement.animations = migrateAnimations({
            animations: element.animations
        });
    }
    return nextElement;
}
function migrateAnimations({ animations }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.channels)) {
        return animations;
    }
    return {
        ...animations,
        channels: Object.fromEntries(Object.entries(animations.channels).map(([channelId, channel])=>[
                channelId,
                migrateAnimationChannel({
                    channel
                })
            ]))
    };
}
function migrateAnimationChannel({ channel }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(channel)) {
        return channel;
    }
    if (!Array.isArray(channel.keys)) {
        return channel;
    }
    return {
        ...channel,
        keys: channel.keys.map((keyframe)=>migrateAnimationKeyframe({
                keyframe
            }))
    };
}
function migrateAnimationKeyframe({ keyframe }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe)) {
        return keyframe;
    }
    const nextKeyframe = migrateTimeFields({
        record: keyframe,
        keys: [
            "time"
        ]
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe.leftHandle)) {
        nextKeyframe.leftHandle = migrateCurveHandle({
            handle: keyframe.leftHandle
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe.rightHandle)) {
        nextKeyframe.rightHandle = migrateCurveHandle({
            handle: keyframe.rightHandle
        });
    }
    return nextKeyframe;
}
function migrateCurveHandle({ handle }) {
    return migrateTimeFields({
        record: handle,
        keys: [
            "dt"
        ]
    });
}
function migrateBookmark({ bookmark }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(bookmark)) {
        return bookmark;
    }
    return migrateTimeFields({
        record: bookmark,
        keys: [
            "time",
            "duration"
        ]
    });
}
function migrateTimeFields({ record, keys }) {
    const nextRecord = {
        ...record
    };
    for (const key of keys){
        if (!(key in record)) {
            continue;
        }
        nextRecord[key] = migrateTimeValue({
            value: record[key]
        });
    }
    return nextRecord;
}
function migrateTimeValue({ value }) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        return value;
    }
    return secondsToTicks({
        value
    });
}
function secondsToTicks({ value }) {
    return Math.round(value * TICKS_PER_SECOND);
}
function migrateFrameRate({ fps }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(fps)) {
        return fps;
    }
    if (typeof fps !== "number" || !Number.isFinite(fps) || fps <= 0) {
        return fps;
    }
    const standardFrameRate = STANDARD_FRAME_RATES.find((candidate)=>Math.abs(fps - candidate.value) <= STANDARD_FRAME_RATE_TOLERANCE);
    if (standardFrameRate) {
        return {
            numerator: standardFrameRate.numerator,
            denominator: standardFrameRate.denominator
        };
    }
    if (Number.isInteger(fps)) {
        return {
            numerator: fps,
            denominator: 1
        };
    }
    const scaledNumerator = Math.round(fps * ARBITRARY_FPS_DENOMINATOR);
    const divisor = greatestCommonDivisor({
        left: scaledNumerator,
        right: ARBITRARY_FPS_DENOMINATOR
    });
    return {
        numerator: scaledNumerator / divisor,
        denominator: ARBITRARY_FPS_DENOMINATOR / divisor
    };
}
function greatestCommonDivisor({ left, right }) {
    let nextLeft = Math.abs(left);
    let nextRight = Math.abs(right);
    while(nextRight !== 0){
        const remainder = nextLeft % nextRight;
        nextLeft = nextRight;
        nextRight = remainder;
    }
    return nextLeft || 1;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v22-to-v23.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V22toV23Migration",
    ()=>V22toV23Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v22$2d$to$2d$v23$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v22-to-v23.ts [app-client] (ecmascript)");
;
;
class V22toV23Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 22;
    to = 23;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v22$2d$to$2d$v23$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV22ToV23"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v23-to-v24.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV23ToV24",
    ()=>transformProjectV23ToV24
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV23ToV24({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 24) {
        return {
            project,
            skipped: true,
            reason: "already v24"
        };
    }
    if (version !== 23) {
        return {
            project,
            skipped: true,
            reason: "not v23"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 24
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    if (!Array.isArray(project.scenes)) {
        return project;
    }
    return {
        ...project,
        scenes: project.scenes.map((scene)=>migrateScene({
                scene
            }))
    };
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene) || !Array.isArray(scene.tracks)) {
        return scene;
    }
    const mainTrack = findMainTrack({
        tracks: scene.tracks
    });
    const finalMainTrack = mainTrack ?? buildEmptyMainTrack();
    return {
        ...scene,
        tracks: {
            overlay: scene.tracks.filter((track)=>track !== mainTrack).map((track)=>migrateTrack({
                    track
                })).filter((track)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) && track.type !== "audio"),
            main: migrateTrack({
                track: finalMainTrack
            }),
            audio: scene.tracks.map((track)=>migrateTrack({
                    track
                })).filter((track)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) && track.type === "audio")
        }
    };
}
function buildEmptyMainTrack() {
    return {
        id: crypto.randomUUID(),
        name: "Main",
        type: "video",
        elements: [],
        muted: false,
        hidden: false
    };
}
function findMainTrack({ tracks }) {
    for (const track of tracks){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
            continue;
        }
        if (track.type === "video" && track.isMain === true) {
            return track;
        }
    }
    for (const track of tracks){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
            continue;
        }
        if (track.type === "video") {
            return track;
        }
    }
    return null;
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) {
        return track;
    }
    const nextTrack = {
        ...track
    };
    delete nextTrack.isMain;
    return nextTrack;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v23-to-v24.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V23toV24Migration",
    ()=>V23toV24Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v23$2d$to$2d$v24$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v23-to-v24.ts [app-client] (ecmascript)");
;
;
class V23toV24Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 23;
    to = 24;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v23$2d$to$2d$v24$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV23ToV24"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v24-to-v25.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV24ToV25",
    ()=>transformProjectV24ToV25
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV24ToV25({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 25) {
        return {
            project,
            skipped: true,
            reason: "already v25"
        };
    }
    if (version !== 24) {
        return {
            project,
            skipped: true,
            reason: "not v24"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 25
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    if (!Array.isArray(project.scenes)) {
        return project;
    }
    return {
        ...project,
        scenes: project.scenes.map((scene)=>migrateScene({
                scene
            }))
    };
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene.tracks)) {
        return scene;
    }
    const tracks = scene.tracks;
    const nextTracks = {
        ...tracks
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks.main)) {
        nextTracks.main = migrateTrack({
            track: tracks.main
        });
    }
    if (Array.isArray(tracks.overlay)) {
        nextTracks.overlay = tracks.overlay.map((track)=>migrateTrack({
                track
            }));
    }
    if (Array.isArray(tracks.audio)) {
        nextTracks.audio = tracks.audio.map((track)=>migrateTrack({
                track
            }));
    }
    return {
        ...scene,
        tracks: nextTracks
    };
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element.animations)) {
        return element;
    }
    const nextAnimations = migrateAnimations({
        animations: element.animations
    });
    if (nextAnimations === element.animations) {
        return element;
    }
    return {
        ...element,
        animations: nextAnimations
    };
}
function migrateAnimations({ animations }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.bindings) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.channels)) {
        return animations;
    }
    const positionBinding = animations.bindings["transform.position"];
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(positionBinding) || positionBinding.kind !== "vector2") {
        return animations;
    }
    const xChannel = animations.channels["transform.position:x"];
    const yChannel = animations.channels["transform.position:y"];
    const nextBindings = {
        ...animations.bindings
    };
    const nextChannels = {
        ...animations.channels
    };
    delete nextBindings["transform.position"];
    delete nextChannels["transform.position:x"];
    delete nextChannels["transform.position:y"];
    nextBindings["transform.positionX"] = {
        path: "transform.positionX",
        kind: "number",
        components: [
            {
                key: "value",
                channelId: "transform.positionX:value"
            }
        ]
    };
    nextBindings["transform.positionY"] = {
        path: "transform.positionY",
        kind: "number",
        components: [
            {
                key: "value",
                channelId: "transform.positionY:value"
            }
        ]
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(xChannel)) {
        nextChannels["transform.positionX:value"] = xChannel;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(yChannel)) {
        nextChannels["transform.positionY:value"] = yChannel;
    }
    return {
        ...animations,
        bindings: nextBindings,
        channels: nextChannels
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v24-to-v25.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V24toV25Migration",
    ()=>V24toV25Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v24$2d$to$2d$v25$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v24-to-v25.ts [app-client] (ecmascript)");
;
;
class V24toV25Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 24;
    to = 25;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v24$2d$to$2d$v25$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV24ToV25"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v25-to-v26.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV25ToV26",
    ()=>transformProjectV25ToV26
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV25ToV26({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 26) {
        return {
            project,
            skipped: true,
            reason: "already v26"
        };
    }
    if (version !== 25) {
        return {
            project,
            skipped: true,
            reason: "not v25"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 26
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    if (!Array.isArray(project.scenes)) {
        return project;
    }
    return {
        ...project,
        scenes: project.scenes.map((scene)=>migrateScene({
                scene
            }))
    };
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const tracks = scene.tracks;
    // Already in the correct shape — nothing to repair
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks) && Array.isArray(tracks.overlay) && Array.isArray(tracks.audio)) {
        return scene;
    }
    // Reconstruct the flat track array from whatever broken state it's in.
    // v24-to-v25 spread a flat array into a numeric-keyed object, so
    // Object.values recovers the original elements. A true flat array is
    // also handled for safety.
    let trackArray;
    if (Array.isArray(tracks)) {
        trackArray = tracks;
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks)) {
        trackArray = Object.values(tracks);
    } else {
        trackArray = [];
    }
    const mainTrack = findMainTrack({
        tracks: trackArray
    });
    const finalMainTrack = mainTrack ?? buildEmptyMainTrack();
    return {
        ...scene,
        tracks: {
            main: migrateTrack({
                track: finalMainTrack
            }),
            overlay: trackArray.filter((track)=>track !== mainTrack).map((track)=>migrateTrack({
                    track
                })).filter((track)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) && track.type !== "audio"),
            audio: trackArray.map((track)=>migrateTrack({
                    track
                })).filter((track)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) && track.type === "audio")
        }
    };
}
function findMainTrack({ tracks }) {
    for (const track of tracks){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) continue;
        if (track.type === "video" && track.isMain === true) return track;
    }
    for (const track of tracks){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) continue;
        if (track.type === "video") return track;
    }
    return null;
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track)) return track;
    const nextTrack = {
        ...track
    };
    delete nextTrack.isMain;
    return nextTrack;
}
function buildEmptyMainTrack() {
    return {
        id: crypto.randomUUID(),
        name: "Main",
        type: "video",
        elements: [],
        muted: false,
        hidden: false
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v25-to-v26.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V25toV26Migration",
    ()=>V25toV26Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v25$2d$to$2d$v26$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v25-to-v26.ts [app-client] (ecmascript)");
;
;
class V25toV26Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 25;
    to = 26;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v25$2d$to$2d$v26$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV25ToV26"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v26-to-v27.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV26ToV27",
    ()=>transformProjectV26ToV27
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function isFreeformPathPoint(value) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(value)) {
        return false;
    }
    return typeof value.id === "string" && typeof value.x === "number" && typeof value.y === "number" && typeof value.inX === "number" && typeof value.inY === "number" && typeof value.outX === "number" && typeof value.outY === "number";
}
function parseFreeformPath({ path }) {
    if (!path) {
        return [];
    }
    try {
        const parsed = JSON.parse(path);
        return Array.isArray(parsed) ? parsed.filter(isFreeformPathPoint) : [];
    } catch  {
        return [];
    }
}
function transformProjectV26ToV27({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 27) {
        return {
            project,
            skipped: true,
            reason: "already v27"
        };
    }
    if (version !== 26) {
        return {
            project,
            skipped: true,
            reason: "not v26"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 27
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    if (!Array.isArray(project.scenes)) {
        return project;
    }
    return {
        ...project,
        scenes: project.scenes.map((scene)=>migrateScene({
                scene
            }))
    };
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene.tracks)) {
        return scene;
    }
    const tracks = scene.tracks;
    const nextTracks = {
        ...tracks
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks.main)) {
        nextTracks.main = migrateTrack({
            track: tracks.main
        });
    }
    if (Array.isArray(tracks.overlay)) {
        nextTracks.overlay = tracks.overlay.map((track)=>migrateTrack({
                track
            }));
    }
    if (Array.isArray(tracks.audio)) {
        nextTracks.audio = tracks.audio.map((track)=>migrateTrack({
                track
            }));
    }
    return {
        ...scene,
        tracks: nextTracks
    };
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || !Array.isArray(element.masks)) {
        return element;
    }
    return {
        ...element,
        masks: element.masks.map((mask)=>migrateMask({
                mask
            }))
    };
}
function migrateMask({ mask }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask) || mask.type !== "custom" || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask.params)) {
        return mask;
    }
    const path = mask.params.path;
    if (typeof path !== "string") {
        return mask;
    }
    return {
        ...mask,
        params: {
            ...mask.params,
            path: parseFreeformPath({
                path
            })
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v26-to-v27.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V26toV27Migration",
    ()=>V26toV27Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v26$2d$to$2d$v27$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v26-to-v27.ts [app-client] (ecmascript)");
;
;
class V26toV27Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 26;
    to = 27;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v26$2d$to$2d$v27$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV26ToV27"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v27-to-v28.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "transformProjectV27ToV28",
    ()=>transformProjectV27ToV28
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function transformProjectV27ToV28({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 28) {
        return {
            project,
            skipped: true,
            reason: "already v28"
        };
    }
    if (version !== 27) {
        return {
            project,
            skipped: true,
            reason: "not v27"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 28
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    const nextProject = {
        ...project
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.metadata)) {
        nextProject.metadata = migrateTimeFields({
            record: project.metadata,
            keys: [
                "duration"
            ]
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(project.timelineViewState)) {
        nextProject.timelineViewState = migrateTimeFields({
            record: project.timelineViewState,
            keys: [
                "playheadTime"
            ]
        });
    }
    if (Array.isArray(project.scenes)) {
        nextProject.scenes = project.scenes.map((scene)=>migrateScene({
                scene
            }));
    }
    return nextProject;
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const nextScene = {
        ...scene
    };
    if (Array.isArray(scene.bookmarks)) {
        nextScene.bookmarks = scene.bookmarks.map((bookmark)=>migrateBookmark({
                bookmark
            }));
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene.tracks)) {
        nextScene.tracks = migrateTracks({
            tracks: scene.tracks
        });
    }
    return nextScene;
}
function migrateTracks({ tracks }) {
    const nextTracks = {
        ...tracks
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks.main)) {
        nextTracks.main = migrateTrack({
            track: tracks.main
        });
    }
    if (Array.isArray(tracks.overlay)) {
        nextTracks.overlay = tracks.overlay.map((track)=>migrateTrack({
                track
            }));
    }
    if (Array.isArray(tracks.audio)) {
        nextTracks.audio = tracks.audio.map((track)=>migrateTrack({
                track
            }));
    }
    return nextTracks;
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) {
        return element;
    }
    const nextElement = migrateTimeFields({
        record: element,
        keys: [
            "duration",
            "startTime",
            "trimStart",
            "trimEnd",
            "sourceDuration"
        ]
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element.animations)) {
        nextElement.animations = migrateAnimations({
            animations: element.animations
        });
    }
    return nextElement;
}
function migrateAnimations({ animations }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.channels)) {
        return animations;
    }
    return {
        ...animations,
        channels: Object.fromEntries(Object.entries(animations.channels).map(([channelId, channel])=>[
                channelId,
                migrateAnimationChannel({
                    channel
                })
            ]))
    };
}
function migrateAnimationChannel({ channel }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(channel) || !Array.isArray(channel.keys)) {
        return channel;
    }
    return {
        ...channel,
        keys: channel.keys.map((keyframe)=>migrateAnimationKeyframe({
                keyframe
            }))
    };
}
function migrateAnimationKeyframe({ keyframe }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe)) {
        return keyframe;
    }
    const nextKeyframe = migrateTimeFields({
        record: keyframe,
        keys: [
            "time"
        ]
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe.leftHandle)) {
        nextKeyframe.leftHandle = migrateTimeFields({
            record: keyframe.leftHandle,
            keys: [
                "dt"
            ]
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(keyframe.rightHandle)) {
        nextKeyframe.rightHandle = migrateTimeFields({
            record: keyframe.rightHandle,
            keys: [
                "dt"
            ]
        });
    }
    return nextKeyframe;
}
function migrateBookmark({ bookmark }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(bookmark)) {
        return bookmark;
    }
    return migrateTimeFields({
        record: bookmark,
        keys: [
            "time",
            "duration"
        ]
    });
}
function migrateTimeFields({ record, keys }) {
    const nextRecord = {
        ...record
    };
    for (const key of keys){
        if (!(key in record)) {
            continue;
        }
        nextRecord[key] = normalizeMediaTimeValue({
            value: record[key]
        });
    }
    return nextRecord;
}
function normalizeMediaTimeValue({ value }) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        return value;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
        time: value
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/storage/migrations/v27-to-v28.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "V27toV28Migration",
    ()=>V27toV28Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v27-to-v28.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class V27toV28Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 27;
    to = 28;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV27ToV28"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/storage/migrations/transformers/v28-to-v29.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV28ToV29",
    ()=>transformProjectV28ToV29
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV28ToV29({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 29) {
        return {
            project,
            skipped: true,
            reason: "already v29"
        };
    }
    if (version !== 28) {
        return {
            project,
            skipped: true,
            reason: "not v28"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 29
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    const nextProject = {
        ...project
    };
    if (Array.isArray(project.scenes)) {
        nextProject.scenes = project.scenes.map((scene)=>migrateScene({
                scene
            }));
    }
    return nextProject;
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const nextScene = {
        ...scene
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene.tracks)) {
        nextScene.tracks = migrateTracks({
            tracks: scene.tracks
        });
    }
    return nextScene;
}
function migrateTracks({ tracks }) {
    const nextTracks = {
        ...tracks
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks.main)) {
        nextTracks.main = migrateTrack({
            track: tracks.main
        });
    }
    if (Array.isArray(tracks.overlay)) {
        nextTracks.overlay = tracks.overlay.map((track)=>migrateTrack({
                track
            }));
    }
    if (Array.isArray(tracks.audio)) {
        nextTracks.audio = tracks.audio.map((track)=>migrateTrack({
                track
            }));
    }
    return nextTracks;
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element)) {
        return element;
    }
    const nextElement = {
        ...element
    };
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element.params) ? {
        ...element.params
    } : {};
    copyTransformParams({
        source: element,
        params
    });
    copyPrimitiveParam({
        source: element,
        params,
        sourceKey: "opacity",
        paramKey: "opacity"
    });
    copyPrimitiveParam({
        source: element,
        params,
        sourceKey: "blendMode",
        paramKey: "blendMode"
    });
    if (element.type === "audio" || element.type === "video") {
        copyPrimitiveParam({
            source: element,
            params,
            sourceKey: "volume",
            paramKey: "volume"
        });
        copyPrimitiveParam({
            source: element,
            params,
            sourceKey: "muted",
            paramKey: "muted"
        });
    }
    if (element.type === "text") {
        copyTextParams({
            source: element,
            params
        });
    }
    nextElement.params = params;
    return nextElement;
}
function copyTransformParams({ source, params }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(source.transform)) {
        return;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(source.transform.position)) {
        copyPrimitiveParam({
            source: source.transform.position,
            params,
            sourceKey: "x",
            paramKey: "transform.positionX"
        });
        copyPrimitiveParam({
            source: source.transform.position,
            params,
            sourceKey: "y",
            paramKey: "transform.positionY"
        });
    }
    copyPrimitiveParam({
        source: source.transform,
        params,
        sourceKey: "scaleX",
        paramKey: "transform.scaleX"
    });
    copyPrimitiveParam({
        source: source.transform,
        params,
        sourceKey: "scaleY",
        paramKey: "transform.scaleY"
    });
    copyPrimitiveParam({
        source: source.transform,
        params,
        sourceKey: "rotate",
        paramKey: "transform.rotate"
    });
}
function copyTextParams({ source, params }) {
    for (const key of [
        "content",
        "fontSize",
        "fontFamily",
        "color",
        "textAlign",
        "fontWeight",
        "fontStyle",
        "textDecoration",
        "letterSpacing",
        "lineHeight"
    ]){
        copyPrimitiveParam({
            source,
            params,
            sourceKey: key,
            paramKey: key
        });
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(source.background)) {
        return;
    }
    for (const key of [
        "enabled",
        "color",
        "cornerRadius",
        "paddingX",
        "paddingY",
        "offsetX",
        "offsetY"
    ]){
        copyPrimitiveParam({
            source: source.background,
            params,
            sourceKey: key,
            paramKey: `background.${key}`
        });
    }
}
function copyPrimitiveParam({ source, params, sourceKey, paramKey }) {
    const value = source[sourceKey];
    if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") {
        params[paramKey] = value;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v28-to-v29.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V28toV29Migration",
    ()=>V28toV29Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v28$2d$to$2d$v29$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v28-to-v29.ts [app-client] (ecmascript)");
;
;
class V28toV29Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 28;
    to = 29;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v28$2d$to$2d$v29$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV28ToV29"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v29-to-v30.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV29ToV30",
    ()=>transformProjectV29ToV30
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV29ToV30({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 30) {
        return {
            project,
            skipped: true,
            reason: "already v30"
        };
    }
    if (version !== 29) {
        return {
            project,
            skipped: true,
            reason: "not v29"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 30
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    const nextProject = {
        ...project
    };
    if (Array.isArray(project.scenes)) {
        nextProject.scenes = project.scenes.map((scene)=>migrateScene({
                scene
            }));
    }
    return nextProject;
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const nextScene = {
        ...scene
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene.tracks)) {
        nextScene.tracks = migrateTracks({
            tracks: scene.tracks
        });
    }
    return nextScene;
}
function migrateTracks({ tracks }) {
    const nextTracks = {
        ...tracks
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks.main)) {
        nextTracks.main = migrateTrack({
            track: tracks.main
        });
    }
    if (Array.isArray(tracks.overlay)) {
        nextTracks.overlay = tracks.overlay.map((track)=>migrateTrack({
                track
            }));
    }
    if (Array.isArray(tracks.audio)) {
        nextTracks.audio = tracks.audio.map((track)=>migrateTrack({
                track
            }));
    }
    return nextTracks;
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element.animations)) {
        return element;
    }
    return {
        ...element,
        animations: migrateAnimations({
            animations: element.animations
        })
    };
}
function migrateAnimations({ animations }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.bindings) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(animations.channels)) {
        return animations;
    }
    const channels = animations.channels;
    const nextAnimations = {
        ...animations
    };
    for (const binding of Object.values(animations.bindings)){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(binding) || typeof binding.path !== "string") {
            continue;
        }
        if (!Array.isArray(binding.components)) {
            continue;
        }
        const componentEntries = binding.components.flatMap((component)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(component) || typeof component.key !== "string" || typeof component.channelId !== "string") {
                return [];
            }
            const channel = channels[component.channelId];
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(channel)) {
                return [];
            }
            return [
                [
                    component.key,
                    migrateChannel({
                        channel
                    })
                ]
            ];
        });
        if (componentEntries.length === 0) {
            continue;
        }
        nextAnimations[binding.path] = componentEntries.length === 1 && componentEntries[0]?.[0] === "value" ? componentEntries[0][1] : Object.fromEntries(componentEntries);
    }
    return nextAnimations;
}
function migrateChannel({ channel }) {
    const { kind: _kind, ...nextChannel } = channel;
    return nextChannel;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v29-to-v30.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V29toV30Migration",
    ()=>V29toV30Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v29$2d$to$2d$v30$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v29-to-v30.ts [app-client] (ecmascript)");
;
;
class V29toV30Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 29;
    to = 30;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v29$2d$to$2d$v30$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV29ToV30"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/transformers/v30-to-v31.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformProjectV30ToV31",
    ()=>transformProjectV30ToV31
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
function transformProjectV30ToV31({ project }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
        project
    })) {
        return {
            project,
            skipped: true,
            reason: "no project id"
        };
    }
    const version = project.version;
    if (typeof version !== "number") {
        return {
            project,
            skipped: true,
            reason: "invalid version"
        };
    }
    if (version >= 31) {
        return {
            project,
            skipped: true,
            reason: "already v31"
        };
    }
    if (version !== 30) {
        return {
            project,
            skipped: true,
            reason: "not v30"
        };
    }
    return {
        project: {
            ...migrateProject({
                project
            }),
            version: 31
        },
        skipped: false
    };
}
function migrateProject({ project }) {
    const nextProject = {
        ...project
    };
    if (Array.isArray(project.scenes)) {
        nextProject.scenes = project.scenes.map((scene)=>migrateScene({
                scene
            }));
    }
    return nextProject;
}
function migrateScene({ scene }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene)) {
        return scene;
    }
    const nextScene = {
        ...scene
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(scene.tracks)) {
        nextScene.tracks = migrateTracks({
            tracks: scene.tracks
        });
    }
    return nextScene;
}
function migrateTracks({ tracks }) {
    const nextTracks = {
        ...tracks
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(tracks.main)) {
        nextTracks.main = migrateTrack({
            track: tracks.main
        });
    }
    if (Array.isArray(tracks.overlay)) {
        nextTracks.overlay = tracks.overlay.map((track)=>migrateTrack({
                track
            }));
    }
    if (Array.isArray(tracks.audio)) {
        nextTracks.audio = tracks.audio.map((track)=>migrateTrack({
                track
            }));
    }
    return nextTracks;
}
function migrateTrack({ track }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(track) || !Array.isArray(track.elements)) {
        return track;
    }
    return {
        ...track,
        elements: track.elements.map((element)=>migrateElement({
                element
            }))
    };
}
function migrateElement({ element }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(element) || !Array.isArray(element.masks)) {
        return element;
    }
    return {
        ...element,
        masks: element.masks.map((mask)=>migrateMask({
                mask
            }))
    };
}
function migrateMask({ mask }) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(mask) || mask.type !== "custom") {
        return mask;
    }
    // "custom" is the only freeform-path mask type; a down-migration can map
    // type === "freeform" back to "custom" without any additional marker.
    return {
        ...mask,
        type: "freeform"
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/v30-to-v31.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "V30toV31Migration",
    ()=>V30toV31Migration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v30$2d$to$2d$v31$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/v30-to-v31.ts [app-client] (ecmascript)");
;
;
class V30toV31Migration extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageMigration"] {
    from = 30;
    to = 31;
    async run({ project }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$v30$2d$to$2d$v31$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProjectV30ToV31"])({
            project
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/runner.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runStorageMigrations",
    ()=>runStorageMigrations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/indexeddb-adapter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/transformers/utils.ts [app-client] (ecmascript)");
;
;
let hasCleanedUpMetaDb = false;
const MIN_MIGRATION_DISPLAY_MS = 1000;
async function runStorageMigrations({ migrations, onProgress }) {
    // One-time cleanup: delete the old global version database
    if (!hasCleanedUpMetaDb) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDatabase"])({
                dbName: "video-editor-meta"
            });
        } catch  {
        // Ignore errors - DB might not exist
        }
        hasCleanedUpMetaDb = true;
    }
    const projectsAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexedDBAdapter"]("video-editor-projects", "projects", 1);
    const projects = await projectsAdapter.getAll();
    const orderedMigrations = [
        ...migrations
    ].sort((a, b)=>a.from - b.from);
    let migratedCount = 0;
    let migrationStartTime = null;
    for (const project of projects){
        if (typeof project !== "object" || project === null) {
            continue;
        }
        let projectRecord = project;
        const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectId"])({
            project: projectRecord
        });
        if (!projectId) {
            continue;
        }
        let currentVersion = getProjectVersion({
            project: projectRecord
        });
        const targetVersion = orderedMigrations.at(-1)?.to ?? currentVersion;
        if (currentVersion >= targetVersion) {
            continue;
        }
        // Track when we first showed the migration dialog
        if (migrationStartTime === null) {
            migrationStartTime = Date.now();
        }
        const projectName = getProjectName({
            project: projectRecord
        });
        onProgress?.({
            isMigrating: true,
            fromVersion: currentVersion,
            toVersion: targetVersion,
            projectName
        });
        for (const migration of orderedMigrations){
            if (migration.from !== currentVersion) {
                continue;
            }
            const result = await migration.run({
                projectId,
                project: projectRecord
            });
            if (result.skipped) {
                break;
            }
            await projectsAdapter.set(projectId, result.project);
            migratedCount++;
            currentVersion = migration.to;
            projectRecord = result.project;
        }
    }
    // Ensure dialog is visible for minimum time so users can see it
    if (migrationStartTime !== null) {
        const elapsed = Date.now() - migrationStartTime;
        if (elapsed < MIN_MIGRATION_DISPLAY_MS) {
            await new Promise((resolve)=>setTimeout(resolve, MIN_MIGRATION_DISPLAY_MS - elapsed));
        }
    }
    onProgress?.({
        isMigrating: false,
        fromVersion: null,
        toVersion: null,
        projectName: null
    });
    return {
        migratedCount
    };
}
function getProjectVersion({ project }) {
    const versionValue = project.version;
    // v2 and up - has explicit version field
    if (typeof versionValue === "number") {
        return versionValue;
    }
    // v1 - has scenes array
    const scenesValue = project.scenes;
    if (Array.isArray(scenesValue) && scenesValue.length > 0) {
        return 1;
    }
    // v0 - no scenes
    return 0;
}
function getProjectName({ project }) {
    const metadata = project.metadata;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$transformers$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRecord"])(metadata) && typeof metadata.name === "string") {
        return metadata.name;
    }
    // v0 had name directly on project
    if (typeof project.name === "string") {
        return project.name;
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/migrations/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "CURRENT_PROJECT_VERSION",
    ()=>CURRENT_PROJECT_VERSION,
    "migrations",
    ()=>migrations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v0$2d$to$2d$v1$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v0-to-v1.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v1$2d$to$2d$v2$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v1-to-v2.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v2$2d$to$2d$v3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v2-to-v3.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v3$2d$to$2d$v4$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v3-to-v4.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v4$2d$to$2d$v5$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v4-to-v5.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v5$2d$to$2d$v6$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v5-to-v6.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v6$2d$to$2d$v7$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v6-to-v7.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v7$2d$to$2d$v8$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v7-to-v8.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v8$2d$to$2d$v9$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v8-to-v9.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v9$2d$to$2d$v10$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v9-to-v10.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v10$2d$to$2d$v11$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v10-to-v11.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v11$2d$to$2d$v12$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v11-to-v12.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v12$2d$to$2d$v13$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v12-to-v13.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v13$2d$to$2d$v14$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v13-to-v14.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v14$2d$to$2d$v15$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v14-to-v15.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v15$2d$to$2d$v16$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v15-to-v16.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v16$2d$to$2d$v17$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v16-to-v17.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v17$2d$to$2d$v18$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v17-to-v18.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v18$2d$to$2d$v19$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v18-to-v19.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v19$2d$to$2d$v20$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v19-to-v20.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v20$2d$to$2d$v21$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v20-to-v21.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v21$2d$to$2d$v22$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v21-to-v22.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v22$2d$to$2d$v23$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v22-to-v23.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v23$2d$to$2d$v24$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v23-to-v24.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v24$2d$to$2d$v25$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v24-to-v25.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v25$2d$to$2d$v26$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v25-to-v26.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v26$2d$to$2d$v27$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v26-to-v27.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v27-to-v28.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v28$2d$to$2d$v29$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v28-to-v29.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v29$2d$to$2d$v30$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v29-to-v30.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v30$2d$to$2d$v31$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/v30-to-v31.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$runner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/runner.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
const CURRENT_PROJECT_VERSION = 31;
const migrations = [
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v0$2d$to$2d$v1$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V0toV1Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v1$2d$to$2d$v2$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V1toV2Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v2$2d$to$2d$v3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V2toV3Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v3$2d$to$2d$v4$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V3toV4Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v4$2d$to$2d$v5$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V4toV5Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v5$2d$to$2d$v6$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V5toV6Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v6$2d$to$2d$v7$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V6toV7Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v7$2d$to$2d$v8$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V7toV8Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v8$2d$to$2d$v9$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V8toV9Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v9$2d$to$2d$v10$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V9toV10Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v10$2d$to$2d$v11$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V10toV11Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v11$2d$to$2d$v12$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V11toV12Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v12$2d$to$2d$v13$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V12toV13Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v13$2d$to$2d$v14$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V13toV14Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v14$2d$to$2d$v15$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V14toV15Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v15$2d$to$2d$v16$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V15toV16Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v16$2d$to$2d$v17$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V16toV17Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v17$2d$to$2d$v18$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V17toV18Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v18$2d$to$2d$v19$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V18toV19Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v19$2d$to$2d$v20$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V19toV20Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v20$2d$to$2d$v21$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V20toV21Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v21$2d$to$2d$v22$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V21toV22Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v22$2d$to$2d$v23$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V22toV23Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v23$2d$to$2d$v24$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V23toV24Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v24$2d$to$2d$v25$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V24toV25Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v25$2d$to$2d$v26$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V25toV26Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v26$2d$to$2d$v27$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V26toV27Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v27$2d$to$2d$v28$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V27toV28Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v28$2d$to$2d$v29$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V28toV29Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v29$2d$to$2d$v30$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V29toV30Migration"](),
    new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$v30$2d$to$2d$v31$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["V30toV31Migration"]()
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/storage/service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "StorageService",
    ()=>StorageService,
    "storageService",
    ()=>storageService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/scenes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/indexeddb-adapter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$opfs$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/opfs-adapter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$quota$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/quota.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$runner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/migrations/runner.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function normalizeBookmarks({ raw }) {
    if (!Array.isArray(raw)) return [];
    return raw.map((item)=>{
        if (typeof item === "number") {
            return {
                time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                    time: item
                })
            };
        }
        const obj = item;
        if (typeof obj !== "object" || obj === null || typeof obj.time !== "number") {
            return null;
        }
        return {
            time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                time: obj.time
            }),
            ...typeof obj.note === "string" && {
                note: obj.note
            },
            ...typeof obj.color === "string" && {
                color: obj.color
            },
            ...typeof obj.duration === "number" && {
                duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                    time: obj.duration
                })
            }
        };
    }).filter((b)=>b !== null);
}
class StorageService {
    projectsAdapter;
    savedSoundsAdapter;
    config;
    migrationsPromise = null;
    constructor(){
        this.config = {
            projectsDb: "video-editor-projects",
            mediaDb: "video-editor-media",
            savedSoundsDb: "video-editor-saved-sounds",
            version: 1
        };
        this.projectsAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexedDBAdapter"]({
            dbName: this.config.projectsDb,
            storeName: "projects",
            version: this.config.version
        });
        this.savedSoundsAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexedDBAdapter"]({
            dbName: this.config.savedSoundsDb,
            storeName: "saved-sounds",
            version: this.config.version
        });
    }
    async ensureMigrations() {
        if (this.migrationsPromise) {
            await this.migrationsPromise;
            return;
        }
        this.migrationsPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$runner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runStorageMigrations"])({
            migrations: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$migrations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["migrations"]
        }).then(()=>undefined);
        await this.migrationsPromise;
    }
    getProjectMediaAdapters({ projectId }) {
        const mediaMetadataAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$indexeddb$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexedDBAdapter"]({
            dbName: `${this.config.mediaDb}-${projectId}`,
            storeName: "media-metadata",
            version: this.config.version
        });
        const mediaAssetsAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$opfs$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPFSAdapter"](`media-files-${projectId}`);
        return {
            mediaMetadataAdapter,
            mediaAssetsAdapter
        };
    }
    async canStoreFile({ size }) {
        const quotaStatus = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$quota$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStorageQuotaStatus"])();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$quota$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluateStorageCapacity"])({
            requiredBytes: size,
            quotaStatus
        });
    }
    isQuotaExceededError({ error }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$quota$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStorageQuotaExceededError"])({
            error
        });
    }
    stripAudioBuffers({ tracks }) {
        return {
            ...tracks,
            audio: tracks.audio.map((track)=>({
                    ...track,
                    elements: track.elements.map((element)=>{
                        const { buffer: _buffer, ...rest } = element;
                        return rest;
                    })
                }))
        };
    }
    async saveProject({ project }) {
        const duration = project.metadata.duration ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectDurationFromScenes"])({
            scenes: project.scenes
        });
        const serializedScenes = project.scenes.map((scene)=>({
                id: scene.id,
                name: scene.name,
                isMain: scene.isMain,
                tracks: this.stripAudioBuffers({
                    tracks: scene.tracks
                }),
                bookmarks: scene.bookmarks,
                createdAt: scene.createdAt.toISOString(),
                updatedAt: scene.updatedAt.toISOString()
            }));
        const serializedProject = {
            metadata: {
                id: project.metadata.id,
                name: project.metadata.name,
                thumbnail: project.metadata.thumbnail,
                duration,
                createdAt: project.metadata.createdAt.toISOString(),
                updatedAt: project.metadata.updatedAt.toISOString()
            },
            scenes: serializedScenes,
            currentSceneId: project.currentSceneId,
            settings: project.settings,
            version: project.version,
            timelineViewState: project.timelineViewState
        };
        await this.projectsAdapter.set({
            key: project.metadata.id,
            value: serializedProject
        });
    }
    async loadProject({ id }) {
        await this.ensureMigrations();
        const serializedProject = await this.projectsAdapter.get(id);
        if (!serializedProject) return null;
        if (typeof serializedProject !== "object" || serializedProject === null || typeof serializedProject.metadata !== "object" || serializedProject.metadata === null) {
            console.warn("[storage] Skipping malformed project entry (missing metadata):", {
                id,
                entry: serializedProject
            });
            return null;
        }
        const scenes = serializedProject.scenes?.map((scene)=>({
                id: scene.id,
                name: scene.name,
                isMain: scene.isMain,
                tracks: scene.tracks,
                bookmarks: normalizeBookmarks({
                    raw: scene.bookmarks
                }),
                createdAt: new Date(scene.createdAt),
                updatedAt: new Date(scene.updatedAt)
            })) ?? [];
        const project = {
            metadata: {
                id: serializedProject.metadata.id,
                name: serializedProject.metadata.name,
                thumbnail: serializedProject.metadata.thumbnail,
                duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                    time: serializedProject.metadata.duration ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectDurationFromScenes"])({
                        scenes
                    })
                }),
                createdAt: new Date(serializedProject.metadata.createdAt),
                updatedAt: new Date(serializedProject.metadata.updatedAt)
            },
            scenes,
            currentSceneId: serializedProject.currentSceneId || "",
            settings: serializedProject.settings,
            version: serializedProject.version,
            timelineViewState: serializedProject.timelineViewState
        };
        return {
            project
        };
    }
    async loadAllProjects() {
        const projectIds = await this.projectsAdapter.list();
        const projects = [];
        for (const id of projectIds){
            const result = await this.loadProject({
                id
            });
            if (result?.project) {
                projects.push(result.project);
            }
        }
        return projects.sort((a, b)=>b.metadata.updatedAt.getTime() - a.metadata.updatedAt.getTime());
    }
    async loadAllProjectsMetadata() {
        await this.ensureMigrations();
        const serializedProjects = await this.projectsAdapter.getAll();
        const metadata = [];
        for (const serializedProject of serializedProjects){
            if (typeof serializedProject !== "object" || serializedProject === null || typeof serializedProject.metadata !== "object" || serializedProject.metadata === null) {
                console.warn("[storage] Skipping malformed project entry (missing metadata):", serializedProject);
                continue;
            }
            metadata.push({
                id: serializedProject.metadata.id,
                name: serializedProject.metadata.name,
                thumbnail: serializedProject.metadata.thumbnail,
                duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                    time: serializedProject.metadata.duration ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectDurationFromScenes"])({
                        scenes: serializedProject.scenes ?? []
                    })
                }),
                createdAt: new Date(serializedProject.metadata.createdAt),
                updatedAt: new Date(serializedProject.metadata.updatedAt)
            });
        }
        return metadata.sort((a, b)=>b.updatedAt.getTime() - a.updatedAt.getTime());
    }
    async deleteProject({ id }) {
        await this.projectsAdapter.remove(id);
    }
    async saveMediaAsset({ projectId, mediaAsset }) {
        const { mediaMetadataAdapter, mediaAssetsAdapter } = this.getProjectMediaAdapters({
            projectId
        });
        const metadata = {
            id: mediaAsset.id,
            name: mediaAsset.name,
            type: mediaAsset.type,
            size: mediaAsset.file.size,
            lastModified: mediaAsset.file.lastModified,
            width: mediaAsset.width,
            height: mediaAsset.height,
            duration: mediaAsset.duration,
            thumbnailUrl: mediaAsset.thumbnailUrl,
            ephemeral: mediaAsset.ephemeral
        };
        try {
            await mediaAssetsAdapter.set({
                key: mediaAsset.id,
                value: mediaAsset.file
            });
            await mediaMetadataAdapter.set({
                key: mediaAsset.id,
                value: metadata
            });
        } catch (error) {
            try {
                await mediaAssetsAdapter.remove(mediaAsset.id);
            } catch  {
            // Ignore cleanup failures so the original storage error is preserved.
            }
            if (this.isQuotaExceededError({
                error
            })) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$quota$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StorageQuotaExceededError"]({
                    requiredBytes: mediaAsset.file.size
                });
            }
            throw error;
        }
    }
    async loadMediaAsset({ projectId, id }) {
        const { mediaMetadataAdapter, mediaAssetsAdapter } = this.getProjectMediaAdapters({
            projectId
        });
        const [file, metadata] = await Promise.all([
            mediaAssetsAdapter.get(id),
            mediaMetadataAdapter.get(id)
        ]);
        if (!file || !metadata) return null;
        let url;
        if (metadata.type === "image" && (!file.type || file.type === "")) {
            try {
                const text = await file.text();
                if (text.trim().startsWith("<svg")) {
                    const svgBlob = new Blob([
                        text
                    ], {
                        type: "image/svg+xml"
                    });
                    url = URL.createObjectURL(svgBlob);
                } else {
                    url = URL.createObjectURL(file);
                }
            } catch  {
                url = URL.createObjectURL(file);
            }
        } else {
            url = URL.createObjectURL(file);
        }
        return {
            id: metadata.id,
            name: metadata.name,
            type: metadata.type,
            file,
            url,
            width: metadata.width,
            height: metadata.height,
            duration: metadata.duration,
            thumbnailUrl: metadata.thumbnailUrl,
            ephemeral: metadata.ephemeral
        };
    }
    async loadAllMediaAssets({ projectId }) {
        const { mediaMetadataAdapter } = this.getProjectMediaAdapters({
            projectId
        });
        const mediaIds = await mediaMetadataAdapter.list();
        const mediaItems = [];
        for (const id of mediaIds){
            const item = await this.loadMediaAsset({
                projectId,
                id
            });
            if (item) {
                mediaItems.push(item);
            }
        }
        return mediaItems;
    }
    async deleteMediaAsset({ projectId, id }) {
        const { mediaMetadataAdapter, mediaAssetsAdapter } = this.getProjectMediaAdapters({
            projectId
        });
        await Promise.all([
            mediaAssetsAdapter.remove(id),
            mediaMetadataAdapter.remove(id)
        ]);
    }
    async deleteProjectMedia({ projectId }) {
        const { mediaMetadataAdapter, mediaAssetsAdapter } = this.getProjectMediaAdapters({
            projectId
        });
        await Promise.all([
            mediaMetadataAdapter.clear(),
            mediaAssetsAdapter.clear()
        ]);
    }
    async clearAllData() {
        await this.projectsAdapter.clear();
    // project-specific media and timelines cleaned up when projects are deleted
    }
    async getStorageInfo() {
        const projectIds = await this.projectsAdapter.list();
        return {
            projects: projectIds.length,
            isOPFSSupported: this.isOPFSSupported(),
            isIndexedDBSupported: this.isIndexedDBSupported()
        };
    }
    async getProjectStorageInfo({ projectId }) {
        const { mediaMetadataAdapter } = this.getProjectMediaAdapters({
            projectId
        });
        const mediaIds = await mediaMetadataAdapter.list();
        return {
            mediaItems: mediaIds.length
        };
    }
    async loadSavedSounds() {
        try {
            const savedSoundsData = await this.savedSoundsAdapter.get("user-sounds");
            return savedSoundsData || {
                sounds: [],
                lastModified: new Date().toISOString()
            };
        } catch (error) {
            console.error("Failed to load saved sounds:", error);
            return {
                sounds: [],
                lastModified: new Date().toISOString()
            };
        }
    }
    async saveSoundEffect({ soundEffect }) {
        try {
            const currentData = await this.loadSavedSounds();
            if (currentData.sounds.some((sound)=>sound.id === soundEffect.id)) {
                return; // Already saved
            }
            const savedSound = {
                id: soundEffect.id,
                name: soundEffect.name,
                username: soundEffect.username,
                previewUrl: soundEffect.previewUrl,
                downloadUrl: soundEffect.downloadUrl,
                duration: soundEffect.duration,
                tags: soundEffect.tags,
                license: soundEffect.license,
                savedAt: new Date().toISOString()
            };
            const updatedData = {
                sounds: [
                    ...currentData.sounds,
                    savedSound
                ],
                lastModified: new Date().toISOString()
            };
            await this.savedSoundsAdapter.set({
                key: "user-sounds",
                value: updatedData
            });
        } catch (error) {
            console.error("Failed to save sound effect:", error);
            throw error;
        }
    }
    async removeSavedSound({ soundId }) {
        try {
            const currentData = await this.loadSavedSounds();
            const updatedData = {
                sounds: currentData.sounds.filter((sound)=>sound.id !== soundId),
                lastModified: new Date().toISOString()
            };
            await this.savedSoundsAdapter.set({
                key: "user-sounds",
                value: updatedData
            });
        } catch (error) {
            console.error("Failed to remove saved sound:", error);
            throw error;
        }
    }
    async isSoundSaved({ soundId }) {
        try {
            const currentData = await this.loadSavedSounds();
            return currentData.sounds.some((sound)=>sound.id === soundId);
        } catch (error) {
            console.error("Failed to check if sound is saved:", error);
            return false;
        }
    }
    async clearSavedSounds() {
        try {
            await this.savedSoundsAdapter.remove("user-sounds");
        } catch (error) {
            console.error("Failed to clear saved sounds:", error);
            throw error;
        }
    }
    isOPFSSupported() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$opfs$2d$adapter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPFSAdapter"].isSupported();
    }
    isIndexedDBSupported() {
        return "indexedDB" in window;
    }
    isFullySupported() {
        return this.isIndexedDBSupported() && this.isOPFSSupported();
    }
}
const storageService = new StorageService();
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/video-cache/service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoCache",
    ()=>VideoCache,
    "videoCache",
    ()=>videoCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2d$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/input-format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$sink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/media-sink.js [app-client] (ecmascript)");
;
class VideoCache {
    sinks = new Map();
    initPromises = new Map();
    frameChain = new Map();
    seekGenerations = new Map();
    async getFrameAt({ mediaId, file, time }) {
        await this.ensureSink({
            mediaId,
            file
        });
        const sinkData = this.sinks.get(mediaId);
        if (!sinkData) return null;
        const generation = (this.seekGenerations.get(mediaId) ?? 0) + 1;
        this.seekGenerations.set(mediaId, generation);
        const previous = this.frameChain.get(mediaId) ?? Promise.resolve();
        const current = previous.then(()=>{
            if (this.seekGenerations.get(mediaId) !== generation) {
                return sinkData.currentFrame ?? null;
            }
            return this.resolveFrame({
                sinkData,
                time
            });
        });
        this.frameChain.set(mediaId, current.catch(()=>{}));
        return current;
    }
    async resolveFrame({ sinkData, time }) {
        if (sinkData.nextFrame && sinkData.nextFrame.timestamp <= time) {
            sinkData.currentFrame = sinkData.nextFrame;
            sinkData.nextFrame = null;
            this.startPrefetch({
                sinkData
            });
        }
        if (sinkData.currentFrame && this.isFrameValid({
            frame: sinkData.currentFrame,
            time
        })) {
            if (!sinkData.nextFrame && !sinkData.prefetching) {
                this.startPrefetch({
                    sinkData
                });
            }
            return sinkData.currentFrame;
        }
        if (sinkData.iterator && sinkData.currentFrame && time >= sinkData.lastTime && time < sinkData.lastTime + 2.0) {
            const frame = await this.iterateToTime({
                sinkData,
                targetTime: time
            });
            if (frame) {
                if (!sinkData.nextFrame && !sinkData.prefetching) {
                    this.startPrefetch({
                        sinkData
                    });
                }
                return frame;
            }
        }
        const frame = await this.seekToTime({
            sinkData,
            time
        });
        if (frame && !sinkData.nextFrame && !sinkData.prefetching) {
            this.startPrefetch({
                sinkData
            });
        }
        return frame;
    }
    isFrameValid({ frame, time }) {
        return time >= frame.timestamp && time < frame.timestamp + frame.duration;
    }
    async iterateToTime({ sinkData, targetTime }) {
        if (!sinkData.iterator) return null;
        try {
            while(true){
                // Wait for any pending prefetch to finish before touching iterator
                if (sinkData.prefetching && sinkData.prefetchPromise) {
                    await sinkData.prefetchPromise;
                }
                // Check if the nextFrame (which might have just arrived) is what we need
                if (sinkData.nextFrame && sinkData.nextFrame.timestamp <= targetTime + 0.05 // Tolerance
                ) {
                    sinkData.currentFrame = sinkData.nextFrame;
                    sinkData.nextFrame = null;
                } else {
                    const { value: frame, done } = await sinkData.iterator.next();
                    if (done || !frame) break;
                    sinkData.currentFrame = frame;
                }
                const frame = sinkData.currentFrame;
                if (!frame) break;
                sinkData.lastTime = frame.timestamp;
                if (this.isFrameValid({
                    frame,
                    time: targetTime
                })) {
                    return frame;
                }
                if (frame.timestamp > targetTime + 1.0) break;
            }
        } catch (error) {
            console.warn("Iterator failed, will restart:", error);
            sinkData.iterator = null;
        }
        return null;
    }
    async seekToTime({ sinkData, time }) {
        try {
            if (sinkData.prefetching && sinkData.prefetchPromise) {
                await sinkData.prefetchPromise;
            }
            if (sinkData.iterator) {
                await sinkData.iterator.return();
                sinkData.iterator = null;
            }
            sinkData.nextFrame = null;
            sinkData.iterator = sinkData.sink.canvases(time);
            sinkData.lastTime = time;
            // Fetch current frame
            const { value: frame } = await sinkData.iterator.next();
            if (frame) {
                sinkData.currentFrame = frame;
                this.startPrefetch({
                    sinkData
                });
                return frame;
            }
        } catch (error) {
            console.warn("Failed to seek video:", error);
        }
        return null;
    }
    startPrefetch({ sinkData }) {
        if (sinkData.prefetching || !sinkData.iterator || sinkData.nextFrame) {
            return;
        }
        sinkData.prefetching = true;
        sinkData.prefetchPromise = this.prefetchNextFrame({
            sinkData
        });
    }
    async prefetchNextFrame({ sinkData }) {
        if (!sinkData.iterator) {
            sinkData.prefetching = false;
            sinkData.prefetchPromise = null;
            return;
        }
        try {
            const { value: frame, done } = await sinkData.iterator.next();
            if (done || !frame) {
                sinkData.prefetching = false;
                sinkData.prefetchPromise = null;
                return;
            }
            sinkData.nextFrame = frame;
            sinkData.prefetching = false;
            sinkData.prefetchPromise = null;
        } catch (error) {
            console.warn("Prefetch failed:", error);
            sinkData.prefetching = false;
            sinkData.prefetchPromise = null;
            sinkData.iterator = null;
        }
    }
    async ensureSink({ mediaId, file }) {
        if (this.sinks.has(mediaId)) return;
        if (this.initPromises.has(mediaId)) {
            await this.initPromises.get(mediaId);
            return;
        }
        const initPromise = this.initializeSink({
            mediaId,
            file
        });
        this.initPromises.set(mediaId, initPromise);
        try {
            await initPromise;
        } finally{
            this.initPromises.delete(mediaId);
        }
    }
    async initializeSink({ mediaId, file }) {
        const input = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"]({
            source: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlobSource"](file),
            formats: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2d$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_FORMATS"]
        });
        try {
            const videoTrack = await input.getPrimaryVideoTrack();
            if (!videoTrack) {
                throw new Error("No video track found");
            }
            const canDecode = await videoTrack.canDecode();
            if (!canDecode) {
                throw new Error("Video codec not supported for decoding");
            }
            const sink = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$sink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasSink"](videoTrack, {
                poolSize: 3,
                fit: "contain"
            });
            this.sinks.set(mediaId, {
                input,
                sink,
                iterator: null,
                currentFrame: null,
                nextFrame: null,
                lastTime: -1,
                prefetching: false,
                prefetchPromise: null
            });
        } catch (error) {
            input.dispose();
            console.error(`Failed to initialize video sink for ${mediaId}:`, error);
            throw error;
        }
    }
    clearVideo({ mediaId }) {
        const sinkData = this.sinks.get(mediaId);
        if (sinkData) {
            if (sinkData.iterator) {
                void sinkData.iterator.return();
            }
            sinkData.input.dispose();
            this.sinks.delete(mediaId);
        }
        this.initPromises.delete(mediaId);
        this.frameChain.delete(mediaId);
        this.seekGenerations.delete(mediaId);
    }
    clearAll() {
        for (const [mediaId] of this.sinks){
            this.clearVideo({
                mediaId
            });
        }
    }
    getStats() {
        return {
            totalSinks: this.sinks.size,
            activeSinks: Array.from(this.sinks.values()).filter((s)=>s.iterator).length,
            cachedFrames: Array.from(this.sinks.values()).filter((s)=>s.currentFrame).length
        };
    }
}
const videoCache = new VideoCache();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/waveform-cache/service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "WaveformCache",
    ()=>WaveformCache,
    "waveformCache",
    ()=>waveformCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/audio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$waveform$2d$summary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/waveform-summary.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
class WaveformCache {
    summaries = new Map();
    getSourceSummary({ sourceKey, audioBuffer, sourceFile, audioUrl }) {
        const existing = this.summaries.get(sourceKey);
        if (existing) {
            return existing;
        }
        const promise = this.buildSummary({
            sourceKey,
            audioBuffer,
            sourceFile,
            audioUrl
        }).catch((error)=>{
            this.summaries.delete(sourceKey);
            throw error;
        });
        this.summaries.set(sourceKey, promise);
        return promise;
    }
    clearSource({ sourceKey }) {
        this.summaries.delete(sourceKey);
    }
    clearAll() {
        this.summaries.clear();
    }
    async buildSummary({ sourceKey, audioBuffer, sourceFile, audioUrl }) {
        if (audioBuffer) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$waveform$2d$summary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSourceWaveformSummary"])({
                sourceKey,
                buffer: audioBuffer
            });
        }
        let arrayBuffer = null;
        if (sourceFile) {
            arrayBuffer = await sourceFile.arrayBuffer();
        } else if (audioUrl) {
            const response = await fetch(audioUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch waveform source: ${response.status}`);
            }
            arrayBuffer = await response.arrayBuffer();
        }
        if (!arrayBuffer) {
            throw new Error(`No waveform source available for ${sourceKey}`);
        }
        const audioContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAudioContext"])();
        try {
            const buffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$waveform$2d$summary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSourceWaveformSummary"])({
                sourceKey,
                buffer
            });
        } finally{
            void audioContext.close();
        }
    }
}
const waveformCache = new WaveformCache();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/nodes/base-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseNode",
    ()=>BaseNode
]);
class BaseNode {
    params;
    resolved = null;
    constructor(params){
        this.params = params ?? {};
    }
    children = [];
    add(child) {
        this.children.push(child);
        return this;
    }
    remove(child) {
        this.children = this.children.filter((c)=>c !== child);
        return this;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/root-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RootNode",
    ()=>RootNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/base-node.ts [app-client] (ecmascript)");
;
class RootNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseNode"] {
    get duration() {
        return this.params.duration ?? 0;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/visual-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VisualNode",
    ()=>VisualNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/base-node.ts [app-client] (ecmascript)");
;
class VisualNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseNode"] {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/video-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoNode",
    ()=>VideoNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/visual-node.ts [app-client] (ecmascript)");
;
class VideoNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualNode"] {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/image-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageNode",
    ()=>ImageNode,
    "loadImageSource",
    ()=>loadImageSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/visual-node.ts [app-client] (ecmascript)");
;
const imageSourceCache = new Map();
function loadImageSource({ url, maxSourceSize }) {
    const cacheKey = `${url}::${maxSourceSize ?? "full"}`;
    const cached = imageSourceCache.get(cacheKey);
    if (cached) return cached;
    const promise = (async ()=>{
        const image = new Image();
        await new Promise((resolve, reject)=>{
            image.onload = ()=>resolve();
            image.onerror = ()=>reject(new Error("Image load failed"));
            image.src = url;
        });
        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;
        const exceedsLimit = maxSourceSize && (naturalWidth > maxSourceSize || naturalHeight > maxSourceSize);
        if (exceedsLimit) {
            const scale = Math.min(maxSourceSize / naturalWidth, maxSourceSize / naturalHeight);
            const scaledWidth = Math.round(naturalWidth * scale);
            const scaledHeight = Math.round(naturalHeight * scale);
            const offscreen = new OffscreenCanvas(scaledWidth, scaledHeight);
            const ctx = offscreen.getContext("2d");
            if (ctx) {
                ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);
                return {
                    source: offscreen,
                    width: scaledWidth,
                    height: scaledHeight
                };
            }
        }
        return {
            source: image,
            width: naturalWidth,
            height: naturalHeight
        };
    })();
    imageSourceCache.set(cacheKey, promise);
    return promise;
}
class ImageNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualNode"] {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/text-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TextNode",
    ()=>TextNode,
    "renderTextToContext",
    ()=>renderTextToContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/base-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/primitives.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class TextNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseNode"] {
}
function renderTextToContext({ node, ctx }) {
    const resolved = node.resolved;
    if (!resolved) {
        return;
    }
    const x = resolved.transform.position.x + node.params.canvasCenter.x;
    const y = resolved.transform.position.y + node.params.canvasCenter.y;
    const baseline = node.params.textBaseline ?? "middle";
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(resolved.transform.scaleX, resolved.transform.scaleY);
    if (resolved.transform.rotate) {
        ctx.rotate(resolved.transform.rotate * Math.PI / 180);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawMeasuredTextLayout"])({
        ctx,
        layout: resolved.measuredText,
        textColor: resolved.textColor,
        background: resolved.measuredText.resolvedBackground,
        backgroundColor: resolved.backgroundColor,
        textBaseline: baseline
    });
    ctx.restore();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/nodes/sticker-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "StickerNode",
    ()=>StickerNode,
    "loadStickerSource",
    ()=>loadStickerSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/resolver.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/visual-node.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const stickerSourceCache = new Map();
function loadStickerSource({ stickerId }) {
    const cached = stickerSourceCache.get(stickerId);
    if (cached) return cached;
    const promise = (async ()=>{
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStickerId"])({
            stickerId,
            options: {
                width: 200,
                height: 200
            }
        });
        const image = new Image();
        await new Promise((resolve, reject)=>{
            image.onload = ()=>resolve();
            image.onerror = ()=>reject(new Error(`Failed to load sticker: ${stickerId}`));
            image.src = url;
        });
        return {
            source: image,
            width: image.naturalWidth,
            height: image.naturalHeight
        };
    })();
    stickerSourceCache.set(stickerId, promise);
    return promise;
}
class StickerNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualNode"] {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/canvas-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCanvasSurface",
    ()=>createCanvasSurface
]);
function createCanvasSurface({ width, height }) {
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("Failed to create 2D rendering context");
    }
    return {
        canvas,
        context
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/graphic-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GraphicNode",
    ()=>GraphicNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/canvas-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/visual-node.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
class GraphicNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$visual$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualNode"] {
    cachedKey = null;
    cachedSource = null;
    constructor(params){
        super(params);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerDefaultGraphics"])();
    }
    getSource({ resolvedParams }) {
        const definition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getGraphicDefinition"])({
            definitionId: this.params.definitionId
        });
        const cacheKey = JSON.stringify({
            definitionId: this.params.definitionId,
            params: resolvedParams
        });
        if (this.cachedSource && this.cachedKey === cacheKey) {
            return this.cachedSource;
        }
        const { canvas, context } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCanvasSurface"])({
            width: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"]
        });
        definition.render({
            ctx: context,
            params: resolvedParams,
            width: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"],
            height: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"]
        });
        this.cachedKey = cacheKey;
        this.cachedSource = canvas;
        return canvas;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/nodes/color-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorNode",
    ()=>ColorNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/base-node.ts [app-client] (ecmascript)");
;
class ColorNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseNode"] {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/blur-background-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlurBackgroundNode",
    ()=>BlurBackgroundNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/base-node.ts [app-client] (ecmascript)");
;
class BlurBackgroundNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseNode"] {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/nodes/effect-layer-node.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EffectLayerNode",
    ()=>EffectLayerNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/base-node.ts [app-client] (ecmascript)");
;
class EffectLayerNode extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$base$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseNode"] {
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/renderer/scene-builder.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildScene",
    ()=>buildScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$root$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/root-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$video$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/video-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/image-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/text-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/sticker-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/graphic-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$color$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/color-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$blur$2d$background$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/blur-background-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$effect$2d$layer$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/effect-layer-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$background$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/background/blur.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/index.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
const PREVIEW_MAX_IMAGE_SIZE = 2048;
function getVisibleSortedElements({ track }) {
    return track.elements.filter((element)=>!("hidden" in element && element.hidden)).slice().sort((a, b)=>{
        if (a.startTime !== b.startTime) return a.startTime - b.startTime;
        return a.id.localeCompare(b.id);
    });
}
function buildTrackNodes({ tracks, mediaMap, canvasSize, isPreview }) {
    const nodes = [];
    for (const track of tracks){
        const elements = getVisibleSortedElements({
            track
        });
        for (const element of elements){
            if (element.type === "effect") {
                nodes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$effect$2d$layer$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectLayerNode"]({
                    effectType: element.effectType,
                    effectParams: element.params,
                    timeOffset: element.startTime,
                    duration: element.duration
                }));
                continue;
            }
            if (element.type === "video" || element.type === "image") {
                const mediaAsset = mediaMap.get(element.mediaId);
                if (!mediaAsset?.file || !mediaAsset?.url) {
                    continue;
                }
                if (element.type === "video" && mediaAsset.type === "video") {
                    nodes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$video$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoNode"]({
                        mediaId: mediaAsset.id,
                        url: mediaAsset.url,
                        file: mediaAsset.file,
                        duration: element.duration,
                        timeOffset: element.startTime,
                        trimStart: element.trimStart,
                        trimEnd: element.trimEnd,
                        retime: element.retime,
                        transform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                            params: element.params
                        }),
                        animations: element.animations,
                        opacity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readOpacityFromParams"])({
                            params: element.params
                        }),
                        blendMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBlendModeFromParams"])({
                            params: element.params
                        }),
                        effects: element.effects ?? [],
                        masks: element.masks ?? []
                    }));
                }
                if (element.type === "image" && mediaAsset.type === "image") {
                    nodes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageNode"]({
                        url: mediaAsset.url,
                        duration: element.duration,
                        timeOffset: element.startTime,
                        trimStart: element.trimStart,
                        trimEnd: element.trimEnd,
                        transform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                            params: element.params
                        }),
                        animations: element.animations,
                        opacity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readOpacityFromParams"])({
                            params: element.params
                        }),
                        blendMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBlendModeFromParams"])({
                            params: element.params
                        }),
                        effects: element.effects ?? [],
                        masks: element.masks ?? [],
                        ...isPreview && {
                            maxSourceSize: PREVIEW_MAX_IMAGE_SIZE
                        }
                    }));
                }
            }
            if (element.type === "text") {
                nodes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextNode"]({
                    ...element,
                    transform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                        params: element.params
                    }),
                    opacity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readOpacityFromParams"])({
                        params: element.params
                    }),
                    blendMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBlendModeFromParams"])({
                        params: element.params
                    }),
                    canvasCenter: {
                        x: canvasSize.width / 2,
                        y: canvasSize.height / 2
                    },
                    canvasHeight: canvasSize.height,
                    textBaseline: "middle",
                    effects: element.effects ?? []
                }));
            }
            if (element.type === "sticker") {
                nodes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StickerNode"]({
                    stickerId: element.stickerId,
                    intrinsicWidth: element.intrinsicWidth,
                    intrinsicHeight: element.intrinsicHeight,
                    duration: element.duration,
                    timeOffset: element.startTime,
                    trimStart: element.trimStart,
                    trimEnd: element.trimEnd,
                    transform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                        params: element.params
                    }),
                    animations: element.animations,
                    opacity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readOpacityFromParams"])({
                        params: element.params
                    }),
                    blendMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBlendModeFromParams"])({
                        params: element.params
                    }),
                    effects: element.effects ?? []
                }));
            }
            if (element.type === "graphic") {
                nodes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphicNode"]({
                    definitionId: element.definitionId,
                    params: element.params,
                    duration: element.duration,
                    timeOffset: element.startTime,
                    trimStart: element.trimStart,
                    trimEnd: element.trimEnd,
                    transform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                        params: element.params
                    }),
                    animations: element.animations,
                    opacity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readOpacityFromParams"])({
                        params: element.params
                    }),
                    blendMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBlendModeFromParams"])({
                        params: element.params
                    }),
                    effects: element.effects ?? [],
                    masks: element.masks ?? []
                }));
            }
        }
    }
    return nodes;
}
function buildBlurBackgroundNodes({ track, mediaMap, blurIntensity }) {
    if (!track) {
        return [];
    }
    const nodes = [];
    const elements = getVisibleSortedElements({
        track
    });
    for (const element of elements){
        if (element.type !== "video" && element.type !== "image") {
            continue;
        }
        const mediaAsset = mediaMap.get(element.mediaId);
        if (!mediaAsset?.file || !mediaAsset?.url || mediaAsset.type !== "video" && mediaAsset.type !== "image") {
            continue;
        }
        nodes.push(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$blur$2d$background$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurBackgroundNode"]({
            mediaId: mediaAsset.id,
            url: mediaAsset.url,
            file: mediaAsset.file,
            mediaType: mediaAsset.type,
            duration: element.duration,
            timeOffset: element.startTime,
            trimStart: element.trimStart,
            trimEnd: element.trimEnd,
            retime: element.type === "video" ? element.retime : undefined,
            blurIntensity
        }));
    }
    return nodes;
}
function buildScene({ canvasSize, tracks, mediaAssets, duration, background, isPreview }) {
    const rootNode = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$root$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootNode"]({
        duration
    });
    const mediaMap = new Map(mediaAssets.map((m)=>[
            m.id,
            m
        ]));
    const visibleTracks = [
        ...tracks.overlay.filter((track)=>!("hidden" in track && track.hidden)),
        ...!tracks.main.hidden ? [
            tracks.main
        ] : []
    ];
    const orderedTracksBottomToTop = visibleTracks.slice().reverse();
    const mainTrack = tracks.main.hidden ? undefined : tracks.main;
    const allNodes = buildTrackNodes({
        tracks: orderedTracksBottomToTop,
        mediaMap,
        canvasSize,
        isPreview
    });
    if (background.type === "blur") {
        const blurNodes = buildBlurBackgroundNodes({
            track: mainTrack,
            mediaMap,
            blurIntensity: background.blurIntensity ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$background$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BACKGROUND_BLUR_INTENSITY"]
        });
        for (const node of blurNodes){
            rootNode.add(node);
        }
    } else if (background.type === "color" && background.color !== "transparent") {
        rootNode.add(new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$color$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorNode"]({
            color: background.color
        }));
    }
    for (const node of allNodes){
        rootNode.add(node);
    }
    return rootNode;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/compositor/frame-descriptor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildFrameDescriptor",
    ()=>buildFrameDescriptor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$gradients$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/gradients/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$gradients$2f$canvas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/gradients/canvas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/masks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/diagnostics/render-perf.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/canvas-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$blur$2d$background$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/blur-background-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$color$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/color-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$effect$2d$layer$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/effect-layer-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/graphic-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/image-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$root$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/root-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/sticker-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/text-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$video$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/video-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/types.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
async function buildFrameDescriptor({ node, renderer }) {
    const items = [];
    const textures = new Map();
    await collectNode({
        node,
        renderer,
        path: "root",
        items,
        textures
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
        name: "frameItems",
        by: items.length
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
        name: "frameTextures",
        by: textures.size
    });
    return {
        frame: {
            width: renderer.width,
            height: renderer.height,
            clear: {
                color: [
                    0,
                    0,
                    0,
                    1
                ]
            },
            items
        },
        textures: [
            ...textures.values()
        ]
    };
}
async function collectNode({ node, renderer, path, items, textures }) {
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$root$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootNode"]) {
        for(let index = 0; index < node.children.length; index++){
            await collectNode({
                node: node.children[index],
                renderer,
                path: `${path}:${index}`,
                items,
                textures
            });
        }
        return;
    }
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$color$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorNode"]) {
        const textureId = `${path}:color`;
        const { width, height } = renderer;
        textures.set(textureId, {
            kind: "rendered",
            id: textureId,
            contentHash: `color:${node.params.color}:${width}x${height}`,
            width,
            height,
            draw: (ctx)=>{
                if (/gradient\(/i.test(node.params.color)) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$gradients$2f$canvas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawCssBackground"])({
                        ctx,
                        width,
                        height,
                        css: node.params.color
                    });
                } else {
                    ctx.fillStyle = node.params.color;
                    ctx.fillRect(0, 0, width, height);
                }
            }
        });
        items.push({
            type: "layer",
            textureId,
            transform: fullCanvasTransform(renderer),
            opacity: 1,
            blendMode: "normal",
            effectPassGroups: [],
            mask: null
        });
        return;
    }
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$effect$2d$layer$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectLayerNode"]) {
        if (!node.resolved || node.resolved.passes.length === 0) {
            return;
        }
        items.push({
            type: "sceneEffect",
            effectPassGroups: [
                node.resolved.passes
            ]
        });
        return;
    }
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$blur$2d$background$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurBackgroundNode"]) {
        if (!node.resolved) {
            return;
        }
        const textureId = `${path}:blur-background`;
        const { width, height } = renderer;
        const { backdropSource, passes } = node.resolved;
        // Backdrop pixels come from a decoded video/image frame whose identity
        // already changes when it changes. Hashing the source reference is
        // enough to let us skip redraws on frozen frames.
        const contentHash = `blur:${identityKey(backdropSource.source)}:${backdropSource.width}x${backdropSource.height}:${width}x${height}`;
        textures.set(textureId, {
            kind: "rendered",
            id: textureId,
            contentHash,
            width,
            height,
            draw: (ctx)=>{
                const coverScale = Math.max(width / backdropSource.width, height / backdropSource.height);
                const scaledWidth = backdropSource.width * coverScale;
                const scaledHeight = backdropSource.height * coverScale;
                const offsetX = (width - scaledWidth) / 2;
                const offsetY = (height - scaledHeight) / 2;
                ctx.drawImage(backdropSource.source, offsetX, offsetY, scaledWidth, scaledHeight);
            }
        });
        items.push({
            type: "layer",
            textureId,
            transform: fullCanvasTransform(renderer),
            opacity: 1,
            blendMode: "normal",
            effectPassGroups: [
                passes
            ],
            mask: null
        });
        return;
    }
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$video$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoNode"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageNode"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StickerNode"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphicNode"]) {
        await collectVisualSourceNode({
            node,
            renderer,
            path,
            items,
            textures
        });
        return;
    }
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextNode"]) {
        collectTextNode({
            node,
            renderer,
            path,
            items,
            textures
        });
    }
}
async function collectVisualSourceNode({ node, renderer, path, items, textures }) {
    if (!node.resolved) {
        return;
    }
    const source = node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphicNode"] ? node.getSource({
        resolvedParams: node.resolved.resolvedParams
    }) : node.resolved.source;
    if (!source) {
        return;
    }
    const sourceWidth = node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphicNode"] ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"] : node.resolved.sourceWidth;
    const sourceHeight = node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphicNode"] ? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"] : node.resolved.sourceHeight;
    const textureId = `${path}:source`;
    textures.set(textureId, {
        kind: "external",
        id: textureId,
        source,
        width: sourceWidth,
        height: sourceHeight
    });
    const transform = computeVisualTransform({
        renderer,
        resolved: node.resolved,
        sourceWidth,
        sourceHeight
    });
    const { mask, strokeLayer } = buildMaskArtifacts({
        node,
        renderer,
        path,
        transform,
        textures
    });
    items.push({
        type: "layer",
        textureId,
        transform,
        opacity: node.resolved.opacity,
        blendMode: node.params.blendMode ?? "normal",
        effectPassGroups: node.resolved.effectPasses,
        mask
    });
    if (strokeLayer) {
        items.push(strokeLayer);
    }
}
function collectTextNode({ node, renderer, path, items, textures }) {
    if (!node.resolved) {
        return;
    }
    const textureId = `${path}:text`;
    const { width, height } = renderer;
    // Text output is fully determined by node.params + node.resolved. Both are
    // plain data we can stringify cheaply; the resolved measured layout is the
    // expensive part of text setup, so stringifying it here is orders of
    // magnitude cheaper than re-rasterizing when nothing changed.
    const contentHash = `text:${width}x${height}:${JSON.stringify({
        params: node.params,
        resolved: node.resolved
    })}`;
    textures.set(textureId, {
        kind: "rendered",
        id: textureId,
        contentHash,
        width,
        height,
        draw: (ctx)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderTextToContext"])({
                node,
                ctx
            });
        }
    });
    items.push({
        type: "layer",
        textureId,
        transform: fullCanvasTransform(renderer),
        opacity: node.resolved.opacity,
        blendMode: node.params.blendMode ?? "normal",
        effectPassGroups: node.resolved.effectPasses,
        mask: null
    });
}
function computeVisualTransform({ renderer, resolved, sourceWidth, sourceHeight }) {
    const containScale = Math.min(renderer.width / sourceWidth, renderer.height / sourceHeight);
    const scaledWidth = sourceWidth * containScale * resolved.transform.scaleX;
    const scaledHeight = sourceHeight * containScale * resolved.transform.scaleY;
    const absWidth = Math.abs(scaledWidth);
    const absHeight = Math.abs(scaledHeight);
    return {
        centerX: renderer.width / 2 + resolved.transform.position.x,
        centerY: renderer.height / 2 + resolved.transform.position.y,
        width: absWidth,
        height: absHeight,
        rotationDegrees: resolved.transform.rotate,
        flipX: scaledWidth < 0,
        flipY: scaledHeight < 0
    };
}
function fullCanvasTransform(renderer) {
    return {
        centerX: renderer.width / 2,
        centerY: renderer.height / 2,
        width: renderer.width,
        height: renderer.height,
        rotationDegrees: 0,
        flipX: false,
        flipY: false
    };
}
function buildMaskArtifacts({ node, renderer, path, transform, textures }) {
    const mask = node.params.masks?.[0];
    if (!mask) {
        return {
            mask: null,
            strokeLayer: null
        };
    }
    const definition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMaskDefinition"])(mask.type);
    if (definition.isActive?.(mask.params) === false) {
        return {
            mask: null,
            strokeLayer: null
        };
    }
    const { body } = definition.renderer;
    const usesOpaqueFastPath = body.kind === "drawWithFeather" && mask.params.feather === 0 && Boolean(body.opaqueFastPath);
    // drawWithFeather renderers encode feathering analytically in their canvas output
    // (e.g. split mask uses a linear gradient instead of JFA). The descriptor feather is
    // zeroed so the GPU compositor copies the mask texture as-is and does not run a second
    // JFA feather pass on top of an already-soft texture.
    const feather = body.kind === "drawWithFeather" ? 0 : mask.params.feather;
    const maskTextureId = `${path}:mask`;
    const { width: canvasWidth, height: canvasHeight } = renderer;
    const maskContentHash = `mask:${mask.type}:${JSON.stringify(mask.params)}:${transformHash(transform)}:${canvasWidth}x${canvasHeight}:body=${body.kind}:fastPath=${usesOpaqueFastPath}`;
    const drawMask = (ctx)=>{
        const { canvas: elementMaskCanvas, context: elementMaskCtx } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCanvasSurface"])({
            width: Math.round(transform.width),
            height: Math.round(transform.height)
        });
        switch(body.kind){
            case "fillPath":
                {
                    const path2d = body.buildPath({
                        resolvedParams: mask.params,
                        width: transform.width,
                        height: transform.height
                    });
                    elementMaskCtx.fillStyle = "white";
                    elementMaskCtx.fill(path2d);
                    break;
                }
            case "drawOpaque":
                body.drawOpaque({
                    resolvedParams: mask.params,
                    ctx: elementMaskCtx,
                    width: Math.round(transform.width),
                    height: Math.round(transform.height)
                });
                break;
            case "drawWithFeather":
                if (usesOpaqueFastPath && body.opaqueFastPath) {
                    const path2d = body.opaqueFastPath.buildPath({
                        resolvedParams: mask.params,
                        width: transform.width,
                        height: transform.height
                    });
                    elementMaskCtx.fillStyle = "white";
                    elementMaskCtx.fill(path2d);
                } else {
                    body.drawWithFeather({
                        resolvedParams: mask.params,
                        ctx: elementMaskCtx,
                        width: Math.round(transform.width),
                        height: Math.round(transform.height),
                        feather: mask.params.feather
                    });
                }
                break;
        }
        drawTransformedCanvas({
            ctx,
            source: elementMaskCanvas,
            transform
        });
    };
    textures.set(maskTextureId, {
        kind: "rendered",
        id: maskTextureId,
        contentHash: maskContentHash,
        width: canvasWidth,
        height: canvasHeight,
        draw: drawMask
    });
    const stroke = definition.renderer.stroke;
    const hasStroke = mask.params.strokeWidth > 0 && Boolean(stroke);
    let strokeLayer = null;
    if (hasStroke && stroke) {
        const strokeTextureId = `${path}:mask-stroke`;
        const strokeContentHash = `stroke:${mask.type}:${JSON.stringify(mask.params)}:${transformHash(transform)}:${canvasWidth}x${canvasHeight}:stroke=${stroke.kind}`;
        const drawStroke = (ctx)=>{
            const { canvas: strokeCanvas, context: strokeCtx } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCanvasSurface"])({
                width: Math.round(transform.width),
                height: Math.round(transform.height)
            });
            switch(stroke.kind){
                case "renderStroke":
                    stroke.renderStroke({
                        resolvedParams: mask.params,
                        ctx: strokeCtx,
                        width: transform.width,
                        height: transform.height
                    });
                    break;
                case "strokeFromPath":
                    {
                        const strokePath = stroke.buildStrokePath({
                            resolvedParams: mask.params,
                            width: transform.width,
                            height: transform.height
                        });
                        strokeCtx.strokeStyle = mask.params.strokeColor;
                        strokeCtx.lineWidth = mask.params.strokeWidth;
                        strokeCtx.stroke(strokePath);
                        break;
                    }
            }
            drawTransformedCanvas({
                ctx,
                source: strokeCanvas,
                transform
            });
        };
        textures.set(strokeTextureId, {
            kind: "rendered",
            id: strokeTextureId,
            contentHash: strokeContentHash,
            width: canvasWidth,
            height: canvasHeight,
            draw: drawStroke
        });
        strokeLayer = {
            type: "layer",
            textureId: strokeTextureId,
            transform: fullCanvasTransform(renderer),
            opacity: 1,
            blendMode: "normal",
            effectPassGroups: [],
            mask: null
        };
    }
    return {
        mask: {
            textureId: maskTextureId,
            feather,
            inverted: mask.params.inverted
        },
        strokeLayer
    };
}
function drawTransformedCanvas({ ctx, source, transform }) {
    const x = transform.centerX - transform.width / 2;
    const y = transform.centerY - transform.height / 2;
    const flipX = transform.flipX ? -1 : 1;
    const flipY = transform.flipY ? -1 : 1;
    const requiresTransform = transform.rotationDegrees !== 0 || flipX !== 1 || flipY !== 1;
    ctx.save();
    if (requiresTransform) {
        ctx.translate(transform.centerX, transform.centerY);
        ctx.rotate(transform.rotationDegrees * Math.PI / 180);
        ctx.scale(flipX, flipY);
        ctx.translate(-transform.centerX, -transform.centerY);
    }
    ctx.drawImage(source, x, y, transform.width, transform.height);
    ctx.restore();
}
function transformHash(transform) {
    return `${transform.centerX}:${transform.centerY}:${transform.width}:${transform.height}:${transform.rotationDegrees}:${transform.flipX ? 1 : 0}:${transform.flipY ? 1 : 0}`;
}
// Stable identity key for CanvasImageSource. Using a WeakMap → counter keeps
// hash string length bounded and avoids holding sources alive.
const identityKeys = new WeakMap();
let nextIdentity = 1;
function identityKey(source) {
    if (typeof source === "object" && source !== null) {
        let key = identityKeys.get(source);
        if (key === undefined) {
            key = nextIdentity++;
            identityKeys.set(source, key);
        }
        return `@${key}`;
    }
    return "@?";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/compositor/wasm-compositor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "wasmCompositor",
    ()=>wasmCompositor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm_bg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/diagnostics/render-perf.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
class WasmCompositor {
    canvas = null;
    initializedSize = null;
    cache = new Map();
    ensureInitialized({ width, height }) {
        if (!this.canvas) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initCompositor"])(width, height);
            this.canvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCompositorCanvas"])();
            this.initializedSize = {
                width,
                height
            };
            return;
        }
        if (!this.initializedSize || this.initializedSize.width !== width || this.initializedSize.height !== height) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resizeCompositor"])(width, height);
            this.initializedSize = {
                width,
                height
            };
        }
    }
    getCanvas() {
        if (!this.canvas) {
            throw new Error("Compositor is not initialized");
        }
        return this.canvas;
    }
    syncTextures(textures) {
        const nextIds = new Set(textures.map((texture)=>texture.id));
        for (const previousId of this.cache.keys()){
            if (!nextIds.has(previousId)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["releaseTexture"])(previousId);
                this.cache.delete(previousId);
            }
        }
        for (const texture of textures){
            if (texture.kind === "external") {
                this.syncExternalTexture(texture);
            } else {
                this.syncRenderedTexture(texture);
            }
        }
    }
    render(frame) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderFrame"])(frame);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderPerfEnabled"])()) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recordWasmFrameProfile"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLastFrameProfile"])());
        }
    }
    syncExternalTexture(texture) {
        const previous = this.cache.get(texture.id);
        if (previous?.kind === "external" && previous.source === texture.source && previous.width === texture.width && previous.height === texture.height) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
                name: "textureCacheHit"
            });
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
            name: "textureUpload"
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
            name: "textureUploadPixels",
            by: texture.width * texture.height
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadTexture"])({
            id: texture.id,
            source: ensureOffscreenCanvas({
                source: texture.source,
                width: texture.width,
                height: texture.height,
                label: `texture upload ${texture.id}`
            }),
            width: texture.width,
            height: texture.height
        });
        this.cache.set(texture.id, {
            kind: "external",
            source: texture.source,
            width: texture.width,
            height: texture.height
        });
    }
    syncRenderedTexture(texture) {
        const previous = this.cache.get(texture.id);
        if (previous?.kind === "rendered" && previous.contentHash === texture.contentHash && previous.width === texture.width && previous.height === texture.height) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
                name: "textureCacheHit"
            });
            return;
        }
        const canvas = previous?.kind === "rendered" && previous.width === texture.width && previous.height === texture.height ? previous.canvas : createBackingCanvas({
            width: texture.width,
            height: texture.height
        });
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error(`Failed to get 2d context for texture ${texture.id}`);
        }
        ctx.clearRect(0, 0, texture.width, texture.height);
        texture.draw(ctx);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
            name: "textureUpload"
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementCounter"])({
            name: "textureUploadPixels",
            by: texture.width * texture.height
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadTexture"])({
            id: texture.id,
            source: canvas,
            width: texture.width,
            height: texture.height
        });
        this.cache.set(texture.id, {
            kind: "rendered",
            canvas,
            contentHash: texture.contentHash,
            width: texture.width,
            height: texture.height
        });
    }
}
const wasmCompositor = new WasmCompositor();
function createBackingCanvas({ width, height }) {
    if (typeof OffscreenCanvas === "undefined") {
        throw new Error("OffscreenCanvas is not supported in this environment");
    }
    return new OffscreenCanvas(width, height);
}
function ensureOffscreenCanvas({ source, width, height, label }) {
    if (source instanceof OffscreenCanvas) {
        return source;
    }
    if (typeof OffscreenCanvas === "undefined") {
        throw new Error(`OffscreenCanvas is required for ${label}`);
    }
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error(`Failed to get 2d context for ${label}`);
    }
    context.clearRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);
    return canvas;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/resolve.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "resolveRenderTree",
    ()=>resolveRenderTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/effect-param-channel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/definitions/blur.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/effects/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/retime/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/measure-element.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/values.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/animation-values.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$video$2d$cache$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/video-cache/service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$blur$2d$background$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/blur-background-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$effect$2d$layer$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/effect-layer-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/graphic-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/image-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/sticker-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/text-node.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$video$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/nodes/video-node.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
async function resolveRenderTree({ node, renderer, time }) {
    await resolveNode({
        node,
        context: {
            renderer,
            time
        }
    });
}
async function resolveNode({ node, context }) {
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$video$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoNode"]) {
        node.resolved = await resolveVideoNode({
            node,
            context
        });
    } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageNode"]) {
        node.resolved = await resolveImageNode({
            node,
            context
        });
    } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StickerNode"]) {
        node.resolved = await resolveStickerNode({
            node,
            context
        });
    } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$graphic$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphicNode"]) {
        node.resolved = resolveGraphicNode({
            node,
            context
        });
    } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$text$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextNode"]) {
        node.resolved = resolveTextNode({
            node,
            context
        });
    } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$blur$2d$background$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlurBackgroundNode"]) {
        node.resolved = await resolveBlurBackgroundNode({
            node,
            context
        });
    } else if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$effect$2d$layer$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectLayerNode"]) {
        node.resolved = resolveEffectLayerNode({
            node,
            context
        });
    }
    await Promise.all(node.children.map((child)=>resolveNode({
            node: child,
            context
        })));
}
function resolveEffectPassGroups({ effects, animations, localTime, width, height }) {
    return (effects ?? []).filter((effect)=>effect.enabled).map((effect)=>{
        const resolvedParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEffectParamsAtTime"])({
            effectId: effect.id,
            params: effect.params,
            animations,
            localTime
        });
        const definition = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectsRegistry"].get(effect.type);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveEffectPasses"])({
            definition,
            effectParams: resolvedParams,
            width,
            height
        });
    });
}
function resolveVisualState({ params, context, sourceWidth, sourceHeight }) {
    const clipTime = context.time - params.timeOffset;
    if (clipTime < 0 || clipTime >= params.duration) {
        return null;
    }
    const localTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getElementLocalTime"])({
        timelineTime: context.time,
        elementStartTime: params.timeOffset,
        elementDuration: params.duration
    });
    const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
        baseTransform: params.transform,
        animations: params.animations,
        localTime
    });
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveOpacityAtTime"])({
        baseOpacity: params.opacity,
        animations: params.animations,
        localTime
    });
    const containScale = Math.min(context.renderer.width / sourceWidth, context.renderer.height / sourceHeight);
    const effectWidth = Math.round(Math.abs(sourceWidth * containScale * transform.scaleX));
    const effectHeight = Math.round(Math.abs(sourceHeight * containScale * transform.scaleY));
    return {
        localTime,
        transform,
        opacity,
        effectPasses: resolveEffectPassGroups({
            effects: params.effects,
            animations: params.animations,
            localTime,
            width: effectWidth,
            height: effectHeight
        })
    };
}
async function resolveVideoNode({ node, context }) {
    const clipTime = context.time - node.params.timeOffset;
    if (clipTime < 0 || clipTime >= node.params.duration) {
        return null;
    }
    const sourceTimeTicks = node.params.trimStart + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
        clipTime,
        retime: node.params.retime
    });
    const frame = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$video$2d$cache$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["videoCache"].getFrameAt({
        mediaId: node.params.mediaId,
        file: node.params.file,
        time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
            time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                time: sourceTimeTicks
            })
        })
    });
    if (!frame) {
        return null;
    }
    const visualState = resolveVisualState({
        params: node.params,
        context,
        sourceWidth: frame.canvas.width,
        sourceHeight: frame.canvas.height
    });
    if (!visualState) {
        return null;
    }
    return {
        ...visualState,
        source: frame.canvas,
        sourceWidth: frame.canvas.width,
        sourceHeight: frame.canvas.height
    };
}
async function resolveImageNode({ node, context }) {
    const source = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadImageSource"])({
        url: node.params.url,
        maxSourceSize: node.params.maxSourceSize
    });
    const visualState = resolveVisualState({
        params: node.params,
        context,
        sourceWidth: source.width,
        sourceHeight: source.height
    });
    if (!visualState) {
        return null;
    }
    return {
        ...visualState,
        source: source.source,
        sourceWidth: source.width,
        sourceHeight: source.height
    };
}
async function resolveStickerNode({ node, context }) {
    const source = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$sticker$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStickerSource"])({
        stickerId: node.params.stickerId
    });
    const sourceWidth = node.params.intrinsicWidth ?? source.width;
    const sourceHeight = node.params.intrinsicHeight ?? source.height;
    const visualState = resolveVisualState({
        params: node.params,
        context,
        sourceWidth,
        sourceHeight
    });
    if (!visualState) {
        return null;
    }
    return {
        ...visualState,
        source: source.source,
        sourceWidth,
        sourceHeight
    };
}
function resolveGraphicNode({ node, context }) {
    const visualState = resolveVisualState({
        params: node.params,
        context,
        sourceWidth: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"],
        sourceHeight: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"]
    });
    if (!visualState) {
        return null;
    }
    return {
        ...visualState,
        resolvedParams: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveGraphicElementParamsAtTime"])({
            element: node.params,
            localTime: visualState.localTime
        })
    };
}
function resolveTextNode({ node, context }) {
    if (context.time < node.params.startTime || context.time >= node.params.startTime + node.params.duration) {
        return null;
    }
    const localTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getElementLocalTime"])({
        timelineTime: context.time,
        elementStartTime: node.params.startTime,
        elementDuration: node.params.duration
    });
    const background = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTextBackgroundFromElement"])({
        element: node.params
    });
    return {
        transform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
            baseTransform: node.params.transform,
            animations: node.params.animations,
            localTime
        }),
        opacity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveOpacityAtTime"])({
            baseOpacity: node.params.opacity,
            animations: node.params.animations,
            localTime
        }),
        textColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveColorAtTime"])({
            baseColor: typeof node.params.params.color === "string" ? node.params.params.color : "#ffffff",
            animations: node.params.animations,
            propertyPath: "color",
            localTime
        }),
        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveColorAtTime"])({
            baseColor: background.color,
            animations: node.params.animations,
            propertyPath: "background.color",
            localTime
        }),
        effectPasses: resolveEffectPassGroups({
            effects: node.params.effects,
            animations: node.params.animations,
            localTime,
            width: context.renderer.width,
            height: context.renderer.height
        }),
        measuredText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureTextElement"])({
            element: node.params,
            canvasHeight: node.params.canvasHeight,
            localTime,
            ctx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTextMeasurementContext"])()
        })
    };
}
async function resolveBlurBackgroundNode({ node, context }) {
    const clipTime = context.time - node.params.timeOffset;
    if (clipTime < 0 || clipTime >= node.params.duration) {
        return null;
    }
    const backdropSource = await resolveBackdropSource({
        node,
        clipTime
    });
    if (!backdropSource) {
        return null;
    }
    return {
        backdropSource,
        passes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildGaussianBlurPasses"])({
            sigmaX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intensityToSigma"])({
                intensity: node.params.blurIntensity,
                resolution: context.renderer.width,
                reference: 1920
            }),
            sigmaY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["intensityToSigma"])({
                intensity: node.params.blurIntensity,
                resolution: context.renderer.height,
                reference: 1080
            })
        })
    };
}
async function resolveBackdropSource({ node, clipTime }) {
    if (node.params.mediaType === "video") {
        const sourceTimeTicks = node.params.trimStart + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
            clipTime,
            retime: node.params.retime
        });
        const frame = await __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$video$2d$cache$2f$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["videoCache"].getFrameAt({
            mediaId: node.params.mediaId,
            file: node.params.file,
            time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
                time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                    time: sourceTimeTicks
                })
            })
        });
        if (!frame) {
            return null;
        }
        return {
            source: frame.canvas,
            width: frame.canvas.width,
            height: frame.canvas.height
        };
    }
    const source = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$nodes$2f$image$2d$node$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadImageSource"])({
        url: node.params.url
    });
    return {
        source: source.source,
        width: source.width,
        height: source.height
    };
}
function resolveEffectLayerNode({ node, context }) {
    const time = context.time;
    if (time < node.params.timeOffset - 1e-6 || time >= node.params.timeOffset + node.params.duration + 1e-6) {
        return null;
    }
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectsRegistry"].get(node.params.effectType);
    const passes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveEffectPasses"])({
        definition,
        effectParams: node.params.effectParams,
        width: context.renderer.width,
        height: context.renderer.height
    });
    if (passes.length === 0) {
        return null;
    }
    return {
        passes
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/canvas-renderer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "CanvasRenderer",
    ()=>CanvasRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/canvas-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$frame$2d$descriptor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/compositor/frame-descriptor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/compositor/wasm-compositor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/diagnostics/render-perf.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$frame$2d$descriptor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$frame$2d$descriptor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class CanvasRenderer {
    canvas;
    context;
    width;
    height;
    fps;
    constructor({ width, height, fps }){
        this.width = width;
        this.height = height;
        this.fps = fps;
        const surface = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCanvasSurface"])({
            width,
            height
        });
        this.canvas = surface.canvas;
        this.context = surface.context;
    }
    getOutputCanvas() {
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wasmCompositor"].ensureInitialized({
            width: this.width,
            height: this.height
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wasmCompositor"].getCanvas();
    }
    setSize({ width, height }) {
        this.width = width;
        this.height = height;
        const surface = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCanvasSurface"])({
            width,
            height
        });
        this.canvas = surface.canvas;
        this.context = surface.context;
    }
    async render({ node, time }) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureSpanAsync"])({
            name: "resolve",
            fn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveRenderTree"])({
                    node,
                    renderer: this,
                    time
                })
        });
        const { frame, textures } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureSpanAsync"])({
            name: "buildFrame",
            fn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$frame$2d$descriptor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFrameDescriptor"])({
                    node,
                    renderer: this
                })
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wasmCompositor"].ensureInitialized({
            width: this.width,
            height: this.height
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureSpanSync"])({
            name: "syncTextures",
            fn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wasmCompositor"].syncTextures(textures)
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureSpanSync"])({
            name: "renderFrame",
            fn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wasmCompositor"].render(frame)
        });
    }
    async renderToCanvas({ node, time, targetCanvas }) {
        await this.render({
            node,
            time
        });
        const ctx = targetCanvas.getContext("2d");
        if (!ctx) {
            throw new Error("Failed to get target canvas context");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureSpanSync"])({
            name: "drawImage",
            fn: ()=>ctx.drawImage(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$compositor$2f$wasm$2d$compositor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wasmCompositor"].getCanvas(), 0, 0, targetCanvas.width, targetCanvas.height)
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$diagnostics$2f$render$2d$perf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onRenderPerfFrameComplete"])();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/renderer/scene-exporter.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "SceneExporter",
    ()=>SceneExporter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$eventemitter3$40$5$2e$0$2e$4$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/eventemitter3@5.0.4/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$output$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/output.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$output$2d$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/output-format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/target.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/media-source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/encode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm_bg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fps/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/canvas-renderer.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const qualityMap = {
    low: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY_LOW"],
    medium: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY_MEDIUM"],
    high: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY_HIGH"],
    very_high: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUALITY_VERY_HIGH"]
};
class SceneExporter extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$eventemitter3$40$5$2e$0$2e$4$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"] {
    renderer;
    format;
    quality;
    shouldIncludeAudio;
    audioBuffer;
    isCancelled = false;
    constructor({ width, height, fps, format, quality, shouldIncludeAudio, audioBuffer }){
        super();
        this.renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasRenderer"]({
            width,
            height,
            fps
        });
        this.format = format;
        this.quality = quality;
        this.shouldIncludeAudio = shouldIncludeAudio ?? false;
        this.audioBuffer = audioBuffer;
    }
    cancel() {
        this.isCancelled = true;
    }
    async export({ rootNode }) {
        const fps = this.renderer.fps;
        const fpsFloat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fps$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameRateToFloat"])(fps);
        const ticksPerFrame = Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"] * fps.denominator / fps.numerator);
        const frameCount = Math.floor(rootNode.duration / ticksPerFrame);
        const outputFormat = this.format === "webm" ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$output$2d$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebMOutputFormat"]() : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$output$2d$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mp4OutputFormat"]();
        const output = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$output$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Output"]({
            format: outputFormat,
            target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferTarget"]()
        });
        const videoSource = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasSource"](this.renderer.getOutputCanvas(), {
            codec: this.format === "webm" ? "vp9" : "avc",
            bitrate: qualityMap[this.quality]
        });
        output.addVideoTrack(videoSource, {
            frameRate: fpsFloat
        });
        let audioSource = null;
        if (this.shouldIncludeAudio && this.audioBuffer) {
            let audioCodec = this.format === "webm" ? "opus" : "aac";
            if (audioCodec === "aac" && typeof AudioEncoder !== "undefined") {
                const { supported } = await AudioEncoder.isConfigSupported({
                    codec: "mp4a.40.2",
                    sampleRate: this.audioBuffer.sampleRate,
                    numberOfChannels: this.audioBuffer.numberOfChannels,
                    bitrate: 192000
                });
                if (!supported) audioCodec = "opus";
            }
            audioSource = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AudioBufferSource"]({
                codec: audioCodec,
                bitrate: qualityMap[this.quality]
            });
            output.addAudioTrack(audioSource);
        }
        await output.start();
        if (audioSource && this.audioBuffer) {
            await audioSource.add(this.audioBuffer);
            audioSource.close();
        }
        for(let i = 0; i < frameCount; i++){
            if (this.isCancelled) {
                await output.cancel();
                this.emit("cancelled");
                return null;
            }
            const timeTicks = i * ticksPerFrame;
            const timeSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
                time: timeTicks
            });
            await this.renderer.render({
                node: rootNode,
                time: timeTicks
            });
            await videoSource.add(timeSeconds, 1 / fpsFloat);
            this.emit("progress", i / frameCount);
        }
        if (this.isCancelled) {
            await output.cancel();
            this.emit("cancelled");
            return null;
        }
        videoSource.close();
        await output.finalize();
        this.emit("progress", 1);
        const buffer = output.target.buffer;
        if (!buffer) {
            this.emit("error", new Error("Failed to export video"));
            return null;
        }
        this.emit("complete", buffer);
        return buffer;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/services/storage/use-storage-persistence.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStoragePersistence",
    ()=>useStoragePersistence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const DISMISSED_KEY = "opencut-storage-persist-dismissed";
function isFirefox() {
    return navigator.userAgent.toLowerCase().includes("firefox");
}
function useStoragePersistence() {
    _s();
    const [showDialog, setShowDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useStoragePersistence.useEffect": ()=>{
            if (!navigator.storage?.persist) return;
            const run = {
                "useStoragePersistence.useEffect.run": async ()=>{
                    const alreadyPersisted = await navigator.storage.persisted();
                    if (alreadyPersisted) return;
                    const dismissed = localStorage.getItem(DISMISSED_KEY) === "true";
                    if (dismissed) return;
                    if (isFirefox()) {
                        setShowDialog(true);
                    } else {
                        await navigator.storage.persist();
                    }
                }
            }["useStoragePersistence.useEffect.run"];
            run();
        }
    }["useStoragePersistence.useEffect"], []);
    const onConfirm = async ()=>{
        setShowDialog(false);
        await navigator.storage.persist();
    };
    const onDismiss = ()=>{
        setShowDialog(false);
        localStorage.setItem(DISMISSED_KEY, "true");
    };
    return {
        showDialog,
        onConfirm,
        onDismiss
    };
}
_s(useStoragePersistence, "YOkl3NOB2/T+2YPwvVT+XinfTVU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoragePersistenceDialog",
    ()=>StoragePersistenceDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$use$2d$storage$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/storage/use-storage-persistence.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function StoragePersistenceDialog() {
    _s();
    const { showDialog, onConfirm, onDismiss } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$use$2d$storage$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoragePersistence"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: showDialog,
        onOpenChange: (open)=>!open && onDismiss(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: "Don't lose your projects"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                        lineNumber: 21,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                    lineNumber: 20,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBody"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-base text-muted-foreground",
                            children: "Your browser can automatically delete your projects when storage runs low."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                            lineNumber: 24,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-base text-muted-foreground",
                            children: "Allow OpenCut to protect them?"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                            lineNumber: 28,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                    lineNumber: 23,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: onDismiss,
                            children: "Not now"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                            lineNumber: 33,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onConfirm,
                            children: "Allow"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                            lineNumber: 36,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
                    lineNumber: 32,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
            lineNumber: 19,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/services/storage/components/storage-persistence-dialog.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, this);
}
_s(StoragePersistenceDialog, "YAIHTT9GlIP8SCcx3FbBQsHwDik=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$storage$2f$use$2d$storage$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoragePersistence"]
    ];
});
_c = StoragePersistenceDialog;
var _c;
__turbopack_context__.k.register(_c, "StoragePersistenceDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_services_b5f0a533._.js.map