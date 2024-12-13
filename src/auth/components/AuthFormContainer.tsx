import React from "react";

export const AuthFormContainer = ({
  children,
  onSubmit,
  formId,
}: {
  children: React.JSX.Element[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  formId: string;
}) => {
  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className="min-w-80 w-96 h-fit mt-32 bg-gradient-to-bl from-complementary from-30% to-[#8F84C3] rounded-lg p-8 flex flex-col gap-4">
      {children}
    </form>
  );
};
