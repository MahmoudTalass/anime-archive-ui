import { IUserAnimeEntry, PaginationResponse } from "../browsePage/types";

export interface UserEntriesAPIResponse {
  data: IUserAnimeEntry[];
  pagination: PaginationResponse;
}
