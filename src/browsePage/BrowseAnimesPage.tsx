import React, { useEffect, useState } from "react";
import { AnimesAPIResponse, IAnime } from "../commonTypes";
import { AnimeCard } from "./AnimeCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Header } from "../commonComponents/Header";
import { useSearchParams } from "react-router";

export const BrowseAnimesPage = () => {
   const [data, setData] = useState<AnimesAPIResponse | null>(null);
   const [errorMsg, setErrorMsg] = useState<string | null>();
   const [loading, setLoading] = useState<boolean>(false);

   const [searchParams, setSearchParams] = useSearchParams();
   const searchTerm = searchParams.get("q") || "";
   const currentPage = Number(searchParams.get("page")) || 1;

   const [searchTermInput, setSearchTermInput] = useState(searchTerm);

   const handleSearchTermInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearchTermInput(e.target.value);

   const handleSearch = () => {
      const searchTerm = searchParams.get("q");
      if (searchTermInput !== searchTerm) {
         setSearchParams({ q: searchTermInput, page: "1" });
      }
   };

   const handleSearchUsingEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         handleSearch();
      }
   };

   const handleIncrementPageNum = () => {
      if (currentPage !== data?.pagination.totalPages)
         setSearchParams({ q: searchTerm, page: String(currentPage + 1) });
   };

   const handleDecrementPageNum = () => {
      if (currentPage > 1) {
         setSearchParams({ q: searchTerm, page: String(currentPage - 1) });
      }
   };

   useEffect(() => {
      setErrorMsg(null);
      setLoading(true);
      const controller = new AbortController();

      const fetchData = async () => {
         window.scrollTo({ top: 0, behavior: "smooth" });
         const controller = new AbortController();
         const url = `http://localhost:3000/api/v1/animes?page=${currentPage}&q=${searchTerm}`;

         try {
            const response = await fetch(url, { signal: controller.signal });
            const responseBody: AnimesAPIResponse = await response.json();

            if (!response.ok) {
               throw new Error("Could not retrieve anime data. Please try again later.");
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
   }, [currentPage, searchTerm]);

   return (
      <>
         <Header>
            <div className="flex items-center bg-white w-1/3 p-2 rounded-lg ">
               <input
                  type="search"
                  value={searchTermInput}
                  onChange={handleSearchTermInputChange}
                  onKeyDown={handleSearchUsingEnter}
                  placeholder="Search anime..."
                  className="grow text-black px-1"
               />
               <IoMdSearch className="text-complementary text-2xl" onClick={handleSearch} />
            </div>
         </Header>
         <section className="flex flex-col items-center p-8 gap-10">
            {loading ? (
               <div className="flex h-screen items-center justify-center">
                  <AiOutlineLoading3Quarters size="3rem" className="animate-spin" />
               </div>
            ) : errorMsg ? (
               <p>{errorMsg}</p>
            ) : data?.data.length === 0 ? (
               <p>No anime data to display.</p>
            ) : (
               <>
                  {" "}
                  <div className="flex gap-5 flex-wrap ">
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
      </>
   );
};
