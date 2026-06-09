module.exports = [
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/store/useCineStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCineStore",
    ()=>useCineStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
let nextId = Date.now();
const useCineStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        items: [],
        addItem: (data)=>set((state)=>({
                    items: [
                        ...state.items,
                        {
                            ...data,
                            id: nextId++,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    ]
                })),
        deleteItem: (id)=>set((state)=>({
                    items: state.items.filter((item)=>item.id !== id)
                })),
        updateItem: (id, data)=>set((state)=>({
                    items: state.items.map((item)=>item.id === id ? {
                            ...item,
                            ...data,
                            updatedAt: new Date()
                        } : item)
                }))
    }));
}),
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/hooks/useTMDB.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchMovieDetails",
    ()=>fetchMovieDetails,
    "useTMDB",
    ()=>useTMDB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const API_KEY = ("TURBOPACK compile-time value", "6045732df26314c30093dcd0a82881f6");
const BASE_URL = "https://api.themoviedb.org/3";
async function fetchMovieDetails(id) {
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!res.ok) return null;
        const data = await res.json();
        return {
            runtime: data.runtime ?? null,
            genres: data.genres ?? []
        };
    } catch  {
        return null;
    }
}
function useTMDB(query) {
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const timer = setTimeout(async ()=>{
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`);
                if (!res.ok) throw new Error("Erreur API TMDB");
                const data = await res.json();
                setResults(data.results.slice(0, 5));
            } catch  {
                setError("Impossible de contacter TMDB");
                setResults([]);
            } finally{
                setLoading(false);
            }
        }, 400);
        return ()=>clearTimeout(timer);
    }, [
        query
    ]);
    return {
        results,
        loading,
        error
    };
}
}),
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CineForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$store$2f$useCineStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/store/useCineStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$hooks$2f$useTMDB$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/hooks/useTMDB.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const fieldStyle = {
    background: "var(--surface)",
    boxShadow: "var(--neo-inset)",
    border: "none",
    outline: "none",
    color: "var(--ink)",
    borderRadius: "8px",
    width: "100%",
    padding: "8px 12px",
    fontSize: "14px"
};
function CineForm({ item, onClose }) {
    const { addItem, updateItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$store$2f$useCineStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCineStore"])();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.title ?? "");
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.type ?? "movie");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.status ?? "to-watch");
    const [rating, setRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.rating ?? 5);
    const [posterPath, setPosterPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.posterPath ?? "");
    const [year, setYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.year ?? "");
    const [overview, setOverview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.overview ?? "");
    const [voteAverage, setVoteAverage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.voteAverage ?? 0);
    const [originalLanguage, setOriginalLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.originalLanguage ?? "");
    const [runtime, setRuntime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.runtime);
    const [genres, setGenres] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(item?.genres ?? []);
    const [tmdbQuery, setTmdbQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const { results: tmdbResults, loading: tmdbLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$hooks$2f$useTMDB$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTMDB"])(tmdbQuery);
    const isEdit = item !== undefined;
    const selectMovie = async (movie)=>{
        setTitle(movie.title);
        setYear(movie.release_date?.slice(0, 4) ?? "");
        setPosterPath(movie.poster_path ?? "");
        setOverview(movie.overview ?? "");
        setVoteAverage(movie.vote_average ?? 0);
        setOriginalLanguage(movie.original_language ?? "");
        setTmdbQuery("");
        const details = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$hooks$2f$useTMDB$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchMovieDetails"])(movie.id);
        if (details) {
            setRuntime(details.runtime ?? undefined);
            setGenres(details.genres.map((g)=>g.name));
        }
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!title.trim()) return;
        if (isEdit) {
            updateItem(item.id, {
                title,
                type,
                status,
                rating,
                posterPath,
                year,
                overview,
                voteAverage,
                originalLanguage,
                runtime,
                genres
            });
        } else {
            addItem({
                title,
                type,
                status,
                rating,
                posterPath,
                year,
                overview,
                voteAverage,
                originalLanguage,
                runtime,
                genres
            });
        }
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center z-50",
        style: {
            background: "rgba(26,26,26,0.75)"
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: (e)=>e.stopPropagation(),
            style: {
                background: "var(--bg)",
                boxShadow: "var(--neo-shadow)",
                borderRadius: "20px",
                color: "var(--ink)"
            },
            className: "w-full max-w-md mx-4 p-7 flex flex-col gap-4 max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    style: {
                        fontFamily: "var(--font-noto-serif-jp)"
                    },
                    className: "text-xl font-bold",
                    children: isEdit ? "Modifier" : "Ajouter un titre"
                }, void 0, false, {
                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                !isEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                color: "var(--ink-secondary)"
                            },
                            className: "text-xs font-semibold mb-1 block",
                            children: "検索 / Rechercher sur TMDB"
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: tmdbQuery,
                            onChange: (e)=>setTmdbQuery(e.target.value),
                            placeholder: "Tapez un titre de film...",
                            style: {
                                ...fieldStyle
                            }
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this),
                        tmdbLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: "var(--ink-secondary)"
                            },
                            className: "text-xs mt-1",
                            children: "Chargement..."
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 108,
                            columnNumber: 15
                        }, this),
                        tmdbResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            style: {
                                background: "var(--surface)",
                                boxShadow: "var(--neo-shadow)",
                                borderRadius: "12px",
                                position: "absolute",
                                zIndex: 10,
                                width: "100%",
                                marginTop: "4px",
                                overflow: "hidden"
                            },
                            children: tmdbResults.map((movie, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    onClick: ()=>selectMovie(movie),
                                    style: {
                                        borderBottom: i < tmdbResults.length - 1 ? "1px solid var(--neo-dark)" : "none"
                                    },
                                    className: "flex items-center gap-3 px-3 py-2 cursor-pointer hover:opacity-75 transition-opacity",
                                    children: [
                                        movie.poster_path ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: `https://image.tmdb.org/t/p/w92${movie.poster_path}`,
                                            alt: "",
                                            className: "w-8 h-12 object-cover rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 135,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: "var(--neo-dark)"
                                            },
                                            className: "w-8 h-12 rounded shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 141,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: movie.title
                                                }, void 0, false, {
                                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        color: "var(--ink-secondary)"
                                                    },
                                                    className: "text-xs",
                                                    children: movie.release_date?.slice(0, 4)
                                                }, void 0, false, {
                                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 143,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, movie.id, true, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 126,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        color: "var(--ink-secondary)"
                                    },
                                    className: "text-xs font-semibold mb-1 block",
                                    children: "Titre"
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    style: {
                                        ...fieldStyle
                                    },
                                    value: title,
                                    onChange: (e)=>setTitle(e.target.value),
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        color: "var(--ink-secondary)"
                                    },
                                    className: "text-xs font-semibold mb-1 block",
                                    children: "Type"
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    style: {
                                        ...fieldStyle,
                                        cursor: "pointer"
                                    },
                                    value: type,
                                    onChange: (e)=>setType(e.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "movie",
                                            children: "Film"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "series",
                                            children: "Série"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        color: "var(--ink-secondary)"
                                    },
                                    className: "text-xs font-semibold mb-1 block",
                                    children: "Statut"
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    style: {
                                        ...fieldStyle,
                                        cursor: "pointer"
                                    },
                                    value: status,
                                    onChange: (e)=>setStatus(e.target.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "to-watch",
                                            children: "À voir"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "watching",
                                            children: "En cours"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "completed",
                                            children: "Terminé"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 194,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        color: "var(--ink-secondary)"
                                    },
                                    className: "text-xs font-semibold mb-2 block",
                                    children: "Note"
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5
                                    ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setRating(star),
                                            style: {
                                                color: star <= rating ? "var(--accent, #8B1A1A)" : "var(--neo-dark, #CEC9C1)",
                                                fontSize: "28px",
                                                lineHeight: 1,
                                                background: "none",
                                                border: "none",
                                                padding: 0
                                            },
                                            className: "cursor-pointer hover:scale-110 transition-transform",
                                            children: star <= rating ? "★" : "☆"
                                        }, star, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    style: {
                                        background: "var(--ink)",
                                        color: "var(--neo-light)",
                                        borderRadius: "8px",
                                        flex: 1
                                    },
                                    className: "py-2.5 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity",
                                    children: isEdit ? "Enregistrer" : "Ajouter"
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    style: {
                                        background: "var(--surface)",
                                        boxShadow: "var(--neo-inset)",
                                        color: "var(--ink-secondary)",
                                        borderRadius: "8px",
                                        flex: 1
                                    },
                                    className: "py-2.5 text-sm cursor-pointer hover:opacity-90 transition-opacity",
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CineCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$store$2f$useCineStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/store/useCineStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$app$2f$components$2f$CineForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function StarRating({ rating }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            letterSpacing: "2px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "var(--accent, #8B1A1A)"
                },
                children: "★".repeat(rating)
            }, void 0, false, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "var(--neo-dark, #CEC9C1)"
                },
                children: "★".repeat(5 - rating)
            }, void 0, false, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
