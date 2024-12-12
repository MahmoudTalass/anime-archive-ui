import { Header } from "../../commonComponents/Header";

export const AuthFormPageContainer = ({
  children,
}: {
  children: React.JSX.Element[];
}) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">{children}</div>
    </>
  );
};
