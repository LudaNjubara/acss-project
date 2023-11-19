import { Link, useLocation } from "react-router-dom";
import useGlobalStore from "../../../lib/store/GlobalStore";

export default function Header() {
  // zustand state and actions
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);

  const location = useLocation();

  return (
    <header className="fixed top-10 left-[50%] translate-x-[-50%] w-fit max-w-2xl border-1 border-neutral-500 bg-neutral-700/20 p-6 rounded-full shadow-lg backdrop-blur-md">
      <nav className="w-full">
        <ul className="flex justify-center items-center space-x-6">
          <li>
            <Link
              to="/"
              className={`text-neutral-200 rounded-full py-3 px-5 hover:bg-neutral-700/70 transition-colors duration-200 ${
                location.pathname === "/" ? "bg-neutral-700/40" : ""
              }`}
            >
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link
                to="/customers"
                className={`text-neutral-200 rounded-full py-3 px-5 hover:bg-neutral-700/70 transition-colors duration-200 ${
                  location.pathname === "/customers" ? "bg-neutral-700/40" : ""
                }`}
              >
                Customers
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/login"
              className={`text-neutral-200 rounded-full py-3 px-5 hover:bg-neutral-700/70 transition-colors duration-200 ${
                location.pathname === "/login" ? "bg-neutral-700/40" : ""
              }`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`text-neutral-200 rounded-full py-3 px-5 hover:bg-neutral-700/70 transition-colors duration-200 ${
                location.pathname === "/register" ? "bg-neutral-700/40" : ""
              }`}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
