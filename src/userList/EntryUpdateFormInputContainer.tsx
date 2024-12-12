import React from "react";

export const EntryUpdateFormInputContainer = ({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}) => {
  return <div className="flex gap-4 items-center">{children}</div>;
};
