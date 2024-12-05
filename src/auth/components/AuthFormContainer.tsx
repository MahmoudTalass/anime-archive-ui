export const AuthFormContainer = ({
  children,
}: {
  children: React.JSX.Element[];
}) => {
  return (
    <section className="min-w-80 w-96 h-fit mt-32 bg-gradient-to-bl from-complementary from-30% to-[#8F84C3] rounded-lg p-8 flex flex-col gap-4">
      {children}
    </section>
  );
};
