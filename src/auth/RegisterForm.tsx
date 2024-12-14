import { Link, useNavigate } from "react-router";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthFormInput } from "./components/AuthFormInput";
import { useEffect, useState } from "react";
import { useAuthenticate } from "./useAuthenticate";
import { AuthFormPageContainer } from "./components/AuthFormPageContainer";
import { AuthFormSubmitBtn } from "./components/AuthFormSubmitBtn";
import { AuthContextType, useAuth } from "./AuthProvider";

const FORM_ID = "registrationForm";

export const RegisterForm = () => {
   const [username, setUsername] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const { handleAuth, errorMsg, loading } = useAuthenticate("register");
   const { userInfo } = useAuth() as AuthContextType;
   const navigate = useNavigate();

   useEffect(() => {
      if (userInfo) navigate("/");
   }, [userInfo, navigate]);

   const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) =>
      setUsername(e.target.value);
   const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
   const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value);

   const onSubmit: React.FormEventHandler<HTMLFormElement> = (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();
      if (email.trim() === "" || username.trim() === "" || password.trim() === "") {
         return;
      }

      handleAuth(email, password, username);

      setPassword("");
      if (!(typeof errorMsg === "string")) {
         setEmail("");
         setUsername("");
      }
   };

   return (
      <AuthFormPageContainer>
         <AuthFormContainer onSubmit={onSubmit} formId={FORM_ID}>
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
            <>{errorMsg && <p className="bg-red-600 p-2 text-center rounded-md">{errorMsg}</p>}</>
         </AuthFormContainer>
         <AuthFormSubmitBtn disabled={loading} label="Create Account" formAttr={FORM_ID} />
      </AuthFormPageContainer>
   );
};
