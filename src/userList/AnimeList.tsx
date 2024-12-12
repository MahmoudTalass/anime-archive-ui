import { useNavigate } from "react-router";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import React, { useEffect, useState } from "react";
import { Header } from "../commonComponents/Header";
import {
  AnimeWatchStatus,
  IUserAnimeEntry,
  PaginationResponse,
} from "../commonTypes";
import { UserEntriesAPIResponse } from "./userEntriesTypes";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AnimeEntryCard } from "./AnimeEntryCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const AnimeList = () => {
  const { userInfo, logout } = useAuth() as AuthContextType;

  const [data, setData] = useState<UserEntriesAPIResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<AnimeWatchStatus | "">("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [searchTermInput, setSearchTermInput] = useState("");

  const updateEntryState = (animeEntry: IUserAnimeEntry) => {
    let updatedState: UserEntriesAPIResponse = {
      pagination: data?.pagination as PaginationResponse,
      data: data?.data.map((entry) => {
        if (entry.malId === animeEntry.malId) return animeEntry;
        else return entry;
      }) as IUserAnimeEntry[],
    };

    setData(updatedState);
  };
  const deleteEntryState = (malId: string) => {
    let updatedState: UserEntriesAPIResponse = {
      pagination: data?.pagination as PaginationResponse,
      data: data?.data.filter(
        (entry) => entry.malId !== malId
      ) as IUserAnimeEntry[],
    };

    setData(updatedState);
  };

  const handleSearchTermInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setSearchTermInput(e.target.value);

  const handleIncrementPageNum = () => {
    if (currentPage !== data?.pagination.totalPages)
      setCurrentPage(currentPage + 1);
  };
  const handleCurrentSearchTermChange = () => {
    if (searchTermInput !== currentSearchTerm)
      setCurrentSearchTerm(searchTermInput);
  };

  const handleDecrementPageNum = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as AnimeWatchStatus);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, [userInfo]);

  useEffect(() => {
    setErrorMsg(null);
    setLoading(true);

    const fetchData = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      let url = `http://localhost:3000/api/v1/me/animes?page=${currentPage}`;
      if (statusFilter !== "") url += `&status=${statusFilter}`;
      if (currentSearchTerm !== "") url += `&q=${currentSearchTerm}`;

      let headers = {
        Authorization: `Bearer ${userInfo?.token}`,
      };

      try {
        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          if (response.status === 401) {
            logout();
            navigate("/login");
            return;
          }
          throw new Error("Could not retrieve list, please try again later.");
        }

        const responseBody: UserEntriesAPIResponse = await response.json();

        setData(responseBody);
      } catch (err) {
        if (err instanceof Error) setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchData();
  }, [statusFilter, currentPage, currentSearchTerm]);

  return (
    <>
      <Header />
      <section className="flex flex-col p-20 gap-14">
        <div className="flex justify-between">
          <div className="flex items-center bg-white max-w-96 w-full p-2 rounded-lg ">
            <input
              type="search"
              value={searchTermInput}
              onChange={handleSearchTermInputChange}
              placeholder="Search anime..."
              className="grow text-black"
            />
            <IoMdSearch
              className="text-complementary text-2xl"
              onClick={handleCurrentSearchTermChange}
            />
          </div>
          <select
            onChange={handleChangeStatus}
            className="bg-complementary rounded-lg p-1"
            value={statusFilter}>
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="planning to watch">Planning to watch</option>
            <option value="watching">Watching</option>
          </select>
        </div>
        {loading ? (
          <div className="flex h-screen items-center justify-center">
            <AiOutlineLoading3Quarters size="3rem" className="animate-spin" />
          </div>
        ) : errorMsg ? (
          <p>{errorMsg}</p>
        ) : data?.data.length === 0 ? (
          <p>No anime entries to display.</p>
        ) : (
          <>
            {" "}
            <div className="flex gap-8 flex-wrap ">
              {data?.data.map((animeEntry: IUserAnimeEntry) => (
                <AnimeEntryCard
                  animeEntry={animeEntry}
                  key={animeEntry._id}
                  updateEntryState={updateEntryState}
                  deleteEntryState={deleteEntryState}
                />
              ))}
            </div>
          </>
        )}
        <div className="flex justify-center items-center gap-6 text-xl mt-12">
          <FaArrowLeft onClick={handleDecrementPageNum} />
          <p>
            {currentPage} ... {data?.pagination.totalPages}
          </p>
          <FaArrowRight onClick={handleIncrementPageNum} />
        </div>
      </section>
    </>
  );
};
