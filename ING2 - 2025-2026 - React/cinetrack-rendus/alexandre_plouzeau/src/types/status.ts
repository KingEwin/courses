export type Status = "to-watch" | "watching" | "watched" | "all";

const VIDEO_STATUS_LABELS: Record<Status, string> = {
    "to-watch": "A regarder",
    watching: "En cours",
    watched: "Regardé",
    all: "Tous",
};

export const getVideoStatusLabel = (status: Status): string => {
    return VIDEO_STATUS_LABELS[status];
};

export const STATUSES: Status[] = ["to-watch", "watching", "watched", "all"];
