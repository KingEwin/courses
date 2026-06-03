import { CineItem } from "../../models/cine-item";

export const cineItems: CineItem[] = [
    {
        id: 1,
        screen: "https://m.media-amazon.com/images/I/71OFOrPesVL._AC_UF1000,1000_QL80_.jpg",
        title: "Inception",
        type: "movie",
        status: "watched",
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        screen: "https://m.media-amazon.com/images/I/71D8LFlOiDL._AC_UF1000,1000_QL80_.jpg",
        title: "Tenet",
        type: "movie",
        status: "watched",
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        screen: "https://m.media-amazon.com/images/I/61IgtYrLF5L.jpg",
        title: "Fight Club",
        type: "movie",
        status: "to-watch",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        screen: "https://static.posters.cz/image/750/16672.jpg",
        title: "Doctor Who",
        type: "series",
        status: "watching",
        rating: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
