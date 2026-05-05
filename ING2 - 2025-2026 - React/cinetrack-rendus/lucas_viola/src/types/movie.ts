export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
}

export type MovieInput = Omit<Movie, "id">;
