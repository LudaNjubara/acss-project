import { Outlet } from "react-router-dom";
import Header from "./components/common/header/Index";

export default function RootLayout() {
  return (
    <div className="mt-40 p-10 w-full mx-auto max-w-[1600px] bg-neutral-800 rounded-xl">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
