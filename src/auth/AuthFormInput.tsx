import React from "react";

interface AuthFormInputProps {
  inputTitle: string;
  inputType: string;
  isRequired?: boolean;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const AuthFormInput = ({
  inputTitle,
  inputType,
  isRequired = false,
  placeHolder,
  onChange,
  value,
}: AuthFormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputTitle} className="font-bold text-lg">
        {inputTitle}
      </label>
      <input
        type={inputType}
        required={isRequired}
        placeholder={placeHolder}
        id={inputTitle}
        className="rounded-sm bg-[#8179A4] p-2"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
