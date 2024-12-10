import { Link } from "react-router";
import { IAnime } from "./types";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import { useState } from "react";

export const AnimeCard = ({ anime }: { anime: Partial<IAnime> }) => {
  const { userInfo } = useAuth() as AuthContextType;
  const [hovering, setHovering] = useState(false);

  const handleSwitchHoverStatus = () => {
    if (userInfo) setHovering(!hovering);
  };

  const handleAddToList = async () => {
    const url = "http://localhost:3000/api/v1/me/animes";
    const headers = {
      Authorization: `Bearer ${userInfo?.token}`,
      "Content-Type": "application/json",
    };
    const body = {
      malId: anime.malId,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  };

  return (
    <article className="w-52 text-center hover:font-bold transition flex flex-col gap-2">
      <div
        className="w-fit hover:scale-[1.02] transition duration-150 relative"
        onMouseEnter={handleSwitchHoverStatus}
        onMouseLeave={handleSwitchHoverStatus}>
        <img
          src={anime.imageUrl}
          alt={`Poster for anime with title '${anime.title}'`}
          className="w-full rounded-lg"
        />
        {hovering && (
          <div className="absolute w-full inset-0 bg-black bg-opacity-50 transition duration-150 rounded-lg flex flex-col justify-center items-center gap-4">
            <Link
              to={`/animes/${anime.malId}`}
              className="bg-dominant w-fit p-1 px-3 rounded-md">
              View
            </Link>
            {userInfo && (
              <button
                className="bg-dominant w-fit p-1 px-3 rounded-md"
                onClick={handleAddToList}>
                Add to list
              </button>
            )}
          </div>
        )}
      </div>
      <Link to={`/animes/${anime.malId}`}>
        <p className="duration-150">{anime.title}</p>{" "}
      </Link>
    </article>
  );
};
