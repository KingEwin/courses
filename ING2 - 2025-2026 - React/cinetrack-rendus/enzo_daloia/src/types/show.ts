export type Show = {
  id: number;
  title: string;
  rating: number;
  releaseDate: string;
  status: "to watch" | "watching" | "watched";
  image: string;
};