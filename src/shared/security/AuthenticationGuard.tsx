import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { PageLoader } from "../loader/PageLoader";

interface ProtectedRouteProps {
    component: ComponentType
}

export const AuthenticationGuard: React.FC<ProtectedRouteProps> = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <PageLoader />,
    });

    return <Component />;
};