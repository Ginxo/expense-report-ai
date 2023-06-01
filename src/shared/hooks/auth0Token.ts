import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0Token = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const [token, setToken] = useState<string>();

    useEffect(() => {
        if (isAuthenticated) {
            const fetchToken = async () => {
                const auth0Token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
                        scope: "openid",
                    },
                });
                setToken(auth0Token);
            };

            fetchToken().catch(e => { throw new Error(`Error fetching token from Auth0 ${e}`); });
        }
    }, [isAuthenticated]);

    return { token };
};

export default Auth0Token;