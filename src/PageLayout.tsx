import { Outlet } from "react-router";

export const PageLayout = () => {
   return (
      <main className="flex flex-col min-h-full">
         <Outlet />
         <footer className="flex-grow-0 mt-auto text-center text-gray-400 p-2 text-xs">
            Logo by{" "}
            <a href="https://icons8.com/" className="underline">
               Icon8
            </a>
         </footer>
      </main>
   );
};
