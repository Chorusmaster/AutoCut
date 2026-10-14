(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/masks/freeform/path.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFreeformPath2D",
    ()=>buildFreeformPath2D,
    "buildFreeformSvgPath",
    ()=>buildFreeformSvgPath,
    "findClosestPointOnFreeformSegment",
    ()=>findClosestPointOnFreeformSegment,
    "freeformCanvasPointToLocal",
    ()=>freeformCanvasPointToLocal,
    "freeformLocalPointToCanvas",
    ()=>freeformLocalPointToCanvas,
    "getFreeformCanvasGeometry",
    ()=>getFreeformCanvasGeometry,
    "getFreeformCanvasSegments",
    ()=>getFreeformCanvasSegments,
    "getFreeformCenterCanvasPoint",
    ()=>getFreeformCenterCanvasPoint,
    "getFreeformLocalBounds",
    ()=>getFreeformLocalBounds,
    "getFreeformPathClosedStateAfterPointRemoval",
    ()=>getFreeformPathClosedStateAfterPointRemoval,
    "getFreeformSegmentCount",
    ()=>getFreeformSegmentCount,
    "insertPointIntoFreeformSegment",
    ()=>insertPointIntoFreeformSegment,
    "parseFreeformPath",
    ()=>parseFreeformPath,
    "recenterFreeformPath",
    ()=>recenterFreeformPath,
    "removeFreeformPathPoints",
    ()=>removeFreeformPathPoints,
    "serializeFreeformPath",
    ()=>serializeFreeformPath
]);
function isFreeformPathPoint(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    return "id" in value && typeof value.id === "string" && "x" in value && typeof value.x === "number" && "y" in value && typeof value.y === "number" && "inX" in value && typeof value.inX === "number" && "inY" in value && typeof value.inY === "number" && "outX" in value && typeof value.outX === "number" && "outY" in value && typeof value.outY === "number";
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
function serializeFreeformPath({ points }) {
    return JSON.stringify(points);
}
function removeFreeformPathPoints({ points, pointIds }) {
    if (pointIds.length === 0) {
        return points;
    }
    const pointIdsToRemove = new Set(pointIds);
    return points.filter((point)=>!pointIdsToRemove.has(point.id));
}
function getFreeformPathClosedStateAfterPointRemoval({ wasClosed, remainingPointCount }) {
    return wasClosed && remainingPointCount >= 3;
}
function rotatePoint({ x, y, rotationDegrees }) {
    const angleRad = rotationDegrees * Math.PI / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return {
        x: x * cos - y * sin,
        y: x * sin + y * cos
    };
}
function getFreeformCenterCanvasPoint({ centerX, centerY, bounds }) {
    return {
        x: bounds.cx + centerX * bounds.width,
        y: bounds.cy + centerY * bounds.height
    };
}
function freeformLocalPointToCanvas({ point, centerX, centerY, rotation, scale, bounds }) {
    const center = getFreeformCenterCanvasPoint({
        centerX,
        centerY,
        bounds
    });
    const scaledLocal = {
        x: point.x * bounds.width * scale,
        y: point.y * bounds.height * scale
    };
    const rotated = rotatePoint({
        x: scaledLocal.x,
        y: scaledLocal.y,
        rotationDegrees: rotation
    });
    return {
        x: center.x + rotated.x,
        y: center.y + rotated.y
    };
}
function freeformCanvasPointToLocal({ point, centerX, centerY, rotation, scale, bounds }) {
    const center = getFreeformCenterCanvasPoint({
        centerX,
        centerY,
        bounds
    });
    const translated = {
        x: point.x - center.x,
        y: point.y - center.y
    };
    const rotated = rotatePoint({
        x: translated.x,
        y: translated.y,
        rotationDegrees: -rotation
    });
    return {
        x: bounds.width === 0 ? 0 : rotated.x / (bounds.width * scale),
        y: bounds.height === 0 ? 0 : rotated.y / (bounds.height * scale)
    };
}
function getFreeformCanvasGeometry({ points, centerX, centerY, rotation, scale, bounds }) {
    const anchors = points.map((point)=>({
            id: point.id,
            anchor: freeformLocalPointToCanvas({
                point: {
                    x: point.x,
                    y: point.y
                },
                centerX,
                centerY,
                rotation,
                scale,
                bounds
            }),
            inHandle: freeformLocalPointToCanvas({
                point: {
                    x: point.x + point.inX,
                    y: point.y + point.inY
                },
                centerX,
                centerY,
                rotation,
                scale,
                bounds
            }),
            outHandle: freeformLocalPointToCanvas({
                point: {
                    x: point.x + point.outX,
                    y: point.y + point.outY
                },
                centerX,
                centerY,
                rotation,
                scale,
                bounds
            })
        }));
    const geometryPoints = anchors.flatMap((point)=>[
            point.anchor,
            point.inHandle,
            point.outHandle
        ]);
    if (geometryPoints.length === 0) {
        return {
            anchors,
            bounds: null
        };
    }
    const geometryBounds = getCanvasPointBounds({
        points: geometryPoints
    });
    return {
        anchors,
        bounds: geometryBounds
    };
}
function getCanvasPointBounds({ points }) {
    if (points.length === 0) {
        return null;
    }
    const [firstPoint, ...restPoints] = points;
    let minX = firstPoint.x;
    let maxX = firstPoint.x;
    let minY = firstPoint.y;
    let maxY = firstPoint.y;
    for (const point of restPoints){
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
    }
    return {
        minX,
        maxX,
        minY,
        maxY,
        width: Math.max(1, maxX - minX),
        height: Math.max(1, maxY - minY),
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2
    };
}
function clampUnit(value) {
    return Math.min(1, Math.max(0, value));
}
function getDistanceSquared({ a, b }) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
}
function lerpPoint({ a, b, t }) {
    return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t
    };
}
function evaluateCubicBezier({ p0, p1, p2, p3, t }) {
    const oneMinusT = 1 - t;
    return {
        x: oneMinusT ** 3 * p0.x + 3 * oneMinusT ** 2 * t * p1.x + 3 * oneMinusT * t ** 2 * p2.x + t ** 3 * p3.x,
        y: oneMinusT ** 3 * p0.y + 3 * oneMinusT ** 2 * t * p1.y + 3 * oneMinusT * t ** 2 * p2.y + t ** 3 * p3.y
    };
}
function getFreeformSegmentIndices({ points, segmentIndex, closed }) {
    const segmentCount = getFreeformSegmentCount({
        points,
        closed
    });
    if (segmentIndex < 0 || segmentIndex >= segmentCount) {
        return null;
    }
    return {
        startIndex: segmentIndex,
        endIndex: (segmentIndex + 1) % points.length
    };
}
function getFreeformSegmentCount({ points, closed }) {
    if (points.length < 2) {
        return 0;
    }
    return closed ? points.length : points.length - 1;
}
function getFreeformCanvasSegments({ points, centerX, centerY, rotation, scale, bounds, closed }) {
    const geometry = getFreeformCanvasGeometry({
        points,
        centerX,
        centerY,
        rotation,
        scale,
        bounds
    });
    const segmentCount = getFreeformSegmentCount({
        points,
        closed
    });
    return Array.from({
        length: segmentCount
    }, (_, segmentIndex)=>{
        const start = geometry.anchors[segmentIndex];
        const end = geometry.anchors[(segmentIndex + 1) % geometry.anchors.length];
        return {
            index: segmentIndex,
            startPointId: start.id,
            endPointId: end.id,
            start: start.anchor,
            startOut: start.outHandle,
            endIn: end.inHandle,
            end: end.anchor,
            pathData: `M ${start.anchor.x},${start.anchor.y} C ${start.outHandle.x},${start.outHandle.y} ${end.inHandle.x},${end.inHandle.y} ${end.anchor.x},${end.anchor.y}`
        };
    });
}
function findClosestPointOnFreeformSegment({ points, segmentIndex, canvasPoint, centerX, centerY, rotation, scale, bounds, closed }) {
    const segment = getFreeformCanvasSegments({
        points,
        centerX,
        centerY,
        rotation,
        scale,
        bounds,
        closed
    }).find((candidate)=>candidate.index === segmentIndex);
    if (!segment) {
        return null;
    }
    const sampleCount = 24;
    let bestT = 0;
    let bestDistanceSquared = getDistanceSquared({
        a: canvasPoint,
        b: segment.start
    });
    for(let step = 0; step <= sampleCount; step++){
        const t = step / sampleCount;
        const point = evaluateCubicBezier({
            p0: segment.start,
            p1: segment.startOut,
            p2: segment.endIn,
            p3: segment.end,
            t
        });
        const distanceSquared = getDistanceSquared({
            a: canvasPoint,
            b: point
        });
        if (distanceSquared < bestDistanceSquared) {
            bestDistanceSquared = distanceSquared;
            bestT = t;
        }
    }
    let searchStep = 1 / sampleCount;
    for(let iteration = 0; iteration < 8; iteration++){
        const candidates = [
            bestT - searchStep,
            bestT,
            bestT + searchStep
        ].map(clampUnit).map((t)=>({
                t,
                point: evaluateCubicBezier({
                    p0: segment.start,
                    p1: segment.startOut,
                    p2: segment.endIn,
                    p3: segment.end,
                    t
                })
            }));
        for (const candidate of candidates){
            const distanceSquared = getDistanceSquared({
                a: canvasPoint,
                b: candidate.point
            });
            if (distanceSquared < bestDistanceSquared) {
                bestDistanceSquared = distanceSquared;
                bestT = candidate.t;
            }
        }
        searchStep /= 2;
    }
    const clampedT = Math.min(0.999, Math.max(0.001, bestT));
    return {
        t: clampedT,
        point: evaluateCubicBezier({
            p0: segment.start,
            p1: segment.startOut,
            p2: segment.endIn,
            p3: segment.end,
            t: clampedT
        })
    };
}
function insertPointIntoFreeformSegment({ points, segmentIndex, pointId, t, closed }) {
    const indices = getFreeformSegmentIndices({
        points,
        segmentIndex,
        closed
    });
    if (!indices) {
        return points;
    }
    const startPoint = points[indices.startIndex];
    const endPoint = points[indices.endIndex];
    const clampedT = Math.min(0.999, Math.max(0.001, t));
    const p0 = {
        x: startPoint.x,
        y: startPoint.y
    };
    const p1 = {
        x: startPoint.x + startPoint.outX,
        y: startPoint.y + startPoint.outY
    };
    const p2 = {
        x: endPoint.x + endPoint.inX,
        y: endPoint.y + endPoint.inY
    };
    const p3 = {
        x: endPoint.x,
        y: endPoint.y
    };
    const p01 = lerpPoint({
        a: p0,
        b: p1,
        t: clampedT
    });
    const p12 = lerpPoint({
        a: p1,
        b: p2,
        t: clampedT
    });
    const p23 = lerpPoint({
        a: p2,
        b: p3,
        t: clampedT
    });
    const p012 = lerpPoint({
        a: p01,
        b: p12,
        t: clampedT
    });
    const p123 = lerpPoint({
        a: p12,
        b: p23,
        t: clampedT
    });
    const splitPoint = lerpPoint({
        a: p012,
        b: p123,
        t: clampedT
    });
    const nextPoints = [
        ...points
    ];
    nextPoints[indices.startIndex] = {
        ...startPoint,
        outX: p01.x - startPoint.x,
        outY: p01.y - startPoint.y
    };
    nextPoints[indices.endIndex] = {
        ...endPoint,
        inX: p23.x - endPoint.x,
        inY: p23.y - endPoint.y
    };
    nextPoints.splice(indices.endIndex, 0, {
        id: pointId,
        x: splitPoint.x,
        y: splitPoint.y,
        inX: p012.x - splitPoint.x,
        inY: p012.y - splitPoint.y,
        outX: p123.x - splitPoint.x,
        outY: p123.y - splitPoint.y
    });
    return nextPoints;
}
function getFreeformLocalBounds({ points, bounds }) {
    if (points.length === 0) {
        return null;
    }
    const values = points.flatMap((point)=>[
            {
                x: point.x * bounds.width,
                y: point.y * bounds.height
            },
            {
                x: (point.x + point.inX) * bounds.width,
                y: (point.y + point.inY) * bounds.height
            },
            {
                x: (point.x + point.outX) * bounds.width,
                y: (point.y + point.outY) * bounds.height
            }
        ]);
    const localBounds = getCanvasPointBounds({
        points: values
    });
    if (!localBounds) {
        return null;
    }
    return {
        width: localBounds.width,
        height: localBounds.height
    };
}
function recenterFreeformPath({ points, centerX, centerY, rotation, scale, bounds }) {
    if (points.length === 0) {
        return {
            centerX,
            centerY,
            points
        };
    }
    const geometry = getFreeformCanvasGeometry({
        points,
        centerX,
        centerY,
        rotation,
        scale,
        bounds
    });
    if (!geometry.bounds) {
        return {
            centerX,
            centerY,
            points
        };
    }
    const nextCenterCanvas = {
        x: geometry.bounds.centerX,
        y: geometry.bounds.centerY
    };
    const nextCenterLocal = {
        x: bounds.width === 0 ? 0 : (nextCenterCanvas.x - bounds.cx) / bounds.width,
        y: bounds.height === 0 ? 0 : (nextCenterCanvas.y - bounds.cy) / bounds.height
    };
    const nextPoints = geometry.anchors.map((point)=>{
        const anchor = freeformCanvasPointToLocal({
            point: point.anchor,
            centerX: nextCenterLocal.x,
            centerY: nextCenterLocal.y,
            rotation,
            scale,
            bounds
        });
        const inHandle = freeformCanvasPointToLocal({
            point: point.inHandle,
            centerX: nextCenterLocal.x,
            centerY: nextCenterLocal.y,
            rotation,
            scale,
            bounds
        });
        const outHandle = freeformCanvasPointToLocal({
            point: point.outHandle,
            centerX: nextCenterLocal.x,
            centerY: nextCenterLocal.y,
            rotation,
            scale,
            bounds
        });
        return {
            id: point.id,
            x: anchor.x,
            y: anchor.y,
            inX: inHandle.x - anchor.x,
            inY: inHandle.y - anchor.y,
            outX: outHandle.x - anchor.x,
            outY: outHandle.y - anchor.y
        };
    });
    return {
        centerX: nextCenterLocal.x,
        centerY: nextCenterLocal.y,
        points: nextPoints
    };
}
function buildFreeformPath2D({ points, centerX, centerY, rotation, scale, bounds, closed }) {
    const path = new Path2D();
    if (points.length === 0) {
        return path;
    }
    const geometry = getFreeformCanvasGeometry({
        points,
        centerX,
        centerY,
        rotation,
        scale,
        bounds
    });
    const anchors = geometry.anchors;
    path.moveTo(anchors[0].anchor.x, anchors[0].anchor.y);
    for(let index = 1; index < anchors.length; index++){
        const previous = anchors[index - 1];
        const current = anchors[index];
        path.bezierCurveTo(previous.outHandle.x, previous.outHandle.y, current.inHandle.x, current.inHandle.y, current.anchor.x, current.anchor.y);
    }
    if (closed && anchors.length > 1) {
        const last = anchors[anchors.length - 1];
        const first = anchors[0];
        path.bezierCurveTo(last.outHandle.x, last.outHandle.y, first.inHandle.x, first.inHandle.y, first.anchor.x, first.anchor.y);
        path.closePath();
    }
    return path;
}
function buildFreeformSvgPath({ points, centerX, centerY, rotation, scale, bounds, closed }) {
    if (points.length === 0) {
        return "";
    }
    const geometry = getFreeformCanvasGeometry({
        points,
        centerX,
        centerY,
        rotation,
        scale,
        bounds
    });
    const anchors = geometry.anchors;
    const segments = [
        `M ${anchors[0].anchor.x},${anchors[0].anchor.y}`
    ];
    for(let index = 1; index < anchors.length; index++){
        const previous = anchors[index - 1];
        const current = anchors[index];
        segments.push(`C ${previous.outHandle.x},${previous.outHandle.y} ${current.inHandle.x},${current.inHandle.y} ${current.anchor.x},${current.anchor.y}`);
    }
    if (closed && anchors.length > 1) {
        const last = anchors[anchors.length - 1];
        const first = anchors[0];
        segments.push(`C ${last.outHandle.x},${last.outHandle.y} ${first.inHandle.x},${first.inHandle.y} ${first.anchor.x},${first.anchor.y}`);
        segments.push("Z");
    }
    return segments.join(" ");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/feather.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FEATHER_HANDLE_SCALE",
    ()=>FEATHER_HANDLE_SCALE,
    "MAX_FEATHER",
    ()=>MAX_FEATHER
]);
const MAX_FEATHER = 1000;
const FEATHER_HANDLE_SCALE = 0.11;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/handle-positions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBoxMaskHandlePositions",
    ()=>getBoxMaskHandlePositions,
    "getBoxMaskOverlays",
    ()=>getBoxMaskOverlays,
    "getBoxMaskRectOverlay",
    ()=>getBoxMaskRectOverlay,
    "getBoxMaskShapeOverlay",
    ()=>getBoxMaskShapeOverlay,
    "getLineMaskHandlePositions",
    ()=>getLineMaskHandlePositions,
    "getLineMaskLinePoints",
    ()=>getLineMaskLinePoints,
    "getLineMaskOverlay",
    ()=>getLineMaskOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/feather.ts [app-client] (ecmascript)");
