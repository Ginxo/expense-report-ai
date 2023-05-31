import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "../../../shared/security/AuthenticationGuard";
import { CallbackPage } from "../../../views/CallbackPage";
import Dashboard from "../../../views/Dashboard";
import Logout from "../../../views/Logout";
import UserProfile from "../../../views/UserProfile";
import { PageLoader } from "../../../shared/loader/PageLoader";

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationGuard component={Dashboard} />} />
      <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard} />} />
      <Route path="/auth-callback" element={<CallbackPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/loader" element={<PageLoader />} />
      <Route path="/user/profile" element={<AuthenticationGuard component={UserProfile} />} />
    </Routes>
  );
};

export default RoutesTree;
