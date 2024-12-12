import { useRef, useState } from "react";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import { IUserAnimeEntry } from "../commonTypes";
import { Link } from "react-router";
import { UpdateEntryDetailsForm } from "./UpdateEntryDetailsForm";

export const AnimeEntryCard = ({
  animeEntry,
  updateEntryState,
  deleteEntryState,
}: {
  animeEntry: IUserAnimeEntry;
  updateEntryState: (entry: IUserAnimeEntry) => void;
  deleteEntryState: (malId: string) => void;
}) => {
  const { userInfo } = useAuth() as AuthContextType;
  const [hovering, setHovering] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleSwitchHoverStatus = () => {
    if (userInfo) setHovering(!hovering);
  };

  let statusColor: "bg-[#1A9A1A]" | "bg-[#FFA500]" | "bg-[#3B82F6]";

  if (animeEntry.status === "completed") {
    statusColor = "bg-[#1A9A1A]";
  } else if (animeEntry.status === "watching") {
    statusColor = "bg-[#FFA500]";
  } else {
    statusColor = "bg-[#3B82F6]";
  }

  const closeModal = () => {
    dialogRef.current?.close();
  };
  const showModal = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black backdrop:bg-opacity-50 w-full max-w-[550px] text-white rounded-lg">
        <UpdateEntryDetailsForm
          updateEntryState={updateEntryState}
          deleteEntryState={deleteEntryState}
          showModal={showModal}
          closeModal={closeModal}
          animeEntry={animeEntry}
        />{" "}
      </dialog>
      <article className="w-52 text-center hover:font-bold transition flex flex-col gap-2">
        <div
          className="relative hover:scale-[1.02] transition duration-150"
          onMouseEnter={handleSwitchHoverStatus}
          onMouseLeave={handleSwitchHoverStatus}>
          <img
            src={animeEntry.animeDetails.imageUrl}
            alt={`Poster for anime with title '${animeEntry.animeDetails.title}'`}
            className="w-full rounded-lg "
          />
          {hovering && (
            <div className="absolute w-full inset-0 bg-black bg-opacity-50 transition duration-150 rounded-lg flex flex-col justify-center items-center gap-4">
              <button
                className="bg-otherPurple w-fit p-1 px-3 rounded-md"
                onClick={showModal}>
                Update
              </button>

              <Link to={`/animes/${animeEntry.malId}`}>
                <button className="bg-otherPurple w-fit p-1 px-3 rounded-md">
                  View
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={`rounded-full ${statusColor} size-4 inline-block flex-shrink-0`}></div>
          <p className="text-lg">{animeEntry.status}</p>
        </div>
        <p className="text-xl font-bold text-start">
          {animeEntry.animeDetails.title}
        </p>
      </article>
    </>
  );
};
