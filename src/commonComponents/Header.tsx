import { Link, useNavigate } from "react-router";
import { FaRandom } from "react-icons/fa";
import React, { useState } from "react";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import { MdFormatListBulleted } from "react-icons/md";

export const Header = ({ children }: { children?: React.JSX.Element | React.JSX.Element[] }) => {
   const { userInfo, logout } = useAuth() as AuthContextType;
   const navigate = useNavigate();
   const [getRandomLoading, setGetRandomLoading] = useState(false);

   const handleRandomAnimeBtn = async () => {
      setGetRandomLoading(true);
      try {
         const response = await fetch("https://anime-archive-api.fly.dev/api/v1/animes/random");
         const data: { data: { malId: number } } = await response.json();
         if (response.ok) {
            navigate(`/animes/${data.data.malId}`);
         }
      } catch (err) {
         if (err instanceof Error) console.log(err.message);
      } finally {
         setGetRandomLoading(false);
      }
   };

   const handleLogoutUser = () => {
      logout();
   };

   return (
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:justify-around items-center w-full p-4 py-4">
         <Link to="/home" className="flex items-center">
            <img src="/animeIcon.svg" alt="app icon by Icon8" />
            <h1 className="text-5xl font-bold">
               Anime <span className="text-complementary">Archive</span>
            </h1>
         </Link>
         {children}
         <button
            className="flex items-center gap-2"
            onClick={handleRandomAnimeBtn}
            disabled={getRandomLoading}
         >
            <FaRandom size="1.3rem" />
            <p>Random</p>
         </button>
         {userInfo ? (
            <>
               <Link to="/mylist" className="text-lg flex items-center gap-1">
                  <MdFormatListBulleted size="1.5rem" />
                  My List
               </Link>
               <button
                  className="bg-otherPurple px-4 py-3 rounded-xl font-bold"
                  onClick={handleLogoutUser}
               >
                  Logout
               </button>
            </>
         ) : (
            <div className="flex gap-4">
               <Link to="/login">
                  <button className="bg-otherPurple px-4 py-3 rounded-xl font-bold">Login</button>
               </Link>
               <Link to="/register">
                  <button className="bg-otherPurple px-4 py-3 rounded-xl font-bold">
                     Register
                  </button>
               </Link>
            </div>
         )}
      </div>
   );
};
