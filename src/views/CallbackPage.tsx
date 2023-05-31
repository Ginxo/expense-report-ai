import { useAuth0 } from "@auth0/auth0-react";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import React from "react";
import Layout from "../components/shared/layout/Layout";

export const CallbackPage: React.FC = () => {
    const { error } = useAuth0();
    return (
        <Layout >
            {
                error ? (
                    <>
                        <Title>Error</Title>
                        <Text type="danger">{error?.message}</Text>
                    </>
                ) : (
                    <>
                        <Title>Success</Title>
                        <Text type="success">Correctly logged in</Text>
                    </>
                )
            }

        </Layout>
    );
};
