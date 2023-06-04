import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Home from "../Pages/Dashboard/Home";
import { MerchantDetail } from "../Pages/MerchantDetail/MerchantDetail";
import MerchantDashboard from "../Pages/Dashboard/MerchantDashboard";
import { ErrorPage } from "../Pages/404Page";
import { LandingPage } from "../Pages/LandingPage/LandingPage";
// import Register from "../pages/Auth/Register";
// import Dashboard from "../pages/dashboard/Dashboard";
// import Settings from "../pages/Settings";
// import Profile from "../pages/Profile/index";
// import Job from "../pages/Job/Job";
// import SuccessScreen from "../pages/Job/SuccessScreen";
// import JobListing from "../pages/HomePage/JobListing";
// import JobDetail from "../pages/HomePage/JobDetail";
export const routes = [
  { path: "/sign-up", Component: Signup, isPublic: true },
  { path: "/login", Component: Login, isPublic: true },
  { path: "/", Component: LandingPage, isPublic: true },
  { path: "/admin-dashboard", Component: Home, isPublic: true },
  { path: "/merchant-Detail", Component: MerchantDetail, isPublic: true },
  { path: "/merchant-dashboard", Component: MerchantDashboard, isPublic: true },
  { path: "*", Component: ErrorPage, isPublic: true },
  // { path: "/register", Component: Register, isPublic: true },
  // { path: "/dashboard", Component: Dashboard, isPublic: false },
  // { path: "/dashboard-accountsettings", Component: Settings, isPublic: false },
  // { path: "/dashboard-profile", Component: Profile, isPublic: true },
  // { path: "/job", Component: Job, isPublic: false },
  // { path: "/jobSuccess", Component: SuccessScreen, isPublic: false },
  // { path: "/JobListing", Component: JobListing, isPublic: true },
  // { path: "/:slug", Component: JobDetail, isPublic: true },
];
