module.exports = [
"[project]/apps/web/src/preview/components/cursors.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PEN_CURSOR",
    ()=>PEN_CURSOR
]);
function svgCursor({ svg, hotspotX, hotspotY }) {
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspotX} ${hotspotY}, crosshair`;
}
const PEN_CURSOR = svgCursor({
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M 1 1 L 5 2 L 13 10 L 10 13 L 2 5 Z" fill="white" stroke="#111" stroke-width="1" stroke-linejoin="round"/>
  <path d="M 1 1 L 5 2 L 2 5 Z" fill="#111"/>
</svg>`,
    hotspotX: 1,
    hotspotY: 1
});
}),
"[project]/apps/web/src/preview/preview-snap.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIN_SCALE",
    ()=>MIN_SCALE,
    "SNAP_THRESHOLD_SCREEN_PIXELS",
    ()=>SNAP_THRESHOLD_SCREEN_PIXELS,
    "snapPosition",
    ()=>snapPosition,
    "snapRotation",
    ()=>snapRotation,
    "snapScale",
    ()=>snapScale,
    "snapScaleAxes",
    ()=>snapScaleAxes
]);
const ROTATION_SNAP_STEP_DEGREES = 90;
const ROTATION_SNAP_THRESHOLD_DEGREES = 5;
const MIN_SCALE = 0.01;
const SNAP_THRESHOLD_SCREEN_PIXELS = 8;
function hasPreferredEdge({ preferredEdges, edge }) {
    return preferredEdges?.[edge] === true;
}
function pickClosestScaleCandidate({ candidates, preferredEdges }) {
    if (candidates.length === 0) {
        return null;
    }
    return candidates.reduce((bestCandidate, candidate)=>{
        if (candidate.distance < bestCandidate.distance) {
            return candidate;
        }
        if (candidate.distance > bestCandidate.distance) {
            return bestCandidate;
        }
        const shouldPreferCandidate = hasPreferredEdge({
            preferredEdges,
            edge: candidate.edge
        });
        const shouldPreferBestCandidate = hasPreferredEdge({
            preferredEdges,
            edge: bestCandidate.edge
        });
        return shouldPreferCandidate && !shouldPreferBestCandidate ? candidate : bestCandidate;
    });
}
function snapPosition({ proposedPosition, canvasSize, elementSize, rotation = 0, snapThreshold }) {
    const centerX = 0;
    const centerY = 0;
    const left = -canvasSize.width / 2;
    const right = canvasSize.width / 2;
    const top = -canvasSize.height / 2;
    const bottom = canvasSize.height / 2;
    const rotRad = rotation * Math.PI / 180;
    const cosR = Math.abs(Math.cos(rotRad));
    const sinR = Math.abs(Math.sin(rotRad));
    const halfWidth = (elementSize.width * cosR + elementSize.height * sinR) / 2;
    const halfHeight = (elementSize.width * sinR + elementSize.height * cosR) / 2;
    const activeLines = [];
    function getClosestAxisSnap({ candidates, threshold }) {
        const snapCandidatesWithinThreshold = candidates.filter((candidate)=>candidate.distance <= threshold);
        if (snapCandidatesWithinThreshold.length === 0) {
            return null;
        }
        return snapCandidatesWithinThreshold.reduce((closest, current)=>current.distance < closest.distance ? current : closest);
    }
    const verticalTargets = [
        centerX,
        left,
        right
    ];
    const horizontalTargets = [
        centerY,
        top,
        bottom
    ];
    const xCandidates = [];
    for (const targetX of verticalTargets){
        xCandidates.push({
            snappedPosition: targetX,
            line: {
                type: "vertical",
                position: targetX
            },
            distance: Math.abs(proposedPosition.x - targetX)
        });
        xCandidates.push({
            snappedPosition: targetX + halfWidth,
            line: {
                type: "vertical",
                position: targetX
            },
            distance: Math.abs(proposedPosition.x - halfWidth - targetX)
        });
        xCandidates.push({
            snappedPosition: targetX - halfWidth,
            line: {
                type: "vertical",
                position: targetX
            },
            distance: Math.abs(proposedPosition.x + halfWidth - targetX)
        });
    }
    const yCandidates = [];
    for (const targetY of horizontalTargets){
        yCandidates.push({
            snappedPosition: targetY,
            line: {
                type: "horizontal",
                position: targetY
            },
            distance: Math.abs(proposedPosition.y - targetY)
        });
        yCandidates.push({
            snappedPosition: targetY + halfHeight,
            line: {
                type: "horizontal",
                position: targetY
            },
            distance: Math.abs(proposedPosition.y - halfHeight - targetY)
        });
        yCandidates.push({
            snappedPosition: targetY - halfHeight,
            line: {
                type: "horizontal",
                position: targetY
            },
            distance: Math.abs(proposedPosition.y + halfHeight - targetY)
        });
    }
    const closestX = getClosestAxisSnap({
        candidates: xCandidates,
        threshold: snapThreshold.x
    });
    const closestY = getClosestAxisSnap({
        candidates: yCandidates,
        threshold: snapThreshold.y
    });
    const x = closestX?.snappedPosition ?? proposedPosition.x;
    const y = closestY?.snappedPosition ?? proposedPosition.y;
    if (closestX) {
        activeLines.push(closestX.line);
    }
    if (closestY) {
        activeLines.push(closestY.line);
    }
    return {
        snappedPosition: {
            x,
            y
        },
        activeLines
    };
}
function snapScale({ proposedScale, position, baseWidth, baseHeight, rotation = 0, canvasSize, snapThreshold, preferredEdges }) {
    const centerX = 0;
    const centerY = 0;
    const left = -canvasSize.width / 2;
    const right = canvasSize.width / 2;
    const top = -canvasSize.height / 2;
    const bottom = canvasSize.height / 2;
    const rotRad = rotation * Math.PI / 180;
    const cosR = Math.abs(Math.cos(rotRad));
    const sinR = Math.abs(Math.sin(rotRad));
    const aabbBaseHalfW = (baseWidth * cosR + baseHeight * sinR) / 2;
    const aabbBaseHalfH = (baseWidth * sinR + baseHeight * cosR) / 2;
    const leftEdge = position.x - aabbBaseHalfW * proposedScale;
    const rightEdge = position.x + aabbBaseHalfW * proposedScale;
    const topEdge = position.y - aabbBaseHalfH * proposedScale;
    const bottomEdge = position.y + aabbBaseHalfH * proposedScale;
    const candidates = [];
    const verticalTargets = [
        {
            position: left,
            line: {
                type: "vertical",
                position: left
            }
        },
        {
            position: centerX,
            line: {
                type: "vertical",
                position: centerX
            }
        },
        {
            position: right,
            line: {
                type: "vertical",
                position: right
            }
        }
    ];
    for (const target of verticalTargets){
        const distanceLeft = Math.abs(leftEdge - target.position);
        if (distanceLeft <= snapThreshold.x) {
            const scale = (position.x - target.position) / aabbBaseHalfW;
            if (Math.abs(scale) > MIN_SCALE) {
                candidates.push({
                    scale,
                    distance: distanceLeft,
                    lines: [
                        target.line
                    ],
                    edge: "left"
                });
            }
        }
        const distanceRight = Math.abs(rightEdge - target.position);
        if (distanceRight <= snapThreshold.x) {
            const scale = (target.position - position.x) / aabbBaseHalfW;
            if (Math.abs(scale) > MIN_SCALE) {
                candidates.push({
                    scale,
                    distance: distanceRight,
                    lines: [
                        target.line
                    ],
                    edge: "right"
                });
            }
        }
    }
    const horizontalTargets = [
        {
            position: top,
            line: {
                type: "horizontal",
                position: top
            }
        },
        {
            position: centerY,
            line: {
                type: "horizontal",
                position: centerY
            }
        },
        {
            position: bottom,
            line: {
                type: "horizontal",
                position: bottom
            }
        }
    ];
    for (const target of horizontalTargets){
        const distanceTop = Math.abs(topEdge - target.position);
        if (distanceTop <= snapThreshold.y) {
            const scale = (position.y - target.position) / aabbBaseHalfH;
            if (Math.abs(scale) > MIN_SCALE) {
                candidates.push({
                    scale,
                    distance: distanceTop,
                    lines: [
                        target.line
                    ],
                    edge: "top"
                });
            }
        }
        const distanceBottom = Math.abs(bottomEdge - target.position);
        if (distanceBottom <= snapThreshold.y) {
            const scale = (target.position - position.y) / aabbBaseHalfH;
            if (Math.abs(scale) > MIN_SCALE) {
                candidates.push({
                    scale,
                    distance: distanceBottom,
                    lines: [
                        target.line
                    ],
                    edge: "bottom"
                });
            }
        }
    }
    const best = pickClosestScaleCandidate({
        candidates,
        preferredEdges
    });
    if (!best) {
        return {
            snappedScale: proposedScale,
            activeLines: []
        };
    }
    const snappedLeft = position.x - aabbBaseHalfW * best.scale;
    const snappedRight = position.x + aabbBaseHalfW * best.scale;
    const snappedTop = position.y - aabbBaseHalfH * best.scale;
    const snappedBottom = position.y + aabbBaseHalfH * best.scale;
    const activeLines = [];
    const seenKeys = new Set();
    function addLine({ line }) {
        const key = `${line.type}-${line.position}`;
        if (!seenKeys.has(key)) {
            seenKeys.add(key);
            activeLines.push(line);
        }
    }
    for (const target of verticalTargets){
        if (hasPreferredEdge({
            preferredEdges,
            edge: "left"
        }) && Math.abs(snappedLeft - target.position) <= 1 || hasPreferredEdge({
            preferredEdges,
            edge: "right"
        }) && Math.abs(snappedRight - target.position) <= 1 || !preferredEdges && (Math.abs(snappedLeft - target.position) <= 1 || Math.abs(snappedRight - target.position) <= 1)) {
            addLine({
                line: target.line
            });
        }
    }
    for (const target of horizontalTargets){
        if (hasPreferredEdge({
            preferredEdges,
            edge: "top"
        }) && Math.abs(snappedTop - target.position) <= 1 || hasPreferredEdge({
            preferredEdges,
            edge: "bottom"
        }) && Math.abs(snappedBottom - target.position) <= 1 || !preferredEdges && (Math.abs(snappedTop - target.position) <= 1 || Math.abs(snappedBottom - target.position) <= 1)) {
            addLine({
                line: target.line
            });
        }
    }
    return {
        snappedScale: best.scale,
        activeLines
    };
}
function snapScaleAxes({ proposedScaleX, proposedScaleY, position, baseWidth, baseHeight, rotation = 0, canvasSize, snapThreshold, preferredEdges }) {
    const canvasLeft = -canvasSize.width / 2;
    const canvasRight = canvasSize.width / 2;
    const canvasTop = -canvasSize.height / 2;
    const canvasBottom = canvasSize.height / 2;
    const rotRad = rotation * Math.PI / 180;
    const cosR = Math.abs(Math.cos(rotRad));
    const sinR = Math.abs(Math.sin(rotRad));
    const EPSILON = 1e-6;
    // Current AABB edges at proposed scales
    const currentAabbHalfW = (baseWidth * proposedScaleX * cosR + baseHeight * proposedScaleY * sinR) / 2;
    const currentAabbHalfH = (baseWidth * proposedScaleX * sinR + baseHeight * proposedScaleY * cosR) / 2;
    const currentLeftEdge = position.x - currentAabbHalfW;
    const currentRightEdge = position.x + currentAabbHalfW;
    const currentTopEdge = position.y - currentAabbHalfH;
    const currentBottomEdge = position.y + currentAabbHalfH;
    function bestCandidate({ candidates, proposedScale }) {
        const best = pickClosestScaleCandidate({
            candidates,
            preferredEdges
        });
        if (!best) {
            return {
                snappedScale: proposedScale,
                snapDistance: Infinity,
                activeLines: []
            };
        }
        return {
            snappedScale: best.scale,
            snapDistance: best.distance,
            activeLines: [
                best.line
            ]
        };
    }
    // sX candidates: snap via vertical targets (left/right AABB edges) — only valid when cosR ≠ 0
    // snap via horizontal targets (top/bottom AABB edges) — only valid when sinR ≠ 0
    const xCandidates = [];
    const yContribW = baseHeight * proposedScaleY * sinR;
    const yContribH = baseHeight * proposedScaleY * cosR;
    if (cosR > EPSILON) {
        for (const T of [
            canvasLeft,
            0,
            canvasRight
        ]){
            const line = {
                type: "vertical",
                position: T
            };
            const distLeft = Math.abs(currentLeftEdge - T);
            if (distLeft <= snapThreshold.x) {
                const scale = (2 * (position.x - T) - yContribW) / (baseWidth * cosR);
                if (Math.abs(scale) > MIN_SCALE) xCandidates.push({
                    scale,
                    distance: distLeft,
                    line,
                    edge: "left"
                });
            }
            const distRight = Math.abs(currentRightEdge - T);
            if (distRight <= snapThreshold.x) {
                const scale = (2 * (T - position.x) - yContribW) / (baseWidth * cosR);
                if (Math.abs(scale) > MIN_SCALE) xCandidates.push({
                    scale,
                    distance: distRight,
                    line,
                    edge: "right"
                });
            }
        }
    }
    if (sinR > EPSILON) {
        for (const T of [
            canvasTop,
            0,
            canvasBottom
        ]){
            const line = {
                type: "horizontal",
                position: T
            };
            const distTop = Math.abs(currentTopEdge - T);
            if (distTop <= snapThreshold.y) {
                const scale = (2 * (position.y - T) - yContribH) / (baseWidth * sinR);
                if (Math.abs(scale) > MIN_SCALE) xCandidates.push({
                    scale,
                    distance: distTop,
                    line,
                    edge: "top"
                });
            }
            const distBottom = Math.abs(currentBottomEdge - T);
            if (distBottom <= snapThreshold.y) {
                const scale = (2 * (T - position.y) - yContribH) / (baseWidth * sinR);
                if (Math.abs(scale) > MIN_SCALE) xCandidates.push({
                    scale,
                    distance: distBottom,
                    line,
                    edge: "bottom"
                });
            }
        }
    }
    // sY candidates: snap via vertical targets — only valid when sinR ≠ 0
    // snap via horizontal targets — only valid when cosR ≠ 0
    const yCandidates = [];
    const xContribW = baseWidth * proposedScaleX * cosR;
    const xContribH = baseWidth * proposedScaleX * sinR;
    if (sinR > EPSILON) {
        for (const T of [
            canvasLeft,
            0,
            canvasRight
        ]){
            const line = {
                type: "vertical",
                position: T
            };
            const distLeft = Math.abs(currentLeftEdge - T);
            if (distLeft <= snapThreshold.x) {
                const scale = (2 * (position.x - T) - xContribW) / (baseHeight * sinR);
                if (Math.abs(scale) > MIN_SCALE) yCandidates.push({
                    scale,
                    distance: distLeft,
                    line,
                    edge: "left"
                });
            }
            const distRight = Math.abs(currentRightEdge - T);
            if (distRight <= snapThreshold.x) {
                const scale = (2 * (T - position.x) - xContribW) / (baseHeight * sinR);
                if (Math.abs(scale) > MIN_SCALE) yCandidates.push({
                    scale,
                    distance: distRight,
                    line,
                    edge: "right"
                });
            }
        }
    }
    if (cosR > EPSILON) {
        for (const T of [
            canvasTop,
            0,
            canvasBottom
        ]){
            const line = {
                type: "horizontal",
                position: T
            };
            const distTop = Math.abs(currentTopEdge - T);
            if (distTop <= snapThreshold.y) {
                const scale = (2 * (position.y - T) - xContribH) / (baseHeight * cosR);
                if (Math.abs(scale) > MIN_SCALE) yCandidates.push({
                    scale,
                    distance: distTop,
                    line,
                    edge: "top"
                });
            }
            const distBottom = Math.abs(currentBottomEdge - T);
            if (distBottom <= snapThreshold.y) {
                const scale = (2 * (T - position.y) - xContribH) / (baseHeight * cosR);
                if (Math.abs(scale) > MIN_SCALE) yCandidates.push({
                    scale,
                    distance: distBottom,
                    line,
                    edge: "bottom"
                });
            }
        }
    }
    return {
        x: bestCandidate({
            candidates: xCandidates,
            proposedScale: proposedScaleX
        }),
        y: bestCandidate({
            candidates: yCandidates,
            proposedScale: proposedScaleY
        })
    };
}
function snapRotation({ proposedRotation }) {
    const nearestRotationSnap = Math.round(proposedRotation / ROTATION_SNAP_STEP_DEGREES) * ROTATION_SNAP_STEP_DEGREES;
    const distanceToNearestSnap = Math.abs(proposedRotation - nearestRotationSnap);
    if (distanceToNearestSnap <= ROTATION_SNAP_THRESHOLD_DEGREES) {
        return {
            snappedRotation: nearestRotationSnap,
            isSnapped: true
        };
    }
    return {
        snappedRotation: proposedRotation,
        isSnapped: false
    };
}
}),
"[project]/apps/web/src/preview/overlays.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMPTY_PREVIEW_OVERLAY_SOURCE_RESULT",
    ()=>EMPTY_PREVIEW_OVERLAY_SOURCE_RESULT,
    "createPreviewOverlayControl",
    ()=>createPreviewOverlayControl,
    "isPreviewOverlayVisible",
    ()=>isPreviewOverlayVisible,
    "mergePreviewOverlaySources",
    ()=>mergePreviewOverlaySources
]);
const EMPTY_PREVIEW_OVERLAY_SOURCE_RESULT = {
    definitions: [],
    instances: []
};
function isPreviewOverlayVisible({ overlay, overlays }) {
    return overlays[overlay.id] ?? overlay.defaultVisible ?? true;
}
function createPreviewOverlayControl({ overlay, overlays }) {
    return {
        ...overlay,
        isVisible: isPreviewOverlayVisible({
            overlay,
            overlays
        })
    };
}
function mergePreviewOverlaySources({ sources }) {
    const definitionsById = new Map();
    const instances = [];
    for (const source of sources){
        for (const definition of source.definitions){
            definitionsById.set(definition.id, definition);
        }
        instances.push(...source.instances);
    }
    return {
        definitions: [
            ...definitionsById.values()
        ],
        instances
    };
}
}),
"[project]/apps/web/src/preview/element-bounds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ROTATION_HANDLE_OFFSET",
    ()=>ROTATION_HANDLE_OFFSET,
    "getCornerPosition",
    ()=>getCornerPosition,
    "getEdgeHandlePosition",
    ()=>getEdgeHandlePosition,
    "getVisibleElementsWithBounds",
    ()=>getVisibleElementsWithBounds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$intrinsic$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/intrinsic-size.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/measure-element.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/animation-values.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/index.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function getVisualElementBounds({ canvasWidth, canvasHeight, sourceWidth, sourceHeight, transform }) {
    const containScale = Math.min(canvasWidth / sourceWidth, canvasHeight / sourceHeight);
    const scaledWidth = sourceWidth * containScale * transform.scaleX;
    const scaledHeight = sourceHeight * containScale * transform.scaleY;
    const cx = canvasWidth / 2 + transform.position.x;
    const cy = canvasHeight / 2 + transform.position.y;
    return {
        cx,
        cy,
        width: scaledWidth,
        height: scaledHeight,
        rotation: transform.rotate
    };
}
function getTransformedRectBounds({ canvasWidth, canvasHeight, rect, transform }) {
    const localCenterX = rect.left + rect.width / 2;
    const localCenterY = rect.top + rect.height / 2;
    const scaledCenterX = localCenterX * transform.scaleX;
    const scaledCenterY = localCenterY * transform.scaleY;
    const rotationRad = transform.rotate * Math.PI / 180;
    const cos = Math.cos(rotationRad);
    const sin = Math.sin(rotationRad);
    return {
        cx: canvasWidth / 2 + transform.position.x + scaledCenterX * cos - scaledCenterY * sin,
        cy: canvasHeight / 2 + transform.position.y + scaledCenterX * sin + scaledCenterY * cos,
        width: rect.width * transform.scaleX,
        height: rect.height * transform.scaleY,
        rotation: transform.rotate
    };
}
/**
 * Bounds policy: bounds reflect base content geometry (text glyphs + background,
 * sticker/image/video content area) and base transform. Post-effect spill (blur,
 * glow) and mask-clipped regions are intentionally excluded — handles manipulate
 * the canonical element geometry, not visual effect output.
 */ function getElementBounds({ element, canvasSize, mediaAsset, localTime }) {
    if (element.type === "audio" || element.type === "effect") return null;
    if ("hidden" in element && element.hidden) return null;
    const { width: canvasWidth, height: canvasHeight } = canvasSize;
    if (element.type === "video" || element.type === "image") {
        const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
            baseTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                params: element.params
            }),
            animations: element.animations,
            localTime
        });
        const sourceWidth = mediaAsset?.width ?? canvasWidth;
        const sourceHeight = mediaAsset?.height ?? canvasHeight;
        return getVisualElementBounds({
            canvasWidth,
            canvasHeight,
            sourceWidth,
            sourceHeight,
            transform
        });
    }
    if (element.type === "sticker") {
        const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
            baseTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                params: element.params
            }),
            animations: element.animations,
            localTime
        });
        return getVisualElementBounds({
            canvasWidth,
            canvasHeight,
            sourceWidth: element.intrinsicWidth ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$intrinsic$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STICKER_INTRINSIC_SIZE_FALLBACK"],
            sourceHeight: element.intrinsicHeight ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$intrinsic$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STICKER_INTRINSIC_SIZE_FALLBACK"],
            transform
        });
    }
    if (element.type === "graphic") {
        const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
            baseTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                params: element.params
            }),
            animations: element.animations,
            localTime
        });
        return getVisualElementBounds({
            canvasWidth,
            canvasHeight,
            sourceWidth: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"],
            sourceHeight: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"],
            transform
        });
    }
    if (element.type === "text") {
        const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
            baseTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                params: element.params
            }),
            animations: element.animations,
            localTime
        });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        const measured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["measureTextElement"])({
            element,
            canvasHeight,
            localTime,
            ctx
        });
        return getTransformedRectBounds({
            canvasWidth,
            canvasHeight,
            rect: measured.visualRect,
            transform
        });
    }
    return null;
}
const ROTATION_HANDLE_OFFSET = 24;
function getCornerPosition({ bounds, corner }) {
    const halfW = bounds.width / 2;
    const halfH = bounds.height / 2;
    const angleRad = bounds.rotation * Math.PI / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const localX = corner === "top-left" || corner === "bottom-left" ? -halfW : halfW;
    const localY = corner === "top-left" || corner === "top-right" ? -halfH : halfH;
    return {
        x: bounds.cx + (localX * cos - localY * sin),
        y: bounds.cy + (localX * sin + localY * cos)
    };
}
function getEdgeHandlePosition({ bounds, edge }) {
    const halfWidth = bounds.width / 2;
    const halfHeight = bounds.height / 2;
    const angleRad = bounds.rotation * Math.PI / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const localX = edge === "right" ? halfWidth : edge === "left" ? -halfWidth : 0;
    const localY = edge === "bottom" ? halfHeight : 0;
    return {
        x: bounds.cx + (localX * cos - localY * sin),
        y: bounds.cy + (localX * sin + localY * cos)
    };
}
function getVisibleElementsWithBounds({ tracks, currentTime, canvasSize, mediaAssets }) {
    const mediaMap = new Map(mediaAssets.map((m)=>[
            m.id,
            m
        ]));
    const orderedTracks = [
        ...tracks.overlay.filter((track)=>!("hidden" in track && track.hidden)),
        ...!tracks.main.hidden ? [
            tracks.main
        ] : []
    ].reverse();
    const result = [];
    for (const track of orderedTracks){
        const elements = track.elements.filter((element)=>!("hidden" in element && element.hidden)).filter((element)=>currentTime >= element.startTime && currentTime < element.startTime + element.duration).slice().sort((a, b)=>{
            if (a.startTime !== b.startTime) return a.startTime - b.startTime;
            return a.id.localeCompare(b.id);
        });
        for (const element of elements){
            const localTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementLocalTime"])({
                timelineTime: currentTime,
                elementStartTime: element.startTime,
                elementDuration: element.duration
            });
            const mediaAsset = element.type === "video" || element.type === "image" ? mediaMap.get(element.mediaId) : undefined;
            const bounds = getElementBounds({
                element,
                canvasSize,
                mediaAsset,
                localTime
            });
            if (bounds) {
                result.push({
                    trackId: track.id,
                    elementId: element.id,
                    element,
                    bounds
                });
            }
        }
    }
    return result;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/preview-coords.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canvasToOverlay",
    ()=>canvasToOverlay,
    "getDisplayScale",
    ()=>getDisplayScale,
    "positionToOverlay",
    ()=>positionToOverlay,
    "screenPixelsToLogicalThreshold",
    ()=>screenPixelsToLogicalThreshold,
    "screenToCanvas",
    ()=>screenToCanvas
]);
function getCanvasOrigin({ geometry }) {
    return {
        x: geometry.viewportWidth / 2 - geometry.centerX * geometry.scale,
        y: geometry.viewportHeight / 2 - geometry.centerY * geometry.scale
    };
}
function screenToCanvas({ clientX, clientY, geometry, viewportRect }) {
    const overlayX = clientX - viewportRect.left;
    const overlayY = clientY - viewportRect.top;
    return {
        x: geometry.centerX + (overlayX - geometry.viewportWidth / 2) / geometry.scale,
        y: geometry.centerY + (overlayY - geometry.viewportHeight / 2) / geometry.scale
    };
}
function canvasToOverlay({ canvasX, canvasY, geometry }) {
    const canvasOrigin = getCanvasOrigin({
        geometry
    });
    return {
        x: canvasOrigin.x + canvasX * geometry.scale,
        y: canvasOrigin.y + canvasY * geometry.scale
    };
}
function positionToOverlay({ positionX, positionY, geometry }) {
    return canvasToOverlay({
        canvasX: geometry.canvasWidth / 2 + positionX,
        canvasY: geometry.canvasHeight / 2 + positionY,
        geometry
    });
}
function getDisplayScale({ geometry }) {
    return {
        x: geometry.scale,
        y: geometry.scale
    };
}
function screenPixelsToLogicalThreshold({ geometry, screenPixels }) {
    return {
        x: screenPixels / geometry.scale,
        y: screenPixels / geometry.scale
    };
}
}),
"[project]/apps/web/src/preview/zoom.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PREVIEW_ZOOM",
    ()=>PREVIEW_ZOOM,
    "PREVIEW_ZOOM_PRESETS",
    ()=>PREVIEW_ZOOM_PRESETS
]);
const PREVIEW_ZOOM_PRESETS = [
    25,
    50,
    75,
    100,
    150,
    200
];
const PREVIEW_ZOOM = {
    min: 0.25,
    max: 16,
    step: 1.25
};
}),
"[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewViewportProvider",
    ()=>PreviewViewportProvider,
    "usePreviewViewport",
    ()=>usePreviewViewport,
    "usePreviewViewportState",
    ()=>usePreviewViewportState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$committed$2d$ref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-committed-ref.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$coords$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/preview-coords.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/math.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$zoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/zoom.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const MIDDLE_MOUSE_BUTTON = 1;
