import { Outlet } from "react-router"

export const PageLayout = () => {
    return <main className="h-screen bg-gradient-to-b from-dominant from-10% to-[#494395] text-white"><Outlet /></main>
}