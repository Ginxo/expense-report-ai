import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button } from "antd";
import { useCallback, useEffect } from "react";
import Layout from "../components/shared/layout/Layout";

const Logout: React.FC = () => {
    const { logout } = useAuth0();

    const performLogout = useCallback(() => logout({
        logoutParams: {
            returnTo: window.location.origin,
        },
    }), [logout])

    useEffect(() => {
        setTimeout(() => {
            performLogout();
        }, 1000);
    }, [performLogout]);

    return <Layout>
        <Alert
            message="Login out..."
            description={
                <span>You will be logged out. In case redirection does not work please click on <Button type="link" onClick={() => performLogout()}>logout</Button> </span>
            }
            type="success"
            showIcon
        />
    </Layout>;
};

export default Logout;