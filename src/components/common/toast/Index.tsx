import { useEffect, useState } from "react";
import Observer from "../../../services/Observer";
import { TToastData } from "../../../typings";

const toastObserver = new Observer();

export default function Toaster() {
  const [toast, setToast] = useState<TToastData>({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    toastObserver.subscribe((data) => {
      setToast(data);
    });
  }, []);

  useEffect(() => {
    if (toast.show) {
      setTimeout(() => {
        setToast({
          message: "",
          type: "",
          show: false,
        });
      }, 3000);
    }
  }, [toast]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 ${
        toast.show ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`p-5 rounded-xl shadow-lg ${
          toast.type === "success" ? "bg-green-700" : toast.type === "error" ? "bg-red-700" : "bg-neutral-800"
        }`}
      >
        <p className="text-lg text-white">{toast.message}</p>
      </div>
    </div>
  );
}

export { toastObserver };
