import { IUserAnimeEntry } from "../browsePage/types";

export const AnimeEntryCard = ({
  animeEntry,
}: {
  animeEntry: IUserAnimeEntry;
}) => {
  let statusColor: "bg-[#1A9A1A]" | "bg-[#FFA500]" | "bg-[#3B82F6]";

  if (animeEntry.status === "completed") {
    statusColor = "bg-[#1A9A1A]";
  } else if (animeEntry.status === "watching") {
    statusColor = "bg-[#FFA500]";
  } else {
    statusColor = "bg-[#3B82F6]";
  }

  return (
    <article className="w-52 text-center hover:font-bold transition flex flex-col gap-2">
      <img
        src={animeEntry.animeDetails.imageUrl}
        alt={`Poster for anime with title '${animeEntry.animeDetails.title}'`}
        className="w-full rounded-lg hover:scale-[1.01] transition duration-150 "
      />
      <div className="flex gap-4 items-center">
        <div
          className={`rounded-full ${statusColor} size-4 inline-block flex-shrink-0`}></div>
        <p className="text-xl font-bold">{animeEntry.animeDetails.title}</p>
      </div>
    </article>
  );
};
