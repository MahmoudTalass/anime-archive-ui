import { Link } from "react-router";
import { IAnime } from "./types";

export const AnimeCard = ({ anime }: { anime: Partial<IAnime> }) => {
  return (
    <article className="w-52 text-center hover:font-bold transition">
      <Link to={`/animes/${anime.malId}`}>
        <img
          src={anime.imageUrl}
          alt={`Poster for anime with title '${anime.title}'`}
          className="w-full h-80 rounded-sm hover:scale-[1.01] transition duration-150"
        />
        <p>{anime.title}</p>
      </Link>
    </article>
  );
};
