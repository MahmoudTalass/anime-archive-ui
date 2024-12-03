import { Link } from "react-router";
import { AuthFormContainer } from "./AuthFormContainer";
import { AuthFormInput } from "./AuthFormInput";

export const RegisterForm = () => {
   return (
      <AuthFormContainer>
         <AuthFormInput inputTitle="Username" inputType="text" isRequired={true} />
         <AuthFormInput inputTitle="Email" inputType="email" isRequired={true} />
         <AuthFormInput inputTitle="Password" inputType="password" isRequired={true} />
         <p className="mt-8 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
               Login
            </Link>
         </p>
      </AuthFormContainer>
   );
};
