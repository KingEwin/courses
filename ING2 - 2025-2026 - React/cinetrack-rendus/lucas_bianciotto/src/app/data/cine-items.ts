import { CineItem } from "../models/cine-item";

export const cineItems: CineItem[] = [
  {
    id: 1,
    title: "Fast & Furious 1",
    type: "movie",
    status: "to-watch",
    rating: 5,
    posterUrl: "https://m.media-amazon.com/images/I/71qtDoM-rcL._AC_UF894,1000_QL80_.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Fast & Furious 2",
    type: "movie",
    status: "to-watch",
    rating: 5,
    posterUrl: "https://fr.web.img4.acsta.net/medias/nmedia/18/35/08/06/af.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Fast & Furious 3",
    type: "movie",
    status: "to-watch",
    rating: 5,
    posterUrl: "https://fr.web.img4.acsta.net/medias/nmedia/18/36/31/38/18654335.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
