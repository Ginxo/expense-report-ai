import { Auth0Provider, AppState } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface IAuth0ProviderWithNavigate {
    children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({
    children,
}: PropsWithChildren<IAuth0ProviderWithNavigate>): JSX.Element | null => {
    const navigate = useNavigate();

    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            useRefreshTokens={true}
            useRefreshTokensFallback={false}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
                scope: "openid profile email offline_access"
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
