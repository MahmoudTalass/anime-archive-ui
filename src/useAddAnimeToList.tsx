import { AuthContextType, useAuth } from "./auth/AuthProvider";

export const useAddAnimeToList = (malId: string) => {
  const { userInfo } = useAuth() as AuthContextType;

  const addAnimeToUserList = async () => {
    if (!userInfo) return;
    const url = "http://localhost:3000/api/v1/me/animes";
    const headers = {
      Authorization: `Bearer ${userInfo?.token}`,
      "Content-Type": "application/json",
    };
    const body = {
      malId: malId,
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

  return { addAnimeToUserList };
};
