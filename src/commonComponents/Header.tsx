import { Link } from "react-router";
import { FaRandom } from "react-icons/fa";
import React from "react";
import { AuthContextType, useAuth } from "../auth/AuthProvider";

export const Header = ({
  children,
}: {
  children?: React.JSX.Element | React.JSX.Element[];
}) => {
  const { userInfo } = useAuth() as AuthContextType;

  return (
    <div className="flex justify-around items-center w-full p-4 py-8">
      <Link to="/home">
        <h1 className="text-5xl font-bold">
          Anime <span className="text-complementary">Archive</span>
        </h1>
      </Link>
      {children}
      <div className="flex flex-col items-center">
        <FaRandom />
        <p>Random</p>
      </div>
      {userInfo ? (
        <Link to="/mylist" className="text-lg">
          My List
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-[#494395] px-4 py-3 rounded-xl font-bold">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-[#494395] px-4 py-3 rounded-xl font-bold">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
