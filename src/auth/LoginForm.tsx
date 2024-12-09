import { Link, useNavigate } from "react-router";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthFormInput } from "./components/AuthFormInput";
import React, { useState } from "react";
import { AuthFormPageContainer } from "./components/AuthFormPageContainer";
import { AuthFormSubmitBtn } from "./components/AuthFormSubmitBtn";
import { useAuthenticate } from "./useAuthenticate";
import { AuthContextType, useAuth } from "./AuthProvider";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleAuth, errorMsg, loading } = useAuthenticate("login");
  const { userInfo }: AuthContextType = useAuth() as AuthContextType;
  const navigate = useNavigate();

  if (userInfo) navigate("/");

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    handleAuth(email, password);
    setPassword("");
    if (!(typeof errorMsg === "string")) {
      setEmail("");
    }
  };

  return (
    <AuthFormPageContainer>
      <AuthFormContainer>
        <AuthFormInput
          inputTitle="Email"
          inputType="email"
          isRequired={true}
          value={email}
          onChange={handleEmailInput}
        />
        <AuthFormInput
          inputTitle="Password"
          inputType="password"
          isRequired={true}
          value={password}
          onChange={handlePasswordInput}
        />
        <p className="mt-8 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Create an account
          </Link>
        </p>
        <>
          {errorMsg && (
            <p className="bg-red-600 p-2 text-center rounded-md">{errorMsg}</p>
          )}
        </>
      </AuthFormContainer>
      <AuthFormSubmitBtn disabled={loading} label="Login" onClick={onSubmit} />
    </AuthFormPageContainer>
  );
};
