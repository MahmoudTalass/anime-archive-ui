import React, { useEffect, useState } from "react";
import { AnimesAPIResponse, IAnime } from "./types";
import { AnimeCard } from "./AnimeCard";
import { FaArrowLeft, FaArrowRight, FaRandom } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import { Link } from "react-router";

export const BrowseAnimesPage = () => {
  const [data, setData] = useState<AnimesAPIResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [searchTermInput, setSearchTermInput] = useState("");
  const { userInfo } = useAuth() as AuthContextType;

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

  useEffect(() => {
    setErrorMsg(null);
    setLoading(true);
    const controller = new AbortController();

    const fetchData = async () => {
      const controller = new AbortController();
      const url = `http://localhost:3000/api/v1/animes?page=${currentPage}&q=${currentSearchTerm}`;

      try {
        const response = await fetch(url, { signal: controller.signal });
        const responseBody: AnimesAPIResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            "Could not retrieve anime data. Please try again later."
          );
        }
        setData(responseBody);
      } catch (err) {
        if (!controller.signal.aborted && err instanceof Error) {
          setErrorMsg(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return controller.abort();
  }, [currentPage, currentSearchTerm]);

  return (
    <section className="flex flex-col items-center p-8 gap-10">
      <div className="flex justify-around items-center w-full">
        <h1 className="text-5xl font-bold">
          Anime <span className="text-complementary">Archive</span>
        </h1>
        <div className="flex items-center bg-white w-1/3 p-2 rounded-sm ">
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
        <div className="flex flex-col items-center">
          <FaRandom />
          <p>Random</p>
        </div>
        {userInfo ? (
          <Link to="/mylist" className="text-lg">
            My List
          </Link>
        ) : (
          <div className="flex gap-4">
            <Link to="/login">
              <button className="bg-[#494395] px-4 py-3 rounded-xl font-bold">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-[#494395] px-4 py-3 rounded-xl font-bold">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <AiOutlineLoading3Quarters size="3rem" className="" />
        </div>
      ) : errorMsg ? (
        <p>{errorMsg}</p>
      ) : data?.data.length === 0 ? (
        <p>No anime data to display.</p>
      ) : (
        <>
          {" "}
          <div className="flex gap-4 flex-wrap ">
            {data?.data.map((anime: Partial<IAnime>) => (
              <AnimeCard anime={anime} key={anime.malId} />
            ))}
          </div>
          <div className="flex items-center gap-6 text-xl">
            <FaArrowLeft onClick={handleDecrementPageNum} />
            <p>
              {currentPage} ... {data?.pagination.totalPages}
            </p>
            <FaArrowRight onClick={handleIncrementPageNum} />
          </div>
        </>
      )}
    </section>
  );
};
