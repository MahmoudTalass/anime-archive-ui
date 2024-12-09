export interface IAnime {
  malId: number;
  title: string;
  imageUrl?: string;
  episodes: number;
  synopsis?: string;
  url: string;
  genres: string[];
  year: number;
}

export type AnimeWatchStatus = "completed" | "watching" | "planning to watch";

export interface IUserAnimeEntry {
  malId: number;
  status: AnimeWatchStatus;
  startedDate?: Date;
  finishedDate?: Date;
  notes?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  score?: number;
}

export interface PaginationResponse {
  perPage: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface AnimesAPIResponse {
  pagination: PaginationResponse;
  data: IAnime[];
}
