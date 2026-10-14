(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/utils/ui.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/browser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadBlob",
    ()=>downloadBlob,
    "findScrollParent",
    ()=>findScrollParent,
    "isTypableDOMElement",
    ()=>isTypableDOMElement
]);
function downloadBlob({ blob, filename }) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}
function findScrollParent({ element }) {
    let parent = element.parentElement;
    while(parent){
        const { overflow, overflowX } = window.getComputedStyle(parent);
        if (/auto|scroll/.test(overflow + overflowX)) return parent;
        parent = parent.parentElement;
    }
    return null;
}
function isTypableDOMElement({ element }) {
    if (element.isContentEditable) return true;
    if (element.tagName === "INPUT") {
        return !element.disabled;
    }
    if (element.tagName === "TEXTAREA") {
        return !element.disabled;
    }
    return false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/platform.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPlatformAlternateKey",
    ()=>getPlatformAlternateKey,
    "getPlatformSpecialKey",
    ()=>getPlatformSpecialKey,
    "isAppleDevice",
    ()=>isAppleDevice
]);
function getPlatformSpecialKey() {
    return isAppleDevice() ? "⌘" : "Ctrl";
}
function getPlatformAlternateKey() {
    return isAppleDevice() ? "⌥" : "Alt";
}
function isAppleDevice() {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/id.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateUUID",
    ()=>generateUUID
]);
function generateUUID() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = bytes[6] & 0x0f | 0x40;
    bytes[8] = bytes[8] & 0x3f | 0x80;
    const hex = [
        ...bytes
    ].map((b)=>b.toString(16).padStart(2, "0"));
    return hex.slice(0, 4).join("") + "-" + hex.slice(4, 6).join("") + "-" + hex.slice(6, 8).join("") + "-" + hex.slice(8, 10).join("") + "-" + hex.slice(10, 16).join("");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/math.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "clampRound",
    ()=>clampRound,
    "evaluateMathExpression",
    ()=>evaluateMathExpression,
    "formatNumberForDisplay",
    ()=>formatNumberForDisplay,
    "getFractionDigitsForStep",
    ()=>getFractionDigitsForStep,
    "isNearlyEqual",
    ()=>isNearlyEqual,
    "snapToStep",
    ()=>snapToStep
]);
function clamp({ value, min, max }) {
    return Math.max(min, Math.min(max, value));
}
function clampRound({ value, min, max }) {
    return Math.round(clamp({
        value,
        min,
        max
    }));
}
function getFractionDigitsForStep({ step }) {
    const normalizedStep = step.toString().toLowerCase();
    if (normalizedStep.includes("e-")) {
        return Number(normalizedStep.split("e-")[1] ?? 0);
    }
    const [, fractionalPart = ""] = normalizedStep.split(".");
    return fractionalPart.length;
}
function snapToStep({ value, step }) {
    if (step <= 0) return value;
    const snappedValue = Math.round(value / step) * step;
    return Number(snappedValue.toFixed(getFractionDigitsForStep({
        step
    })));
}
function isNearlyEqual({ leftValue, rightValue, epsilon = 0.0001 }) {
    return Math.abs(leftValue - rightValue) <= epsilon;
}
function formatNumberForDisplay({ value, fractionDigits, minFractionDigits = 0, maxFractionDigits = 6 }) {
    const resolvedMaxFractionDigits = Math.max(0, fractionDigits ?? maxFractionDigits);
    const resolvedMinFractionDigits = Math.min(Math.max(0, fractionDigits ?? minFractionDigits), resolvedMaxFractionDigits);
    const fixedValue = value.toFixed(resolvedMaxFractionDigits);
    if (resolvedMaxFractionDigits === 0) {
        return Number(fixedValue) === 0 ? "0" : fixedValue;
    }
    const [integerPart, fractionPart = ""] = fixedValue.split(".");
    const normalizedIntegerPart = Number(fixedValue) === 0 ? "0" : integerPart;
    let trimmedFractionPart = fractionPart;
    while(trimmedFractionPart.length > resolvedMinFractionDigits && trimmedFractionPart.endsWith("0")){
        trimmedFractionPart = trimmedFractionPart.slice(0, -1);
    }
    return trimmedFractionPart ? `${normalizedIntegerPart}.${trimmedFractionPart}` : normalizedIntegerPart;
}
function evaluateMathExpression({ input }) {
    const sanitized = input.trim();
    if (!/^[\d.\s+\-*/()]+$/.test(sanitized)) return null;
    try {
        return parseExpression(sanitized);
    } catch  {
        return null;
    }
}
/**
 * Recursive descent parser for basic arithmetic expressions.
 * Grammar:
 *   expression = term { ('+' | '-') term }
 *   term = factor { ('*' | '/') factor }
 *   factor = number | '(' expression ')'
 */ function parseExpression(input) {
    const tokens = tokenize(input);
    if (tokens.length === 0) return null;
    let index = 0;
    function peek() {
        return tokens[index] ?? null;
    }
    function consume() {
        return tokens[index++] ?? null;
    }
    function parseExpressionLevel() {
        let left = parseTerm();
        while(true){
            const token = peek();
            if (token?.type === "PLUS") {
                consume();
                left = left + parseTerm();
            } else if (token?.type === "MINUS") {
                consume();
                left = left - parseTerm();
            } else {
                break;
            }
        }
        return left;
    }
    function parseTerm() {
        let left = parseFactor();
        while(true){
            const token = peek();
            if (token?.type === "MULTIPLY") {
                consume();
                left = left * parseFactor();
            } else if (token?.type === "DIVIDE") {
                consume();
                const right = parseFactor();
                if (right === 0) throw new Error("Division by zero");
                left = left / right;
            } else {
                break;
            }
        }
        return left;
    }
    function parseFactor() {
        const token = peek();
        if (!token) throw new Error("Unexpected end of expression");
        if (token.type === "NUMBER") {
            consume();
            return token.value;
        }
        if (token.type === "MINUS") {
            consume();
            return -parseFactor();
        }
        if (token.type === "LPAREN") {
            consume();
            const value = parseExpressionLevel();
            const next = peek();
            if (next?.type !== "RPAREN") {
                throw new Error("Missing closing parenthesis");
            }
            consume();
            return value;
        }
        throw new Error(`Unexpected token: ${token.type}`);
    }
    const result = parseExpressionLevel();
    if (index !== tokens.length) {
        return null;
    }
    if (!Number.isFinite(result)) return null;
    return result;
}
function tokenize(input) {
    const tokens = [];
    let i = 0;
    const str = input.trim();
    while(i < str.length){
        const char = str[i];
        if (/\s/.test(char)) {
            i++;
            continue;
        }
        if (/\d/.test(char)) {
            let numStr = "";
            while(i < str.length && (/\d/.test(str[i]) || str[i] === ".")){
                numStr += str[i];
                i++;
            }
            const value = Number(numStr);
            if (!Number.isFinite(value)) {
                throw new Error(`Invalid number: ${numStr}`);
            }
            tokens.push({
                type: "NUMBER",
                value
            });
            continue;
        }
        switch(char){
            case "+":
                tokens.push({
                    type: "PLUS"
                });
                break;
            case "-":
                tokens.push({
                    type: "MINUS"
                });
                break;
            case "*":
                tokens.push({
                    type: "MULTIPLY"
                });
                break;
            case "/":
                tokens.push({
                    type: "DIVIDE"
                });
                break;
            case "(":
                tokens.push({
                    type: "LPAREN"
                });
                break;
            case ")":
                tokens.push({
                    type: "RPAREN"
                });
                break;
            default:
                throw new Error(`Invalid character: ${char}`);
        }
        i++;
    }
    return tokens;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/string.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capitalizeFirstLetter",
    ()=>capitalizeFirstLetter,
    "uppercase",
    ()=>uppercase
]);
function capitalizeFirstLetter({ string }) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function uppercase({ string }) {
    return string.toUpperCase();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/color.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendAlpha",
    ()=>appendAlpha,
    "extractColorFromText",
    ()=>extractColorFromText,
    "formatColorValue",
    ()=>formatColorValue,
    "hexToHsv",
    ()=>hexToHsv,
    "hsvToHex",
    ()=>hsvToHex,
    "parseColorInput",
    ()=>parseColorInput,
    "parseHexAlpha",
    ()=>parseHexAlpha
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/converter.js [app-client] (ecmascript) <export default as converter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/parse.js [app-client] (ecmascript) <export default as parse>");
;
const toRgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__["converter"])("rgb");
const toHsv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__["converter"])("hsv");
const toHsl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__["converter"])("hsl");
function hexToHsv({ hex }) {
    const color = toHsv(`#${hex}`);
    if (!color) return [
        0,
        0,
        0
    ];
    return [
        color.h ?? 0,
        color.s ?? 0,
        color.v ?? 0
    ];
}
function hsvToHex({ h, s, v }) {
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])({
        mode: "hsv",
        h,
        s,
        v
    });
    return hex.slice(1);
}
function parseHexAlpha({ hex }) {
    const color = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__["parse"])(`#${hex}`);
    const rgbHex = color ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(color).slice(1) : hex.slice(0, 6).toLowerCase();
    return {
        rgb: rgbHex,
        alpha: color?.alpha ?? 1
    };
}
function appendAlpha({ rgbHex, alpha }) {
    if (alpha >= 1) return rgbHex;
    const hex8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex8"])({
        mode: "rgb",
        r: 0,
        g: 0,
        b: 0,
        alpha
    });
    const alphaHex = hex8.slice(7, 9);
    return rgbHex + alphaHex;
}
function stripCssNoise({ text }) {
    let cleaned = text.trim();
    cleaned = cleaned.replace(/\s*!important\s*/gi, "").replace(/;+\s*$/, "").trim();
    const colonIndex = cleaned.indexOf(":");
    const parenIndex = cleaned.indexOf("(");
    if (colonIndex !== -1 && (parenIndex === -1 || colonIndex < parenIndex)) {
        cleaned = cleaned.slice(colonIndex + 1).trim();
    }
    return cleaned;
}
function colorToHexWithAlpha({ color }) {
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(color).slice(1);
    if (color.alpha !== undefined && color.alpha < 1) {
        const hex8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex8"])(color);
        return hex8.slice(1);
    }
    return hex;
}
function extractColorFromText({ text }) {
    const cleaned = stripCssNoise({
        text
    });
    const color = toRgb(cleaned);
    if (color) return colorToHexWithAlpha({
        color
    });
    // bare hex without # (culori needs the prefix)
    const bareHexMatch = cleaned.match(/^([0-9a-fA-F]{3,8})$/);
    if (bareHexMatch) {
        const withHash = toRgb(`#${bareHexMatch[1]}`);
        if (withHash) return colorToHexWithAlpha({
            color: withHash
        });
    }
    // fallback: find #hex anywhere in the original text
    const embeddedHexMatch = text.match(/#([0-9a-fA-F]{3,8})\b/);
    if (embeddedHexMatch) {
        const embedded = toRgb(`#${embeddedHexMatch[1]}`);
        if (embedded) return colorToHexWithAlpha({
            color: embedded
        });
    }
    return null;
}
function formatColorValue({ hex, format }) {
    switch(format){
        case "hex":
            return hex;
        case "rgb":
            {
                const color = toRgb(`#${hex}`);
                if (!color) return hex;
                return `${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}`;
            }
        case "hsl":
            {
                const color = toHsl(`#${hex}`);
                if (!color) return hex;
                return `${Math.round(color.h ?? 0)}, ${Math.round((color.s ?? 0) * 100)}%, ${Math.round((color.l ?? 0) * 100)}%`;
            }
        case "hsv":
            {
                const color = toHsv(`#${hex}`);
                if (!color) return hex;
                return `${Math.round(color.h ?? 0)}, ${Math.round((color.s ?? 0) * 100)}%, ${Math.round((color.v ?? 0) * 100)}%`;
            }
    }
}
function parseColorInput({ input, format }) {
    switch(format){
        case "hex":
            {
                const cleaned = input.replace("#", "");
                const isValidHex = /^[0-9a-fA-F]{3,8}$/.test(cleaned);
                return isValidHex ? cleaned : null;
            }
        case "rgb":
            {
                const parts = input.split(",").map((part)=>parseInt(part.trim(), 10));
                if (parts.length < 3 || parts.some(Number.isNaN)) return null;
                const color = {
                    mode: "rgb",
                    r: parts[0] / 255,
                    g: parts[1] / 255,
                    b: parts[2] / 255
                };
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(color).slice(1);
            }
        case "hsl":
            {
                const parts = input.split(",").map((part)=>parseFloat(part.trim()));
                if (parts.length < 3 || parts.some(Number.isNaN)) return null;
                const color = {
                    mode: "hsl",
                    h: parts[0],
                    s: parts[1] / 100,
                    l: parts[2] / 100
                };
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(color).slice(1);
            }
        case "hsv":
            {
                const parts = input.split(",").map((part)=>parseFloat(part.trim()));
                if (parts.length < 3 || parts.some(Number.isNaN)) return null;
                const color = {
                    mode: "hsv",
                    h: parts[0],
                    s: parts[1] / 100,
                    v: parts[2] / 100
                };
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(color).slice(1);
            }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/utils/date.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate
]);
function formatDate({ date }) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/definitions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIONS",
    ()=>ACTIONS,
    "getActionDefinition",
    ()=>getActionDefinition,
    "getDefaultShortcuts",
    ()=>getDefaultShortcuts
]);
const ACTIONS = {
    "toggle-play": {
        description: "Play/Pause",
        category: "playback"
    },
    "stop-playback": {
        description: "Stop playback",
        category: "playback"
    },
    "seek-forward": {
        description: "Seek forward 1 second",
        category: "playback",
        args: {
            seconds: "number"
        }
    },
    "seek-backward": {
        description: "Seek backward 1 second",
        category: "playback",
        args: {
            seconds: "number"
        }
    },
    "frame-step-forward": {
        description: "Frame step forward",
        category: "navigation"
    },
    "frame-step-backward": {
        description: "Frame step backward",
        category: "navigation"
    },
    "jump-forward": {
        description: "Jump forward 5 seconds",
        category: "navigation",
        args: {
            seconds: "number"
        }
    },
    "jump-backward": {
        description: "Jump backward 5 seconds",
        category: "navigation",
        args: {
            seconds: "number"
        }
    },
    "goto-start": {
        description: "Go to timeline start",
        category: "navigation"
    },
    "goto-end": {
        description: "Go to timeline end",
        category: "navigation"
    },
    split: {
        description: "Split elements at playhead",
        category: "editing"
    },
    "split-left": {
        description: "Split and remove left",
        category: "editing"
    },
    "split-right": {
        description: "Split and remove right",
        category: "editing"
    },
    "delete-selected": {
        description: "Delete current selection",
        category: "editing"
    },
    "copy-selected": {
        description: "Copy selected elements",
        category: "editing"
    },
    "paste-copied": {
        description: "Paste elements at playhead",
        category: "editing"
    },
    "toggle-snapping": {
        description: "Toggle snapping",
        category: "editing"
    },
    "toggle-ripple-editing": {
        description: "Toggle ripple editing",
        category: "editing"
    },
    "toggle-source-audio": {
        description: "Extract or recover source audio",
        category: "editing"
    },
    "select-all": {
        description: "Select all elements",
        category: "selection"
    },
    "cancel-interaction": {
        description: "Cancel current interaction",
        category: "controls"
    },
    "deselect-all": {
        description: "Deselect all elements",
        category: "selection"
    },
    "duplicate-selected": {
        description: "Duplicate selected element",
        category: "selection"
    },
    "toggle-elements-muted-selected": {
        description: "Mute/unmute selected elements",
        category: "selection"
    },
    "toggle-elements-visibility-selected": {
        description: "Show/hide selected elements",
        category: "selection"
    },
    "toggle-bookmark": {
        description: "Toggle bookmark at playhead",
        category: "timeline"
    },
    undo: {
        description: "Undo",
        category: "history"
    },
    redo: {
        description: "Redo",
        category: "history"
    },
    "remove-media-asset": {
        description: "Remove media asset",
        category: "assets",
        args: {
            projectId: "string",
            assetId: "string"
        }
    },
    "remove-media-assets": {
        description: "Remove media assets",
        category: "assets",
        args: {
            projectId: "string",
            assetIds: "string[]"
        }
    }
};
const ACTION_DEFAULT_SHORTCUTS = [
    [
        "toggle-play",
        [
            "space",
            "k"
        ]
    ],
    [
        "seek-forward",
        [
            "l"
        ]
    ],
    [
        "seek-backward",
        [
            "j"
        ]
    ],
    [
        "frame-step-forward",
        [
            "right"
        ]
    ],
    [
        "frame-step-backward",
        [
            "left"
        ]
    ],
    [
        "jump-forward",
        [
            "shift+right"
        ]
    ],
    [
        "jump-backward",
        [
            "shift+left"
        ]
    ],
    [
        "goto-start",
        [
            "home",
            "enter"
        ]
    ],
    [
        "goto-end",
        [
            "end"
        ]
    ],
    [
        "split",
        [
            "s"
        ]
    ],
    [
        "split-left",
        [
            "q"
        ]
    ],
    [
        "split-right",
        [
            "w"
        ]
    ],
    [
        "delete-selected",
        [
            "backspace",
            "delete"
        ]
    ],
    [
        "copy-selected",
        [
            "ctrl+c"
        ]
    ],
    [
        "paste-copied",
        [
            "ctrl+v"
        ]
    ],
    [
        "toggle-snapping",
        [
            "n"
        ]
    ],
    [
        "select-all",
        [
            "ctrl+a"
        ]
    ],
    [
        "cancel-interaction",
        [
            "escape"
        ]
    ],
    [
        "duplicate-selected",
        [
            "ctrl+d"
        ]
    ],
    [
        "undo",
        [
            "ctrl+z"
        ]
    ],
    [
        "redo",
        [
            "ctrl+shift+z",
            "ctrl+y"
        ]
    ]
];
const ACTION_DEFAULT_SHORTCUTS_BY_ACTION = new Map(ACTION_DEFAULT_SHORTCUTS);
function getActionDefinition({ action }) {
    return {
        ...ACTIONS[action],
        defaultShortcuts: ACTION_DEFAULT_SHORTCUTS_BY_ACTION.get(action)
    };
}
function getDefaultShortcuts() {
    const shortcuts = new Map();
    for (const [action, defaultShortcuts] of ACTION_DEFAULT_SHORTCUTS){
        for (const shortcut of defaultShortcuts){
            shortcuts.set(shortcut, action);
        }
    }
    return shortcuts;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bindAction",
    ()=>bindAction,
    "invokeAction",
    ()=>invokeAction,
    "unbindAction",
    ()=>unbindAction
]);
const boundActions = {};
function bindAction(action, handler) {
    const handlers = boundActions[action];
    const typedHandler = handler;
    if (handlers) {
        handlers.push(typedHandler);
    } else {
        boundActions[action] = [
            typedHandler
        ];
    }
}
function unbindAction(action, handler) {
    const handlers = boundActions[action];
    if (!handlers) return;
    const typedHandler = handler;
    boundActions[action] = handlers.filter((h)=>h !== typedHandler);
    if (boundActions[action]?.length === 0) {
        delete boundActions[action];
    }
}
const invokeAction = (action, args, trigger)=>{
    boundActions[action]?.forEach((handler)=>{
        handler(args, trigger);
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$definitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/definitions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/registry.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybinding.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isKey",
    ()=>isKey
]);
const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "up",
    "down",
    "left",
    "right",
    "/",
    "?",
    ".",
    "enter",
    "tab",
    "space",
    "escape",
    "esc",
    "backspace",
    "delete",
    "home",
    "end"
];
const KEY_SET = new Set(KEYS);
function isKey(value) {
    return KEY_SET.has(value);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings/persisted-state.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPersistedKeybindingsState",
    ()=>getPersistedKeybindingsState
]);
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function getPersistedKeybindingsState({ state }) {
    if (!isRecord(state)) return null;
    const { keybindings, isCustomized } = state;
    if (!isRecord(keybindings) || typeof isCustomized !== "boolean") {
        return null;
    }
    const normalizedKeybindings = {};
    for (const [key, action] of Object.entries(keybindings)){
        if (action !== undefined && typeof action !== "string") {
            return null;
        }
        normalizedKeybindings[key] = action;
    }
    return {
        keybindings: normalizedKeybindings,
        isCustomized
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings/migrations/v2-to-v3.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v2ToV3",
    ()=>v2ToV3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/persisted-state.ts [app-client] (ecmascript)");
;
function v2ToV3({ state }) {
    const v2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersistedKeybindingsState"])({
        state
    });
    if (!v2) return state;
    const renames = {
        "split-selected": "split",
        "split-selected-left": "split-left",
        "split-selected-right": "split-right"
    };
    const migrated = {
        ...v2.keybindings
    };
    for (const [key, action] of Object.entries(migrated)){
        const renamedAction = action ? renames[action] : undefined;
        if (renamedAction) {
            migrated[key] = renamedAction;
        }
    }
    return {
        ...v2,
        keybindings: migrated
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings/migrations/v3-to-v4.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v3ToV4",
    ()=>v3ToV4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/persisted-state.ts [app-client] (ecmascript)");
;
function v3ToV4({ state }) {
    const v3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersistedKeybindingsState"])({
        state
    });
    if (!v3) return state;
    const renames = {
        "paste-selected": "paste-copied"
    };
    const migrated = {
        ...v3.keybindings
    };
    for (const [key, action] of Object.entries(migrated)){
        const renamedAction = action ? renames[action] : undefined;
        if (renamedAction) {
            migrated[key] = renamedAction;
        }
    }
    return {
        ...v3,
        keybindings: migrated
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings/migrations/v4-to-v5.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v4ToV5",
    ()=>v4ToV5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/persisted-state.ts [app-client] (ecmascript)");
;
function v4ToV5({ state }) {
    const v4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersistedKeybindingsState"])({
        state
    });
    if (!v4) return state;
    const keybindings = {
        ...v4.keybindings
    };
    if (!keybindings.escape) {
        keybindings.escape = "deselect-all";
    }
    return {
        ...v4,
        keybindings
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings/migrations/v5-to-v6.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v5ToV6",
    ()=>v5ToV6
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/persisted-state.ts [app-client] (ecmascript)");
;
function v5ToV6({ state }) {
    const v5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersistedKeybindingsState"])({
        state
    });
    if (!v5) return state;
    const keybindings = {
        ...v5.keybindings
    };
    if (keybindings.escape === "deselect-all") {
        keybindings.escape = "cancel-interaction";
    }
    return {
        ...v5,
        keybindings
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings/migrations/v6-to-v7.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v6ToV7",
    ()=>v6ToV7
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/persisted-state.ts [app-client] (ecmascript)");
;
function v6ToV7({ state }) {
    const v6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$persisted$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersistedKeybindingsState"])({
        state
    });
    if (!v6) return state;
    const keybindings = {
        ...v6.keybindings
    };
    for (const [key, action] of Object.entries(keybindings)){
        if (action === "split-element") {
            keybindings[key] = "split";
        }
    }
    return {
        ...v6,
        keybindings
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings/migrations/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CURRENT_VERSION",
    ()=>CURRENT_VERSION,
    "runMigrations",
    ()=>runMigrations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v2$2d$to$2d$v3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/migrations/v2-to-v3.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v3$2d$to$2d$v4$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/migrations/v3-to-v4.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v4$2d$to$2d$v5$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/migrations/v4-to-v5.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v5$2d$to$2d$v6$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/migrations/v5-to-v6.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v6$2d$to$2d$v7$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/migrations/v6-to-v7.ts [app-client] (ecmascript)");
;
;
;
;
;
const migrations = {
    2: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v2$2d$to$2d$v3$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v2ToV3"],
    3: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v3$2d$to$2d$v4$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v3ToV4"],
    4: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v4$2d$to$2d$v5$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v4ToV5"],
    5: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v5$2d$to$2d$v6$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v5ToV6"],
    6: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$v6$2d$to$2d$v7$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v6ToV7"]
};
const CURRENT_VERSION = 7;
function runMigrations({ state, fromVersion }) {
    let current = state;
    for(let version = fromVersion; version < CURRENT_VERSION; version++){
        const migrate = migrations[version];
        if (migrate) current = migrate({
            state: current
        });
    }
    return current;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/actions/keybindings-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeybindingsStore",
    ()=>useKeybindingsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/zustand@5.0.12+5e3d5174673d7dcb/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/zustand@5.0.12+5e3d5174673d7dcb/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/actions/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$definitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/definitions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/browser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$platform$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/platform.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybinding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybinding.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/actions/keybindings/migrations/index.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function isDOMElement(element) {
    return element instanceof HTMLElement;
}
function isPersistedState(value) {
    if (!value || typeof value !== "object") return false;
    if (!("keybindings" in value) || !("isCustomized" in value)) return false;
    const { keybindings, isCustomized } = value;
    return typeof keybindings === "object" && keybindings !== null && typeof isCustomized === "boolean";
}
const useKeybindingsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$zustand$40$5$2e$0$2e$12$2b$5e3d5174673d7dcb$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        keybindings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$definitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShortcuts"])(),
        isCustomized: false,
        overlayDepth: 0,
        openOverlayIds: [],
        isLoadingProject: false,
        isRecording: false,
        openOverlay: (overlayId)=>set((s)=>{
                const openOverlayIds = s.openOverlayIds.includes(overlayId) ? s.openOverlayIds : [
                    ...s.openOverlayIds,
                    overlayId
                ];
                return {
                    openOverlayIds,
                    overlayDepth: openOverlayIds.length
                };
            }),
        closeOverlay: (overlayId)=>set((s)=>{
                const openOverlayIds = s.openOverlayIds.filter((id)=>id !== overlayId);
                return {
                    openOverlayIds,
                    overlayDepth: openOverlayIds.length
                };
            }),
        setLoadingProject: (loading)=>{
            set({
                isLoadingProject: loading
            });
        },
        updateKeybinding: ({ key, action })=>{
            set((state)=>{
                const next = new Map(state.keybindings);
                next.set(key, action);
                return {
                    keybindings: next,
                    isCustomized: true
                };
            });
        },
        removeKeybinding: (key)=>{
            set((state)=>{
                const next = new Map(state.keybindings);
                next.delete(key);
                return {
                    keybindings: next,
                    isCustomized: true
                };
            });
        },
        resetToDefaults: ()=>{
            set({
                keybindings: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$definitions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultShortcuts"])(),
                isCustomized: false
            });
        },
        importKeybindings: (config)=>{
            const next = new Map();
            for (const [key, action] of Object.entries(config)){
                if (typeof key !== "string" || key.length === 0) {
                    throw new Error(`Invalid key format: ${key}`);
                }
                if (action !== undefined) {
                    // Public type's keys are `ShortcutKey`; trust the caller's typing.
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
                    next.set(key, action);
                }
            }
            set({
                keybindings: next,
                isCustomized: true
            });
        },
        exportKeybindings: ()=>{
            return Object.fromEntries(get().keybindings);
        },
        validateKeybinding: ({ key, action })=>{
            const existingAction = get().keybindings.get(key);
            if (existingAction && existingAction !== action) {
                return {
                    key,
                    existingAction,
                    newAction: action
                };
            }
            return null;
        },
        setIsRecording: (isRecording)=>{
            set({
                isRecording
            });
        },
        getKeybindingsForAction: (action)=>{
            const result = [];
            for (const [key, mapped] of get().keybindings){
                if (mapped === action) result.push(key);
            }
            return result;
        },
        getKeybindingString: (ev)=>generateKeybindingString(ev)
    }), {
    name: "opencut-keybindings",
    version: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENT_VERSION"],
    partialize: (state)=>({
            keybindings: Object.fromEntries(state.keybindings),
            isCustomized: state.isCustomized
        }),
    migrate: (persisted, version)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybindings$2f$migrations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runMigrations"])({
            state: persisted,
            fromVersion: version
        }),
    merge: (persisted, current)=>{
        if (!isPersistedState(persisted)) return current;
        const entries = Object.entries(persisted.keybindings);
        // Persistence boundary: keys are normalized by the migration chain.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        const typedEntries = entries;
        return {
            ...current,
            keybindings: new Map(typedEntries),
            isCustomized: persisted.isCustomized
        };
    }
}));
function generateKeybindingString(ev) {
    const target = ev.target;
    const modifierKey = getActiveModifier(ev);
    const key = getPressedKey(ev);
    if (!key) return null;
    if (modifierKey) {
        if (modifierKey === "shift" && isDOMElement(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypableDOMElement"])({
            element: target
        })) {
            return null;
        }
        return `${modifierKey}+${key}`;
    }
    if (isDOMElement(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypableDOMElement"])({
        element: target
    })) {
        return null;
    }
    return key;
}
function getPressedKey(ev) {
    const raw = (ev.key ?? "").toLowerCase();
    const code = ev.code ?? "";
    if (code === "Space" || raw === " " || raw === "spacebar" || raw === "space") return "space";
    if (raw === "arrowup") return "up";
    if (raw === "arrowdown") return "down";
    if (raw === "arrowleft") return "left";
    if (raw === "arrowright") return "right";
    if (code.startsWith("Key")) {
        const letter = code.slice(3).toLowerCase();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybinding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKey"])(letter)) return letter;
    }
    // Use physical key position for AZERTY and other non-QWERTY layouts.
    if (code.startsWith("Digit")) {
        const digit = code.slice(5);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybinding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKey"])(digit)) return digit;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$actions$2f$keybinding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKey"])(raw)) return raw;
    return null;
}
function getActiveModifier(ev) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$platform$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAppleDevice"])() ? ev.metaKey : ev.ctrlKey;
    const alt = ev.altKey;
    const shift = ev.shiftKey;
    if (ctrl && alt && shift) return "ctrl+alt+shift";
    if (ctrl && alt) return "ctrl+alt";
    if (ctrl && shift) return "ctrl+shift";
    if (alt && shift) return "alt+shift";
    if (ctrl) return "ctrl";
    if (alt) return "alt";
    if (shift) return "shift";
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TICKS_PER_SECOND",
    ()=>TICKS_PER_SECOND,
    "ZERO_MEDIA_TIME",
    ()=>ZERO_MEDIA_TIME,
    "addMediaTime",
    ()=>addMediaTime,
    "clampMediaTime",
    ()=>clampMediaTime,
    "lastFrameMediaTime",
    ()=>lastFrameMediaTime,
    "maxMediaTime",
    ()=>maxMediaTime,
    "mediaTime",
    ()=>mediaTime,
    "mediaTimeFromSeconds",
    ()=>mediaTimeFromSeconds,
    "mediaTimeToSeconds",
    ()=>mediaTimeToSeconds,
    "minMediaTime",
    ()=>minMediaTime,
    "parseMediaTimecode",
    ()=>parseMediaTimecode,
    "roundFrameTicks",
    ()=>roundFrameTicks,
    "roundFrameTime",
    ()=>roundFrameTime,
    "roundMediaTime",
    ()=>roundMediaTime,
    "snapSeekMediaTime",
    ()=>snapSeekMediaTime,
    "subMediaTime",
    ()=>subMediaTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm_bg.js [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const TICKS_PER_SECOND = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"])();
function isMediaTime(value) {
    return Number.isInteger(value);
}
function requireMediaTime({ value, context }) {
    if (!isMediaTime(value)) {
        throw new Error(`${context}: expected an integer tick count, got ${value}`);
    }
    return value;
}
const ZERO_MEDIA_TIME = requireMediaTime({
    value: 0,
    context: "ZERO_MEDIA_TIME"
});
function mediaTime({ ticks }) {
    return requireMediaTime({
        value: ticks,
        context: "mediaTime()"
    });
}
function roundMediaTime({ time }) {
    const roundedMagnitude = Math.round(Math.abs(time));
    if (roundedMagnitude === 0) {
        return ZERO_MEDIA_TIME;
    }
    return requireMediaTime({
        value: time < 0 ? -roundedMagnitude : roundedMagnitude,
        context: "roundMediaTime()"
    });
}
function mediaTimeFromSeconds({ seconds }) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTimeFromSeconds"])({
        seconds
    });
    if (result === undefined) {
        throw new Error(`mediaTimeFromSeconds: rust returned undefined for seconds=${seconds}`);
    }
    return requireMediaTime({
        value: result,
        context: "mediaTimeFromSeconds()"
    });
}
function mediaTimeToSeconds({ time }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
        time
    });
}
function addMediaTime({ a, b }) {
    return requireMediaTime({
        value: a + b,
        context: "addMediaTime()"
    });
}
function subMediaTime({ a, b }) {
    return requireMediaTime({
        value: a - b,
        context: "subMediaTime()"
    });
}
function maxMediaTime({ a, b }) {
    return a > b ? a : b;
}
function minMediaTime({ a, b }) {
    return a < b ? a : b;
}
function clampMediaTime({ time, min, max }) {
    if (time < min) return min;
    if (time > max) return max;
    return time;
}
function roundFrameTime({ time, fps }) {
    return requireMediaTime({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundToFrame"])({
            time,
            rate: fps
        }) ?? time,
        context: "roundFrameTime()"
    });
}
function roundFrameTicks({ ticks, fps }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundToFrame"])({
        time: ticks,
        rate: fps
    }) ?? ticks;
}
function snapSeekMediaTime({ time, duration, fps }) {
    return requireMediaTime({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snappedSeekTime"])({
            time,
            duration,
            rate: fps
        }) ?? time,
        context: "snapSeekMediaTime()"
    });
}
function lastFrameMediaTime({ duration, fps }) {
    return requireMediaTime({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lastFrameTime"])({
            duration,
            rate: fps
        }) ?? duration,
        context: "lastFrameMediaTime()"
    });
}
function parseMediaTimecode({ timeCode, format, fps }) {
    const parsedTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTimecode"])({
        timeCode,
        format,
        rate: fps
    });
    if (parsedTime == null) {
        return null;
    }
    return requireMediaTime({
        value: parsedTime,
        context: "parseMediaTimecode()"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/transform.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIN_TRANSFORM_SCALE",
    ()=>MIN_TRANSFORM_SCALE
]);
const MIN_TRANSFORM_SCALE = 0.01;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/animation/bezier.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBezierPoint",
    ()=>getBezierPoint,
    "getDefaultLeftHandle",
    ()=>getDefaultLeftHandle,
    "getDefaultRightHandle",
    ()=>getDefaultRightHandle,
    "solveBezierProgressForTime",
    ()=>solveBezierProgressForTime
]);
const BEZIER_SOLVE_ITERATIONS = 20;
function getBezierPoint({ progress, p0, p1, p2, p3 }) {
    const mt = 1 - progress;
    return mt * mt * mt * p0 + 3 * mt * mt * progress * p1 + 3 * mt * progress * progress * p2 + progress * progress * progress * p3;
}
function getDefaultRightHandle({ leftKey, rightKey }) {
    const span = rightKey.time - leftKey.time;
    const valueDelta = rightKey.value - leftKey.value;
    return {
        dt: span / 3,
        dv: valueDelta / 3
    };
}
function getDefaultLeftHandle({ leftKey, rightKey }) {
    const span = rightKey.time - leftKey.time;
    const valueDelta = rightKey.value - leftKey.value;
    return {
        dt: -span / 3,
        dv: -valueDelta / 3
    };
}
function solveBezierProgressForTime({ time, leftKey, rightKey }) {
    let lower = 0;
    let upper = 1;
    const rightHandle = leftKey.rightHandle ?? getDefaultRightHandle({
        leftKey,
        rightKey
    });
    const leftHandle = rightKey.leftHandle ?? getDefaultLeftHandle({
        leftKey,
        rightKey
    });
    for(let iteration = 0; iteration < BEZIER_SOLVE_ITERATIONS; iteration++){
        const mid = (lower + upper) / 2;
        const estimate = getBezierPoint({
            progress: mid,
            p0: leftKey.time,
            p1: leftKey.time + rightHandle.dt,
            p2: rightKey.time + leftHandle.dt,
            p3: rightKey.time
        });
        if (estimate < time) {
            lower = mid;
        } else {
            upper = mid;
        }
    }
    return (lower + upper) / 2;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/animation/interpolation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getChannelValueAtTime",
    ()=>getChannelValueAtTime,
    "getDiscreteChannelValueAtTime",
    ()=>getDiscreteChannelValueAtTime,
    "getScalarChannelValueAtTime",
    ()=>getScalarChannelValueAtTime,
    "getScalarSegmentInterpolation",
    ()=>getScalarSegmentInterpolation,
    "isScalarChannel",
    ()=>isScalarChannel,
    "normalizeChannel",
    ()=>normalizeChannel,
    "normalizeDiscreteChannel",
    ()=>normalizeDiscreteChannel,
    "normalizeScalarChannel",
    ()=>normalizeScalarChannel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/bezier.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/math.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function byTimeAscending({ leftTime, rightTime }) {
    return leftTime - rightTime;
}
function isWithinTimePair({ time, leftTime, rightTime }) {
    return time >= leftTime && time <= rightTime;
}
function lerpNumber({ leftValue, rightValue, progress }) {
    return leftValue + (rightValue - leftValue) * progress;
}
function normalizeRightHandle({ handle, leftKey, rightKey }) {
    if (!handle) {
        return undefined;
    }
    const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTime"])({
        ticks: Math.max(1, rightKey.time - leftKey.time)
    });
    return {
        dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTime"])({
            ticks: Math.min(span, Math.max(0, handle.dt))
        }),
        dv: handle.dv
    };
}
function normalizeLeftHandle({ handle, leftKey, rightKey }) {
    if (!handle) {
        return undefined;
    }
    const span = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTime"])({
        ticks: Math.max(1, rightKey.time - leftKey.time)
    });
    return {
        dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTime"])({
            ticks: Math.max(-span, Math.min(0, handle.dt))
        }),
        dv: handle.dv
    };
}
function normalizeScalarKey({ key }) {
    return {
        ...key,
        tangentMode: key.tangentMode ?? "flat",
        segmentToNext: key.segmentToNext ?? "linear"
    };
}
function normalizeScalarChannel({ channel }) {
    const sortedKeys = [
        ...channel.keys
    ].map((key)=>normalizeScalarKey({
            key
        })).sort((leftKey, rightKey)=>byTimeAscending({
            leftTime: leftKey.time,
            rightTime: rightKey.time
        }));
    const nextKeys = sortedKeys.map((key, index)=>{
        const previousKey = sortedKeys[index - 1];
        const nextKey = sortedKeys[index + 1];
        return {
            ...key,
            leftHandle: previousKey != null ? normalizeLeftHandle({
                handle: key.leftHandle,
                leftKey: previousKey,
                rightKey: key
            }) : undefined,
            rightHandle: nextKey != null ? normalizeRightHandle({
                handle: key.rightHandle,
                leftKey: key,
                rightKey: nextKey
            }) : undefined
        };
    });
    return {
        ...channel,
        keys: nextKeys
    };
}
function normalizeDiscreteChannel({ channel }) {
    return {
        ...channel,
        keys: [
            ...channel.keys
        ].sort((leftKeyframe, rightKeyframe)=>byTimeAscending({
                leftTime: leftKeyframe.time,
                rightTime: rightKeyframe.time
            }))
    };
}
function isScalarChannel(channel) {
    return "extrapolation" in channel || channel.keys.some((keyframe)=>"segmentToNext" in keyframe);
}
function normalizeChannel({ channel }) {
    return isScalarChannel(channel) ? normalizeScalarChannel({
        channel
    }) : normalizeDiscreteChannel({
        channel
    });
}
function extrapolateScalarEdge({ mode, edgeKey, neighborKey, time }) {
    if (mode === "hold" || !neighborKey) {
        return edgeKey.value;
    }
    const span = neighborKey.time - edgeKey.time;
    if (span === 0) {
        return edgeKey.value;
    }
    return edgeKey.value + (time - edgeKey.time) / span * (neighborKey.value - edgeKey.value);
}
function getScalarSegmentInterpolation({ segment }) {
    if (segment === "step") {
        return "hold";
    }
    return segment === "bezier" ? "bezier" : "linear";
}
function getScalarChannelValueAtTime({ channel, time, fallbackValue }) {
    if (!channel || channel.keys.length === 0) {
        return fallbackValue;
    }
    const normalizedChannel = normalizeScalarChannel({
        channel
    });
    const firstKey = normalizedChannel.keys[0];
    const lastKey = normalizedChannel.keys[normalizedChannel.keys.length - 1];
    if (!firstKey || !lastKey) {
        return fallbackValue;
    }
    if (time <= firstKey.time) {
        if (time < firstKey.time) {
            return extrapolateScalarEdge({
                mode: normalizedChannel.extrapolation?.before ?? "hold",
                edgeKey: firstKey,
                neighborKey: normalizedChannel.keys[1],
                time
            });
        }
        return firstKey.value;
    }
    if (time >= lastKey.time) {
        if (time > lastKey.time) {
            return extrapolateScalarEdge({
                mode: normalizedChannel.extrapolation?.after ?? "hold",
                edgeKey: lastKey,
                neighborKey: normalizedChannel.keys[normalizedChannel.keys.length - 2],
                time
            });
        }
        return lastKey.value;
    }
    for(let keyIndex = 0; keyIndex < normalizedChannel.keys.length - 1; keyIndex++){
        const leftKey = normalizedChannel.keys[keyIndex];
        const rightKey = normalizedChannel.keys[keyIndex + 1];
        if (time === rightKey.time) {
            return rightKey.value;
        }
        if (!isWithinTimePair({
            time,
            leftTime: leftKey.time,
            rightTime: rightKey.time
        })) {
            continue;
        }
        if (leftKey.segmentToNext === "step") {
            return leftKey.value;
        }
        const span = rightKey.time - leftKey.time;
        if (span === 0) {
            return rightKey.value;
        }
        const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])({
            value: (time - leftKey.time) / span,
            min: 0,
            max: 1
        });
        if (leftKey.segmentToNext === "linear") {
            return lerpNumber({
                leftValue: leftKey.value,
                rightValue: rightKey.value,
                progress
            });
        }
        const curveProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveBezierProgressForTime"])({
            time,
            leftKey,
            rightKey
        });
        const rightHandle = leftKey.rightHandle ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultRightHandle"])({
            leftKey,
            rightKey
        });
        const leftHandle = rightKey.leftHandle ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultLeftHandle"])({
            leftKey,
            rightKey
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBezierPoint"])({
            progress: curveProgress,
            p0: leftKey.value,
            p1: leftKey.value + rightHandle.dv,
            p2: rightKey.value + leftHandle.dv,
            p3: rightKey.value
        });
    }
    return lastKey.value;
}
function getDiscreteChannelValueAtTime({ channel, time, fallbackValue }) {
    if (!channel || channel.keys.length === 0) {
        return fallbackValue;
    }
    const normalizedChannel = normalizeDiscreteChannel({
        channel
    });
    let currentValue = fallbackValue;
    for (const key of normalizedChannel.keys){
        if (time < key.time) {
            break;
        }
        currentValue = key.value;
    }
    return currentValue;
}
function getChannelValueAtTime({ channel, time, fallbackValue }) {
    if (!channel || channel.keys.length === 0) {
        return fallbackValue;
    }
    if (typeof fallbackValue === "number") {
        return isScalarChannel(channel) ? getScalarChannelValueAtTime({
            channel,
            time,
            fallbackValue
        }) : fallbackValue;
    }
    if (typeof fallbackValue !== "string" && typeof fallbackValue !== "boolean") {
        return fallbackValue;
    }
    return getDiscreteChannelValueAtTime({
        channel: isScalarChannel(channel) ? undefined : channel,
        time,
        fallbackValue
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/channel-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getChannelEntriesFromData",
    ()=>getChannelEntriesFromData,
    "getChannelsFromData",
    ()=>getChannelsFromData,
    "isAnimationStorageKey",
    ()=>isAnimationStorageKey,
    "isCompositeChannelData",
    ()=>isCompositeChannelData,
    "isLeafChannelData",
    ()=>isLeafChannelData
]);
const LEGACY_ANIMATION_STORAGE_KEYS = new Set([
    "bindings",
    "channels"
]);
function isRecord(value) {
    return typeof value === "object" && value !== null;
}
function isLeafChannelData(data) {
    return isRecord(data) && Array.isArray(data.keys);
}
function isCompositeChannelData(data) {
    return isRecord(data) && !Array.isArray(data.keys);
}
function getChannelsFromData({ data }) {
    if (isLeafChannelData(data)) {
        return [
            data
        ];
    }
    if (!isCompositeChannelData(data)) {
        return [];
    }
    return Object.values(data).filter(isLeafChannelData);
}
function getChannelEntriesFromData({ data }) {
    if (isLeafChannelData(data)) {
        return [
            [
                "value",
                data
            ]
        ];
    }
    if (!isCompositeChannelData(data)) {
        return [];
    }
    return Object.entries(data).flatMap(([componentKey, channel])=>isLeafChannelData(channel) ? [
            [
                componentKey,
                channel
            ]
        ] : []);
}
function isAnimationStorageKey({ key }) {
    return !LEGACY_ANIMATION_STORAGE_KEYS.has(key);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/animation/keyframes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "clampAnimationsToDuration",
    ()=>clampAnimationsToDuration,
    "cloneAnimations",
    ()=>cloneAnimations,
    "getChannel",
    ()=>getChannel,
    "removeElementKeyframe",
    ()=>removeElementKeyframe,
    "removeKeyframe",
    ()=>removeKeyframe,
    "retimeElementKeyframe",
    ()=>retimeElementKeyframe,
    "retimeKeyframe",
    ()=>retimeKeyframe,
    "setBindingComponentChannel",
    ()=>setBindingComponentChannel,
    "setChannel",
    ()=>setChannel,
    "splitAnimationsAtTime",
    ()=>splitAnimationsAtTime,
    "updateScalarKeyframeCurve",
    ()=>updateScalarKeyframeCurve,
    "upsertKeyframe",
    ()=>upsertKeyframe,
    "upsertPathKeyframe",
    ()=>upsertPathKeyframe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/channel-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/bezier.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/interpolation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function isNearlySameTime({ leftTime, rightTime }) {
    return leftTime === rightTime;
}
function hasChannelKeys({ channel }) {
    return Boolean(channel && channel.keys.length > 0);
}
function hasChannelData({ data }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelsFromData"])({
        data
    }).some((channel)=>hasChannelKeys({
            channel
        }));
}
function toAnimation({ animations }) {
    const nextAnimations = Object.fromEntries(Object.entries(animations).filter(([key, data])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationStorageKey"])({
            key
        }) && hasChannelData({
            data
        })));
    if (Object.keys(nextAnimations).length === 0) {
        return undefined;
    }
    return nextAnimations;
}
function cloneAnimationsState({ animations }) {
    return {
        ...animations ?? {}
    };
}
function getChannelFromData({ data, componentKey }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data)) {
        return componentKey === "value" ? data : undefined;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data)) {
        return data[componentKey];
    }
    return undefined;
}
function getLayoutComponents({ channelLayout }) {
    return channelLayout.kind === "leaf" ? [
        channelLayout.component
    ] : channelLayout.components;
}
function getPrimaryComponentKey({ channelLayout }) {
    return getLayoutComponents({
        channelLayout
    })[0]?.key ?? "value";
}
function getPrimaryChannelFromData({ data, channelLayout }) {
    return getChannelFromData({
        data,
        componentKey: getPrimaryComponentKey({
            channelLayout
        })
    });
}
function setChannelInData({ data, componentKey, channel }) {
    if (componentKey === "value") {
        return channel;
    }
    const components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data) ? {
        ...data
    } : {};
    if (channel && hasChannelKeys({
        channel
    })) {
        components[componentKey] = channel;
    } else {
        delete components[componentKey];
    }
    return Object.keys(components).length > 0 ? components : undefined;
}
function getChannelDataEntries({ data }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data)) {
        return [
            [
                "value",
                data
            ]
        ];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data) ? Object.entries(data) : [];
}
function getScalarSegmentType({ interpolation }) {
    if (interpolation === "hold") {
        return "step";
    }
    return interpolation === "bezier" ? "bezier" : "linear";
}
function getInterpolationForComponent({ component, interpolation }) {
    if (component.valueKind === "discrete") {
        return "hold";
    }
    if (interpolation === "linear" || interpolation === "hold" || interpolation === "bezier") {
        return interpolation;
    }
    return component.defaultInterpolation;
}
function decomposeChannelLayoutValue({ channelLayout, value }) {
    if (channelLayout.kind === "leaf") {
        return {
            [channelLayout.component.key]: value
        };
    }
    if (typeof value !== "string") {
        return null;
    }
    const components = channelLayout.decompose(value);
    return components ? {
        ...components
    } : null;
}
function createScalarKey({ id, time, value, interpolation, previousKey }) {
    return {
        id,
        time,
        value,
        leftHandle: previousKey?.leftHandle,
        rightHandle: previousKey?.rightHandle,
        segmentToNext: previousKey?.segmentToNext ?? getScalarSegmentType({
            interpolation: interpolation ?? "linear"
        }),
        tangentMode: previousKey?.tangentMode ?? "flat"
    };
}
function createDiscreteKey({ id, time, value }) {
    return {
        id,
        time,
        value
    };
}
function isDiscreteChannel(channel) {
    return channel != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel);
}
function getChannelData({ animations, propertyPath }) {
    return animations?.[propertyPath];
}
function getTargetKeyMetadata({ channel, time, keyframeId }) {
    const normalizedChannel = channel != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
        channel
    }) : undefined;
    const keys = normalizedChannel?.keys ?? [];
    if (keyframeId) {
        const keyById = keys.find((key)=>key.id === keyframeId);
        if (keyById) {
            return {
                id: keyById.id,
                time
            };
        }
    }
    const keyAtTime = keys.find((key)=>isNearlySameTime({
            leftTime: key.time,
            rightTime: time
        }));
    if (keyAtTime) {
        return {
            id: keyAtTime.id,
            time: keyAtTime.time
        };
    }
    return {
        id: keyframeId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])(),
        time
    };
}
function upsertDiscreteChannelKey({ channel, time, value, keyframeId }) {
    const normalizedChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDiscreteChannel"])({
        channel: channel ?? {
            keys: []
        }
    });
    const keys = [
        ...normalizedChannel.keys
    ];
    if (keyframeId) {
        const existingIndex = keys.findIndex((key)=>key.id === keyframeId);
        if (existingIndex >= 0) {
            keys[existingIndex] = createDiscreteKey({
                id: keys[existingIndex].id,
                time,
                value
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDiscreteChannel"])({
                channel: {
                    keys
                }
            });
        }
    }
    const existingAtTimeIndex = keys.findIndex((key)=>isNearlySameTime({
            leftTime: key.time,
            rightTime: time
        }));
    if (existingAtTimeIndex >= 0) {
        keys[existingAtTimeIndex] = createDiscreteKey({
            id: keys[existingAtTimeIndex].id,
            time: keys[existingAtTimeIndex].time,
            value
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDiscreteChannel"])({
            channel: {
                keys
            }
        });
    }
    keys.push(createDiscreteKey({
        id: keyframeId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])(),
        time,
        value
    }));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDiscreteChannel"])({
        channel: {
            keys
        }
    });
}
function upsertScalarChannelKey({ channel, time, value, interpolation, defaultInterpolation, keyframeId }) {
    const normalizedChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeScalarChannel"])({
        channel: channel ?? {
            keys: []
        }
    });
    const keys = [
        ...normalizedChannel.keys
    ];
    if (keyframeId) {
        const existingIndex = keys.findIndex((key)=>key.id === keyframeId);
        if (existingIndex >= 0) {
            keys[existingIndex] = createScalarKey({
                id: keys[existingIndex].id,
                time,
                value,
                interpolation,
                previousKey: interpolation != null ? {
                    ...keys[existingIndex],
                    segmentToNext: getScalarSegmentType({
                        interpolation
                    })
                } : keys[existingIndex]
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeScalarChannel"])({
                channel: {
                    keys,
                    extrapolation: normalizedChannel.extrapolation
                }
            });
        }
    }
    const existingAtTimeIndex = keys.findIndex((key)=>isNearlySameTime({
            leftTime: key.time,
            rightTime: time
        }));
    if (existingAtTimeIndex >= 0) {
        keys[existingAtTimeIndex] = createScalarKey({
            id: keys[existingAtTimeIndex].id,
            time: keys[existingAtTimeIndex].time,
            value,
            interpolation,
            previousKey: interpolation != null ? {
                ...keys[existingAtTimeIndex],
                segmentToNext: getScalarSegmentType({
                    interpolation
                })
            } : keys[existingAtTimeIndex]
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeScalarChannel"])({
            channel: {
                keys,
                extrapolation: normalizedChannel.extrapolation
            }
        });
    }
    keys.push(createScalarKey({
        id: keyframeId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])(),
        time,
        value,
        interpolation: interpolation ?? defaultInterpolation
    }));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeScalarChannel"])({
        channel: {
            keys,
            extrapolation: normalizedChannel.extrapolation
        }
    });
}
function getChannel({ animations, propertyPath }) {
    const data = getChannelData({
        animations,
        propertyPath
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data)) {
        return data;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelsFromData"])({
        data
    })[0];
}
function upsertPathKeyframe({ animations, propertyPath, time, value, interpolation, keyframeId, channelLayout, coerceValue }) {
    const coercedValue = coerceValue({
        value
    });
    if (coercedValue === null) {
        return animations;
    }
    const nextAnimations = cloneAnimationsState({
        animations
    });
    const currentData = getChannelData({
        animations,
        propertyPath
    });
    const primaryChannel = getPrimaryChannelFromData({
        data: currentData,
        channelLayout
    });
    const targetKey = getTargetKeyMetadata({
        channel: primaryChannel,
        time,
        keyframeId
    });
    const componentValues = decomposeChannelLayoutValue({
        channelLayout,
        value: coercedValue
    });
    if (!componentValues) {
        return animations;
    }
    let nextData = currentData;
    for (const component of getLayoutComponents({
        channelLayout
    })){
        const componentKey = component.key;
        const nextValue = componentValues[componentKey];
        if (nextValue == null) {
            continue;
        }
        const currentChannel = getChannelFromData({
            data: currentData,
            componentKey
        });
        if (component.valueKind === "discrete") {
            if (typeof nextValue !== "string" && typeof nextValue !== "boolean") {
                continue;
            }
            const nextChannel = upsertDiscreteChannelKey({
                channel: isDiscreteChannel(currentChannel) ? currentChannel : undefined,
                time: targetKey.time,
                value: nextValue,
                keyframeId: targetKey.id
            });
            nextData = setChannelInData({
                data: nextData,
                componentKey,
                channel: nextChannel
            });
            continue;
        }
        if (typeof nextValue !== "number") {
            continue;
        }
        const nextChannel = upsertScalarChannelKey({
            channel: currentChannel != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(currentChannel) ? currentChannel : undefined,
            time: targetKey.time,
            value: nextValue,
            interpolation: interpolation != null ? getInterpolationForComponent({
                component,
                interpolation
            }) : undefined,
            defaultInterpolation: component.defaultInterpolation,
            keyframeId: targetKey.id
        });
        nextData = setChannelInData({
            data: nextData,
            componentKey,
            channel: nextChannel
        });
    }
    nextAnimations[propertyPath] = nextData;
    return toAnimation({
        animations: nextAnimations
    });
}
function upsertKeyframe({ channel, time, value, interpolation, keyframeId }) {
    if (!channel) {
        return undefined;
    }
    if (typeof value === "string" || typeof value === "boolean") {
        return upsertDiscreteChannelKey({
            channel: isDiscreteChannel(channel) ? channel : undefined,
            time,
            value,
            keyframeId
        });
    }
    if (typeof value !== "number") {
        return channel;
    }
    return upsertScalarChannelKey({
        channel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) ? channel : undefined,
        time,
        value,
        interpolation,
        keyframeId
    });
}
function removeKeyframe({ channel, keyframeId }) {
    if (!channel) {
        return undefined;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel)) {
        const nextKeys = channel.keys.filter((keyframe)=>keyframe.id !== keyframeId);
        if (nextKeys.length === 0) {
            return undefined;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeScalarChannel"])({
            channel: {
                ...channel,
                keys: nextKeys
            }
        });
    }
    const nextKeys = channel.keys.filter((keyframe)=>keyframe.id !== keyframeId);
    if (nextKeys.length === 0) {
        return undefined;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDiscreteChannel"])({
        channel: {
            ...channel,
            keys: nextKeys
        }
    });
}
function retimeKeyframe({ channel, keyframeId, time }) {
    if (!channel) {
        return undefined;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel)) {
        const keyframeByIdIndex = channel.keys.findIndex((keyframe)=>keyframe.id === keyframeId);
        if (keyframeByIdIndex < 0) {
            return channel;
        }
        const nextKeys = [
            ...channel.keys
        ];
        nextKeys[keyframeByIdIndex] = {
            ...nextKeys[keyframeByIdIndex],
            time
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeScalarChannel"])({
            channel: {
                ...channel,
                keys: nextKeys
            }
        });
    }
    const keyframeByIdIndex = channel.keys.findIndex((keyframe)=>keyframe.id === keyframeId);
    if (keyframeByIdIndex < 0) {
        return channel;
    }
    const nextKeys = [
        ...channel.keys
    ];
    nextKeys[keyframeByIdIndex] = {
        ...nextKeys[keyframeByIdIndex],
        time
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDiscreteChannel"])({
        channel: {
            ...channel,
            keys: nextKeys
        }
    });
}
function setChannel({ animations, propertyPath, channel }) {
    return setBindingComponentChannel({
        animations,
        propertyPath,
        componentKey: "value",
        channel
    });
}
function setBindingComponentChannel({ animations, propertyPath, componentKey, channel }) {
    const nextAnimations = cloneAnimationsState({
        animations
    });
    nextAnimations[propertyPath] = setChannelInData({
        data: nextAnimations[propertyPath],
        componentKey,
        channel: channel && hasChannelKeys({
            channel
        }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
            channel
        }) : undefined
    });
    return toAnimation({
        animations: nextAnimations
    });
}
function updateScalarKeyframeCurve({ animations, propertyPath, componentKey, keyframeId, patch }) {
    const channel = getChannelFromData({
        data: getChannelData({
            animations,
            propertyPath
        }),
        componentKey
    });
    if (!channel || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel)) {
        return animations;
    }
    const keyframeIndex = channel.keys.findIndex((keyframe)=>keyframe.id === keyframeId);
    if (keyframeIndex < 0) {
        return animations;
    }
    const nextKeys = [
        ...channel.keys
    ];
    const currentKey = nextKeys[keyframeIndex];
    nextKeys[keyframeIndex] = {
        ...currentKey,
        leftHandle: patch.leftHandle === undefined ? currentKey.leftHandle : patch.leftHandle ?? undefined,
        rightHandle: patch.rightHandle === undefined ? currentKey.rightHandle : patch.rightHandle ?? undefined,
        segmentToNext: patch.segmentToNext ?? currentKey.segmentToNext,
        tangentMode: patch.tangentMode ?? currentKey.tangentMode
    };
    return setBindingComponentChannel({
        animations,
        propertyPath,
        componentKey,
        channel: {
            keys: nextKeys,
            extrapolation: channel.extrapolation
        }
    });
}
function cloneChannelWithKeyIds({ channel, keyIdMap }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeScalarChannel"])({
        channel: {
            ...channel,
            keys: channel.keys.map((key)=>({
                    ...key,
                    id: keyIdMap.get(key.id) ?? key.id
                }))
        }
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDiscreteChannel"])({
        channel: {
            ...channel,
            keys: channel.keys.map((key)=>({
                    ...key,
                    id: keyIdMap.get(key.id) ?? key.id
                }))
        }
    });
}
function cloneAnimations({ animations, shouldRegenerateKeyframeIds = false }) {
    if (!animations) {
        return undefined;
    }
    const nextAnimations = cloneAnimationsState({
        animations
    });
    for (const [propertyPath, data] of Object.entries(animations).filter(([key])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationStorageKey"])({
            key
        }))){
        const channels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelsFromData"])({
            data
        });
        const primaryChannel = channels[0];
        const keyIdMap = new Map();
        if (primaryChannel) {
            for (const key of primaryChannel.keys){
                keyIdMap.set(key.id, shouldRegenerateKeyframeIds ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])() : key.id);
            }
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data)) {
            nextAnimations[propertyPath] = cloneChannelWithKeyIds({
                channel: data,
                keyIdMap
            });
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data)) {
            nextAnimations[propertyPath] = Object.fromEntries(Object.entries(data).map(([componentKey, channel])=>[
                    componentKey,
                    channel ? cloneChannelWithKeyIds({
                        channel,
                        keyIdMap
                    }) : undefined
                ]));
        }
    }
    return toAnimation({
        animations: nextAnimations
    });
}
function clampAnimationsToDuration({ animations, duration }) {
    if (!animations || duration <= 0) {
        return undefined;
    }
    return splitAnimationsAtTime({
        animations,
        splitTime: duration,
        shouldIncludeSplitBoundary: true
    }).leftAnimations;
}
function lerpPoint({ left, right, progress }) {
    return {
        x: left.x + (right.x - left.x) * progress,
        y: left.y + (right.y - left.y) * progress
    };
}
function splitDiscreteChannelAtTime({ channel, splitTime, leftBoundaryId, rightBoundaryId, shouldIncludeSplitBoundary }) {
    if (!channel || channel.keys.length === 0) {
        return {
            leftChannel: undefined,
            rightChannel: undefined
        };
    }
    const normalizedChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
        channel
    });
    let leftKeys = normalizedChannel.keys.filter((key)=>key.time <= splitTime);
    let rightKeys = normalizedChannel.keys.filter((key)=>key.time >= splitTime).map((key)=>({
            ...key,
            time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMediaTime"])({
                a: key.time,
                b: splitTime
            })
        }));
    if (shouldIncludeSplitBoundary) {
        const hasBoundaryOnLeft = leftKeys.some((key)=>isNearlySameTime({
                leftTime: key.time,
                rightTime: splitTime
            }));
        const hasBoundaryOnRight = rightKeys.some((key)=>isNearlySameTime({
                leftTime: key.time,
                rightTime: 0
            }));
        const boundaryValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
            channel: normalizedChannel,
            time: splitTime,
            fallbackValue: normalizedChannel.keys[0].value
        });
        if (!hasBoundaryOnLeft) {
            leftKeys = [
                ...leftKeys,
                createDiscreteKey({
                    id: leftBoundaryId,
                    time: splitTime,
                    value: boundaryValue
                })
            ];
        }
        if (!hasBoundaryOnRight) {
            rightKeys = [
                createDiscreteKey({
                    id: rightBoundaryId,
                    time: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
                    value: boundaryValue
                }),
                ...rightKeys
            ];
        }
    }
    return {
        leftChannel: leftKeys.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
            channel: {
                keys: leftKeys
            }
        }) : undefined,
        rightChannel: rightKeys.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
            channel: {
                keys: rightKeys
            }
        }) : undefined
    };
}
function splitScalarChannelAtTime({ channel, splitTime, leftBoundaryId, rightBoundaryId, shouldIncludeSplitBoundary }) {
    if (!channel || channel.keys.length === 0) {
        return {
            leftChannel: undefined,
            rightChannel: undefined
        };
    }
    const normalizedChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
        channel
    });
    let leftKeys = normalizedChannel.keys.filter((key)=>key.time <= splitTime);
    let rightKeys = normalizedChannel.keys.filter((key)=>key.time >= splitTime).map((key)=>({
            ...key,
            time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMediaTime"])({
                a: key.time,
                b: splitTime
            })
        }));
    const hasBoundaryOnLeft = leftKeys.some((key)=>isNearlySameTime({
            leftTime: key.time,
            rightTime: splitTime
        }));
    const hasBoundaryOnRight = rightKeys.some((key)=>isNearlySameTime({
            leftTime: key.time,
            rightTime: 0
        }));
    if (!shouldIncludeSplitBoundary || hasBoundaryOnLeft && hasBoundaryOnRight) {
        return {
            leftChannel: leftKeys.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
                channel: {
                    keys: leftKeys,
                    extrapolation: normalizedChannel.extrapolation
                }
            }) : undefined,
            rightChannel: rightKeys.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
                channel: {
                    keys: rightKeys,
                    extrapolation: normalizedChannel.extrapolation
                }
            }) : undefined
        };
    }
    for(let keyIndex = 0; keyIndex < normalizedChannel.keys.length - 1; keyIndex++){
        const leftKey = normalizedChannel.keys[keyIndex];
        const rightKey = normalizedChannel.keys[keyIndex + 1];
        if (!(splitTime > leftKey.time && splitTime < rightKey.time)) {
            continue;
        }
        const boundaryValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
            channel: normalizedChannel,
            time: splitTime,
            fallbackValue: leftKey.value
        });
        if (leftKey.segmentToNext === "bezier") {
            const rightHandle = leftKey.rightHandle ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultRightHandle"])({
                leftKey,
                rightKey
            });
            const leftHandle = rightKey.leftHandle ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultLeftHandle"])({
                leftKey,
                rightKey
            });
            const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveBezierProgressForTime"])({
                time: splitTime,
                leftKey,
                rightKey
            });
            const p0 = {
                x: leftKey.time,
                y: leftKey.value
            };
            const p1 = {
                x: leftKey.time + rightHandle.dt,
                y: leftKey.value + rightHandle.dv
            };
            const p2 = {
                x: rightKey.time + leftHandle.dt,
                y: rightKey.value + leftHandle.dv
            };
            const p3 = {
                x: rightKey.time,
                y: rightKey.value
            };
            const q0 = lerpPoint({
                left: p0,
                right: p1,
                progress
            });
            const q1 = lerpPoint({
                left: p1,
                right: p2,
                progress
            });
            const q2 = lerpPoint({
                left: p2,
                right: p3,
                progress
            });
            const r0 = lerpPoint({
                left: q0,
                right: q1,
                progress
            });
            const r1 = lerpPoint({
                left: q1,
                right: q2,
                progress
            });
            const splitPoint = lerpPoint({
                left: r0,
                right: r1,
                progress
            });
            leftKeys = [
                ...normalizedChannel.keys.filter((key)=>key.time < splitTime),
                {
                    ...leftKey,
                    rightHandle: {
                        dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                            time: q0.x - p0.x
                        }),
                        dv: q0.y - p0.y
                    }
                },
                {
                    id: leftBoundaryId,
                    time: splitTime,
                    value: boundaryValue,
                    leftHandle: {
                        dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                            time: r0.x - splitPoint.x
                        }),
                        dv: r0.y - splitPoint.y
                    },
                    segmentToNext: leftKey.segmentToNext,
                    tangentMode: leftKey.tangentMode
                }
            ];
            rightKeys = [
                {
                    id: rightBoundaryId,
                    time: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
                    value: boundaryValue,
                    rightHandle: {
                        dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                            time: r1.x - splitPoint.x
                        }),
                        dv: r1.y - splitPoint.y
                    },
                    segmentToNext: "bezier",
                    tangentMode: leftKey.tangentMode
                },
                {
                    ...rightKey,
                    time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMediaTime"])({
                        a: rightKey.time,
                        b: splitTime
                    }),
                    leftHandle: {
                        dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                            time: q2.x - p3.x
                        }),
                        dv: q2.y - p3.y
                    }
                },
                ...normalizedChannel.keys.filter((key)=>key.time > rightKey.time).map((key)=>({
                        ...key,
                        time: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMediaTime"])({
                            a: key.time,
                            b: splitTime
                        })
                    }))
            ];
        } else {
            leftKeys = [
                ...leftKeys,
                createScalarKey({
                    id: leftBoundaryId,
                    time: splitTime,
                    value: boundaryValue,
                    interpolation: "linear"
                })
            ];
            rightKeys = [
                createScalarKey({
                    id: rightBoundaryId,
                    time: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZERO_MEDIA_TIME"],
                    value: boundaryValue,
                    interpolation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScalarSegmentInterpolation"])({
                        segment: leftKey.segmentToNext
                    })
                }),
                ...rightKeys
            ];
        }
        return {
            leftChannel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
                channel: {
                    keys: leftKeys,
                    extrapolation: normalizedChannel.extrapolation
                }
            }),
            rightChannel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
                channel: {
                    keys: rightKeys,
                    extrapolation: normalizedChannel.extrapolation
                }
            })
        };
    }
    return {
        leftChannel: leftKeys.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
            channel: {
                keys: leftKeys,
                extrapolation: normalizedChannel.extrapolation
            }
        }) : undefined,
        rightChannel: rightKeys.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeChannel"])({
            channel: {
                keys: rightKeys,
                extrapolation: normalizedChannel.extrapolation
            }
        }) : undefined
    };
}
function splitChannelAtTime({ channel, splitTime, leftBoundaryId, rightBoundaryId, shouldIncludeSplitBoundary }) {
    return channel != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) ? splitDiscreteChannelAtTime({
        channel,
        splitTime,
        leftBoundaryId,
        rightBoundaryId,
        shouldIncludeSplitBoundary
    }) : splitScalarChannelAtTime({
        channel: channel != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) ? channel : undefined,
        splitTime,
        leftBoundaryId,
        rightBoundaryId,
        shouldIncludeSplitBoundary
    });
}
function splitAnimationsAtTime({ animations, splitTime, shouldIncludeSplitBoundary = true }) {
    if (!animations) {
        return {
            leftAnimations: undefined,
            rightAnimations: undefined
        };
    }
    const leftAnimations = cloneAnimationsState({
        animations: undefined
    });
    const rightAnimations = cloneAnimationsState({
        animations: undefined
    });
    for (const [propertyPath, data] of Object.entries(animations).filter(([key])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationStorageKey"])({
            key
        }))){
        if (!data) {
            continue;
        }
        const leftBoundaryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])();
        const rightBoundaryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])();
        for (const [componentKey, channel] of getChannelDataEntries({
            data
        })){
            const splitResult = splitChannelAtTime({
                channel,
                splitTime,
                leftBoundaryId,
                rightBoundaryId,
                shouldIncludeSplitBoundary
            });
            if (splitResult.leftChannel) {
                leftAnimations[propertyPath] = setChannelInData({
                    data: leftAnimations[propertyPath],
                    componentKey,
                    channel: splitResult.leftChannel
                });
            }
            if (splitResult.rightChannel) {
                rightAnimations[propertyPath] = setChannelInData({
                    data: rightAnimations[propertyPath],
                    componentKey,
                    channel: splitResult.rightChannel
                });
            }
        }
    }
    return {
        leftAnimations: toAnimation({
            animations: leftAnimations
        }),
        rightAnimations: toAnimation({
            animations: rightAnimations
        })
    };
}
function removeElementKeyframe({ animations, propertyPath, keyframeId }) {
    const data = getChannelData({
        animations,
        propertyPath
    });
    if (!data) {
        return animations;
    }
    const nextAnimations = cloneAnimationsState({
        animations
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data)) {
        nextAnimations[propertyPath] = removeKeyframe({
            channel: data,
            keyframeId
        });
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data)) {
        let nextData = data;
        for (const [componentKey, channel] of Object.entries(data)){
            nextData = setChannelInData({
                data: nextData,
                componentKey,
                channel: removeKeyframe({
                    channel,
                    keyframeId
                })
            });
        }
        nextAnimations[propertyPath] = nextData;
    }
    return toAnimation({
        animations: nextAnimations
    });
}
function retimeElementKeyframe({ animations, propertyPath, keyframeId, time }) {
    const data = getChannelData({
        animations,
        propertyPath
    });
    if (!data) {
        return animations;
    }
    const nextAnimations = cloneAnimationsState({
        animations
    });
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data)) {
        nextAnimations[propertyPath] = retimeKeyframe({
            channel: data,
            keyframeId,
            time
        });
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data)) {
        let nextData = data;
        for (const [componentKey, channel] of Object.entries(data)){
            nextData = setChannelInData({
                data: nextData,
                componentKey,
                channel: retimeKeyframe({
                    channel,
                    keyframeId,
                    time
                })
            });
        }
        nextAnimations[propertyPath] = nextData;
    }
    return toAnimation({
        animations: nextAnimations
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/resolve.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getElementLocalTime",
    ()=>getElementLocalTime,
    "resolveAnimationPathValueAtTime",
    ()=>resolveAnimationPathValueAtTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/channel-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/interpolation.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function getElementLocalTime({ timelineTime, elementStartTime, elementDuration }) {
    const localTime = timelineTime - elementStartTime;
    if (localTime <= 0) {
        return 0;
    }
    if (localTime >= elementDuration) {
        return elementDuration;
    }
    return localTime;
}
function resolveAnimationPathValueAtTime({ animations, propertyPath, localTime, fallbackValue }) {
    const data = animations?.[propertyPath];
    if (!data) {
        return fallbackValue;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data)) {
        if (typeof fallbackValue === "number") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
                channel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(data) ? data : undefined,
                time: localTime,
                fallbackValue
            });
        }
        if (typeof fallbackValue === "string" || typeof fallbackValue === "boolean") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
                channel: !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(data) ? data : undefined,
                time: localTime,
                fallbackValue
            });
        }
        return fallbackValue;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data)) {
        return fallbackValue;
    }
    if (typeof fallbackValue !== "string" || !("r" in data) || !("g" in data) || !("b" in data) || !("a" in data)) {
        return fallbackValue;
    }
    const fallbackComponents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColorToLinearRgba"])({
        color: fallbackValue
    });
    if (fallbackComponents === null) {
        return fallbackValue;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLinearRgba"])({
        color: {
            r: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
                channel: data.r && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(data.r) ? data.r : undefined,
                time: localTime,
                fallbackValue: fallbackComponents.r
            }),
            g: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
                channel: data.g && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(data.g) ? data.g : undefined,
                time: localTime,
                fallbackValue: fallbackComponents.g
            }),
            b: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
                channel: data.b && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(data.b) ? data.b : undefined,
                time: localTime,
                fallbackValue: fallbackComponents.b
            }),
            a: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
                channel: data.a && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(data.a) ? data.a : undefined,
                time: localTime,
                fallbackValue: fallbackComponents.a
            })
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANIMATION_PROPERTY_GROUPS",
    ()=>ANIMATION_PROPERTY_GROUPS,
    "ANIMATION_PROPERTY_PATHS",
    ()=>ANIMATION_PROPERTY_PATHS
]);
const ANIMATION_PROPERTY_PATHS = [
    "transform.positionX",
    "transform.positionY",
    "transform.scaleX",
    "transform.scaleY",
    "transform.rotate",
    "opacity",
    "volume",
    "color",
    "background.color",
    "background.paddingX",
    "background.paddingY",
    "background.offsetX",
    "background.offsetY",
    "background.cornerRadius"
];
const ANIMATION_PROPERTY_GROUPS = {
    "transform.scale": [
        "transform.scaleX",
        "transform.scaleY"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/animation/effect-param-channel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "EFFECT_PARAM_PATH_PREFIX",
    ()=>EFFECT_PARAM_PATH_PREFIX,
    "EFFECT_PARAM_PATH_SUFFIX",
    ()=>EFFECT_PARAM_PATH_SUFFIX,
    "buildEffectParamPath",
    ()=>buildEffectParamPath,
    "isEffectParamPath",
    ()=>isEffectParamPath,
    "parseEffectParamPath",
    ()=>parseEffectParamPath,
    "removeEffectParamKeyframe",
    ()=>removeEffectParamKeyframe,
    "resolveEffectParamsAtTime",
    ()=>resolveEffectParamsAtTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const EFFECT_PARAM_PATH_PREFIX = "effects.";
const EFFECT_PARAM_PATH_SUFFIX = ".params.";
function buildEffectParamPath({ effectId, paramKey }) {
    return `${EFFECT_PARAM_PATH_PREFIX}${effectId}${EFFECT_PARAM_PATH_SUFFIX}${paramKey}`;
}
function isEffectParamPath(propertyPath) {
    return propertyPath.startsWith(EFFECT_PARAM_PATH_PREFIX) && propertyPath.includes(EFFECT_PARAM_PATH_SUFFIX);
}
function parseEffectParamPath({ propertyPath }) {
    if (!isEffectParamPath(propertyPath)) {
        return null;
    }
    const withoutPrefix = propertyPath.slice(EFFECT_PARAM_PATH_PREFIX.length);
    const separatorIndex = withoutPrefix.indexOf(EFFECT_PARAM_PATH_SUFFIX);
    if (separatorIndex <= 0) {
        return null;
    }
    const effectId = withoutPrefix.slice(0, separatorIndex);
    const paramKey = withoutPrefix.slice(separatorIndex + EFFECT_PARAM_PATH_SUFFIX.length);
    if (!effectId || !paramKey) {
        return null;
    }
    return {
        effectId,
        paramKey
    };
}
function resolveEffectParamsAtTime({ effectId, params, animations, localTime }) {
    const safeLocalTime = Math.max(0, localTime);
    const resolved = {};
    for (const [paramKey, staticValue] of Object.entries(params)){
        const path = buildEffectParamPath({
            effectId,
            paramKey
        });
        resolved[paramKey] = animations?.[path] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
            animations,
            propertyPath: path,
            localTime: safeLocalTime,
            fallbackValue: staticValue
        }) : staticValue;
    }
    return resolved;
}
function removeEffectParamKeyframe({ animations, effectId, paramKey, keyframeId }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeElementKeyframe"])({
        animations,
        propertyPath: buildEffectParamPath({
            effectId,
            paramKey
        }),
        keyframeId
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/graphic-param-channel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GRAPHIC_PARAM_PATH_PREFIX",
    ()=>GRAPHIC_PARAM_PATH_PREFIX,
    "buildGraphicParamPath",
    ()=>buildGraphicParamPath,
    "isGraphicParamPath",
    ()=>isGraphicParamPath,
    "parseGraphicParamPath",
    ()=>parseGraphicParamPath,
    "resolveGraphicParamsAtTime",
    ()=>resolveGraphicParamsAtTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const GRAPHIC_PARAM_PATH_PREFIX = "params.";
function buildGraphicParamPath({ paramKey }) {
    return `${GRAPHIC_PARAM_PATH_PREFIX}${paramKey}`;
}
function isGraphicParamPath(propertyPath) {
    return propertyPath.startsWith(GRAPHIC_PARAM_PATH_PREFIX);
}
function parseGraphicParamPath({ propertyPath }) {
    if (!isGraphicParamPath(propertyPath)) {
        return null;
    }
    const paramKey = propertyPath.slice(GRAPHIC_PARAM_PATH_PREFIX.length);
    return paramKey.length > 0 ? {
        paramKey
    } : null;
}
function resolveGraphicParamsAtTime({ params, definitions, animations, localTime }) {
    const resolved = {
        ...params
    };
    for (const param of definitions){
        const path = buildGraphicParamPath({
            paramKey: param.key
        });
        if (!animations?.[path]) {
            continue;
        }
        resolved[param.key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
            animations,
            propertyPath: path,
            localTime: Math.max(0, localTime),
            fallbackValue: params[param.key] ?? param.default
        });
    }
    return resolved;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/path.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "isAnimationPath",
    ()=>isAnimationPath,
    "isAnimationPropertyPath",
    ()=>isAnimationPropertyPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/effect-param-channel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/graphic-param-channel.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const ANIMATION_PROPERTY_PATH_SET = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_PROPERTY_PATHS"]);
function isAnimationPropertyPath(propertyPath) {
    return ANIMATION_PROPERTY_PATH_SET.has(propertyPath);
}
function isAnimationPath(propertyPath) {
    return isAnimationPropertyPath(propertyPath) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGraphicParamPath"])(propertyPath) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEffectParamPath"])(propertyPath);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/keyframe-query.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getElementKeyframes",
    ()=>getElementKeyframes,
    "getKeyframeAtTime",
    ()=>getKeyframeAtTime,
    "getKeyframeById",
    ()=>getKeyframeById,
    "hasKeyframesForPath",
    ()=>hasKeyframesForPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/channel-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/interpolation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/path.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function getChannelFallbackValue({ channel }) {
    if (channel.keys.length === 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) ? 0 : false;
    }
    return channel.keys[0].value;
}
function getChannelKeyframeMatches({ data }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelEntriesFromData"])({
        data
    }).flatMap(([componentKey, channel], componentIndex)=>{
        if (channel.keys.length === 0) {
            return [];
        }
        return channel.keys.map((keyframe)=>({
                componentKey,
                componentIndex,
                channel,
                keyframe
            }));
    });
}
function getUniqueChannelKeyframeMatches({ data }) {
    const sortedMatches = getChannelKeyframeMatches({
        data
    }).sort((leftMatch, rightMatch)=>leftMatch.keyframe.time - rightMatch.keyframe.time || leftMatch.componentIndex - rightMatch.componentIndex);
    const uniqueMatches = [];
    for (const match of sortedMatches){
        const previousMatch = uniqueMatches[uniqueMatches.length - 1];
        if (!previousMatch || previousMatch.keyframe.time !== match.keyframe.time) {
            uniqueMatches.push(match);
            continue;
        }
        if (previousMatch.componentIndex !== 0 && match.componentIndex === 0) {
            uniqueMatches[uniqueMatches.length - 1] = match;
        }
    }
    return uniqueMatches;
}
function getPreferredChannelKeyframeMatch({ matches }) {
    return matches.find((match)=>match.componentIndex === 0) ?? matches[0] ?? null;
}
function getChannelValue({ channel, time }) {
    const fallbackValue = getChannelFallbackValue({
        channel
    });
    if (typeof fallbackValue === "number") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
            channel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) ? channel : undefined,
            time,
            fallbackValue
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelValueAtTime"])({
        channel: !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) ? channel : undefined,
        time,
        fallbackValue
    });
}
function getComposedChannelDataValueAtTime({ data, time }) {
    const entries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelEntriesFromData"])({
        data
    });
    if (entries.length === 0) {
        return null;
    }
    if (entries.length === 1 && entries[0]?.[0] === "value") {
        return getChannelValue({
            channel: entries[0][1],
            time
        });
    }
    const componentValues = Object.fromEntries(entries.map(([componentKey, channel])=>[
            componentKey,
            getChannelValue({
                channel,
                time
            })
        ]));
    if (typeof componentValues.r === "number" && typeof componentValues.g === "number" && typeof componentValues.b === "number" && typeof componentValues.a === "number") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLinearRgba"])({
            color: {
                r: componentValues.r,
                g: componentValues.g,
                b: componentValues.b,
                a: componentValues.a
            }
        });
    }
    return null;
}
function getKeyframeInterpolation({ channel, keyframe }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel) && "segmentToNext" in keyframe ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScalarSegmentInterpolation"])({
        segment: keyframe.segmentToNext
    }) : "hold";
}
function toElementKeyframe({ data, propertyPath, keyframeMatch }) {
    const value = getComposedChannelDataValueAtTime({
        data,
        time: keyframeMatch.keyframe.time
    });
    if (value === null) {
        return null;
    }
    return {
        propertyPath,
        id: keyframeMatch.keyframe.id,
        time: keyframeMatch.keyframe.time,
        value,
        interpolation: getKeyframeInterpolation({
            channel: keyframeMatch.channel,
            keyframe: keyframeMatch.keyframe
        })
    };
}
function getElementKeyframes({ animations }) {
    if (!animations) {
        return [];
    }
    return Object.entries(animations).filter(([key])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationStorageKey"])({
            key
        })).flatMap(([propertyPath, data])=>{
        if (!data || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationPath"])(propertyPath)) {
            return [];
        }
        return getUniqueChannelKeyframeMatches({
            data
        }).flatMap((keyframeMatch)=>{
            const keyframe = toElementKeyframe({
                data,
                propertyPath,
                keyframeMatch
            });
            if (!keyframe) {
                return [];
            }
            return [
                keyframe
            ];
        });
    });
}
function hasKeyframesForPath({ animations, propertyPath }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelEntriesFromData"])({
        data: animations?.[propertyPath]
    }).some(([, channel])=>channel.keys.length > 0);
}
function getKeyframeAtTime({ animations, propertyPath, time }) {
    const data = animations?.[propertyPath];
    if (!data) {
        return null;
    }
    const keyframeMatch = getPreferredChannelKeyframeMatch({
        matches: getChannelKeyframeMatches({
            data
        }).filter(({ keyframe })=>keyframe.time === time)
    });
    if (!keyframeMatch) {
        return null;
    }
    return toElementKeyframe({
        data,
        propertyPath,
        keyframeMatch
    });
}
function getKeyframeById({ animations, propertyPath, keyframeId }) {
    const data = animations?.[propertyPath];
    if (!data) {
        return null;
    }
    const keyframeMatch = getPreferredChannelKeyframeMatch({
        matches: getChannelKeyframeMatches({
            data
        }).filter(({ keyframe })=>keyframe.id === keyframeId)
    });
    if (!keyframeMatch) {
        return null;
    }
    return toElementKeyframe({
        data,
        propertyPath,
        keyframeMatch
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/graph-channels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getEditableScalarChannel",
    ()=>getEditableScalarChannel,
    "getEditableScalarChannels",
    ()=>getEditableScalarChannels,
    "getScalarKeyframeContext",
    ()=>getScalarKeyframeContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/channel-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/interpolation.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function isScalarAnimationChannel(channel) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(channel) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel);
}
function getEasingModeForChannelData({ data }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCompositeChannelData"])(data) && [
        "r",
        "g",
        "b",
        "a"
    ].every((componentKey)=>componentKey in data) ? "shared" : "independent";
}
function getEditableScalarChannels({ animations, propertyPath }) {
    const data = animations?.[propertyPath];
    if (!data) {
        return null;
    }
    const channelEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLeafChannelData"])(data) ? [
        [
            "value",
            data
        ]
    ] : Object.entries(data);
    const channels = channelEntries.flatMap(([componentKey, channel])=>{
        if (!isScalarAnimationChannel(channel)) {
            return [];
        }
        return [
            {
                propertyPath,
                componentKey,
                channel
            }
        ];
    });
    return {
        easingMode: getEasingModeForChannelData({
            data
        }),
        channels
    };
}
function getEditableScalarChannel({ animations, propertyPath, componentKey }) {
    const result = getEditableScalarChannels({
        animations,
        propertyPath
    });
    return result?.channels.find((channel)=>channel.componentKey === componentKey) ?? null;
}
function getScalarKeyframeContext({ animations, propertyPath, componentKey, keyframeId }) {
    const scalarChannel = getEditableScalarChannel({
        animations,
        propertyPath,
        componentKey
    });
    if (!scalarChannel) {
        return null;
    }
    const keyframeIndex = scalarChannel.channel.keys.findIndex((keyframe)=>keyframe.id === keyframeId);
    if (keyframeIndex < 0) {
        return null;
    }
    return {
        ...scalarChannel,
        keyframe: scalarChannel.channel.keys[keyframeIndex],
        keyframeIndex,
        previousKey: scalarChannel.channel.keys[keyframeIndex - 1] ?? null,
        nextKey: scalarChannel.channel.keys[keyframeIndex + 1] ?? null
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/curve-bridge.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getCurveHandlesForNormalizedCubicBezier",
    ()=>getCurveHandlesForNormalizedCubicBezier,
    "getNormalizedCubicBezierForScalarSegment",
    ()=>getNormalizedCubicBezierForScalarSegment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/bezier.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const VALUE_EPSILON = 1e-6;
function clamp01({ value }) {
    return Math.max(0, Math.min(1, value));
}
function getNormalizedCubicBezierForScalarSegment({ leftKey, rightKey, referenceSpanValue }) {
    const spanTime = rightKey.time - leftKey.time;
    const spanValue = rightKey.value - leftKey.value;
    const effectiveSpanValue = Math.abs(spanValue) > VALUE_EPSILON ? spanValue : referenceSpanValue !== undefined && Math.abs(referenceSpanValue) > VALUE_EPSILON ? referenceSpanValue : null;
    if (spanTime === 0 || effectiveSpanValue === null) {
        return null;
    }
    const rightHandle = leftKey.rightHandle ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultRightHandle"])({
        leftKey,
        rightKey
    });
    const leftHandle = rightKey.leftHandle ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$bezier$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultLeftHandle"])({
        leftKey,
        rightKey
    });
    return [
        clamp01({
            value: rightHandle.dt / spanTime
        }),
        rightHandle.dv / effectiveSpanValue,
        clamp01({
            value: 1 + leftHandle.dt / spanTime
        }),
        1 + leftHandle.dv / effectiveSpanValue
    ];
}
function getCurveHandlesForNormalizedCubicBezier({ leftKey, rightKey, cubicBezier, referenceSpanValue }) {
    const spanTime = rightKey.time - leftKey.time;
    const spanValue = rightKey.value - leftKey.value;
    const effectiveSpanValue = Math.abs(spanValue) > VALUE_EPSILON ? spanValue : referenceSpanValue !== undefined && Math.abs(referenceSpanValue) > VALUE_EPSILON ? referenceSpanValue : null;
    if (spanTime === 0 || effectiveSpanValue === null) {
        return null;
    }
    const [rawX1, y1, rawX2, y2] = cubicBezier;
    const x1 = clamp01({
        value: rawX1
    });
    const x2 = clamp01({
        value: rawX2
    });
    return {
        rightHandle: {
            dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                time: spanTime * x1
            }),
            dv: effectiveSpanValue * y1
        },
        leftHandle: {
            dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
                time: spanTime * (x2 - 1)
            }),
            dv: effectiveSpanValue * (y2 - 1)
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/property-groups.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getGroupKeyframesAtTime",
    ()=>getGroupKeyframesAtTime,
    "hasGroupKeyframeAtTime",
    ()=>hasGroupKeyframeAtTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function getGroupKeyframesAtTime({ animations, group, time }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ANIMATION_PROPERTY_GROUPS"][group].flatMap((propertyPath)=>{
        const keyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKeyframeAtTime"])({
            animations,
            propertyPath,
            time
        });
        return keyframe ? [
            {
                propertyPath,
                keyframeId: keyframe.id
            }
        ] : [];
    });
}
function hasGroupKeyframeAtTime({ animations, group, time }) {
    return getGroupKeyframesAtTime({
        animations,
        group,
        time
    }).length > 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/interpolation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graph$2d$channels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/graph-channels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$curve$2d$bridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/curve-bridge.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/graphic-param-channel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/effect-param-channel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$property$2d$groups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/property-groups.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/path.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graph$2d$channels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$curve$2d$bridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$property$2d$groups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graph$2d$channels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$curve$2d$bridge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$effect$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$property$2d$groups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/animation/values.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "resolveColorAtTime",
    ()=>resolveColorAtTime,
    "resolveNumberAtTime",
    ()=>resolveNumberAtTime,
    "resolveOpacityAtTime",
    ()=>resolveOpacityAtTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function resolveOpacityAtTime({ baseOpacity, animations, localTime }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
        animations,
        propertyPath: "opacity",
        localTime: Math.max(0, localTime),
        fallbackValue: baseOpacity
    });
}
function resolveNumberAtTime({ baseValue, animations, propertyPath, localTime }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
        animations,
        propertyPath,
        localTime: Math.max(0, localTime),
        fallbackValue: baseValue
    });
}
function resolveColorAtTime({ baseColor, animations, propertyPath, localTime }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
        animations,
        propertyPath,
        localTime: Math.max(0, localTime),
        fallbackValue: baseColor
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/text/background.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CORNER_RADIUS_MAX",
    ()=>CORNER_RADIUS_MAX,
    "CORNER_RADIUS_MIN",
    ()=>CORNER_RADIUS_MIN
]);
const CORNER_RADIUS_MIN = 0;
const CORNER_RADIUS_MAX = 100;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/text/layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "drawTextDecoration",
    ()=>drawTextDecoration,
    "getMetricAscent",
    ()=>getMetricAscent,
    "getMetricDescent",
    ()=>getMetricDescent,
    "getTextBackgroundRect",
    ()=>getTextBackgroundRect,
    "getTextVisualRect",
    ()=>getTextVisualRect,
    "measureTextBlock",
    ()=>measureTextBlock,
    "setCanvasLetterSpacing",
    ()=>setCanvasLetterSpacing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const TEXT_DECORATION_THICKNESS_RATIO = 0.07;
