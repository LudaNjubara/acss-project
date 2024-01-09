import { useEffect } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import RootLayout from "./RootLayout";
import PrivateRoutes from "./components/common/router/PrivateRoutes";
import Toaster from "./components/common/toast/Index";
import CustomersView from "./components/views/customers/Index";
import HomeView from "./components/views/home/Index";
import AccountItemsView from "./components/views/items/AccountItemsView";
import LoginView from "./components/views/login/Index";
import ProfileView from "./components/views/profile/Index";
import RegisterView from "./components/views/register/Index";
import { BASE_API_URL } from "./lib/constants/Index";
import useGlobalStore from "./lib/store/GlobalStore";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomeView />} />
      <Route path="login" element={<LoginView />} />
      <Route path="register" element={<RegisterView />} />
      <Route path="customers" element={<CustomersView />} />
      <Route path="items/:billId" element={<AccountItemsView />} />

      {/* Private routes */}
      <Route element={<PrivateRoutes />}>
        {/* <Route path="customers" element={<CustomersView />} /> */}
        <Route path="profile" element={<ProfileView />} />
      </Route>
    </Route>
  )
);

function App() {
  const setUser = useGlobalStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${BASE_API_URL}/auth/user-info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { user } = await res.json();
      setUser(user);
      console.log(user);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