const IS_AT_FIT_EPSILON = 0.001;
const IS_AT_ACTUAL_SIZE_EPSILON = 0.01;
const PreviewViewportContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function getClampedCenterAxis({ axisSize, center, scale, viewportSize }) {
    if (axisSize <= 0 || scale <= 0 || viewportSize <= 0) {
        return axisSize / 2;
    }
    const visibleHalfSpan = viewportSize / (2 * scale);
    if (visibleHalfSpan >= axisSize / 2) {
        return axisSize / 2;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])({
        value: center,
        min: visibleHalfSpan,
        max: axisSize - visibleHalfSpan
    });
}
function clampViewportCenter({ canvasHeight, canvasWidth, centerX, centerY, scale, viewportHeight, viewportWidth }) {
    return {
        x: getClampedCenterAxis({
            center: centerX,
            axisSize: canvasWidth,
            scale,
            viewportSize: viewportWidth
        }),
        y: getClampedCenterAxis({
            center: centerY,
            axisSize: canvasHeight,
            scale,
            viewportSize: viewportHeight
        })
    };
}
function getFitScale({ canvasHeight, canvasWidth, viewportHeight, viewportWidth }) {
    if (canvasHeight <= 0 || canvasWidth <= 0 || viewportHeight <= 0 || viewportWidth <= 0) {
        return 1;
    }
    return Math.min(viewportWidth / canvasWidth, viewportHeight / canvasHeight);
}
function getClampedZoom({ zoom }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])({
        value: zoom,
        min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$zoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREVIEW_ZOOM"].min,
        max: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$zoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREVIEW_ZOOM"].max
    });
}
function PreviewViewportProvider({ children, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewViewportContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/preview-viewport.tsx",
        lineNumber: 203,
        columnNumber: 3
    }, this);
}
function usePreviewViewportState({ canvasHeight, canvasWidth, viewportHeight, viewportRef, viewportWidth }) {
    const [zoom, setZoomState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [center, setCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>({
            x: canvasWidth / 2,
            y: canvasHeight / 2
        }));
    const [isPanning, setIsPanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const panSessionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const centerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$committed$2d$ref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(center);
    const fitScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getFitScale({
            canvasHeight,
            canvasWidth,
            viewportHeight,
            viewportWidth
        }), [
        canvasHeight,
        canvasWidth,
        viewportHeight,
        viewportWidth
    ]);
    const viewportScale = fitScale * zoom;
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            canvasHeight,
            canvasWidth,
            centerX: center.x,
            centerY: center.y,
            scale: viewportScale,
            viewportHeight,
            viewportWidth
        }), [
        canvasHeight,
        canvasWidth,
        center.x,
        center.y,
        viewportHeight,
        viewportScale,
        viewportWidth
    ]);
    const scaleZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ factor })=>{
        setZoomState((previousZoom)=>getClampedZoom({
                zoom: previousZoom * factor
            }));
    }, []);
    const panByScreenDelta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ deltaX, deltaY })=>{
        if (zoom <= 1 || deltaX === 0 && deltaY === 0) {
            return;
        }
        setCenter((previousCenter)=>clampViewportCenter({
                canvasHeight,
                canvasWidth,
                centerX: previousCenter.x + deltaX / viewportScale,
                centerY: previousCenter.y + deltaY / viewportScale,
                scale: viewportScale,
                viewportHeight,
                viewportWidth
            }));
    }, [
        canvasHeight,
        canvasWidth,
        viewportHeight,
        viewportScale,
        viewportWidth,
        zoom
    ]);
    const resetPan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setCenter({
            x: canvasWidth / 2,
            y: canvasHeight / 2
        });
    }, [
        canvasHeight,
        canvasWidth
    ]);
    const fitToScreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setZoomState(1);
        setCenter({
            x: canvasWidth / 2,
            y: canvasHeight / 2
        });
    }, [
        canvasHeight,
        canvasWidth
    ]);
    const zoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setZoomState((previousZoom)=>getClampedZoom({
                zoom: previousZoom * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$zoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREVIEW_ZOOM"].step
            }));
    }, []);
    const zoomOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setZoomState((previousZoom)=>getClampedZoom({
                zoom: previousZoom / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$zoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREVIEW_ZOOM"].step
            }));
    }, []);
    const setActualSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const actualSizeZoom = fitScale > 0 ? 1 / fitScale : 1;
        setZoomState(getClampedZoom({
            zoom: actualSizeZoom
        }));
    }, [
        fitScale
    ]);
    const setViewportPercent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ percent })=>{
        const targetZoom = fitScale > 0 ? percent / 100 / fitScale : 1;
        setZoomState(getClampedZoom({
            zoom: targetZoom
        }));
    }, [
        fitScale
    ]);
    const getViewportRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>viewportRef.current?.getBoundingClientRect() ?? null, [
        viewportRef
    ]);
    const screenToCanvasWithViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ clientX, clientY })=>{
        const viewportRect = getViewportRect();
        if (!viewportRect) return null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$coords$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["screenToCanvas"])({
            clientX,
            clientY,
            geometry,
            viewportRect
        });
    }, [
        getViewportRect,
        geometry
    ]);
    const canvasToOverlayWithViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ canvasX, canvasY })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$coords$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["canvasToOverlay"])({
            canvasX,
            canvasY,
            geometry
        }), [
        geometry
    ]);
    const positionToOverlayWithViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ positionX, positionY })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$coords$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["positionToOverlay"])({
            geometry,
            positionX,
            positionY
        }), [
        geometry
    ]);
    const getDisplayScaleWithViewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$coords$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDisplayScale"])({
            geometry
        }), [
        geometry
    ]);
    const getLogicalThresholdForScreenPixels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ screenPixels })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$coords$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["screenPixelsToLogicalThreshold"])({
            geometry,
            screenPixels
        }), [
        geometry
    ]);
    const handlePanPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ event })=>{
        if (event.button !== MIDDLE_MOUSE_BUTTON || zoom <= 1) {
            return false;
        }
        event.preventDefault();
        event.stopPropagation();
        panSessionRef.current = {
            centerX: centerRef.current.x,
            centerY: centerRef.current.y,
            clientX: event.clientX,
            clientY: event.clientY,
            pointerId: event.pointerId
        };
        setIsPanning(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        return true;
    }, [
        centerRef,
        zoom
    ]);
    const handlePanPointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ event })=>{
        const panSession = panSessionRef.current;
        if (!panSession) {
            return false;
        }
        event.preventDefault();
        event.stopPropagation();
        const deltaX = event.clientX - panSession.clientX;
        const deltaY = event.clientY - panSession.clientY;
        const nextCenter = clampViewportCenter({
            canvasHeight,
            canvasWidth,
            centerX: panSession.centerX - deltaX / viewportScale,
            centerY: panSession.centerY - deltaY / viewportScale,
            scale: viewportScale,
            viewportHeight,
            viewportWidth
        });
        setCenter(nextCenter);
        return true;
    }, [
        canvasHeight,
        canvasWidth,
        viewportHeight,
        viewportScale,
        viewportWidth
    ]);
    const handlePanPointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ event })=>{
        const panSession = panSessionRef.current;
        if (!panSession) {
            return false;
        }
        if (event.currentTarget.hasPointerCapture(panSession.pointerId)) {
            event.currentTarget.releasePointerCapture(panSession.pointerId);
        }
        panSessionRef.current = null;
        setIsPanning(false);
        return true;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setZoomState(1);
        setCenter({
            x: canvasWidth / 2,
            y: canvasHeight / 2
        });
        panSessionRef.current = null;
        setIsPanning(false);
    }, [
        canvasHeight,
        canvasWidth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCenter((previousCenter)=>clampViewportCenter({
                canvasHeight,
                canvasWidth,
                centerX: previousCenter.x,
                centerY: previousCenter.y,
                scale: viewportScale,
                viewportHeight,
                viewportWidth
            }));
    }, [
        canvasHeight,
        canvasWidth,
        viewportHeight,
        viewportScale,
        viewportWidth
    ]);
    const sceneWidth = canvasWidth * viewportScale;
    const sceneHeight = canvasHeight * viewportScale;
    const sceneLeft = viewportWidth / 2 - center.x * viewportScale;
    const sceneTop = viewportHeight / 2 - center.y * viewportScale;
    const canPan = zoom > 1;
    const zoomPercent = Math.round(viewportScale * 100);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            canPan,
            isAtActualSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNearlyEqual"])({
                leftValue: viewportScale,
                rightValue: 1,
                epsilon: IS_AT_ACTUAL_SIZE_EPSILON
            }),
            isAtFit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNearlyEqual"])({
                leftValue: zoom,
                rightValue: 1,
                epsilon: IS_AT_FIT_EPSILON
            }),
            isPanning,
            sceneHeight,
            sceneLeft,
            sceneTop,
            sceneWidth,
            zoomPercent,
            canvasToOverlay: canvasToOverlayWithViewport,
            fitToScreen,
            getDisplayScale: getDisplayScaleWithViewport,
            handlePanPointerDown,
            handlePanPointerMove,
            handlePanPointerUp,
            panByScreenDelta,
            positionToOverlay: positionToOverlayWithViewport,
            resetPan,
            scaleZoom,
            screenPixelsToLogicalThreshold: getLogicalThresholdForScreenPixels,
            screenToCanvas: screenToCanvasWithViewport,
            setActualSize,
            setViewportPercent,
            zoomIn,
            zoomOut
        }), [
        canPan,
        viewportScale,
        zoom,
        isPanning,
        sceneHeight,
        sceneLeft,
        sceneTop,
        sceneWidth,
        zoomPercent,
        canvasToOverlayWithViewport,
        fitToScreen,
        getDisplayScaleWithViewport,
        handlePanPointerDown,
        handlePanPointerMove,
        handlePanPointerUp,
        panByScreenDelta,
        positionToOverlayWithViewport,
        resetPan,
        scaleZoom,
        getLogicalThresholdForScreenPixels,
        screenToCanvasWithViewport,
        setActualSize,
        setViewportPercent,
        zoomIn,
        zoomOut
    ]);
}
function usePreviewViewport() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PreviewViewportContext);
    if (!context) {
        throw new Error("usePreviewViewport must be used within PreviewViewportProvider");
    }
    return context;
}
}),
"[project]/apps/web/src/preview/components/overlay-layer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewOverlayLayer",
    ()=>PreviewOverlayLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
