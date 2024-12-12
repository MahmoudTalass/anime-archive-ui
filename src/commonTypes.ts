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
export type EntryScore =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

export interface IUserAnimeEntry {
  _id: string;
  malId: string;
  status: AnimeWatchStatus;
  startedDate: Date | null;
  finishedDate: Date | null;
  notes: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  score: EntryScore | null;
  animeDetails: Omit<IAnime, "year" | "synopsis" | "url" | "episodes">;
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

export interface APIErrorResponseType {
  error: {
    message: string;
    statusCode: number;
  };
}
