import { IUserAnimeEntry, PaginationResponse } from "../commonTypes";

export interface UserEntriesAPIResponse {
  data: IUserAnimeEntry[];
  pagination: PaginationResponse;
}
