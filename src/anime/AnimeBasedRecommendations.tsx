import { useEffect, useState } from "react";
import { IAnime } from "../commonTypes";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AnimeCard } from "../browsePage/AnimeCard";

export const AnimeBasedRecommendations = ({ malId }: { malId: string }) => {
   const [loading, setLoading] = useState(false);
   const [errorMsg, setErrorMsg] = useState<string | null>(null);
   const [recommendations, setRecommendations] = useState<Partial<IAnime>[] | null>(null);

   useEffect(() => {
      setErrorMsg(null);
      setLoading(true);
      const controller = new AbortController();

      const fetchData = async () => {
         const controller = new AbortController();
         const url = `https://anime-archive-api.fly.dev/api/v1/animes/${malId}/recommendations`;

         try {
            const response = await fetch(url, { signal: controller.signal });
            const responseBody: { data: Partial<IAnime>[] } = await response.json();

            if (!response.ok) {
               throw new Error("Could not retrieve recommendations. Please try again later.");
            }
            setRecommendations(responseBody.data);
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
   }, []);

   return (
      <>
         {" "}
         {loading ? (
            <div className="flex items-center justify-center">
               <AiOutlineLoading3Quarters size="3rem" className="animate-spin" />
            </div>
         ) : errorMsg ? (
            <div>{errorMsg}</div>
         ) : (
            <section className="flex flex-wrap gap-4">
               {recommendations?.length === 0 ? (
                  <p>No recommendations available</p>
               ) : (
                  recommendations?.map((anime: Partial<IAnime>) => {
                     return <AnimeCard key={anime.malId} anime={anime} />;
                  })
               )}
            </section>
         )}
      </>
   );
};
