import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../../lib/constants/Index";

export default function RegisterForm() {
  const navigation = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [responseError, setResponseError] = useState("");

  const isSubmitEnabled =
    !(errors.name || errors.email || errors.password) &&
    !!(userData.email && userData.name && userData.password);

  const validateName = (value: string) => {
    setErrors((prevState) => ({ ...prevState, name: value ? "" : "Name is required" }));
  };

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
      password: value.length >= 8 ? "" : "Password must be at least 8 characters",
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isSubmitEnabled) return;

    try {
      const res = await fetch(`${BASE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setResponseError(message || "Something went wrong");
      }

      navigation("/login");
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
      <h1 className="text-3xl font-bold text-neutral-300 text-center">Register</h1>
      <div>
        <label htmlFor="name" className="block text-neutral-400">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={userData.name}
          onChange={(e) => {
            setUserData((prevState) => ({ ...prevState, name: e.target.value }));
            validateName(e.target.value);
          }}
          className="w-full p-2 shadow-md rounded bg-neutral-800 placeholder:text-neutral-600 placeholder:font-normal"
          placeholder="Name"
        />
        {errors.name && <p className="text-red-400 text-sm pt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-neutral-200">
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
        Register
      </button>

      {responseError && (
        <p className="text-red-600 bg-red-300 py-3 px-5 rounded-md font-semibold">{responseError}</p>
      )}
    </form>
  );
}
