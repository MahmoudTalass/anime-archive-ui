import React, { useState } from "react";
import {
  AnimeWatchStatus,
  APIErrorResponseType,
  EntryScore,
  IUserAnimeEntry,
} from "../commonTypes";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";
import { EntryUpdateFormInputContainer } from "./EntryUpdateFormInputContainer";
import { BsThreeDots } from "react-icons/bs";

const ENTRY_SCORE_TEXT = [
  [1, "Abysmal"],
  [2, "Awful"],
  [3, "Poor"],
  [4, "Weak"],
  [5, "Mediocre"],
  [6, "Decent"],
  [7, "Good"],
  [8, "Great"],
  [9, "Excellent"],
  [10, "Masterpiece"],
];

export const UpdateEntryDetailsForm = ({
  animeEntry,
  updateEntryState,
  deleteEntryState,
  closeModal,
}: {
  animeEntry: IUserAnimeEntry;
  updateEntryState: (entry: IUserAnimeEntry) => void;
  deleteEntryState: (malId: string) => void;
  closeModal: () => void;
  showModal: () => void;
}) => {
  const { userInfo, logout } = useAuth() as AuthContextType;
  const [status, setStatus] = useState<AnimeWatchStatus>(animeEntry.status);
  const [score, setScore] = useState<EntryScore | null>(animeEntry.score);
  const [startedDate, setStartedDate] = useState<Date | null>(() =>
    animeEntry.startedDate ? new Date(animeEntry.startedDate) : null
  );
  const [finishedDate, setFinishedDate] = useState<Date | null>(() =>
    animeEntry.finishedDate ? new Date(animeEntry.finishedDate) : null
  );
  const [notes, setNotes] = useState(animeEntry.notes);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateErrMsg, setUpdateErrMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleUpdateEntry = async () => {
    animeEntry.notes = notes;
    animeEntry.score = score;
    animeEntry.status = status;
    animeEntry.startedDate = startedDate;
    animeEntry.finishedDate = finishedDate;
    setUpdateLoading(true);
    setUpdateErrMsg(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/me/animes/${animeEntry.malId}`,
        {
          method: "PUT",
          body: JSON.stringify(animeEntry),
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        if (response.status === 400) {
          const errorJson: APIErrorResponseType = await response.json();
          throw new Error(errorJson.error.message);
        }
      }
      updateEntryState(animeEntry);
      closeModal();
    } catch (err) {
      if (err instanceof Error) setUpdateErrMsg(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteEntry = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/me/animes/${animeEntry.malId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
      }
      deleteEntryState(animeEntry.malId);
    } catch (err) {
    } finally {
      closeModal();
    }
  };

  const handleCloseForm = () => {
    setNotes(animeEntry.notes);
    setScore(animeEntry.score);
    setStartedDate(
      animeEntry.startedDate ? new Date(animeEntry.startedDate) : null
    );
    setFinishedDate(
      animeEntry.finishedDate ? new Date(animeEntry.finishedDate) : null
    );
    setStatus(animeEntry.status);

    closeModal();
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as AnimeWatchStatus);
  };
  const handleChangeScore = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScore(e.target.value as EntryScore);
  };

  const handleStartedDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartedDate(new Date(e.target.value));
  };
  const handleFinishedDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinishedDate(new Date(e.target.value));
  };
  const handleChangeNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const formatDate = (date: Date) => {
    const year: string = String(date.getFullYear());
    let month: string = String(date.getMonth() + 1);
    let day: string = String(date.getDate());

    if (Number(month) < 10) month = `0${month}`;
    if (Number(day) < 10) day = `0${day}`;

    return `${year}-${month}-${day}`;
  };

  return (
    <section className="bg-complementary p-6 flex flex-col gap-4">
      <h2 className="text-center text-2xl">
        Update Entry:{" "}
        <span className="font-bold">{animeEntry.animeDetails.title}</span>
      </h2>
      <div className="flex flex-col gap-4">
        <EntryUpdateFormInputContainer>
          <label htmlFor="status">Watch status</label>
          <select
            name="status"
            id="status"
            onChange={handleChangeStatus}
            value={status}
            className="bg-lighterPurple p-1 rounded-sm">
            <option value="completed">Completed</option>
            <option value="watching">Watching</option>
            <option value="planning to watch">Planning to Watch</option>
          </select>
        </EntryUpdateFormInputContainer>
        <EntryUpdateFormInputContainer>
          <label htmlFor="score">Your Score</label>
          <select
            name="score"
            id="score"
            value={score ?? ""}
            onChange={handleChangeScore}
            className="bg-lighterPurple">
            <option value="" disabled hidden>
              Select score
            </option>
            {ENTRY_SCORE_TEXT.map(([scoreNum, scoreText]) => {
              return (
                <option key={scoreNum} value={scoreNum}>
                  ({scoreNum}) {scoreText}
                </option>
              );
            })}
          </select>
        </EntryUpdateFormInputContainer>
        <EntryUpdateFormInputContainer>
          <label htmlFor="startedDate">Started Date</label>
          <input
            type="date"
            value={startedDate ? formatDate(startedDate) : ""}
            onChange={handleStartedDateChange}
            className="bg-lighterPurple p-1 rounded-sm"
          />
        </EntryUpdateFormInputContainer>
        <EntryUpdateFormInputContainer>
          <label htmlFor="finishedDate">Finished Date</label>
          <input
            type="date"
            value={finishedDate ? formatDate(finishedDate) : ""}
            onChange={handleFinishedDateChange}
            className="bg-lighterPurple p-1 rounded-sm"
          />
        </EntryUpdateFormInputContainer>
        <div className="flex flex-col gap-2">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            className="bg-lighterPurple rounded-sm p-1"
            onChange={handleChangeNotes}
            value={notes}
            rows={5}></textarea>
        </div>
      </div>
      {updateErrMsg && (
        <div>
          <p className="bg-red-600 p-2 rounded-sm font-bold">{updateErrMsg}</p>
        </div>
      )}
      {updateLoading ? (
        <div className="flex justify-center">
          <BsThreeDots className="animate-pulse" size={"2rem"} />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <button
                onClick={handleUpdateEntry}
                className="bg-lighterPurple px-2 py-1 rounded-md">
                Update
              </button>
              <button
                onClick={handleCloseForm}
                className=" px-2 py-1 rounded-md">
                Close
              </button>
            </div>
            <button
              onClick={handleDeleteEntry}
              className="bg-transparent border px-2 py-1 rounded-md hover:bg-red-600 hover:border-red-600">
              Delete
            </button>
          </div>
        </>
      )}
    </section>
  );
};