;
const LINE_HANDLE_OFFSET_SCREEN_PX = 20;
const BOX_HANDLE_OFFSET_SCREEN_PX = 20;
const LINE_EXTENT_MULTIPLIER = 50;
const CURSOR = {
    rotate: "crosshair",
    resizeDiagonal: "nwse-resize",
    resizeHorizontal: "ew-resize",
    resizeVertical: "ns-resize"
};
function getLineMaskLinePoints({ centerX, centerY, rotation, bounds }) {
    const angleRad = rotation * Math.PI / 180;
    const normalX = Math.cos(angleRad);
    const normalY = Math.sin(angleRad);
    const lineDirX = -normalY;
    const lineDirY = normalX;
    const cx = bounds.cx + centerX * bounds.width;
    const cy = bounds.cy + centerY * bounds.height;
    const extent = Math.max(bounds.width, bounds.height) * LINE_EXTENT_MULTIPLIER;
    return {
        start: {
            x: cx - lineDirX * extent,
            y: cy - lineDirY * extent
        },
        end: {
            x: cx + lineDirX * extent,
            y: cy + lineDirY * extent
        }
    };
}
function getLineMaskOverlay({ centerX, centerY, rotation, bounds, handleId = {
    kind: "position"
}, cursor = "move" }) {
    const { start, end } = getLineMaskLinePoints({
        centerX,
        centerY,
        rotation,
        bounds
    });
    return {
        id: "line",
        type: "line",
        start,
        end,
        handleId,
        cursor
    };
}
function getLineMaskHandlePositions({ centerX, centerY, rotation, feather, bounds, displayScale }) {
    const angleRad = rotation * Math.PI / 180;
    const normalX = Math.cos(angleRad);
    const normalY = Math.sin(angleRad);
    const cx = bounds.cx + centerX * bounds.width;
    const cy = bounds.cy + centerY * bounds.height;
    const iconOffsetCanvas = LINE_HANDLE_OFFSET_SCREEN_PX / displayScale;
    const featherOffset = iconOffsetCanvas + feather * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATHER_HANDLE_SCALE"];
    return [
        {
            id: {
                kind: "rotation"
            },
            x: cx + normalX * iconOffsetCanvas,
            y: cy + normalY * iconOffsetCanvas,
            cursor: CURSOR.rotate,
            kind: "icon",
            icon: "rotate"
        },
        {
            id: {
                kind: "feather"
            },
            x: cx - normalX * featherOffset,
            y: cy - normalY * featherOffset,
            cursor: CURSOR.resizeHorizontal,
            kind: "icon",
            icon: "feather"
        }
    ];
}
function rotatePoint({ localX, localY, cx, cy, angleRad }) {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return {
        x: cx + localX * cos - localY * sin,
        y: cy + localX * sin + localY * cos
    };
}
function getBoxMaskHandlePositions({ centerX, centerY, width, height, rotation, feather, sizeMode, showScaleHandle = true, bounds, displayScale }) {
    const cx = bounds.cx + centerX * bounds.width;
    const cy = bounds.cy + centerY * bounds.height;
    const angleRad = rotation * Math.PI / 180;
    const halfWidth = width * bounds.width / 2;
    const halfHeight = height * bounds.height / 2;
    const handles = [];
    const handleOffsetCanvas = BOX_HANDLE_OFFSET_SCREEN_PX / displayScale;
    const rotHandle = rotatePoint({
        localX: 0,
        localY: -halfHeight - handleOffsetCanvas,
        cx,
        cy,
        angleRad
    });
    handles.push({
        id: {
            kind: "rotation"
        },
        x: rotHandle.x,
        y: rotHandle.y,
        cursor: CURSOR.rotate,
        kind: "icon",
        icon: "rotate"
    });
    const featherHandle = rotatePoint({
        localX: 0,
        localY: halfHeight + handleOffsetCanvas + feather * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATHER_HANDLE_SCALE"],
        cx,
        cy,
        angleRad
    });
    handles.push({
        id: {
            kind: "feather"
        },
        x: featherHandle.x,
        y: featherHandle.y,
        cursor: CURSOR.resizeVertical,
        kind: "icon",
        icon: "feather"
    });
    if (sizeMode === "width-height") {
        const corners = [
            {
                localX: -halfWidth,
                localY: -halfHeight,
                corner: {
                    x: "left",
                    y: "top"
                }
            },
            {
                localX: halfWidth,
                localY: -halfHeight,
                corner: {
                    x: "right",
                    y: "top"
                }
            },
            {
                localX: halfWidth,
                localY: halfHeight,
                corner: {
                    x: "right",
                    y: "bottom"
                }
            },
            {
                localX: -halfWidth,
                localY: halfHeight,
                corner: {
                    x: "left",
                    y: "bottom"
                }
            }
        ];
        for (const { localX, localY, corner } of corners){
            const point = rotatePoint({
                localX,
                localY,
                cx,
                cy,
                angleRad
            });
            handles.push({
                id: {
                    kind: "corner",
                    corner
                },
                x: point.x,
                y: point.y,
                cursor: CURSOR.resizeDiagonal,
                kind: "corner"
            });
        }
        const right = rotatePoint({
            localX: halfWidth,
            localY: 0,
            cx,
            cy,
            angleRad
        });
        const left = rotatePoint({
            localX: -halfWidth,
            localY: 0,
            cx,
            cy,
            angleRad
        });
        const bottom = rotatePoint({
            localX: 0,
            localY: halfHeight,
            cx,
            cy,
            angleRad
        });
        handles.push({
            id: {
                kind: "edge",
                side: "left"
            },
            x: left.x,
            y: left.y,
            cursor: CURSOR.resizeHorizontal,
            kind: "edge",
            edgeAxis: "horizontal",
            rotation
        });
        handles.push({
            id: {
                kind: "edge",
                side: "right"
            },
            x: right.x,
            y: right.y,
            cursor: CURSOR.resizeHorizontal,
            kind: "edge",
            edgeAxis: "horizontal",
            rotation
        });
        handles.push({
            id: {
                kind: "edge",
                side: "bottom"
            },
            x: bottom.x,
            y: bottom.y,
            cursor: CURSOR.resizeVertical,
            kind: "edge",
            edgeAxis: "vertical",
            rotation
        });
    } else if (sizeMode === "height-only") {
        const top = rotatePoint({
            localX: 0,
            localY: -halfHeight,
            cx,
            cy,
            angleRad
        });
        const bottom = rotatePoint({
            localX: 0,
            localY: halfHeight,
            cx,
            cy,
            angleRad
        });
        handles.push({
            id: {
                kind: "edge",
                side: "top"
            },
            x: top.x,
            y: top.y,
            cursor: CURSOR.resizeVertical,
            kind: "edge",
            edgeAxis: "vertical",
            rotation
        });
        handles.push({
            id: {
                kind: "edge",
                side: "bottom"
            },
            x: bottom.x,
            y: bottom.y,
            cursor: CURSOR.resizeVertical,
            kind: "edge",
            edgeAxis: "vertical",
            rotation
        });
    } else if (sizeMode === "width-only") {
        const left = rotatePoint({
            localX: -halfWidth,
            localY: 0,
            cx,
            cy,
            angleRad
        });
        const right = rotatePoint({
            localX: halfWidth,
            localY: 0,
            cx,
            cy,
            angleRad
        });
        handles.push({
            id: {
                kind: "edge",
                side: "left"
            },
            x: left.x,
            y: left.y,
            cursor: CURSOR.resizeHorizontal,
            kind: "edge",
            edgeAxis: "horizontal",
            rotation
        });
        handles.push({
            id: {
                kind: "edge",
                side: "right"
            },
            x: right.x,
            y: right.y,
            cursor: CURSOR.resizeHorizontal,
            kind: "edge",
            edgeAxis: "horizontal",
            rotation
        });
    } else if (sizeMode === "uniform" && showScaleHandle) {
        const point = rotatePoint({
            localX: halfWidth,
            localY: halfHeight,
            cx,
            cy,
            angleRad
        });
        handles.push({
            id: {
                kind: "scale"
            },
            x: point.x,
            y: point.y,
            cursor: CURSOR.resizeDiagonal,
            kind: "corner"
        });
    }
    return handles;
}
function getBoxMaskRectOverlay({ centerX, centerY, width, height, rotation, bounds, handleId = {
    kind: "position"
}, cursor = "move", dashed = false }) {
    return {
        id: "bounding-box",
        type: "rect",
        center: {
            x: bounds.cx + centerX * bounds.width,
            y: bounds.cy + centerY * bounds.height
        },
        width: width * bounds.width,
        height: height * bounds.height,
        rotation,
        handleId,
        cursor,
        dashed
    };
}
function getBoxMaskShapeOverlay({ centerX, centerY, width, height, rotation, bounds, pathData, handleId = {
    kind: "position"
}, cursor = "move" }) {
    return {
        id: "shape-outline",
        type: "shape",
        center: {
            x: bounds.cx + centerX * bounds.width,
            y: bounds.cy + centerY * bounds.height
        },
        width: width * bounds.width,
        height: height * bounds.height,
        rotation,
        pathData,
        handleId,
        cursor
    };
}
function getBoxMaskOverlays({ params, bounds, pathData, showBoundingBox = true }) {
    const overlays = [];
    if (showBoundingBox) {
        overlays.push(getBoxMaskRectOverlay({
            centerX: params.centerX,
            centerY: params.centerY,
            width: params.width,
            height: params.height,
            rotation: params.rotation,
            bounds,
            dashed: Boolean(pathData)
        }));
    }
    if (pathData) {
        overlays.push(getBoxMaskShapeOverlay({
            centerX: params.centerX,
            centerY: params.centerY,
            width: params.width,
            height: params.height,
            rotation: params.rotation,
            bounds,
            pathData
        }));
    }
    return overlays;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/param-update.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeFeatherUpdate",
    ()=>computeFeatherUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/feather.ts [app-client] (ecmascript)");
;
function computeFeatherUpdate({ startFeather, deltaX, deltaY, directionX, directionY }) {
    const projection = deltaX * directionX + deltaY * directionY;
    return {
        feather: Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_FEATHER"], Math.round(startFeather + projection / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FEATHER_HANDLE_SCALE"])))
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/dimensions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SHAPE_MASK_SHORT_SIDE_RATIO",
    ()=>DEFAULT_SHAPE_MASK_SHORT_SIDE_RATIO,
    "MIN_MASK_DIMENSION",
    ()=>MIN_MASK_DIMENSION
]);
const DEFAULT_SHAPE_MASK_SHORT_SIDE_RATIO = 0.6;
const MIN_MASK_DIMENSION = 0.01;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/geometry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMaskLocalCenter",
    ()=>getMaskLocalCenter,
    "getMaskSnapGeometry",
    ()=>getMaskSnapGeometry,
    "hasCenterParams",
    ()=>hasCenterParams,
    "isRectangleMaskParams",
    ()=>isRectangleMaskParams,
    "setMaskLocalCenter",
    ()=>setMaskLocalCenter,
    "toGlobalMaskSnapLines",
    ()=>toGlobalMaskSnapLines
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/dimensions.ts [app-client] (ecmascript)");
;
function hasCenterParams(params) {
    return typeof params.centerX === "number" && typeof params.centerY === "number";
}
function isRectangleMaskParams(params) {
    return hasCenterParams(params) && typeof params.width === "number" && typeof params.height === "number" && typeof params.rotation === "number" && typeof params.scale === "number";
}
function getMaskLocalCenter({ params, bounds }) {
    if (!hasCenterParams(params)) return null;
    return {
        x: params.centerX * bounds.width,
        y: params.centerY * bounds.height
    };
}
function setMaskLocalCenter({ center, bounds }) {
    return {
        centerX: bounds.width === 0 ? 0 : center.x / bounds.width,
        centerY: bounds.height === 0 ? 0 : center.y / bounds.height
    };
}
function getMaskSnapGeometry({ params, bounds }) {
    const position = getMaskLocalCenter({
        params,
        bounds
    });
    if (!position) return null;
    if (isRectangleMaskParams(params)) {
        return {
            position,
            size: {
                width: Math.max(params.width, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]) * bounds.width,
                height: Math.max(params.height, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]) * bounds.height
            },
            rotation: params.rotation
        };
    }
    return {
        position,
        size: {
            width: 0,
            height: 0
        },
        rotation: typeof params.rotation === "number" ? params.rotation : 0
    };
}
function toGlobalMaskSnapLines({ lines, bounds, canvasSize }) {
    const centerX = bounds.cx - canvasSize.width / 2;
    const centerY = bounds.cy - canvasSize.height / 2;
    return lines.map((line)=>line.type === "vertical" ? {
            type: "vertical",
            position: centerX + line.position
        } : {
            type: "horizontal",
            position: centerY + line.position
        });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/freeform/definition.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendPointToFreeformPathMask",
    ()=>appendPointToFreeformPathMask,
    "freeformMaskDefinition",
    ()=>freeformMaskDefinition,
    "insertPointOnFreeformSegment",
    ()=>insertPointOnFreeformSegment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$cursors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/cursors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/freeform/path.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/handle-positions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/param-update.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/preview-snap.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
const PERCENTAGE_DISPLAY = {
    displayMultiplier: 100,
    step: 1
};
const FREEFORM_PATH_MASK_PARAMS = [
    {
        key: "centerX",
        label: "X",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "centerY",
        label: "Y",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "rotation",
        label: "Rotation",
        type: "number",
        default: 0,
        min: 0,
        max: 360,
        step: 1
    },
    {
        key: "scale",
        label: "Scale",
        type: "number",
        default: 1,
        min: 1,
        max: 500,
        ...PERCENTAGE_DISPLAY
    }
];
function getFreeformDisplayHandles({ params, displayScale, bounds }) {
    const points = params.path;
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreeformCanvasGeometry"])({
        points,
        centerX: params.centerX,
        centerY: params.centerY,
        rotation: params.rotation,
        scale: params.scale,
        bounds
    });
    const handles = [];
    const overlays = [];
    if (points.length > 0) {
        overlays.push({
            id: "path",
            type: "canvas-path",
            pathData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFreeformSvgPath"])({
                points,
                centerX: params.centerX,
                centerY: params.centerY,
                rotation: params.rotation,
                scale: params.scale,
                bounds,
                closed: params.closed
            }),
            coordinateSpace: "canvas"
        });
    }
    if (params.closed) {
        const segmentStrokeWidth = 12;
        overlays.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreeformCanvasSegments"])({
            points,
            centerX: params.centerX,
            centerY: params.centerY,
            rotation: params.rotation,
            scale: params.scale,
            bounds,
            closed: true
        }).map((segment)=>({
                id: `segment:${segment.index}`,
                type: "canvas-path",
                pathData: segment.pathData,
                coordinateSpace: "canvas",
                handleId: {
                    kind: "segment",
                    index: segment.index
                },
                cursor: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$cursors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEN_CURSOR"],
                strokeOpacity: 0,
                strokeWidth: segmentStrokeWidth
            })));
    }
    const localBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreeformLocalBounds"])({
        points,
        bounds
    });
    if (params.closed && localBounds) {
        handles.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxMaskHandlePositions"])({
            centerX: params.centerX,
            centerY: params.centerY,
            width: localBounds.width * params.scale / bounds.width,
            height: localBounds.height * params.scale / bounds.height,
            rotation: params.rotation,
            feather: params.feather,
            sizeMode: "uniform",
            showScaleHandle: false,
            bounds,
            displayScale
        }));
    }
    geometry.anchors.forEach((point)=>{
        handles.push({
            id: {
                kind: "anchor",
                pointId: point.id
            },
            x: point.anchor.x,
            y: point.anchor.y,
            cursor: params.closed ? "move" : "pointer",
            kind: "point"
        });
    });
    return {
        handles,
        overlays
    };
}
function updateFreeformPathMaskPoint({ points, pointId, updater }) {
    return points.map((point)=>point.id === pointId ? updater(point) : point);
}
function computeFreeformParamUpdate({ handleId, startParams, deltaX, deltaY, startCanvasX, startCanvasY, bounds }) {
    if (handleId.kind === "position") {
        return {
            centerX: startParams.centerX + deltaX / bounds.width,
            centerY: startParams.centerY + deltaY / bounds.height
        };
    }
    const pivotX = bounds.cx + startParams.centerX * bounds.width;
    const pivotY = bounds.cy + startParams.centerY * bounds.height;
    if (handleId.kind === "rotation") {
        const startAngle = Math.atan2(startCanvasY - pivotY, startCanvasX - pivotX) * 180 / Math.PI;
        const currentAngle = Math.atan2(startCanvasY + deltaY - pivotY, startCanvasX + deltaX - pivotX) * 180 / Math.PI;
        let deltaAngle = currentAngle - startAngle;
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;
        return {
            rotation: ((startParams.rotation + deltaAngle) % 360 + 360) % 360
        };
    }
    if (handleId.kind === "feather") {
        const angleRad = startParams.rotation * Math.PI / 180;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeFeatherUpdate"])({
            startFeather: startParams.feather,
            deltaX,
            deltaY,
            directionX: -Math.sin(angleRad),
            directionY: Math.cos(angleRad)
        });
    }
    if (handleId.kind === "scale") {
        const startDistance = Math.hypot(startCanvasX - pivotX, startCanvasY - pivotY);
        const currentDistance = Math.hypot(startCanvasX + deltaX - pivotX, startCanvasY + deltaY - pivotY);
        const scaleFactor = startDistance > 0 ? currentDistance / startDistance : 1;
        return {
            scale: Math.max(0.01, startParams.scale * scaleFactor)
        };
    }
    if (handleId.kind !== "anchor") {
        return {};
    }
    const points = startParams.path;
    const currentPoint = {
        x: startCanvasX + deltaX,
        y: startCanvasY + deltaY
    };
    const localPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["freeformCanvasPointToLocal"])({
        point: currentPoint,
        centerX: startParams.centerX,
        centerY: startParams.centerY,
        rotation: startParams.rotation,
        scale: startParams.scale,
        bounds
    });
    return {
        path: updateFreeformPathMaskPoint({
            points,
            pointId: handleId.pointId,
            updater: (point)=>({
                    ...point,
                    x: localPoint.x,
                    y: localPoint.y
                })
        })
    };
}
const freeformMaskDefinition = {
    type: "freeform",
    name: "Pen tool",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "uniform"
    },
    params: FREEFORM_PATH_MASK_PARAMS,
    interaction: {
        getInteraction ({ params, bounds, displayScale, scaleX: _scaleX, scaleY: _scaleY }) {
            return getFreeformDisplayHandles({
                params,
                bounds,
                displayScale
            });
        },
        snap ({ handleId, proposedParams, startParams, bounds, canvasSize, snapThreshold }) {
            const points = startParams.path;
            const localBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreeformLocalBounds"])({
                points,
                bounds
            });
            if (!startParams.closed || !localBounds) {
                return {
                    params: proposedParams,
                    activeLines: []
                };
            }
            const position = {
                x: proposedParams.centerX * bounds.width,
                y: proposedParams.centerY * bounds.height
            };
            if (handleId.kind === "position") {
                const { snappedPosition, activeLines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapPosition"])({
                    proposedPosition: position,
                    canvasSize: bounds,
                    elementSize: {
                        width: localBounds.width * proposedParams.scale,
                        height: localBounds.height * proposedParams.scale
                    },
                    rotation: proposedParams.rotation,
                    snapThreshold
                });
                return {
                    params: {
                        ...proposedParams,
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMaskLocalCenter"])({
                            center: snappedPosition,
                            bounds
                        })
                    },
                    activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                        lines: activeLines,
                        bounds,
                        canvasSize
                    })
                };
            }
            if (handleId.kind === "rotation") {
                const { snappedRotation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapRotation"])({
                    proposedRotation: proposedParams.rotation
                });
                return {
                    params: {
                        ...proposedParams,
                        rotation: snappedRotation
                    },
                    activeLines: []
                };
            }
            if (handleId.kind === "scale") {
                const { snappedScale, activeLines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapScale"])({
                    proposedScale: proposedParams.scale,
                    position,
                    baseWidth: localBounds.width,
                    baseHeight: localBounds.height,
                    rotation: proposedParams.rotation,
                    canvasSize: bounds,
                    snapThreshold,
                    preferredEdges: {
                        right: true,
                        bottom: true
                    }
                });
                return {
                    params: {
                        ...proposedParams,
                        scale: Math.max(0.01, snappedScale)
                    },
                    activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                        lines: activeLines,
                        bounds,
                        canvasSize
                    })
                };
            }
            return {
                params: proposedParams,
                activeLines: []
            };
        }
    },
    buildDefault () {
        return {
            type: "freeform",
            params: {
                feather: 0,
                inverted: false,
                strokeColor: "#ffffff",
                strokeWidth: 0,
                strokeAlign: "center",
                path: [],
                closed: false,
                centerX: 0,
                centerY: 0,
                rotation: 0,
                scale: 1
            }
        };
    },
    computeParamUpdate: computeFreeformParamUpdate,
    isActive (params) {
        return params.closed;
    },
    renderer: {
        body: {
            kind: "fillPath",
            buildPath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const points = params.path;
                if (!params.closed) {
                    return new Path2D();
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFreeformPath2D"])({
                    points,
                    centerX: params.centerX,
                    centerY: params.centerY,
                    rotation: params.rotation,
                    scale: params.scale,
                    bounds: {
                        cx: width / 2,
                        cy: height / 2,
                        width,
                        height,
                        rotation: 0
                    },
                    closed: true
                });
            }
        },
        stroke: {
            kind: "renderStroke",
            renderStroke ({ resolvedParams, ctx, width, height }) {
                const params = resolvedParams;
                if (!params.closed) {
                    return;
                }
                const points = params.path;
                const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFreeformPath2D"])({
                    points,
                    centerX: params.centerX,
                    centerY: params.centerY,
                    rotation: params.rotation,
                    scale: params.scale,
                    bounds: {
                        cx: width / 2,
                        cy: height / 2,
                        width,
                        height,
                        rotation: 0
                    },
                    closed: true
                });
                ctx.save();
                ctx.strokeStyle = params.strokeColor;
                ctx.lineWidth = params.strokeWidth;
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.stroke(path);
                if (params.strokeAlign === "inside") {
                    ctx.globalCompositeOperation = "destination-in";
                    ctx.fillStyle = "#ffffff";
                    ctx.fill(path);
                }
                if (params.strokeAlign === "outside") {
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.fillStyle = "#ffffff";
                    ctx.fill(path);
                }
                ctx.restore();
            }
        }
    }
};
function appendPointToFreeformPathMask({ params, canvasPoint, bounds }) {
    const points = params.path;
    if (points.length === 0) {
        return {
            ...params,
            centerX: bounds.width === 0 ? 0 : (canvasPoint.x - bounds.cx) / bounds.width,
            centerY: bounds.height === 0 ? 0 : (canvasPoint.y - bounds.cy) / bounds.height,
            rotation: 0,
            scale: 1,
            path: [
                {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])(),
                    x: 0,
                    y: 0,
                    inX: 0,
                    inY: 0,
                    outX: 0,
                    outY: 0
                }
            ]
        };
    }
    const localPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["freeformCanvasPointToLocal"])({
        point: canvasPoint,
        centerX: params.centerX,
        centerY: params.centerY,
        rotation: params.rotation,
        scale: params.scale,
        bounds
    });
    const nextPoints = [
        ...points,
        {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])(),
            x: localPoint.x,
            y: localPoint.y,
            inX: 0,
            inY: 0,
            outX: 0,
            outY: 0
        }
    ];
    const recentered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recenterFreeformPath"])({
        points: nextPoints,
        centerX: params.centerX,
        centerY: params.centerY,
        rotation: params.rotation,
        scale: params.scale,
        bounds
    });
    return {
        ...params,
        centerX: recentered.centerX,
        centerY: recentered.centerY,
        path: recentered.points
    };
}
function insertPointOnFreeformSegment({ params, segmentIndex, canvasPoint, bounds, pointId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])() }) {
    const points = params.path;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFreeformSegmentCount"])({
        points,
        closed: params.closed
    }) === 0) {
        return null;
    }
    const closestPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findClosestPointOnFreeformSegment"])({
        points,
        segmentIndex,
        canvasPoint,
        centerX: params.centerX,
        centerY: params.centerY,
        rotation: params.rotation,
        scale: params.scale,
        bounds,
        closed: params.closed
    });
    if (!closestPoint) {
        return null;
    }
    const nextPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["insertPointIntoFreeformSegment"])({
        points,
        segmentIndex,
        pointId,
        t: closestPoint.t,
        closed: params.closed
    });
    if (nextPoints.length === points.length) {
        return null;
    }
    const recentered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recenterFreeformPath"])({
        points: nextPoints,
        centerX: params.centerX,
        centerY: params.centerY,
        rotation: params.rotation,
        scale: params.scale,
        bounds
    });
    return {
        pointId,
        params: {
            ...params,
            centerX: recentered.centerX,
            centerY: recentered.centerY,
            path: recentered.points
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "BASE_MASK_PARAM_DEFINITIONS",
    ()=>BASE_MASK_PARAM_DEFINITIONS,
    "MasksRegistry",
    ()=>MasksRegistry,
    "masksRegistry",
    ()=>masksRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/feather.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const BASE_MASK_PARAM_DEFINITIONS = [
    {
        key: "feather",
        label: "Feather",
        type: "number",
        default: 0,
        min: 0,
        max: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$feather$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_FEATHER"],
        step: 1,
        unit: "percent"
    },
    {
        key: "strokeWidth",
        label: "Stroke width",
        type: "number",
        default: 0,
        min: 0,
        max: 100,
        step: 1
    },
    {
        key: "strokeColor",
        label: "Stroke color",
        type: "color",
        default: "#ffffff"
    }
];
class MasksRegistry extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefinitionRegistry"] {
    constructor(){
        super("mask");
    }
    registerMask({ definition, icon }) {
        const withBaseParams = {
            type: definition.type,
            name: definition.name,
            features: definition.features,
            params: [
                ...definition.params,
                ...BASE_MASK_PARAM_DEFINITIONS
            ],
            renderer: definition.renderer,
            interaction: definition.interaction,
            isActive: definition.isActive,
            buildDefault: definition.buildDefault,
            computeParamUpdate: definition.computeParamUpdate,
            icon
        };
        this.register({
            key: definition.type,
            definition: withBaseParams
        });
    }
}
const masksRegistry = new MasksRegistry();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/masks/snap.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "snapBoxMaskInteraction",
    ()=>snapBoxMaskInteraction,
    "snapSplitMaskInteraction",
    ()=>snapSplitMaskInteraction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/dimensions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/preview-snap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/geometry.ts [app-client] (ecmascript)");
;
;
;
function getClampedRatio({ next, base }) {
    return Math.max(next, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]) / Math.max(base, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]);
}
function getPreferredEdges({ handleId }) {
    if (handleId.kind === "edge") {
        return {
            left: handleId.side === "left",
            right: handleId.side === "right",
            top: handleId.side === "top",
            bottom: handleId.side === "bottom"
        };
    }
    if (handleId.kind === "corner") {
        return {
            left: handleId.corner.x === "left",
            right: handleId.corner.x === "right",
            top: handleId.corner.y === "top",
            bottom: handleId.corner.y === "bottom"
        };
    }
    return undefined;
}
function snapMaskPosition({ proposedParams, bounds, canvasSize, snapThreshold }) {
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaskSnapGeometry"])({
        params: proposedParams,
        bounds
    });
    if (!geometry) {
        return {
            params: proposedParams,
            activeLines: []
        };
    }
    const { snappedPosition, activeLines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapPosition"])({
        proposedPosition: geometry.position,
        canvasSize: bounds,
        elementSize: geometry.size,
        rotation: geometry.rotation,
        snapThreshold
    });
    return {
        params: {
            ...proposedParams,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMaskLocalCenter"])({
                center: snappedPosition,
                bounds
            })
        },
        activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
            lines: activeLines,
            bounds,
            canvasSize
        })
    };
}
function snapMaskRotation({ proposedParams }) {
    const { snappedRotation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapRotation"])({
        proposedRotation: proposedParams.rotation
    });
    return {
        params: {
            ...proposedParams,
            rotation: snappedRotation
        },
        activeLines: []
    };
}
function snapBoxMaskSize({ handleId, startParams, proposedParams, bounds, canvasSize, snapThreshold }) {
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMaskSnapGeometry"])({
        params: proposedParams,
        bounds
    });
    if (!geometry) {
        return {
            params: proposedParams,
            activeLines: []
        };
    }
    const localCanvasSize = bounds;
    const baseWidth = Math.max(startParams.width, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]) * bounds.width;
    const baseHeight = Math.max(startParams.height, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]) * bounds.height;
    const preferredEdges = getPreferredEdges({
        handleId
    });
    if (handleId.kind === "edge" && (handleId.side === "right" || handleId.side === "left")) {
        const proposedScaleX = getClampedRatio({
            next: proposedParams.width,
            base: startParams.width
        });
        const { x } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapScaleAxes"])({
            proposedScaleX,
            proposedScaleY: 1,
            position: geometry.position,
            baseWidth,
            baseHeight,
            rotation: proposedParams.rotation,
            canvasSize: localCanvasSize,
            snapThreshold,
            preferredEdges
        });
        return {
            params: {
                ...proposedParams,
                width: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.width * x.snappedScale)
            },
            activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                lines: x.activeLines,
                bounds,
                canvasSize
            })
        };
    }
    if (handleId.kind === "edge" && (handleId.side === "top" || handleId.side === "bottom")) {
        const proposedScaleY = getClampedRatio({
            next: proposedParams.height,
            base: startParams.height
        });
        const { y } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapScaleAxes"])({
            proposedScaleX: 1,
            proposedScaleY,
            position: geometry.position,
            baseWidth,
            baseHeight,
            rotation: proposedParams.rotation,
            canvasSize: localCanvasSize,
            snapThreshold,
            preferredEdges
        });
        return {
            params: {
                ...proposedParams,
                height: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.height * y.snappedScale)
            },
            activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                lines: y.activeLines,
                bounds,
                canvasSize
            })
        };
    }
    if (handleId.kind === "scale") {
        const baseScale = Math.max(startParams.scale, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]);
        const proposedScale = getClampedRatio({
            next: proposedParams.scale,
            base: startParams.scale
        });
        const { snappedScale, activeLines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapScale"])({
            proposedScale,
            position: geometry.position,
            baseWidth: baseWidth * baseScale,
            baseHeight: baseHeight * baseScale,
            rotation: proposedParams.rotation,
            canvasSize: localCanvasSize,
            snapThreshold,
            preferredEdges
        });
        return {
            params: {
                ...proposedParams,
                scale: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.scale * snappedScale)
            },
            activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                lines: activeLines,
                bounds,
                canvasSize
            })
        };
    }
    if (handleId.kind === "corner") {
        const proposedScale = getClampedRatio({
            next: proposedParams.width,
            base: startParams.width
        });
        const { snappedScale, activeLines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapScale"])({
            proposedScale,
            position: geometry.position,
            baseWidth,
            baseHeight,
            rotation: proposedParams.rotation,
            canvasSize: localCanvasSize,
            snapThreshold,
            preferredEdges
        });
        return {
            params: {
                ...proposedParams,
                width: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.width * snappedScale),
                height: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.height * snappedScale)
            },
            activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                lines: activeLines,
                bounds,
                canvasSize
            })
        };
    }
    return {
        params: proposedParams,
        activeLines: []
    };
}
function snapBoxMaskInteraction({ handleId, startParams, proposedParams, bounds, canvasSize, snapThreshold }) {
    if (handleId.kind === "position") {
        return snapMaskPosition({
            proposedParams,
            bounds,
            canvasSize,
            snapThreshold
        });
    }
    if (handleId.kind === "rotation") {
        return snapMaskRotation({
            proposedParams
        });
    }
    return snapBoxMaskSize({
        handleId,
        startParams,
        proposedParams,
        bounds,
        canvasSize,
        snapThreshold
    });
}
function snapSplitMaskInteraction({ handleId, proposedParams, bounds, canvasSize, snapThreshold }) {
    if (handleId.kind === "position") {
        return snapMaskPosition({
            proposedParams,
            bounds,
            canvasSize,
            snapThreshold
        });
    }
    if (handleId.kind === "rotation") {
        return snapMaskRotation({
            proposedParams
        });
    }
    return {
        params: proposedParams,
        activeLines: []
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/box-like.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOX_LIKE_MASK_PARAMS",
    ()=>BOX_LIKE_MASK_PARAMS,
    "buildBoxMaskInteraction",
    ()=>buildBoxMaskInteraction,
    "computeBoxMaskParamUpdate",
    ()=>computeBoxMaskParamUpdate,
    "getBoxLikeGeometry",
    ()=>getBoxLikeGeometry,
    "getDefaultBaseMaskParams",
    ()=>getDefaultBaseMaskParams,
    "getDefaultSquareMaskParams",
    ()=>getDefaultSquareMaskParams,
    "getStrokeOffset",
    ()=>getStrokeOffset,
    "rotatePoint",
    ()=>rotatePoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/dimensions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/param-update.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/handle-positions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/snap.ts [app-client] (ecmascript)");
;
;
;
;
const PERCENTAGE_DISPLAY = {
    displayMultiplier: 100,
    step: 1
};
const BOX_LIKE_MASK_PARAMS = [
    {
        key: "centerX",
        label: "X",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "centerY",
        label: "Y",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "width",
        label: "Width",
        type: "number",
        default: 0.6,
        min: 1,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "height",
        label: "Height",
        type: "number",
        default: 0.6,
        min: 1,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "rotation",
        label: "Rotation",
        type: "number",
        default: 0,
        min: 0,
        max: 360,
        step: 1
    },
    {
        key: "scale",
        label: "Scale",
        type: "number",
        default: 1,
        min: 1,
        max: 500,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "strokeAlign",
        label: "Stroke Align",
        type: "select",
        default: "center",
        options: [
            {
                value: "inside",
                label: "Inside"
            },
            {
                value: "center",
                label: "Center"
            },
            {
                value: "outside",
                label: "Outside"
            }
        ]
    }
];
function getDefaultBaseMaskParams() {
    return {
        feather: 0,
        inverted: false,
        strokeColor: "#ffffff",
        strokeWidth: 0,
        strokeAlign: "center"
    };
}
function getStrokeOffset({ strokeAlign, strokeWidth }) {
    if (strokeAlign === "inside") {
        return -(strokeWidth / 2);
    }
    if (strokeAlign === "outside") {
        return strokeWidth / 2;
    }
    return 0;
}
function getDefaultSquareMaskParams({ elementSize }) {
    const absWidth = Math.abs(elementSize?.width ?? 0);
    const absHeight = Math.abs(elementSize?.height ?? 0);
    const shortSide = Math.min(absWidth, absHeight);
    const squareSide = shortSide > 0 ? shortSide * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SHAPE_MASK_SHORT_SIDE_RATIO"] : 0;
    const width = absWidth > 0 ? squareSide / absWidth : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SHAPE_MASK_SHORT_SIDE_RATIO"];
    const height = absHeight > 0 ? squareSide / absHeight : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SHAPE_MASK_SHORT_SIDE_RATIO"];
    return {
        ...getDefaultBaseMaskParams(),
        centerX: 0,
        centerY: 0,
        width,
        height,
        rotation: 0,
        scale: 1
    };
}
function getBoxLikeGeometry({ params, width, height }) {
    return {
        centerX: width / 2 + params.centerX * width,
        centerY: height / 2 + params.centerY * height,
        maskWidth: Math.max(params.width, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]) * width,
        maskHeight: Math.max(params.height, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"]) * height,
        rotationRad: params.rotation * Math.PI / 180
    };
}
function buildBoxMaskInteraction({ sizeMode, buildOverlayPath, showBoundingBox = true }) {
    return {
        getInteraction ({ params, bounds, displayScale, scaleX, scaleY }) {
            return {
                handles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxMaskHandlePositions"])({
                    centerX: params.centerX,
                    centerY: params.centerY,
                    width: params.width,
                    height: params.height,
                    rotation: params.rotation,
                    feather: params.feather,
                    sizeMode,
                    bounds,
                    displayScale
                }),
                overlays: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxMaskOverlays"])({
                    params,
                    bounds,
                    pathData: buildOverlayPath?.({
                        width: params.width * bounds.width * scaleX,
                        height: params.height * bounds.height * scaleY
                    }),
                    showBoundingBox
                })
            };
        },
        snap (args) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapBoxMaskInteraction"])(args);
        }
    };
}
function computeBoxMaskParamUpdate({ handleId, startParams, deltaX, deltaY, bounds }) {
    if (handleId.kind === "position") {
        return {
            centerX: startParams.centerX + deltaX / bounds.width,
            centerY: startParams.centerY + deltaY / bounds.height
        };
    }
    if (handleId.kind === "rotation") {
        const currentAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const newRotation = (startParams.rotation + currentAngle) % 360;
        return {
            rotation: newRotation < 0 ? newRotation + 360 : newRotation
        };
    }
    if (handleId.kind === "feather") {
        const angleRad = startParams.rotation * Math.PI / 180;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeFeatherUpdate"])({
            startFeather: startParams.feather,
            deltaX,
            deltaY,
            directionX: -Math.sin(angleRad),
            directionY: Math.cos(angleRad)
        });
    }
    const halfWidth = startParams.width * bounds.width;
    const halfHeight = startParams.height * bounds.height;
    if (handleId.kind === "edge" && (handleId.side === "right" || handleId.side === "left")) {
        const sign = handleId.side === "right" ? 1 : -1;
        return {
            width: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.width + sign * deltaX * 2 / bounds.width)
        };
    }
    if (handleId.kind === "edge" && (handleId.side === "bottom" || handleId.side === "top")) {
        const sign = handleId.side === "bottom" ? 1 : -1;
        return {
            height: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.height + sign * deltaY * 2 / bounds.height)
        };
    }
    if (handleId.kind === "corner") {
        const signX = handleId.corner.x === "right" ? 1 : -1;
        const signY = handleId.corner.y === "bottom" ? 1 : -1;
        const distance = Math.sqrt((signX * deltaX + halfWidth) ** 2 + (signY * deltaY + halfHeight) ** 2);
        const originalDistance = Math.sqrt(halfWidth ** 2 + halfHeight ** 2);
        const scale = originalDistance > 0 ? distance / originalDistance : 1;
        return {
            width: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.width * scale),
            height: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.height * scale)
        };
    }
    if (handleId.kind === "scale") {
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const originalDistance = Math.sqrt(halfWidth ** 2 + halfHeight ** 2);
        const scale = originalDistance > 0 ? 1 + distance / originalDistance : 1;
        return {
            scale: Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$dimensions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_MASK_DIMENSION"], startParams.scale * scale)
        };
    }
    return {};
}
function rotatePoint({ x, y, centerX, centerY, rotationRad }) {
    const dx = x - centerX;
    const dy = y - centerY;
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    return {
        x: centerX + dx * cos - dy * sin,
        y: centerY + dx * sin + dy * cos
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/cinematic-bars.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cinematicBarsMaskDefinition",
    ()=>cinematicBarsMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/box-like.ts [app-client] (ecmascript)");
;
function getDefaultCinematicBarsMaskParams({ elementSize }) {
    const absWidth = Math.abs(elementSize?.width ?? 0);
    const absHeight = Math.abs(elementSize?.height ?? 0);
    const diagonal = absWidth > 0 && absHeight > 0 ? Math.sqrt(absWidth ** 2 + absHeight ** 2) : 0;
    const fullSpanWidth = absWidth > 0 ? diagonal / absWidth : Math.SQRT2;
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultBaseMaskParams"])(),
        centerX: 0,
        centerY: 0,
        width: Math.max(fullSpanWidth, 1),
        height: 0.6,
        rotation: 0,
        scale: 1
    };
}
function buildBandPath({ centerX, centerY, halfWidth, halfHeight, rotationRad }) {
    const corners = [
        {
            x: centerX - halfWidth,
            y: centerY - halfHeight
        },
        {
            x: centerX + halfWidth,
            y: centerY - halfHeight
        },
        {
            x: centerX + halfWidth,
            y: centerY + halfHeight
        },
        {
            x: centerX - halfWidth,
            y: centerY + halfHeight
        }
    ].map((point)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotatePoint"])({
            ...point,
            centerX,
            centerY,
            rotationRad
        }));
    const path = new Path2D();
    path.moveTo(corners[0].x, corners[0].y);
    for (const corner of corners.slice(1)){
        path.lineTo(corner.x, corner.y);
    }
    path.closePath();
    return path;
}
const cinematicBarsMaskDefinition = {
    type: "cinematic-bars",
    name: "Cinematic Bars",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "height-only"
    },
    params: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_LIKE_MASK_PARAMS"],
    interaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBoxMaskInteraction"])({
        sizeMode: "height-only",
        buildOverlayPath ({ width, height }) {
            return `M 0,0 H ${width} V ${height} H 0 Z`;
        }
    }),
    buildDefault (context) {
        return {
            type: "cinematic-bars",
            params: getDefaultCinematicBarsMaskParams(context)
        };
    },
    computeParamUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBoxMaskParamUpdate"],
    renderer: {
        body: {
            kind: "fillPath",
            buildPath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const centerX = width / 2 + params.centerX * width;
                const centerY = height / 2 + params.centerY * height;
                const maskWidth = Math.max(params.width * width, width);
                const maskHeight = Math.max(params.height, 0.01) * height;
                const rotationRad = params.rotation * Math.PI / 180;
                return buildBandPath({
                    centerX,
                    centerY,
                    halfWidth: maskWidth / 2,
                    halfHeight: maskHeight / 2,
                    rotationRad
                });
            }
        },
        stroke: {
            kind: "strokeFromPath",
            buildStrokePath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const centerX = width / 2 + params.centerX * width;
                const centerY = height / 2 + params.centerY * height;
                const rotationRad = params.rotation * Math.PI / 180;
                const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOffset"])({
                    strokeAlign: params.strokeAlign,
                    strokeWidth: params.strokeWidth
                });
                return buildBandPath({
                    centerX,
                    centerY,
                    halfWidth: Math.max(Math.max(params.width * width, width) / 2 + offset, 1),
                    halfHeight: Math.max(Math.max(params.height, 0.01) * height / 2 + offset, 1),
                    rotationRad
                });
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/diamond.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "diamondMaskDefinition",
    ()=>diamondMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/box-like.ts [app-client] (ecmascript)");
