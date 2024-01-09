import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, MIN_PASSWORD_LENGTH } from "../../../lib/constants/Index";
import useGlobalStore from "../../../lib/store/GlobalStore";

export default function LoginForm() {
  // zustand state and actions
  const setUser = useGlobalStore((state) => state.setUser);
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn);

  const navigation = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [responseError, setResponseError] = useState("");

  const isSubmitEnabled = !(errors.email || errors.password) && !!(userData.email && userData.password);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setErrors((prevState) => ({ ...prevState, email: "Email is required" }));
    } else if (!emailRegex.test(value)) {
      setErrors((prevState) => ({ ...prevState, email: "Invalid email format" }));
    } else {
      setErrors((prevState) => ({ ...prevState, email: "" }));
    }
  };

  const validatePassword = (value: string) => {
    setErrors((prevState) => ({
      ...prevState,
      password:
        value.length >= MIN_PASSWORD_LENGTH
          ? ""
          : `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isSubmitEnabled) return;

    try {
      const res = await fetch(`${BASE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setResponseError(message || "Something went wrong");
      }

      const { access_token, user } = await res.json();
      localStorage.setItem("token", access_token);
      setUser(user);
      setIsLoggedIn(true);

      navigation("/");
    } catch (error) {
      if (error instanceof Error) {
        setResponseError(error.message);
      } else {
        setResponseError("Something went wrong");
      }
    }
  };

  return (
    <form
      className="w-full max-w-sm mx-auto space-y-6 bg-neutral-900/50 p-9 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold text-neutral-300 text-center">Login</h1>
      <div>
        <label htmlFor="email" className="block text-neutral-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={userData.email}
          onChange={(e) => {
            setUserData((prevState) => ({ ...prevState, email: e.target.value }));
            validateEmail(e.target.value);
          }}
          className="w-full p-2 shadow-md rounded bg-neutral-800 placeholder:text-neutral-600 placeholder:font-normal"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-400 text-sm pt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-neutral-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={userData.password}
          onChange={(e) => {
            setUserData((prevState) => ({ ...prevState, password: e.target.value }));
            validatePassword(e.target.value);
          }}
          className="w-full p-2 shadow-md rounded bg-neutral-800 placeholder:text-neutral-600 placeholder:font-normal"
          placeholder="Password"
        />
        {errors.password && <p className="text-red-400 text-sm pt-1">{errors.password}</p>}
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-neutral-200 text-neutral-800 font-semibold rounded disabled:opacity-30"
        disabled={!isSubmitEnabled}
      >
        Login
      </button>

      {responseError && (
        <p className="text-red-600 bg-red-300 py-3 px-5 rounded-md font-semibold">{responseError}</p>
      )}
    </form>
  );
}
