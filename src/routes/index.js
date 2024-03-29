import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "../Components/ProtectedRoutes/ProtectedRoute";
export const RouteComponent = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, Component, isPublic, userType }, key) => (
          <Route
            key={key}
            path={path}
            element={
              isPublic ?
                <Component />
                :
                <ProtectedRoute userType={userType} component={Component} />
            }
            exact={true}
          />
        ))}
      </Routes>
    </Router>
  );
};