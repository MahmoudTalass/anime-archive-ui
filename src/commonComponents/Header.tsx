import { Link, useNavigate } from "react-router";
import { FaRandom } from "react-icons/fa";
import React, { useState } from "react";
import { AuthContextType, useAuth } from "../auth/AuthProvider";

export const Header = ({
  children,
}: {
  children?: React.JSX.Element | React.JSX.Element[];
}) => {
  const { userInfo, logout } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const [getRandomLoading, setGetRandomLoading] = useState(false);

  const handleRandomAnimeBtn = async () => {
    setGetRandomLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/animes/random"
      );
      const data: { data: { malId: number } } = await response.json();
      if (response.ok) {
        navigate(`/animes/${data.data.malId}`);
      }
    } catch (err) {
    } finally {
      setGetRandomLoading(false);
    }
  };

  const handleLogoutUser = () => {
    logout();
  };

  return (
    <div className="flex justify-around items-center w-full p-4 py-8">
      <Link to="/home">
        <h1 className="text-5xl font-bold">
          Anime <span className="text-complementary">Archive</span>
        </h1>
      </Link>
      {children}
      <button
        className="flex flex-col items-center"
        onClick={handleRandomAnimeBtn}
        disabled={getRandomLoading}>
        <FaRandom size="1.2rem" />
        <p>Random</p>
      </button>
      {userInfo ? (
        <>
          <Link to="/mylist" className="text-lg">
            My List
          </Link>
          <button
            className="bg-otherPurple px-4 py-3 rounded-xl font-bold"
            onClick={handleLogoutUser}>
            Logout
          </button>
        </>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-otherPurple px-4 py-3 rounded-xl font-bold">
              Login
            </button>
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
