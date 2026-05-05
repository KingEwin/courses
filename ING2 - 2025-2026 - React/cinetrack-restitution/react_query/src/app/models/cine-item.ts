import { MediaType } from "../types/media-type";
import { Status } from "../types/status";

export interface CineItem {
  id: number;
  title: string;
  type: MediaType;
  status: Status;
  rating: number;
  isFavorite: boolean;
  poster: string | null;
  overview: string | null;
  createdAt: Date;
  updatedAt: Date;
}