const STRIKETHROUGH_VERTICAL_RATIO = 0.35;
function setCanvasLetterSpacing({ ctx, letterSpacingPx }) {
    if ("letterSpacing" in ctx) {
        ctx.letterSpacing = `${letterSpacingPx}px`;
    }
}
function getMetricAscent({ metrics, fallbackFontSize }) {
    return metrics.actualBoundingBoxAscent ?? fallbackFontSize * 0.8;
}
function getMetricDescent({ metrics, fallbackFontSize }) {
    return metrics.actualBoundingBoxDescent ?? fallbackFontSize * 0.2;
}
function measureTextBlock({ lineMetrics, lineHeightPx }) {
    let maxWidth = 0;
    for (const metrics of lineMetrics){
        maxWidth = Math.max(maxWidth, metrics.width);
    }
    const lineCount = lineMetrics.length;
    const height = lineCount * lineHeightPx;
    const visualCenterOffset = (lineCount - 1) * lineHeightPx / 2;
    return {
        visualCenterOffset,
        height,
        maxWidth
    };
}
function getTextRect({ textAlign, block }) {
    const textAlignToLeft = {
        left: 0,
        right: -block.maxWidth,
        center: -block.maxWidth / 2
    };
    const left = textAlignToLeft[textAlign];
    return {
        left,
        top: -block.height / 2,
        width: block.maxWidth,
        height: block.height
    };
}
function isTextBackgroundVisible({ background }) {
    return background.enabled && Boolean(background.color) && background.color !== "transparent";
}
function getTextBackgroundRect({ textAlign, block, background, fontSizeRatio = 1 }) {
    if (!isTextBackgroundVisible({
        background
    })) {
        return null;
    }
    const textRect = getTextRect({
        textAlign,
        block
    });
    const paddingX = (background.paddingX ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingX) * fontSizeRatio;
    const paddingY = (background.paddingY ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingY) * fontSizeRatio;
    const offsetX = background.offsetX ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetX;
    const offsetY = background.offsetY ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetY;
    return {
        left: textRect.left - paddingX + offsetX,
        top: textRect.top - paddingY + offsetY,
        width: textRect.width + paddingX * 2,
        height: textRect.height + paddingY * 2
    };
}
function getTextVisualRect({ textAlign, block, background, fontSizeRatio = 1 }) {
    const textRect = getTextRect({
        textAlign,
        block
    });
    const backgroundRect = getTextBackgroundRect({
        textAlign,
        block,
        background,
        fontSizeRatio
    });
    if (!backgroundRect) {
        return textRect;
    }
    const left = Math.min(textRect.left, backgroundRect.left);
    const top = Math.min(textRect.top, backgroundRect.top);
    const right = Math.max(textRect.left + textRect.width, backgroundRect.left + backgroundRect.width);
    const bottom = Math.max(textRect.top + textRect.height, backgroundRect.top + backgroundRect.height);
    return {
        left,
        top,
        width: right - left,
        height: bottom - top
    };
}
function drawTextDecoration({ ctx, textDecoration, lineWidth, lineY, metrics, scaledFontSize, textAlign }) {
    if (textDecoration === "none" || !textDecoration) return;
    const thickness = Math.max(1, scaledFontSize * TEXT_DECORATION_THICKNESS_RATIO);
    const ascent = getMetricAscent({
        metrics,
        fallbackFontSize: scaledFontSize
    });
    const descent = getMetricDescent({
        metrics,
        fallbackFontSize: scaledFontSize
    });
    let xStart = -lineWidth / 2;
    if (textAlign === "left") xStart = 0;
    if (textAlign === "right") xStart = -lineWidth;
    if (textDecoration === "underline") {
        const underlineY = lineY + descent + thickness;
        ctx.fillRect(xStart, underlineY, lineWidth, thickness);
    }
    if (textDecoration === "line-through") {
        const strikeY = lineY - (ascent - descent) * STRIKETHROUGH_VERTICAL_RATIO;
        ctx.fillRect(xStart, strikeY, lineWidth, thickness);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/text/typography.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TEXT_COLOR",
    ()=>DEFAULT_TEXT_COLOR,
    "FONT_SIZE_SCALE_REFERENCE",
    ()=>FONT_SIZE_SCALE_REFERENCE,
    "MAX_FONT_SIZE",
    ()=>MAX_FONT_SIZE,
    "MIN_FONT_SIZE",
    ()=>MIN_FONT_SIZE
]);
const MIN_FONT_SIZE = 5;
const MAX_FONT_SIZE = 300;
const DEFAULT_TEXT_COLOR = "#000000";
const FONT_SIZE_SCALE_REFERENCE = 90;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/text/primitives.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildTextFontString",
    ()=>buildTextFontString,
    "drawMeasuredTextLayout",
    ()=>drawMeasuredTextLayout,
    "measureTextLayout",
    ()=>measureTextLayout,
    "quoteFontFamily",
    ()=>quoteFontFamily,
    "resolveTextLayout",
    ()=>resolveTextLayout,
    "strokeMeasuredTextLayout",
    ()=>strokeMeasuredTextLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/math.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/typography.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function quoteFontFamily({ fontFamily }) {
    return `"${fontFamily.replace(/"/g, '\\"')}"`;
}
function buildTextFontString({ fontFamily, fontWeight, fontStyle, scaledFontSize }) {
    return `${fontStyle} ${fontWeight} ${scaledFontSize}px ${quoteFontFamily({
        fontFamily
    })}, sans-serif`;
}
function resolveTextLayout({ text, canvasHeight }) {
    const scaledFontSize = text.fontSize * (canvasHeight / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$typography$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FONT_SIZE_SCALE_REFERENCE"]);
    const fontWeight = text.fontWeight === "bold" ? "bold" : "normal";
    const fontStyle = text.fontStyle === "italic" ? "italic" : "normal";
    const letterSpacing = text.letterSpacing ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.letterSpacing;
    const lineHeightPx = scaledFontSize * (text.lineHeight ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.lineHeight);
    const fontSizeRatio = text.fontSize / 15;
    return {
        scaledFontSize,
        fontString: buildTextFontString({
            fontFamily: text.fontFamily,
            fontWeight,
            fontStyle,
            scaledFontSize
        }),
        letterSpacing,
        lineHeightPx,
        fontSizeRatio,
        textAlign: text.textAlign,
        textDecoration: text.textDecoration ?? "none"
    };
}
function measureTextLayout({ text, canvasHeight, ctx }) {
    const resolvedLayout = resolveTextLayout({
        text,
        canvasHeight
    });
    const lines = text.content.split("\n");
    ctx.save();
    ctx.font = resolvedLayout.fontString;
    ctx.textBaseline = "middle";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCanvasLetterSpacing"])({
        ctx,
        letterSpacingPx: resolvedLayout.letterSpacing
    });
    const lineMetrics = lines.map((line)=>ctx.measureText(line));
    ctx.restore();
    const block = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureTextBlock"])({
        lineMetrics,
        lineHeightPx: resolvedLayout.lineHeightPx
    });
    return {
        ...resolvedLayout,
        lines,
        lineMetrics,
        block
    };
}
function drawMeasuredTextLayout({ ctx, layout, textColor, background, backgroundColor, textBaseline = "middle" }) {
    ctx.font = layout.fontString;
    ctx.textAlign = layout.textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = textColor;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCanvasLetterSpacing"])({
        ctx,
        letterSpacingPx: layout.letterSpacing
    });
    if (background?.enabled && backgroundColor && backgroundColor !== "transparent" && layout.lines.length > 0) {
        const backgroundRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTextBackgroundRect"])({
            textAlign: layout.textAlign,
            block: layout.block,
            background: {
                ...background,
                color: backgroundColor
            },
            fontSizeRatio: layout.fontSizeRatio
        });
        if (backgroundRect) {
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])({
                value: background.cornerRadius,
                min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CORNER_RADIUS_MIN"],
                max: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CORNER_RADIUS_MAX"]
            }) / 100;
            const radius = Math.min(backgroundRect.width, backgroundRect.height) / 2 * p;
            ctx.fillStyle = backgroundColor;
            ctx.beginPath();
            ctx.roundRect(backgroundRect.left, backgroundRect.top, backgroundRect.width, backgroundRect.height, radius);
            ctx.fill();
            ctx.fillStyle = textColor;
        }
    }
    for(let index = 0; index < layout.lines.length; index++){
        const lineY = index * layout.lineHeightPx - layout.block.visualCenterOffset;
        ctx.fillText(layout.lines[index], 0, lineY);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawTextDecoration"])({
            ctx,
            textDecoration: layout.textDecoration,
            lineWidth: layout.lineMetrics[index].width,
            lineY,
            metrics: layout.lineMetrics[index],
            scaledFontSize: layout.scaledFontSize,
            textAlign: layout.textAlign
        });
    }
}
function strokeMeasuredTextLayout({ ctx, layout, strokeColor, strokeWidth, textBaseline = "middle" }) {
    ctx.font = layout.fontString;
    ctx.textAlign = layout.textAlign;
    ctx.textBaseline = textBaseline;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCanvasLetterSpacing"])({
        ctx,
        letterSpacingPx: layout.letterSpacing
    });
    for(let index = 0; index < layout.lines.length; index++){
        const lineY = index * layout.lineHeightPx - layout.block.visualCenterOffset;
        ctx.strokeText(layout.lines[index], 0, lineY);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/text/measure-element.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildTextBackgroundFromElement",
    ()=>buildTextBackgroundFromElement,
    "buildTextLayoutParamsFromElement",
    ()=>buildTextLayoutParamsFromElement,
    "getTextMeasurementContext",
    ()=>getTextMeasurementContext,
    "measureTextElement",
    ()=>measureTextElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/values.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/primitives.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
let textMeasurementContext = null;
function getTextMeasurementContext() {
    if (textMeasurementContext) {
        return textMeasurementContext;
    }
    if (typeof OffscreenCanvas !== "undefined") {
        const canvas = new OffscreenCanvas(1, 1);
        const context = canvas.getContext("2d");
        if (context) {
            textMeasurementContext = context;
            return context;
        }
    }
    if (typeof document !== "undefined") {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context) {
            textMeasurementContext = context;
            return context;
        }
    }
    throw new Error("Failed to create text measurement context");
}
function measureTextElement({ element, canvasHeight, localTime, ctx }) {
    const text = buildTextLayoutParamsFromElement({
        element
    });
    const measuredLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$primitives$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureTextLayout"])({
        text,
        canvasHeight,
        ctx
    });
    const bg = buildTextBackgroundFromElement({
        element
    });
    const resolvedBackground = {
        ...bg,
        paddingX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveNumberAtTime"])({
            baseValue: bg.paddingX ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingX,
            animations: element.animations,
            propertyPath: "background.paddingX",
            localTime
        }),
        paddingY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveNumberAtTime"])({
            baseValue: bg.paddingY ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingY,
            animations: element.animations,
            propertyPath: "background.paddingY",
            localTime
        }),
        offsetX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveNumberAtTime"])({
            baseValue: bg.offsetX ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetX,
            animations: element.animations,
            propertyPath: "background.offsetX",
            localTime
        }),
        offsetY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveNumberAtTime"])({
            baseValue: bg.offsetY ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetY,
            animations: element.animations,
            propertyPath: "background.offsetY",
            localTime
        }),
        cornerRadius: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveNumberAtTime"])({
            baseValue: bg.cornerRadius ?? __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CORNER_RADIUS_MIN"],
            animations: element.animations,
            propertyPath: "background.cornerRadius",
            localTime
        })
    };
    const visualRect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTextVisualRect"])({
        textAlign: text.textAlign,
        block: measuredLayout.block,
        background: resolvedBackground,
        fontSizeRatio: measuredLayout.fontSizeRatio
    });
    return {
        ...measuredLayout,
        resolvedBackground,
        visualRect
    };
}
function buildTextLayoutParamsFromElement({ element }) {
    return {
        content: readStringParam({
            params: element.params,
            key: "content",
            fallback: "Default text"
        }),
        fontSize: readNumberParam({
            params: element.params,
            key: "fontSize",
            fallback: 15
        }),
        fontFamily: readStringParam({
            params: element.params,
            key: "fontFamily",
            fallback: "Arial"
        }),
        fontWeight: readFontWeight({
            value: element.params.fontWeight,
            fallback: "normal"
        }),
        fontStyle: readFontStyle({
            value: element.params.fontStyle,
            fallback: "normal"
        }),
        textAlign: readTextAlign({
            value: element.params.textAlign,
            fallback: "center"
        }),
        textDecoration: readTextDecoration({
            value: element.params.textDecoration,
            fallback: "none"
        }),
        letterSpacing: readNumberParam({
            params: element.params,
            key: "letterSpacing",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.letterSpacing
        }),
        lineHeight: readNumberParam({
            params: element.params,
            key: "lineHeight",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.lineHeight
        })
    };
}
function buildTextBackgroundFromElement({ element }) {
    return {
        enabled: readBooleanParam({
            params: element.params,
            key: "background.enabled",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.enabled
        }),
        color: readStringParam({
            params: element.params,
            key: "background.color",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.color
        }),
        cornerRadius: readNumberParam({
            params: element.params,
            key: "background.cornerRadius",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.cornerRadius
        }),
        paddingX: readNumberParam({
            params: element.params,
            key: "background.paddingX",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingX
        }),
        paddingY: readNumberParam({
            params: element.params,
            key: "background.paddingY",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingY
        }),
        offsetX: readNumberParam({
            params: element.params,
            key: "background.offsetX",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetX
        }),
        offsetY: readNumberParam({
            params: element.params,
            key: "background.offsetY",
            fallback: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetY
        })
    };
}
function readStringParam({ params, key, fallback }) {
    const value = params[key];
    return typeof value === "string" ? value : fallback;
}
function readNumberParam({ params, key, fallback }) {
    const value = params[key];
    return typeof value === "number" ? value : fallback;
}
function readBooleanParam({ params, key, fallback }) {
    const value = params[key];
    return typeof value === "boolean" ? value : fallback;
}
function readTextAlign({ value, fallback }) {
    return value === "left" || value === "center" || value === "right" ? value : fallback;
}
function readFontWeight({ value, fallback }) {
    return value === "bold" || value === "normal" ? value : fallback;
}
function readFontStyle({ value, fallback }) {
    return value === "italic" || value === "normal" ? value : fallback;
}
function readTextDecoration({ value, fallback }) {
    return value === "none" || value === "underline" || value === "line-through" ? value : fallback;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/params/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DefinitionRegistry",
    ()=>DefinitionRegistry,
    "buildDefaultParamValues",
    ()=>buildDefaultParamValues,
    "buildElementParamValues",
    ()=>buildElementParamValues,
    "elementParamRegistry",
    ()=>elementParamRegistry,
    "getBuiltInElementParams",
    ()=>getBuiltInElementParams,
    "getElementParam",
    ()=>getElementParam,
    "getElementParams",
    ()=>getElementParams,
    "readElementParamValue",
    ()=>readElementParamValue,
    "writeElementParamValue",
    ()=>writeElementParamValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$transform$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/transform.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/text/background.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function buildDefaultParamValues(params) {
    const values = {};
    for (const param of params){
        values[param.key] = param.default;
    }
    return values;
}
class DefinitionRegistry {
    definitions = new Map();
    entityName;
    constructor(entityName){
        this.entityName = entityName;
    }
    register({ key, definition }) {
        this.definitions.set(key, definition);
    }
    has(key) {
        return this.definitions.has(key);
    }
    get(key) {
        const def = this.definitions.get(key);
        if (!def) {
            throw new Error(`Unknown ${this.entityName}: ${key}`);
        }
        return def;
    }
    getAll() {
        return Array.from(this.definitions.values());
    }
}
const BLEND_MODE_OPTIONS = [
    {
        value: "normal",
        label: "Normal"
    },
    {
        value: "darken",
        label: "Darken"
    },
    {
        value: "multiply",
        label: "Multiply"
    },
    {
        value: "color-burn",
        label: "Color Burn"
    },
    {
        value: "lighten",
        label: "Lighten"
    },
    {
        value: "screen",
        label: "Screen"
    },
    {
        value: "plus-lighter",
        label: "Plus Lighter"
    },
    {
        value: "color-dodge",
        label: "Color Dodge"
    },
    {
        value: "overlay",
        label: "Overlay"
    },
    {
        value: "soft-light",
        label: "Soft Light"
    },
    {
        value: "hard-light",
        label: "Hard Light"
    },
    {
        value: "difference",
        label: "Difference"
    },
    {
        value: "exclusion",
        label: "Exclusion"
    },
    {
        value: "hue",
        label: "Hue"
    },
    {
        value: "saturation",
        label: "Saturation"
    },
    {
        value: "color",
        label: "Color"
    },
    {
        value: "luminosity",
        label: "Luminosity"
    }
];
const visualElementParams = [
    {
        key: "transform.positionX",
        label: "Position X",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.transform.position.x,
        min: -100_000,
        step: 1
    },
    {
        key: "transform.positionY",
        label: "Position Y",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.transform.position.y,
        min: -100_000,
        step: 1
    },
    {
        key: "transform.scaleX",
        label: "Scale X",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.transform.scaleX,
        min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$transform$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_TRANSFORM_SCALE"],
        step: 0.01
    },
    {
        key: "transform.scaleY",
        label: "Scale Y",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.transform.scaleY,
        min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$transform$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_TRANSFORM_SCALE"],
        step: 0.01
    },
    {
        key: "transform.rotate",
        label: "Rotate",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.transform.rotate,
        min: -360,
        max: 360,
        step: 1
    },
    {
        key: "opacity",
        label: "Opacity",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.opacity,
        min: 0,
        max: 1,
        step: 0.01
    },
    {
        key: "blendMode",
        label: "Blend Mode",
        type: "select",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.blendMode,
        keyframable: false,
        options: BLEND_MODE_OPTIONS
    }
];
const audioElementParams = [
    {
        key: "volume",
        label: "Volume",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].element.volume,
        min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VOLUME_DB_MIN"],
        max: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VOLUME_DB_MAX"],
        step: 0.01
    },
    {
        key: "muted",
        label: "Muted",
        type: "boolean",
        default: false,
        keyframable: false
    }
];
const textElementParams = [
    {
        key: "content",
        label: "Content",
        type: "text",
        default: "Default text",
        keyframable: false
    },
    {
        key: "fontFamily",
        label: "Font Family",
        type: "font",
        default: "Arial",
        keyframable: false
    },
    {
        key: "fontSize",
        label: "Font Size",
        type: "number",
        default: 15,
        min: 1,
        step: 1
    },
    {
        key: "color",
        label: "Color",
        type: "color",
        default: "#ffffff"
    },
    {
        key: "textAlign",
        label: "Text Align",
        type: "select",
        default: "center",
        keyframable: false,
        options: [
            {
                value: "left",
                label: "Left"
            },
            {
                value: "center",
                label: "Center"
            },
            {
                value: "right",
                label: "Right"
            }
        ]
    },
    {
        key: "fontWeight",
        label: "Font Weight",
        type: "select",
        default: "normal",
        keyframable: false,
        options: [
            {
                value: "normal",
                label: "Normal"
            },
            {
                value: "bold",
                label: "Bold"
            }
        ]
    },
    {
        key: "fontStyle",
        label: "Font Style",
        type: "select",
        default: "normal",
        keyframable: false,
        options: [
            {
                value: "normal",
                label: "Normal"
            },
            {
                value: "italic",
                label: "Italic"
            }
        ]
    },
    {
        key: "textDecoration",
        label: "Text Decoration",
        type: "select",
        default: "none",
        keyframable: false,
        options: [
            {
                value: "none",
                label: "None"
            },
            {
                value: "underline",
                label: "Underline"
            },
            {
                value: "line-through",
                label: "Line Through"
            }
        ]
    },
    {
        key: "letterSpacing",
        label: "Letter Spacing",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.letterSpacing,
        min: -100,
        step: 0.1
    },
    {
        key: "lineHeight",
        label: "Line Height",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.lineHeight,
        min: 0.1,
        step: 0.1
    },
    {
        key: "background.enabled",
        label: "Background Enabled",
        type: "boolean",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.enabled,
        keyframable: false
    },
    {
        key: "background.color",
        label: "Background Color",
        type: "color",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.color,
        dependencies: [
            {
                param: "background.enabled",
                equals: true
            }
        ]
    },
    {
        key: "background.cornerRadius",
        label: "Background Radius",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.cornerRadius,
        min: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CORNER_RADIUS_MIN"],
        max: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$text$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CORNER_RADIUS_MAX"],
        step: 1,
        dependencies: [
            {
                param: "background.enabled",
                equals: true
            }
        ]
    },
    {
        key: "background.paddingX",
        label: "Background Padding X",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingX,
        min: 0,
        step: 1,
        dependencies: [
            {
                param: "background.enabled",
                equals: true
            }
        ]
    },
    {
        key: "background.paddingY",
        label: "Background Padding Y",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.paddingY,
        min: 0,
        step: 1,
        dependencies: [
            {
                param: "background.enabled",
                equals: true
            }
        ]
    },
    {
        key: "background.offsetX",
        label: "Background Offset X",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetX,
        min: -100_000,
        step: 1,
        dependencies: [
            {
                param: "background.enabled",
                equals: true
            }
        ]
    },
    {
        key: "background.offsetY",
        label: "Background Offset Y",
        type: "number",
        default: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULTS"].text.background.offsetY,
        min: -100_000,
        step: 1,
        dependencies: [
            {
                param: "background.enabled",
                equals: true
            }
        ]
    }
];
const elementParamRegistry = new DefinitionRegistry("element params");
elementParamRegistry.register({
    key: "video",
    definition: [
        ...visualElementParams,
        ...audioElementParams
    ]
});
elementParamRegistry.register({
    key: "image",
    definition: visualElementParams
});
elementParamRegistry.register({
    key: "text",
    definition: [
        ...textElementParams,
        ...visualElementParams
    ]
});
elementParamRegistry.register({
    key: "sticker",
    definition: visualElementParams
});
elementParamRegistry.register({
    key: "graphic",
    definition: visualElementParams
});
elementParamRegistry.register({
    key: "audio",
    definition: audioElementParams
});
elementParamRegistry.register({
    key: "effect",
    definition: []
});
function getElementParams({ element }) {
    return elementParamRegistry.has(element.type) ? elementParamRegistry.get(element.type) : [];
}
function getBuiltInElementParams({ type }) {
    return elementParamRegistry.has(type) ? elementParamRegistry.get(type) : [];
}
function getElementParam({ element, key }) {
    return getElementParams({
        element
    }).find((param)=>param.key === key) ?? null;
}
function readElementParamValue({ element, param }) {
    if (param.read) {
        return param.read({
            element
        });
    }
    if ("params" in element) {
        return element.params[param.key] ?? param.default;
    }
    return null;
}
function writeElementParamValue({ element, param, value }) {
    if (param.write) {
        return param.write({
            element,
            value
        });
    }
    if ("params" in element) {
        return {
            ...element,
            params: {
                ...element.params,
                [param.key]: value
            }
        };
    }
    return element;
}
function buildElementParamValues({ element }) {
    const values = {};
    for (const param of getElementParams({
        element
    })){
        const value = readElementParamValue({
            element,
            param
        });
        if (value !== null) {
            values[param.key] = value;
        }
    }
    return values;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/params/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BOOLEAN_CHANNEL_LAYOUT",
    ()=>BOOLEAN_CHANNEL_LAYOUT,
    "COLOR_CHANNEL_LAYOUT",
    ()=>COLOR_CHANNEL_LAYOUT,
    "NUMBER_CHANNEL_LAYOUT",
    ()=>NUMBER_CHANNEL_LAYOUT,
    "STRING_CHANNEL_LAYOUT",
    ()=>STRING_CHANNEL_LAYOUT,
    "coerceParamValue",
    ()=>coerceParamValue,
    "formatLinearRgba",
    ()=>formatLinearRgba,
    "getParamChannelLayout",
    ()=>getParamChannelLayout,
    "getParamDefaultInterpolation",
    ()=>getParamDefaultInterpolation,
    "getParamNumericRange",
    ()=>getParamNumericRange,
    "getParamValueKind",
    ()=>getParamValueKind,
    "parseColorToLinearRgba",
    ()=>parseColorToLinearRgba
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/converter.js [app-client] (ecmascript) <export default as converter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/culori@4.0.2/node_modules/culori/src/parse.js [app-client] (ecmascript) <export default as parse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/math.ts [app-client] (ecmascript)");
;
;
const toRgb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__["converter"])("rgb");
function srgbToLinear({ value }) {
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}
function linearToSrgb({ value }) {
    const clamped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])({
        value,
        min: 0,
        max: 1
    });
    return clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
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
        a: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])({
            value: rgb.alpha ?? 1,
            min: 0,
            max: 1
        })
    };
}
function formatLinearRgba({ color }) {
    const rgb = {
        mode: "rgb",
        r: linearToSrgb({
            value: color.r
        }),
        g: linearToSrgb({
            value: color.g
        }),
        b: linearToSrgb({
            value: color.b
        }),
        alpha: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])({
            value: color.a,
            min: 0,
            max: 1
        })
    };
    return rgb.alpha < 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex8"])(rgb) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$culori$40$4$2e$0$2e$2$2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(rgb);
}
function createLeafChannelLayout({ valueKind, defaultInterpolation }) {
    return {
        kind: "leaf",
        component: {
            key: "value",
            valueKind,
            defaultInterpolation
        },
        easingMode: "independent",
        decompose: (value)=>({
                value
            }),
        compose: ({ value })=>value ?? null
    };
}
const NUMBER_CHANNEL_LAYOUT = createLeafChannelLayout({
    valueKind: "scalar",
    defaultInterpolation: "linear"
});
const BOOLEAN_CHANNEL_LAYOUT = createLeafChannelLayout({
    valueKind: "discrete",
    defaultInterpolation: "hold"
});
const STRING_CHANNEL_LAYOUT = createLeafChannelLayout({
    valueKind: "discrete",
    defaultInterpolation: "hold"
});
const colorComponent = (key)=>({
        key,
        valueKind: "scalar",
        defaultInterpolation: "linear"
    });
