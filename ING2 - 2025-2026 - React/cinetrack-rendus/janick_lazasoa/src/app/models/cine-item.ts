import { MediaType } from "../types/media-type";
import { Status } from "../types/status";

export interface CineItem {
  id: number;
  title: string;
  type: MediaType;
  status: Status;
  rating: number;
  posterPath?: string;
  year?: string;
  overview?: string;
  voteAverage?: number;
  originalLanguage?: string;
  runtime?: number;
  genres?: string[];
  createdAt: Date;
  updatedAt: Date;
}