;
function buildDiamondPath({ centerX, centerY, halfWidth, halfHeight, rotationRad }) {
    const points = [
        {
            x: centerX,
            y: centerY - halfHeight
        },
        {
            x: centerX + halfWidth,
            y: centerY
        },
        {
            x: centerX,
            y: centerY + halfHeight
        },
        {
            x: centerX - halfWidth,
            y: centerY
        }
    ].map((point)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotatePoint"])({
            ...point,
            centerX,
            centerY,
            rotationRad
        }));
    const path = new Path2D();
    path.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)){
        path.lineTo(point.x, point.y);
    }
    path.closePath();
    return path;
}
const diamondMaskDefinition = {
    type: "diamond",
    name: "Diamond",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "width-height"
    },
    params: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_LIKE_MASK_PARAMS"],
    interaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBoxMaskInteraction"])({
        sizeMode: "width-height",
        buildOverlayPath ({ width, height }) {
            return `M ${width / 2},0 L ${width},${height / 2} L ${width / 2},${height} L 0,${height / 2} Z`;
        }
    }),
    buildDefault (context) {
        return {
            type: "diamond",
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultSquareMaskParams"])(context)
        };
    },
    computeParamUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBoxMaskParamUpdate"],
    renderer: {
        body: {
            kind: "fillPath",
            buildPath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                return buildDiamondPath({
                    centerX,
                    centerY,
                    halfWidth: maskWidth / 2,
                    halfHeight: maskHeight / 2,
                    rotationRad
                });
            }
        },
        stroke: {
            kind: "strokeFromPath",
            buildStrokePath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOffset"])({
                    strokeAlign: params.strokeAlign,
                    strokeWidth: params.strokeWidth
                });
                return buildDiamondPath({
                    centerX,
                    centerY,
                    halfWidth: Math.max(maskWidth / 2 + offset, 1),
                    halfHeight: Math.max(maskHeight / 2 + offset, 1),
                    rotationRad
                });
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/ellipse.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ellipseMaskDefinition",
    ()=>ellipseMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/box-like.ts [app-client] (ecmascript)");
