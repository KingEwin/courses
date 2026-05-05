import { MediaType } from "../types/media-type";
import { Status } from "../types/status";

export interface CineItem {
  id: number;
  title: string;
  type: MediaType;
  status: Status;
  rating: number;
  imageUrl?: string;
  year?: string;
  genre?: string;
  director?: string;
  plot?: string;
  actors?: string;
  runtime?: string;
  createdAt: Date;
  updatedAt: Date;
}
