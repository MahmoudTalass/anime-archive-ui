import { useState } from "react";
import { AuthContextType, useAuth, UserInfo } from "./AuthProvider";
import { APIErrorResponseType } from "../commonTypes";

interface AuthSuccessResponseType {
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
}

export const useAuthenticate = (authType: "register" | "login") => {
  const { login, userInfo }: AuthContextType = useAuth() as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAuth = async (
    email: string,
    password: string,
    username?: string
  ) => {
    setLoading(true);
    setErrorMsg(null);
    const authApiUrl = `http://localhost:3000/api/v1/auth/${authType}`;
    let body: Record<string, any> = {
      email,
      password,
    };
    let headers: { Authorization?: string; "Content-Type": string } = {
      "Content-Type": "application/json",
    };

    if (authType == "register") {
      body.username = username;
    }

    if (userInfo?.token) {
      headers.Authorization = `Bearer ${userInfo.token}`;
    }

    try {
      const response = await fetch(authApiUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
      });

      const responseBody: AuthSuccessResponseType | APIErrorResponseType =
        await response.json();

      if ("error" in responseBody) {
        if (!response.ok) {
          console.log(responseBody);
          if (
            response.status === 403 ||
            response.status === 400 ||
            response.status === 401 ||
            response.status === 404
          ) {
            throw new Error(responseBody.error.message);
          } else {
            throw new Error("Could not authenticate, please try again later.");
          }
        }
      }

      const userInfoResponse: AuthSuccessResponseType =
        responseBody as AuthSuccessResponseType;

      const userInfoObj: UserInfo = {
        token: userInfoResponse.data.token,
        email: userInfoResponse.data.user.email,
        username: userInfoResponse.data.user.username,
        id: userInfoResponse.data.user.id,
      };

      login(userInfoObj);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMsg(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleAuth, loading, errorMsg };
};