;
const ellipseMaskDefinition = {
    type: "ellipse",
    name: "Ellipse",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "width-height"
    },
    params: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_LIKE_MASK_PARAMS"],
    interaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBoxMaskInteraction"])({
        sizeMode: "width-height",
        buildOverlayPath ({ width, height }) {
            const rx = Math.max((width - 1) / 2, 0);
            const ry = Math.max((height - 1) / 2, 0);
            const cx = width / 2;
            const cy = height / 2;
            return `M ${cx},${cy - ry} A ${rx},${ry} 0 1,1 ${cx},${cy + ry} A ${rx},${ry} 0 1,1 ${cx},${cy - ry} Z`;
        }
    }),
    buildDefault (context) {
        return {
            type: "ellipse",
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultSquareMaskParams"])(context)
        };
    },
    computeParamUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBoxMaskParamUpdate"],
    renderer: {
        body: {
            kind: "fillPath",
            buildPath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                const path = new Path2D();
                path.ellipse(centerX, centerY, maskWidth / 2, maskHeight / 2, rotationRad, 0, Math.PI * 2);
                return path;
            }
        },
        stroke: {
            kind: "strokeFromPath",
            buildStrokePath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOffset"])({
                    strokeAlign: params.strokeAlign,
                    strokeWidth: params.strokeWidth
                });
                const path = new Path2D();
                path.ellipse(centerX, centerY, Math.max(1, maskWidth / 2 + offset), Math.max(1, maskHeight / 2 + offset), rotationRad, 0, Math.PI * 2);
                return path;
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/heart.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "heartMaskDefinition",
    ()=>heartMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/box-like.ts [app-client] (ecmascript)");
;
function buildHeartPath({ centerX, centerY, halfWidth, halfHeight, rotationRad }) {
    const toPoint = ({ localX, localY })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotatePoint"])({
            x: centerX + localX,
            y: centerY + localY,
            centerX,
            centerY,
            rotationRad
        });
    const start = toPoint({
        localX: 0,
        localY: -halfHeight * 0.475
    });
    const rightControl1 = toPoint({
        localX: halfWidth,
        localY: -halfHeight * 1.225
    });
    const rightControl2 = toPoint({
        localX: halfWidth,
        localY: -halfHeight * 0.125
    });
    const bottom = toPoint({
        localX: 0,
        localY: halfHeight * 0.725
    });
    const leftControl1 = toPoint({
        localX: -halfWidth,
        localY: -halfHeight * 0.125
    });
    const leftControl2 = toPoint({
        localX: -halfWidth,
        localY: -halfHeight * 1.225
    });
    const path = new Path2D();
    path.moveTo(start.x, start.y);
    path.bezierCurveTo(rightControl1.x, rightControl1.y, rightControl2.x, rightControl2.y, bottom.x, bottom.y);
    path.bezierCurveTo(leftControl1.x, leftControl1.y, leftControl2.x, leftControl2.y, start.x, start.y);
    path.closePath();
    return path;
}
const heartMaskDefinition = {
    type: "heart",
    name: "Heart",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "width-height"
    },
    params: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_LIKE_MASK_PARAMS"],
    interaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBoxMaskInteraction"])({
        sizeMode: "width-height",
        buildOverlayPath ({ width, height }) {
            const cx = width / 2;
            const cy = height / 2;
            const halfWidth = width / 2;
            const halfHeight = height / 2;
            return [
                `M ${cx},${cy - halfHeight * 0.475}`,
                `C ${cx + halfWidth},${cy - halfHeight * 1.225} ${cx + halfWidth},${cy - halfHeight * 0.125} ${cx},${cy + halfHeight * 0.725}`,
                `C ${cx - halfWidth},${cy - halfHeight * 0.125} ${cx - halfWidth},${cy - halfHeight * 1.225} ${cx},${cy - halfHeight * 0.475}`,
                "Z"
            ].join(" ");
        }
    }),
    buildDefault (context) {
        return {
            type: "heart",
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultSquareMaskParams"])(context)
        };
    },
    computeParamUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBoxMaskParamUpdate"],
    renderer: {
        body: {
            kind: "fillPath",
            buildPath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                return buildHeartPath({
                    centerX,
                    centerY,
                    halfWidth: maskWidth / 2,
                    halfHeight: maskHeight / 2,
                    rotationRad
                });
            }
        },
        stroke: {
            kind: "strokeFromPath",
            buildStrokePath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOffset"])({
                    strokeAlign: params.strokeAlign,
                    strokeWidth: params.strokeWidth
                });
                return buildHeartPath({
                    centerX,
                    centerY,
                    halfWidth: Math.max(maskWidth / 2 + offset, 1),
                    halfHeight: Math.max(maskHeight / 2 + offset, 1),
                    rotationRad
                });
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/rectangle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rectangleMaskDefinition",
    ()=>rectangleMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/box-like.ts [app-client] (ecmascript)");
