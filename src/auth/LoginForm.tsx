import { Link } from "react-router";
import { AuthFormContainer } from "./AuthFormContainer";
import { AuthFormInput } from "./AuthFormInput";

export const LoginForm = () => {
   return (
      <AuthFormContainer>
         <AuthFormInput inputTitle="Email" inputType="email" isRequired={true} />
         <AuthFormInput inputTitle="Password" inputType="password" isRequired={true} />
         <p className="mt-8 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
               Create an account
            </Link>
         </p>
      </AuthFormContainer>
   );
};
