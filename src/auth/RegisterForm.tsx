import { Link } from "react-router";
import { AuthFormContainer } from "./AuthFormContainer";
import { AuthFormInput } from "./AuthFormInput";
import { useState } from "react";
import { useAuthenticate } from "./useAuthenticate";
import { AuthFormPageContainer } from "./AuthFormPageContainer";
import { AuthFormSubmitBtn } from "./AuthFormSubmitBtn";

export const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleAuth, errorMsg, loading } = useAuthenticate("register");

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <AuthFormPageContainer>
      <AuthFormContainer>
        <AuthFormInput
          inputTitle="Username"
          inputType="text"
          isRequired={true}
          value={username}
          onChange={handleUsernameInput}
        />
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
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
        <>{errorMsg && <p>{errorMsg}</p>}</>
      </AuthFormContainer>
      <AuthFormSubmitBtn label="Create Account" onClick={() => console.log()} />
    </AuthFormPageContainer>
  );
};
