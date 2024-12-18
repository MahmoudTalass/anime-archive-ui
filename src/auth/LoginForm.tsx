import { Link, useNavigate } from "react-router";
import { AuthFormContainer } from "./components/AuthFormContainer";
import { AuthFormInput } from "./components/AuthFormInput";
import React, { useEffect, useState } from "react";
import { AuthFormPageContainer } from "./components/AuthFormPageContainer";
import { AuthFormSubmitBtn } from "./components/AuthFormSubmitBtn";
import { useAuthenticate } from "./useAuthenticate";
import { AuthContextType, useAuth } from "./AuthProvider";
import { BsThreeDots } from "react-icons/bs";

const FORM_ID = "loginForm";

export const LoginForm = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const { handleAuth, errorMsg, loading } = useAuthenticate("login");
   const { userInfo }: AuthContextType = useAuth() as AuthContextType;
   const navigate = useNavigate();

   useEffect(() => {
      if (userInfo) navigate("/");
   }, [userInfo, navigate]);

   const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
   const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value);

   const onSubmit: React.FormEventHandler<HTMLFormElement> = (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();
      if (email.trim() === "" || password.trim() === "") {
         return;
      }

      handleAuth(email, password);
      setPassword("");
   };

   return (
      <AuthFormPageContainer>
         <AuthFormContainer onSubmit={onSubmit} formId={FORM_ID}>
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
            <>{errorMsg && <p className="bg-red-600 p-2 text-center rounded-md">{errorMsg}</p>}</>
         </AuthFormContainer>
         <AuthFormSubmitBtn disabled={loading} formAttr={FORM_ID}>
            {loading ? <BsThreeDots className="animate-pulse" size={"2rem"} /> : <p>Login</p>}
         </AuthFormSubmitBtn>
      </AuthFormPageContainer>
   );
};
