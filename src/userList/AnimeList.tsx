import { useNavigate } from "react-router";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import React, { useEffect, useState } from "react";
import { Header } from "../commonComponents/Header";
import { AnimeWatchStatus, IUserAnimeEntry } from "../browsePage/types";
import { UserEntriesAPIResponse } from "./types";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AnimeEntryCard } from "./AnimeEntryCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const AnimeList = () => {
  const { userInfo } = useAuth() as AuthContextType;

  const [data, setData] = useState<UserEntriesAPIResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<AnimeWatchStatus | "">("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [searchTermInput, setSearchTermInput] = useState("");

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

  if (!userInfo) navigate("/");

  useEffect(() => {
    setErrorMsg(null);
    setLoading(true);

    const fetchData = async () => {
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
    fetchData();
  }, [statusFilter, currentPage, currentSearchTerm]);

  return (
    <>
      <Header />
      <section className="flex flex-col p-20 gap-14">
        <div className="flex justify-between">
          <div className="flex items-center bg-white max-w-[750px] w-full p-2 rounded-lg ">
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
            className="bg-complementary rounded-lg p-1">
            <option value="">Status</option>
            <option value="completed">Completed</option>
            <option value="plan to watch">Plan to watch</option>
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
            <div className="flex gap-4 flex-wrap ">
              {data?.data.map((animeEntry: IUserAnimeEntry) => (
                <AnimeEntryCard animeEntry={animeEntry} key={animeEntry._id} />
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