"use client";
;
;
const HUD_ANCHOR_CLASS_NAMES = {
    "top-left": "absolute top-2 left-2 flex flex-col items-start gap-1.5",
    "top-right": "absolute top-2 right-2 flex flex-col items-end gap-1.5",
    "bottom-left": "absolute bottom-2 left-2 flex flex-col-reverse items-start gap-1.5",
    "bottom-right": "absolute right-2 bottom-2 flex flex-col-reverse items-end gap-1.5"
};
function getPositionedMountStyle({ instance, baseStyle, sceneLeft, sceneTop, sceneWidth, sceneHeight }) {
    if (instance.mount.kind === "hud") {
        return baseStyle;
    }
    const isSceneMount = instance.mount.kind === "scene";
    const mount = instance.mount;
    const hasExplicitBounds = mount.x != null || mount.y != null || mount.width != null || mount.height != null;
    return {
        ...baseStyle,
        left: (isSceneMount ? sceneLeft : 0) + (mount.x ?? 0),
        top: (isSceneMount ? sceneTop : 0) + (mount.y ?? 0),
        ...hasExplicitBounds ? {
            ...mount.width != null ? {
                width: mount.width
            } : {},
            ...mount.height != null ? {
                height: mount.height
            } : {}
        } : {
            width: isSceneMount ? sceneWidth : "100%",
            height: isSceneMount ? sceneHeight : "100%"
        }
    };
}
function PreviewOverlayLayer({ instances, plane }) {
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const visibleInstances = instances.filter((instance)=>(instance.plane ?? "over-interaction") === plane).sort((left, right)=>(left.zIndex ?? 0) - (right.zIndex ?? 0));
    if (visibleInstances.length === 0) {
        return null;
    }
    const hudInstancesByAnchor = visibleInstances.reduce((groups, instance)=>{
        if (instance.mount.kind === "hud") {
            groups[instance.mount.anchor].push(instance);
        }
        return groups;
    }, {
        "top-left": [],
        "top-right": [],
        "bottom-left": [],
        "bottom-right": []
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            visibleInstances.map((instance)=>{
                if (instance.mount.kind === "hud") {
                    return null;
                }
                const pointerEvents = instance.pointerEvents ?? "none";
                const baseStyle = {
                    pointerEvents,
                    zIndex: instance.zIndex
                };
                const content = instance.render({
                    sceneHeight: viewport.sceneHeight,
                    sceneWidth: viewport.sceneWidth
                });
                switch(instance.mount.kind){
                    case "scene":
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: getPositionedMountStyle({
                                instance,
                                baseStyle,
                                sceneLeft: viewport.sceneLeft,
                                sceneTop: viewport.sceneTop,
                                sceneWidth: viewport.sceneWidth,
                                sceneHeight: viewport.sceneHeight
                            }),
                            children: content
                        }, instance.id, false, {
                            fileName: "[project]/apps/web/src/preview/components/overlay-layer.tsx",
                            lineNumber: 118,
                            columnNumber: 8
                        }, this);
                    case "viewport":
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: getPositionedMountStyle({
                                instance,
                                baseStyle,
                                sceneLeft: viewport.sceneLeft,
                                sceneTop: viewport.sceneTop,
                                sceneWidth: viewport.sceneWidth,
                                sceneHeight: viewport.sceneHeight
                            }),
                            children: content
                        }, instance.id, false, {
                            fileName: "[project]/apps/web/src/preview/components/overlay-layer.tsx",
                            lineNumber: 136,
                            columnNumber: 8
                        }, this);
                    default:
                        return null;
                }
            }),
            Object.entries(hudInstancesByAnchor).map(([anchor, anchorInstances])=>{
                if (anchorInstances.length === 0) {
                    return null;
                }
                const sortedAnchorInstances = [
                    ...anchorInstances
                ].sort((left, right)=>(left.mount.kind === "hud" ? left.mount.order ?? 0 : 0) - (right.mount.kind === "hud" ? right.mount.order ?? 0 : 0));
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: HUD_ANCHOR_CLASS_NAMES[anchor],
                    children: sortedAnchorInstances.map((instance)=>{
                        const pointerEvents = instance.pointerEvents ?? "none";
                        const content = instance.render({
                            sceneHeight: viewport.sceneHeight,
                            sceneWidth: viewport.sceneWidth
                        });
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                pointerEvents,
                                zIndex: instance.zIndex
                            },
                            children: content
                        }, instance.id, false, {
                            fileName: "[project]/apps/web/src/preview/components/overlay-layer.tsx",
                            lineNumber: 181,
                            columnNumber: 9
                        }, this);
                    })
                }, anchor, false, {
                    fileName: "[project]/apps/web/src/preview/components/overlay-layer.tsx",
                    lineNumber: 172,
                    columnNumber: 6
                }, this);
            })
        ]
    }, void 0, true);
}
}),
"[project]/apps/web/src/preview/hit-test.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHitElements",
    ()=>getHitElements,
    "hitTest",
    ()=>hitTest,
    "resolvePreferredHit",
    ()=>resolvePreferredHit
]);
function pointInRotatedRect({ px, py, cx, cy, width, height, rotation }) {
    const angleRad = rotation * Math.PI / 180;
    const cos = Math.cos(-angleRad);
    const sin = Math.sin(-angleRad);
    const dx = px - cx;
    const dy = py - cy;
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;
    const halfW = Math.abs(width) / 2;
    const halfH = Math.abs(height) / 2;
    return localX >= -halfW && localX <= halfW && localY >= -halfH && localY <= halfH;
}
function getHitElements({ canvasX, canvasY, elementsWithBounds }) {
    const hits = [];
    for(let i = elementsWithBounds.length - 1; i >= 0; i--){
        const { bounds } = elementsWithBounds[i];
        if (pointInRotatedRect({
            px: canvasX,
            py: canvasY,
            cx: bounds.cx,
            cy: bounds.cy,
            width: bounds.width,
            height: bounds.height,
            rotation: bounds.rotation
        })) {
            hits.push(elementsWithBounds[i]);
        }
    }
    return hits;
}
function hitTest({ canvasX, canvasY, elementsWithBounds }) {
    return getHitElements({
        canvasX,
        canvasY,
        elementsWithBounds
    })[0] ?? null;
}
function resolvePreferredHit({ hits, preferredElements }) {
    if (preferredElements.length === 0) return null;
    return hits.find((hit)=>preferredElements.some((preferredElement)=>preferredElement.trackId === hit.trackId && preferredElement.elementId === hit.elementId)) ?? null;
}
}),
"[project]/apps/web/src/preview/controllers/preview-interaction-controller.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PreviewInteractionController",
    ()=>PreviewInteractionController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/element-bounds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hit$2d$test$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/hit-test.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/preview-snap.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const MIN_DRAG_DISTANCE = 0.5;
