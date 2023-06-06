import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import { MerchantDetail } from "../Pages/MerchantDetail/MerchantDetail";
import MerchantDashboard from "../Pages/Dashboard/MerchantDashboard";
import { ErrorPage } from "../Pages/404Page";
import { LandingPage } from "../Pages/LandingPage/LandingPage";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";

export const routes = [
  { path: "/sign-up", Component: Signup, isPublic: true },
  { path: "/login", Component: Login, isPublic: true },
  { path: "/", Component: LandingPage, isPublic: true },
  { path: "/admin-dashboard", Component: AdminDashboard, isPublic: false },
  { path: "/merchant-Detail", Component: MerchantDetail, isPublic: false },
  { path: "/merchant-dashboard", Component: MerchantDashboard, isPublic: false },
  { path: "*", Component: ErrorPage, isPublic: true },
];
