export const AuthFormContainer = ({ children }: { children: React.JSX.Element[] }) => {
   return (
      <main className="h-screen flex justify-center bg-gradient-to-b from-dominant from-10% to-[#494395] text-white">
         <section className="min-w-96 h-fit mt-32 bg-gradient-to-bl from-complementary from-30% to-[#8F84C3] rounded-lg p-8 flex flex-col gap-4">
            {children}
         </section>
      </main>
   );
};
