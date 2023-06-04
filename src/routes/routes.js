import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Home from "../Pages/Dashboard/Home";
import { MerchantDetail } from "../Pages/MerchantDetail/MerchantDetail";
import MerchantDashboard from "../Pages/Dashboard/MerchantDashboard";
import { ErrorPage } from "../Pages/404Page";
import { LandingPage } from "../Pages/LandingPage/LandingPage";

export const routes = [
  { path: "/sign-up", Component: Signup, isPublic: true },
  { path: "/login", Component: Login, isPublic: true },
  { path: "/", Component: LandingPage, isPublic: true },
  { path: "/admin-dashboard", Component: Home, isPublic: false },
  { path: "/merchant-Detail", Component: MerchantDetail, isPublic: false },
  { path: "/merchant-dashboard", Component: MerchantDashboard, isPublic: false },
  { path: "*", Component: ErrorPage, isPublic: true },
];
