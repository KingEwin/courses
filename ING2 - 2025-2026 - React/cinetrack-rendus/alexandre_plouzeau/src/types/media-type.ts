export type MediaType = "movie" | "series" | "all";

const VIDEO_TYPE_LABELS: Record<MediaType, string> = {
    movie: "Film",
    series: "Série",
    all: "Tout",
};

export const getVideoTypeLabel = (type: MediaType): string => {
    return VIDEO_TYPE_LABELS[type];
};
export const MEDIA_TYPES: MediaType[] = ["movie", "series", "all"];
