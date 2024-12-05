import React from "react";

export const AuthFormSubmitBtn = ({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}) => {
  return (
    <button
      className="bg-gradient-to-tr from-[#B8ACCD] to-[#5C5667] mt-4 min-w-80 w-96 rounded-2xl text-2xl h-14"
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
};
