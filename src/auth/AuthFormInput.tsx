interface AuthFormInputInfo {
   inputTitle: string;
   inputType: string;
   isRequired?: boolean;
   placeHolder?: string;
}

export const AuthFormInput = ({
   inputTitle,
   inputType,
   isRequired = false,
   placeHolder,
}: AuthFormInputInfo) => {
   return (
      <div className="flex flex-col gap-2">
         <label htmlFor={inputTitle} className="font-bold">
            {inputTitle}
         </label>
         <input
            type={inputType}
            required={isRequired}
            placeholder={placeHolder}
            id={inputTitle}
            className="rounded-sm bg-[#8179A4] p-2"
         />
      </div>
   );
};