const PRIMARY_POINTER_BUTTON = 0;
const IDLE_GESTURE = {
    kind: "idle"
};
function isSameElementRef({ left, right }) {
    return left.trackId === right.trackId && left.elementId === right.elementId;
}
function buildDragSelection({ selectedElements, dragTarget }) {
    const dragTargetRef = {
        trackId: dragTarget.trackId,
        elementId: dragTarget.elementId
    };
    if (!selectedElements.some((selectedElement)=>isSameElementRef({
            left: selectedElement,
            right: dragTargetRef
        }))) {
        return [
            dragTargetRef
        ];
    }
    return [
        dragTargetRef,
        ...selectedElements.filter((selectedElement)=>!isSameElementRef({
                left: selectedElement,
                right: dragTargetRef
            }))
    ];
}
function movedPastDragThreshold({ current, origin }) {
    return Math.abs(current.x - origin.x) > MIN_DRAG_DISTANCE || Math.abs(current.y - origin.y) > MIN_DRAG_DISTANCE;
}
function toDragElementSnapshots({ elementsWithTracks }) {
    const isVisualTrackedElement = (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"])(value.element);
    return elementsWithTracks.filter(isVisualTrackedElement).map(({ track, element })=>({
            trackId: track.id,
            elementId: element.id,
            initialTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                params: element.params
            }),
            initialParams: element.params
        }));
}
class PreviewInteractionController {
    depsRef;
    subscribers = new Set();
    gesture = IDLE_GESTURE;
    editingTextState = null;
    wasPlaying;
    unsubscribePlayback = null;
    constructor({ depsRef }){
        this.depsRef = depsRef;
        this.wasPlaying = this.deps.playback.getIsPlaying();
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.commitTextEdit = this.commitTextEdit.bind(this);
        this.handlePlaybackChange = this.handlePlaybackChange.bind(this);
        this.unsubscribePlayback = this.deps.playback.subscribe(this.handlePlaybackChange);
    }
    get deps() {
        return this.depsRef.current;
    }
    get isDragging() {
        return this.gesture.kind === "dragging";
    }
    get editingText() {
        return this.editingTextState;
    }
    subscribe({ listener }) {
        this.subscribers.add(listener);
        return ()=>this.subscribers.delete(listener);
    }
    destroy() {
        this.unsubscribePlayback?.();
        this.unsubscribePlayback = null;
        this.abortActiveGesture();
        this.editingTextState = null;
        this.subscribers.clear();
    }
    cancel() {
        if (this.gesture.kind === "idle") return;
        this.abortActiveGesture();
        this.notify();
    }
    abortActiveGesture() {
        if (this.gesture.kind === "idle") return;
        if (this.gesture.kind === "dragging") {
            this.deps.timeline.discardPreview();
        }
        this.releaseCapturedPointer({
            pointerState: this.gesture
        });
        this.gesture = IDLE_GESTURE;
        this.clearSnapLines();
    }
    commitTextEdit() {
        if (!this.editingTextState) return;
        this.editingTextState = null;
        this.deps.timeline.commitPreview();
        this.notify();
    }
    onDoubleClick({ clientX, clientY }) {
        if (this.editingTextState || this.deps.preview.isMaskMode()) return;
        const startPos = this.deps.viewport.screenToCanvas({
            clientX,
            clientY
        });
        if (!startPos) return;
        const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hit$2d$test$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hitTest"])({
            canvasX: startPos.x,
            canvasY: startPos.y,
            elementsWithBounds: this.getVisibleElementsWithBounds()
        });
        if (!hit || hit.element.type !== "text") return;
        this.editingTextState = {
            trackId: hit.trackId,
            elementId: hit.elementId,
            element: hit.element
        };
        this.notify();
    }
    onPointerDown({ clientX, clientY, currentTarget, pointerId, button }) {
        if (this.editingTextState) return;
        if (this.deps.preview.isMaskMode()) return;
        if (button !== PRIMARY_POINTER_BUTTON) return;
        const startPos = this.deps.viewport.screenToCanvas({
            clientX,
            clientY
        });
        if (!startPos) return;
        const hits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hit$2d$test$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHitElements"])({
            canvasX: startPos.x,
            canvasY: startPos.y,
            elementsWithBounds: this.getVisibleElementsWithBounds()
        });
        const selectedElements = this.deps.selection.getSelected();
        this.gesture = {
            kind: "pending",
            origin: startPos,
            pointerId,
            captureTarget: currentTarget,
            topmostHit: hits[0] ?? null,
            selectedHit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hit$2d$test$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePreferredHit"])({
                hits,
                preferredElements: [
                    ...selectedElements
                ]
            }),
            selectedElements
        };
        currentTarget.setPointerCapture(pointerId);
    }
    onPointerMove({ clientX, clientY }) {
        const currentPos = this.deps.viewport.screenToCanvas({
            clientX,
            clientY
        });
        if (!currentPos) return;
        if (this.gesture.kind === "pending") {
            const pending = this.gesture;
            if (!movedPastDragThreshold({
                current: currentPos,
                origin: pending.origin
            })) {
                this.clearSnapLines();
                return;
            }
            this.beginDragFromPending({
                pending
            });
        }
        if (this.gesture.kind !== "dragging") return;
        this.updateDragPreview({
            drag: this.gesture,
            currentPos
        });
    }
    onPointerUp({ type }) {
        if (this.gesture.kind === "dragging") {
            const drag = this.gesture;
            if (type === "pointercancel") {
                this.deps.timeline.discardPreview();
            } else {
                this.deps.timeline.commitPreview();
            }
            this.gesture = IDLE_GESTURE;
            this.clearSnapLines();
            this.releaseCapturedPointer({
                pointerState: drag
            });
            this.notify();
            return;
        }
        if (this.gesture.kind !== "pending") return;
        const pending = this.gesture;
        if (type !== "pointercancel") {
            const clickTarget = pending.topmostHit;
            if (!clickTarget) {
                this.deps.selection.clearSelection();
            } else {
                this.deps.selection.setSelected([
                    {
                        trackId: clickTarget.trackId,
                        elementId: clickTarget.elementId
                    }
                ]);
            }
        }
        this.gesture = IDLE_GESTURE;
        this.clearSnapLines();
        this.releaseCapturedPointer({
            pointerState: pending
        });
    }
    notify() {
        for (const listener of this.subscribers)listener();
    }
    clearSnapLines() {
        this.deps.preview.onSnapLinesChange?.([]);
    }
    releaseCapturedPointer({ pointerState }) {
        if (!pointerState) return;
        if (!pointerState.captureTarget.hasPointerCapture(pointerState.pointerId)) {
            return;
        }
        pointerState.captureTarget.releasePointerCapture(pointerState.pointerId);
    }
    getVisibleElementsWithBounds() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVisibleElementsWithBounds"])({
            tracks: this.deps.scene.getTracks(),
            currentTime: this.deps.scene.getCurrentTime(),
            canvasSize: this.deps.scene.getCanvasSize(),
            mediaAssets: this.deps.scene.getMediaAssets()
        });
    }
    handlePlaybackChange() {
        const isPlaying = this.deps.playback.getIsPlaying();
        if (isPlaying && !this.wasPlaying && this.editingTextState) {
            this.commitTextEdit();
        }
        this.wasPlaying = isPlaying;
    }
    beginDragFromPending({ pending }) {
        const dragTarget = pending.selectedHit ?? pending.topmostHit;
        if (!dragTarget) {
            this.gesture = IDLE_GESTURE;
            this.clearSnapLines();
            this.releaseCapturedPointer({
                pointerState: pending
            });
            return;
        }
        const dragSelection = buildDragSelection({
            selectedElements: pending.selectedElements,
            dragTarget
        });
        const draggableElements = toDragElementSnapshots({
            elementsWithTracks: this.deps.timeline.getElementsWithTracks({
                elements: dragSelection
            })
        });
        if (draggableElements.length === 0) {
            this.gesture = IDLE_GESTURE;
            this.clearSnapLines();
            this.releaseCapturedPointer({
                pointerState: pending
            });
            return;
        }
        if (pending.selectedHit === null) {
            this.deps.selection.setSelected([
                {
                    trackId: dragTarget.trackId,
                    elementId: dragTarget.elementId
                }
            ]);
        }
        this.gesture = {
            kind: "dragging",
            origin: pending.origin,
            pointerId: pending.pointerId,
            captureTarget: pending.captureTarget,
            bounds: {
                width: dragTarget.bounds.width,
                height: dragTarget.bounds.height,
                rotation: dragTarget.bounds.rotation
            },
            elements: draggableElements
        };
        this.notify();
    }
    updateDragPreview({ drag, currentPos }) {
        const firstElement = drag.elements[0];
        if (!firstElement) return;
        const deltaX = currentPos.x - drag.origin.x;
        const deltaY = currentPos.y - drag.origin.y;
        const proposedPosition = {
            x: firstElement.initialTransform.position.x + deltaX,
            y: firstElement.initialTransform.position.y + deltaY
        };
        const shouldSnap = !this.deps.input.isShiftHeld();
        const snapThreshold = this.deps.viewport.screenPixelsToLogicalThreshold({
            screenPixels: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SNAP_THRESHOLD_SCREEN_PIXELS"]
        });
        const { snappedPosition, activeLines } = shouldSnap ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapPosition"])({
            proposedPosition,
            canvasSize: this.deps.scene.getCanvasSize(),
            elementSize: drag.bounds,
            rotation: drag.bounds.rotation,
            snapThreshold
        }) : {
            snappedPosition: proposedPosition,
            activeLines: []
        };
        this.deps.preview.onSnapLinesChange?.(activeLines);
        const deltaSnappedX = snappedPosition.x - firstElement.initialTransform.position.x;
        const deltaSnappedY = snappedPosition.y - firstElement.initialTransform.position.y;
        this.deps.timeline.previewElements(drag.elements.map(({ trackId, elementId, initialTransform, initialParams })=>({
                trackId,
                elementId,
                updates: {
                    params: {
                        ...initialParams,
                        "transform.positionX": initialTransform.position.x + deltaSnappedX,
                        "transform.positionY": initialTransform.position.y + deltaSnappedY
                    }
                }
            })));
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/hooks/use-preview-interaction.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "usePreviewInteraction",
    ()=>usePreviewInteraction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$committed$2d$ref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-committed-ref.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-shift-key.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$cancel$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/cancel-interaction.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$preview$2d$interaction$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/controllers/preview-interaction-controller.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$preview$2d$interaction$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$preview$2d$interaction$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function usePreviewInteraction({ onSnapLinesChange, isMaskMode = false }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const isShiftHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShiftKey"])();
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const deps = {
        viewport: {
            screenToCanvas: viewport.screenToCanvas,
            screenPixelsToLogicalThreshold: viewport.screenPixelsToLogicalThreshold
        },
        input: {
            isShiftHeld: ()=>isShiftHeldRef.current
        },
        scene: {
            getTracks: ()=>editor.scenes.getActiveScene().tracks,
            getCurrentTime: ()=>editor.playback.getCurrentTime(),
            getMediaAssets: ()=>editor.media.getAssets(),
            getCanvasSize: ()=>editor.project.getActive().settings.canvasSize
        },
        selection: {
            getSelected: ()=>editor.selection.getSelectedElements(),
            setSelected: (elements)=>editor.selection.setSelectedElements({
                    elements: [
                        ...elements
                    ]
                }),
            clearSelection: ()=>editor.selection.clearSelection()
        },
        timeline: {
            getElementsWithTracks: ({ elements })=>editor.timeline.getElementsWithTracks({
                    elements: [
                        ...elements
                    ]
                }),
            previewElements: (updates)=>editor.timeline.previewElements({
                    updates: [
                        ...updates
                    ]
                }),
            commitPreview: ()=>editor.timeline.commitPreview(),
            discardPreview: ()=>editor.timeline.discardPreview()
        },
        playback: {
            getIsPlaying: ()=>editor.playback.getIsPlaying(),
            subscribe: (listener)=>editor.playback.subscribe(listener)
        },
        preview: {
            isMaskMode: ()=>isMaskMode,
            onSnapLinesChange
        }
    };
    const depsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$committed$2d$ref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(deps);
    const [controller] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$preview$2d$interaction$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewInteractionController"]({
            depsRef
        }));
    const [, rerender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])((n)=>n + 1, 0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>controller.subscribe({
            listener: rerender
        }), [
        controller
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!controller.isDragging) return;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$cancel$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerCanceller"])({
            fn: ()=>controller.cancel()
        });
    }, [
        controller.isDragging,
        controller
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>controller.destroy(), [
        controller
    ]);
    return {
        onPointerDown: controller.onPointerDown,
        onPointerMove: controller.onPointerMove,
        onPointerUp: controller.onPointerUp,
        onDoubleClick: controller.onDoubleClick,
        editingText: controller.editingText,
        commitTextEdit: controller.commitTextEdit
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/controllers/transform-handle-controller.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TransformHandleController",
    ()=>TransformHandleController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/element-bounds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/preview-snap.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/animation-values.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const IDLE_SESSION = {
    kind: "idle"
};
function getPreferredEdge({ edge }) {
    return edge === "right" ? {
        right: true
    } : edge === "left" ? {
        left: true
    } : {
        bottom: true
    };
}
function clampScaleNonZero(scale) {
    if (Math.abs(scale) < __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_SCALE"]) {
        return scale < 0 ? -__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_SCALE"] : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_SCALE"];
    }
    return scale;
}
function getCornerDistance({ bounds, corner }) {
    const halfWidth = bounds.width / 2;
    const halfHeight = bounds.height / 2;
    const angleRad = bounds.rotation * Math.PI / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const localX = corner === "top-left" || corner === "bottom-left" ? -halfWidth : halfWidth;
    const localY = corner === "top-left" || corner === "top-right" ? -halfHeight : halfHeight;
    const rotatedX = localX * cos - localY * sin;
    const rotatedY = localX * sin + localY * cos;
    return Math.sqrt(rotatedX * rotatedX + rotatedY * rotatedY) || 1;
}
function buildSelectedWithBounds({ selectedElements, elementsWithBounds }) {
    if (selectedElements.length !== 1) return null;
    return elementsWithBounds.find((entry)=>entry.trackId === selectedElements[0].trackId && entry.elementId === selectedElements[0].elementId) ?? null;
}
function buildCornerScaleAnimationReset({ animations }) {
    const shouldClearScaleAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasKeyframesForPath"])({
        animations,
        propertyPath: "transform.scaleX"
    }) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasKeyframesForPath"])({
        animations,
        propertyPath: "transform.scaleY"
    });
    return {
        shouldClearScaleAnimation,
        animationsWithoutScale: shouldClearScaleAnimation ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setChannel"])({
            animations: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setChannel"])({
                animations,
                propertyPath: "transform.scaleX",
                channel: undefined
            }),
            propertyPath: "transform.scaleY",
            channel: undefined
        }) : animations
    };
}
function buildEdgeScaleAnimationReset({ animations, edge }) {
    const propertyPath = edge === "right" || edge === "left" ? "transform.scaleX" : "transform.scaleY";
    const shouldClearScaleAnimation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasKeyframesForPath"])({
        animations,
        propertyPath
    });
    return {
        shouldClearScaleAnimation,
        animationsWithoutScale: shouldClearScaleAnimation ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setChannel"])({
            animations,
            propertyPath,
            channel: undefined
        }) : animations
    };
}
class TransformHandleController {
    depsRef;
    subscribers = new Set();
    session = IDLE_SESSION;
    constructor({ depsRef }){
        this.depsRef = depsRef;
        this.onCornerPointerDown = this.onCornerPointerDown.bind(this);
        this.onEdgePointerDown = this.onEdgePointerDown.bind(this);
        this.onRotationPointerDown = this.onRotationPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
    }
    get deps() {
        return this.depsRef.current;
    }
    get selectedWithBounds() {
        return buildSelectedWithBounds({
            selectedElements: this.deps.scene.getSelectedElements(),
            elementsWithBounds: this.getVisibleElementsWithBounds()
        });
    }
    get activeHandle() {
        switch(this.session.kind){
            case "corner-scale":
                return this.session.corner;
            case "edge-scale":
                return this.session.edge;
            case "rotation":
                return "rotation";
            default:
                return null;
        }
    }
    get isActive() {
        return this.session.kind !== "idle";
    }
    subscribe(fn) {
        this.subscribers.add(fn);
        return ()=>this.subscribers.delete(fn);
    }
    destroy() {
        if (this.session.kind !== "idle") {
            const session = this.session;
            this.session = IDLE_SESSION;
            this.deps.timeline.discardPreview();
            this.clearSnapLines();
            this.releaseCapturedPointer(session);
        }
        this.subscribers.clear();
    }
    cancel() {
        if (this.session.kind === "idle") return;
        const session = this.session;
        this.session = IDLE_SESSION;
        this.deps.timeline.discardPreview();
        this.clearSnapLines();
        this.releaseCapturedPointer(session);
        this.notify();
    }
    onCornerPointerDown({ event, corner }) {
        const context = this.getSelectedVisualContext();
        if (!context) return;
        event.stopPropagation();
        const { shouldClearScaleAnimation, animationsWithoutScale } = buildCornerScaleAnimationReset({
            animations: context.element.animations
        });
        this.session = {
            kind: "corner-scale",
            corner,
            trackId: context.trackId,
            elementId: context.elementId,
            initialTransform: context.resolvedTransform,
            initialParams: context.element.params,
            initialDistance: getCornerDistance({
                bounds: context.bounds,
                corner
            }),
            initialBoundsCx: context.bounds.cx,
            initialBoundsCy: context.bounds.cy,
            baseWidth: context.bounds.width / context.resolvedTransform.scaleX,
            baseHeight: context.bounds.height / context.resolvedTransform.scaleY,
            shouldClearScaleAnimation,
            animationsWithoutScale,
            pointerId: event.pointerId,
            captureTarget: this.capturePointer({
                target: event.currentTarget,
                pointerId: event.pointerId
            })
        };
        this.notify();
    }
    onRotationPointerDown({ event }) {
        const context = this.getSelectedVisualContext();
        if (!context) return;
        event.stopPropagation();
        const position = this.deps.viewport.screenToCanvas({
            clientX: event.clientX,
            clientY: event.clientY
        });
        if (!position) return;
        const deltaX = position.x - context.bounds.cx;
        const deltaY = position.y - context.bounds.cy;
        const initialAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        this.session = {
            kind: "rotation",
            trackId: context.trackId,
            elementId: context.elementId,
            initialTransform: context.resolvedTransform,
            initialParams: context.element.params,
            initialAngle,
            initialBoundsCx: context.bounds.cx,
            initialBoundsCy: context.bounds.cy,
            pointerId: event.pointerId,
            captureTarget: this.capturePointer({
                target: event.currentTarget,
                pointerId: event.pointerId
            })
        };
        this.notify();
    }
    onEdgePointerDown({ event, edge }) {
        const context = this.getSelectedVisualContext();
        if (!context) return;
        event.stopPropagation();
        const { shouldClearScaleAnimation, animationsWithoutScale } = buildEdgeScaleAnimationReset({
            animations: context.element.animations,
            edge
        });
        this.session = {
            kind: "edge-scale",
            edge,
            trackId: context.trackId,
            elementId: context.elementId,
            initialTransform: context.resolvedTransform,
            initialParams: context.element.params,
            initialBoundsCx: context.bounds.cx,
            initialBoundsCy: context.bounds.cy,
            baseWidth: context.bounds.width / context.resolvedTransform.scaleX,
            baseHeight: context.bounds.height / context.resolvedTransform.scaleY,
            rotationRad: context.bounds.rotation * Math.PI / 180,
            shouldClearScaleAnimation,
            animationsWithoutScale,
            pointerId: event.pointerId,
            captureTarget: this.capturePointer({
                target: event.currentTarget,
                pointerId: event.pointerId
            })
        };
        this.notify();
    }
    onPointerMove({ event }) {
        if (this.session.kind === "idle") return;
        const position = this.deps.viewport.screenToCanvas({
            clientX: event.clientX,
            clientY: event.clientY
        });
        if (!position) return;
        switch(this.session.kind){
            case "corner-scale":
                this.previewCornerScale({
                    session: this.session,
                    position
                });
                return;
            case "edge-scale":
                this.previewEdgeScale({
                    session: this.session,
                    position
                });
                return;
            case "rotation":
                this.previewRotation({
                    session: this.session,
                    position
                });
                return;
            default:
                return;
        }
    }
    onPointerUp() {
        if (this.session.kind === "idle") return;
        const session = this.session;
        this.session = IDLE_SESSION;
        this.deps.timeline.commitPreview();
        this.clearSnapLines();
        this.releaseCapturedPointer(session);
        this.notify();
    }
    notify() {
        for (const fn of this.subscribers)fn();
    }
    clearSnapLines() {
        this.deps.preview.onSnapLinesChange?.([]);
    }
    capturePointer({ target, pointerId }) {
        target.setPointerCapture(pointerId);
        return target;
    }
    releaseCapturedPointer(pointerState) {
        if (!pointerState.captureTarget.hasPointerCapture(pointerState.pointerId)) {
            return;
        }
        pointerState.captureTarget.releasePointerCapture(pointerState.pointerId);
    }
    getVisibleElementsWithBounds() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVisibleElementsWithBounds"])({
            tracks: this.deps.scene.getTracks(),
            currentTime: this.deps.scene.getCurrentTime(),
            canvasSize: this.deps.scene.getCanvasSize(),
            mediaAssets: this.deps.scene.getMediaAssets()
        });
    }
    getSelectedVisualContext() {
        const selectedWithBounds = this.selectedWithBounds;
        if (!selectedWithBounds) return null;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"])(selectedWithBounds.element)) return null;
        const localTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementLocalTime"])({
            timelineTime: this.deps.scene.getCurrentTime(),
            elementStartTime: selectedWithBounds.element.startTime,
            elementDuration: selectedWithBounds.element.duration
        });
        return {
            trackId: selectedWithBounds.trackId,
            elementId: selectedWithBounds.elementId,
            element: selectedWithBounds.element,
            bounds: selectedWithBounds.bounds,
            resolvedTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
                baseTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
                    params: selectedWithBounds.element.params
                }),
                animations: selectedWithBounds.element.animations,
                localTime
            })
        };
    }
    previewCornerScale({ session, position }) {
        const deltaX = position.x - session.initialBoundsCx;
        const deltaY = position.y - session.initialBoundsCy;
        const currentDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
        const scaleFactor = currentDistance / session.initialDistance;
        // Use actual element dimensions (base * current scale) so snapping is
        // computed from the rendered geometry when scaleX != scaleY.
        const effectiveWidth = session.baseWidth * session.initialTransform.scaleX;
        const effectiveHeight = session.baseHeight * session.initialTransform.scaleY;
        const snapThreshold = this.deps.viewport.screenPixelsToLogicalThreshold({
            screenPixels: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SNAP_THRESHOLD_SCREEN_PIXELS"]
        });
        const { snappedScale, activeLines } = this.deps.input.isShiftHeld() ? {
            snappedScale: scaleFactor,
            activeLines: []
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapScale"])({
            proposedScale: scaleFactor,
            position: session.initialTransform.position,
            baseWidth: effectiveWidth,
            baseHeight: effectiveHeight,
            rotation: session.initialTransform.rotate,
            canvasSize: this.deps.scene.getCanvasSize(),
            snapThreshold
        });
        this.deps.preview.onSnapLinesChange?.(activeLines);
        this.deps.timeline.previewElements([
            {
                trackId: session.trackId,
                elementId: session.elementId,
                updates: {
                    params: buildParamsWithTransform({
                        params: session.initialParams,
                        transform: {
                            ...session.initialTransform,
                            scaleX: clampScaleNonZero(session.initialTransform.scaleX * snappedScale),
                            scaleY: clampScaleNonZero(session.initialTransform.scaleY * snappedScale)
                        }
                    }),
                    ...session.shouldClearScaleAnimation && {
                        animations: session.animationsWithoutScale
                    }
                }
            }
        ]);
    }
    previewEdgeScale({ session, position }) {
        const deltaX = position.x - session.initialBoundsCx;
        const deltaY = position.y - session.initialBoundsCy;
        const xProjection = deltaX * Math.cos(session.rotationRad) + deltaY * Math.sin(session.rotationRad);
        const yProjection = -deltaX * Math.sin(session.rotationRad) + deltaY * Math.cos(session.rotationRad);
        const projection = session.edge === "right" ? xProjection : session.edge === "left" ? -xProjection : yProjection;
        const baseAxisHalf = session.edge === "right" || session.edge === "left" ? session.baseWidth / 2 : session.baseHeight / 2;
        const proposedScale = clampScaleNonZero(projection / baseAxisHalf);
        const proposedScaleX = session.edge === "right" || session.edge === "left" ? proposedScale : session.initialTransform.scaleX;
        const proposedScaleY = session.edge === "bottom" ? proposedScale : session.initialTransform.scaleY;
        const snapThreshold = this.deps.viewport.screenPixelsToLogicalThreshold({
            screenPixels: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SNAP_THRESHOLD_SCREEN_PIXELS"]
        });
        const { x: xSnap, y: ySnap } = this.deps.input.isShiftHeld() ? {
            x: {
                snappedScale: proposedScaleX,
                snapDistance: Infinity,
                activeLines: []
            },
            y: {
                snappedScale: proposedScaleY,
                snapDistance: Infinity,
                activeLines: []
            }
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapScaleAxes"])({
            proposedScaleX,
            proposedScaleY,
            position: session.initialTransform.position,
            baseWidth: session.baseWidth,
            baseHeight: session.baseHeight,
            rotation: session.initialTransform.rotate,
            canvasSize: this.deps.scene.getCanvasSize(),
            snapThreshold,
            preferredEdges: getPreferredEdge({
                edge: session.edge
            })
        });
        const relevantSnap = session.edge === "right" || session.edge === "left" ? xSnap : ySnap;
        this.deps.preview.onSnapLinesChange?.(relevantSnap.activeLines);
        this.deps.timeline.previewElements([
            {
                trackId: session.trackId,
                elementId: session.elementId,
                updates: {
                    params: buildParamsWithTransform({
                        params: session.initialParams,
                        transform: {
                            ...session.initialTransform,
                            scaleX: session.edge === "right" || session.edge === "left" ? xSnap.snappedScale : session.initialTransform.scaleX,
                            scaleY: session.edge === "bottom" ? ySnap.snappedScale : session.initialTransform.scaleY
                        }
                    }),
                    ...session.shouldClearScaleAnimation && {
                        animations: session.animationsWithoutScale
                    }
                }
            }
        ]);
    }
    previewRotation({ session, position }) {
        const deltaX = position.x - session.initialBoundsCx;
        const deltaY = position.y - session.initialBoundsCy;
        const currentAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        let deltaAngle = currentAngle - session.initialAngle;
        if (deltaAngle > 180) deltaAngle -= 360;
        if (deltaAngle < -180) deltaAngle += 360;
        const newRotate = session.initialTransform.rotate + deltaAngle;
        const { snappedRotation } = this.deps.input.isShiftHeld() ? {
            snappedRotation: newRotate
        } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$preview$2d$snap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapRotation"])({
            proposedRotation: newRotate
        });
        this.deps.timeline.previewElements([
            {
                trackId: session.trackId,
                elementId: session.elementId,
                updates: {
                    params: buildParamsWithTransform({
                        params: session.initialParams,
                        transform: {
                            ...session.initialTransform,
                            rotate: snappedRotation
                        }
                    })
                }
            }
        ]);
    }
}
function buildParamsWithTransform({ params, transform }) {
    return {
        ...params,
        "transform.positionX": transform.position.x,
        "transform.positionY": transform.position.y,
        "transform.scaleX": transform.scaleX,
        "transform.scaleY": transform.scaleY,
        "transform.rotate": transform.rotate
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/hooks/use-transform-handles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useTransformHandles",
    ()=>useTransformHandles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$committed$2d$ref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-committed-ref.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-shift-key.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$cancel$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/cancel-interaction.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$transform$2d$handle$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/controllers/transform-handle-controller.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$transform$2d$handle$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$transform$2d$handle$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function useTransformHandles({ onSnapLinesChange }) {
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const isShiftHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$shift$2d$key$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShiftKey"])();
    const selectedElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.selection.getSelectedElements());
    const tracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.timeline.getPreviewTracks() ?? e.scenes.getActiveScene().tracks);
    const currentTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.playback.getCurrentTime());
    const mediaAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.media.getAssets());
    const canvasSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.project.getActive().settings.canvasSize);
    const deps = {
        viewport,
        input: {
            isShiftHeld: ()=>isShiftHeldRef.current
        },
        scene: {
            getSelectedElements: ()=>selectedElements,
            getTracks: ()=>tracks,
            getCurrentTime: ()=>currentTime,
            getMediaAssets: ()=>mediaAssets,
            getCanvasSize: ()=>canvasSize
        },
        timeline: {
            previewElements: (updates)=>editor.timeline.previewElements({
                    updates
                }),
            commitPreview: ()=>editor.timeline.commitPreview(),
            discardPreview: ()=>editor.timeline.discardPreview()
        },
        preview: {
            onSnapLinesChange
        }
    };
    const depsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$committed$2d$ref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(deps);
    const [controller] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$controllers$2f$transform$2d$handle$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransformHandleController"]({
            depsRef
        }));
    const [, rerender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])((n)=>n + 1, 0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>controller.subscribe(rerender), [
        controller
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!controller.isActive) return;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$cancel$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerCanceller"])({
            fn: ()=>controller.cancel()
        });
    }, [
        controller,
        controller.isActive
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>controller.destroy(), [
        controller
    ]);
    const selectedWithBounds = controller.selectedWithBounds;
    const hasVisualSelection = selectedWithBounds !== null;
    return {
        selectedWithBounds,
        hasVisualSelection,
        activeHandle: controller.activeHandle,
        handleCornerPointerDown: controller.onCornerPointerDown,
        handleEdgePointerDown: controller.onEdgePointerDown,
        handleRotationPointerDown: controller.onRotationPointerDown,
        handlePointerMove: controller.onPointerMove,
        handlePointerUp: controller.onPointerUp
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/components/handle-primitives.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BoundingBoxOutline",
    ()=>BoundingBoxOutline,
    "CanvasPathOutline",
    ()=>CanvasPathOutline,
    "CircleHandle",
    ()=>CircleHandle,
    "CornerHandle",
    ()=>CornerHandle,
    "EDGE_HANDLE_THICK_SIZE",
    ()=>EDGE_HANDLE_THICK_SIZE,
    "EDGE_HANDLE_THIN_SIZE",
    ()=>EDGE_HANDLE_THIN_SIZE,
    "EdgeHandle",
    ()=>EdgeHandle,
    "HANDLE_HIT_AREA_SIZE",
    ()=>HANDLE_HIT_AREA_SIZE,
    "HANDLE_SIZE",
    ()=>HANDLE_SIZE,
    "HandleButton",
    ()=>HandleButton,
    "ICON_HANDLE_RADIUS",
    ()=>ICON_HANDLE_RADIUS,
    "IconHandle",
    ()=>IconHandle,
    "LINE_HIT_AREA_SIZE",
    ()=>LINE_HIT_AREA_SIZE,
    "LineOverlay",
    ()=>LineOverlay,
    "ShapeOutline",
    ()=>ShapeOutline,
    "getResizeCursor",
    ()=>getResizeCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$ui$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/ui.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const HANDLE_SIZE = 10;
const HANDLE_HIT_AREA_SIZE = 18;
const ICON_HANDLE_RADIUS = 10;
const EDGE_HANDLE_THIN_SIZE = 6;
const EDGE_HANDLE_THICK_SIZE = 14;
const LINE_HIT_AREA_SIZE = 48;
function getResizeCursor({ angleDeg }) {
    const normalized = (angleDeg % 180 + 180) % 180;
    if (normalized < 22.5 || normalized >= 157.5) return "ew-resize";
    if (normalized < 67.5) return "nwse-resize";
    if (normalized < 112.5) return "ns-resize";
    return "nesw-resize";
}
function HandleButton({ screen, cursor, hitAreaSize, className, onPointerDown, onPointerMove, onPointerUp, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$ui$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute flex items-center justify-center outline-none", className),
        style: {
            left: screen.x - hitAreaSize / 2,
            top: screen.y - hitAreaSize / 2,
            width: hitAreaSize,
            height: hitAreaSize,
            pointerEvents: "auto",
            cursor
        },
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        onPointerLeave: onPointerUp,
        onKeyDown: (event)=>event.key === "Enter" && event.preventDefault(),
        onKeyUp: (event)=>event.key === "Enter" && event.preventDefault(),
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 42,
        columnNumber: 3
    }, this);
}
function CornerHandle({ cursor, screen, onPointerDown, onPointerMove, onPointerUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HandleButton, {
        screen: screen,
        cursor: cursor,
        hitAreaSize: HANDLE_HIT_AREA_SIZE,
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-sm bg-white",
            style: {
                width: HANDLE_SIZE,
                height: HANDLE_SIZE
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
            lineNumber: 90,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 82,
        columnNumber: 3
    }, this);
}
function CircleHandle({ cursor, screen, size = HANDLE_SIZE, isSelected = false, onPointerDown, onPointerMove, onPointerUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HandleButton, {
        screen: screen,
        cursor: cursor,
        hitAreaSize: HANDLE_HIT_AREA_SIZE,
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$ui$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-full", isSelected ? "bg-primary" : "bg-white"),
            style: {
                width: size,
                height: size
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
            lineNumber: 124,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 116,
        columnNumber: 3
    }, this);
}
function EdgeHandle({ edge, screen, rotation, onPointerDown, onPointerMove, onPointerUp }) {
    const isHorizontalEdge = edge === "right" || edge === "left";
    const width = isHorizontalEdge ? EDGE_HANDLE_THIN_SIZE : EDGE_HANDLE_THICK_SIZE;
    const height = isHorizontalEdge ? EDGE_HANDLE_THICK_SIZE : EDGE_HANDLE_THIN_SIZE;
    const cursor = getResizeCursor({
        angleDeg: isHorizontalEdge ? rotation : rotation + 90
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HandleButton, {
        screen: screen,
        cursor: cursor,
        hitAreaSize: HANDLE_HIT_AREA_SIZE,
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-sm bg-white",
            style: {
                width,
                height,
                transform: `rotate(${rotation}deg)`
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
            lineNumber: 167,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 159,
        columnNumber: 3
    }, this);
}
function IconHandle({ icon, screen, onPointerDown, onPointerMove, onPointerUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HandleButton, {
        screen: screen,
        hitAreaSize: ICON_HANDLE_RADIUS * 2,
        className: "rounded-full bg-white text-black shadow-sm",
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
            icon: icon,
            className: "size-3",
            strokeWidth: 2.5
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
            lineNumber: 197,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 189,
        columnNumber: 3
    }, this);
}
function BoundingBoxOutline({ center, outlineWidth, outlineHeight, rotation, cursor, dashed = false, onPointerDown, onPointerMove, onPointerUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "absolute overflow-visible",
        "aria-hidden": "true",
        focusable: "false",
        style: {
            left: center.x - outlineWidth / 2,
            top: center.y - outlineHeight / 2,
            width: outlineWidth,
            height: outlineHeight,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center center",
            pointerEvents: onPointerDown ? "auto" : "none",
            cursor
        },
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        onPointerLeave: onPointerUp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: 0.5,
            y: 0.5,
            width: Math.max(outlineWidth - 1, 0),
            height: Math.max(outlineHeight - 1, 0),
            fill: "transparent",
            stroke: "white",
            strokeDasharray: dashed ? "4 4" : undefined,
            strokeOpacity: 0.75,
            vectorEffect: "non-scaling-stroke",
            style: {
                pointerEvents: onPointerDown ? "all" : "none"
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
            lineNumber: 243,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 224,
        columnNumber: 3
    }, this);
}
function ShapeOutline({ center, outlineWidth, outlineHeight, rotation, pathData, cursor, onPointerDown, onPointerMove, onPointerUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "absolute overflow-visible",
        "aria-hidden": "true",
        focusable: "false",
        style: {
            left: center.x - outlineWidth / 2,
            top: center.y - outlineHeight / 2,
            width: outlineWidth,
            height: outlineHeight,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center center",
            pointerEvents: onPointerDown ? "auto" : "none",
            cursor
        },
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        onPointerLeave: onPointerUp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: pathData,
            fill: "transparent",
            stroke: "white",
            strokeOpacity: 0.75,
            vectorEffect: "non-scaling-stroke",
            style: {
                pointerEvents: onPointerDown ? "all" : "none"
            }
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
            lineNumber: 300,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 281,
        columnNumber: 3
    }, this);
}
function CanvasPathOutline({ pathData, translateX = 0, translateY = 0, scaleX = 1, scaleY = 1, cursor, strokeWidth = 1, strokeOpacity = 0.75, onPointerDown, onPointerMove, onPointerUp }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "absolute inset-0 overflow-visible",
        "aria-hidden": "true",
        focusable: "false",
        style: {
            pointerEvents: onPointerDown ? "auto" : "none",
            cursor
        },
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onPointerUp: onPointerUp,
        onPointerLeave: onPointerUp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
            transform: `translate(${translateX} ${translateY}) scale(${scaleX} ${scaleY})`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: pathData,
                fill: "transparent",
                stroke: "white",
                strokeWidth: strokeWidth,
                strokeOpacity: strokeOpacity,
                vectorEffect: "non-scaling-stroke",
                style: {
                    pointerEvents: onPointerDown ? "stroke" : "none"
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
                lineNumber: 354,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
            lineNumber: 351,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
        lineNumber: 338,
        columnNumber: 3
    }, this);
}
function LineOverlay({ start, end, cursor, onPointerDown, onPointerMove, onPointerUp }) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;
    const cx = (start.x + end.x) / 2;
    const cy = (start.y + end.y) / 2;
    const sharedStyle = {
        left: cx - length / 2,
        width: length,
        transform: `rotate(${angleDeg}deg)`,
        transformOrigin: "center center"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            onPointerDown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute",
                style: {
                    ...sharedStyle,
                    top: cy - LINE_HIT_AREA_SIZE / 2,
                    height: LINE_HIT_AREA_SIZE,
                    pointerEvents: "auto",
                    cursor
                },
                onPointerDown: onPointerDown,
                onPointerMove: onPointerMove,
                onPointerUp: onPointerUp,
                onPointerLeave: onPointerUp
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
                lineNumber: 400,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute",
                style: {
                    ...sharedStyle,
                    top: cy - 0.5,
                    height: 1,
                    backgroundColor: "white",
                    opacity: 0.75
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/handle-primitives.tsx",
                lineNumber: 415,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/apps/web/src/preview/components/transform-handles.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TransformHandles",
    ()=>TransformHandles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$transform$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/hooks/use-transform-handles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/element-bounds.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/handle-primitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Rotate01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rotate01Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/Rotate01Icon.js [app-ssr] (ecmascript) <export default as Rotate01Icon>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$transform$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$transform$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
;
;
const CORNERS = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right"
];
const EDGES = [
    "right",
    "left",
    "bottom"
];
function TransformHandles({ onSnapLinesChange }) {
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const { selectedWithBounds, hasVisualSelection, handleCornerPointerDown, handleEdgePointerDown, handleRotationPointerDown, handlePointerMove, handlePointerUp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$transform$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransformHandles"])({
        onSnapLinesChange
    });
    if (!hasVisualSelection || !selectedWithBounds) return null;
    const { bounds, element } = selectedWithBounds;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVisualElement"])(element)) return null;
    const displayScale = viewport.getDisplayScale();
    const toOverlay = ({ canvasX, canvasY })=>viewport.canvasToOverlay({
            canvasX,
            canvasY
        });
    const center = toOverlay({
        canvasX: bounds.cx,
        canvasY: bounds.cy
    });
    const outlineWidth = Math.abs(bounds.width) * displayScale.x;
    const outlineHeight = Math.abs(bounds.height) * displayScale.y;
    const rotationAngleRad = bounds.rotation * Math.PI / 180;
    const topCenterLocalY = -bounds.height / 2;
    const topCenterScreen = toOverlay({
        canvasX: bounds.cx - topCenterLocalY * Math.sin(rotationAngleRad),
        canvasY: bounds.cy + topCenterLocalY * Math.cos(rotationAngleRad)
    });
    const rotationHandleScreen = {
        x: topCenterScreen.x + Math.sin(rotationAngleRad) * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROTATION_HANDLE_OFFSET"],
        y: topCenterScreen.y - Math.cos(rotationAngleRad) * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROTATION_HANDLE_OFFSET"]
    };
    const onPointerMove = (event)=>handlePointerMove({
            event
        });
    const onPointerUp = ()=>handlePointerUp();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 overflow-hidden",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoundingBoxOutline"], {
                center: center,
                outlineWidth: outlineWidth,
                outlineHeight: outlineHeight,
                rotation: bounds.rotation
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/transform-handles.tsx",
                lineNumber: 90,
                columnNumber: 4
            }, this),
            CORNERS.map((corner)=>{
                const cornerPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCornerPosition"])({
                    bounds,
                    corner
                });
                const screen = toOverlay({
                    canvasX: cornerPosition.x,
                    canvasY: cornerPosition.y
                });
                const angleDeg = Math.atan2(screen.y - center.y, screen.x - center.x) * (180 / Math.PI);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CornerHandle"], {
                    cursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResizeCursor"])({
                        angleDeg
                    }),
                    screen: screen,
                    onPointerDown: (event)=>handleCornerPointerDown({
                            event,
                            corner
                        }),
                    onPointerMove: onPointerMove,
                    onPointerUp: onPointerUp
                }, corner, false, {
                    fileName: "[project]/apps/web/src/preview/components/transform-handles.tsx",
                    lineNumber: 106,
                    columnNumber: 6
                }, this);
            }),
            EDGES.map((edge)=>{
                const edgePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$element$2d$bounds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEdgeHandlePosition"])({
                    bounds,
                    edge
                });
                const screen = toOverlay({
                    canvasX: edgePosition.x,
                    canvasY: edgePosition.y
                });
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EdgeHandle"], {
                    edge: edge,
                    screen: screen,
                    rotation: bounds.rotation,
                    onPointerDown: (event)=>handleEdgePointerDown({
                            event,
                            edge
                        }),
                    onPointerMove: onPointerMove,
                    onPointerUp: onPointerUp
                }, edge, false, {
                    fileName: "[project]/apps/web/src/preview/components/transform-handles.tsx",
                    lineNumber: 125,
                    columnNumber: 6
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconHandle"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Rotate01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rotate01Icon$3e$__["Rotate01Icon"],
                screen: rotationHandleScreen,
                onPointerDown: (event)=>handleRotationPointerDown({
                        event
                    }),
                onPointerMove: onPointerMove,
                onPointerUp: onPointerUp
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/transform-handles.tsx",
                lineNumber: 136,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/transform-handles.tsx",
        lineNumber: 86,
        columnNumber: 3
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/components/mask-handles.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MaskHandles",
    ()=>MaskHandles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$cursors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/cursors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$use$2d$mask$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/use-mask-handles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/masks/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/handle-primitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Rotate01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rotate01Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/Rotate01Icon.js [app-ssr] (ecmascript) <export default as Rotate01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FeatherIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FeatherIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/FeatherIcon.js [app-ssr] (ecmascript) <export default as FeatherIcon>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$use$2d$mask$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$use$2d$mask$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
;
const CUSTOM_MASK_ANCHOR_SIZE = 7;
;
function MaskHandles({ onSnapLinesChange }) {
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const { selectedWithMask, handlePositions, overlays, isCreatingFreeformPathMask, handleCanvasPointerDown, handlePointerDown, handlePointerMove, handlePointerUp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$use$2d$mask$2d$handles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMaskHandles"])({
        onSnapLinesChange
    });
    if (!selectedWithMask) return null;
    const toOverlay = ({ canvasX, canvasY })=>viewport.canvasToOverlay({
            canvasX,
            canvasY
        });
    const { x: scaleX, y: scaleY } = viewport.getDisplayScale();
    const canvasOrigin = toOverlay({
        canvasX: 0,
        canvasY: 0
    });
    const onPointerMove = (event)=>{
        if (viewport.handlePanPointerMove({
            event
        })) {
            return;
        }
        handlePointerMove({
            event
        });
    };
    const onPointerUp = (event)=>{
        if (viewport.handlePanPointerUp({
            event
        })) {
            return;
        }
        handlePointerUp();
    };
    const handleMaskPointerDown = ({ event, handleId })=>{
        if (viewport.handlePanPointerDown({
            event
        })) {
            return;
        }
        handlePointerDown({
            event,
            handleId
        });
    };
    const handleCanvasOverlayPointerDown = (event)=>{
        if (viewport.handlePanPointerDown({
            event
        })) {
            return;
        }
        handleCanvasPointerDown({
            event
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0 overflow-hidden",
        "aria-hidden": true,
        children: [
            isCreatingFreeformPathMask ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-auto",
                style: {
                    cursor: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$cursors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PEN_CURSOR"]
                },
                onPointerDown: handleCanvasOverlayPointerDown,
                onPointerMove: onPointerMove,
                onPointerUp: onPointerUp,
                onPointerCancel: onPointerUp
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                lineNumber: 97,
                columnNumber: 5
            }, this) : null,
            overlays.map((overlay)=>{
                const overlayHandleId = overlay.handleId;
                const pointerHandlers = overlayHandleId ? {
                    onPointerDown: (event)=>handleMaskPointerDown({
                            event,
                            handleId: overlayHandleId
                        }),
                    onPointerMove,
                    onPointerUp
                } : {};
                if (overlay.type === "line") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineOverlay"], {
                        cursor: overlay.cursor,
                        start: toOverlay({
                            canvasX: overlay.start.x,
                            canvasY: overlay.start.y
                        }),
                        end: toOverlay({
                            canvasX: overlay.end.x,
                            canvasY: overlay.end.y
                        }),
                        ...pointerHandlers
                    }, overlay.id, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 119,
                        columnNumber: 7
                    }, this);
                }
                if (overlay.type === "rect") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoundingBoxOutline"], {
                        center: toOverlay({
                            canvasX: overlay.center.x,
                            canvasY: overlay.center.y
                        }),
                        outlineWidth: overlay.width * scaleX,
                        outlineHeight: overlay.height * scaleY,
                        rotation: overlay.rotation,
                        cursor: overlay.cursor,
                        dashed: overlay.dashed,
                        ...pointerHandlers
                    }, overlay.id, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 137,
                        columnNumber: 7
                    }, this);
                }
                if (overlay.type === "shape") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ShapeOutline"], {
                        center: toOverlay({
                            canvasX: overlay.center.x,
                            canvasY: overlay.center.y
                        }),
                        outlineWidth: overlay.width * scaleX,
                        outlineHeight: overlay.height * scaleY,
                        rotation: overlay.rotation,
                        pathData: overlay.pathData,
                        cursor: overlay.cursor,
                        ...pointerHandlers
                    }, overlay.id, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 155,
                        columnNumber: 7
                    }, this);
                }
                if (overlay.type === "canvas-path") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasPathOutline"], {
                        pathData: overlay.pathData,
                        translateX: overlay.coordinateSpace === "canvas" ? canvasOrigin.x : 0,
                        translateY: overlay.coordinateSpace === "canvas" ? canvasOrigin.y : 0,
                        scaleX: overlay.coordinateSpace === "canvas" ? scaleX : 1,
                        scaleY: overlay.coordinateSpace === "canvas" ? scaleY : 1,
                        cursor: overlay.cursor,
                        strokeWidth: overlay.strokeWidth,
                        strokeOpacity: overlay.strokeOpacity,
                        ...pointerHandlers
                    }, overlay.id, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 173,
                        columnNumber: 7
                    }, this);
                }
                return null;
            }),
            handlePositions.map((handle)=>{
                const screen = toOverlay({
                    canvasX: handle.x,
                    canvasY: handle.y
                });
                const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$masks$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["maskHandleIdKey"])({
                    id: handle.id
                });
                if (handle.kind === "icon" && handle.icon === "rotate") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconHandle"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Rotate01Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rotate01Icon$3e$__["Rotate01Icon"],
                        screen: screen,
                        onPointerDown: (event)=>handleMaskPointerDown({
                                event,
                                handleId: handle.id
                            }),
                        onPointerMove: onPointerMove,
                        onPointerUp: onPointerUp
                    }, key, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 200,
                        columnNumber: 7
                    }, this);
                }
                if (handle.kind === "icon" && handle.icon === "feather") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconHandle"], {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FeatherIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FeatherIcon$3e$__["FeatherIcon"],
                        screen: screen,
                        onPointerDown: (event)=>handleMaskPointerDown({
                                event,
                                handleId: handle.id
                            }),
                        onPointerMove: onPointerMove,
                        onPointerUp: onPointerUp
                    }, key, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 215,
                        columnNumber: 7
                    }, this);
                }
                if (handle.kind === "edge" && handle.edgeAxis === "horizontal") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EdgeHandle"], {
                        edge: "right",
                        screen: screen,
                        rotation: handle.rotation ?? 0,
                        onPointerDown: (event)=>handleMaskPointerDown({
                                event,
                                handleId: handle.id
                            }),
                        onPointerMove: onPointerMove,
                        onPointerUp: onPointerUp
                    }, key, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 230,
                        columnNumber: 7
                    }, this);
                }
                if (handle.kind === "edge" && handle.edgeAxis === "vertical") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EdgeHandle"], {
                        edge: "bottom",
                        screen: screen,
                        rotation: handle.rotation ?? 0,
                        onPointerDown: (event)=>handleMaskPointerDown({
                                event,
                                handleId: handle.id
                            }),
                        onPointerMove: onPointerMove,
                        onPointerUp: onPointerUp
                    }, key, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 246,
                        columnNumber: 7
                    }, this);
                }
                if (handle.kind === "point") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CircleHandle"], {
                        screen: screen,
                        size: CUSTOM_MASK_ANCHOR_SIZE,
                        isSelected: handle.isSelected,
                        onPointerDown: (event)=>handleMaskPointerDown({
                                event,
                                handleId: handle.id
                            }),
                        onPointerMove: onPointerMove,
                        onPointerUp: onPointerUp
                    }, key, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 262,
                        columnNumber: 6
                    }, this);
                }
                if (handle.kind === "corner") {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CornerHandle"], {
                        screen: screen,
                        onPointerDown: (event)=>handleMaskPointerDown({
                                event,
                                handleId: handle.id
                            }),
                        onPointerMove: onPointerMove,
                        onPointerUp: onPointerUp
                    }, key, false, {
                        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                        lineNumber: 278,
                        columnNumber: 7
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$handle$2d$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CornerHandle"], {
                    cursor: handle.cursor,
                    screen: screen,
                    onPointerDown: (event)=>handleMaskPointerDown({
                            event,
                            handleId: handle.id
                        }),
                    onPointerMove: onPointerMove,
                    onPointerUp: onPointerUp
                }, key, false, {
                    fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
                    lineNumber: 291,
                    columnNumber: 6
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/mask-handles.tsx",
        lineNumber: 92,
        columnNumber: 3
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/components/snap-guides.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SnapGuides",
    ()=>SnapGuides
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function SnapGuides({ lines }) {
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    if (lines.length === 0) {
        return null;
    }
    const toOverlayX = (logicalX)=>viewport.positionToOverlay({
            positionX: logicalX,
            positionY: 0
        }).x;
    const toOverlayY = (logicalY)=>viewport.positionToOverlay({
            positionX: 0,
            positionY: logicalY
        }).y;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0",
        "aria-hidden": true,
        children: lines.map((line)=>{
            if (line.type === "vertical") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 bottom-0 w-px bg-white/70",
                    style: {
                        left: toOverlayX(line.position)
                    }
                }, `vertical-${line.position}`, false, {
                    fileName: "[project]/apps/web/src/preview/components/snap-guides.tsx",
                    lineNumber: 30,
                    columnNumber: 7
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 right-0 h-px bg-white/70",
                style: {
                    top: toOverlayY(line.position)
                }
            }, `horizontal-${line.position}`, false, {
                fileName: "[project]/apps/web/src/preview/components/snap-guides.tsx",
                lineNumber: 38,
                columnNumber: 6
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/snap-guides.tsx",
        lineNumber: 26,
        columnNumber: 3
    }, this);
}
}),
"[project]/apps/web/src/preview/components/text-edit-overlay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TextEditOverlay",
    ()=>TextEditOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/animation-values.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/rendering/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/primitives.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/measure-element.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function TextEditOverlay({ trackId, elementId, element, onCommit }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const divRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const div = divRef.current;
        if (!div) return;
        div.focus();
        const range = document.createRange();
        range.selectNodeContents(div);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
    }, []);
    const handleInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const div = divRef.current;
        if (!div) return;
        const text = div.innerText;
        editor.timeline.previewElements({
            updates: [
                {
                    trackId,
                    elementId,
                    updates: {
                        params: {
                            content: text
                        }
                    }
                }
            ]
        });
    }, [
        editor.timeline,
        trackId,
        elementId
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ event })=>{
        const { key } = event;
        if (key === "Escape") {
            event.preventDefault();
            onCommit();
            return;
        }
    }, [
        onCommit
    ]);
    const canvasSize = editor.project.getActive().settings.canvasSize;
    if (!canvasSize) return null;
    const currentTime = editor.playback.getCurrentTime();
    const localTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getElementLocalTime"])({
        timelineTime: currentTime,
        elementStartTime: element.startTime,
        elementDuration: element.duration
    });
    const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$animation$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTransformAtTime"])({
        baseTransform: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$rendering$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformFromParams"])({
            params: element.params
        }),
        animations: element.animations,
        localTime
    });
    const { x: posX, y: posY } = viewport.positionToOverlay({
        positionX: transform.position.x,
        positionY: transform.position.y
    });
    const { x: displayScaleX } = viewport.getDisplayScale();
    const textParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTextLayoutParamsFromElement"])({
        element
    });
    const resolvedTextLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTextLayout"])({
        text: textParams,
        canvasHeight: canvasSize.height
    });
    const lineHeight = textParams.lineHeight ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULTS"].text.lineHeight;
    const canvasLetterSpacing = textParams.letterSpacing ?? 0;
    const lineHeightPx = resolvedTextLayout.lineHeightPx;
    const bg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$measure$2d$element$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTextBackgroundFromElement"])({
        element
    });
    const shouldShowBackground = bg.enabled && bg.color && bg.color !== "transparent";
    const fontSizeRatio = resolvedTextLayout.fontSizeRatio;
    const canvasPaddingX = shouldShowBackground ? (bg.paddingX ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingX) * fontSizeRatio : 0;
    const canvasPaddingY = shouldShowBackground ? (bg.paddingY ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingY) * fontSizeRatio : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute",
        style: {
            left: posX,
            top: posY,
            transform: `translate(-50%, -50%) scale(${transform.scaleX * displayScaleX}, ${transform.scaleY * displayScaleX}) rotate(${transform.rotate}deg)`,
            transformOrigin: "center center"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: divRef,
            contentEditable: true,
            suppressContentEditableWarning: true,
            tabIndex: 0,
            role: "textbox",
            "aria-label": "Edit text",
            className: "cursor-text select-text outline-none whitespace-pre",
            style: {
                fontSize: resolvedTextLayout.scaledFontSize,
                fontFamily: textParams.fontFamily,
                fontWeight: textParams.fontWeight === "bold" ? "bold" : "normal",
                fontStyle: textParams.fontStyle === "italic" ? "italic" : "normal",
                textAlign: textParams.textAlign,
                letterSpacing: `${canvasLetterSpacing}px`,
                lineHeight,
                color: "transparent",
                caretColor: typeof element.params.color === "string" ? element.params.color : "#ffffff",
                backgroundColor: shouldShowBackground ? bg.color : "transparent",
                minHeight: lineHeightPx,
                textDecoration: textParams.textDecoration ?? "none",
                padding: shouldShowBackground ? `${canvasPaddingY}px ${canvasPaddingX}px` : 0,
                minWidth: 1
            },
            onInput: handleInput,
            onBlur: onCommit,
            onKeyDown: (event)=>handleKeyDown({
                    event
                }),
            children: textParams.content
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/text-edit-overlay.tsx",
            lineNumber: 119,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/text-edit-overlay.tsx",
        lineNumber: 110,
        columnNumber: 3
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PreviewInteractionOverlay",
    ()=>PreviewInteractionOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$preview$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/hooks/use-preview-interaction.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$transform$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/transform-handles.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$mask$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/mask-handles.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$snap$2d$guides$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/snap-guides.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$text$2d$edit$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/text-edit-overlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editor$2f$panels$2f$properties$2f$stores$2f$properties$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/editor/panels/properties/stores/properties-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$preview$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$transform$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$mask$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$text$2d$edit$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$preview$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$transform$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$mask$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$text$2d$edit$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function PreviewInteractionOverlay() {
    const [snapLines, setSnapLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const selectedElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.selection.getSelectedElements());
    const activeTabPerType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editor$2f$panels$2f$properties$2f$stores$2f$properties$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePropertiesStore"])((s)=>s.activeTabPerType);
    const selectedRef = selectedElements.length === 1 ? selectedElements[0] : null;
    const activeTrack = selectedRef ? editor.timeline.getTrackById({
        trackId: selectedRef.trackId
    }) : null;
    const activeElement = activeTrack?.elements.find((element)=>element.id === selectedRef?.elementId) ?? null;
    const isMaskMode = activeElement ? activeTabPerType[activeElement.type] === "masks" : false;
    const { onPointerDown, onPointerMove, onPointerUp, onDoubleClick, editingText, commitTextEdit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$hooks$2f$use$2d$preview$2d$interaction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewInteraction"])({
        onSnapLinesChange: setSnapLines,
        isMaskMode
    });
    const handlePointerDown = (event)=>{
        if (viewport.handlePanPointerDown({
            event
        })) {
            return;
        }
        onPointerDown(event);
    };
    const handlePointerMove = (event)=>{
        if (viewport.handlePanPointerMove({
            event
        })) {
            return;
        }
        onPointerMove(event);
    };
    const handlePointerUp = (event)=>{
        if (viewport.handlePanPointerUp({
            event
        })) {
            return;
        }
        onPointerUp(event);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-auto",
                role: "application",
                "aria-label": "Preview canvas",
                style: {
                    cursor: viewport.isPanning ? "grabbing" : viewport.canPan ? "default" : undefined
                },
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp: handlePointerUp,
                onPointerCancel: handlePointerUp,
                onDoubleClick: onDoubleClick,
                onDragStart: (e)=>e.preventDefault()
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx",
                lineNumber: 70,
                columnNumber: 4
            }, this),
            editingText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$text$2d$edit$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextEditOverlay"], {
                trackId: editingText.trackId,
                elementId: editingText.elementId,
                element: editingText.element,
                onCommit: commitTextEdit
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx",
                lineNumber: 89,
                columnNumber: 5
            }, this) : isMaskMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$mask$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MaskHandles"], {
                onSnapLinesChange: setSnapLines
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx",
                lineNumber: 96,
                columnNumber: 5
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$transform$2d$handles$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransformHandles"], {
                onSnapLinesChange: setSnapLines
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx",
                lineNumber: 98,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$snap$2d$guides$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SnapGuides"], {
                lines: snapLines
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx",
                lineNumber: 100,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx",
        lineNumber: 69,
        columnNumber: 3
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/components/context-menu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PreviewContextMenu",
    ()=>PreviewContextMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/context-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/sonner@1.7.4+21ccd8898788a04d/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
