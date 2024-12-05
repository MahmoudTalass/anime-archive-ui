import { Link } from "react-router";
import homePageImg from "../assets/front-page-img.jpg";

export const FrontPage = (): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center p-4">
      <section className="mt-16 max-w-[72rem] w-full bg-complementary p-12 flex gap-16 rounded-md shadow-sm">
        <figure className="hidden md:max-w-[28rem] md:block">
          <img src={homePageImg} alt="front page image" />
          <figcaption>
            Designed by{" "}
            <a
              href="https://www.freepik.com"
              target="_blank"
              className="underline">
              Freepik
            </a>
          </figcaption>
        </figure>
        <div className="flex flex-col gap-20 justify-center">
          <div>
            <p className="text-5xl font-bold pb-2">Welcome to</p>
            <p className="text-5xl font-bold text-accent">Anime Archive</p>
          </div>
          <div className="font-bold flex flex-wrap gap-8">
            <button className="bg-transparent border-2 border-white rounded-xl w-32 p-2 hover:scale-105 transition-transform">
              <Link to="/login">Login</Link>
            </button>
            <button className="bg-transparent border-2 border-white rounded-xl w-32 px-5 hover:scale-105 transition-transform">
              <Link to="/register">Create account</Link>
            </button>
            <button className="rounded-xl w-32 py-3 bg-accent hover:scale-105 transition-transform">
              Browse Anime
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};