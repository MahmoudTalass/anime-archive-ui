import React, { useState } from "react";
import {
  AnimeWatchStatus,
  EntryScore,
  IUserAnimeEntry,
} from "../browsePage/types";
import { AuthContextType, useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const handleUpdateEntry = async () => {
    animeEntry.notes = notes;
    animeEntry.score = score;
    animeEntry.status = status;
    animeEntry.startedDate = startedDate;
    animeEntry.finishedDate = finishedDate;
    updateEntryState(animeEntry);

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
      }
    } catch (err) {
    } finally {
      closeModal();
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
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  return (
    <section className="bg-complementary p-6">
      <h2>Update Entry</h2>
      <div>
        <div className="flex gap-4">
          <label htmlFor="status">Watch status</label>
          <select
            name="status"
            id="status"
            onChange={handleChangeStatus}
            value={status}
            className="bg-[#8179A4]">
            <option value="completed">Completed</option>
            <option value="watching">Watching</option>
            <option value="planning to watch">Planning to Watch</option>
          </select>
        </div>
        <div>
          <label htmlFor="score">Your Score</label>
          <select
            name="score"
            id="score"
            value={score ?? ""}
            onChange={handleChangeScore}
            className="bg-[#8179A4]">
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
        </div>
        <div>
          <label htmlFor="startedDate">Started Date</label>
          <input
            type="date"
            value={startedDate ? formatDate(startedDate) : ""}
            onChange={handleStartedDateChange}
            className="bg-[#8179A4]"
          />
        </div>
        <div>
          <label htmlFor="finishedDate">Finished Date</label>
          <input
            type="date"
            value={finishedDate ? formatDate(finishedDate) : ""}
            onChange={handleFinishedDateChange}
            className="bg-[#8179A4]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            className="bg-[#8179A4] rounded-md p-1"
            onChange={handleChangeNotes}
            value={notes}></textarea>
        </div>
      </div>
      <button onClick={handleUpdateEntry}>Update</button>
      <button onClick={handleDeleteEntry}>Delete</button>
      <button onClick={handleCloseForm}>Close</button>
    </section>
  );
};