function PreviewContextMenu({ onToggleFullscreen, container, overlayControls, onOverlayVisibilityChange }) {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const handleCopySnapshot = async ()=>{
        const result = await editor.renderer.copySnapshot();
        if (!result.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to copy snapshot", {
                description: result.error ?? "Please try again"
            });
            return;
        }
    };
    const handleSaveSnapshot = async ()=>{
        const result = await editor.renderer.saveSnapshot();
        if (!result.success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$sonner$40$1$2e$7$2e$4$2b$21ccd8898788a04d$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to save snapshot", {
                description: result.error ?? "Please try again"
            });
            return;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuContent"], {
        className: "w-56",
        container: container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuItem"], {
                onClick: viewport.fitToScreen,
                inset: true,
                children: "Fit to screen"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
                lineNumber: 55,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuSeparator"], {}, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
                lineNumber: 58,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuItem"], {
                onClick: onToggleFullscreen,
                inset: true,
                children: "Full screen"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
                lineNumber: 59,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuItem"], {
                onClick: handleSaveSnapshot,
                inset: true,
                children: "Save snapshot"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
                lineNumber: 62,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuItem"], {
                onClick: handleCopySnapshot,
                inset: true,
                children: "Copy snapshot"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
                lineNumber: 65,
                columnNumber: 4
            }, this),
            overlayControls.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuSeparator"], {}, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
                lineNumber: 68,
                columnNumber: 34
            }, this) : null,
            overlayControls.map((overlayControl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuCheckboxItem"], {
                    checked: overlayControl.isVisible,
                    onCheckedChange: (checked)=>onOverlayVisibilityChange({
                            overlayId: overlayControl.id,
                            isVisible: !!checked
                        }),
                    children: overlayControl.label
                }, overlayControl.id, false, {
                    fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
                    lineNumber: 70,
                    columnNumber: 5
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/context-menu.tsx",
        lineNumber: 54,
        columnNumber: 3
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/components/toolbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PreviewToolbar",
    ()=>PreviewToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm_bg.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/actions/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editable$2d$timecode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/editable-timecode.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FullScreenIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FullScreenIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/FullScreenIcon.js [app-ssr] (ecmascript) <export default as FullScreenIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PauseIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/PauseIcon.js [app-ssr] (ecmascript) <export default as PauseIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PlayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/PlayIcon.js [app-ssr] (ecmascript) <export default as PlayIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/separator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$zoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/zoom.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editable$2d$timecode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editable$2d$timecode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function PreviewToolbar({ onToggleFullscreen }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-[1fr_auto_1fr] items-center pb-3 pt-5 px-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TimecodeDisplay, {}, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 36,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayPauseButton, {}, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 37,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "justify-self-end flex items-center gap-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ZoomSelect, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                        lineNumber: 39,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
                        orientation: "vertical",
                        className: "h-4"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                        lineNumber: 40,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "text",
                        onClick: onToggleFullscreen,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$FullScreenIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FullScreenIcon$3e$__["FullScreenIcon"]
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                            lineNumber: 55,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                        lineNumber: 54,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 38,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, this);
}
function TimecodeDisplay() {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const totalDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.timeline.getTotalDuration());
    const fps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.project.getActive().settings.fps);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>editor.playback.getCurrentTime());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const unsubscribeUpdate = editor.playback.onUpdate(setCurrentTime);
        const unsubscribeSeek = editor.playback.onSeek(setCurrentTime);
        return ()=>{
            unsubscribeUpdate();
            unsubscribeSeek();
        };
    }, [
        editor.playback
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$editable$2d$timecode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditableTimecode"], {
                time: currentTime,
                duration: totalDuration,
                format: "HH:MM:SS:FF",
                fps: fps,
                onTimeChange: ({ time })=>editor.playback.seek({
                        time
                    }),
                className: "text-center"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 81,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted-foreground px-2 font-mono text-xs",
                children: "/"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 89,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted-foreground font-mono text-xs",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTimecode"])({
                    time: totalDuration,
                    format: "HH:MM:SS:FF",
                    rate: fps
                })
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 90,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
        lineNumber: 80,
        columnNumber: 3
    }, this);
}
function ZoomSelect() {
    const { isAtFit, zoomPercent, fitToScreen, setViewportPercent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewport"])();
    const displayLabel = isAtFit ? "Fit" : `${zoomPercent}%`;
    const onValueChange = (value)=>{
        if (value === "fit") {
            fitToScreen();
        } else {
            setViewportPercent({
                percent: Number(value)
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
        value: isAtFit ? "fit" : String(zoomPercent),
        onValueChange: onValueChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                className: "tabular-nums",
                children: displayLabel
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 120,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                        value: "fit",
                        children: "Fit"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                        lineNumber: 122,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectSeparator"], {}, void 0, false, {
                        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                        lineNumber: 123,
                        columnNumber: 5
                    }, this),
                    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$zoom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PREVIEW_ZOOM_PRESETS"].map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: String(preset),
                            children: [
                                preset,
                                "%"
                            ]
                        }, preset, true, {
                            fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                            lineNumber: 125,
                            columnNumber: 6
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
                lineNumber: 121,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
        lineNumber: 116,
        columnNumber: 3
    }, this);
}
function PlayPauseButton() {
    const isPlaying = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.playback.getIsPlaying());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        variant: "text",
        size: "icon",
        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invokeAction"])("toggle-play"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
            icon: isPlaying ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PauseIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseIcon$3e$__["PauseIcon"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$PlayIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayIcon$3e$__["PlayIcon"]
        }, void 0, false, {
            fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
            lineNumber: 143,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/toolbar.tsx",
        lineNumber: 138,
        columnNumber: 3
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/components/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PreviewPanel",
    ()=>PreviewPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$use$2d$deep$2d$compare$2d$effect$40$1$2e$8$2e$1$2b$3f10a4be4e334a9b$2f$node_modules$2f$use$2d$deep$2d$compare$2d$effect$2f$dist$2f$use$2d$deep$2d$compare$2d$effect$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/use-deep-compare-effect@1.8.1+3f10a4be4e334a9b/node_modules/use-deep-compare-effect/dist/use-deep-compare-effect.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$raf$2d$loop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-raf-loop.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$container$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-container-size.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$fullscreen$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/hooks/use-fullscreen.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/canvas-renderer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/renderer/scene-builder.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$overlay$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/overlay-layer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$interaction$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-interaction-overlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/context-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/context-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$toolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/toolbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/preview/components/preview-viewport.tsx [app-ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$interaction$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$toolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$interaction$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$toolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
function usePreviewSize() {
    const canvasSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.project.getActive()?.settings.canvasSize);
    return {
        width: canvasSize?.width,
        height: canvasSize?.height
    };
}
function normalizeWheelDelta({ delta, deltaMode, pageSize }) {
    if (deltaMode === WheelEvent.DOM_DELTA_LINE) {
        return delta * 16;
    }
    if (deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return delta * pageSize;
    }
    return delta;
}
function PreviewPanel({ overlayControls, overlayInstances, onOverlayVisibilityChange }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [container, setContainer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toggleFullscreen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$fullscreen$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFullscreen"])({
        containerRef
    });
    const handleContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((node)=>{
        containerRef.current = node;
        setContainer(node);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: handleContainerRef,
        className: "panel bg-background relative flex size-full min-h-0 min-w-0 flex-col rounded-sm border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewCanvas, {
                container: container,
                onToggleFullscreen: toggleFullscreen,
                overlayControls: overlayControls,
                overlayInstances: overlayInstances,
                onOverlayVisibilityChange: onOverlayVisibilityChange
            }, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/index.tsx",
                lineNumber: 83,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RenderTreeController, {}, void 0, false, {
                fileName: "[project]/apps/web/src/preview/components/index.tsx",
                lineNumber: 90,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/preview/components/index.tsx",
        lineNumber: 79,
        columnNumber: 3
    }, this);
}
function RenderTreeController() {
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const tracks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.timeline.getPreviewTracks() ?? e.scenes.getActiveScene().tracks);
    const mediaAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.media.getAssets());
    const activeProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.project.getActive());
    const { width, height } = usePreviewSize();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$use$2d$deep$2d$compare$2d$effect$40$1$2e$8$2e$1$2b$3f10a4be4e334a9b$2f$node_modules$2f$use$2d$deep$2d$compare$2d$effect$2f$dist$2f$use$2d$deep$2d$compare$2d$effect$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(()=>{
        if (!activeProject) return;
        const duration = editor.timeline.getTotalDuration();
        const renderTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$scene$2d$builder$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildScene"])({
            tracks,
            mediaAssets,
            duration,
            canvasSize: {
                width,
                height
            },
            background: activeProject.settings.background,
            isPreview: true
        });
        editor.renderer.setRenderTree({
            renderTree
        });
    }, [
        tracks,
        mediaAssets,
        activeProject?.settings.background,
        width,
        height
    ]);
    return null;
}
function PreviewCanvas({ container, onToggleFullscreen, overlayControls, overlayInstances, onOverlayVisibilityChange }) {
    const canvasMountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const viewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(-1);
    const lastSceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renderingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const { width: nativeWidth, height: nativeHeight } = usePreviewSize();
    const viewportSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$container$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContainerSize"])({
        containerRef: viewportRef
    });
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])();
    const activeProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.project.getActive());
    const renderTree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEditor"])((e)=>e.renderer.getRenderTree());
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePreviewViewportState"])({
        canvasHeight: nativeHeight,
        canvasWidth: nativeWidth,
        viewportHeight: viewportSize.height,
        viewportRef,
        viewportWidth: viewportSize.width
    });
    const { canPan, panByScreenDelta, scaleZoom } = viewport;
    const renderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$renderer$2f$canvas$2d$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasRenderer"]({
            width: nativeWidth,
            height: nativeHeight,
            fps: activeProject.settings.fps
        });
    }, [
        nativeWidth,
        nativeHeight,
        activeProject.settings.fps
    ]);
    // Mount the compositor's output canvas directly into the preview. wgpu
    // renders straight into this element, so there is no intermediate copy —
    // the container div owns positioning/styling, the canvas itself fills it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const mount = canvasMountRef.current;
        if (!mount) return;
        const outputCanvas = renderer.getOutputCanvas();
        outputCanvas.style.display = "block";
        outputCanvas.style.width = "100%";
        outputCanvas.style.height = "100%";
        mount.appendChild(outputCanvas);
        return ()=>{
            if (outputCanvas.parentElement === mount) {
                mount.removeChild(outputCanvas);
            }
        };
    }, [
        renderer
    ]);
    const render = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!renderTree || renderingRef.current) return;
        const renderTime = Math.min(editor.playback.getCurrentTime(), editor.timeline.getLastFrameTime());
        const ticksPerFrame = Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"] * renderer.fps.denominator / renderer.fps.numerator);
        const frame = Math.floor(renderTime / ticksPerFrame);
        if (frame === lastFrameRef.current && renderTree === lastSceneRef.current) {
            return;
        }
        renderingRef.current = true;
        lastSceneRef.current = renderTree;
        lastFrameRef.current = frame;
        renderer.render({
            node: renderTree,
            time: renderTime
        }).then(()=>{
            renderingRef.current = false;
        });
    }, [
        renderer,
        renderTree,
        editor.playback,
        editor.timeline
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$hooks$2f$use$2d$raf$2d$loop$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRafLoop"])(render);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = viewportRef.current;
        if (!container) return;
        let pendingZoomDelta = 0;
        let pendingPanDeltaX = 0;
        let pendingPanDeltaY = 0;
        let zoomRafId = null;
        let panRafId = null;
        const onWheel = (event)=>{
            const normalizedDeltaX = normalizeWheelDelta({
                delta: event.deltaX,
                deltaMode: event.deltaMode,
                pageSize: container.clientWidth
            });
            const normalizedDeltaY = normalizeWheelDelta({
                delta: event.deltaY,
                deltaMode: event.deltaMode,
                pageSize: container.clientHeight
            });
            const isZoomGesture = event.ctrlKey || event.metaKey;
            if (isZoomGesture) {
                event.preventDefault();
                pendingZoomDelta += normalizedDeltaY;
                if (zoomRafId === null) {
                    zoomRafId = requestAnimationFrame(()=>{
                        const cappedDelta = Math.sign(pendingZoomDelta) * Math.min(Math.abs(pendingZoomDelta), 30);
                        const zoomFactor = Math.exp(-cappedDelta / 300);
                        scaleZoom({
                            factor: zoomFactor
                        });
                        pendingZoomDelta = 0;
                        zoomRafId = null;
                    });
                }
                return;
            }
            if (!canPan) {
                return;
            }
            if (normalizedDeltaX === 0 && normalizedDeltaY === 0) {
                return;
            }
            event.preventDefault();
            pendingPanDeltaX += normalizedDeltaX;
            pendingPanDeltaY += normalizedDeltaY;
            if (panRafId === null) {
                panRafId = requestAnimationFrame(()=>{
                    panByScreenDelta({
                        deltaX: pendingPanDeltaX,
                        deltaY: pendingPanDeltaY
                    });
                    pendingPanDeltaX = 0;
                    pendingPanDeltaY = 0;
                    panRafId = null;
                });
            }
        };
        container.addEventListener("wheel", onWheel, {
            capture: true,
            passive: false
        });
        return ()=>{
            container.removeEventListener("wheel", onWheel, {
                capture: true
            });
            if (zoomRafId !== null) {
                cancelAnimationFrame(zoomRafId);
            }
            if (panRafId !== null) {
                cancelAnimationFrame(panRafId);
            }
        };
    }, [
        canPan,
        panByScreenDelta,
        scaleZoom
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$viewport$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewViewportProvider"], {
        value: viewport,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex size-full min-h-0 min-w-0 flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-0 min-w-0 flex-1 p-2 pb-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenu"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContextMenuTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: viewportRef,
                                    className: "relative flex size-full min-h-0 min-w-0 items-center justify-center overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: canvasMountRef,
                                            className: "absolute block border",
                                            style: {
                                                left: viewport.sceneLeft,
                                                top: viewport.sceneTop,
                                                width: viewport.sceneWidth,
                                                height: viewport.sceneHeight,
                                                background: activeProject.settings.background.type === "blur" ? "transparent" : activeProject?.settings.background.color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/preview/components/index.tsx",
                                            lineNumber: 311,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$overlay$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewOverlayLayer"], {
                                            instances: overlayInstances,
                                            plane: "under-interaction"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/preview/components/index.tsx",
                                            lineNumber: 325,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$preview$2d$interaction$2d$overlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewInteractionOverlay"], {}, void 0, false, {
                                            fileName: "[project]/apps/web/src/preview/components/index.tsx",
                                            lineNumber: 329,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$overlay$2d$layer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewOverlayLayer"], {
                                            instances: overlayInstances,
                                            plane: "over-interaction"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/preview/components/index.tsx",
                                            lineNumber: 330,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/preview/components/index.tsx",
                                    lineNumber: 307,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/preview/components/index.tsx",
                                lineNumber: 306,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewContextMenu"], {
                                onToggleFullscreen: onToggleFullscreen,
                                container: container,
                                overlayControls: overlayControls,
                                onOverlayVisibilityChange: onOverlayVisibilityChange
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/preview/components/index.tsx",
                                lineNumber: 336,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/preview/components/index.tsx",
                        lineNumber: 305,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/preview/components/index.tsx",
                    lineNumber: 304,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$preview$2f$components$2f$toolbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewToolbar"], {
                    onToggleFullscreen: onToggleFullscreen
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/preview/components/index.tsx",
                    lineNumber: 344,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/preview/components/index.tsx",
            lineNumber: 303,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/preview/components/index.tsx",
        lineNumber: 302,
        columnNumber: 3
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/preview/preview-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePreviewStore",
    ()=>usePreviewStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/zustand@5.0.12+5e3d5174673d7dcb/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/zustand@5.0.12+5e3d5174673d7dcb/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$guides$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/guides/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$guides$2f$registry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/guides/registry.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$guides$2f$grid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/guides/grid.ts [app-ssr] (ecmascript)");
;
;
;
;
const DEFAULT_PREVIEW_OVERLAYS = {};
function getPersistedActiveGuide(state) {
    const persistedGuide = state?.activeGuide ?? state?.layoutGuide?.platform ?? null;
    if (typeof persistedGuide !== "string") {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$guides$2f$registry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isGuideId"])(persistedGuide) ? persistedGuide : null;
}
const usePreviewStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        activeGuide: null,
        overlays: DEFAULT_PREVIEW_OVERLAYS,
        gridConfig: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$guides$2f$grid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_GRID_CONFIG"],
        toggleGuide: (guideId)=>{
            set((state)=>({
                    activeGuide: state.activeGuide === guideId ? null : guideId
                }));
        },
        setGridConfig: (config)=>{
            set((state)=>({
                    gridConfig: {
                        ...state.gridConfig,
                        ...config
                    }
                }));
        },
        setOverlayVisibility: ({ overlayId, isVisible })=>{
            set((state)=>({
                    overlays: {
                        ...state.overlays,
                        [overlayId]: isVisible
                    }
                }));
        },
        toggleOverlayVisibility: ({ overlayId })=>{
            set((state)=>({
                    overlays: {
                        ...state.overlays,
                        [overlayId]: !state.overlays[overlayId]
                    }
                }));
        }
    }), {
    name: "preview-settings",
    version: 6,
    migrate: (persistedState)=>{
        const state = persistedState;
        return {
            activeGuide: getPersistedActiveGuide(state),
            overlays: DEFAULT_PREVIEW_OVERLAYS,
            gridConfig: {
                rows: state?.gridConfig?.rows ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$guides$2f$grid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_GRID_CONFIG"].rows,
                cols: state?.gridConfig?.cols ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$guides$2f$grid$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_GRID_CONFIG"].cols
            }
        };
    },
    partialize: (state)=>({
            activeGuide: state.activeGuide,
            overlays: state.overlays,
            gridConfig: state.gridConfig
        })
}));
}),
];

//# sourceMappingURL=apps_web_src_preview_9be3e2e9._.js.map