import React from "react";

export const AuthFormSubmitBtn = ({
  label,
  disabled = false,
  formAttr,
}: {
  label: string;
  disabled?: boolean;
  formAttr: string;
}) => {
  return (
    <button
      form={formAttr}
      className="bg-gradient-to-tr from-[#B8ACCD] to-[#5C5667] mt-4 min-w-80 w-96 rounded-2xl text-2xl h-14 hover:scale-[1.01] active:scale-[0.98] transition-transform"
      disabled={disabled}
      type="submit">
      {label}
    </button>
  );
};
