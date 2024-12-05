import { Link } from "react-router";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthFormInput } from "./components/AuthFormInput";
import React, { useState } from "react";
import { AuthFormPageContainer } from "./components/AuthFormPageContainer";
import { AuthFormSubmitBtn } from "./components/AuthFormSubmitBtn";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

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
      </AuthFormContainer>
      <AuthFormSubmitBtn label="Login" onClick={() => console.log()} />
    </AuthFormPageContainer>
  );
};
