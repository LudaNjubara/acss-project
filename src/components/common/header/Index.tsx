import { LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGlobalStore from "../../../lib/store/GlobalStore";

export default function Header() {
  // zustand state and actions
  const user = useGlobalStore((state) => state.user);
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);

  const location = useLocation();
  const navigation = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation("/login");
  };

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

          <span className="h-10 w-[2px] bg-neutral-400/25"></span>

          {isLoggedIn && (
            <li className="flex items-center gap-3">
              <Link
                to="/profile"
                className={`text-neutral-200 rounded-full py-3 px-5 hover:bg-neutral-700/50 transition-colors duration-200 ${
                  location.pathname === "/profile" ? "bg-neutral-700/40" : ""
                }`}
              >
                {user?.name}
              </Link>
              <button
                className="grid place-items-center rounded-full w-11 aspect-square bg-red-600 hover:bg-red-500 focus:bg-red-500 transition-colors duration-300"
                onClick={handleLogout}
              >
                <LogOut size={20} className="opacity-80" />
              </button>
            </li>
          )}
          {!isLoggedIn && (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
