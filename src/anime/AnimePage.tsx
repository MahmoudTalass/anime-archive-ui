import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../commonComponents/Header";
import { IAnime } from "../browsePage/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AnimeBasedRecommendations } from "./AnimeBasedRecommendations";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import { useAddAnimeToList } from "../useAddAnimeToList";

export const AnimePage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [anime, setAnime] = useState<IAnime | null>(null);

  const { userInfo } = useAuth() as AuthContextType;
  let { malId } = useParams();
  const { handleAddToList } = useAddAnimeToList(Number(malId));

  useEffect(() => {
    setErrorMsg(null);
    setLoading(true);
    const controller = new AbortController();

    const fetchData = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const controller = new AbortController();
      const url = `http://localhost:3000/api/v1/animes/${malId}`;

      try {
        const response = await fetch(url, { signal: controller.signal });
        const responseBody: { data: IAnime } = await response.json();

        if (!response.ok) {
          throw new Error(
            "Could not retrieve anime data. Please try again later."
          );
        }
        setAnime(responseBody.data);
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
  }, [malId]);

  return (
    <>
      <Header />
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <AiOutlineLoading3Quarters size="3rem" className="animate-spin" />
        </div>
      ) : errorMsg ? (
        <div>{errorMsg}</div>
      ) : (
        <section className="flex flex-col p-8 gap-8">
          <div className="flex gap-4">
            <img
              src={anime?.imageUrl}
              alt={`Poster for anime with title '${anime?.title}'`}
            />
            <div className="flex flex-col gap-4">
              <p className="text-3xl font-bold">{anime?.title}</p>
              <p>{anime?.synopsis}</p>
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-bold">Genres</span>:{" "}
                  {anime?.genres ? anime?.genres.join(", ") : "Unavailable"}
                </p>
                <p>
                  <span className="font-bold">Year</span>:{" "}
                  {anime?.year || "Unavailable"}
                </p>
                <p>
                  <span className="font-bold">Episodes</span>:{" "}
                  {anime?.episodes || "Unavailable"}
                </p>
                <a
                  href={anime?.url}
                  target="_blank"
                  className="underline w-fit">
                  More Details
                </a>
                {userInfo && (
                  <button
                    className="w-fit bg-otherPurple p-1 px-2 rounded-lg"
                    onClick={handleAddToList}>
                    Add to list
                  </button>
                )}
              </div>
            </div>
          </div>
          <hr />
          <h2 className="font-bold text-3xl">Recommendations</h2>
          <AnimeBasedRecommendations malId={malId as string} />
        </section>
      )}
    </>
  );
};
