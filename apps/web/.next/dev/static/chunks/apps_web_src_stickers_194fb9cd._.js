(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/stickers/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STICKER_CATEGORIES",
    ()=>STICKER_CATEGORIES
]);
const STICKER_CATEGORIES = {
    all: "All",
    // v0.4.0
    // logos: "Logos",
    flags: "Flags",
    shapes: "Shapes"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/stickers/intrinsic-size.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STICKER_INTRINSIC_SIZE_FALLBACK",
    ()=>STICKER_INTRINSIC_SIZE_FALLBACK
]);
const STICKER_INTRINSIC_SIZE_FALLBACK = 200;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/stickers/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "StickersRegistry",
    ()=>StickersRegistry,
    "stickersRegistry",
    ()=>stickersRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/params/registry.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class StickersRegistry extends __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$params$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefinitionRegistry"] {
    constructor(){
        super("sticker provider");
    }
}
const stickersRegistry = new StickersRegistry();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/stickers/sticker-id.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildStickerId",
    ()=>buildStickerId,
    "parseStickerId",
    ()=>parseStickerId
]);
function parseStickerId({ stickerId }) {
    const normalizedStickerId = stickerId.trim();
    if (!normalizedStickerId) {
        throw new Error("Sticker ID must be a non-empty string");
    }
    const separatorIndex = normalizedStickerId.indexOf(":");
    if (separatorIndex <= 0 || separatorIndex === normalizedStickerId.length - 1) {
        throw new Error(`Invalid sticker ID format: "${stickerId}". Expected "provider:value".`);
    }
    const providerId = normalizedStickerId.slice(0, separatorIndex).trim();
    const providerValue = normalizedStickerId.slice(separatorIndex + 1).trim();
    return {
        providerId,
        providerValue
    };
}
function buildStickerId({ providerId, providerValue }) {
    return `${providerId}:${providerValue}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/stickers/providers/countries-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COUNTRIES",
    ()=>COUNTRIES,
    "REGIONS",
    ()=>REGIONS,
    "REGION_GROUPS",
    ()=>REGION_GROUPS
]);
const REGIONS = [
    {
        id: "Western Europe",
        aliases: [
            "west europe"
        ]
    },
    {
        id: "Eastern Europe",
        aliases: [
            "east europe"
        ]
    },
    {
        id: "Northern Europe",
        aliases: [
            "north europe"
        ]
    },
    {
        id: "Southern Europe",
        aliases: [
            "south europe"
        ]
    },
    {
        id: "South Asia",
        aliases: [
            "southern asia"
        ]
    },
    {
        id: "Southeast Asia",
        aliases: [
            "south east asia"
        ]
    },
    {
        id: "East Asia",
        aliases: [
            "eastern asia",
            "far east"
        ]
    },
    {
        id: "Central Asia",
        aliases: []
    },
    {
        id: "Middle East",
        aliases: [
            "west asia"
        ]
    },
    {
        id: "North Africa",
        aliases: [
            "northern africa"
        ]
    },
    {
        id: "Sub-Saharan Africa",
        aliases: [
            "subsaharan africa"
        ]
    },
    {
        id: "North America",
        aliases: [
            "northern america"
        ]
    },
    {
        id: "South America",
        aliases: [
            "southern america",
            "latin america"
        ]
    },
    {
        id: "Central America",
        aliases: [
            "central am"
        ]
    },
    {
        id: "Caribbean",
        aliases: [
            "caribbean islands"
        ]
    },
    {
        id: "Oceania",
        aliases: [
            "pacific",
            "pacific islands"
        ]
    },
    {
        id: "Antarctica",
        aliases: []
    },
    {
        id: "Atlantic Ocean",
        aliases: [
            "atlantic"
        ]
    },
    {
        id: "North Atlantic",
        aliases: []
    }
];
const REGION_GROUPS = {
    europe: [
        "Western Europe",
        "Eastern Europe",
        "Northern Europe",
        "Southern Europe"
    ],
    asia: [
        "South Asia",
        "Southeast Asia",
        "East Asia",
        "Central Asia"
    ],
    africa: [
        "Sub-Saharan Africa",
        "North Africa"
    ],
    america: [
        "North America",
        "South America",
        "Central America",
        "Caribbean"
    ]
};
const COUNTRIES = [
    {
        "name": "Andorra",
        "code": "AD",
        "languages": [
            "catalan"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red"
        ],
        "region": "Western Europe"
    },
    {
        "name": "United Arab Emirates",
        "code": "AE",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "green",
            "white",
            "black"
        ],
        "region": "Middle East"
    },
    {
        "name": "Afghanistan",
        "code": "AF",
        "languages": [
            "dari",
            "pashto"
        ],
        "flag_colors": [
            "black",
            "red",
            "green"
        ],
        "region": "South Asia"
    },
    {
        "name": "Antigua and Barbuda",
        "code": "AG",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "black",
            "blue",
            "white",
            "yellow"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Anguilla",
        "code": "AI",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "orange"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Albania",
        "code": "AL",
        "languages": [
            "albanian"
        ],
        "flag_colors": [
            "red",
            "black"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Armenia",
        "code": "AM",
        "languages": [
            "armenian"
        ],
        "flag_colors": [
            "red",
            "blue",
            "orange"
        ],
        "region": "Middle East"
    },
    {
        "name": "Angola",
        "code": "AO",
        "languages": [
            "portuguese"
        ],
        "flag_colors": [
            "red",
            "black",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Antarctica",
        "code": "AQ",
        "languages": [],
        "flag_colors": [],
        "region": "Antarctica"
    },
    {
        "name": "Argentina",
        "code": "AR",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "blue",
            "white",
            "yellow"
        ],
        "region": "South America"
    },
    {
        "name": "American Samoa",
        "code": "AS",
        "languages": [
            "english",
            "samoan"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Oceania"
    },
    {
        "name": "Austria",
        "code": "AT",
        "languages": [
            "german"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Australia",
        "code": "AU",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Oceania"
    },
    {
        "name": "Aruba",
        "code": "AW",
        "languages": [
            "dutch",
            "papiamento"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red",
            "white"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Aland Islands",
        "code": "AX",
        "languages": [
            "swedish"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Azerbaijan",
        "code": "AZ",
        "languages": [
            "azerbaijani"
        ],
        "flag_colors": [
            "blue",
            "red",
            "green",
            "white"
        ],
        "region": "Middle East"
    },
    {
        "name": "Bosnia and Herzegovina",
        "code": "BA",
        "languages": [
            "bosnian",
            "croatian",
            "serbian"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "white"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Barbados",
        "code": "BB",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "black"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Bangladesh",
        "code": "BD",
        "languages": [
            "bengali"
        ],
        "flag_colors": [
            "green",
            "red"
        ],
        "region": "South Asia"
    },
    {
        "name": "Belgium",
        "code": "BE",
        "languages": [
            "french",
            "dutch",
            "german"
        ],
        "flag_colors": [
            "black",
            "yellow",
            "red"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Burkina Faso",
        "code": "BF",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "red",
            "green",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Bulgaria",
        "code": "BG",
        "languages": [
            "bulgarian"
        ],
        "flag_colors": [
            "white",
            "green",
            "red"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Bahrain",
        "code": "BH",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Middle East"
    },
    {
        "name": "Burundi",
        "code": "BI",
        "languages": [
            "kirundi",
            "french",
            "english"
        ],
        "flag_colors": [
            "red",
            "green",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Benin",
        "code": "BJ",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Saint Barthelemy",
        "code": "BL",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Bermuda",
        "code": "BM",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "North Atlantic"
    },
    {
        "name": "Brunei",
        "code": "BN",
        "languages": [
            "malay"
        ],
        "flag_colors": [
            "yellow",
            "white",
            "black",
            "red"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Bolivia",
        "code": "BO",
        "languages": [
            "spanish",
            "quechua",
            "aymara"
        ],
        "flag_colors": [
            "red",
            "yellow",
            "green"
        ],
        "region": "South America"
    },
    {
        "name": "Caribbean Netherlands",
        "code": "BQ",
        "languages": [
            "dutch",
            "papiamento",
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Brazil",
        "code": "BR",
        "languages": [
            "portuguese"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "blue",
            "white"
        ],
        "region": "South America"
    },
    {
        "name": "Bahamas",
        "code": "BS",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "black"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Bhutan",
        "code": "BT",
        "languages": [
            "dzongkha"
        ],
        "flag_colors": [
            "yellow",
            "orange",
            "white"
        ],
        "region": "South Asia"
    },
    {
        "name": "Bouvet Island",
        "code": "BV",
        "languages": [],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Antarctica"
    },
    {
        "name": "Botswana",
        "code": "BW",
        "languages": [
            "english",
            "tswana"
        ],
        "flag_colors": [
            "blue",
            "black",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Belarus",
        "code": "BY",
        "languages": [
            "belarusian",
            "russian"
        ],
        "flag_colors": [
            "red",
            "green",
            "white"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Belize",
        "code": "BZ",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "red",
            "white"
        ],
        "region": "Central America"
    },
    {
        "name": "Canada",
        "code": "CA",
        "languages": [
            "english",
            "french"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "North America"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "code": "CC",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "red",
            "yellow",
            "white"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Democratic Republic of the Congo",
        "code": "CD",
        "languages": [
            "french",
            "lingala",
            "swahili",
            "tshiluba",
            "kikongo"
        ],
        "flag_colors": [
            "blue",
            "red",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Central African Republic",
        "code": "CF",
        "languages": [
            "french",
            "sango"
        ],
        "flag_colors": [
            "blue",
            "white",
            "green",
            "yellow",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Republic of the Congo",
        "code": "CG",
        "languages": [
            "french",
            "lingala",
            "kituba"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Switzerland",
        "code": "CH",
        "languages": [
            "german",
            "french",
            "italian"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Cote d'Ivoire",
        "code": "CI",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "orange",
            "white",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Cook Islands",
        "code": "CK",
        "languages": [
            "english",
            "cook islands maori"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Chile",
        "code": "CL",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "white",
            "red",
            "blue"
        ],
        "region": "South America"
    },
    {
        "name": "Cameroon",
        "code": "CM",
        "languages": [
            "english",
            "french"
        ],
        "flag_colors": [
            "green",
            "red",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "China",
        "code": "CN",
        "languages": [
            "mandarin"
        ],
        "flag_colors": [
            "red",
            "yellow"
        ],
        "region": "East Asia"
    },
    {
        "name": "Colombia",
        "code": "CO",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "yellow",
            "blue",
            "red"
        ],
        "region": "South America"
    },
    {
        "name": "Costa Rica",
        "code": "CR",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Central America"
    },
    {
        "name": "Cuba",
        "code": "CU",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Cape Verde",
        "code": "CV",
        "languages": [
            "portuguese"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Curacao",
        "code": "CW",
        "languages": [
            "dutch",
            "papiamento",
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "white"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Christmas Island",
        "code": "CX",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "blue",
            "yellow",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Cyprus",
        "code": "CY",
        "languages": [
            "greek",
            "turkish"
        ],
        "flag_colors": [
            "white",
            "orange",
            "green"
        ],
        "region": "Middle East"
    },
    {
        "name": "Czechia",
        "code": "CZ",
        "languages": [
            "czech"
        ],
        "flag_colors": [
            "white",
            "red",
            "blue"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Germany",
        "code": "DE",
        "languages": [
            "german"
        ],
        "flag_colors": [
            "black",
            "red",
            "yellow"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Djibouti",
        "code": "DJ",
        "languages": [
            "arabic",
            "french",
            "afar",
            "somali"
        ],
        "flag_colors": [
            "blue",
            "green",
            "white",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Denmark",
        "code": "DK",
        "languages": [
            "danish"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Dominica",
        "code": "DM",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "black",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Dominican Republic",
        "code": "DO",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Algeria",
        "code": "DZ",
        "languages": [
            "arabic",
            "tamazight"
        ],
        "flag_colors": [
            "green",
            "white",
            "red"
        ],
        "region": "North Africa"
    },
    {
        "name": "Ecuador",
        "code": "EC",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "yellow",
            "blue",
            "red"
        ],
        "region": "South America"
    },
    {
        "name": "Estonia",
        "code": "EE",
        "languages": [
            "estonian"
        ],
        "flag_colors": [
            "blue",
            "black",
            "white"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Egypt",
        "code": "EG",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white",
            "black",
            "yellow"
        ],
        "region": "North Africa"
    },
    {
        "name": "Western Sahara",
        "code": "EH",
        "languages": [
            "arabic",
            "spanish"
        ],
        "flag_colors": [
            "black",
            "white",
            "green",
            "red"
        ],
        "region": "North Africa"
    },
    {
        "name": "Eritrea",
        "code": "ER",
        "languages": [
            "tigrinya",
            "arabic",
            "english"
        ],
        "flag_colors": [
            "red",
            "green",
            "blue",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Spain",
        "code": "ES",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "red",
            "yellow"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Ethiopia",
        "code": "ET",
        "languages": [
            "amharic",
            "oromo"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red",
            "blue"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "European Union",
        "code": "EU",
        "languages": [
            "english",
            "french",
            "german"
        ],
        "flag_colors": [
            "blue",
            "yellow"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Finland",
        "code": "FI",
        "languages": [
            "finnish",
            "swedish"
        ],
        "flag_colors": [
            "white",
            "blue"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Fiji",
        "code": "FJ",
        "languages": [
            "english",
            "fijian",
            "hindi"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red",
            "yellow"
        ],
        "region": "Oceania"
    },
    {
        "name": "Falkland Islands",
        "code": "FK",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red",
            "yellow"
        ],
        "region": "South America"
    },
    {
        "name": "Micronesia",
        "code": "FM",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Faroe Islands",
        "code": "FO",
        "languages": [
            "faroese",
            "danish"
        ],
        "flag_colors": [
            "white",
            "red",
            "blue"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "France",
        "code": "FR",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Gabon",
        "code": "GA",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "blue"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "England",
        "code": "GB-ENG",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Northern Ireland",
        "code": "GB-NIR",
        "languages": [
            "english",
            "irish"
        ],
        "flag_colors": [
            "white",
            "red"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Scotland",
        "code": "GB-SCT",
        "languages": [
            "english",
            "scottish gaelic"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Wales",
        "code": "GB-WLS",
        "languages": [
            "english",
            "welsh"
        ],
        "flag_colors": [
            "green",
            "white",
            "red"
        ],
        "region": "Western Europe"
    },
    {
        "name": "United Kingdom",
        "code": "GB",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Grenada",
        "code": "GD",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "yellow",
            "green",
            "black"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Georgia",
        "code": "GE",
        "languages": [
            "georgian"
        ],
        "flag_colors": [
            "white",
            "red"
        ],
        "region": "Middle East"
    },
    {
        "name": "French Guiana",
        "code": "GF",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red"
        ],
        "region": "South America"
    },
    {
        "name": "Guernsey",
        "code": "GG",
        "languages": [
            "english",
            "french"
        ],
        "flag_colors": [
            "white",
            "red",
            "yellow"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Ghana",
        "code": "GH",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "yellow",
            "green",
            "black"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Gibraltar",
        "code": "GI",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "yellow"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Greenland",
        "code": "GL",
        "languages": [
            "kalaallisut",
            "danish"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "North America"
    },
    {
        "name": "Gambia",
        "code": "GM",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "blue",
            "green",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Guinea",
        "code": "GN",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "red",
            "yellow",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Guadeloupe",
        "code": "GP",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Equatorial Guinea",
        "code": "GQ",
        "languages": [
            "spanish",
            "french",
            "portuguese"
        ],
        "flag_colors": [
            "green",
            "white",
            "red",
            "blue",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Greece",
        "code": "GR",
        "languages": [
            "greek"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "South Georgia and the South Sandwich Islands",
        "code": "GS",
        "languages": [],
        "flag_colors": [
            "blue",
            "white",
            "yellow"
        ],
        "region": "Atlantic Ocean"
    },
    {
        "name": "Guatemala",
        "code": "GT",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Central America"
    },
    {
        "name": "Guam",
        "code": "GU",
        "languages": [
            "english",
            "chamorro"
        ],
        "flag_colors": [
            "blue",
            "red"
        ],
        "region": "Oceania"
    },
    {
        "name": "Guinea-Bissau",
        "code": "GW",
        "languages": [
            "portuguese"
        ],
        "flag_colors": [
            "red",
            "yellow",
            "green",
            "black"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Guyana",
        "code": "GY",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red",
            "black",
            "white"
        ],
        "region": "South America"
    },
    {
        "name": "Hong Kong",
        "code": "HK",
        "languages": [
            "cantonese",
            "english"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "East Asia"
    },
    {
        "name": "Heard Island and McDonald Islands",
        "code": "HM",
        "languages": [],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Oceania"
    },
    {
        "name": "Honduras",
        "code": "HN",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Central America"
    },
    {
        "name": "Croatia",
        "code": "HR",
        "languages": [
            "croatian"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Haiti",
        "code": "HT",
        "languages": [
            "haitian creole",
            "french"
        ],
        "flag_colors": [
            "blue",
            "red",
            "white"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Hungary",
        "code": "HU",
        "languages": [
            "hungarian"
        ],
        "flag_colors": [
            "red",
            "white",
            "green"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Indonesia",
        "code": "ID",
        "languages": [
            "indonesian"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Ireland",
        "code": "IE",
        "languages": [
            "english",
            "irish"
        ],
        "flag_colors": [
            "green",
            "white",
            "orange"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Israel",
        "code": "IL",
        "languages": [
            "hebrew",
            "arabic"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Middle East"
    },
    {
        "name": "Isle of Man",
        "code": "IM",
        "languages": [
            "english",
            "manx"
        ],
        "flag_colors": [
            "red",
            "yellow"
        ],
        "region": "Western Europe"
    },
    {
        "name": "India",
        "code": "IN",
        "languages": [
            "hindi",
            "english"
        ],
        "flag_colors": [
            "orange",
            "white",
            "green",
            "blue"
        ],
        "region": "South Asia"
    },
    {
        "name": "British Indian Ocean Territory",
        "code": "IO",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red",
            "yellow"
        ],
        "region": "South Asia"
    },
    {
        "name": "Iraq",
        "code": "IQ",
        "languages": [
            "arabic",
            "kurdish"
        ],
        "flag_colors": [
            "red",
            "white",
            "black",
            "green"
        ],
        "region": "Middle East"
    },
    {
        "name": "Iran",
        "code": "IR",
        "languages": [
            "persian"
        ],
        "flag_colors": [
            "green",
            "white",
            "red"
        ],
        "region": "Middle East"
    },
    {
        "name": "Iceland",
        "code": "IS",
        "languages": [
            "icelandic"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Italy",
        "code": "IT",
        "languages": [
            "italian"
        ],
        "flag_colors": [
            "green",
            "white",
            "red"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Jersey",
        "code": "JE",
        "languages": [
            "english",
            "french"
        ],
        "flag_colors": [
            "white",
            "red",
            "yellow"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Jamaica",
        "code": "JM",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "black"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Jordan",
        "code": "JO",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "black",
            "white",
            "green",
            "red"
        ],
        "region": "Middle East"
    },
    {
        "name": "Japan",
        "code": "JP",
        "languages": [
            "japanese"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "East Asia"
    },
    {
        "name": "Kenya",
        "code": "KE",
        "languages": [
            "english",
            "swahili"
        ],
        "flag_colors": [
            "black",
            "red",
            "green",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Kyrgyzstan",
        "code": "KG",
        "languages": [
            "kyrgyz",
            "russian"
        ],
        "flag_colors": [
            "red",
            "yellow"
        ],
        "region": "Central Asia"
    },
    {
        "name": "Cambodia",
        "code": "KH",
        "languages": [
            "khmer"
        ],
        "flag_colors": [
            "blue",
            "red",
            "white"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Kiribati",
        "code": "KI",
        "languages": [
            "english",
            "kiribati"
        ],
        "flag_colors": [
            "red",
            "blue",
            "white",
            "yellow"
        ],
        "region": "Oceania"
    },
    {
        "name": "Comoros",
        "code": "KM",
        "languages": [
            "comorian",
            "arabic",
            "french"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "white",
            "red",
            "blue"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Saint Kitts and Nevis",
        "code": "KN",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "red",
            "black",
            "yellow",
            "white"
        ],
        "region": "Caribbean"
    },
    {
        "name": "North Korea",
        "code": "KP",
        "languages": [
            "korean"
        ],
        "flag_colors": [
            "red",
            "blue",
            "white"
        ],
        "region": "East Asia"
    },
    {
        "name": "South Korea",
        "code": "KR",
        "languages": [
            "korean"
        ],
        "flag_colors": [
            "white",
            "red",
            "blue",
            "black"
        ],
        "region": "East Asia"
    },
    {
        "name": "Kuwait",
        "code": "KW",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "green",
            "white",
            "red",
            "black"
        ],
        "region": "Middle East"
    },
    {
        "name": "Cayman Islands",
        "code": "KY",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Kazakhstan",
        "code": "KZ",
        "languages": [
            "kazakh",
            "russian"
        ],
        "flag_colors": [
            "blue",
            "yellow"
        ],
        "region": "Central Asia"
    },
    {
        "name": "Laos",
        "code": "LA",
        "languages": [
            "lao"
        ],
        "flag_colors": [
            "red",
            "blue",
            "white"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Lebanon",
        "code": "LB",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white",
            "green"
        ],
        "region": "Middle East"
    },
    {
        "name": "Saint Lucia",
        "code": "LC",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "black",
            "white"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Liechtenstein",
        "code": "LI",
        "languages": [
            "german"
        ],
        "flag_colors": [
            "blue",
            "red",
            "yellow"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Sri Lanka",
        "code": "LK",
        "languages": [
            "sinhala",
            "tamil"
        ],
        "flag_colors": [
            "yellow",
            "green",
            "orange",
            "red"
        ],
        "region": "South Asia"
    },
    {
        "name": "Liberia",
        "code": "LR",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Lesotho",
        "code": "LS",
        "languages": [
            "sesotho",
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "green",
            "black"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Lithuania",
        "code": "LT",
        "languages": [
            "lithuanian"
        ],
        "flag_colors": [
            "yellow",
            "green",
            "red"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Luxembourg",
        "code": "LU",
        "languages": [
            "luxembourgish",
            "french",
            "german"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Latvia",
        "code": "LV",
        "languages": [
            "latvian"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Libya",
        "code": "LY",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "black",
            "green",
            "white"
        ],
        "region": "North Africa"
    },
    {
        "name": "Morocco",
        "code": "MA",
        "languages": [
            "arabic",
            "tamazight"
        ],
        "flag_colors": [
            "red",
            "green"
        ],
        "region": "North Africa"
    },
    {
        "name": "Monaco",
        "code": "MC",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Moldova",
        "code": "MD",
        "languages": [
            "romanian"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Montenegro",
        "code": "ME",
        "languages": [
            "montenegrin"
        ],
        "flag_colors": [
            "red",
            "yellow"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Saint Martin",
        "code": "MF",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Madagascar",
        "code": "MG",
        "languages": [
            "malagasy",
            "french"
        ],
        "flag_colors": [
            "white",
            "red",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Marshall Islands",
        "code": "MH",
        "languages": [
            "marshallese",
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "orange"
        ],
        "region": "Oceania"
    },
    {
        "name": "North Macedonia",
        "code": "MK",
        "languages": [
            "macedonian",
            "albanian"
        ],
        "flag_colors": [
            "red",
            "yellow"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Mali",
        "code": "ML",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Myanmar",
        "code": "MM",
        "languages": [
            "burmese"
        ],
        "flag_colors": [
            "yellow",
            "green",
            "red",
            "white"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Mongolia",
        "code": "MN",
        "languages": [
            "mongolian"
        ],
        "flag_colors": [
            "red",
            "blue",
            "yellow"
        ],
        "region": "East Asia"
    },
    {
        "name": "Macao",
        "code": "MO",
        "languages": [
            "cantonese",
            "portuguese"
        ],
        "flag_colors": [
            "green",
            "white",
            "yellow"
        ],
        "region": "East Asia"
    },
    {
        "name": "Northern Mariana Islands",
        "code": "MP",
        "languages": [
            "english",
            "chamorro",
            "carolinian"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Martinique",
        "code": "MQ",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Mauritania",
        "code": "MR",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red"
        ],
        "region": "North Africa"
    },
    {
        "name": "Montserrat",
        "code": "MS",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "green",
            "white",
            "yellow",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Malta",
        "code": "MT",
        "languages": [
            "maltese",
            "english"
        ],
        "flag_colors": [
            "white",
            "red"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Mauritius",
        "code": "MU",
        "languages": [
            "english",
            "french",
            "mauritian creole"
        ],
        "flag_colors": [
            "red",
            "blue",
            "yellow",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Maldives",
        "code": "MV",
        "languages": [
            "divehi"
        ],
        "flag_colors": [
            "red",
            "green",
            "white"
        ],
        "region": "South Asia"
    },
    {
        "name": "Malawi",
        "code": "MW",
        "languages": [
            "english",
            "chichewa"
        ],
        "flag_colors": [
            "black",
            "red",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Mexico",
        "code": "MX",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "green",
            "white",
            "red"
        ],
        "region": "North America"
    },
    {
        "name": "Malaysia",
        "code": "MY",
        "languages": [
            "malay"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue",
            "yellow"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Mozambique",
        "code": "MZ",
        "languages": [
            "portuguese"
        ],
        "flag_colors": [
            "green",
            "black",
            "yellow",
            "white",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Namibia",
        "code": "NA",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "red",
            "green",
            "white",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "New Caledonia",
        "code": "NC",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "red",
            "green",
            "yellow",
            "black"
        ],
        "region": "Oceania"
    },
    {
        "name": "Niger",
        "code": "NE",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "orange",
            "white",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Norfolk Island",
        "code": "NF",
        "languages": [
            "english",
            "norfuk"
        ],
        "flag_colors": [
            "green",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Nigeria",
        "code": "NG",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Nicaragua",
        "code": "NI",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Central America"
    },
    {
        "name": "Netherlands",
        "code": "NL",
        "languages": [
            "dutch"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Western Europe"
    },
    {
        "name": "Norway",
        "code": "NO",
        "languages": [
            "norwegian"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Nepal",
        "code": "NP",
        "languages": [
            "nepali"
        ],
        "flag_colors": [
            "red",
            "blue",
            "white"
        ],
        "region": "South Asia"
    },
    {
        "name": "Nauru",
        "code": "NR",
        "languages": [
            "nauruan",
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Niue",
        "code": "NU",
        "languages": [
            "niuean",
            "english"
        ],
        "flag_colors": [
            "yellow",
            "blue",
            "white",
            "red"
        ],
        "region": "Oceania"
    },
    {
        "name": "New Zealand",
        "code": "NZ",
        "languages": [
            "english",
            "maori"
        ],
        "flag_colors": [
            "blue",
            "red",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Oman",
        "code": "OM",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white",
            "green"
        ],
        "region": "Middle East"
    },
    {
        "name": "Panama",
        "code": "PA",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Central America"
    },
    {
        "name": "Peru",
        "code": "PE",
        "languages": [
            "spanish",
            "quechua",
            "aymara"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "South America"
    },
    {
        "name": "French Polynesia",
        "code": "PF",
        "languages": [
            "french",
            "tahitian"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Papua New Guinea",
        "code": "PG",
        "languages": [
            "english",
            "tok pisin",
            "hiri motu"
        ],
        "flag_colors": [
            "red",
            "black",
            "yellow",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Philippines",
        "code": "PH",
        "languages": [
            "filipino",
            "english"
        ],
        "flag_colors": [
            "blue",
            "red",
            "white",
            "yellow"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Pakistan",
        "code": "PK",
        "languages": [
            "urdu",
            "english"
        ],
        "flag_colors": [
            "green",
            "white"
        ],
        "region": "South Asia"
    },
    {
        "name": "Poland",
        "code": "PL",
        "languages": [
            "polish"
        ],
        "flag_colors": [
            "white",
            "red"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "code": "PM",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red",
            "yellow",
            "black"
        ],
        "region": "North America"
    },
    {
        "name": "Pitcairn Islands",
        "code": "PN",
        "languages": [
            "english",
            "pitkern"
        ],
        "flag_colors": [
            "blue",
            "green",
            "yellow",
            "red",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Puerto Rico",
        "code": "PR",
        "languages": [
            "spanish",
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Palestine",
        "code": "PS",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "green",
            "white",
            "black"
        ],
        "region": "Middle East"
    },
    {
        "name": "Portugal",
        "code": "PT",
        "languages": [
            "portuguese"
        ],
        "flag_colors": [
            "green",
            "red",
            "yellow"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Palau",
        "code": "PW",
        "languages": [
            "palauan",
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow"
        ],
        "region": "Oceania"
    },
    {
        "name": "Paraguay",
        "code": "PY",
        "languages": [
            "spanish",
            "guarani"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue",
            "yellow"
        ],
        "region": "South America"
    },
    {
        "name": "Qatar",
        "code": "QA",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Middle East"
    },
    {
        "name": "Reunion",
        "code": "RE",
        "languages": [
            "french",
            "reunion creole"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Romania",
        "code": "RO",
        "languages": [
            "romanian"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Serbia",
        "code": "RS",
        "languages": [
            "serbian"
        ],
        "flag_colors": [
            "red",
            "blue",
            "white",
            "yellow"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Russia",
        "code": "RU",
        "languages": [
            "russian"
        ],
        "flag_colors": [
            "white",
            "blue",
            "red"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Rwanda",
        "code": "RW",
        "languages": [
            "kinyarwanda",
            "french",
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Saudi Arabia",
        "code": "SA",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "green",
            "white"
        ],
        "region": "Middle East"
    },
    {
        "name": "Solomon Islands",
        "code": "SB",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "green",
            "yellow",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Seychelles",
        "code": "SC",
        "languages": [
            "seychellois creole",
            "english",
            "french"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red",
            "white",
            "green"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Sudan",
        "code": "SD",
        "languages": [
            "arabic",
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "black",
            "green"
        ],
        "region": "North Africa"
    },
    {
        "name": "Sweden",
        "code": "SE",
        "languages": [
            "swedish"
        ],
        "flag_colors": [
            "blue",
            "yellow"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Singapore",
        "code": "SG",
        "languages": [
            "english",
            "malay",
            "mandarin",
            "tamil"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Saint Helena",
        "code": "SH",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "red",
            "white",
            "yellow",
            "green"
        ],
        "region": "Atlantic Ocean"
    },
    {
        "name": "Slovenia",
        "code": "SI",
        "languages": [
            "slovenian"
        ],
        "flag_colors": [
            "white",
            "blue",
            "red"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Svalbard and Jan Mayen",
        "code": "SJ",
        "languages": [
            "norwegian"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Northern Europe"
    },
    {
        "name": "Slovakia",
        "code": "SK",
        "languages": [
            "slovak"
        ],
        "flag_colors": [
            "white",
            "blue",
            "red"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Sierra Leone",
        "code": "SL",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "white",
            "blue"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "San Marino",
        "code": "SM",
        "languages": [
            "italian"
        ],
        "flag_colors": [
            "white",
            "blue"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Senegal",
        "code": "SN",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Somalia",
        "code": "SO",
        "languages": [
            "somali",
            "arabic"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Suriname",
        "code": "SR",
        "languages": [
            "dutch"
        ],
        "flag_colors": [
            "green",
            "white",
            "red",
            "yellow"
        ],
        "region": "South America"
    },
    {
        "name": "South Sudan",
        "code": "SS",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "black",
            "red",
            "green",
            "blue",
            "white",
            "yellow"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Sao Tome and Principe",
        "code": "ST",
        "languages": [
            "portuguese"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red",
            "black"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "El Salvador",
        "code": "SV",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "blue",
            "white"
        ],
        "region": "Central America"
    },
    {
        "name": "Sint Maarten",
        "code": "SX",
        "languages": [
            "dutch",
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Syria",
        "code": "SY",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white",
            "black",
            "green"
        ],
        "region": "Middle East"
    },
    {
        "name": "Eswatini",
        "code": "SZ",
        "languages": [
            "swazi",
            "english"
        ],
        "flag_colors": [
            "blue",
            "red",
            "yellow",
            "black",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Turks and Caicos Islands",
        "code": "TC",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "red",
            "white",
            "yellow",
            "green"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Chad",
        "code": "TD",
        "languages": [
            "french",
            "arabic"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "French Southern Territories",
        "code": "TF",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Oceania"
    },
    {
        "name": "Togo",
        "code": "TG",
        "languages": [
            "french"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Thailand",
        "code": "TH",
        "languages": [
            "thai"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Tajikistan",
        "code": "TJ",
        "languages": [
            "tajik"
        ],
        "flag_colors": [
            "red",
            "white",
            "green",
            "yellow"
        ],
        "region": "Central Asia"
    },
    {
        "name": "Tokelau",
        "code": "TK",
        "languages": [
            "tokelauan",
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Timor-Leste",
        "code": "TL",
        "languages": [
            "tetum",
            "portuguese"
        ],
        "flag_colors": [
            "red",
            "yellow",
            "black",
            "white"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Turkmenistan",
        "code": "TM",
        "languages": [
            "turkmen"
        ],
        "flag_colors": [
            "green",
            "red",
            "white"
        ],
        "region": "Central Asia"
    },
    {
        "name": "Tunisia",
        "code": "TN",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "North Africa"
    },
    {
        "name": "Tonga",
        "code": "TO",
        "languages": [
            "tongan",
            "english"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Turkey",
        "code": "TR",
        "languages": [
            "turkish"
        ],
        "flag_colors": [
            "red",
            "white"
        ],
        "region": "Middle East"
    },
    {
        "name": "Trinidad and Tobago",
        "code": "TT",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "black",
            "white"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Tuvalu",
        "code": "TV",
        "languages": [
            "tuvaluan",
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "red",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Taiwan",
        "code": "TW",
        "languages": [
            "mandarin"
        ],
        "flag_colors": [
            "red",
            "blue",
            "white"
        ],
        "region": "East Asia"
    },
    {
        "name": "Tanzania",
        "code": "TZ",
        "languages": [
            "swahili",
            "english"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "black",
            "blue"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Ukraine",
        "code": "UA",
        "languages": [
            "ukrainian"
        ],
        "flag_colors": [
            "blue",
            "yellow"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Uganda",
        "code": "UG",
        "languages": [
            "english",
            "swahili"
        ],
        "flag_colors": [
            "black",
            "yellow",
            "red",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "United States",
        "code": "US",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "North America"
    },
    {
        "name": "Uruguay",
        "code": "UY",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "white",
            "blue",
            "yellow"
        ],
        "region": "South America"
    },
    {
        "name": "Uzbekistan",
        "code": "UZ",
        "languages": [
            "uzbek"
        ],
        "flag_colors": [
            "blue",
            "white",
            "green",
            "red"
        ],
        "region": "Central Asia"
    },
    {
        "name": "Vatican City",
        "code": "VA",
        "languages": [
            "italian",
            "latin"
        ],
        "flag_colors": [
            "yellow",
            "white"
        ],
        "region": "Southern Europe"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "code": "VC",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "green",
            "white"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Venezuela",
        "code": "VE",
        "languages": [
            "spanish"
        ],
        "flag_colors": [
            "yellow",
            "blue",
            "red",
            "white"
        ],
        "region": "South America"
    },
    {
        "name": "British Virgin Islands",
        "code": "VG",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "blue",
            "white",
            "red"
        ],
        "region": "Caribbean"
    },
    {
        "name": "U.S. Virgin Islands",
        "code": "VI",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue",
            "yellow"
        ],
        "region": "Caribbean"
    },
    {
        "name": "Vietnam",
        "code": "VN",
        "languages": [
            "vietnamese"
        ],
        "flag_colors": [
            "red",
            "yellow"
        ],
        "region": "Southeast Asia"
    },
    {
        "name": "Vanuatu",
        "code": "VU",
        "languages": [
            "bislama",
            "english",
            "french"
        ],
        "flag_colors": [
            "red",
            "green",
            "black",
            "yellow"
        ],
        "region": "Oceania"
    },
    {
        "name": "Wallis and Futuna",
        "code": "WF",
        "languages": [
            "french",
            "wallisian",
            "futunan"
        ],
        "flag_colors": [
            "red",
            "white",
            "blue"
        ],
        "region": "Oceania"
    },
    {
        "name": "Samoa",
        "code": "WS",
        "languages": [
            "samoan",
            "english"
        ],
        "flag_colors": [
            "red",
            "blue",
            "white"
        ],
        "region": "Oceania"
    },
    {
        "name": "Kosovo",
        "code": "XK",
        "languages": [
            "albanian",
            "serbian"
        ],
        "flag_colors": [
            "blue",
            "yellow",
            "white"
        ],
        "region": "Eastern Europe"
    },
    {
        "name": "Yemen",
        "code": "YE",
        "languages": [
            "arabic"
        ],
        "flag_colors": [
            "red",
            "white",
            "black"
        ],
        "region": "Middle East"
    },
    {
        "name": "Mayotte",
        "code": "YT",
        "languages": [
            "french",
            "shimaore",
            "kibushi"
        ],
        "flag_colors": [
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "South Africa",
        "code": "ZA",
        "languages": [
            "zulu",
            "xhosa",
            "afrikaans",
            "english"
        ],
        "flag_colors": [
            "red",
            "blue",
            "green",
            "yellow",
            "black",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Zambia",
        "code": "ZM",
        "languages": [
            "english"
        ],
        "flag_colors": [
            "green",
            "red",
            "black",
            "orange"
        ],
        "region": "Sub-Saharan Africa"
    },
    {
        "name": "Zimbabwe",
        "code": "ZW",
        "languages": [
            "english",
            "shona",
            "ndebele"
        ],
        "flag_colors": [
            "green",
            "yellow",
            "red",
            "black",
            "white"
        ],
        "region": "Sub-Saharan Africa"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/stickers/providers/flags.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flagsProvider",
    ()=>flagsProvider,
    "getRegionLabel",
    ()=>getRegionLabel,
    "resolveQueryToRegions",
    ()=>resolveQueryToRegions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/sticker-id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$countries$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/providers/countries-data.ts [app-client] (ecmascript)");
;
;
const FLAGS_PROVIDER_ID = "flags";
const DEFAULT_SEARCH_LIMIT = 100;
const DEFAULT_FLAGS_BASE_URL = "/flags";
let countriesPromise = null;
function getFlagsBaseUrl() {
    return DEFAULT_FLAGS_BASE_URL.replace(/\/$/, "");
}
function buildFlagUrl({ code }) {
    const normalizedCode = code.toLowerCase();
    return `${getFlagsBaseUrl()}/${encodeURIComponent(normalizedCode)}.svg`;
}
async function loadCountries() {
    if (countriesPromise) {
        return countriesPromise;
    }
    countriesPromise = __turbopack_context__.A("[project]/apps/web/src/stickers/providers/countries-data.ts [app-client] (ecmascript, async loader)").then((m)=>m.COUNTRIES).catch((error)=>{
        console.error("Failed to load countries dataset:", error);
        return [];
    });
    return countriesPromise;
}
function toStickerItem({ country }) {
    const normalizedCode = country.code.toUpperCase();
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildStickerId"])({
            providerId: FLAGS_PROVIDER_ID,
            providerValue: normalizedCode
        }),
        provider: FLAGS_PROVIDER_ID,
        name: country.name,
        previewUrl: buildFlagUrl({
            code: normalizedCode
        }),
        metadata: {
            code: normalizedCode,
            region: country.region ?? null,
            languages: country.languages ?? [],
            flagColors: country.flag_colors ?? []
        }
    };
}
function normalizeQuery({ query }) {
    return query.trim().toLowerCase();
}
function findMatchingRegions({ query }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$countries$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGIONS"].filter((r)=>r.id.toLowerCase() === query || r.aliases.some((alias)=>alias === query));
}
function resolveQueryToRegions({ query }) {
    const group = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$countries$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGION_GROUPS"][query];
    if (group) {
        return new Set(group);
    }
    const matched = findMatchingRegions({
        query
    });
    return matched.length > 0 ? new Set(matched.map((r)=>r.id)) : null;
}
function getRegionLabel({ query }) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$countries$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REGION_GROUPS"][query]) {
        return query.split(" ").map((w)=>w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    const matched = findMatchingRegions({
        query
    });
    return matched[0]?.id ?? query;
}
function filterCountriesByQuery({ countries, query }) {
    if (!query) {
        return countries;
    }
    const regionIds = resolveQueryToRegions({
        query
    });
    if (regionIds) {
        return countries.filter((country)=>country.region && regionIds.has(country.region));
    }
    return countries.filter((country)=>{
        const normalizedName = country.name.toLowerCase();
        const normalizedCode = country.code.toLowerCase();
        return normalizedName.includes(query) || normalizedCode.includes(query);
    });
}
function paginateCountries({ countries, options }) {
    if (options?.limit === undefined) {
        return {
            items: countries,
            hasMore: false,
            total: countries.length
        };
    }
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.max(1, options.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
        items: countries.slice(startIndex, endIndex),
        hasMore: endIndex < countries.length,
        total: countries.length
    };
}
const flagsProvider = {
    id: FLAGS_PROVIDER_ID,
    async search ({ query, options }) {
        const countries = await loadCountries();
        const normalizedQuery = normalizeQuery({
            query
        });
        const filteredCountries = filterCountriesByQuery({
            countries,
            query: normalizedQuery
        });
        const paged = paginateCountries({
            countries: filteredCountries,
            options: {
                page: 1,
                limit: options?.limit ?? DEFAULT_SEARCH_LIMIT
            }
        });
        return {
            items: paged.items.map((country)=>toStickerItem({
                    country
                })),
            total: paged.total,
            hasMore: paged.hasMore
        };
    },
    async browse ({ options }) {
        const countries = await loadCountries();
        const paged = paginateCountries({
            countries,
            options
        });
        return {
            sections: [
                {
                    id: "all",
                    items: paged.items.map((country)=>toStickerItem({
                            country
                        })),
                    hasMore: paged.hasMore,
                    layout: "grid"
                }
            ]
        };
    },
    resolveUrl ({ stickerId }) {
        const { providerValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStickerId"])({
            stickerId
        });
        return buildFlagUrl({
            code: providerValue
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/stickers/providers/logos.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logosProvider",
    ()=>logosProvider
]);
const LOGOS_PROVIDER_ID = "logos";
const EMPTY_SEARCH_RESULT = {
    items: [],
    total: 0,
    hasMore: false
};
const EMPTY_BROWSE_RESULT = {
    sections: []
};
const logosProvider = {
    id: LOGOS_PROVIDER_ID,
    async search () {
        return EMPTY_SEARCH_RESULT;
    },
    async browse () {
        return EMPTY_BROWSE_RESULT;
    },
    resolveUrl ({ stickerId }) {
        return stickerId;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/stickers/providers/shapes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "parseShapeStickerId",
    ()=>parseShapeStickerId,
    "shapesProvider",
    ()=>shapesProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/graphics/definitions/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/sticker-id.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const SHAPES_PROVIDER_ID = "shapes";
const LEGACY_SHAPE_PRESETS = {
    square: {
        shapeKey: "square",
        name: "Square",
        definitionId: "rectangle"
    },
    circle: {
        shapeKey: "circle",
        name: "Circle",
        definitionId: "ellipse"
    },
    triangle: {
        shapeKey: "triangle",
        name: "Triangle",
        definitionId: "polygon",
        params: {
            sides: 3
        }
    },
    hexagon: {
        shapeKey: "hexagon",
        name: "Hexagon",
        definitionId: "polygon",
        params: {
            sides: 6
        }
    },
    diamond: {
        shapeKey: "diamond",
        name: "Diamond",
        definitionId: "polygon",
        params: {
            sides: 4
        }
    },
    star: {
        shapeKey: "star",
        name: "Star",
        definitionId: "star"
    }
};
function getShapePresets() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$definitions$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerDefaultGraphics"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphicsRegistry"].getAll().map((definition)=>({
            shapeKey: definition.id,
            name: definition.name,
            definitionId: definition.id
        }));
}
function getShapePreset({ shapeKey }) {
    return getShapePresets().find((preset)=>preset.shapeKey === shapeKey) ?? LEGACY_SHAPE_PRESETS[shapeKey] ?? null;
}
function getShapeParams({ preset }) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildDefaultGraphicInstance"])({
            definitionId: preset.definitionId
        }).params,
        ...preset.params
    };
}
function parseShapeStickerId({ stickerId }) {
    try {
        const { providerValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStickerId"])({
            stickerId
        });
        return getShapePreset({
            shapeKey: providerValue
        });
    } catch  {
        return null;
    }
}
function buildShapeUrl({ shapeKey }) {
    const preset = getShapePreset({
        shapeKey
    });
    if (!preset) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildGraphicPreviewUrl"])({
            definitionId: "rectangle"
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildGraphicPreviewUrl"])({
        definitionId: preset.definitionId,
        params: getShapeParams({
            preset
        })
    });
}
function toStickerItem({ preset }) {
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildStickerId"])({
            providerId: SHAPES_PROVIDER_ID,
            providerValue: preset.shapeKey
        }),
        provider: SHAPES_PROVIDER_ID,
        name: preset.name,
        previewUrl: buildShapeUrl({
            shapeKey: preset.shapeKey
        }),
        metadata: {
            definitionId: preset.definitionId,
            params: preset.params ?? {}
        }
    };
}
function filterShapesByQuery({ query }) {
    const normalizedQuery = query.trim().toLowerCase();
    const presets = getShapePresets();
    if (!normalizedQuery) {
        return presets;
    }
    return presets.filter((preset)=>{
        const definition = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$graphics$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphicsRegistry"].get(preset.definitionId);
        return preset.name.toLowerCase().includes(normalizedQuery) || definition.keywords.some((keyword)=>keyword.toLowerCase().includes(normalizedQuery));
    });
}
function paginateShapes({ shapes, options }) {
    const page = Math.max(1, options?.page ?? 1);
    const limit = Math.max(1, options?.limit ?? getShapePresets().length);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pagedItems = shapes.slice(startIndex, endIndex);
    return {
        items: pagedItems,
        hasMore: endIndex < shapes.length,
        total: shapes.length
    };
}
const shapesProvider = {
    id: SHAPES_PROVIDER_ID,
    async search ({ query, options }) {
        const filteredShapes = filterShapesByQuery({
            query
        });
        const paged = paginateShapes({
            shapes: filteredShapes,
            options: {
                page: 1,
                limit: options?.limit ?? getShapePresets().length
            }
        });
        return {
            items: paged.items.map((preset)=>toStickerItem({
                    preset
                })),
            total: paged.total,
            hasMore: paged.hasMore
        };
    },
    async browse ({ options }) {
        const paged = paginateShapes({
            shapes: getShapePresets(),
            options
        });
        return {
            sections: [
                {
                    id: "all",
                    items: paged.items.map((preset)=>toStickerItem({
                            preset
                        })),
                    hasMore: paged.hasMore,
                    layout: "grid"
                }
            ]
        };
    },
    resolveUrl ({ stickerId }) {
        const preset = parseShapeStickerId({
            stickerId
        });
        return buildShapeUrl({
            shapeKey: preset?.shapeKey ?? "rectangle"
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/stickers/providers/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "registerDefaultStickerProviders",
    ()=>registerDefaultStickerProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$flags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/providers/flags.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$logos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/providers/logos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$shapes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/providers/shapes.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$shapes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$shapes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const defaultProviders = [
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$logos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logosProvider"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$flags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flagsProvider"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$shapes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shapesProvider"]
];
function registerDefaultStickerProviders({ providersToRegister = defaultProviders } = {}) {
    for (const provider of providersToRegister){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stickersRegistry"].has(provider.id)) {
            continue;
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stickersRegistry"].register(provider.id, provider);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/stickers/resolver.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "resolveStickerId",
    ()=>resolveStickerId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/sticker-id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/providers/index.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function resolveStickerId({ stickerId, options }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerDefaultStickerProviders"])();
    const parsedStickerId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStickerId"])({
        stickerId
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stickersRegistry"].get(parsedStickerId.providerId).resolveUrl({
        stickerId,
        options
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/src/stickers/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "browseAll",
    ()=>browseAll,
    "browseCategory",
    ()=>browseCategory,
    "resolveStickerIntrinsicSize",
    ()=>resolveStickerIntrinsicSize,
    "searchAll",
    ()=>searchAll,
    "searchStickers",
    ()=>searchStickers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$intrinsic$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/intrinsic-size.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/resolver.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/providers/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/sticker-id.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$flags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/stickers/providers/flags.ts [app-client] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const DEFAULT_BROWSE_LIMIT = 12;
const DEFAULT_SEARCH_LIMIT = 100;
function mergeSearchResults({ results }) {
    const deduplicatedItems = new Map();
    let total = 0;
    let hasMore = false;
    for (const result of results){
        total += result.total;
        hasMore = hasMore || result.hasMore;
        for (const item of result.items){
            if (!deduplicatedItems.has(item.id)) {
                deduplicatedItems.set(item.id, item);
            }
        }
    }
    return {
        items: Array.from(deduplicatedItems.values()),
        total,
        hasMore
    };
}
function getProviderByCategory({ category }) {
    if (category === "all") {
        return null;
    }
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stickersRegistry"].get(category);
    } catch  {
        return null;
    }
}
function getEmptyBrowseResult() {
    return {
        sections: []
    };
}
function getStickerNameFromId({ stickerId }) {
    const stickerIdParts = stickerId.split(":");
    if (stickerIdParts.length <= 1) {
        return stickerId;
    }
    return stickerIdParts.slice(1).join(":").split(":").pop()?.replaceAll("-", " ") ?? stickerId;
}
function toRecentStickerItem({ stickerId }) {
    try {
        const { providerId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$sticker$2d$id$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStickerId"])({
            stickerId
        });
        return {
            id: stickerId,
            provider: providerId,
            name: getStickerNameFromId({
                stickerId
            }),
            previewUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStickerId"])({
                stickerId,
                options: {
                    width: 64,
                    height: 64
                }
            }),
            metadata: {}
        };
    } catch  {
        return null;
    }
}
async function searchStickers({ query, category, limit = DEFAULT_SEARCH_LIMIT }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerDefaultStickerProviders"])({});
    const effectiveCategory = category in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STICKER_CATEGORIES"] ? category : "all";
    if (effectiveCategory !== "all") {
        const provider = getProviderByCategory({
            category: effectiveCategory
        });
        if (!provider) {
            return {
                items: [],
                total: 0,
                hasMore: false
            };
        }
        return provider.search({
            query,
            options: {
                limit
            }
        });
    }
    const providers = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stickersRegistry"].getAll();
    if (providers.length === 0) {
        return {
            items: [],
            total: 0,
            hasMore: false
        };
    }
    const perProviderLimit = Math.max(1, Math.ceil(limit / providers.length));
    const settledResults = await Promise.allSettled(providers.map((provider)=>provider.search({
            query,
            options: {
                limit: perProviderLimit
            }
        })));
    const fulfilledResults = settledResults.filter((result)=>result.status === "fulfilled").map((result)=>result.value);
    return mergeSearchResults({
        results: fulfilledResults
    });
}
async function searchAll({ query, limit = DEFAULT_SEARCH_LIMIT }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerDefaultStickerProviders"])({});
    const providers = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stickersRegistry"].getAll();
    if (providers.length === 0) {
        return {
            sections: []
        };
    }
    const perProviderLimit = Math.max(1, Math.ceil(limit / providers.length));
    const settledResults = await Promise.allSettled(providers.map(async (provider)=>{
        const result = await provider.search({
            query,
            options: {
                limit: perProviderLimit
            }
        });
        return {
            provider,
            result
        };
    }));
    const sections = [];
    for (const settled of settledResults){
        if (settled.status !== "fulfilled") {
            continue;
        }
        const { provider, result } = settled.value;
        if (result.items.length === 0) {
            continue;
        }
        const category = provider.id;
        sections.push({
            id: category,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STICKER_CATEGORIES"][category] ?? provider.id,
            items: result.items,
            hasMore: result.hasMore,
            layout: "grid"
        });
    }
    return {
        sections
    };
}
async function browseCategory({ category }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerDefaultStickerProviders"])({});
    const effectiveCategory = category in __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STICKER_CATEGORIES"] ? category : "all";
    if (effectiveCategory === "all") {
        return getEmptyBrowseResult();
    }
    const provider = getProviderByCategory({
        category: effectiveCategory
    });
    if (!provider) {
        return getEmptyBrowseResult();
    }
    return provider.browse({
        options: {}
    });
}
async function browseAll({ recentStickers, limit = DEFAULT_BROWSE_LIMIT }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$providers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerDefaultStickerProviders"])({});
    const sections = [];
    const recentItems = recentStickers.map((stickerId)=>toRecentStickerItem({
            stickerId
        })).filter((item)=>item !== null);
    if (recentItems.length > 0) {
        sections.push({
            id: "recent",
            title: "Recently used",
            items: recentItems.slice(0, limit),
            hasMore: recentItems.length > limit,
            layout: "row"
        });
    }
    const settledResults = await Promise.allSettled(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stickersRegistry"].getAll().map(async (provider)=>{
        const browseResult = await provider.browse({
            options: {
                limit
            }
        });
        const firstSection = browseResult.sections[0];
        if (!firstSection || firstSection.items.length === 0) {
            return null;
        }
        const category = provider.id;
        return {
            ...firstSection,
            id: category,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STICKER_CATEGORIES"][category] ?? firstSection.title,
            layout: "row",
            action: {
                type: "see-all",
                category,
                sectionId: firstSection.id
            }
        };
    }));
    for (const result of settledResults){
        if (result.status === "fulfilled" && result.value) {
            sections.push(result.value);
        }
    }
    return {
        sections
    };
}
async function resolveStickerIntrinsicSize({ stickerId }) {
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStickerId"])({
        stickerId
    });
    return new Promise((resolve)=>{
        const img = new Image();
        img.onload = ()=>resolve({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        img.onerror = ()=>resolve({
                width: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$intrinsic$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STICKER_INTRINSIC_SIZE_FALLBACK"],
                height: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$stickers$2f$intrinsic$2d$size$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STICKER_INTRINSIC_SIZE_FALLBACK"]
            });
        img.src = url;
    });
}
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
]);

//# sourceMappingURL=apps_web_src_stickers_194fb9cd._.js.map