const TYPE_LABELS = {
    movie: "Film",
    series: "Série"
};
const STATUS_LABELS = {
    "to-watch": "À voir",
    watching: "En cours",
    completed: "Terminé"
};
function formatRuntime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h${m > 0 ? String(m).padStart(2, "0") : ""}` : `${m}min`;
}
function CineCard({ item }) {
    const { deleteItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$store$2f$useCineStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCineStore"])();
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const overviewShort = item.overview && item.overview.length > 80 ? item.overview.slice(0, 80) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$app$2f$components$2f$CineForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                item: item,
                onClose: ()=>setIsEditing(false)
            }, void 0, false, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                lineNumber: 51,
                columnNumber: 21
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center z-50",
                style: {
                    background: "rgba(26,26,26,0.75)"
                },
                onClick: ()=>setIsModalOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        background: "var(--bg, #F5F0E8)",
                        boxShadow: "var(--neo-shadow)",
                        borderRadius: "20px",
                        color: "var(--ink)"
                    },
                    className: "w-full max-w-md mx-4 p-7 flex flex-col gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontFamily: "var(--font-noto-serif-jp)"
                            },
                            className: "text-lg font-bold",
                            children: item.title
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: "var(--ink-secondary)"
                            },
                            className: "text-sm leading-relaxed",
                            children: item.overview
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsModalOpen(false),
                            style: {
                                background: "var(--surface)",
                                boxShadow: "var(--neo-inset)",
                                color: "var(--ink-secondary)",
                                borderRadius: "8px",
                                alignSelf: "flex-end"
                            },
                            className: "text-xs px-4 py-2 cursor-pointer",
                            children: "Fermer"
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--surface)",
                    boxShadow: "var(--neo-shadow)",
                    borderRadius: "16px",
                    color: "var(--ink)"
                },
                className: "overflow-hidden flex flex-col",
                children: [
                    item.posterPath ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: `https://image.tmdb.org/t/p/w500${item.posterPath}`,
                        alt: item.title,
                        className: "w-full h-52 object-cover"
                    }, void 0, false, {
                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "var(--neo-dark)",
                            color: "var(--ink-secondary)"
                        },
                        className: "w-full h-52 flex items-center justify-center text-xs tracking-widest uppercase",
                        children: "Pas d'affiche"
                    }, void 0, false, {
                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 flex flex-col gap-3 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontFamily: "var(--font-noto-serif-jp)"
                                        },
                                        className: "text-base font-bold leading-snug",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    item.year && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--ink-secondary)"
                                        },
                                        className: "text-xs shrink-0 mt-0.5",
                                        children: item.year
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: "var(--neo-dark)",
                                            color: "var(--ink-secondary)",
                                            borderRadius: "4px"
                                        },
                                        className: "text-xs px-2 py-0.5 font-medium",
                                        children: TYPE_LABELS[item.type]
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StarRating, {
                                        rating: item.rating
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            item.genres && item.genres.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1",
                                children: item.genres.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: "var(--neo-dark)",
                                            color: "var(--ink-secondary)",
                                            borderRadius: "4px"
                                        },
                                        className: "text-xs px-1.5 py-0.5",
                                        children: g
                                    }, g, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            (item.voteAverage || item.runtime || item.originalLanguage) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "var(--ink-secondary)"
                                },
                                className: "text-xs flex gap-2 flex-wrap",
                                children: [
                                    item.voteAverage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "TMDB ",
                                            item.voteAverage.toFixed(1),
                                            "/10"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 168,
                                        columnNumber: 17
                                    }, this) : null,
                                    item.runtime ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "· ",
                                            formatRuntime(item.runtime)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this) : null,
                                    item.originalLanguage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "· ",
                                            item.originalLanguage.toUpperCase()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            item.overview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "var(--ink-secondary)"
                                },
                                className: "text-xs leading-relaxed",
                                children: overviewShort ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        overviewShort,
                                        "... ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsModalOpen(true),
                                            style: {
                                                color: "var(--accent)"
                                            },
                                            className: "cursor-pointer hover:underline",
                                            children: "Voir plus"
                                        }, void 0, false, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                            lineNumber: 184,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : item.overview
                            }, void 0, false, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--ink-secondary)"
                                        },
                                        className: "text-xs font-semibold",
                                        children: "Statut"
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: "var(--neo-dark)",
                                            color: "var(--ink)",
                                            borderRadius: "4px"
                                        },
                                        className: "text-xs px-2 py-0.5",
                                        children: STATUS_LABELS[item.status]
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "var(--ink-secondary)"
                                },
                                className: "text-xs",
                                children: [
                                    "Ajouté le ",
                                    item.createdAt.toLocaleDateString("fr-FR")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mt-auto pt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsEditing(true),
                                        style: {
                                            background: "var(--surface)",
                                            boxShadow: "var(--neo-inset)",
                                            color: "var(--ink)",
                                            borderRadius: "8px"
                                        },
                                        className: "text-xs px-3 py-1.5 cursor-pointer font-medium",
                                        children: "Éditer"
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>deleteItem(item.id),
                                        style: {
                                            color: "var(--accent)"
                                        },
                                        className: "text-xs cursor-pointer hover:underline",
                                        children: "Supprimer"
                                    }, void 0, false, {
                                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$store$2f$useCineStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/store/useCineStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$app$2f$components$2f$CineCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$app$2f$components$2f$CineForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/components/CineForm.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Home() {
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$store$2f$useCineStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCineStore"])((state)=>state.items);
    const [isAdding, setIsAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { items: currentItems, addItem } = __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$store$2f$useCineStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCineStore"].getState();
        if (currentItems.length > 0) return;
        const API_KEY = ("TURBOPACK compile-time value", "6045732df26314c30093dcd0a82881f6");
        const BASE = "https://api.themoviedb.org/3";
        Promise.all([
            fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=fr-FR`).then((r)=>r.json()),
            fetch(`${BASE}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`).then((r)=>r.json())
        ]).then(([popular, genreList])=>{
            const genreMap = Object.fromEntries(genreList.genres.map((g)=>[
                    g.id,
                    g.name
                ]));
            popular.results.slice(0, 3).forEach((movie)=>{
                addItem({
                    title: movie.title,
                    type: "movie",
                    status: "to-watch",
                    rating: 0,
                    year: movie.release_date?.slice(0, 4) ?? "",
                    posterPath: movie.poster_path ?? "",
                    overview: movie.overview ?? "",
                    voteAverage: movie.vote_average ?? 0,
                    originalLanguage: movie.original_language ?? "",
                    genres: movie.genre_ids.map((id)=>genreMap[id]).filter((g)=>Boolean(g))
                });
            });
        }).catch(()=>{});
    }, []);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            total: items.length,
            toWatch: items.filter((i)=>i.status === "to-watch").length,
            watching: items.filter((i)=>i.status === "watching").length,
            completed: items.filter((i)=>i.status === "completed").length
        }), [
        items
    ]);
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>search.trim() ? items.filter((i)=>i.title.toLowerCase().includes(search.toLowerCase())) : items, [
        items,
        search
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        style: {
            background: "var(--bg)"
        },
        children: [
            isAdding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$app$2f$components$2f$CineForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setIsAdding(false)
            }, void 0, false, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                lineNumber: 71,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    background: "var(--header-bg)"
                },
                className: "w-full px-8 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontFamily: "var(--font-noto-serif-jp)",
                                        color: "white",
                                        letterSpacing: "0.05em"
                                    },
                                    className: "text-3xl font-bold",
                                    children: "CineTrack"
                                }, void 0, false, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 mt-1.5 text-xs",
                                    style: {
                                        color: "#6B6460"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                stats.total,
                                                " titres"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "· ",
                                                stats.toWatch,
                                                " à voir"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "· ",
                                                stats.watching,
                                                " en cours"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "· ",
                                                stats.completed,
                                                " terminés"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsAdding(true),
                            style: {
                                background: "var(--neo-light)",
                                color: "var(--ink)",
                                borderRadius: "6px"
                            },
                            className: "px-5 py-2.5 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity",
                            children: "+ Ajouter"
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto w-full px-8 py-8 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: search,
                            onChange: (e)=>setSearch(e.target.value),
                            placeholder: "検索 / Rechercher...",
                            style: {
                                background: "var(--surface)",
                                boxShadow: "var(--neo-inset)",
                                color: "var(--ink)",
                                border: "none",
                                outline: "none",
                                borderRadius: "12px"
                            },
                            className: "w-full max-w-md px-4 py-3 text-sm"
                        }, void 0, false, {
                            fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "var(--ink-secondary)"
                        },
                        className: "text-center mt-16 text-sm",
                        children: search ? `Aucun résultat pour « ${search} »` : "Aucun titre ajouté."
                    }, void 0, false, {
                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: filteredItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$src$2f$app$2f$components$2f$CineCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                item: item
                            }, item.id, false, {
                                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/src/app/page.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
;
}),
"[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create",
    ()=>create,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ING2 - 2025-2026 - React/cinetrack-rendus/janick_lazasoa/node_modules/zustand/esm/vanilla.mjs [app-ssr] (ecmascript)");
;
;
const identity = (arg)=>arg;
function useStore(api, selector = identity) {
    const slice = __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useSyncExternalStore(api.subscribe, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getState()), [
        api,
        selector
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback(()=>selector(api.getInitialState()), [
        api,
        selector
    ]));
    __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useDebugValue(slice);
    return slice;
}
const createImpl = (createState)=>{
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ING2__$2d$__2025$2d$2026__$2d$__React$2f$cinetrack$2d$rendus$2f$janick_lazasoa$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStore"])(createState);
    const useBoundStore = (selector)=>useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
};
const create = (createState)=>createState ? createImpl(createState) : createImpl;
;
}),
];

//# sourceMappingURL=ING2%20-%202025-2026%20-%20React_cinetrack-rendus_janick_lazasoa_0r7blja._.js.map