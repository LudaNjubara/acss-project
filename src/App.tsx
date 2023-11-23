import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import RootLayout from "./RootLayout";
import PrivateRoutes from "./components/common/router/PrivateRoutes";
import Toaster from "./components/common/toast/Index";
import CustomersView from "./components/views/customers/Index";
import HomeView from "./components/views/home/Index";
import LoginView from "./components/views/login/Index";
import ProfileView from "./components/views/profile/Index";
import RegisterView from "./components/views/register/Index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomeView />} />
      <Route path="login" element={<LoginView />} />
      <Route path="register" element={<RegisterView />} />
      <Route path="customers" element={<CustomersView />} />

      {/* Private routes */}
      <Route element={<PrivateRoutes />}>
        {/* <Route path="customers" element={<CustomersView />} /> */}
        <Route path="profile" element={<ProfileView />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