const COLOR_CHANNEL_LAYOUT = {
    kind: "composite",
    components: [
        colorComponent("r"),
        colorComponent("g"),
        colorComponent("b"),
        colorComponent("a")
    ],
    easingMode: "shared",
    decompose: (value)=>parseColorToLinearRgba({
            color: value
        }),
    compose: ({ r, g, b, a })=>typeof r === "number" && typeof g === "number" && typeof b === "number" && typeof a === "number" ? formatLinearRgba({
            color: {
                r,
                g,
                b,
                a
            }
        }) : null
};
function getParamChannelLayout({ param }) {
    switch(param.type){
        case "number":
            return param.channels ?? NUMBER_CHANNEL_LAYOUT;
        case "boolean":
            return param.channels ?? BOOLEAN_CHANNEL_LAYOUT;
        case "color":
            return param.channels ?? COLOR_CHANNEL_LAYOUT;
        case "select":
        case "text":
        case "font":
            return param.channels ?? STRING_CHANNEL_LAYOUT;
        default:
            {
                const exhaustive = param;
                return exhaustive;
            }
    }
}
function getParamValueKind({ param }) {
    const layout = getParamChannelLayout({
        param
    });
    if (layout.kind === "composite") {
        return "color";
    }
    if (layout.component.valueKind === "scalar") {
        return "number";
    }
    return "discrete";
}
function getParamDefaultInterpolation({ param }) {
    const layout = getParamChannelLayout({
        param
    });
    if (layout.kind === "leaf") {
        return layout.component.defaultInterpolation;
    }
    return layout.components[0]?.defaultInterpolation ?? "linear";
}
function getParamNumericRange({ param }) {
    if (param.type !== "number") {
        return undefined;
    }
    return {
        min: param.min,
        max: param.max,
        step: param.step
    };
}
function coerceParamValue({ param, value }) {
    switch(param.type){
        case "number":
            {
                if (typeof value !== "number" || Number.isNaN(value)) {
                    return null;
                }
                const steppedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$math$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snapToStep"])({
                    value,
                    step: param.step
                });
                const maxValue = param.max ?? Number.POSITIVE_INFINITY;
                return Math.min(maxValue, Math.max(param.min, steppedValue));
            }
        case "boolean":
            return typeof value === "boolean" ? value : null;
        case "color":
        case "text":
        case "font":
            return typeof value === "string" ? value : null;
        case "select":
            return typeof value === "string" && param.options.some((option)=>option.value === value) ? value : null;
        default:
            {
                const exhaustive = param;
                return exhaustive;
            }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/effects/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "EffectsRegistry",
    ()=>EffectsRegistry,
    "effectsRegistry",
    ()=>effectsRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class EffectsRegistry extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefinitionRegistry"] {
    constructor(){
        super("effect");
    }
}
const effectsRegistry = new EffectsRegistry();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/effects/definitions/blur.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GAUSSIAN_BLUR_SHADER",
    ()=>GAUSSIAN_BLUR_SHADER,
    "INTENSITY_TO_SIGMA_DIVISOR",
    ()=>INTENSITY_TO_SIGMA_DIVISOR,
    "blurEffectDefinition",
    ()=>blurEffectDefinition,
    "buildGaussianBlurPasses",
    ()=>buildGaussianBlurPasses,
    "intensityToSigma",
    ()=>intensityToSigma
]);
const GAUSSIAN_BLUR_SHADER = "gaussian-blur";
const MAX_SINGLE_PASS_SIGMA = 10;
const MAX_STEP = 4;
const MAX_EFFECTIVE_SIGMA = MAX_SINGLE_PASS_SIGMA * MAX_STEP;
const MAX_ITERATIONS = 8;
function buildGaussianBlurPasses({ sigmaX, sigmaY }) {
    const maxSigma = Math.max(sigmaX, sigmaY);
    if (maxSigma < 0.001) return [];
    const iterations = Math.min(MAX_ITERATIONS, Math.max(1, Math.ceil(maxSigma * maxSigma / (MAX_EFFECTIVE_SIGMA * MAX_EFFECTIVE_SIGMA))));
    const perPassSigmaX = sigmaX / Math.sqrt(iterations);
    const perPassSigmaY = sigmaY / Math.sqrt(iterations);
    const stepX = Math.max(1, perPassSigmaX / MAX_SINGLE_PASS_SIGMA);
    const stepY = Math.max(1, perPassSigmaY / MAX_SINGLE_PASS_SIGMA);
    const passes = [];
    for(let i = 0; i < iterations; i++){
        passes.push({
            shader: GAUSSIAN_BLUR_SHADER,
            uniforms: {
                u_sigma: perPassSigmaX,
                u_step: stepX,
                u_direction: [
                    1,
                    0
                ]
            }
        });
        passes.push({
            shader: GAUSSIAN_BLUR_SHADER,
            uniforms: {
                u_sigma: perPassSigmaY,
                u_step: stepY,
                u_direction: [
                    0,
                    1
                ]
            }
        });
    }
    return passes;
}
const INTENSITY_TO_SIGMA_DIVISOR = 5;
function intensityToSigma({ intensity, resolution, reference }) {
    return intensity / INTENSITY_TO_SIGMA_DIVISOR * (resolution / reference);
}
function parseIntensity(effectParams) {
    const raw = effectParams.intensity;
    return typeof raw === "number" ? raw : Number.parseFloat(String(raw));
}
const blurEffectDefinition = {
    type: "blur",
    name: "Blur",
    keywords: [
        "blur",
        "soft",
        "defocus"
    ],
    params: [
        {
            key: "intensity",
            label: "Intensity",
            type: "number",
            default: 15,
            min: 0,
            max: 100,
            step: 1
        }
    ],
    renderer: {
        passes: [
            {
                shader: GAUSSIAN_BLUR_SHADER,
                uniforms: ({ effectParams, width })=>({
                        u_sigma: Math.max(intensityToSigma({
                            intensity: parseIntensity(effectParams),
                            resolution: width,
                            reference: 1920
                        }), 0.001),
                        u_step: 1,
                        u_direction: [
                            1,
                            0
                        ]
                    })
            },
            {
                shader: GAUSSIAN_BLUR_SHADER,
                uniforms: ({ effectParams, height })=>({
                        u_sigma: Math.max(intensityToSigma({
                            intensity: parseIntensity(effectParams),
                            resolution: height,
                            reference: 1080
                        }), 0.001),
                        u_step: 1,
                        u_direction: [
                            0,
                            1
                        ]
                    })
            }
        ],
        buildPasses: ({ effectParams, width, height })=>{
            const intensity = parseIntensity(effectParams);
            return buildGaussianBlurPasses({
                sigmaX: intensityToSigma({
                    intensity,
                    resolution: width,
                    reference: 1920
                }),
                sigmaY: intensityToSigma({
                    intensity,
                    resolution: height,
                    reference: 1080
                })
            });
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/effects/definitions/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "registerDefaultEffects",
    ()=>registerDefaultEffects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/definitions/blur.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const defaultEffects = [
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$blur$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blurEffectDefinition"]
];
function registerDefaultEffects() {
    for (const definition of defaultEffects){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectsRegistry"].has(definition.type)) {
            continue;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectsRegistry"].register({
            key: definition.type,
            definition
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/effects/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "EFFECT_TARGET_ELEMENT_TYPES",
    ()=>EFFECT_TARGET_ELEMENT_TYPES,
    "buildDefaultEffectInstance",
    ()=>buildDefaultEffectInstance,
    "resolveEffectPasses",
    ()=>resolveEffectPasses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/effects/definitions/index.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function resolveEffectPasses({ definition, effectParams, width, height }) {
    if (definition.renderer.buildPasses) {
        return definition.renderer.buildPasses({
            effectParams,
            width,
            height
        });
    }
    return definition.renderer.passes.map((pass)=>({
            shader: pass.shader,
            uniforms: pass.uniforms({
                effectParams,
                width,
                height
            })
        }));
}
const EFFECT_TARGET_ELEMENT_TYPES = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VISUAL_ELEMENT_TYPES"];
function buildDefaultEffectInstance({ effectType }) {
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$effects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectsRegistry"].get(effectType);
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDefaultParamValues"])(definition.params);
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUUID"])(),
        type: effectType,
        params,
        enabled: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/graphics/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GraphicsRegistry",
    ()=>GraphicsRegistry,
    "graphicsRegistry",
    ()=>graphicsRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class GraphicsRegistry extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefinitionRegistry"] {
    constructor(){
        super("graphic");
    }
}
const graphicsRegistry = new GraphicsRegistry();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/graphics/stroke.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyAlignedStroke",
    ()=>applyAlignedStroke
]);
function createTempCanvas({ width, height }) {
    try {
        return new OffscreenCanvas(width, height);
    } catch  {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
}
function applyStroke({ ctx, path, strokeWidth, strokeColor }) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke(path);
}
function applyAlignedStroke({ ctx, path, strokeWidth, strokeAlign, strokeColor }) {
    if (strokeWidth <= 0) {
        return;
    }
    if (strokeAlign === "inside") {
        ctx.save();
        ctx.clip(path);
        applyStroke({
            ctx,
            path,
            strokeWidth: strokeWidth * 2,
            strokeColor
        });
        ctx.restore();
        return;
    }
    if (strokeAlign === "outside") {
        const strokeCanvas = createTempCanvas({
            width: ctx.canvas.width,
            height: ctx.canvas.height
        });
        const strokeCtx = strokeCanvas.getContext("2d");
        if (!strokeCtx) {
            return;
        }
        applyStroke({
            ctx: strokeCtx,
            path,
            strokeWidth: strokeWidth * 2,
            strokeColor
        });
        // Keep only the outer half of the doubled stroke so alpha fills do not
        // leave a visible inner stroke behind.
        strokeCtx.globalCompositeOperation = "destination-out";
        strokeCtx.fill(path);
        ctx.drawImage(strokeCanvas, 0, 0);
        return;
    }
    applyStroke({
        ctx,
        path,
        strokeWidth,
        strokeColor
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/graphics/definitions/shared.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STROKE_ALIGN_PARAM",
    ()=>STROKE_ALIGN_PARAM
]);
const STROKE_ALIGN_PARAM = {
    key: "strokeAlign",
    label: "Stroke align",
    type: "select",
    default: "center",
    group: "stroke",
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
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/graphics/definitions/ellipse.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ellipseGraphicDefinition",
    ()=>ellipseGraphicDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/stroke.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/shared.ts [app-client] (ecmascript)");
;
;
const ELLIPSE_PARAMS = [
    {
        key: "fill",
        label: "Fill",
        type: "color",
        default: "#ffffff"
    },
    {
        key: "stroke",
        label: "Color",
        type: "color",
        default: "#000000",
        group: "stroke"
    },
    {
        key: "strokeWidth",
        label: "Width",
        type: "number",
        default: 0,
        min: 0,
        max: 64,
        step: 1,
        shortLabel: "W",
        group: "stroke"
    },
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_ALIGN_PARAM"]
];
const ellipseGraphicDefinition = {
    id: "ellipse",
    name: "Ellipse",
    keywords: [
        "ellipse",
        "circle",
        "oval"
    ],
    params: ELLIPSE_PARAMS,
    render ({ ctx, params, width, height }) {
        const fill = String(params.fill ?? "#ffffff");
        const stroke = String(params.stroke ?? "#000000");
        const strokeWidth = Math.max(0, Number(params.strokeWidth ?? 0));
        const strokeAlign = params.strokeAlign ?? "center";
        const inset = strokeAlign === "center" ? strokeWidth / 2 : 0;
        const centerX = width / 2;
        const centerY = height / 2;
        const radiusX = Math.max(1, width / 2 - inset);
        const radiusY = Math.max(1, height / 2 - inset);
        ctx.clearRect(0, 0, width, height);
        const path = new Path2D();
        path.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill(path);
        if (strokeWidth > 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyAlignedStroke"])({
                ctx,
                path,
                strokeWidth,
                strokeAlign,
                strokeColor: stroke
            });
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/graphics/definitions/polygon.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "polygonGraphicDefinition",
    ()=>polygonGraphicDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/stroke.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/shared.ts [app-client] (ecmascript)");
;
;
const POLYGON_PARAMS = [
    {
        key: "fill",
        label: "Fill",
        type: "color",
        default: "#ffffff"
    },
    {
        key: "stroke",
        label: "Color",
        type: "color",
        default: "#000000",
        group: "stroke"
    },
    {
        key: "strokeWidth",
        label: "Width",
        type: "number",
        default: 0,
        min: 0,
        max: 64,
        step: 1,
        shortLabel: "W",
        group: "stroke"
    },
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_ALIGN_PARAM"],
    {
        key: "sides",
        label: "Sides",
        type: "number",
        default: 5,
        min: 3,
        max: 12,
        step: 1,
        shortLabel: "S"
    },
    {
        key: "cornerRadius",
        label: "Corner radius",
        type: "number",
        default: 0,
        min: 0,
        max: 50,
        step: 1,
        shortLabel: "R"
    }
];
function buildPolygonVertices({ centerX, centerY, radius, sides }) {
    return Array.from({
        length: sides
    }, (_, index)=>{
        const angle = -Math.PI / 2 + index * Math.PI * 2 / sides;
        return {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
        };
    });
}
function distance({ a, b }) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}
function normalize(point) {
    const length = Math.hypot(point.x, point.y) || 1;
    return {
        x: point.x / length,
        y: point.y / length
    };
}
function traceRoundedPolygonPath({ path, vertices, radius }) {
    if (vertices.length < 3) {
        return;
    }
    if (radius <= 0) {
        path.moveTo(vertices[0].x, vertices[0].y);
        for(let index = 1; index < vertices.length; index++){
            path.lineTo(vertices[index].x, vertices[index].y);
        }
        path.closePath();
        return;
    }
    for(let index = 0; index < vertices.length; index++){
        const previous = vertices[(index - 1 + vertices.length) % vertices.length];
        const current = vertices[index];
        const next = vertices[(index + 1) % vertices.length];
        const toPrevious = normalize({
            x: previous.x - current.x,
            y: previous.y - current.y
        });
        const toNext = normalize({
            x: next.x - current.x,
            y: next.y - current.y
        });
        const angle = Math.acos(Math.max(-1, Math.min(1, toPrevious.x * toNext.x + toPrevious.y * toNext.y)));
        const maxOffset = Math.min(distance({
            a: previous,
            b: current
        }), distance({
            a: current,
            b: next
        })) / 2;
        const tangentOffset = Math.min(radius / Math.tan(angle / 2), maxOffset);
        const start = {
            x: current.x + toPrevious.x * tangentOffset,
            y: current.y + toPrevious.y * tangentOffset
        };
        const end = {
            x: current.x + toNext.x * tangentOffset,
            y: current.y + toNext.y * tangentOffset
        };
        if (index === 0) {
            path.moveTo(start.x, start.y);
        } else {
            path.lineTo(start.x, start.y);
        }
        path.arcTo(current.x, current.y, end.x, end.y, Math.min(radius, maxOffset));
    }
    path.closePath();
}
const polygonGraphicDefinition = {
    id: "polygon",
    name: "Polygon",
    keywords: [
        "polygon",
        "triangle",
        "pentagon",
        "hexagon",
        "diamond"
    ],
    params: POLYGON_PARAMS,
    render ({ ctx, params, width, height }) {
        const fill = String(params.fill ?? "#ffffff");
        const stroke = String(params.stroke ?? "#000000");
        const strokeWidth = Math.max(0, Number(params.strokeWidth ?? 0));
        const strokeAlign = params.strokeAlign ?? "center";
        const sides = Math.max(3, Math.min(12, Math.round(Number(params.sides ?? 5))));
        const inset = strokeAlign === "center" ? strokeWidth / 2 : 0;
        const radius = Math.max(1, Math.min(width, height) / 2 - inset);
        const maxCornerRadius = radius * Math.sin(Math.PI / sides);
        const cornerRadiusPercent = Math.max(0, Number(params.cornerRadius ?? 0));
        const cornerRadius = maxCornerRadius * Math.min(cornerRadiusPercent, 50) / 50;
        const vertices = buildPolygonVertices({
            centerX: width / 2,
            centerY: height / 2,
            radius,
            sides
        });
        ctx.clearRect(0, 0, width, height);
        const path = new Path2D();
        traceRoundedPolygonPath({
            path,
            vertices,
            radius: cornerRadius
        });
        ctx.fillStyle = fill;
        ctx.fill(path);
        if (strokeWidth > 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyAlignedStroke"])({
                ctx,
                path,
                strokeWidth,
                strokeAlign,
                strokeColor: stroke
            });
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/graphics/definitions/rectangle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rectangleGraphicDefinition",
    ()=>rectangleGraphicDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/stroke.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/shared.ts [app-client] (ecmascript)");
;
;
const RECTANGLE_PARAMS = [
    {
        key: "fill",
        label: "Fill",
        type: "color",
        default: "#ffffff"
    },
    {
        key: "stroke",
        label: "Color",
        type: "color",
        default: "#000000",
        group: "stroke"
    },
    {
        key: "strokeWidth",
        label: "Width",
        type: "number",
        default: 0,
        min: 0,
        max: 64,
        step: 1,
        shortLabel: "W",
        group: "stroke"
    },
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_ALIGN_PARAM"],
    {
        key: "cornerRadius",
        label: "Corner radius",
        type: "number",
        default: 0,
        min: 0,
        max: 50,
        step: 1,
        shortLabel: "R"
    }
];
const rectangleGraphicDefinition = {
    id: "rectangle",
    name: "Rectangle",
    keywords: [
        "rectangle",
        "square",
        "box"
    ],
    params: RECTANGLE_PARAMS,
    render ({ ctx, params, width, height }) {
        const fill = String(params.fill ?? "#ffffff");
        const stroke = String(params.stroke ?? "#000000");
        const strokeWidth = Math.max(0, Number(params.strokeWidth ?? 0));
        const strokeAlign = params.strokeAlign ?? "center";
        const inset = strokeAlign === "center" ? strokeWidth / 2 : 0;
        const drawWidth = Math.max(1, width - inset * 2);
        const drawHeight = Math.max(1, height - inset * 2);
        const radiusPercent = Math.max(0, Number(params.cornerRadius ?? 0));
        const radius = Math.min(drawWidth, drawHeight) / 2 * Math.min(radiusPercent, 50) / 50;
        ctx.clearRect(0, 0, width, height);
        const path = new Path2D();
        path.roundRect(inset, inset, drawWidth, drawHeight, radius);
        ctx.fillStyle = fill;
        ctx.fill(path);
        if (strokeWidth > 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyAlignedStroke"])({
                ctx,
                path,
                strokeWidth,
                strokeAlign,
                strokeColor: stroke
            });
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/graphics/definitions/star.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "starGraphicDefinition",
    ()=>starGraphicDefinition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/stroke.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/shared.ts [app-client] (ecmascript)");
;
;
const STAR_PARAMS = [
    {
        key: "fill",
        label: "Fill",
        type: "color",
        default: "#ffffff"
    },
    {
        key: "stroke",
        label: "Color",
        type: "color",
        default: "#000000",
        group: "stroke"
    },
    {
        key: "strokeWidth",
        label: "Width",
        type: "number",
        default: 0,
        min: 0,
        max: 64,
        step: 1,
        shortLabel: "W",
        group: "stroke"
    },
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STROKE_ALIGN_PARAM"],
    {
        key: "points",
        label: "Points",
        type: "number",
        default: 5,
        min: 3,
        max: 12,
        step: 1,
        shortLabel: "P"
    },
    {
        key: "depth",
        label: "Depth",
        type: "number",
        default: 45,
        min: 1,
        max: 99,
        step: 1,
        shortLabel: "D"
    }
];
const starGraphicDefinition = {
    id: "star",
    name: "Star",
    keywords: [
        "star",
        "sparkle",
        "burst"
    ],
    params: STAR_PARAMS,
    render ({ ctx, params, width, height }) {
        const fill = String(params.fill ?? "#ffffff");
        const stroke = String(params.stroke ?? "#000000");
        const strokeWidth = Math.max(0, Number(params.strokeWidth ?? 0));
        const strokeAlign = params.strokeAlign ?? "center";
        const points = Math.max(3, Math.min(12, Math.round(Number(params.points ?? 5))));
        const depth = Math.max(1, Math.min(99, Number(params.depth ?? 45))) / 100;
        const inset = strokeAlign === "center" ? strokeWidth / 2 : 0;
        const outerRadius = Math.max(1, Math.min(width, height) / 2 - inset);
        const innerRadius = outerRadius * depth;
        const centerX = width / 2;
        const centerY = height / 2;
        ctx.clearRect(0, 0, width, height);
        const path = new Path2D();
        for(let index = 0; index < points * 2; index++){
            const radius = index % 2 === 0 ? outerRadius : innerRadius;
            const angle = -Math.PI / 2 + index * Math.PI / points;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            if (index === 0) {
                path.moveTo(x, y);
            } else {
                path.lineTo(x, y);
            }
        }
        path.closePath();
        ctx.fillStyle = fill;
        ctx.fill(path);
        if (strokeWidth > 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$stroke$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyAlignedStroke"])({
                ctx,
                path,
                strokeWidth,
                strokeAlign,
                strokeColor: stroke
            });
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/graphics/definitions/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "registerDefaultGraphics",
    ()=>registerDefaultGraphics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$ellipse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/ellipse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$polygon$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/polygon.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$rectangle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/rectangle.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$star$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/star.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/shared.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const defaultGraphicDefinitions = [
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$rectangle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rectangleGraphicDefinition"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$ellipse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ellipseGraphicDefinition"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$polygon$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygonGraphicDefinition"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$star$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starGraphicDefinition"]
];
function registerDefaultGraphics() {
    for (const definition of defaultGraphicDefinitions){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphicsRegistry"].has(definition.id)) {
            continue;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphicsRegistry"].register({
            key: definition.id,
            definition
        });
    }
}
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/graphics/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_GRAPHIC_SOURCE_SIZE",
    ()=>DEFAULT_GRAPHIC_SOURCE_SIZE
]);
const DEFAULT_GRAPHIC_SOURCE_SIZE = 512;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/graphics/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildDefaultGraphicInstance",
    ()=>buildDefaultGraphicInstance,
    "buildGraphicPreviewUrl",
    ()=>buildGraphicPreviewUrl,
    "getGraphicDefinition",
    ()=>getGraphicDefinition,
    "resolveGraphicElementParamsAtTime",
    ()=>resolveGraphicElementParamsAtTime,
    "resolveGraphicParams",
    ()=>resolveGraphicParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/graphic-param-channel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$ellipse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/ellipse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$polygon$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/polygon.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$rectangle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/rectangle.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$star$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/star.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/types.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const graphicPreviewUrlCache = new Map();
const FALLBACK_CORNER_RADIUS_RATIO = 0.2;
const FALLBACK_FILL_OPACITY = 0.08;
const FALLBACK_MIN_FONT_SIZE = 12;
const FALLBACK_FONT_SIZE_RATIO = 0.15;
function buildFallbackPreviewUrl({ name, size }) {
    const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
			<rect width="${size}" height="${size}" rx="${size * FALLBACK_CORNER_RADIUS_RATIO}" fill="white" fill-opacity="${FALLBACK_FILL_OPACITY}" />
			<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="${Math.max(FALLBACK_MIN_FONT_SIZE, size * FALLBACK_FONT_SIZE_RATIO)}" font-family="sans-serif">${name}</text>
		</svg>
	`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function getGraphicDefinition({ definitionId }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerDefaultGraphics"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphicsRegistry"].get(definitionId);
}
function buildDefaultGraphicInstance({ definitionId }) {
    const definition = getGraphicDefinition({
        definitionId
    });
    return {
        definitionId,
        params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDefaultParamValues"])(definition.params)
    };
}
function resolveGraphicParams({ definition, params }) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildDefaultParamValues"])(definition.params),
        ...params ?? {}
    };
}
function resolveGraphicElementParamsAtTime({ element, localTime }) {
    const definition = getGraphicDefinition({
        definitionId: element.definitionId
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$graphic$2d$param$2d$channel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveGraphicParamsAtTime"])({
        params: resolveGraphicParams({
            definition,
            params: element.params
        }),
        definitions: definition.params,
        animations: element.animations,
        localTime
    });
}
function buildGraphicPreviewUrl({ definitionId, params, size = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRAPHIC_SOURCE_SIZE"] }) {
    const definition = getGraphicDefinition({
        definitionId
    });
    const resolvedParams = resolveGraphicParams({
        definition,
        params
    });
    const cacheKey = JSON.stringify({
        definitionId,
        resolvedParams,
        size
    });
    const cachedUrl = graphicPreviewUrlCache.get(cacheKey);
    if (cachedUrl) {
        return cachedUrl;
    }
    if (typeof document === "undefined") {
        return buildFallbackPreviewUrl({
            name: definition.name,
            size
        });
    }
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return buildFallbackPreviewUrl({
            name: definition.name,
            size
        });
    }
    definition.render({
        ctx,
        params: resolvedParams,
        width: size,
        height: size
    });
    const previewUrl = canvas.toDataURL("image/png");
    graphicPreviewUrlCache.set(cacheKey, previewUrl);
    return previewUrl;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/fps/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "floatToFrameRate",
    ()=>floatToFrameRate,
    "frameRateToFloat",
    ()=>frameRateToFloat,
    "frameRatesEqual",
    ()=>frameRatesEqual,
    "getHighestImportedVideoFps",
    ()=>getHighestImportedVideoFps,
    "getRaisedProjectFpsForImportedMedia",
    ()=>getRaisedProjectFpsForImportedMedia
]);
const STANDARD_FRAME_RATES = [
    {
        value: 24_000 / 1_001,
        rate: {
            numerator: 24_000,
            denominator: 1_001
        }
    },
    {
        value: 24,
        rate: {
            numerator: 24,
            denominator: 1
        }
    },
    {
        value: 25,
        rate: {
            numerator: 25,
            denominator: 1
        }
    },
    {
        value: 30_000 / 1_001,
        rate: {
            numerator: 30_000,
            denominator: 1_001
        }
    },
    {
        value: 30,
        rate: {
            numerator: 30,
            denominator: 1
        }
    },
    {
        value: 48,
        rate: {
            numerator: 48,
            denominator: 1
        }
    },
    {
        value: 50,
        rate: {
            numerator: 50,
            denominator: 1
        }
    },
    {
        value: 60_000 / 1_001,
        rate: {
            numerator: 60_000,
            denominator: 1_001
        }
    },
    {
        value: 60,
        rate: {
            numerator: 60,
            denominator: 1
        }
    },
    {
        value: 120,
        rate: {
            numerator: 120,
            denominator: 1
        }
    }
];
const STANDARD_FRAME_RATE_TOLERANCE = 0.01;
function frameRateToFloat(rate) {
    return rate.numerator / rate.denominator;
}
function frameRatesEqual({ a, b }) {
    return a.numerator === b.numerator && a.denominator === b.denominator;
}
function floatToFrameRate(fps) {
    const standard = STANDARD_FRAME_RATES.find((candidate)=>Math.abs(fps - candidate.value) <= STANDARD_FRAME_RATE_TOLERANCE);
    if (standard) return standard.rate;
    if (Number.isInteger(fps)) {
        return {
            numerator: fps,
            denominator: 1
        };
    }
    const ARBITRARY_DENOMINATOR = 1_000_000;
    const scaledNumerator = Math.round(fps * ARBITRARY_DENOMINATOR);
    const divisor = gcd({
        left: scaledNumerator,
        right: ARBITRARY_DENOMINATOR
    });
    return {
        numerator: scaledNumerator / divisor,
        denominator: ARBITRARY_DENOMINATOR / divisor
    };
}
function gcd({ left, right }) {
    let a = Math.abs(left);
    let b = Math.abs(right);
    while(b !== 0){
        const remainder = a % b;
        a = b;
        b = remainder;
    }
    return a || 1;
}
function getHighestImportedVideoFps({ mediaAssets }) {
    let highestFps = null;
    for (const asset of mediaAssets){
        const fps = asset.fps ?? Number.NaN;
        if (asset.type !== "video") continue;
        if (!Number.isFinite(fps) || fps <= 0) continue;
        highestFps = highestFps === null ? fps : Math.max(highestFps, fps);
    }
    return highestFps;
}
function getRaisedProjectFpsForImportedMedia({ currentFps, importedAssets }) {
    const highestImportedVideoFps = getHighestImportedVideoFps({
        mediaAssets: importedAssets
    });
    const currentFpsFloat = frameRateToFloat(currentFps);
    if (highestImportedVideoFps === null || highestImportedVideoFps <= currentFpsFloat) {
        return null;
    }
    return floatToFrameRate(highestImportedVideoFps);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/fps/defaults.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_FPS",
    ()=>DEFAULT_FPS
]);
const DEFAULT_FPS = {
    numerator: 30,
    denominator: 1
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/retime/rate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_RETIME_RATE",
    ()=>DEFAULT_RETIME_RATE,
    "MAX_RETIME_RATE",
    ()=>MAX_RETIME_RATE,
    "MIN_RETIME_RATE",
    ()=>MIN_RETIME_RATE,
    "canMaintainPitch",
    ()=>canMaintainPitch,
    "clampRetimeRate",
    ()=>clampRetimeRate,
    "shouldMaintainPitch",
    ()=>shouldMaintainPitch
]);
const DEFAULT_RETIME_RATE = 1;
const MIN_RETIME_RATE = 0.01;
const MAX_RETIME_RATE = 5;
function clampRetimeRate({ rate }) {
    if (!Number.isFinite(rate) || rate <= 0) {
        return DEFAULT_RETIME_RATE;
    }
    return Math.min(Math.max(rate, MIN_RETIME_RATE), MAX_RETIME_RATE);
}
function canMaintainPitch({ rate }) {
    return Number.isFinite(rate) && rate > 0;
}
function shouldMaintainPitch({ rate, maintainPitch }) {
    return maintainPitch === true && canMaintainPitch({
        rate
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/retime/resolve.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClipTimeAtSourceTime",
    ()=>getClipTimeAtSourceTime,
    "getEffectiveRateAt",
    ()=>getEffectiveRateAt,
    "getSourceTimeAtClipTime",
    ()=>getSourceTimeAtClipTime,
    "getTimelineDurationForSourceSpan",
    ()=>getTimelineDurationForSourceSpan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/rate.ts [app-client] (ecmascript)");
;
function getSafeRate({ rate }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampRetimeRate"])({
        rate
    });
}
function getSourceTimeAtClipTime({ clipTime, retime }) {
    return clipTime * getSafeRate({
        rate: retime?.rate ?? 1
    });
}
function getClipTimeAtSourceTime({ sourceTime, retime }) {
    return sourceTime / getSafeRate({
        rate: retime?.rate ?? 1
    });
}
function getEffectiveRateAt({ retime }) {
    return getSafeRate({
        rate: retime?.rate ?? 1
    });
}
function getTimelineDurationForSourceSpan({ sourceSpan, retime }) {
    if (sourceSpan <= 0) {
        return 0;
    }
    return sourceSpan / getSafeRate({
        rate: retime?.rate ?? 1
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/retime/audio-stretch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderRetimedBuffer",
    ()=>renderRetimedBuffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$soundtouchjs$40$0$2e$3$2e$0$2f$node_modules$2f$soundtouchjs$2f$dist$2f$soundtouch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/soundtouchjs@0.3.0/node_modules/soundtouchjs/dist/soundtouch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/rate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-client] (ecmascript)");
;
;
;
const RATE_EPSILON = 1e-6;
function sampleLinear({ channelData, position }) {
    if (position <= 0) {
        return channelData[0] ?? 0;
    }
    const lower = Math.floor(position);
    const upper = Math.min(channelData.length - 1, lower + 1);
    if (lower >= channelData.length) {
        return 0;
    }
    const fraction = position - lower;
    return channelData[lower] * (1 - fraction) + channelData[upper] * fraction;
}
function buildResampledBuffer({ audioContext, sourceBuffer, trimStart, clipDuration, targetSampleRate, retime }) {
    const outputLength = Math.max(1, Math.ceil(clipDuration * targetSampleRate));
    const numChannels = Math.max(1, Math.min(2, sourceBuffer.numberOfChannels));
    const outputBuffer = audioContext.createBuffer(numChannels, outputLength, targetSampleRate);
    for(let channel = 0; channel < numChannels; channel++){
        const sourceData = sourceBuffer.getChannelData(Math.min(channel, sourceBuffer.numberOfChannels - 1));
        const outputData = outputBuffer.getChannelData(channel);
        for(let i = 0; i < outputLength; i++){
            const clipTime = i / targetSampleRate;
            const sourceTime = trimStart + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
                clipTime,
                retime
            });
            outputData[i] = sampleLinear({
                channelData: sourceData,
                position: sourceTime * sourceBuffer.sampleRate
            });
        }
    }
    return outputBuffer;
}
async function buildPitchPreservedBuffer({ sourceBuffer, trimStart, clipDuration, rate, targetSampleRate }) {
    const nativeSampleRate = sourceBuffer.sampleRate;
    const sourceDuration = clipDuration * rate;
    const startSample = Math.max(0, Math.floor(trimStart * nativeSampleRate));
    const numSourceSamples = Math.max(1, Math.ceil(sourceDuration * nativeSampleRate));
    const available = Math.max(0, sourceBuffer.length - startSample);
    const actualSamples = Math.max(1, Math.min(numSourceSamples, available));
    const numChannels = Math.max(1, Math.min(2, sourceBuffer.numberOfChannels));
    // Resample to targetSampleRate first — soundtouchjs reads raw channel data
    // and does not respect the source buffer's native sample rate.
    const resampledLength = Math.max(1, Math.ceil(sourceDuration * targetSampleRate));
    const resampleCtx = new OfflineAudioContext(numChannels, resampledLength, targetSampleRate);
    const nativeBuffer = resampleCtx.createBuffer(numChannels, actualSamples, nativeSampleRate);
    for(let ch = 0; ch < numChannels; ch++){
        const src = sourceBuffer.getChannelData(Math.min(ch, sourceBuffer.numberOfChannels - 1));
        nativeBuffer.copyToChannel(src.subarray(startSample, startSample + actualSamples), ch);
    }
    const resampleSourceNode = resampleCtx.createBufferSource();
    resampleSourceNode.buffer = nativeBuffer;
    resampleSourceNode.connect(resampleCtx.destination);
    resampleSourceNode.start(0);
    const resampledBuffer = await resampleCtx.startRendering();
    const outputSamples = Math.max(1, Math.ceil(clipDuration * targetSampleRate));
    const stretchCtx = new OfflineAudioContext(numChannels, outputSamples, targetSampleRate);
    const shifter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$soundtouchjs$40$0$2e$3$2e$0$2f$node_modules$2f$soundtouchjs$2f$dist$2f$soundtouch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PitchShifter"](stretchCtx, resampledBuffer, 4096);
    shifter.tempo = rate;
    shifter.pitch = 1;
    shifter.connect(stretchCtx.destination);
    return stretchCtx.startRendering();
}
async function renderRetimedBuffer({ audioContext, sourceBuffer, trimStart, clipDuration, retime, maintainPitch = false }) {
    const targetSampleRate = audioContext.sampleRate;
    const rate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampRetimeRate"])({
        rate: retime?.rate ?? 1
    });
    const usePitchPreservation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldMaintainPitch"])({
        rate,
        maintainPitch
    }) && Math.abs(rate - 1) > RATE_EPSILON;
    if (usePitchPreservation) {
        return buildPitchPreservedBuffer({
            sourceBuffer,
            trimStart,
            clipDuration,
            rate,
            targetSampleRate
        });
    }
    return buildResampledBuffer({
        audioContext,
        sourceBuffer,
        trimStart,
        clipDuration,
        targetSampleRate,
        retime
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/retime/presets.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildConstantRetime",
    ()=>buildConstantRetime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/rate.ts [app-client] (ecmascript)");
;
function buildConstantRetime({ rate, maintainPitch = false }) {
    return {
        rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampRetimeRate"])({
            rate
        }),
        maintainPitch
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/retime/split.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adjustRetimeForTrimChange",
    ()=>adjustRetimeForTrimChange,
    "getSourceSpanAtClipTime",
    ()=>getSourceSpanAtClipTime,
    "splitRetimeAtClipTime",
    ()=>splitRetimeAtClipTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-client] (ecmascript)");
;
function getSourceSpanAtClipTime({ clipTime, retime }) {
    return Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
        clipTime,
        retime
    }));
}
function splitRetimeAtClipTime({ retime }) {
    return {
        left: retime,
        right: retime
    };
}
function adjustRetimeForTrimChange({ retime }) {
    return retime;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/retime/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/rate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$audio$2d$stretch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/audio-stretch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$presets$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/presets.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$split$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/split.ts [app-client] (ecmascript)");
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/preview/components/cursors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/preview/preview-snap.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/preview/overlays.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/media/waveform-summary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSourceWaveformSummary",
    ()=>buildSourceWaveformSummary,
    "buildWaveformSampleBuckets",
    ()=>buildWaveformSampleBuckets,
    "buildWaveformSourceKey",
    ()=>buildWaveformSourceKey,
    "computeRmsBuckets",
    ()=>computeRmsBuckets,
    "sampleSourceWaveformSummary",
    ()=>sampleSourceWaveformSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/retime/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-client] (ecmascript)");
"use client";
;
const RMS_ANALYSIS_WINDOW_SECONDS = 0.02;
const DEFAULT_SOURCE_WAVEFORM_BUCKET_SIZE = 128;
function computePeakBuckets({ buffer, buckets }) {
    const channels = buffer.numberOfChannels;
    const channelData = Array.from({
        length: channels
    }, (_, c)=>buffer.getChannelData(c));
    return buckets.map(({ bucketStart, bucketEnd })=>{
        let peak = 0;
        for(let c = 0; c < channels; c++){
            const data = channelData[c];
            for(let j = bucketStart; j < bucketEnd; j++){
                const abs = Math.abs(data[j] ?? 0);
                if (abs > peak) {
                    peak = abs;
                }
            }
        }
        return peak;
    });
}
function buildWaveformSourceKey({ kind, id }) {
    return `${kind}:${id}`;
}
function buildSourceWaveformSummary({ sourceKey, buffer, bucketSize = DEFAULT_SOURCE_WAVEFORM_BUCKET_SIZE }) {
    const safeBucketSize = Math.max(1, Math.floor(bucketSize));
    const bucketCount = Math.max(1, Math.ceil(buffer.length / safeBucketSize));
    const amplitudes = computePeakBuckets({
        buffer,
        buckets: Array.from({
            length: bucketCount
        }, (_, bucketIndex)=>{
            const bucketStart = bucketIndex * safeBucketSize;
            const bucketEnd = Math.min(buffer.length, bucketStart + safeBucketSize);
            return {
                bucketStart,
                bucketEnd
            };
        })
    });
    return {
        sourceKey,
        sampleRate: buffer.sampleRate,
        totalSamples: buffer.length,
        bucketSize: safeBucketSize,
        amplitudes: Float32Array.from(amplitudes)
    };
}
function buildWaveformSampleBuckets({ clipLeftPx, clipRightPx, barCount, pixelsPerSecond, clipDurationSec, sourceStartSec, retime, sampleRate, maxSampleExclusive, barStepPx }) {
    return Array.from({
        length: barCount
    }, (_, index)=>{
        const bucketLeftPx = clipLeftPx + index * barStepPx;
        const bucketRightPx = Math.min(clipRightPx, bucketLeftPx + barStepPx);
        const clipStartSec = Math.max(0, Math.min(clipDurationSec, bucketLeftPx / pixelsPerSecond));
        const clipEndSec = Math.max(clipStartSec, Math.min(clipDurationSec, bucketRightPx / pixelsPerSecond));
        const sourceBucketStartSec = sourceStartSec + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
            clipTime: clipStartSec,
            retime
        });
        const sourceBucketEndSec = sourceStartSec + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
            clipTime: clipEndSec,
            retime
        });
        return {
            bucketStart: Math.max(0, Math.floor(sourceBucketStartSec * sampleRate)),
            bucketEnd: Math.min(maxSampleExclusive, Math.max(0, Math.ceil(sourceBucketEndSec * sampleRate)))
        };
    });
}
function sampleSourceWaveformSummary({ summary, buckets }) {
    return buckets.map(({ bucketStart, bucketEnd })=>{
        if (bucketEnd <= bucketStart) {
            return 0;
        }
        const startIndex = Math.max(0, Math.floor(bucketStart / summary.bucketSize));
        const endIndex = Math.min(summary.amplitudes.length, Math.max(startIndex + 1, Math.ceil(bucketEnd / summary.bucketSize)));
        let maxAmplitude = 0;
        for(let i = startIndex; i < endIndex; i++){
            const amplitude = summary.amplitudes[i] ?? 0;
            if (amplitude > maxAmplitude) {
                maxAmplitude = amplitude;
            }
        }
        return maxAmplitude;
    });
}
function computeRmsBuckets({ buffer, buckets }) {
    const channels = buffer.numberOfChannels;
    const maxWindowLength = Math.max(1, Math.floor(buffer.sampleRate * RMS_ANALYSIS_WINDOW_SECONDS));
    const channelData = new Array(channels);
    for(let c = 0; c < channels; c++){
        channelData[c] = buffer.getChannelData(c);
    }
    const result = new Array(buckets.length);
    for(let i = 0; i < buckets.length; i++){
        const { bucketStart, bucketEnd } = buckets[i];
        const bucketLength = bucketEnd - bucketStart;
        if (bucketLength <= 0) {
            result[i] = 0;
            continue;
        }
        const windowLength = Math.max(1, Math.min(bucketLength, maxWindowLength));
        let maxMeanSquare = 0;
        for(let winStart = bucketStart; winStart < bucketEnd;){
            const winEnd = Math.min(winStart + windowLength, bucketEnd);
            const n = winEnd - winStart;
            if (n > 0) {
                let sum = 0;
                for(let c = 0; c < channels; c++){
                    const data = channelData[c];
                    for(let j = winStart; j < winEnd; j++){
                        const v = data[j];
                        sum += v * v;
                    }
                }
                const meanSquare = sum / (n * channels);
                if (meanSquare > maxMeanSquare) {
                    maxMeanSquare = meanSquare;
                }
            }
            winStart = winEnd;
        }
        result[i] = Math.sqrt(maxMeanSquare);
    }
    return result;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/media/audio-mastering.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyAudioMasteringToBuffer",
    ()=>applyAudioMasteringToBuffer,
    "createAudioMasteringChain",
    ()=>createAudioMasteringChain,
    "getAudioBufferPeak",
    ()=>getAudioBufferPeak
]);
const MASTER_LIMITER_THRESHOLD_DB = -1;
const MASTER_LIMITER_KNEE_DB = 0;
const MASTER_LIMITER_RATIO = 20;
const MASTER_LIMITER_ATTACK_SECONDS = 0.001;
const MASTER_LIMITER_RELEASE_SECONDS = 0.12;
const MASTER_OUTPUT_HEADROOM = 0.98;
function getAudioBufferPeak({ audioBuffer }) {
    let peak = 0;
    for(let channel = 0; channel < audioBuffer.numberOfChannels; channel++){
        const channelData = audioBuffer.getChannelData(channel);
        for(let index = 0; index < channelData.length; index++){
            const magnitude = Math.abs(channelData[index]);
            if (magnitude > peak) {
                peak = magnitude;
            }
        }
    }
    return peak;
}
function createAudioMasteringChain({ audioContext, destination }) {
    const input = audioContext.createGain();
    const limiter = audioContext.createDynamicsCompressor();
    const outputGain = audioContext.createGain();
    limiter.threshold.value = MASTER_LIMITER_THRESHOLD_DB;
    limiter.knee.value = MASTER_LIMITER_KNEE_DB;
    limiter.ratio.value = MASTER_LIMITER_RATIO;
    limiter.attack.value = MASTER_LIMITER_ATTACK_SECONDS;
    limiter.release.value = MASTER_LIMITER_RELEASE_SECONDS;
    outputGain.gain.value = MASTER_OUTPUT_HEADROOM;
    input.connect(limiter);
    limiter.connect(outputGain);
    outputGain.connect(destination);
    return {
        input
    };
}
async function applyAudioMasteringToBuffer({ audioBuffer }) {
    if (getAudioBufferPeak({
        audioBuffer
    }) <= MASTER_OUTPUT_HEADROOM) {
        return audioBuffer;
    }
    const offlineContext = new OfflineAudioContext(audioBuffer.numberOfChannels, Math.max(1, audioBuffer.length), audioBuffer.sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    const { input } = createAudioMasteringChain({
        audioContext: offlineContext,
        destination: offlineContext.destination
    });
    source.connect(input);
    source.start(0);
    const renderedBuffer = await offlineContext.startRendering();
    clampAudioBufferPeak({
        audioBuffer: renderedBuffer,
        maxPeak: MASTER_OUTPUT_HEADROOM
    });
    return renderedBuffer;
}
function clampAudioBufferPeak({ audioBuffer, maxPeak }) {
    for(let channel = 0; channel < audioBuffer.numberOfChannels; channel++){
        const channelData = audioBuffer.getChannelData(channel);
        for(let index = 0; index < channelData.length; index++){
            channelData[index] = Math.max(-maxPeak, Math.min(maxPeak, channelData[index]));
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/media/media-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SUPPORTS_AUDIO",
    ()=>SUPPORTS_AUDIO,
    "getMediaTypeFromFile",
    ()=>getMediaTypeFromFile,
    "mediaSupportsAudio",
    ()=>mediaSupportsAudio
]);
const SUPPORTS_AUDIO = [
    "audio",
    "video"
];
function mediaSupportsAudio({ media }) {
    if (!media) return false;
    return SUPPORTS_AUDIO.includes(media.type);
}
const getMediaTypeFromFile = ({ file })=>{
    const { type } = file;
    if (type.startsWith("image/")) {
        return "image";
    }
    if (type.startsWith("video/")) {
        return "video";
    }
    if (type.startsWith("audio/")) {
        return "audio";
    }
    return null;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/media/audio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "collectAudibleCandidates",
    ()=>collectAudibleCandidates,
    "collectAudioClips",
    ()=>collectAudioClips,
    "collectAudioElements",
    ()=>collectAudioElements,
    "collectAudioMixSources",
    ()=>collectAudioMixSources,
    "createAudioContext",
    ()=>createAudioContext,
    "createTimelineAudioBuffer",
    ()=>createTimelineAudioBuffer,
    "decodeAudioToFloat32",
    ()=>decodeAudioToFloat32,
    "extractPeakRange",
    ()=>extractPeakRange,
    "extractRmsBuckets",
    ()=>extractRmsBuckets,
    "extractRmsRange",
    ()=>extractRmsRange,
    "getSampleBucketRange",
    ()=>getSampleBucketRange,
    "timelineHasAudio",
    ()=>timelineHasAudio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/rate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2d$mastering$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/audio-mastering.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-state.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/audio-separation/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/element-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/timeline/track-capabilities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$media$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/media-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/retime/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$audio$2d$stretch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/retime/audio-stretch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/input.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2d$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/input-format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$sink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/mediabunny@1.41.0/node_modules/mediabunny/dist/modules/src/media-sink.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$waveform$2d$summary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/waveform-summary.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
const MAX_AUDIO_CHANNELS = 2;
const EXPORT_SAMPLE_RATE = 44100;
function createAudioContext({ sampleRate } = {}) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    return new AudioContextConstructor(sampleRate ? {
        sampleRate
    } : undefined);
}
async function decodeAudioToFloat32({ audioBlob, sampleRate }) {
    const audioContext = createAudioContext({
        sampleRate
    });
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    // mix down to mono
    const numChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length;
    const samples = new Float32Array(length);
    for(let i = 0; i < length; i++){
        let sum = 0;
        for(let channel = 0; channel < numChannels; channel++){
            sum += audioBuffer.getChannelData(channel)[i];
        }
        samples[i] = sum / numChannels;
    }
    return {
        samples,
        sampleRate: audioBuffer.sampleRate
    };
}
function collectAudibleCandidates({ tracks, mediaAssets }) {
    const allTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    const mediaMap = new Map(mediaAssets.map((a)=>[
            a.id,
            a
        ]));
    const candidates = [];
    for (const track of allTracks){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canTrackHaveAudio"])(track) && track.muted) continue;
        for (const element of track.elements){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canElementHaveAudio"])(element)) continue;
            if (element.duration <= 0) continue;
            const mediaAsset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasMediaId"])(element) ? mediaMap.get(element.mediaId) ?? null : null;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doesElementHaveEnabledAudio"])({
                element,
                mediaAsset
            })) continue;
            candidates.push({
                element,
                mediaAsset
            });
        }
    }
    return candidates;
}
function timelineHasAudio({ tracks, mediaAssets }) {
    return collectAudibleCandidates({
        tracks,
        mediaAssets
    }).some(({ element })=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementMuted"])({
            element
        }));
}
async function collectAudioElements({ tracks, mediaAssets, audioContext }) {
    const candidates = collectAudibleCandidates({
        tracks,
        mediaAssets
    });
    const mediaMap = new Map(mediaAssets.map((media)=>[
            media.id,
            media
        ]));
    const pendingElements = [];
    for (const { element, mediaAsset } of candidates){
        if (element.type === "audio") {
            pendingElements.push(resolveAudioBufferForElement({
                element,
                mediaMap,
                audioContext
            }).then((audioBuffer)=>{
                if (!audioBuffer) return null;
                return {
                    timelineElement: element,
                    buffer: audioBuffer,
                    startTime: element.startTime / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    duration: element.duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    trimStart: element.trimStart / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    trimEnd: element.trimEnd / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    volume: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEffectiveAudioGain"])({
                        element,
                        trackMuted: false,
                        localTime: 0
                    }),
                    muted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementMuted"])({
                        element
                    }),
                    retime: element.retime
                };
            }));
            continue;
        }
        if (element.type === "video") {
            if (!mediaAsset || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$media$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaSupportsAudio"])({
                media: mediaAsset
            })) continue;
            pendingElements.push(resolveAudioBufferForAsset({
                asset: mediaAsset,
                audioContext
            }).then((audioBuffer)=>{
                if (!audioBuffer) return null;
                return {
                    timelineElement: element,
                    buffer: audioBuffer,
                    startTime: element.startTime / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    duration: element.duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    trimStart: element.trimStart / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    trimEnd: element.trimEnd / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
                    volume: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEffectiveAudioGain"])({
                        element,
                        trackMuted: false,
                        localTime: 0
                    }),
                    muted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementMuted"])({
                        element
                    }),
                    retime: element.retime
                };
            }));
        }
    }
    const resolvedElements = await Promise.all(pendingElements);
    const audioElements = [];
    for (const element of resolvedElements){
        if (element) audioElements.push(element);
    }
    return audioElements;
}
async function resolveAudioBufferForElement({ element, mediaMap, audioContext }) {
    try {
        if (element.sourceType === "upload") {
            const asset = mediaMap.get(element.mediaId);
            if (!asset) return null;
            return await resolveAudioBufferForAsset({
                asset,
                audioContext
            });
        }
        if (element.buffer) return element.buffer;
        const response = await fetch(element.sourceUrl);
        if (!response.ok) {
            throw new Error(`Library audio fetch failed: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer.slice(0));
    } catch (error) {
        console.warn("Failed to decode audio:", error);
        return null;
    }
}
async function resolveAudioBufferForAsset({ asset, audioContext }) {
    if (asset.type === "audio") {
        try {
            const arrayBuffer = await asset.file.arrayBuffer();
            return await audioContext.decodeAudioData(arrayBuffer.slice(0));
        } catch (error) {
            console.warn("Failed to decode audio asset:", error);
            return null;
        }
    }
    const input = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"]({
        source: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlobSource"](asset.file),
        formats: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$input$2d$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_FORMATS"]
    });
    try {
        const audioTrack = await input.getPrimaryAudioTrack();
        if (!audioTrack) return null;
        const sink = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$mediabunny$40$1$2e$41$2e$0$2f$node_modules$2f$mediabunny$2f$dist$2f$modules$2f$src$2f$media$2d$sink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AudioBufferSink"](audioTrack);
        const targetSampleRate = audioContext.sampleRate;
        const chunks = [];
        let totalSamples = 0;
        for await (const { buffer } of sink.buffers(0)){
            chunks.push(buffer);
            totalSamples += buffer.length;
        }
        if (chunks.length === 0) return null;
        const nativeSampleRate = chunks[0].sampleRate;
        const numChannels = Math.min(MAX_AUDIO_CHANNELS, chunks[0].numberOfChannels);
        const nativeChannels = Array.from({
            length: numChannels
        }, ()=>new Float32Array(totalSamples));
        let offset = 0;
        for (const chunk of chunks){
            for(let channel = 0; channel < numChannels; channel++){
                const sourceData = chunk.getChannelData(Math.min(channel, chunk.numberOfChannels - 1));
                nativeChannels[channel].set(sourceData, offset);
            }
            offset += chunk.length;
        }
        // use OfflineAudioContext for high-quality resampling to target rate
        const outputSamples = Math.ceil(totalSamples * (targetSampleRate / nativeSampleRate));
        const offlineContext = new OfflineAudioContext(numChannels, outputSamples, targetSampleRate);
        const nativeBuffer = audioContext.createBuffer(numChannels, totalSamples, nativeSampleRate);
        for(let ch = 0; ch < numChannels; ch++){
            nativeBuffer.copyToChannel(nativeChannels[ch], ch);
        }
        const sourceNode = offlineContext.createBufferSource();
        sourceNode.buffer = nativeBuffer;
        sourceNode.connect(offlineContext.destination);
        sourceNode.start(0);
        return await offlineContext.startRendering();
    } catch (error) {
        console.warn("Failed to decode asset audio:", error);
        return null;
    } finally{
        input.dispose();
    }
}
async function fetchLibraryAudioSource({ element, volume }) {
    try {
        const response = await fetch(element.sourceUrl);
        if (!response.ok) {
            throw new Error(`Library audio fetch failed: ${response.status}`);
        }
        const blob = await response.blob();
        const file = new File([
            blob
        ], `${element.name}.mp3`, {
            type: "audio/mpeg"
        });
        return {
            timelineElement: element,
            file,
            startTime: element.startTime / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
            duration: element.duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
            trimStart: element.trimStart / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
            trimEnd: element.trimEnd / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
            volume,
            retime: element.retime
        };
    } catch (error) {
        console.warn("Failed to fetch library audio:", error);
        return null;
    }
}
async function fetchLibraryAudioClip({ element, muted, volume }) {
    try {
        const response = await fetch(element.sourceUrl);
        if (!response.ok) {
            throw new Error(`Library audio fetch failed: ${response.status}`);
        }
        const blob = await response.blob();
        const file = new File([
            blob
        ], `${element.name}.mp3`, {
            type: "audio/mpeg"
        });
        return {
            timelineElement: element,
            id: element.id,
            sourceKey: element.id,
            file,
            startTime: element.startTime,
            duration: element.duration,
            trimStart: element.trimStart,
            trimEnd: element.trimEnd,
            volume,
            muted,
            retime: element.retime
        };
    } catch (error) {
        console.warn("Failed to fetch library audio:", error);
        return null;
    }
}
function collectMediaAudioSource({ element, mediaAsset, volume }) {
    return {
        timelineElement: element,
        file: mediaAsset.file,
        startTime: element.startTime / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        duration: element.duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        trimStart: element.trimStart / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        trimEnd: element.trimEnd / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        volume,
        retime: element.retime
    };
}
function collectMediaAudioClip({ element, mediaAsset, muted, volume }) {
    return {
        timelineElement: element,
        id: element.id,
        sourceKey: mediaAsset.id,
        file: mediaAsset.file,
        startTime: element.startTime / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        duration: element.duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        trimStart: element.trimStart / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        trimEnd: element.trimEnd / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"],
        volume,
        muted,
        retime: element.retime
    };
}
async function collectAudioMixSources({ tracks, mediaAssets }) {
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    const audioMixSources = [];
    const mediaMap = new Map(mediaAssets.map((asset)=>[
            asset.id,
            asset
        ]));
    const pendingLibrarySources = [];
    for (const track of orderedTracks){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canTrackHaveAudio"])(track) && track.muted) continue;
        for (const element of track.elements){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canElementHaveAudio"])(element)) continue;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementMuted"])({
                element
            })) continue;
            const mediaAsset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasMediaId"])(element) ? mediaMap.get(element.mediaId) ?? null : null;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doesElementHaveEnabledAudio"])({
                element,
                mediaAsset
            })) continue;
            const volume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEffectiveAudioGain"])({
                element,
                localTime: 0
            });
            if (element.type === "audio") {
                if (element.sourceType === "upload") {
                    const mediaAsset = mediaMap.get(element.mediaId);
                    if (!mediaAsset) continue;
                    audioMixSources.push(collectMediaAudioSource({
                        element,
                        mediaAsset,
                        volume
                    }));
                } else {
                    pendingLibrarySources.push(fetchLibraryAudioSource({
                        element,
                        volume
                    }));
                }
                continue;
            }
            if (element.type === "video") {
                if (mediaAsset && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$media$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaSupportsAudio"])({
                    media: mediaAsset
                })) {
                    audioMixSources.push(collectMediaAudioSource({
                        element,
                        mediaAsset,
                        volume
                    }));
                }
            }
        }
    }
    const resolvedLibrarySources = await Promise.all(pendingLibrarySources);
    for (const source of resolvedLibrarySources){
        if (source) audioMixSources.push(source);
    }
    return audioMixSources;
}
async function collectAudioClips({ tracks, mediaAssets }) {
    const orderedTracks = [
        ...tracks.overlay,
        tracks.main,
        ...tracks.audio
    ];
    const clips = [];
    const mediaMap = new Map(mediaAssets.map((asset)=>[
            asset.id,
            asset
        ]));
    const pendingLibraryClips = [];
    for (const track of orderedTracks){
        const isTrackMuted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$track$2d$capabilities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canTrackHaveAudio"])(track) && track.muted;
        for (const element of track.elements){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canElementHaveAudio"])(element)) continue;
            const mediaAsset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$element$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasMediaId"])(element) ? mediaMap.get(element.mediaId) ?? null : null;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$separation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doesElementHaveEnabledAudio"])({
                element,
                mediaAsset
            })) continue;
            const muted = isTrackMuted || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementMuted"])({
                element
            });
            const volume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEffectiveAudioGain"])({
                element,
                trackMuted: isTrackMuted,
                localTime: 0
            });
            if (element.type === "audio") {
                if (element.sourceType === "upload") {
                    const mediaAsset = mediaMap.get(element.mediaId);
                    if (!mediaAsset) continue;
                    clips.push(collectMediaAudioClip({
                        element,
                        mediaAsset,
                        muted,
                        volume
                    }));
                } else {
                    pendingLibraryClips.push(fetchLibraryAudioClip({
                        element,
                        muted,
                        volume
                    }));
                }
                continue;
            }
            if (element.type === "video") {
                if (mediaAsset && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$media$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaSupportsAudio"])({
                    media: mediaAsset
                })) {
                    clips.push(collectMediaAudioClip({
                        element,
                        mediaAsset,
                        muted,
                        volume
                    }));
                }
            }
        }
    }
    const resolvedLibraryClips = await Promise.all(pendingLibraryClips);
    for (const clip of resolvedLibraryClips){
        if (clip) clips.push(clip);
    }
    return clips;
}
async function createTimelineAudioBuffer({ tracks, mediaAssets, duration, sampleRate = EXPORT_SAMPLE_RATE, audioContext }) {
    const context = audioContext ?? createAudioContext({
        sampleRate
    });
    const audioElements = await collectAudioElements({
        tracks,
        mediaAssets,
        audioContext: context
    });
    if (audioElements.length === 0) return null;
    const outputChannels = 2;
    const durationSeconds = duration / __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SECOND"];
    const outputLength = Math.ceil(durationSeconds * sampleRate);
    const outputBuffer = context.createBuffer(outputChannels, outputLength, sampleRate);
    for (const element of audioElements){
        if (element.muted) continue;
        const renderedBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$rate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldMaintainPitch"])({
            rate: element.retime?.rate ?? 1,
            maintainPitch: element.retime?.maintainPitch
        }) ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$audio$2d$stretch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderRetimedBuffer"])({
            audioContext: context,
            sourceBuffer: element.buffer,
            trimStart: element.trimStart,
            clipDuration: element.duration,
            retime: element.retime,
            maintainPitch: true
        }) : undefined;
        mixAudioChannels({
            element,
            buffer: renderedBuffer ?? element.buffer,
            trimStart: renderedBuffer ? 0 : element.trimStart,
            retime: renderedBuffer ? undefined : element.retime,
            outputBuffer,
            outputLength,
            sampleRate
        });
    }
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2d$mastering$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyAudioMasteringToBuffer"])({
        audioBuffer: outputBuffer
    });
}
function collectPeakRange({ buffer, count, startSample, endSample }) {
    const channels = buffer.numberOfChannels;
    const peaks = new Float32Array(count);
    for(let c = 0; c < channels; c++){
        const data = buffer.getChannelData(c);
        for(let i = 0; i < count; i++){
            const { bucketStart: start, bucketEnd: end } = getSampleBucketRange({
                startSample,
                endSample,
                bucketIndex: i,
                bucketCount: count
            });
            for(let j = start; j < end; j++){
                const abs = Math.abs(data[j]);
                if (abs > peaks[i]) peaks[i] = abs;
            }
        }
    }
    return peaks;
}
function extractPeakRange({ buffer, count, startSample, endSample }) {
    return Array.from(collectPeakRange({
        buffer,
        count,
        startSample,
        endSample
    }));
}
function getSampleBucketRange({ startSample, endSample, bucketIndex, bucketCount }) {
    const rangeLength = Math.max(0, endSample - startSample);
    const bucketStart = startSample + Math.floor(bucketIndex * rangeLength / bucketCount);
    const bucketEnd = startSample + Math.floor((bucketIndex + 1) * rangeLength / bucketCount);
    return {
        bucketStart,
        bucketEnd: Math.max(bucketStart, bucketEnd)
    };
}
function extractRmsBuckets({ buffer, buckets }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$waveform$2d$summary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeRmsBuckets"])({
        buffer,
        buckets
    });
}
function extractRmsRange({ buffer, count, startSample, endSample }) {
    return extractRmsBuckets({
        buffer,
        buckets: Array.from({
            length: count
        }, (_, bucketIndex)=>getSampleBucketRange({
                startSample,
                endSample,
                bucketIndex,
                bucketCount: count
            }))
    });
}
function mixAudioChannels({ element, buffer, trimStart, retime, outputBuffer, outputLength, sampleRate }) {
    const { startTime, duration: elementDuration } = element;
    const outputStartSample = Math.floor(startTime * sampleRate);
    const renderedLength = Math.ceil(elementDuration * sampleRate);
    const outputChannels = 2;
    for(let channel = 0; channel < outputChannels; channel++){
        const outputData = outputBuffer.getChannelData(channel);
        const sourceChannel = Math.min(channel, buffer.numberOfChannels - 1);
        const sourceData = buffer.getChannelData(sourceChannel);
        for(let i = 0; i < renderedLength; i++){
            const outputIndex = outputStartSample + i;
            if (outputIndex >= outputLength) break;
            const clipTime = i / sampleRate;
            const sourceTime = trimStart + (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$retime$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSourceTimeAtClipTime"])({
                clipTime,
                retime
            });
            const sourceIndex = sourceTime * buffer.sampleRate;
            if (sourceIndex >= sourceData.length) break;
            const lowerIndex = Math.floor(sourceIndex);
            const upperIndex = Math.min(sourceData.length - 1, lowerIndex + 1);
            const fraction = sourceIndex - lowerIndex;
            const gain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasAnimatedVolume"])({
                element: element.timelineElement
            }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$timeline$2f$audio$2d$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEffectiveAudioGain"])({
                element: element.timelineElement,
                localTime: clipTime
            }) : element.volume;
            outputData[outputIndex] += (sourceData[lowerIndex] * (1 - fraction) + sourceData[upperIndex] * fraction) * gain;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/hooks/use-shift-key.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useShiftKey",
    ()=>useShiftKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useShiftKey() {
    _s();
    const isShiftHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useShiftKey.useEffect": ()=>{
            const handleKeyDown = {
                "useShiftKey.useEffect.handleKeyDown": ({ key })=>{
                    if (key === "Shift") {
                        isShiftHeldRef.current = true;
                    }
                }
            }["useShiftKey.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "useShiftKey.useEffect.handleKeyUp": ({ key })=>{
                    if (key === "Shift") {
                        isShiftHeldRef.current = false;
                    }
                }
            }["useShiftKey.useEffect.handleKeyUp"];
            const handleBlur = {
                "useShiftKey.useEffect.handleBlur": ()=>{
                    isShiftHeldRef.current = false;
                }
            }["useShiftKey.useEffect.handleBlur"];
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("keyup", handleKeyUp);
            window.addEventListener("blur", handleBlur);
            return ({
                "useShiftKey.useEffect": ()=>{
                    document.removeEventListener("keydown", handleKeyDown);
                    document.removeEventListener("keyup", handleKeyUp);
                    window.removeEventListener("blur", handleBlur);
                }
            })["useShiftKey.useEffect"];
        }
    }["useShiftKey.useEffect"], []);
    return isShiftHeldRef;
}
_s(useShiftKey, "DLDs4gCbaa86av6llGDK6a8NNFs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/background/color.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_BACKGROUND_COLOR",
    ()=>DEFAULT_BACKGROUND_COLOR
]);
const DEFAULT_BACKGROUND_COLOR = "#000000";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/background/blur.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BACKGROUND_BLUR_INTENSITY_PRESETS",
    ()=>BACKGROUND_BLUR_INTENSITY_PRESETS,
    "DEFAULT_BACKGROUND_BLUR_INTENSITY",
    ()=>DEFAULT_BACKGROUND_BLUR_INTENSITY
]);
const BACKGROUND_BLUR_INTENSITY_PRESETS = [
    {
        label: "Light",
        value: 100
    },
    {
        label: "Medium",
        value: 200
    },
    {
        label: "Heavy",
        value: 500
    }
];
const DEFAULT_BACKGROUND_BLUR_INTENSITY = 10;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/canvas/sizes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_CANVAS_PRESETS",
    ()=>DEFAULT_CANVAS_PRESETS,
    "DEFAULT_CANVAS_SIZE",
    ()=>DEFAULT_CANVAS_SIZE
]);
const DEFAULT_CANVAS_PRESETS = [
    {
        width: 1920,
        height: 1080
    },
    {
        width: 1080,
        height: 1920
    },
    {
        width: 1080,
        height: 1080
    },
    {
        width: 1440,
        height: 1080
    }
];
const DEFAULT_CANVAS_SIZE = {
    width: 1920,
    height: 1080
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/rendering/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTransformFromParams",
    ()=>buildTransformFromParams,
    "readBlendModeFromParams",
    ()=>readBlendModeFromParams,
    "readOpacityFromParams",
    ()=>readOpacityFromParams
]);
function buildTransformFromParams({ params }) {
    return {
        scaleX: readNumberParam({
            params,
            key: "transform.scaleX",
            fallback: 1
        }),
        scaleY: readNumberParam({
            params,
            key: "transform.scaleY",
            fallback: 1
        }),
        position: {
            x: readNumberParam({
                params,
                key: "transform.positionX",
                fallback: 0
            }),
            y: readNumberParam({
                params,
                key: "transform.positionY",
                fallback: 0
            })
        },
        rotate: readNumberParam({
            params,
            key: "transform.rotate",
            fallback: 0
        })
    };
}
function readOpacityFromParams({ params }) {
    return readNumberParam({
        params,
        key: "opacity",
        fallback: 1
    });
}
function readBlendModeFromParams({ params }) {
    const value = params.blendMode;
    return typeof value === "string" && isBlendMode(value) ? value : "normal";
}
function readNumberParam({ params, key, fallback }) {
    const value = params[key];
    return typeof value === "number" ? value : fallback;
}
function isBlendMode(value) {
    return value === "normal" || value === "darken" || value === "multiply" || value === "color-burn" || value === "lighten" || value === "screen" || value === "plus-lighter" || value === "color-dodge" || value === "overlay" || value === "soft-light" || value === "hard-light" || value === "difference" || value === "exclusion" || value === "hue" || value === "saturation" || value === "color" || value === "luminosity";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/rendering/animation-values.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "resolveTransformAtTime",
    ()=>resolveTransformAtTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/resolve.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
function resolveTransformAtTime({ baseTransform, animations, localTime }) {
    const safeLocalTime = Math.max(0, localTime);
    return {
        position: {
            x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
                animations,
                propertyPath: "transform.positionX",
                localTime: safeLocalTime,
                fallbackValue: baseTransform.position.x
            }),
            y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
                animations,
                propertyPath: "transform.positionY",
                localTime: safeLocalTime,
                fallbackValue: baseTransform.position.y
            })
        },
        scaleX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
            animations,
            propertyPath: "transform.scaleX",
            localTime: safeLocalTime,
            fallbackValue: baseTransform.scaleX
        }),
        scaleY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
            animations,
            propertyPath: "transform.scaleY",
            localTime: safeLocalTime,
            fallbackValue: baseTransform.scaleY
        }),
        rotate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAnimationPathValueAtTime"])({
            animations,
            propertyPath: "transform.rotate",
            localTime: safeLocalTime,
            fallbackValue: baseTransform.rotate
        })
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/gradients/parser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Original source: https://github.com/rafaelcaricio/gradient-parser/blob/master/lib/parser.js
 */ __turbopack_context__.s([
    "GradientParser",
    ()=>GradientParser,
    "parseGradient",
    ()=>parseGradient
]);
const tokens = {
    linearGradient: /^(-(webkit|o|ms|moz)-)?(linear-gradient)/i,
    repeatingLinearGradient: /^(-(webkit|o|ms|moz)-)?(repeating-linear-gradient)/i,
    radialGradient: /^(-(webkit|o|ms|moz)-)?(radial-gradient)/i,
    repeatingRadialGradient: /^(-(webkit|o|ms|moz)-)?(repeating-radial-gradient)/i,
    sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i,
    extentKeywords: /^(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)/,
    positionKeywords: /^(left|center|right|top|bottom)/i,
    pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
    percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))%/,
    emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
    angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
    radianValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))rad/,
    startCall: /^\(/,
    endCall: /^\)/,
    comma: /^,/,
    hexColor: /^#([0-9a-fA-F]+)/,
    literalColor: /^([a-zA-Z]+)/,
    rgbColor: /^rgb/i,
    rgbaColor: /^rgba/i,
    varColor: /^var/i,
    calcValue: /^calc/i,
    variableName: /^(--[a-zA-Z0-9-,\s#]+)/,
    number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/,
    hslColor: /^hsl/i,
    hslaColor: /^hsla/i
};
let input = "";
const error = ({ message })=>{
    const err = new Error(`${input}: ${message}`);
    err.source = input;
    throw err;
};
const getAst = ()=>{
    const ast = matchListDefinitions();
    if (input.length > 0) {
        error({
            message: "Invalid input not EOF"
        });
    }
    return ast;
};
const matchListDefinitions = ()=>matchListing({
        matcher: matchDefinition
    });
const matchDefinition = ()=>matchGradient({
        gradientType: "linear-gradient",
        pattern: tokens.linearGradient,
        orientationMatcher: matchLinearOrientation
    }) || matchGradient({
        gradientType: "repeating-linear-gradient",
        pattern: tokens.repeatingLinearGradient,
        orientationMatcher: matchLinearOrientation
    }) || matchGradient({
        gradientType: "radial-gradient",
        pattern: tokens.radialGradient,
        orientationMatcher: matchListRadialOrientations
    }) || matchGradient({
        gradientType: "repeating-radial-gradient",
        pattern: tokens.repeatingRadialGradient,
        orientationMatcher: matchListRadialOrientations
    });
const matchGradient = ({ gradientType, pattern, orientationMatcher })=>matchCall({
        pattern,
        callback: ()=>{
            const orientation = orientationMatcher();
            if (orientation && !scan({
                regexp: tokens.comma
            })) {
                error({
                    message: "Missing comma before color stops"
                });
            }
            return {
                type: gradientType,
                orientation,
                colorStops: matchListing({
                    matcher: matchColorStop
                })
            };
        }
    });
const matchCall = ({ pattern, callback })=>{
    const captures = scan({
        regexp: pattern
    });
    if (!captures) {
        return undefined;
    }
    if (!scan({
        regexp: tokens.startCall
    })) {
        error({
            message: "Missing ("
        });
    }
    const result = callback(captures);
    if (!scan({
        regexp: tokens.endCall
    })) {
        error({
            message: "Missing )"
        });
    }
    return result;
};
const matchLinearOrientation = ()=>{
    const sideOrCorner = matchSideOrCorner();
    if (sideOrCorner) {
        return sideOrCorner;
    }
    const legacyDirection = match({
        type: "position-keyword",
        pattern: tokens.positionKeywords,
        captureIndex: 1
    });
    if (legacyDirection) {
        return {
            type: "directional",
            value: legacyDirection.value
        };
    }
    return matchAngle();
};
const matchSideOrCorner = ()=>match({
        type: "directional",
        pattern: tokens.sideOrCorner,
        captureIndex: 1
    });
const matchAngle = ()=>match({
        type: "angular",
        pattern: tokens.angleValue,
        captureIndex: 1
    }) || match({
        type: "angular",
        pattern: tokens.radianValue,
        captureIndex: 1
    });
const matchListRadialOrientations = ()=>{
    const radialOrientation = matchRadialOrientation();
    if (!radialOrientation) {
        return undefined;
    }
    const radialOrientations = [
        radialOrientation
    ];
    const lookaheadCache = input;
    if (!scan({
        regexp: tokens.comma
    })) {
        return radialOrientations;
    }
    const nextRadial = matchRadialOrientation();
    if (!nextRadial) {
        input = lookaheadCache;
        return radialOrientations;
    }
    radialOrientations.push(nextRadial);
    return radialOrientations;
};
const matchRadialOrientation = ()=>{
    const radialType = matchCircle() || matchEllipse();
    if (radialType) {
        radialType.at = matchAtPosition();
        return radialType;
    }
    const extent = matchExtentKeyword();
    if (extent) {
        const positionAt = matchAtPosition();
        if (positionAt) {
            return {
                ...extent,
                at: positionAt
            };
        }
        return extent;
    }
    const implicitEllipse = matchImplicitEllipse();
    if (implicitEllipse) {
        return implicitEllipse;
    }
    const atPosition = matchAtPosition();
    if (atPosition) {
        return {
            type: "default-radial",
            at: atPosition
        };
    }
    const defaultPosition = matchPositioning();
    if (defaultPosition) {
        return {
            type: "default-radial",
            at: defaultPosition
        };
    }
    return undefined;
};
const matchImplicitEllipse = ()=>{
    const lookaheadCache = input;
    const width = matchDistance();
    if (!width) {
        return undefined;
    }
    const height = matchDistance();
    if (!height) {
        input = lookaheadCache;
        return undefined;
    }
    const atPos = matchAtPosition();
    if (!atPos) {
        input = lookaheadCache;
        return undefined;
    }
    return {
        type: "shape",
        value: "ellipse",
        style: {
            type: "position",
            value: {
                x: width,
                y: height
            }
        },
        at: atPos
    };
};
const matchCircle = ()=>{
    const circle = match({
        type: "shape",
        pattern: /^(circle)/i,
        captureIndex: 0
    });
    if (!circle) {
        return undefined;
    }
    circle.style = matchLength() || matchExtentKeyword();
    circle.value = "circle";
    return circle;
};
const matchEllipse = ()=>{
    const ellipse = match({
        type: "shape",
        pattern: /^(ellipse)/i,
        captureIndex: 0
    });
    if (!ellipse) {
        return undefined;
    }
    ellipse.style = matchPositioning() || matchDistance() || matchExtentKeyword();
    ellipse.value = "ellipse";
    return ellipse;
};
const matchExtentKeyword = ()=>match({
        type: "extent-keyword",
        pattern: tokens.extentKeywords,
        captureIndex: 1
    });
const matchAtPosition = ()=>{
    if (!match({
        type: "position",
        pattern: /^at/,
        captureIndex: 0
    })) {
        return undefined;
    }
    const positioning = matchPositioning();
    if (!positioning) {
        error({
            message: "Missing positioning value"
        });
    }
    return positioning;
};
const matchPositioning = ()=>{
    const location = matchCoordinates();
    if (!location.x && !location.y) {
        return undefined;
    }
    return {
        type: "position",
        value: location
    };
};
const matchCoordinates = ()=>({
        x: matchDistance(),
        y: matchDistance()
    });
const matchListing = ({ matcher })=>{
    const captures = matcher();
    const result = [];
    if (!captures) {
        return result;
    }
    result.push(captures);
    while(scan({
        regexp: tokens.comma
    })){
        const nextCapture = matcher() ?? error({
            message: "One extra comma"
        });
        result.push(nextCapture);
    }
    return result;
};
const matchColorStop = ()=>{
    const color = matchColor() ?? error({
        message: "Expected color definition"
    });
    const length = matchDistance();
    return {
        ...color,
        length
    };
};
const matchColor = ()=>matchHexColor() || matchHSLAColor() || matchHSLColor() || matchRGBAColor() || matchRGBColor() || matchVarColor() || matchLiteralColor();
const matchLiteralColor = ()=>match({
        type: "literal",
        pattern: tokens.literalColor,
        captureIndex: 0
    });
const matchHexColor = ()=>match({
        type: "hex",
        pattern: tokens.hexColor,
        captureIndex: 1
    });
const matchRGBColor = ()=>matchCall({
        pattern: tokens.rgbColor,
        callback: ()=>({
                type: "rgb",
                value: matchListing({
                    matcher: matchNumber
                })
            })
    });
const matchRGBAColor = ()=>matchCall({
        pattern: tokens.rgbaColor,
        callback: ()=>({
                type: "rgba",
                value: matchListing({
                    matcher: matchNumber
                })
            })
    });
const matchVarColor = ()=>matchCall({
        pattern: tokens.varColor,
        callback: ()=>({
                type: "var",
                value: matchVariableName()
            })
    });
const matchHSLColor = ()=>matchCall({
        pattern: tokens.hslColor,
        callback: ()=>{
            const lookahead = scan({
                regexp: tokens.percentageValue
            });
            if (lookahead) {
                error({
                    message: "HSL hue value must be a number in degrees (0-360) or normalized (-360 to 360), not a percentage"
                });
            }
            const hue = matchNumber();
            scan({
                regexp: tokens.comma
            });
            let captures = scan({
                regexp: tokens.percentageValue
            });
            const sat = captures ? captures[1] : null;
            scan({
                regexp: tokens.comma
            });
            captures = scan({
                regexp: tokens.percentageValue
            });
            const light = captures ? captures[1] : null;
            const ensuredSat = sat ?? error({
                message: "Expected percentage value for saturation and lightness in HSL"
            });
            const ensuredLight = light ?? error({
                message: "Expected percentage value for saturation and lightness in HSL"
            });
            return {
                type: "hsl",
                value: [
                    hue,
                    ensuredSat,
                    ensuredLight
                ]
            };
        }
    });
const matchHSLAColor = ()=>matchCall({
        pattern: tokens.hslaColor,
        callback: ()=>{
            const hue = matchNumber();
            scan({
                regexp: tokens.comma
            });
            let captures = scan({
                regexp: tokens.percentageValue
            });
            const sat = captures ? captures[1] : null;
            scan({
                regexp: tokens.comma
            });
            captures = scan({
                regexp: tokens.percentageValue
            });
            const light = captures ? captures[1] : null;
            scan({
                regexp: tokens.comma
            });
            const alpha = matchNumber();
            const ensuredSat = sat ?? error({
                message: "Expected percentage value for saturation and lightness in HSLA"
            });
            const ensuredLight = light ?? error({
                message: "Expected percentage value for saturation and lightness in HSLA"
            });
            return {
                type: "hsla",
                value: [
                    hue,
                    ensuredSat,
                    ensuredLight,
                    alpha
                ]
            };
        }
    });
const matchVariableName = ()=>{
    const captures = scan({
        regexp: tokens.variableName
    }) ?? error({
        message: "Expected CSS variable name"
    });
    return captures[1];
};
const matchNumber = ()=>{
    const captures = scan({
        regexp: tokens.number
    }) ?? error({
        message: "Expected number"
    });
    return captures[1];
};
const matchDistance = ()=>match({
        type: "%",
        pattern: tokens.percentageValue,
        captureIndex: 1
    }) || matchPositionKeyword() || matchCalc() || matchLength();
const matchPositionKeyword = ()=>match({
        type: "position-keyword",
        pattern: tokens.positionKeywords,
        captureIndex: 1
    });
const matchCalc = ()=>matchCall({
        pattern: tokens.calcValue,
        callback: ()=>{
            let openParenCount = 1;
            let index = 0;
            while(openParenCount > 0 && index < input.length){
                const char = input.charAt(index);
                if (char === "(") {
                    openParenCount++;
                } else if (char === ")") {
                    openParenCount--;
                }
                index++;
            }
            if (openParenCount > 0) {
                error({
                    message: "Missing closing parenthesis in calc() expression"
                });
            }
            const calcContent = input.slice(0, index - 1);
            consume({
                size: index - 1
            });
            return {
                type: "calc",
                value: calcContent
            };
        }
    });
const matchLength = ()=>match({
        type: "px",
        pattern: tokens.pixelValue,
        captureIndex: 1
    }) || match({
        type: "em",
        pattern: tokens.emValue,
        captureIndex: 1
    });
const match = ({ type, pattern, captureIndex })=>{
    const captures = scan({
        regexp: pattern
    });
    if (!captures) {
        return undefined;
    }
    return {
        type,
        value: captures[captureIndex]
    };
};
const scan = ({ regexp })=>{
    const blankCaptures = /^[\n\r\t\s]+/.exec(input);
    if (blankCaptures) {
        consume({
            size: blankCaptures[0].length
        });
    }
    const captures = regexp.exec(input);
    if (captures) {
        consume({
            size: captures[0].length
        });
    }
    return captures;
};
const consume = ({ size })=>{
    input = input.slice(size);
};
const parseGradient = ({ code })=>{
    input = code.toString().trim();
    if (input.endsWith(";")) {
        input = input.slice(0, -1);
    }
    return getAst();
};
const GradientParser = {
    parse: parseGradient
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/gradients/canvas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drawCssBackground",
    ()=>drawCssBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$gradients$2f$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/gradients/parser.ts [app-client] (ecmascript)");
;
const gradientLayerPattern = /^(?:-(webkit|o|ms|moz)-)?(linear-gradient|repeating-linear-gradient|radial-gradient|repeating-radial-gradient)/i;
function drawCssBackground({ ctx, width, height, css }) {
    const layers = parseBackgroundLayers({
        css
    });
    const layersInPaintOrder = layers.slice().reverse();
    for (const layer of layersInPaintOrder){
        if (layer.type === "color") {
            ctx.fillStyle = layer.value;
            ctx.fillRect(0, 0, width, height);
            continue;
        }
        drawGradientLayer({
            ctx,
            width,
            height,
            gradient: layer.value
        });
    }
}
const parseBackgroundLayers = ({ css })=>{
    const segments = splitCssLayers({
        css
    });
    const layers = [];
    for (const segment of segments){
        if (!segment) {
            continue;
        }
        if (gradientLayerPattern.test(segment)) {
            try {
                const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$gradients$2f$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseGradient"])({
                    code: segment.trim()
                });
                for (const gradient of parsed){
                    layers.push({
                        type: "gradient",
                        value: gradient
                    });
                }
                continue;
            } catch  {
                layers.push({
                    type: "color",
                    value: segment
                });
                continue;
            }
        }
        layers.push({
            type: "color",
            value: segment
        });
    }
    return layers;
};
const splitCssLayers = ({ css })=>{
    const layers = [];
    let current = "";
    let depth = 0;
    for (const char of css){
        if (char === "(") {
            depth += 1;
        }
        if (char === ")") {
            depth = Math.max(0, depth - 1);
        }
        if (char === "," && depth === 0) {
            layers.push(current.trim());
            current = "";
            continue;
        }
        current += char;
    }
    if (current.trim()) {
        layers.push(current.trim());
    }
    return layers;
};
const drawGradientLayer = ({ ctx, width, height, gradient })=>{
    if (gradient.type.includes("linear")) {
        drawLinearGradient({
            ctx,
            width,
            height,
            gradient
        });
        return;
    }
    drawRadialGradient({
        ctx,
        width,
        height,
        gradient
    });
};
const drawLinearGradient = ({ ctx, width, height, gradient })=>{
    const { x0, y0, x1, y1, length } = resolveLinearPoints({
        width,
        height,
        orientation: gradient.orientation
    });
    const canvasGradient = ctx.createLinearGradient(x0, y0, x1, y1);
    const colorStops = normalizeColorStops({
        colorStops: gradient.colorStops,
        gradientLength: length
    });
    for (const stop of colorStops){
        canvasGradient.addColorStop(stop.offset, stop.color);
    }
    ctx.fillStyle = canvasGradient;
    ctx.fillRect(0, 0, width, height);
};
const drawRadialGradient = ({ ctx, width, height, gradient })=>{
    const { cx, cy, rx, ry } = resolveRadialDimensions({
        width,
        height,
        orientation: gradient.orientation
    });
    const gradientLength = Math.max(rx, ry);
    const colorStops = normalizeColorStops({
        colorStops: gradient.colorStops,
        gradientLength
    });
    if (rx === ry || ry === 0) {
        const canvasGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
        for (const stop of colorStops){
            canvasGradient.addColorStop(stop.offset, stop.color);
        }
        ctx.fillStyle = canvasGradient;
        ctx.fillRect(0, 0, width, height);
        return;
    }
    const scaleY = ry / rx;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, scaleY);
    const canvasGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    for (const stop of colorStops){
        canvasGradient.addColorStop(stop.offset, stop.color);
    }
    ctx.fillStyle = canvasGradient;
    ctx.fillRect(-cx, -cy / scaleY, width, height / scaleY);
    ctx.restore();
};
const resolveLinearPoints = ({ width, height, orientation })=>{
    const angle = resolveLinearAngle({
        orientation
    });
    const radians = angle * Math.PI / 180;
    const dx = Math.sin(radians);
    const dy = -Math.cos(radians);
    const centerX = width / 2;
    const centerY = height / 2;
    const halfLength = (Math.abs(width * dx) + Math.abs(height * dy)) / 2;
    const x0 = centerX - dx * halfLength;
    const y0 = centerY - dy * halfLength;
    const x1 = centerX + dx * halfLength;
    const y1 = centerY + dy * halfLength;
    const length = Math.hypot(x1 - x0, y1 - y0);
    return {
        x0,
        y0,
        x1,
        y1,
        length
    };
};
const resolveLinearAngle = ({ orientation })=>{
    if (!orientation) {
        return 180;
    }
    if (!Array.isArray(orientation)) {
        if (orientation.type === "angular") {
            return Number.parseFloat(orientation.value);
        }
        if (orientation.type === "directional") {
            return angleFromDirectional({
                value: orientation.value
            });
        }
    }
    return 180;
};
const angleFromDirectional = ({ value })=>{
    const normalized = value.toLowerCase().replace("to", "").trim();
    const parts = normalized.split(/\s+/).filter(Boolean);
    let dx = 0;
    let dy = 0;
    for (const part of parts){
        if (part === "left") {
            dx = -1;
        }
        if (part === "right") {
            dx = 1;
        }
        if (part === "top") {
            dy = -1;
        }
        if (part === "bottom") {
            dy = 1;
        }
    }
    if (dx === 0 && dy === 0) {
        return 180;
    }
    const angle = Math.atan2(dx, -dy) * 180 / Math.PI;
    return (angle + 360) % 360;
};
const resolveRadialDimensions = ({ width, height, orientation })=>{
    const centerFallback = {
        cx: width / 2,
        cy: height / 2
    };
    const radial = Array.isArray(orientation) ? orientation[0] : undefined;
    if (!radial) {
        const { rx, ry } = resolveRadialExtents({
            width,
            height,
            cx: centerFallback.cx,
            cy: centerFallback.cy,
            shape: "ellipse",
            extent: "farthest-corner"
        });
        return {
            ...centerFallback,
            rx,
            ry
        };
    }
    if (radial.type === "shape") {
        const { cx, cy } = resolveRadialCenter({
            width,
            height,
            position: radial.at
        });
        const shape = radial.value;
        if (radial.style && radial.style.type === "position") {
            const xDist = radial.style.value.x;
            const yDist = radial.style.value.y;
            const rx = xDist ? resolveEllipseDimension({
                distance: xDist,
                axisSize: width
            }) : width / 2;
            const ry = yDist ? resolveEllipseDimension({
                distance: yDist,
                axisSize: height
            }) : height / 2;
            return {
                cx,
                cy,
                rx,
                ry
            };
        }
        if (radial.style && radial.style.type !== "extent-keyword") {
            const resolvedRadius = resolveDistanceInPixels({
                distance: radial.style,
                axisSize: Math.max(width, height)
            });
            if (shape === "circle") {
                return {
                    cx,
                    cy,
                    rx: resolvedRadius ?? 0,
                    ry: resolvedRadius ?? 0
                };
            }
            const radius = resolvedRadius ?? 0;
            return {
                cx,
                cy,
                rx: radius,
                ry: radius
            };
        }
        const extent = radial.style && radial.style.type === "extent-keyword" ? radial.style.value : "farthest-corner";
        const { rx, ry } = resolveRadialExtents({
            width,
            height,
            cx,
            cy,
            shape,
            extent
        });
        return {
            cx,
            cy,
            rx,
            ry
        };
    }
    if (radial.type === "extent-keyword") {
        const { cx, cy } = resolveRadialCenter({
            width,
            height,
            position: radial.at
        });
        const { rx, ry } = resolveRadialExtents({
            width,
            height,
            cx,
            cy,
            shape: "ellipse",
            extent: radial.value
        });
        return {
            cx,
            cy,
            rx,
            ry
        };
    }
    const { cx, cy } = resolveRadialCenter({
        width,
        height,
        position: radial.at
    });
    const { rx, ry } = resolveRadialExtents({
        width,
        height,
        cx,
        cy,
        shape: "ellipse",
        extent: "farthest-corner"
    });
    return {
        cx,
        cy,
        rx,
        ry
    };
};
const resolveRadialCenter = ({ width, height, position })=>{
    if (!position) {
        return {
            cx: width / 2,
            cy: height / 2
        };
    }
    const normalized = normalizePositionKeywords({
        position
    });
    const cx = resolvePositionValue({
        distance: normalized.value.x,
        axisSize: width,
        axis: "x"
    });
    const cy = resolvePositionValue({
        distance: normalized.value.y,
        axisSize: height,
        axis: "y"
    });
    return {
        cx,
        cy
    };
};
const normalizePositionKeywords = ({ position })=>{
    const xValue = position.value.x;
    const yValue = position.value.y;
    if (xValue?.type === "position-keyword" && yValue?.type === "position-keyword") {
        const xKeyword = xValue.value.toLowerCase();
        const yKeyword = yValue.value.toLowerCase();
        const xIsVertical = xKeyword === "top" || xKeyword === "bottom";
        const yIsHorizontal = yKeyword === "left" || yKeyword === "right";
        if (xIsVertical && yIsHorizontal) {
            return {
                type: "position",
                value: {
                    x: {
                        type: "position-keyword",
                        value: yKeyword
                    },
                    y: {
                        type: "position-keyword",
                        value: xKeyword
                    }
                }
            };
        }
    }
    return position;
};
const resolveRadialExtents = ({ width, height, cx, cy, shape, extent })=>{
    const left = cx;
    const right = width - cx;
    const top = cy;
    const bottom = height - cy;
    if (shape === "circle") {
        const distances = [
            Math.hypot(left, top),
            Math.hypot(right, top),
            Math.hypot(left, bottom),
            Math.hypot(right, bottom)
        ];
        if (extent === "closest-side") {
            return {
                rx: Math.min(left, right, top, bottom),
                ry: 0
            };
        }
        if (extent === "farthest-side") {
            return {
                rx: Math.max(left, right, top, bottom),
                ry: 0
            };
        }
        if (extent === "closest-corner") {
            return {
                rx: Math.min(...distances),
                ry: 0
            };
        }
        return {
            rx: Math.max(...distances),
            ry: 0
        };
    }
    if (extent === "closest-side") {
        return {
            rx: Math.min(left, right),
            ry: Math.min(top, bottom)
        };
    }
    if (extent === "farthest-side") {
        return {
            rx: Math.max(left, right),
            ry: Math.max(top, bottom)
        };
    }
    const corners = [
        {
            dx: left,
            dy: top
        },
        {
            dx: right,
            dy: top
        },
        {
            dx: left,
            dy: bottom
        },
        {
            dx: right,
            dy: bottom
        }
    ];
    const sorted = corners.slice().sort((a, b)=>Math.hypot(a.dx, a.dy) - Math.hypot(b.dx, b.dy));
    const chosen = extent === "closest-corner" ? sorted[0] : sorted[sorted.length - 1];
    return {
        rx: Math.abs(chosen.dx),
        ry: Math.abs(chosen.dy)
    };
};
const resolvePositionValue = ({ distance, axisSize, axis })=>{
    if (!distance) {
        return axisSize / 2;
    }
    if (distance.type === "%") {
        return Number.parseFloat(distance.value) / 100 * axisSize;
    }
    if (distance.type === "position-keyword") {
        return keywordToPosition({
            value: distance.value,
            axisSize,
            axis
        });
    }
    if (distance.type === "px") {
        return Number.parseFloat(distance.value);
    }
    if (distance.type === "em") {
        return Number.parseFloat(distance.value) * 16;
    }
    return axisSize / 2;
};
const resolveDistanceInPixels = ({ distance, axisSize })=>{
    if (distance.type === "%") {
        return Number.parseFloat(distance.value) / 100 * axisSize;
    }
    if (distance.type === "px") {
        return Number.parseFloat(distance.value);
    }
    if (distance.type === "em") {
        return Number.parseFloat(distance.value) * 16;
    }
    return null;
};
const resolveEllipseDimension = ({ distance, axisSize })=>{
    if (distance.type === "%") {
        return Number.parseFloat(distance.value) / 100 * axisSize;
    }
    if (distance.type === "px") {
        return Number.parseFloat(distance.value);
    }
    if (distance.type === "em") {
        return Number.parseFloat(distance.value) * 16;
    }
    return axisSize / 2;
};
const keywordToPosition = ({ value, axisSize, axis })=>{
    const keyword = value.toLowerCase();
    if (keyword === "center") {
        return axisSize / 2;
    }
    if (axis === "x") {
        if (keyword === "left") {
            return 0;
        }
        if (keyword === "right") {
            return axisSize;
        }
    }
    if (axis === "y") {
        if (keyword === "top") {
            return 0;
        }
        if (keyword === "bottom") {
            return axisSize;
        }
    }
    return axisSize / 2;
};
const isTransparent = ({ color })=>{
    const lower = color.toLowerCase().trim();
    if (lower === "transparent") {
        return true;
    }
    const rgbaMatch = lower.match(/^rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)$/);
    if (rgbaMatch && Number.parseFloat(rgbaMatch[1]) === 0) {
        return true;
    }
    return false;
};
const parseColorToRgb = ({ color })=>{
    const lower = color.toLowerCase().trim();
    const hexMatch = lower.match(/^#([0-9a-f]{3,8})$/);
    if (hexMatch) {
        const hex = hexMatch[1];
        if (hex.length === 3) {
            return {
                r: Number.parseInt(hex[0] + hex[0], 16),
                g: Number.parseInt(hex[1] + hex[1], 16),
                b: Number.parseInt(hex[2] + hex[2], 16),
                a: 1
            };
        }
        if (hex.length === 6) {
            return {
                r: Number.parseInt(hex.slice(0, 2), 16),
                g: Number.parseInt(hex.slice(2, 4), 16),
                b: Number.parseInt(hex.slice(4, 6), 16),
                a: 1
            };
        }
        if (hex.length === 8) {
            return {
                r: Number.parseInt(hex.slice(0, 2), 16),
                g: Number.parseInt(hex.slice(2, 4), 16),
                b: Number.parseInt(hex.slice(4, 6), 16),
                a: Number.parseInt(hex.slice(6, 8), 16) / 255
            };
        }
    }
    const rgbMatch = lower.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
    if (rgbMatch) {
        return {
            r: Number.parseFloat(rgbMatch[1]),
            g: Number.parseFloat(rgbMatch[2]),
            b: Number.parseFloat(rgbMatch[3]),
            a: 1
        };
    }
    const rgbaMatch = lower.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
    if (rgbaMatch) {
        return {
            r: Number.parseFloat(rgbaMatch[1]),
            g: Number.parseFloat(rgbaMatch[2]),
            b: Number.parseFloat(rgbaMatch[3]),
            a: Number.parseFloat(rgbaMatch[4])
        };
    }
    return null;
};
const fixTransparentStops = ({ stops })=>{
    if (stops.length === 0) {
        return stops;
    }
    const result = stops.map((stop)=>({
            ...stop
        }));
    for(let i = 0; i < result.length; i++){
        if (!isTransparent({
            color: result[i].color
        })) {
            continue;
        }
        let donorColor = null;
        for(let j = i - 1; j >= 0; j--){
            if (!isTransparent({
                color: result[j].color
            })) {
                const parsed = parseColorToRgb({
                    color: result[j].color
                });
                if (parsed) {
                    donorColor = parsed;
                    break;
                }
            }
        }
        if (!donorColor) {
            for(let j = i + 1; j < result.length; j++){
                if (!isTransparent({
                    color: result[j].color
                })) {
                    const parsed = parseColorToRgb({
                        color: result[j].color
                    });
                    if (parsed) {
                        donorColor = parsed;
                        break;
                    }
                }
            }
        }
        if (donorColor) {
            result[i].color = `rgba(${donorColor.r},${donorColor.g},${donorColor.b},0)`;
        }
    }
    return result;
};
const normalizeColorStops = ({ colorStops, gradientLength })=>{
    const mappedStops = colorStops.map((stop)=>({
            color: colorToString({
                color: stop
            }),
            offset: resolveStopOffset({
                stop,
                gradientLength
            })
        }));
    const fixedStops = fixTransparentStops({
        stops: mappedStops
    });
    const resolvedStops = fixedStops.map((stop)=>({
            ...stop
        }));
    const knownIndices = resolvedStops.map((stop, index)=>stop.offset === null ? null : index).filter((index)=>index !== null);
    if (knownIndices.length === 0) {
        const step = resolvedStops.length > 1 ? 1 / (resolvedStops.length - 1) : 1;
        for(let index = 0; index < resolvedStops.length; index += 1){
            resolvedStops[index].offset = step * index;
        }
        return clampStops({
            stops: resolvedStops
        });
    }
    const firstKnown = knownIndices[0];
    if (resolvedStops[firstKnown].offset === null) {
        resolvedStops[firstKnown].offset = 0;
    }
    for(let index = 0; index < firstKnown; index += 1){
        const nextOffset = resolvedStops[firstKnown].offset ?? 0;
        resolvedStops[index].offset = nextOffset * index / firstKnown;
    }
    for(let i = 0; i < knownIndices.length - 1; i += 1){
        const startIndex = knownIndices[i];
        const endIndex = knownIndices[i + 1];
        const startOffset = resolvedStops[startIndex].offset ?? 0;
        const endOffset = resolvedStops[endIndex].offset ?? startOffset;
        const gap = endIndex - startIndex;
        if (gap <= 1) {
            continue;
        }
        const step = (endOffset - startOffset) / gap;
        for(let index = 1; index < gap; index += 1){
            resolvedStops[startIndex + index].offset = startOffset + step * index;
        }
    }
    const lastKnown = knownIndices[knownIndices.length - 1];
    const lastOffset = resolvedStops[lastKnown].offset ?? 1;
    if (lastKnown < resolvedStops.length - 1) {
        const gap = resolvedStops.length - 1 - lastKnown;
        const step = (1 - lastOffset) / gap;
        for(let index = 1; index <= gap; index += 1){
            resolvedStops[lastKnown + index].offset = lastOffset + step * index;
        }
    }
    return clampStops({
        stops: resolvedStops
    });
};
const clampStops = ({ stops })=>{
    return stops.map((stop)=>({
            color: stop.color,
            offset: clamp01({
                value: stop.offset ?? 0
            })
        }));
};
const resolveStopOffset = ({ stop, gradientLength })=>{
    if (!stop.length) {
        return null;
    }
    if (stop.length.type === "%") {
        return Number.parseFloat(stop.length.value) / 100;
    }
    if (stop.length.type === "px") {
        return Number.parseFloat(stop.length.value) / gradientLength;
    }
    if (stop.length.type === "em") {
        return Number.parseFloat(stop.length.value) * 16 / gradientLength;
    }
    return null;
};
const clamp01 = ({ value })=>{
    if (value < 0) {
        return 0;
    }
    if (value > 1) {
        return 1;
    }
    return value;
};
const colorToString = ({ color })=>{
    if (color.type === "hex") {
        return `#${color.value}`;
    }
    if (color.type === "literal") {
        return color.value;
    }
    if (color.type === "rgb") {
        return `rgb(${color.value.join(",")})`;
    }
    if (color.type === "rgba") {
        return `rgba(${color.value.join(",")})`;
    }
    if (color.type === "hsl") {
        return `hsl(${color.value.join(",")})`;
    }
    if (color.type === "hsla") {
        return `hsla(${color.value.join(",")})`;
    }
    return `var(${color.value})`;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/gradients/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$gradients$2f$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/gradients/parser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$gradients$2f$canvas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/gradients/canvas.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/diagnostics/render-perf.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Lightweight rolling perf instrumentation for the render pipeline.
 *
 * Toggle at runtime from the devtools console:
 *   window.__renderPerf = true
 *
 * Every FLUSH_EVERY frames the aggregator dumps:
 *   - per-span timing summary (count / mean / p50 / p95 / max, in ms)
 *   - per-counter totals (uploads, canvas allocations by kind, etc.)
 *
 * Zero overhead when disabled: `isRenderPerfEnabled()` short-circuits before
 * any recording happens, so call sites only pay for a global read.
 */ __turbopack_context__.s([
    "incrementCounter",
    ()=>incrementCounter,
    "isRenderPerfEnabled",
    ()=>isRenderPerfEnabled,
    "measureSpanAsync",
    ()=>measureSpanAsync,
    "measureSpanSync",
    ()=>measureSpanSync,
    "onRenderPerfFrameComplete",
    ()=>onRenderPerfFrameComplete,
    "recordSpan",
    ()=>recordSpan,
    "recordWasmFrameProfile",
    ()=>recordWasmFrameProfile
]);
const FLUSH_EVERY = 60;
const spans = new Map();
const counters = new Map();
const pendingCountersThisFrame = new Map();
let framesSinceFlush = 0;
function isRenderPerfEnabled() {
    return ("TURBOPACK compile-time value", "object") !== "undefined" && window.__renderPerf === true;
}
function recordSpan({ name, durationMs }) {
    if (!isRenderPerfEnabled()) return;
    let stats = spans.get(name);
    if (!stats) {
        stats = {
            samples: []
        };
        spans.set(name, stats);
    }
    stats.samples.push(durationMs);
}
async function measureSpanAsync({ name, fn }) {
    if (!isRenderPerfEnabled()) return fn();
    const start = performance.now();
    try {
        return await fn();
    } finally{
        recordSpan({
            name,
            durationMs: performance.now() - start
        });
    }
}
function measureSpanSync({ name, fn }) {
    if (!isRenderPerfEnabled()) return fn();
    const start = performance.now();
    try {
        return fn();
    } finally{
        recordSpan({
            name,
            durationMs: performance.now() - start
        });
    }
}
function incrementCounter({ name, by = 1 }) {
    if (!isRenderPerfEnabled()) return;
    pendingCountersThisFrame.set(name, (pendingCountersThisFrame.get(name) ?? 0) + by);
}
function recordWasmFrameProfile(entries) {
    if (!isRenderPerfEnabled()) return;
    for (const entry of entries){
        recordSpan({
            name: entry.name,
            durationMs: entry.durationMs
        });
    }
}
function onRenderPerfFrameComplete() {
    if (!isRenderPerfEnabled()) return;
    for (const [name, count] of pendingCountersThisFrame){
        let stats = counters.get(name);
        if (!stats) {
            stats = {
                total: 0,
                frames: 0
            };
            counters.set(name, stats);
        }
        stats.total += count;
        stats.frames += 1;
    }
    pendingCountersThisFrame.clear();
    framesSinceFlush += 1;
    if (framesSinceFlush >= FLUSH_EVERY) {
        flush();
    }
}
function flush() {
    const spanRows = [];
    for (const [name, stats] of spans){
        if (stats.samples.length === 0) continue;
        const sorted = [
            ...stats.samples
        ].sort((a, b)=>a - b);
        const p = (q)=>sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))];
        const sum = sorted.reduce((acc, v)=>acc + v, 0);
        spanRows.push({
            span: name,
            count: sorted.length,
            meanMs: +(sum / sorted.length).toFixed(2),
            p50Ms: +p(0.5).toFixed(2),
            p95Ms: +p(0.95).toFixed(2),
            maxMs: +sorted[sorted.length - 1].toFixed(2)
        });
    }
    spanRows.sort((a, b)=>Number(b.meanMs) - Number(a.meanMs));
    const counterRows = [];
    for (const [name, stats] of counters){
        counterRows.push({
            counter: name,
            perFrame: +(stats.total / Math.max(1, stats.frames)).toFixed(2),
            total: stats.total,
            frames: stats.frames
        });
    }
    counterRows.sort((a, b)=>Number(b.perFrame) - Number(a.perFrame));
    console.groupCollapsed(`[render-perf] summary over ${framesSinceFlush} frames`);
    if (spanRows.length > 0) console.table(spanRows);
    if (counterRows.length > 0) console.table(counterRows);
    console.groupEnd();
    spans.clear();
    counters.clear();
    framesSinceFlush = 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/fonts/system-fonts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SYSTEM_FONTS",
    ()=>SYSTEM_FONTS
]);
const SYSTEM_FONTS = new Set([
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "monospace",
    "sans-serif",
    "serif"
]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/fonts/google-fonts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearFontAtlasCache",
    ()=>clearFontAtlasCache,
    "getCachedFontAtlas",
    ()=>getCachedFontAtlas,
    "loadFontAtlas",
    ()=>loadFontAtlas,
    "loadFonts",
    ()=>loadFonts,
    "loadFullFont",
    ()=>loadFullFont
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fonts$2f$system$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/fonts/system-fonts.ts [app-client] (ecmascript)");
;
const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css2";
const FONT_ATLAS_PATH = "/fonts/font-atlas.json";
const FONT_CHUNK_PATH_PREFIX = "/fonts/font-chunk-";
const fullLoaded = new Set();
let cachedAtlas = null;
let atlasFetchPromise = null;
function encodeGoogleFontsFamily(family) {
    return family.replace(/ /g, "+");
}
function getCachedFontAtlas() {
    return cachedAtlas;
}
function clearFontAtlasCache() {
    cachedAtlas = null;
    atlasFetchPromise = null;
    fullLoaded.clear();
}
function loadFontAtlas() {
    if (cachedAtlas) return Promise.resolve(cachedAtlas);
    if (atlasFetchPromise) return atlasFetchPromise;
    atlasFetchPromise = fetch(FONT_ATLAS_PATH).then(async (response)=>{
        if (!response.ok) return null;
        const data = await response.json();
        cachedAtlas = data;
        preloadChunkImages({
            atlas: data
        });
        return data;
    }).catch(()=>null);
    return atlasFetchPromise;
}
function preloadChunkImages({ atlas }) {
    const maxChunk = Math.max(...Object.values(atlas.fonts).map((entry)=>entry.ch));
    for(let i = 0; i <= maxChunk; i++){
        // hint browser to preload chunk images without blocking
        const img = new Image();
        img.src = `${FONT_CHUNK_PATH_PREFIX}${i}.avif`;
    }
}
async function loadFullFont({ family, weights = [
    400,
    700
] }) {
    if (fullLoaded.has(family)) return;
    const url = `${GOOGLE_FONTS_CSS}?family=${encodeGoogleFontsFamily(family)}:wght@${weights.join(";")}&display=swap`;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
    await new Promise((resolve)=>{
        link.addEventListener("load", ()=>resolve(), {
            once: true
        });
        link.addEventListener("error", ()=>resolve(), {
            once: true
        });
    });
    await Promise.all(weights.map((weight)=>document.fonts.load(`${weight} 16px "${family.replace(/"/g, '\\"')}"`)));
    fullLoaded.add(family);
}
async function loadFonts({ families }) {
    const googleFonts = families.filter((family)=>!__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$fonts$2f$system$2d$fonts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SYSTEM_FONTS"].has(family));
    await Promise.all(googleFonts.map((family)=>loadFullFont({
            family
        })));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/ripple/shift.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rippleShiftElements",
    ()=>rippleShiftElements
]);
function rippleShiftElements({ elements, afterTime, shiftAmount }) {
    return elements.map((element)=>element.startTime >= afterTime ? {
            ...element,
            startTime: element.startTime - shiftAmount
        } : element);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/ripple/apply.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyRippleAdjustments",
    ()=>applyRippleAdjustments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$shift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/ripple/shift.ts [app-client] (ecmascript)");
;
function applyRippleAdjustments({ tracks, adjustments }) {
    if (adjustments.length === 0) {
        return tracks;
    }
    const adjustmentsByTrack = new Map();
    for (const adjustment of adjustments){
        const trackAdjustments = adjustmentsByTrack.get(adjustment.trackId) ?? [];
        trackAdjustments.push(adjustment);
        adjustmentsByTrack.set(adjustment.trackId, trackAdjustments);
    }
    return {
        overlay: tracks.overlay.map((track)=>applyTrackRippleAdjustments({
                track,
                adjustments: adjustmentsByTrack.get(track.id) ?? []
            })),
        main: applyTrackRippleAdjustments({
            track: tracks.main,
            adjustments: adjustmentsByTrack.get(tracks.main.id) ?? []
        }),
        audio: tracks.audio.map((track)=>applyTrackRippleAdjustments({
                track,
                adjustments: adjustmentsByTrack.get(track.id) ?? []
            }))
    };
}
function applyTrackRippleAdjustments({ track, adjustments }) {
    if (adjustments.length === 0) {
        return track;
    }
    const sortedAdjustments = [
        ...adjustments
    ].sort((firstAdjustment, secondAdjustment)=>secondAdjustment.afterTime - firstAdjustment.afterTime);
    let elements = track.elements;
    for (const adjustment of sortedAdjustments){
        elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$shift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rippleShiftElements"])({
            elements,
            afterTime: adjustment.afterTime,
            shiftAmount: adjustment.shiftAmount
        });
    }
    return {
        ...track,
        elements
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/ripple/diff.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeRippleAdjustments",
    ()=>computeRippleAdjustments
]);
function computeRippleAdjustments({ beforeTracks, afterTracks }) {
    const beforeTrackList = [
        ...beforeTracks.overlay,
        beforeTracks.main,
        ...beforeTracks.audio
    ];
    const afterTrackList = [
        ...afterTracks.overlay,
        afterTracks.main,
        ...afterTracks.audio
    ];
    const afterTracksById = new Map(afterTrackList.map((track)=>[
            track.id,
            track
        ]));
    const allAfterElementIds = new Set(afterTrackList.flatMap((track)=>track.elements.map((element)=>element.id)));
    return beforeTrackList.flatMap((beforeTrack)=>computeTrackRippleAdjustments({
            trackId: beforeTrack.id,
            beforeElements: beforeTrack.elements,
            afterElements: afterTracksById.get(beforeTrack.id)?.elements ?? [],
            allAfterElementIds
        }));
}
function computeTrackRippleAdjustments({ trackId, beforeElements, afterElements, allAfterElementIds }) {
    const beforeElementsById = buildElementSpanMap({
        elements: beforeElements
    });
    const afterElementsById = buildElementSpanMap({
        elements: afterElements
    });
    const { vacatedIntervals, joinedIntervals } = collectTrackIntervals({
        beforeElementsById,
        afterElementsById,
        allAfterElementIds
    });
    const freedIntervals = subtractIntervalSets({
        sourceIntervals: vacatedIntervals,
        overlappingIntervals: joinedIntervals
    });
    return buildAdjustments({
        trackId,
        intervals: freedIntervals
    });
}
function buildElementSpanMap({ elements }) {
    return new Map(elements.map((element)=>[
            element.id,
            {
                id: element.id,
                startTime: element.startTime,
                endTime: element.startTime + element.duration
            }
        ]));
}
function collectTrackIntervals({ beforeElementsById, afterElementsById, allAfterElementIds }) {
    const vacatedIntervals = [];
    const joinedIntervals = [];
    for (const beforeElement of beforeElementsById.values()){
        const afterElement = afterElementsById.get(beforeElement.id);
        if (!afterElement) {
            const wasMovedToAnotherTrack = allAfterElementIds.has(beforeElement.id);
            if (!wasMovedToAnotherTrack) {
                pushInterval({
                    intervals: vacatedIntervals,
                    startTime: beforeElement.startTime,
                    endTime: beforeElement.endTime
                });
            }
            continue;
        }
        if (beforeElement.endTime > afterElement.endTime) {
            pushInterval({
                intervals: vacatedIntervals,
                startTime: afterElement.endTime,
                endTime: beforeElement.endTime
            });
        }
    }
    for (const afterElement of afterElementsById.values()){
        if (beforeElementsById.has(afterElement.id)) {
            continue;
        }
        pushInterval({
            intervals: joinedIntervals,
            startTime: afterElement.startTime,
            endTime: afterElement.endTime
        });
    }
    return {
        vacatedIntervals: normalizeIntervals({
            intervals: vacatedIntervals
        }),
        joinedIntervals: normalizeIntervals({
            intervals: joinedIntervals
        })
    };
}
function buildAdjustments({ trackId, intervals }) {
    return intervals.flatMap((interval)=>{
        const shiftAmount = interval.endTime - interval.startTime;
        if (shiftAmount <= 0) {
            return [];
        }
        return [
            {
                trackId,
                afterTime: interval.endTime,
                shiftAmount
            }
        ];
    });
}
function subtractIntervalSets({ sourceIntervals, overlappingIntervals }) {
    const normalizedSourceIntervals = normalizeIntervals({
        intervals: sourceIntervals
    });
    const normalizedOverlappingIntervals = normalizeIntervals({
        intervals: overlappingIntervals
    });
    return normalizedSourceIntervals.flatMap((sourceInterval)=>subtractSingleInterval({
            sourceInterval,
            overlappingIntervals: normalizedOverlappingIntervals
        }));
}
function normalizeIntervals({ intervals }) {
    const validIntervals = [];
    for (const interval of intervals){
        pushInterval({
            intervals: validIntervals,
            startTime: interval.startTime,
            endTime: interval.endTime
        });
    }
    const sortedIntervals = validIntervals.sort((leftInterval, rightInterval)=>leftInterval.startTime - rightInterval.startTime);
    if (sortedIntervals.length === 0) {
        return [];
    }
    const mergedIntervals = [
        {
            ...sortedIntervals[0]
        }
    ];
    for (const interval of sortedIntervals.slice(1)){
        const previousInterval = mergedIntervals[mergedIntervals.length - 1];
        if (interval.startTime <= previousInterval.endTime) {
            previousInterval.endTime = Math.max(previousInterval.endTime, interval.endTime);
            continue;
        }
        mergedIntervals.push({
            ...interval
        });
    }
    return mergedIntervals;
}
function subtractSingleInterval({ sourceInterval, overlappingIntervals }) {
    let remainingIntervals = [
        {
            ...sourceInterval
        }
    ];
    for (const overlappingInterval of overlappingIntervals){
        remainingIntervals = remainingIntervals.flatMap((remainingInterval)=>{
            if (overlappingInterval.endTime <= remainingInterval.startTime || overlappingInterval.startTime >= remainingInterval.endTime) {
                return [
                    remainingInterval
                ];
            }
            const nextIntervals = [];
            pushInterval({
                intervals: nextIntervals,
                startTime: remainingInterval.startTime,
                endTime: overlappingInterval.startTime
            });
            pushInterval({
                intervals: nextIntervals,
                startTime: overlappingInterval.endTime,
                endTime: remainingInterval.endTime
            });
            return nextIntervals;
        });
        if (remainingIntervals.length === 0) {
            return [];
        }
    }
    return remainingIntervals;
}
function pushInterval({ intervals, startTime, endTime }) {
    if (endTime <= startTime) {
        return;
    }
    intervals.push({
        startTime,
        endTime
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/ripple/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$apply$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/ripple/apply.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$diff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/ripple/diff.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$ripple$2f$shift$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/ripple/shift.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/clipboard/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/clipboard/handlers/elements.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ElementsClipboardHandler",
    ()=>ElementsClipboardHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/index.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const ElementsClipboardHandler = {
    type: "elements",
    canCopy ({ selectedElements }) {
        return selectedElements.length > 0;
    },
    copy ({ editor, selectedElements }) {
        if (selectedElements.length === 0) {
            return null;
        }
        const results = editor.timeline.getElementsWithTracks({
            elements: selectedElements
        });
        const items = results.map(({ track, element })=>{
            const { id: _elementId, ...elementWithoutId } = element;
            return {
                trackId: track.id,
                trackType: track.type,
                element: elementWithoutId
            };
        });
        if (items.length === 0) {
            return null;
        }
        return {
            type: "elements",
            items
        };
    },
    paste ({ entry, context }) {
        if (entry.items.length === 0) {
            return null;
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasteCommand"]({
            time: context.time,
            clipboardItems: entry.items
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/clipboard/handlers/keyframes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "KeyframesClipboardHandler",
    ()=>KeyframesClipboardHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/animation/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/keyframe-query.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/channel-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/animation/interpolation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/commands/timeline/clipboard/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/wasm/media-time.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function resolveSingleSourceElement({ selectedKeyframes }) {
    const firstKeyframe = selectedKeyframes[0];
    if (!firstKeyframe) {
        return null;
    }
    const sourceElement = {
        trackId: firstKeyframe.trackId,
        elementId: firstKeyframe.elementId
    };
    const isSingleSource = selectedKeyframes.every((keyframe)=>keyframe.trackId === sourceElement.trackId && keyframe.elementId === sourceElement.elementId);
    return isSingleSource ? sourceElement : null;
}
function getCurvePatches({ element, propertyPath, keyframeId }) {
    const data = element.animations?.[propertyPath];
    if (!data) {
        return [];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$channel$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChannelEntriesFromData"])({
        data
    }).flatMap(([componentKey, channel])=>{
        if (!channel || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$interpolation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isScalarChannel"])(channel)) {
            return [];
        }
        const keyframe = channel.keys.find((candidate)=>candidate.id === keyframeId);
        if (!keyframe) {
            return [];
        }
        return [
            {
                componentKey,
                patch: {
                    leftHandle: keyframe.leftHandle ?? null,
                    rightHandle: keyframe.rightHandle ?? null,
                    segmentToNext: keyframe.segmentToNext,
                    tangentMode: keyframe.tangentMode
                }
            }
        ];
    });
}
function buildClipboardItem({ element, propertyPath, keyframeId }) {
    const keyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$animation$2f$keyframe$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKeyframeById"])({
        animations: element.animations,
        propertyPath,
        keyframeId
    });
    if (!keyframe) {
        return null;
    }
    return {
        propertyPath,
        time: keyframe.time,
        value: keyframe.value,
        interpolation: keyframe.interpolation,
        curvePatches: getCurvePatches({
            element,
            propertyPath,
            keyframeId
        })
    };
}
const KeyframesClipboardHandler = {
    type: "keyframes",
    canCopy ({ selectedKeyframes }) {
        return selectedKeyframes.length > 0;
    },
    copy ({ editor, selectedKeyframes }) {
        const sourceElement = resolveSingleSourceElement({
            selectedKeyframes
        });
        if (!sourceElement) {
            return null;
        }
        const [result] = editor.timeline.getElementsWithTracks({
            elements: [
                sourceElement
            ]
        });
        if (!result) {
            return null;
        }
        const rawItems = selectedKeyframes.flatMap((keyframeRef)=>{
            const item = buildClipboardItem({
                element: result.element,
                propertyPath: keyframeRef.propertyPath,
                keyframeId: keyframeRef.keyframeId
            });
            return item ? [
                item
            ] : [];
        });
        if (rawItems.length === 0) {
            return null;
        }
        const minTime = Math.min(...rawItems.map((item)=>item.time));
        const minTimeMedia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundMediaTime"])({
            time: minTime
        });
        const items = rawItems.map(({ time, ...item })=>({
                ...item,
                timeOffset: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$wasm$2f$media$2d$time$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMediaTime"])({
                    a: time,
                    b: minTimeMedia
                })
            })).sort((left, right)=>left.timeOffset - right.timeOffset || left.propertyPath.localeCompare(right.propertyPath));
        return {
            type: "keyframes",
            sourceElement,
            items
        };
    },
    paste ({ entry, context: { selectedElements, time } }) {
        const targetElement = selectedElements[0];
        if (!targetElement || entry.items.length === 0) {
            return null;
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$commands$2f$timeline$2f$clipboard$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PasteKeyframesCommand"]({
            trackId: targetElement.trackId,
            elementId: targetElement.elementId,
            time,
            clipboardItems: entry.items
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/clipboard/handlers/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildPasteClipboardCommand",
    ()=>buildPasteClipboardCommand,
    "clipboardCopyHandlers",
    ()=>clipboardCopyHandlers,
    "clipboardHandlers",
    ()=>clipboardHandlers,
    "copyClipboardEntry",
    ()=>copyClipboardEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/clipboard/handlers/elements.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/clipboard/handlers/keyframes.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const clipboardHandlers = {
    elements: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ElementsClipboardHandler"],
    keyframes: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframesClipboardHandler"]
};
const clipboardCopyHandlers = [
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$keyframes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframesClipboardHandler"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ElementsClipboardHandler"]
];
function copyClipboardEntry({ context }) {
    for (const handler of clipboardCopyHandlers){
        if (!handler.canCopy(context)) {
            continue;
        }
        return handler.copy(context);
    }
    return null;
}
function buildPasteClipboardCommand({ entry, context }) {
    const handler = clipboardHandlers[entry.type];
    return handler.paste({
        entry: entry,
        context
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/clipboard/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/clipboard/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/clipboard/handlers/index.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$clipboard$2f$handlers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/transcription/diagnostics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "TRANSCRIPTION_DIAGNOSTICS_SCOPE",
    ()=>TRANSCRIPTION_DIAGNOSTICS_SCOPE,
    "registerTranscriptionDiagnostics",
    ()=>registerTranscriptionDiagnostics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/media/audio.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const TRANSCRIPTION_DIAGNOSTICS_SCOPE = "transcription";
function registerTranscriptionDiagnostics({ diagnostics }) {
    diagnostics.register({
        id: "transcription.no_audio",
        scope: TRANSCRIPTION_DIAGNOSTICS_SCOPE,
        severity: "caution",
        message: "No audio detected. Add a clip with audio to the timeline first.",
        check: (editor)=>{
            const scene = editor.scenes.getActiveSceneOrNull();
            if (!scene) return false;
            return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$media$2f$audio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timelineHasAudio"])({
                tracks: scene.tracks,
                mediaAssets: editor.media.getAssets()
            });
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/editor/use-editor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "useEditor",
    ()=>useEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/core/index.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
var _s = __turbopack_context__.k.signature();
;
;
const SNAPSHOT_UNSET = Symbol("snapshotUnset");
function isShallowEqual({ a, b }) {
    if (Object.is(a, b)) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((item, i)=>Object.is(item, b[i]));
}
const subscribeNone = ()=>()=>{};
function useEditor(selector) {
    _s();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useEditor.useMemo[editor]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$core$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorCore"].getInstance()
    }["useEditor.useMemo[editor]"], []);
    const snapshotCacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(SNAPSHOT_UNSET);
    const subscribeAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditor.useCallback[subscribeAll]": (onChange)=>{
            const unsubscribers = [
                editor.playback.subscribe(onChange),
                editor.timeline.subscribe(onChange),
                editor.scenes.subscribe(onChange),
                editor.project.subscribe(onChange),
                editor.media.subscribe(onChange),
                editor.renderer.subscribe(onChange),
                editor.selection.subscribe(onChange),
                editor.clipboard.subscribe(onChange),
                editor.diagnostics.subscribe(onChange)
            ];
            return ({
                "useEditor.useCallback[subscribeAll]": ()=>{
                    unsubscribers.forEach({
                        "useEditor.useCallback[subscribeAll]": (unsubscribe)=>{
                            unsubscribe();
                        }
                    }["useEditor.useCallback[subscribeAll]"]);
                }
            })["useEditor.useCallback[subscribeAll]"];
        }
    }["useEditor.useCallback[subscribeAll]"], [
        editor
    ]);
    const getSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditor.useCallback[getSnapshot]": ()=>{
            if (!selector) {
                return editor;
            }
            const next = selector(editor);
            if (snapshotCacheRef.current !== SNAPSHOT_UNSET && isShallowEqual({
                a: snapshotCacheRef.current,
                b: next
            })) {
                return snapshotCacheRef.current;
            }
            snapshotCacheRef.current = next;
            return next;
        }
    }["useEditor.useCallback[getSnapshot]"], [
        editor,
        selector
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(selector ? subscribeAll : subscribeNone, getSnapshot, getSnapshot);
}
_s(useEditor, "y8RZrJ/rpOvhRLcrqBNhCG7LL1M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/project/components/migration-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MigrationDialog",
    ()=>MigrationDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/editor/use-editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$lucide$2d$react$40$0$2e$562$2e$0$2b$3f10a4be4e334a9b$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/lucide-react@0.562.0+3f10a4be4e334a9b/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MigrationDialog() {
    _s();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const migrationState = editor.project.getMigrationState();
    if (!migrationState.isMigrating) return null;
    const title = migrationState.projectName ? "Updating project" : "Updating projects";
    const description = migrationState.projectName ? `Upgrading "${migrationState.projectName}" from v${migrationState.fromVersion} to v${migrationState.toVersion}` : `Upgrading projects from v${migrationState.fromVersion} to v${migrationState.toVersion}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-md",
            onPointerDownOutside: (event)=>event.preventDefault(),
            onEscapeKeyDown: (event)=>event.preventDefault(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/migration-dialog.tsx",
                            lineNumber: 34,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/migration-dialog.tsx",
                            lineNumber: 35,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/project/components/migration-dialog.tsx",
                    lineNumber: 33,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$lucide$2d$react$40$0$2e$562$2e$0$2b$3f10a4be4e334a9b$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "text-muted-foreground size-8 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/project/components/migration-dialog.tsx",
                        lineNumber: 39,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/project/components/migration-dialog.tsx",
                    lineNumber: 38,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/project/components/migration-dialog.tsx",
            lineNumber: 28,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/project/components/migration-dialog.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, this);
}
_s(MigrationDialog, "t0rsU/t1p+LiVrRpHUSgNnV9Lz4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$editor$2f$use$2d$editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"]
    ];
});
_c = MigrationDialog;
var _c;
__turbopack_context__.k.register(_c, "MigrationDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/project/components/delete-project-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeleteProjectDialog",
    ()=>DeleteProjectDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/input.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
function DeleteProjectDialog({ isOpen, onOpenChange, onConfirm, projectNames }) {
    const count = projectNames.length;
    const isSingle = count === 1;
    const singleName = isSingle ? projectNames[0] : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            onOpenAutoFocus: (event)=>{
                event.preventDefault();
                event.stopPropagation();
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: singleName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                "Delete '",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block max-w-[300px] truncate align-bottom",
                                    children: singleName
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                                    lineNumber: 42,
                                    columnNumber: 9
                                }, this),
                                "'?"
                            ]
                        }, void 0, true) : `Delete ${count} projects?`
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                        lineNumber: 38,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                    lineNumber: 37,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBody"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                            variant: "destructive",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertTitle"], {
                                    children: "Warning"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                                    lineNumber: 54,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                    children: [
                                        "This will permanently delete",
                                        " ",
                                        singleName ? `"${singleName}"` : `${count} projects`,
                                        " and all associated files."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                                    lineNumber: 55,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                            lineNumber: 53,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs font-semibold text-slate-500",
                                    children: 'Type "DELETE" to confirm'
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                                    lineNumber: 62,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    type: "text",
                                    placeholder: "DELETE",
                                    size: "lg",
                                    variant: "destructive"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                                    lineNumber: 65,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                            lineNumber: 61,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                    lineNumber: 52,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: ()=>onOpenChange(false),
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                            lineNumber: 74,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "destructive",
                            onClick: onConfirm,
                            children: "Delete project"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                            lineNumber: 77,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
                    lineNumber: 73,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
            lineNumber: 31,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/project/components/delete-project-dialog.tsx",
        lineNumber: 30,
        columnNumber: 3
    }, this);
}
_c = DeleteProjectDialog;
var _c;
__turbopack_context__.k.register(_c, "DeleteProjectDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/project/components/project-info-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ProjectInfoDialog",
    ()=>ProjectInfoDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/date.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/opencut-wasm@0.2.10/node_modules/opencut-wasm/opencut_wasm_bg.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function InfoRow({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between items-center py-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted-foreground text-sm",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                lineNumber: 23,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-medium",
                children: value
            }, void 0, false, {
                fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                lineNumber: 24,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this);
}
_c = InfoRow;
function ProjectInfoDialog({ isOpen, onOpenChange, project }) {
    const durationSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaTimeToSeconds"])({
        time: project.duration
    });
    const durationFormatted = project.duration > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$opencut$2d$wasm$40$0$2e$2$2e$10$2f$node_modules$2f$opencut$2d$wasm$2f$opencut_wasm_bg$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTimecode"])({
        time: project.duration,
        format: durationSeconds >= 3600 ? "HH:MM:SS" : "MM:SS"
    }) ?? "" : "0:00";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            onOpenAutoFocus: (event)=>event.preventDefault(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "truncate max-w-[350px]",
                        children: project.name
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                        lineNumber: 48,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                    lineNumber: 47,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBody"], {
                    className: "flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Duration",
                            value: durationFormatted
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                            lineNumber: 54,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Created",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])({
                                date: project.createdAt
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                            lineNumber: 55,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Modified",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDate"])({
                                date: project.updatedAt
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                            lineNumber: 59,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                            label: "Project ID",
                            value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "text-xs bg-muted px-1.5 py-0.5 rounded",
                                children: project.id.slice(0, 8)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                                lineNumber: 66,
                                columnNumber: 8
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                            lineNumber: 63,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                    lineNumber: 53,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: ()=>onOpenChange(false),
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                            lineNumber: 73,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>onOpenChange(false),
                            children: "Done"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                            lineNumber: 76,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
                    lineNumber: 72,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
            lineNumber: 46,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/project/components/project-info-dialog.tsx",
        lineNumber: 45,
        columnNumber: 3
    }, this);
}
_c1 = ProjectInfoDialog;
var _c, _c1;
__turbopack_context__.k.register(_c, "InfoRow");
__turbopack_context__.k.register(_c1, "ProjectInfoDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/project/components/rename-project-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RenameProjectDialog",
    ()=>RenameProjectDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/label.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function RenameProjectDialog({ isOpen, onOpenChange, onConfirm, projectName }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(projectName);
    const handleOpenChange = (open)=>{
        if (open) {
            setName(projectName);
        }
        onOpenChange(open);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: handleOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: "Rename project"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                        lineNumber: 38,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                    lineNumber: 37,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogBody"], {
                    className: "gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            children: "New name"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                            lineNumber: 42,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            value: name,
                            onChange: (e)=>setName(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    onConfirm(name);
                                }
                            },
                            placeholder: "Enter a new name"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                            lineNumber: 43,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                    lineNumber: 41,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                onOpenChange(false);
                            },
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                            lineNumber: 57,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>onConfirm(name),
                            children: "Rename"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                            lineNumber: 67,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
                    lineNumber: 56,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
            lineNumber: 36,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/project/components/rename-project-dialog.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, this);
}
_s(RenameProjectDialog, "J6h2qsHe78WPjXMn768HRoV1gXs=");
_c = RenameProjectDialog;
var _c;
__turbopack_context__.k.register(_c, "RenameProjectDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/changelog/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReleaseByVersion",
    ()=>getReleaseByVersion,
    "getSectionTitle",
    ()=>getSectionTitle,
    "getSortedReleases",
    ()=>getSortedReleases,
    "groupAndOrderChanges",
    ()=>groupAndOrderChanges,
    "isSectionCollapsible",
    ()=>isSectionCollapsible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$content$2d$collections$2f$generated$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/.content-collections/generated/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$content$2d$collections$2f$generated$2f$allChangelogs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__allChangelogs$3e$__ = __turbopack_context__.i("[project]/apps/web/.content-collections/generated/allChangelogs.js [app-client] (ecmascript) <export default as allChangelogs>");
;
const knownSectionConfigs = {
    new: {
        title: "Features",
        order: 0
    },
    improved: {
        title: "Improvements",
        order: 1
    },
    fixed: {
        title: "Fixes",
        order: 2
    },
    breaking: {
        title: "Breaking Changes",
        order: 3
    },
    technical: {
        title: "Technical details",
        order: 4,
        collapsible: true
    }
};
function getSectionConfig({ type }) {
    return knownSectionConfigs[type] ?? {
        title: type.charAt(0).toUpperCase() + type.slice(1),
        order: Number.MAX_SAFE_INTEGER
    };
}
function getSectionTitle({ type }) {
    return getSectionConfig({
        type
    }).title;
}
function isSectionCollapsible({ type }) {
    return getSectionConfig({
        type
    }).collapsible ?? false;
}
function groupAndOrderChanges({ changes }) {
    const typeEncounterOrder = new Map();
    const grouped = changes.reduce((acc, change)=>{
        if (!typeEncounterOrder.has(change.type)) {
            typeEncounterOrder.set(change.type, typeEncounterOrder.size);
        }
        if (!acc[change.type]) acc[change.type] = [];
        acc[change.type].push(change);
        return acc;
    }, {});
    const orderedTypes = Object.keys(grouped).sort((left, right)=>{
        const orderDifference = getSectionConfig({
            type: left
        }).order - getSectionConfig({
            type: right
        }).order;
        if (orderDifference !== 0) {
            return orderDifference;
        }
        return (typeEncounterOrder.get(left) ?? Number.MAX_SAFE_INTEGER) - (typeEncounterOrder.get(right) ?? Number.MAX_SAFE_INTEGER);
    });
    return {
        grouped,
        orderedTypes
    };
}
function isPublishedRelease({ published }) {
    return published !== false;
}
function getSortedReleases() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$content$2d$collections$2f$generated$2f$allChangelogs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__allChangelogs$3e$__["allChangelogs"].filter(isPublishedRelease).sort((a, b)=>b.version.localeCompare(a.version, undefined, {
            numeric: true
        }));
}
function getReleaseByVersion({ version }) {
    return getSortedReleases().find((release)=>release.version === version);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/changelog/components/changelog-notification.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChangelogNotification",
    ()=>ChangelogNotification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.3+21ccd8898788a04d/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+core-free-icons@3.3.0/node_modules/@hugeicons/core-free-icons/dist/esm/Cancel01Icon.js [app-client] (ecmascript) <export default as Cancel01Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/@hugeicons+react@1.1.6+3f10a4be4e334a9b/node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$changelog$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/changelog/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const STORAGE_KEY = "last-seen-version";
function ChangelogNotification() {
    _s();
    const [release, setRelease] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChangelogNotification.useEffect": ()=>{
            const releases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$changelog$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedReleases"])();
            const latest = releases[0];
            if (!latest) return;
            let storedVersion = null;
            try {
                storedVersion = localStorage.getItem(STORAGE_KEY);
            } catch  {
            // localStorage unavailable
            }
            const isOutdated = storedVersion === null || storedVersion.localeCompare(latest.version, undefined, {
                numeric: true
            }) < 0;
            // TODO(v0.4): revert to the standard "null = first-time visitor, record silently"
            // path. The null case intentionally shows the card for this release so existing
            // users who never had the key get the 0.3.0 announcement.
            if (!isOutdated) return;
            try {
                localStorage.setItem(STORAGE_KEY, latest.version);
            } catch  {
            // ignore
            }
            setRelease(latest);
        }
    }["ChangelogNotification.useEffect"], []);
    if (!release) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-5 left-5 z-50 flex w-72 flex-col gap-3 rounded-xl border bg-card p-4 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold leading-snug",
                                children: release.title
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                                lineNumber: 54,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                    "v",
                                    release.version
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                                lineNumber: 57,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                        lineNumber: 53,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "-mr-1 -mt-1 shrink-0",
                        onClick: ()=>setRelease(null),
                        "aria-label": "Dismiss",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$react$40$1$2e$1$2e$6$2b$3f10a4be4e334a9b$2f$node_modules$2f40$hugeicons$2f$react$2f$dist$2f$esm$2f$HugeiconsIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HugeiconsIcon"], {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f40$hugeicons$2b$core$2d$free$2d$icons$40$3$2e$3$2e$0$2f$node_modules$2f40$hugeicons$2f$core$2d$free$2d$icons$2f$dist$2f$esm$2f$Cancel01Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cancel01Icon$3e$__["Cancel01Icon"],
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                            lineNumber: 68,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                        lineNumber: 61,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                lineNumber: 52,
                columnNumber: 4
            }, this),
            release.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs leading-relaxed text-muted-foreground",
                children: release.summary
            }, void 0, false, {
                fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                lineNumber: 73,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    asChild: true,
                    size: "sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$3$2b$21ccd8898788a04d$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/changelog",
                        onClick: ()=>setRelease(null),
                        children: "See full changelog"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                        lineNumber: 80,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                    lineNumber: 79,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
                lineNumber: 78,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/changelog/components/changelog-notification.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this);
}
_s(ChangelogNotification, "x46wH1Y5WUaQ8o+ljdpeqXji9DA=");
_c = ChangelogNotification;
var _c;
__turbopack_context__.k.register(_c, "ChangelogNotification");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_c78de45d._.js.map