;
function buildRectanglePath({ centerX, centerY, halfWidth, halfHeight, rotationRad }) {
    const corners = [
        {
            x: centerX - halfWidth,
            y: centerY - halfHeight
        },
        {
            x: centerX + halfWidth,
            y: centerY - halfHeight
        },
        {
            x: centerX + halfWidth,
            y: centerY + halfHeight
        },
        {
            x: centerX - halfWidth,
            y: centerY + halfHeight
        }
    ].map((point)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotatePoint"])({
            ...point,
            centerX,
            centerY,
            rotationRad
        }));
    const path = new Path2D();
    path.moveTo(corners[0].x, corners[0].y);
    for (const corner of corners.slice(1)){
        path.lineTo(corner.x, corner.y);
    }
    path.closePath();
    return path;
}
const rectangleMaskDefinition = {
    type: "rectangle",
    name: "Rectangle",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "width-height"
    },
    params: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_LIKE_MASK_PARAMS"],
    interaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBoxMaskInteraction"])({
        sizeMode: "width-height"
    }),
    buildDefault (context) {
        return {
            type: "rectangle",
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultSquareMaskParams"])(context)
        };
    },
    computeParamUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBoxMaskParamUpdate"],
    renderer: {
        body: {
            kind: "fillPath",
            buildPath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                return buildRectanglePath({
                    centerX,
                    centerY,
                    halfWidth: maskWidth / 2,
                    halfHeight: maskHeight / 2,
                    rotationRad
                });
            }
        },
        stroke: {
            kind: "strokeFromPath",
            buildStrokePath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOffset"])({
                    strokeAlign: params.strokeAlign,
                    strokeWidth: params.strokeWidth
                });
                return buildRectanglePath({
                    centerX,
                    centerY,
                    halfWidth: Math.max(1, maskWidth / 2 + offset),
                    halfHeight: Math.max(1, maskHeight / 2 + offset),
                    rotationRad
                });
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "halfPlaneSign",
    ()=>halfPlaneSign,
    "lineEdgeIntersection",
    ()=>lineEdgeIntersection
]);
const LINE_PARALLEL_EPSILON = 1e-10;
function lineEdgeIntersection({ lineX, lineY, normalX, normalY, x1, y1, x2, y2 }) {
    const distance1 = halfPlaneSign({
        lineX,
        lineY,
        normalX,
        normalY,
        x: x1,
        y: y1
    });
    const distance2 = halfPlaneSign({
        lineX,
        lineY,
        normalX,
        normalY,
        x: x2,
        y: y2
    });
    const denom = distance1 - distance2;
    if (Math.abs(denom) < LINE_PARALLEL_EPSILON) return null;
    const t = distance1 / denom;
    if (t < 0 || t > 1) return null;
    return {
        x: x1 + (x2 - x1) * t,
        y: y1 + (y2 - y1) * t
    };
}
function halfPlaneSign({ lineX, lineY, normalX, normalY, x, y }) {
    return (x - lineX) * normalX + (y - lineY) * normalY;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/split.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSplitMaskStrokeSegment",
    ()=>getSplitMaskStrokeSegment,
    "splitMaskDefinition",
    ()=>splitMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/param-update.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/handle-positions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/snap.ts [app-client] (ecmascript)");
;
;
;
;
// cos(π/2) returns ~6e-17 in JS, not 0. Values below this threshold are snapped
// to exactly 0 to prevent opposite-sign float noise on canvas corners that lie
// exactly on the split line, which produces spurious midpoint vertices.
const NORMAL_SNAP_EPSILON = 1e-10;
// Guards against collinear vertices from float noise at canvas edges.
const MIN_POLYGON_AREA_PX = 0.5;
const INTERSECTION_EPSILON = 1e-6;
function polygonArea({ vertices }) {
    let area = 0;
    for(let i = 0; i < vertices.length; i++){
        const [x1, y1] = vertices[i];
        const [x2, y2] = vertices[(i + 1) % vertices.length];
        area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area) * 0.5;
}
function splitLineGeometry({ centerX, centerY, rotation, width, height }) {
    const angleRad = rotation * Math.PI / 180;
    const normalX = Math.abs(Math.cos(angleRad)) < NORMAL_SNAP_EPSILON ? 0 : Math.cos(angleRad);
    const normalY = Math.abs(Math.sin(angleRad)) < NORMAL_SNAP_EPSILON ? 0 : Math.sin(angleRad);
    const lineX = width / 2 + centerX * width;
    const lineY = height / 2 + centerY * height;
    return {
        normalX,
        normalY,
        lineX,
        lineY
    };
}
function pointsEqual({ a, b }) {
    return Math.abs(a.x - b.x) <= INTERSECTION_EPSILON && Math.abs(a.y - b.y) <= INTERSECTION_EPSILON;
}
function getSplitMaskStrokeSegment({ resolvedParams, width, height }) {
    const { centerX, centerY, rotation } = resolvedParams;
    const { normalX, normalY, lineX, lineY } = splitLineGeometry({
        centerX,
        centerY,
        rotation,
        width,
        height
    });
    const edges = [
        [
            0,
            0,
            width,
            0
        ],
        [
            width,
            0,
            width,
            height
        ],
        [
            width,
            height,
            0,
            height
        ],
        [
            0,
            height,
            0,
            0
        ]
    ];
    const intersections = [];
    for (const [x1, y1, x2, y2] of edges){
        const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineEdgeIntersection"])({
            lineX,
            lineY,
            normalX,
            normalY,
            x1,
            y1,
            x2,
            y2
        });
        if (!hit || intersections.some((point)=>pointsEqual({
                a: point,
                b: hit
            }))) {
            continue;
        }
        intersections.push(hit);
    }
    if (intersections.length !== 2) {
        return null;
    }
    return [
        intersections[0],
        intersections[1]
    ];
}
function computeSplitMaskParamUpdate({ handleId, startParams, deltaX, deltaY, startCanvasX, startCanvasY, bounds, canvasSize }) {
    if (handleId.kind === "position") {
        const rawX = startParams.centerX + deltaX / bounds.width;
        const rawY = startParams.centerY + deltaY / bounds.height;
        const minX = -bounds.cx / bounds.width;
        const maxX = (canvasSize.width - bounds.cx) / bounds.width;
        const minY = -bounds.cy / bounds.height;
        const maxY = (canvasSize.height - bounds.cy) / bounds.height;
        return {
            centerX: Math.max(minX, Math.min(maxX, rawX)),
            centerY: Math.max(minY, Math.min(maxY, rawY))
        };
    }
    if (handleId.kind === "feather") {
        const angleRad = startParams.rotation * Math.PI / 180;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeFeatherUpdate"])({
            startFeather: startParams.feather,
            deltaX,
            deltaY,
            directionX: -Math.cos(angleRad),
            directionY: -Math.sin(angleRad)
        });
    }
    if (handleId.kind === "rotation") {
        const pivotX = bounds.cx + startParams.centerX * bounds.width;
        const pivotY = bounds.cy + startParams.centerY * bounds.height;
        const startAngle = Math.atan2(startCanvasY - pivotY, startCanvasX - pivotX) * 180 / Math.PI;
        const currentAngle = Math.atan2(startCanvasY + deltaY - pivotY, startCanvasX + deltaX - pivotX) * 180 / Math.PI;
        let deltaAngle = currentAngle - startAngle;
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;
        return {
            rotation: ((startParams.rotation + deltaAngle) % 360 + 360) % 360
        };
    }
    return {};
}
const splitMaskDefinition = {
    type: "split",
    name: "Split",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "none"
    },
    interaction: {
        getInteraction ({ params, bounds, displayScale, scaleX: _scaleX, scaleY: _scaleY }) {
            return {
                handles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineMaskHandlePositions"])({
                    centerX: params.centerX,
                    centerY: params.centerY,
                    rotation: params.rotation,
                    feather: params.feather,
                    bounds,
                    displayScale
                }),
                overlays: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLineMaskOverlay"])({
                        centerX: params.centerX,
                        centerY: params.centerY,
                        rotation: params.rotation,
                        bounds
                    })
                ]
            };
        },
        snap (args) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapSplitMaskInteraction"])(args);
        }
    },
    buildDefault () {
        return {
            type: "split",
            params: {
                feather: 0,
                inverted: false,
                strokeColor: "#ffffff",
                strokeWidth: 0,
                strokeAlign: "center",
                centerX: 0,
                centerY: 0,
                rotation: 0
            }
        };
    },
    computeParamUpdate: computeSplitMaskParamUpdate,
    params: [
        {
            key: "centerX",
            label: "X",
            type: "number",
            default: 0,
            min: -100,
            max: 100,
            step: 1,
            displayMultiplier: 100
        },
        {
            key: "centerY",
            label: "Y",
            type: "number",
            default: 0,
            min: -100,
            max: 100,
            step: 1,
            displayMultiplier: 100
        },
        {
            key: "rotation",
            label: "Rotation",
            type: "number",
            default: 0,
            min: 0,
            max: 360,
            step: 1
        }
    ],
    renderer: {
        body: {
            kind: "drawWithFeather",
            drawWithFeather ({ resolvedParams, ctx, width, height, feather }) {
                const { centerX, centerY, rotation } = resolvedParams;
                const { normalX, normalY, lineX, lineY } = splitLineGeometry({
                    centerX,
                    centerY,
                    rotation,
                    width,
                    height
                });
                // Analytical gradient avoids JFA's two-sided distance artifact near canvas edges.
                const featherHalf = feather / 2;
                const gradient = ctx.createLinearGradient(lineX - normalX * featherHalf, lineY - normalY * featherHalf, lineX + normalX * featherHalf, lineY + normalY * featherHalf);
                gradient.addColorStop(0, "rgba(255,255,255,0)");
                gradient.addColorStop(1, "white");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            },
            opaqueFastPath: {
                buildPath ({ resolvedParams, width, height }) {
                    const { centerX, centerY, rotation } = resolvedParams;
                    const { normalX, normalY, lineX, lineY } = splitLineGeometry({
                        centerX,
                        centerY,
                        rotation,
                        width,
                        height
                    });
                    const edges = [
                        [
                            0,
                            0,
                            width,
                            0
                        ],
                        [
                            width,
                            0,
                            width,
                            height
                        ],
                        [
                            width,
                            height,
                            0,
                            height
                        ],
                        [
                            0,
                            height,
                            0,
                            0
                        ]
                    ];
                    const isInsideHalfPlane = ({ x, y })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["halfPlaneSign"])({
                            lineX,
                            lineY,
                            normalX,
                            normalY,
                            x,
                            y
                        }) >= 0;
                    const vertices = [];
                    for (const [x1, y1, x2, y2] of edges){
                        const isVertex1Inside = isInsideHalfPlane({
                            x: x1,
                            y: y1
                        });
                        const isVertex2Inside = isInsideHalfPlane({
                            x: x2,
                            y: y2
                        });
                        if (isVertex1Inside && isVertex2Inside) {
                            vertices.push([
                                x2,
                                y2
                            ]);
                        } else if (isVertex1Inside && !isVertex2Inside) {
                            const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineEdgeIntersection"])({
                                lineX,
                                lineY,
                                normalX,
                                normalY,
                                x1,
                                y1,
                                x2,
                                y2
                            });
                            if (hit) vertices.push([
                                hit.x,
                                hit.y
                            ]);
                        } else if (!isVertex1Inside && isVertex2Inside) {
                            const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineEdgeIntersection"])({
                                lineX,
                                lineY,
                                normalX,
                                normalY,
                                x1,
                                y1,
                                x2,
                                y2
                            });
                            if (hit) {
                                vertices.push([
                                    hit.x,
                                    hit.y
                                ]);
                                vertices.push([
                                    x2,
                                    y2
                                ]);
                            }
                        }
                    }
                    if (vertices.length < 3 || polygonArea({
                        vertices
                    }) < MIN_POLYGON_AREA_PX) {
                        return new Path2D();
                    }
                    const path = new Path2D();
                    path.moveTo(vertices[0][0], vertices[0][1]);
                    for(let i = 1; i < vertices.length; i++){
                        path.lineTo(vertices[i][0], vertices[i][1]);
                    }
                    path.closePath();
                    return path;
                }
            }
        },
        stroke: {
            kind: "strokeFromPath",
            buildStrokePath ({ resolvedParams, width, height }) {
                const segment = getSplitMaskStrokeSegment({
                    resolvedParams,
                    width,
                    height
                });
                const path = new Path2D();
                if (!segment) {
                    return path;
                }
                path.moveTo(segment[0].x, segment[0].y);
                path.lineTo(segment[1].x, segment[1].y);
                return path;
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/star.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "starMaskDefinition",
    ()=>starMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/box-like.ts [app-client] (ecmascript)");
;
const STAR_INNER_RADIUS_RATIO = 0.45;
const STAR_VERTEX_COUNT = 10;
function buildStarPath({ centerX, centerY, halfWidth, halfHeight, rotationRad }) {
    const path = new Path2D();
    for(let index = 0; index < STAR_VERTEX_COUNT; index++){
        const isOuterVertex = index % 2 === 0;
        const radiusX = isOuterVertex ? halfWidth : halfWidth * STAR_INNER_RADIUS_RATIO;
        const radiusY = isOuterVertex ? halfHeight : halfHeight * STAR_INNER_RADIUS_RATIO;
        const angle = index * Math.PI / 5 - Math.PI / 2;
        const point = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotatePoint"])({
            x: centerX + radiusX * Math.cos(angle),
            y: centerY + radiusY * Math.sin(angle),
            centerX,
            centerY,
            rotationRad
        });
        if (index === 0) {
            path.moveTo(point.x, point.y);
        } else {
            path.lineTo(point.x, point.y);
        }
    }
    path.closePath();
    return path;
}
function buildOverlayStarPath({ width, height }) {
    const centerX = width / 2;
    const centerY = height / 2;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const segments = [];
    for(let index = 0; index < STAR_VERTEX_COUNT; index++){
        const isOuterVertex = index % 2 === 0;
        const radiusX = isOuterVertex ? halfWidth : halfWidth * STAR_INNER_RADIUS_RATIO;
        const radiusY = isOuterVertex ? halfHeight : halfHeight * STAR_INNER_RADIUS_RATIO;
        const angle = index * Math.PI / 5 - Math.PI / 2;
        const x = centerX + radiusX * Math.cos(angle);
        const y = centerY + radiusY * Math.sin(angle);
        segments.push(`${index === 0 ? "M" : "L"} ${x},${y}`);
    }
    return `${segments.join(" ")} Z`;
}
const starMaskDefinition = {
    type: "star",
    name: "Star",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "width-height"
    },
    params: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOX_LIKE_MASK_PARAMS"],
    interaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBoxMaskInteraction"])({
        sizeMode: "width-height",
        buildOverlayPath ({ width, height }) {
            return buildOverlayStarPath({
                width,
                height
            });
        }
    }),
    buildDefault (context) {
        return {
            type: "star",
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultSquareMaskParams"])(context)
        };
    },
    computeParamUpdate: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBoxMaskParamUpdate"],
    renderer: {
        body: {
            kind: "fillPath",
            buildPath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                return buildStarPath({
                    centerX,
                    centerY,
                    halfWidth: maskWidth / 2,
                    halfHeight: maskHeight / 2,
                    rotationRad
                });
            }
        },
        stroke: {
            kind: "strokeFromPath",
            buildStrokePath ({ resolvedParams, width, height }) {
                const params = resolvedParams;
                const { centerX, centerY, maskWidth, maskHeight, rotationRad } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxLikeGeometry"])({
                    params,
                    width,
                    height
                });
                const offset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$box$2d$like$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStrokeOffset"])({
                    strokeAlign: params.strokeAlign,
                    strokeWidth: params.strokeWidth
                });
                return buildStarPath({
                    centerX,
                    centerY,
                    halfWidth: Math.max(maskWidth / 2 + offset, 1),
                    halfHeight: Math.max(maskHeight / 2 + offset, 1),
                    rotationRad
                });
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/masks/builtin/definitions/text.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "textMaskDefinition",
    ()=>textMaskDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/typography.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/primitives.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/measure-element.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/handle-positions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/param-update.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/preview-snap.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const PERCENTAGE_DISPLAY = {
    displayMultiplier: 100,
    step: 1
};
const TEXT_MASK_ALIGNMENT = "center";
const TEXT_MASK_PARAMS = [
    {
        key: "centerX",
        label: "X",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "centerY",
        label: "Y",
        type: "number",
        default: 0,
        min: -100,
        max: 100,
        ...PERCENTAGE_DISPLAY
    },
    {
        key: "fontSize",
        label: "Size",
        type: "number",
        default: 15,
        min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_FONT_SIZE"],
        max: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_FONT_SIZE"],
        step: 1
    },
    {
        key: "rotation",
        label: "Rotation",
        type: "number",
        default: 0,
        min: 0,
        max: 360,
        step: 1
    },
    {
        key: "scale",
        label: "Scale",
        type: "number",
        default: 1,
        min: 1,
        max: 500,
        ...PERCENTAGE_DISPLAY
    }
];
function measureTextMask({ params, height }) {
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureTextLayout"])({
        text: {
            content: params.content,
            fontSize: params.fontSize,
            fontFamily: params.fontFamily,
            fontWeight: params.fontWeight,
            fontStyle: params.fontStyle,
            textAlign: TEXT_MASK_ALIGNMENT,
            textDecoration: params.textDecoration,
            letterSpacing: params.letterSpacing,
            lineHeight: params.lineHeight
        },
        canvasHeight: height,
        ctx: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTextMeasurementContext"])()
    });
    const visualRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTextVisualRect"])({
        textAlign: layout.textAlign,
        block: layout.block,
        background: {
            enabled: false,
            color: "transparent"
        },
        fontSizeRatio: layout.fontSizeRatio
    });
    return {
        layout,
        intrinsicWidth: Math.max(1, visualRect.width),
        intrinsicHeight: Math.max(1, visualRect.height)
    };
}
function getScalePreferredEdges({ handleId }) {
    if (handleId.kind !== "scale") {
        return undefined;
    }
    return {
        right: true,
        bottom: true
    };
}
function computeTextMaskParamUpdate({ handleId, startParams, deltaX, deltaY, startCanvasX, startCanvasY, bounds }) {
    if (handleId.kind === "position") {
        return {
            centerX: startParams.centerX + deltaX / bounds.width,
            centerY: startParams.centerY + deltaY / bounds.height
        };
    }
    const pivotX = bounds.cx + startParams.centerX * bounds.width;
    const pivotY = bounds.cy + startParams.centerY * bounds.height;
    if (handleId.kind === "rotation") {
        const startAngle = Math.atan2(startCanvasY - pivotY, startCanvasX - pivotX) * 180 / Math.PI;
        const currentAngle = Math.atan2(startCanvasY + deltaY - pivotY, startCanvasX + deltaX - pivotX) * 180 / Math.PI;
        let deltaAngle = currentAngle - startAngle;
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;
        return {
            rotation: ((startParams.rotation + deltaAngle) % 360 + 360) % 360
        };
    }
    if (handleId.kind === "feather") {
        const angleRad = startParams.rotation * Math.PI / 180;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$param$2d$update$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeFeatherUpdate"])({
            startFeather: startParams.feather,
            deltaX,
            deltaY,
            directionX: -Math.sin(angleRad),
            directionY: Math.cos(angleRad)
        });
    }
    if (handleId.kind === "scale") {
        const startDistance = Math.hypot(startCanvasX - pivotX, startCanvasY - pivotY);
        const currentDistance = Math.hypot(startCanvasX + deltaX - pivotX, startCanvasY + deltaY - pivotY);
        const scaleFactor = startDistance > 0 ? currentDistance / startDistance : 1;
        return {
            scale: Math.max(0.01, startParams.scale * scaleFactor)
        };
    }
    return {};
}
const textMaskDefinition = {
    type: "text",
    name: "Text",
    features: {
        hasPosition: true,
        hasRotation: true,
        sizeMode: "uniform"
    },
    params: TEXT_MASK_PARAMS,
    interaction: {
        getInteraction ({ params, bounds, displayScale, scaleX: _scaleX, scaleY: _scaleY }) {
            const { intrinsicWidth, intrinsicHeight } = measureTextMask({
                params,
                height: bounds.height
            });
            const width = intrinsicWidth * params.scale / bounds.width;
            const height = intrinsicHeight * params.scale / bounds.height;
            return {
                handles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxMaskHandlePositions"])({
                    centerX: params.centerX,
                    centerY: params.centerY,
                    width,
                    height,
                    rotation: params.rotation,
                    feather: params.feather,
                    sizeMode: "uniform",
                    bounds,
                    displayScale
                }),
                overlays: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$handle$2d$positions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoxMaskRectOverlay"])({
                        centerX: params.centerX,
                        centerY: params.centerY,
                        width,
                        height,
                        rotation: params.rotation,
                        bounds
                    })
                ]
            };
        },
        snap ({ handleId, startParams, proposedParams, bounds, canvasSize, snapThreshold }) {
            const { intrinsicWidth, intrinsicHeight } = measureTextMask({
                params: startParams,
                height: bounds.height
            });
            const position = {
                x: proposedParams.centerX * bounds.width,
                y: proposedParams.centerY * bounds.height
            };
            if (handleId.kind === "position") {
                const { snappedPosition, activeLines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapPosition"])({
                    proposedPosition: position,
                    canvasSize: bounds,
                    elementSize: {
                        width: intrinsicWidth * proposedParams.scale,
                        height: intrinsicHeight * proposedParams.scale
                    },
                    rotation: proposedParams.rotation,
                    snapThreshold
                });
                return {
                    params: {
                        ...proposedParams,
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMaskLocalCenter"])({
                            center: snappedPosition,
                            bounds
                        })
                    },
                    activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                        lines: activeLines,
                        bounds,
                        canvasSize
                    })
                };
            }
            if (handleId.kind === "rotation") {
                const { snappedRotation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapRotation"])({
                    proposedRotation: proposedParams.rotation
                });
                return {
                    params: {
                        ...proposedParams,
                        rotation: snappedRotation
                    },
                    activeLines: []
                };
            }
            if (handleId.kind === "scale") {
                const { snappedScale, activeLines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapScale"])({
                    proposedScale: proposedParams.scale,
                    position,
                    baseWidth: intrinsicWidth,
                    baseHeight: intrinsicHeight,
                    rotation: proposedParams.rotation,
                    canvasSize: bounds,
                    snapThreshold,
                    preferredEdges: getScalePreferredEdges({
                        handleId
                    })
                });
                return {
                    params: {
                        ...proposedParams,
                        scale: Math.max(0.01, snappedScale)
                    },
                    activeLines: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toGlobalMaskSnapLines"])({
                        lines: activeLines,
                        bounds,
                        canvasSize
                    })
                };
            }
            return {
                params: proposedParams,
                activeLines: []
            };
        }
    },
    buildDefault () {
        return {
            type: "text",
            params: {
                feather: 0,
                inverted: false,
                strokeColor: "#ffffff",
                strokeWidth: 0,
                strokeAlign: "center",
                content: "Mask",
                fontSize: 15,
                fontFamily: "Arial",
                fontWeight: "normal",
                fontStyle: "normal",
                textDecoration: "none",
                letterSpacing: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.letterSpacing,
                lineHeight: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.lineHeight,
                centerX: 0,
                centerY: 0,
                rotation: 0,
                scale: 1
            }
        };
    },
    computeParamUpdate: computeTextMaskParamUpdate,
    isActive (params) {
        return params.content.trim().length > 0;
    },
    renderer: {
        body: {
            kind: "drawOpaque",
            drawOpaque ({ resolvedParams, ctx, width, height }) {
                const params = resolvedParams;
                const { layout } = measureTextMask({
                    params,
                    height
                });
                ctx.save();
                ctx.translate(width / 2 + params.centerX * width, height / 2 + params.centerY * height);
                ctx.scale(params.scale, params.scale);
                if (params.rotation) {
                    ctx.rotate(params.rotation * Math.PI / 180);
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawMeasuredTextLayout"])({
                    ctx,
                    layout,
                    textColor: "#ffffff",
                    background: null
                });
                ctx.restore();
            }
        },
        stroke: {
            kind: "renderStroke",
            renderStroke ({ resolvedParams, ctx, width, height }) {
                const params = resolvedParams;
                const { layout } = measureTextMask({
                    params,
                    height
                });
                ctx.save();
                ctx.translate(width / 2 + params.centerX * width, height / 2 + params.centerY * height);
                ctx.scale(params.scale, params.scale);
                if (params.rotation) {
                    ctx.rotate(params.rotation * Math.PI / 180);
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["strokeMeasuredTextLayout"])({
                    ctx,
                    layout,
                    strokeColor: params.strokeColor,
                    strokeWidth: params.strokeWidth
                });
                if (params.strokeAlign === "inside") {
                    ctx.globalCompositeOperation = "destination-in";
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawMeasuredTextLayout"])({
                        ctx,
                        layout,
                        textColor: "#ffffff",
                        background: null
                    });
                }
                if (params.strokeAlign === "outside") {
                    ctx.globalCompositeOperation = "destination-out";
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawMeasuredTextLayout"])({
                        ctx,
                        layout,
                        textColor: "#ffffff",
                        background: null
                    });
                }
                ctx.restore();
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/masks/builtin/definitions/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "registerDefaultMasks",
    ()=>registerDefaultMasks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$cinematic$2d$bars$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/cinematic-bars.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$diamond$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/diamond.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$ellipse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/ellipse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$heart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/heart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$rectangle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/rectangle.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$split$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/split.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$star$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/star.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/text.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$definition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/freeform/definition.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MinusSignIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusSignIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/MinusSignIcon.js [app-client] (ecmascript) <export default as MinusSignIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PanelRightDashedIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightDashedIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/PanelRightDashedIcon.js [app-client] (ecmascript) <export default as PanelRightDashedIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/SquareIcon.js [app-client] (ecmascript) <export default as SquareIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/CircleIcon.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FavouriteIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FavouriteIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/FavouriteIcon.js [app-client] (ecmascript) <export default as FavouriteIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DiamondIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DiamondIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/DiamondIcon.js [app-client] (ecmascript) <export default as DiamondIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$StarsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StarsIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/StarsIcon.js [app-client] (ecmascript) <export default as StarsIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TextFontIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextFontIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/TextFontIcon.js [app-client] (ecmascript) <export default as TextFontIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PenToolAddIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenToolAddIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/PenToolAddIcon.js [app-client] (ecmascript) <export default as PenToolAddIcon>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function registerDefaultMask({ definition, icon }) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["masksRegistry"].has(definition.type)) {
        return;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["masksRegistry"].registerMask({
        definition,
        icon
    });
}
function registerDefaultMasks() {
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$split$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PanelRightDashedIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightDashedIcon$3e$__["PanelRightDashedIcon"],
            strokeWidth: 1
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$cinematic$2d$bars$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cinematicBarsMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$MinusSignIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MinusSignIcon$3e$__["MinusSignIcon"]
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$rectangle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectangleMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$SquareIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareIcon$3e$__["SquareIcon"]
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$ellipse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ellipseMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$CircleIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"]
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$heart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["heartMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FavouriteIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FavouriteIcon$3e$__["FavouriteIcon"]
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$diamond$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diamondMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$DiamondIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DiamondIcon$3e$__["DiamondIcon"]
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$star$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$StarsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StarsIcon$3e$__["StarsIcon"]
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TextFontIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextFontIcon$3e$__["TextFontIcon"]
        }
    });
    registerDefaultMask({
        definition: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$definition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["freeformMaskDefinition"],
        icon: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PenToolAddIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenToolAddIcon$3e$__["PenToolAddIcon"]
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/masks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildDefaultMaskInstance",
    ()=>buildDefaultMaskInstance,
    "getMaskDefinition",
    ()=>getMaskDefinition,
    "getMaskDefinitionsForMenu",
    ()=>getMaskDefinitionsForMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/builtin/definitions/index.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$builtin$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function withMaskId({ mask, id }) {
    switch(mask.type){
        case "split":
            return {
                ...mask,
                id
            };
        case "cinematic-bars":
            return {
                ...mask,
                id
            };
        case "rectangle":
            return {
                ...mask,
                id
            };
        case "ellipse":
            return {
                ...mask,
                id
            };
        case "heart":
            return {
                ...mask,
                id
            };
        case "diamond":
            return {
                ...mask,
                id
            };
        case "star":
            return {
                ...mask,
                id
            };
        case "text":
            return {
                ...mask,
                id
            };
        case "freeform":
            return {
                ...mask,
                id
            };
    }
}
function getMaskDefinition(maskType) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["masksRegistry"].get(maskType);
}
function getMaskDefinitionsForMenu() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["masksRegistry"].getAll();
}
function buildDefaultMaskInstance({ maskType, elementSize }) {
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["masksRegistry"].get(maskType);
    const context = {
        elementSize
    };
    return withMaskId({
        mask: definition.buildDefault(context),
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])()
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/masks/components/masks-tab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MasksTab",
    ()=>MasksTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/masks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$hooks$2f$use$2d$element$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/hooks/use-element-preview.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$menu$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-menu-preview.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/element-bounds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowExpandIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowExpandIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/ArrowExpandIcon.js [app-client] (ecmascript) <export default as ArrowExpandIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/Delete02Icon.js [app-client] (ecmascript) <export default as Delete02Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FeatherIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FeatherIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/FeatherIcon.js [app-client] (ecmascript) <export default as FeatherIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PlusSignIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSignIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/PlusSignIcon.js [app-client] (ecmascript) <export default as PlusSignIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$RotateClockwiseIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateClockwiseIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/RotateClockwiseIcon.js [app-client] (ecmascript) <export default as RotateClockwiseIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TextFontIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextFontIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/TextFontIcon.js [app-client] (ecmascript) <export default as TextFontIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$color$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/color-picker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$font$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/font-picker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$number$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/number-field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editor$2f$panels$2f$properties$2f$hooks$2f$use$2d$property$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/editor/panels/properties/hooks/use-property-draft.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$icons$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/components/icons/index.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$icons$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/icons/ui.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$ui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/ui.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$hooks$2f$use$2d$element$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$menu$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$hooks$2f$use$2d$element$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$menu$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
;
;
;
;
function isTextMask(mask) {
    return mask.type === "text";
}
function withPreviewedMaskParam({ mask, key, value }) {
    switch(mask.type){
        case "split":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "cinematic-bars":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "rectangle":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "ellipse":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "heart":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "diamond":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "star":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "text":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
        case "freeform":
            return {
                ...mask,
                params: {
                    ...mask.params,
                    [key]: value
                }
            };
    }
}
function MasksTab({ element, trackId }) {
    _s();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const { renderElement, previewUpdates, commit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$hooks$2f$use$2d$element$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElementPreview"])({
        trackId,
        elementId: element.id,
        fallback: element
    });
    const maskDefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMaskDefinitionsForMenu"])();
    const tracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "MasksTab.useEditor[tracks]": (e)=>e.timeline.getPreviewTracks() ?? e.scenes.getActiveScene().tracks
    }["MasksTab.useEditor[tracks]"]);
    const currentTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "MasksTab.useEditor[currentTime]": (e)=>e.playback.getCurrentTime()
    }["MasksTab.useEditor[currentTime]"]);
    const mediaAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "MasksTab.useEditor[mediaAssets]": (e)=>e.media.getAssets()
    }["MasksTab.useEditor[mediaAssets]"]);
    const canvasSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "MasksTab.useEditor[canvasSize]": (e)=>e.project.getActive().settings.canvasSize
    }["MasksTab.useEditor[canvasSize]"]);
    const masks = element.masks ?? [];
    const renderMasks = renderElement.masks ?? masks;
    const hasMask = masks.length > 0;
    const { onPointerLeave, onOpenChange, markCommitted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$menu$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuPreview"])();
    const [isDropdownOpen, setIsDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const elementBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MasksTab.useMemo[elementBounds]": ()=>{
            const clampedTime = Math.min(Math.max(currentTime, element.startTime), element.startTime + element.duration - 1);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisibleElementsWithBounds"])({
                tracks,
                currentTime: clampedTime,
                canvasSize,
                mediaAssets
            }).find({
                "MasksTab.useMemo[elementBounds]": (item)=>item.trackId === trackId && item.elementId === element.id
            }["MasksTab.useMemo[elementBounds]"])?.bounds ?? null;
        }
    }["MasksTab.useMemo[elementBounds]"], [
        canvasSize,
        currentTime,
        element.duration,
        element.id,
        element.startTime,
        mediaAssets,
        trackId,
        tracks
    ]);
    const handleDropdownOpenChange = (open)=>{
        if (hasMask && open) return;
        setIsDropdownOpen(open);
        onOpenChange(open);
    };
    const previewMask = ({ maskType })=>{
        editor.timeline.previewElements({
            updates: [
                {
                    trackId,
                    elementId: element.id,
                    updates: {
                        masks: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildDefaultMaskInstance"])({
                                maskType,
                                elementSize: elementBounds ? {
                                    width: elementBounds.width,
                                    height: elementBounds.height
                                } : undefined
                            })
                        ]
                    }
                }
            ]
        });
    };
    const commitMask = ({ maskType })=>{
        if (editor.timeline.isPreviewActive()) {
            editor.timeline.commitPreview();
        } else {
            editor.timeline.updateElements({
                updates: [
                    {
                        trackId,
                        elementId: element.id,
                        patch: {
                            masks: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildDefaultMaskInstance"])({
                                    maskType,
                                    elementSize: elementBounds ? {
                                        width: elementBounds.width,
                                        height: elementBounds.height
                                    } : undefined
                                })
                            ]
                        }
                    }
                ]
            });
        }
        markCommitted();
        setIsDropdownOpen(false);
    };
    const previewMaskParam = ({ index, key })=>(value)=>{
            if (!renderMasks[index]) {
                return;
            }
            const updatedMasks = renderMasks.map((existingMask, maskIndex)=>maskIndex !== index ? existingMask : withPreviewedMaskParam({
                    mask: existingMask,
                    key,
                    value
                }));
            previewUpdates({
                masks: updatedMasks
            });
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b px-3.5 h-11 shrink-0 flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTitle"], {
                        children: "Masks"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 257,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                        open: hasMask ? false : isDropdownOpen,
                        onOpenChange: handleDropdownOpenChange,
                        children: [
                            hasMask ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "icon",
                                                disabled: true,
                                                "aria-label": "Add mask",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PlusSignIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSignIcon$3e$__["PlusSignIcon"],
                                                    className: "size-3.5!"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 11
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                                lineNumber: 266,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                            lineNumber: 265,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                        lineNumber: 264,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                        className: "max-w-56 text-balance",
                                        children: "Only one mask is supported right now. If you need more, duplicate the clip and apply a different mask to each copy."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                        lineNumber: 276,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                lineNumber: 263,
                                columnNumber: 7
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    "aria-label": "Add mask",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PlusSignIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusSignIcon$3e$__["PlusSignIcon"],
                                        className: "size-3.5!"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                        lineNumber: 284,
                                        columnNumber: 9
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                    lineNumber: 283,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                lineNumber: 282,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                className: "w-40",
                                onPointerLeave: onPointerLeave,
                                children: maskDefs.map((definition)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                        onPointerEnter: ()=>previewMask({
                                                maskType: definition.type
                                            }),
                                        onClick: ()=>commitMask({
                                                maskType: definition.type
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                                                ...definition.icon
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                                lineNumber: 297,
                                                columnNumber: 9
                                            }, this),
                                            definition.name
                                        ]
                                    }, definition.type, true, {
                                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                        lineNumber: 290,
                                        columnNumber: 8
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                lineNumber: 288,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 258,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 256,
                columnNumber: 4
            }, this),
            masks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyView, {
                onAddMask: ()=>setIsDropdownOpen(true)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 306,
                columnNumber: 5
            }, this) : masks.map((mask, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskItem, {
                    trackId: trackId,
                    elementId: element.id,
                    mask: renderMasks[index] ?? mask,
                    previewParam: (paramKey)=>previewMaskParam({
                            index,
                            key: paramKey
                        }),
                    onCommit: commit
                }, mask.id, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 309,
                    columnNumber: 6
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
        lineNumber: 255,
        columnNumber: 3
    }, this);
}
_s(MasksTab, "uwUItu1mGmXqxN3ELP3PbrD1EBY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$hooks$2f$use$2d$element$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useElementPreview"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$menu$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMenuPreview"]
    ];
});
_c = MasksTab;
function MaskItem({ trackId, elementId, mask, previewParam, onCommit }) {
    _s1();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const definition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMaskDefinition"])(mask.type);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Section"], {
        sectionKey: `mask-item:${mask.id}`,
        showTopBorder: false,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionHeader"], {
                trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            "aria-label": `Toggle ${definition.name} mask inversion`,
                            onClick: ()=>editor.timeline.toggleMaskInverted({
                                    trackId,
                                    elementId,
                                    maskId: mask.id
                                }),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$icons$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OcMirrorIcon"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$ui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(mask.params.inverted && "-scale-x-100")
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                lineNumber: 352,
                                columnNumber: 8
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 340,
                            columnNumber: 7
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            "aria-label": `Remove ${definition.name} mask`,
                            onClick: ()=>editor.timeline.removeMask({
                                    trackId,
                                    elementId,
                                    maskId: mask.id
                                }),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Delete02Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Delete02Icon$3e$__["Delete02Icon"]
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                lineNumber: 368,
                                columnNumber: 8
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 356,
                            columnNumber: 7
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 339,
                    columnNumber: 6
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                            ...definition.icon,
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 374,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionTitle"], {
                            className: "capitalize font-normal",
                            children: definition.name
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 375,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 373,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 337,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskParamsFields, {
                    mask: mask,
                    definition: definition,
                    previewParam: previewParam,
                    onCommit: onCommit
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 381,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 380,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
        lineNumber: 336,
        columnNumber: 3
    }, this);
}
_s1(MaskItem, "t0rsU/t1p+LiVrRpHUSgNnV9Lz4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"]
    ];
});
_c1 = MaskItem;
function MaskParamsFields({ mask, definition, previewParam, onCommit }) {
    const featherParam = getNumberParamDefinition({
        definition,
        key: "feather"
    });
    const strokeWidthParam = getNumberParamDefinition({
        definition,
        key: "strokeWidth"
    });
    const previewNumberParam = (key)=>(value)=>previewParam(key)(value);
    const previewStrokeColor = previewParam("strokeColor");
    const strokeAlignParam = definition.params.find((param)=>param.key === "strokeAlign" && param.type === "select");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionFields"], {
        children: [
            isTextMask(mask) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextMaskFields, {
                mask: mask,
                previewParam: previewParam,
                onCommit: onCommit,
                fontSizeParam: getNumberParamDefinition({
                    definition,
                    key: "fontSize"
                })
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 422,
                columnNumber: 5
            }, this) : null,
            definition.features.hasPosition && "centerX" in mask.params && "centerY" in mask.params && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Position",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                            className: "flex-1",
                            icon: "X",
                            param: getNumberParamDefinition({
                                definition,
                                key: "centerX"
                            }),
                            value: getMaskNumber({
                                params: mask.params,
                                key: "centerX"
                            }),
                            onPreview: previewNumberParam("centerX"),
                            onCommit: onCommit
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 437,
                            columnNumber: 8
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                            className: "flex-1",
                            icon: "Y",
                            param: getNumberParamDefinition({
                                definition,
                                key: "centerY"
                            }),
                            value: getMaskNumber({
                                params: mask.params,
                                key: "centerY"
                            }),
                            onPreview: previewNumberParam("centerY"),
                            onCommit: onCommit
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 451,
                            columnNumber: 8
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 436,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 435,
                columnNumber: 6
            }, this),
            definition.features.sizeMode === "width-height" && "width" in mask.params && "height" in mask.params && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Size",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                            className: "flex-1",
                            icon: "W",
                            param: getNumberParamDefinition({
                                definition,
                                key: "width"
                            }),
                            value: getMaskNumber({
                                params: mask.params,
                                key: "width"
                            }),
                            onPreview: previewNumberParam("width"),
                            onCommit: onCommit
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 474,
                            columnNumber: 8
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                            className: "flex-1",
                            icon: "H",
                            param: getNumberParamDefinition({
                                definition,
                                key: "height"
                            }),
                            value: getMaskNumber({
                                params: mask.params,
                                key: "height"
                            }),
                            onPreview: previewNumberParam("height"),
                            onCommit: onCommit
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 488,
                            columnNumber: 8
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 473,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 472,
                columnNumber: 6
            }, this),
            definition.features.sizeMode === "height-only" && "height" in mask.params && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Height",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                    icon: "H",
                    param: getNumberParamDefinition({
                        definition,
                        key: "height"
                    }),
                    value: getMaskNumber({
                        params: mask.params,
                        key: "height"
                    }),
                    onPreview: previewNumberParam("height"),
                    onCommit: onCommit
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 509,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 508,
                columnNumber: 6
            }, this),
            definition.features.sizeMode === "width-only" && "width" in mask.params && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Width",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                    icon: "W",
                    param: getNumberParamDefinition({
                        definition,
                        key: "width"
                    }),
                    value: getMaskNumber({
                        params: mask.params,
                        key: "width"
                    }),
                    onPreview: previewNumberParam("width"),
                    onCommit: onCommit
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 528,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 527,
                columnNumber: 6
            }, this),
            definition.features.sizeMode === "uniform" && "scale" in mask.params && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Scale",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                    icon: isTextMask(mask) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$ArrowExpandIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowExpandIcon$3e$__["ArrowExpandIcon"]
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 548,
                        columnNumber: 27
                    }, void 0) : "S",
                    param: getNumberParamDefinition({
                        definition,
                        key: "scale"
                    }),
                    value: getMaskNumber({
                        params: mask.params,
                        key: "scale"
                    }),
                    onPreview: previewNumberParam("scale"),
                    onCommit: onCommit
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 546,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 545,
                columnNumber: 5
            }, this),
            definition.features.hasRotation && "rotation" in mask.params && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Rotation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$RotateClockwiseIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateClockwiseIcon$3e$__["RotateClockwiseIcon"]
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 567,
                        columnNumber: 13
                    }, void 0),
                    param: getNumberParamDefinition({
                        definition,
                        key: "rotation"
                    }),
                    value: getMaskNumber({
                        params: mask.params,
                        key: "rotation"
                    }),
                    onPreview: previewNumberParam("rotation"),
                    onCommit: onCommit
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 566,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 565,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Feather",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FeatherIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FeatherIcon$3e$__["FeatherIcon"]
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 584,
                        columnNumber: 12
                    }, void 0),
                    param: featherParam,
                    value: getMaskNumber({
                        params: mask.params,
                        key: "feather"
                    }),
                    onPreview: previewNumberParam("feather"),
                    onCommit: onCommit
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 583,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 582,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Stroke",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                                    className: "flex-1",
                                    icon: "W",
                                    param: strokeWidthParam,
                                    value: getMaskNumber({
                                        params: mask.params,
                                        key: "strokeWidth"
                                    }),
                                    onPreview: previewNumberParam("strokeWidth"),
                                    onCommit: onCommit
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                    lineNumber: 598,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$color$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorPicker"], {
                                    className: "",
                                    value: mask.params.strokeColor.replace(/^#/, "").toUpperCase(),
                                    onChange: (color)=>previewStrokeColor(`#${color}`),
                                    onChangeEnd: (color)=>{
                                        previewStrokeColor(`#${color}`);
                                        onCommit();
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                    lineNumber: 609,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 597,
                            columnNumber: 6
                        }, this),
                        strokeAlignParam ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                            value: mask.params.strokeAlign,
                            onValueChange: (value)=>{
                                previewParam("strokeAlign")(value);
                                onCommit();
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                    className: "w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                        lineNumber: 628,
                                        columnNumber: 9
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                    lineNumber: 627,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                    children: strokeAlignParam.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: option.value,
                                            children: option.label
                                        }, option.value, false, {
                                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                            lineNumber: 632,
                                            columnNumber: 10
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                    lineNumber: 630,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 620,
                            columnNumber: 7
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 596,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 595,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
        lineNumber: 420,
        columnNumber: 3
    }, this);
}
_c2 = MaskParamsFields;
const LETTER_SPACING_PARAM = {
    key: "letterSpacing",
    label: "Letter spacing",
    type: "number",
    default: 0,
    min: -100,
    max: 500,
    step: 1
};
const LINE_HEIGHT_PARAM = {
    key: "lineHeight",
    label: "Line height",
    type: "number",
    default: 1.2,
    min: 0.1,
    max: 10,
    step: 0.1
};
function TextMaskFields({ mask, previewParam, onCommit, fontSizeParam }) {
    _s2();
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editor$2f$panels$2f$properties$2f$hooks$2f$use$2d$property$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePropertyDraft"])({
        displayValue: mask.params.content,
        parse: {
            "TextMaskFields.usePropertyDraft[content]": (input)=>input
        }["TextMaskFields.usePropertyDraft[content]"],
        onPreview: {
            "TextMaskFields.usePropertyDraft[content]": (value)=>previewParam("content")(value)
        }["TextMaskFields.usePropertyDraft[content]"],
        onCommit
    });
    const previewNumberParam = (key)=>(value)=>previewParam(key)(value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                    value: content.displayValue,
                    className: "min-h-20",
                    onFocus: content.onFocus,
                    onChange: content.onChange,
                    onBlur: content.onBlur
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 689,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 688,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Font",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$font$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FontPicker"], {
                    defaultValue: mask.params.fontFamily,
                    onValueChange: (value)=>{
                        previewParam("fontFamily")(value);
                        onCommit();
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 698,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 697,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Size",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$TextFontIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextFontIcon$3e$__["TextFontIcon"]
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 708,
                        columnNumber: 12
                    }, void 0),
                    param: fontSizeParam,
                    value: mask.params.fontSize,
                    onPreview: previewNumberParam("fontSize"),
                    onCommit: onCommit
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 707,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 706,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionField"], {
                label: "Spacing",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                            className: "w-1/2",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$icons$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OcTextWidthIcon"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                lineNumber: 719,
                                columnNumber: 13
                            }, void 0),
                            param: LETTER_SPACING_PARAM,
                            value: mask.params.letterSpacing ?? 0,
                            onPreview: previewNumberParam("letterSpacing"),
                            onCommit: onCommit
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 717,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MaskNumberField, {
                            className: "w-1/2",
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$icons$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OcTextHeightIcon"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                                lineNumber: 727,
                                columnNumber: 13
                            }, void 0),
                            param: LINE_HEIGHT_PARAM,
                            value: mask.params.lineHeight ?? 1.2,
                            onPreview: previewNumberParam("lineHeight"),
                            onCommit: onCommit
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                            lineNumber: 725,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                    lineNumber: 716,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 715,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
_s2(TextMaskFields, "Nhhad/DWlyHJ0yN+AwPGC9jY+64=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editor$2f$panels$2f$properties$2f$hooks$2f$use$2d$property$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePropertyDraft"]
    ];
});
_c3 = TextMaskFields;
function getNumberParamDefinition({ definition, key }) {
    const param = definition.params.find((candidate)=>candidate.key === key);
    if (!param || param.type !== "number") {
        throw new Error(`Missing number param definition for mask key "${key}"`);
    }
    return param;
}
function getMaskNumber({ params, key }) {
    const value = params[key];
    if (typeof value !== "number") {
        throw new Error(`Expected numeric mask param for "${key}"`);
    }
    return value;
}
function MaskNumberField({ param, value, onPreview, onCommit, icon, className }) {
    _s3();
    const isPercent = param.unit === "percent";
    const percentMax = param.max ?? 100;
    const displayMultiplier = isPercent ? 100 / percentMax : param.displayMultiplier ?? 1;
    const min = isPercent ? 0 : param.min;
    const max = isPercent ? 100 : param.max;
    const step = isPercent ? 1 : param.step;
    const displayValue = value * displayMultiplier;
    const maxFractionDigits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFractionDigitsForStep"])({
        step
    });
    const clampDisplay = (nextDisplayValue)=>max !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])({
            value: nextDisplayValue,
            min,
            max
        }) : Math.max(min, nextDisplayValue);
    const previewFromDisplay = (nextDisplayValue)=>{
        onPreview(clampDisplay((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapToStep"])({
            value: nextDisplayValue,
            step
        })) / displayMultiplier);
    };
    const draft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editor$2f$panels$2f$properties$2f$hooks$2f$use$2d$property$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePropertyDraft"])({
        displayValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumberForDisplay"])({
            value: displayValue,
            maxFractionDigits
        }),
        parse: {
            "MaskNumberField.usePropertyDraft[draft]": (input)=>{
                const parsed = parseFloat(input);
                if (Number.isNaN(parsed)) return null;
                return clampDisplay((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapToStep"])({
                    value: parsed,
                    step
                })) / displayMultiplier;
            }
        }["MaskNumberField.usePropertyDraft[draft]"],
        onPreview,
        onCommit
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$number$2d$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
        className: className,
        icon: icon,
        value: draft.displayValue,
        dragSensitivity: "slow",
        onFocus: draft.onFocus,
        onChange: draft.onChange,
        onBlur: draft.onBlur,
        onScrub: previewFromDisplay,
        onScrubEnd: onCommit
    }, void 0, false, {
        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
        lineNumber: 823,
        columnNumber: 3
    }, this);
}
_s3(MaskNumberField, "z0KWAOiRw9QmbXAxJWJq2XGzg1Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editor$2f$panels$2f$properties$2f$hooks$2f$use$2d$property$2d$draft$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePropertyDraft"]
    ];
});
_c4 = MaskNumberField;
function EmptyView({ onAddMask }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full items-center justify-center gap-4 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$icons$2f$ui$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OcShapesIcon"], {
                className: "size-10 text-muted-foreground",
                strokeWidth: 1
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 840,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-medium text-foreground",
                        children: "No masks"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 842,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground text-sm text-balance max-w-40",
                        children: "Add a mask to hide or reveal parts of this layer."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                        lineNumber: 843,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 841,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "default",
                size: "sm",
                onClick: onAddMask,
                children: "Add mask"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
                lineNumber: 847,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/masks/components/masks-tab.tsx",
        lineNumber: 839,
        columnNumber: 3
    }, this);
}
_c5 = EmptyView;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "MasksTab");
__turbopack_context__.k.register(_c1, "MaskItem");
__turbopack_context__.k.register(_c2, "MaskParamsFields");
__turbopack_context__.k.register(_c3, "TextMaskFields");
__turbopack_context__.k.register(_c4, "MaskNumberField");
__turbopack_context__.k.register(_c5, "EmptyView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/masks/use-mask-handles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useMaskHandles",
    ()=>useMaskHandles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-shift-key.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/masks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$definition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/freeform/definition.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/element-bounds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/preview-snap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$cancel$2d$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/cancel-interaction.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
var _s = __turbopack_context__.k.signature();
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
const SEGMENT_CLICK_DRAG_THRESHOLD_PX = 4;
function isMaskSelectionForElement({ trackId, elementId, maskId, selection }) {
    if (!selection) {
        return false;
    }
    return selection.trackId === trackId && selection.elementId === elementId && selection.maskId === maskId;
}
function replaceElementMask({ masks, updatedMask }) {
    return (masks ?? []).map((mask)=>mask.id === updatedMask.id ? updatedMask : mask);
}
function withUpdatedMaskParams({ mask, params }) {
    return {
        ...mask,
        params
    };
}
function useMaskHandles({ onSnapLinesChange }) {
    _s();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const isShiftHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShiftKey"])();
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const [activeHandleId, setActiveHandleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const dragStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingSegmentInsertRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const captureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "useMaskHandles.useEditor[tracks]": (e)=>e.timeline.getPreviewTracks() ?? e.scenes.getActiveScene().tracks
    }["useMaskHandles.useEditor[tracks]"]);
    const currentTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "useMaskHandles.useEditor[currentTime]": (e)=>e.playback.getCurrentTime()
    }["useMaskHandles.useEditor[currentTime]"]);
    const mediaAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "useMaskHandles.useEditor[mediaAssets]": (e)=>e.media.getAssets()
    }["useMaskHandles.useEditor[mediaAssets]"]);
    const canvasSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "useMaskHandles.useEditor[canvasSize]": (e)=>e.project.getActive().settings.canvasSize
    }["useMaskHandles.useEditor[canvasSize]"]);
    const selectedElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "useMaskHandles.useEditor[selectedElements]": (e)=>e.selection.getSelectedElements()
    }["useMaskHandles.useEditor[selectedElements]"]);
    const selectedMaskPointSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])({
        "useMaskHandles.useEditor[selectedMaskPointSelection]": (e)=>e.selection.getSelectedMaskPointSelection()
    }["useMaskHandles.useEditor[selectedMaskPointSelection]"]);
    const elementsWithBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisibleElementsWithBounds"])({
        tracks,
        currentTime,
        canvasSize,
        mediaAssets
    });
    const selectedWithMask = selectedElements.length === 1 ? (()=>{
        const sel = selectedElements[0];
        const entry = elementsWithBounds.find((item)=>item.trackId === sel.trackId && item.elementId === sel.elementId);
        if (!entry) return null;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMaskableElement"])(entry.element)) return null;
        const element = entry.element;
        const masks = element.masks ?? [];
        if (masks.length === 0) return null;
        const activeMaskId = masks.some((mask)=>isMaskSelectionForElement({
                trackId: entry.trackId,
                elementId: entry.elementId,
                maskId: mask.id,
                selection: selectedMaskPointSelection
            })) ? selectedMaskPointSelection?.maskId : masks[0].id;
        const mask = masks.find((candidate)=>candidate.id === activeMaskId) ?? masks[0];
        return {
            ...entry,
            element,
            mask
        };
    })() : null;
    const { handles: baseHandlePositions, overlays } = selectedWithMask ? (()=>{
        const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMaskDefinition"])(selectedWithMask.mask.type);
        const { x: scaleX, y: scaleY } = viewport.getDisplayScale();
        const displayScale = (scaleX + scaleY) / 2;
        return def.interaction.getInteraction({
            params: selectedWithMask.mask.params,
            bounds: selectedWithMask.bounds,
            displayScale,
            scaleX,
            scaleY
        });
    })() : {
        handles: [],
        overlays: []
    };
    const selectedPointIds = new Set(selectedWithMask && isMaskSelectionForElement({
        trackId: selectedWithMask.trackId,
        elementId: selectedWithMask.elementId,
        maskId: selectedWithMask.mask.id,
        selection: selectedMaskPointSelection
    }) ? selectedMaskPointSelection?.pointIds ?? [] : []);
    const handlePositions = baseHandlePositions.map((handle)=>{
        if (handle.id.kind !== "anchor") {
            return handle;
        }
        return {
            ...handle,
            isSelected: selectedPointIds.has(handle.id.pointId)
        };
    });
    const customMaskPointIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMaskHandles.useMemo[customMaskPointIds]": ()=>selectedWithMask?.mask.type === "freeform" ? handlePositions.filter({
                "useMaskHandles.useMemo[customMaskPointIds]": (h)=>h.kind === "point"
            }["useMaskHandles.useMemo[customMaskPointIds]"]).map({
                "useMaskHandles.useMemo[customMaskPointIds]": (h)=>{
                    return h.id.kind === "anchor" ? h.id.pointId : null;
                }
            }["useMaskHandles.useMemo[customMaskPointIds]"]).filter({
                "useMaskHandles.useMemo[customMaskPointIds]": (id)=>id !== null
            }["useMaskHandles.useMemo[customMaskPointIds]"]) : []
    }["useMaskHandles.useMemo[customMaskPointIds]"], [
        handlePositions,
        selectedWithMask?.mask.type
    ]);
    const isCreatingFreeformPathMask = selectedWithMask?.mask.type === "freeform" && (!selectedWithMask.mask.params.closed || customMaskPointIds.length === 0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMaskHandles.useEffect": ()=>{
            if (!selectedMaskPointSelection) {
                return;
            }
            if (!selectedWithMask || selectedWithMask.mask.type !== "freeform" || !isMaskSelectionForElement({
                trackId: selectedWithMask.trackId,
                elementId: selectedWithMask.elementId,
                maskId: selectedWithMask.mask.id,
                selection: selectedMaskPointSelection
            })) {
                editor.selection.clearMaskPointSelection();
                return;
            }
            const availablePointIds = new Set(customMaskPointIds);
            const nextSelectedPointIds = selectedMaskPointSelection.pointIds.filter({
                "useMaskHandles.useEffect.nextSelectedPointIds": (pointId)=>availablePointIds.has(pointId)
            }["useMaskHandles.useEffect.nextSelectedPointIds"]);
            if (nextSelectedPointIds.length === selectedMaskPointSelection.pointIds.length) {
                return;
            }
            if (nextSelectedPointIds.length === 0) {
                editor.selection.clearMaskPointSelection();
                return;
            }
            editor.selection.setSelectedMaskPoints({
                selection: {
                    ...selectedMaskPointSelection,
                    pointIds: nextSelectedPointIds
                }
            });
        }
    }["useMaskHandles.useEffect"], [
        customMaskPointIds,
        editor.selection,
        selectedMaskPointSelection,
        selectedWithMask
    ]);
    const updateFreeformPathMaskPointSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaskHandles.useCallback[updateFreeformPathMaskPointSelection]": ({ pointId, toggleSelection })=>{
            if (!selectedWithMask || selectedWithMask.mask.type !== "freeform") {
                return;
            }
            const isSelectionForCurrentMask = isMaskSelectionForElement({
                trackId: selectedWithMask.trackId,
                elementId: selectedWithMask.elementId,
                maskId: selectedWithMask.mask.id,
                selection: selectedMaskPointSelection
            });
            const currentPointIds = isSelectionForCurrentMask ? selectedMaskPointSelection?.pointIds ?? [] : [];
            const nextPointIds = toggleSelection ? currentPointIds.includes(pointId) ? currentPointIds.filter({
                "useMaskHandles.useCallback[updateFreeformPathMaskPointSelection]": (currentPointId)=>currentPointId !== pointId
            }["useMaskHandles.useCallback[updateFreeformPathMaskPointSelection]"]) : [
                ...currentPointIds,
                pointId
            ] : [
                pointId
            ];
            if (nextPointIds.length === 0) {
                editor.selection.clearMaskPointSelection();
                return;
            }
            editor.selection.setSelectedMaskPoints({
                selection: {
                    trackId: selectedWithMask.trackId,
                    elementId: selectedWithMask.elementId,
                    maskId: selectedWithMask.mask.id,
                    pointIds: nextPointIds
                }
            });
        }
    }["useMaskHandles.useCallback[updateFreeformPathMaskPointSelection]"], [
        editor.selection,
        selectedMaskPointSelection,
        selectedWithMask
    ]);
    const clearMaskHandleState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaskHandles.useCallback[clearMaskHandleState]": ()=>{
            dragStateRef.current = null;
            pendingSegmentInsertRef.current = null;
            setActiveHandleId(null);
            onSnapLinesChange?.([]);
        }
    }["useMaskHandles.useCallback[clearMaskHandleState]"], [
        onSnapLinesChange
    ]);
    const releaseCapturedPointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaskHandles.useCallback[releaseCapturedPointer]": ()=>{
            const capture = captureRef.current;
            if (!capture) return;
            if (capture.element.hasPointerCapture(capture.pointerId)) {
                capture.element.releasePointerCapture(capture.pointerId);
            }
            captureRef.current = null;
        }
    }["useMaskHandles.useCallback[releaseCapturedPointer]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMaskHandles.useEffect": ()=>{
            if (!activeHandleId) return;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$cancel$2d$interaction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerCanceller"])({
                fn: {
                    "useMaskHandles.useEffect": ()=>{
                        editor.timeline.discardPreview();
                        clearMaskHandleState();
                        releaseCapturedPointer();
                    }
                }["useMaskHandles.useEffect"]
            });
        }
    }["useMaskHandles.useEffect"], [
        activeHandleId,
        clearMaskHandleState,
        editor.timeline,
        releaseCapturedPointer
    ]);
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaskHandles.useCallback[handlePointerDown]": ({ event, handleId })=>{
            if (!selectedWithMask) return;
            if (event.button !== 0) return;
            event.stopPropagation();
            const anchorHandle = selectedWithMask.mask.type === "freeform" && handleId.kind === "anchor" ? handleId : null;
            const segmentHandle = selectedWithMask.mask.type === "freeform" && handleId.kind === "segment" ? handleId : null;
            if (isCreatingFreeformPathMask) {
                const firstPointId = customMaskPointIds[0];
                if (firstPointId && handleId.kind === "anchor" && handleId.pointId === firstPointId && customMaskPointIds.length >= 3 && selectedWithMask.mask.type === "freeform") {
                    const updatedMask = withUpdatedMaskParams({
                        mask: selectedWithMask.mask,
                        params: {
                            ...selectedWithMask.mask.params,
                            closed: true
                        }
                    });
                    editor.timeline.updateElements({
                        updates: [
                            {
                                trackId: selectedWithMask.trackId,
                                elementId: selectedWithMask.elementId,
                                patch: {
                                    masks: replaceElementMask({
                                        masks: selectedWithMask.element.masks,
                                        updatedMask
                                    })
                                }
                            }
                        ]
                    });
                }
                return;
            }
            const pos = viewport.screenToCanvas({
                clientX: event.clientX,
                clientY: event.clientY
            });
            if (!pos) return;
            if (segmentHandle && selectedWithMask.mask.type === "freeform") {
                setActiveHandleId(handleId);
                pendingSegmentInsertRef.current = {
                    trackId: selectedWithMask.trackId,
                    elementId: selectedWithMask.elementId,
                    maskId: selectedWithMask.mask.id,
                    segmentIndex: segmentHandle.index,
                    startClientX: event.clientX,
                    startClientY: event.clientY,
                    startCanvasX: pos.x,
                    startCanvasY: pos.y,
                    startParams: {
                        ...selectedWithMask.mask.params
                    },
                    bounds: selectedWithMask.bounds
                };
                const captureTarget = event.currentTarget;
                captureTarget.setPointerCapture(event.pointerId);
                captureRef.current = {
                    element: captureTarget,
                    pointerId: event.pointerId
                };
                return;
            }
            if (anchorHandle) {
                updateFreeformPathMaskPointSelection({
                    pointId: anchorHandle.pointId,
                    toggleSelection: event.shiftKey
                });
                if (event.shiftKey) {
                    return;
                }
            } else if (selectedWithMask.mask.type === "freeform") {
                editor.selection.clearMaskPointSelection();
            }
            dragStateRef.current = {
                trackId: selectedWithMask.trackId,
                elementId: selectedWithMask.elementId,
                handleId,
                startCanvasX: pos.x,
                startCanvasY: pos.y,
                startParams: {
                    ...selectedWithMask.mask.params
                }
            };
            setActiveHandleId(handleId);
            const captureTarget = event.currentTarget;
            captureTarget.setPointerCapture(event.pointerId);
            captureRef.current = {
                element: captureTarget,
                pointerId: event.pointerId
            };
        }
    }["useMaskHandles.useCallback[handlePointerDown]"], [
        customMaskPointIds,
        editor.selection,
        editor.timeline,
        isCreatingFreeformPathMask,
        selectedWithMask,
        updateFreeformPathMaskPointSelection,
        viewport
    ]);
    const handleCanvasPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaskHandles.useCallback[handleCanvasPointerDown]": ({ event })=>{
            if (!selectedWithMask || !isCreatingFreeformPathMask) {
                return;
            }
            if (event.button !== 0) {
                return;
            }
            if (selectedWithMask.mask.type !== "freeform") {
                return;
            }
            event.stopPropagation();
            const pos = viewport.screenToCanvas({
                clientX: event.clientX,
                clientY: event.clientY
            });
            if (!pos) {
                return;
            }
            const nextParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$freeform$2f$definition$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appendPointToFreeformPathMask"])({
                params: selectedWithMask.mask.params,
                canvasPoint: pos,
                bounds: selectedWithMask.bounds
            });
            const updatedMask = withUpdatedMaskParams({
                mask: selectedWithMask.mask,
                params: nextParams
            });
            editor.timeline.updateElements({
                updates: [
                    {
                        trackId: selectedWithMask.trackId,
                        elementId: selectedWithMask.elementId,
                        patch: {
                            masks: replaceElementMask({
                                masks: selectedWithMask.element.masks,
                                updatedMask
                            })
                        }
                    }
                ]
            });
        }
    }["useMaskHandles.useCallback[handleCanvasPointerDown]"], [
        editor.timeline,
        isCreatingFreeformPathMask,
        selectedWithMask,
        viewport
    ]);
    const handlePointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaskHandles.useCallback[handlePointerMove]": ({ event })=>{
            const pendingSegmentInsert = pendingSegmentInsertRef.current;
            if (pendingSegmentInsert && !dragStateRef.current) {
                const distance = Math.hypot(event.clientX - pendingSegmentInsert.startClientX, event.clientY - pendingSegmentInsert.startClientY);
                if (distance >= SEGMENT_CLICK_DRAG_THRESHOLD_PX) {
                    dragStateRef.current = {
                        trackId: pendingSegmentInsert.trackId,
                        elementId: pendingSegmentInsert.elementId,
                        handleId: {
                            kind: "position"
                        },
                        startCanvasX: pendingSegmentInsert.startCanvasX,
                        startCanvasY: pendingSegmentInsert.startCanvasY,
                        startParams: pendingSegmentInsert.startParams
                    };
                    pendingSegmentInsertRef.current = null;
                    setActiveHandleId({
                        kind: "position"
                    });
                }
            }
            const drag = dragStateRef.current;
            if (!drag || !selectedWithMask) return;
            const pos = viewport.screenToCanvas({
                clientX: event.clientX,
                clientY: event.clientY
            });
            if (!pos) return;
            const deltaX = pos.x - drag.startCanvasX;
            const deltaY = pos.y - drag.startCanvasY;
            const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMaskDefinition"])(selectedWithMask.mask.type);
            const rawParams = def.computeParamUpdate({
                handleId: drag.handleId,
                startParams: drag.startParams,
                deltaX,
                deltaY,
                startCanvasX: drag.startCanvasX,
                startCanvasY: drag.startCanvasY,
                bounds: selectedWithMask.bounds,
                canvasSize
            });
            const proposedParams = {
                ...drag.startParams,
                ...rawParams
            };
            const snapThreshold = viewport.screenPixelsToLogicalThreshold({
                screenPixels: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SNAP_THRESHOLD_SCREEN_PIXELS"]
            });
            const { params: nextParams, activeLines } = isShiftHeldRef.current ? {
                params: proposedParams,
                activeLines: []
            } : def.interaction.snap?.({
                handleId: drag.handleId,
                startParams: drag.startParams,
                proposedParams,
                bounds: selectedWithMask.bounds,
                canvasSize,
                snapThreshold
            }) ?? {
                params: proposedParams,
                activeLines: []
            };
            onSnapLinesChange?.(activeLines);
            const updatedMask = withUpdatedMaskParams({
                mask: selectedWithMask.mask,
                params: nextParams
            });
            editor.timeline.previewElements({
                updates: [
                    {
                        trackId: drag.trackId,
                        elementId: drag.elementId,
                        updates: {
                            masks: replaceElementMask({
                                masks: selectedWithMask.element.masks,
                                updatedMask
                            })
                        }
                    }
                ]
            });
        }
    }["useMaskHandles.useCallback[handlePointerMove]"], [
        selectedWithMask,
        canvasSize,
        editor,
        isShiftHeldRef,
        onSnapLinesChange,
        viewport
    ]);
    const handlePointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMaskHandles.useCallback[handlePointerUp]": ()=>{
            const pendingSegmentInsert = pendingSegmentInsertRef.current;
            if (pendingSegmentInsert && !dragStateRef.current) {
                editor.timeline.insertFreeformPathMaskPoint({
                    trackId: pendingSegmentInsert.trackId,
                    elementId: pendingSegmentInsert.elementId,
                    maskId: pendingSegmentInsert.maskId,
                    segmentIndex: pendingSegmentInsert.segmentIndex,
                    canvasPoint: {
                        x: pendingSegmentInsert.startCanvasX,
                        y: pendingSegmentInsert.startCanvasY
                    },
                    bounds: pendingSegmentInsert.bounds
                });
                clearMaskHandleState();
                releaseCapturedPointer();
                return;
            }
            if (dragStateRef.current) {
                editor.timeline.commitPreview();
                clearMaskHandleState();
            }
            releaseCapturedPointer();
        }
    }["useMaskHandles.useCallback[handlePointerUp]"], [
        clearMaskHandleState,
        editor,
        releaseCapturedPointer
    ]);
    return {
        selectedWithMask,
        handlePositions,
        overlays,
        isCreatingFreeformPathMask,
        handleCanvasPointerDown,
        activeHandleId,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp
    };
}
_s(useMaskHandles, "PKT+TFeocONwHWFUOoJaegR7GS0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShiftKey"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreviewViewport"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/masks/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "maskHandleIdKey",
    ()=>maskHandleIdKey
]);
function maskHandleIdKey({ id }) {
    switch(id.kind){
        case "position":
        case "rotation":
        case "feather":
        case "scale":
            return id.kind;
        case "edge":
            return id.side;
        case "corner":
            return `${id.corner.y}-${id.corner.x}`;
        case "anchor":
            return `point:${id.pointId}:anchor`;
        case "segment":
            return `segment:${id.index}`;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_masks_415ef5ee._.js.map