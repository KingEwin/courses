export type MediaType = 'Film' | 'Série';
export type MediaStatus = 'À voir' | 'En cours' | 'Terminé';

export interface Media {
  id: string;
  title: string;
  type: MediaType;
  status: MediaStatus;
  rating: number;
  liked: boolean;
}