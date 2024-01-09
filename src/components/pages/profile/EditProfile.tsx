import { FormEvent, useState } from "react";
import { BASE_API_URL, MIN_PASSWORD_LENGTH } from "../../../lib/constants/Index";
import useGlobalStore from "../../../lib/store/GlobalStore";
import { toastObserver } from "../../common/toast/Index";

export default function EditProfile() {
  // zustand state and actions
  const user = useGlobalStore((state) => state.user);

  const [userData, setUserData] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [responseError, setResponseError] = useState("");

  const isSubmitEnabled =
    !(errors.name || errors.email || errors.password || errors.confirmPassword) &&
    !!(userData.email && userData.name && userData.password && userData.confirmPassword);

  console.log(isSubmitEnabled);

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
      password:
        value.length >= MIN_PASSWORD_LENGTH
          ? ""
          : `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    }));
  };

  const validateConfirmPassword = (value: string) => {
    setErrors((prevState) => ({
      ...prevState,
      confirmPassword: value === userData.password ? "" : "Passwords do not match",
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isSubmitEnabled || !user?.id) return;

    try {
      // remove confirmPassword from userData
      const { confirmPassword, ...userDataWithoutConfirmPassword } = userData;

      const res = await fetch(`${BASE_API_URL}/User/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDataWithoutConfirmPassword),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setResponseError(message || "Something went wrong");
        toastObserver.notify({
          message: `Something went wrong while updating profile`,
          type: "error",
          show: true,
        });
        return;
      }

      toastObserver.notify({
        message: `Profile updated successfuly`,
        type: "success",
        show: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        setResponseError(error.message);
      } else {
        setResponseError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 bg-neutral-900 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold text-neutral-50">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-neutral-500">
            Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={user?.name}
            onChange={(e) => {
              setUserData((prevState) => ({ ...prevState, name: e.target.value }));
              validateName(e.target.value);
            }}
            className="px-3 py-2 bg-neutral-800 rounded-lg border-2 border-neutral-400/30 placeholder:text-neutral-500 placeholder:font-normal outline-none focus:border-neutral-200/30 focus:bg-neutral-900 transition-colors duration-300"
          />
          {errors.name && <p className="text-red-400 text-sm pt-1">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-neutral-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="New email"
            defaultValue={user?.email}
            onChange={(e) => {
              setUserData((prevState) => ({ ...prevState, email: e.target.value }));
              validateEmail(e.target.value);
            }}
            className="px-3 py-2 bg-neutral-800 rounded-lg border-2 border-neutral-400/30 placeholder:text-neutral-500 placeholder:font-normal outline-none focus:border-neutral-200/30 focus:bg-neutral-900 transition-colors duration-300"
          />
          {errors.email && <p className="text-red-400 text-sm pt-1">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-neutral-500">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="New password"
            onChange={(e) => {
              setUserData((prevState) => ({ ...prevState, password: e.target.value }));
              validatePassword(e.target.value);
            }}
            className="px-3 py-2 bg-neutral-800 rounded-lg border-2 border-neutral-400/30 placeholder:text-neutral-500 placeholder:font-normal outline-none focus:border-neutral-200/30 focus:bg-neutral-900 transition-colors duration-300"
          />
          {errors.password && <p className="text-red-400 text-sm pt-1">{errors.password}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-neutral-500">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            onChange={(e) => {
              setUserData((prevState) => ({ ...prevState, confirmPassword: e.target.value }));
              validateConfirmPassword(e.target.value);
            }}
            className="px-3 py-2 bg-neutral-800 rounded-lg border-2 border-neutral-400/30 placeholder:text-neutral-500 placeholder:font-normal outline-none focus:border-neutral-200/30 focus:bg-neutral-900 transition-colors duration-300"
          />
          {errors.confirmPassword && <p className="text-red-400 text-sm pt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={!isSubmitEnabled}
          className="mt-5 px-4 py-2 text-neutral-900 font-bold bg-neutral-200 rounded-lg hover:bg-neutral-200/80 disabled:opacity-30 transition-colors duration-200"
        >
          Save
        </button>

        {responseError && (
          <p className="text-red-600 bg-red-300 py-3 px-5 rounded-md font-semibold">{responseError}</p>
        )}
      </form>
    </div>
  );
}
