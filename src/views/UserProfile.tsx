import { Card, Col, Descriptions, Row, Skeleton, Tooltip } from "antd";
import React from "react";
import Layout from "../components/shared/layout/Layout";
import UserAvatar from "../components/shared/UserAvatar";
import { useAuth0 } from "@auth0/auth0-react";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EyeOutlined
} from "@ant-design/icons";
import Auth0Token from "../shared/hooks/auth0Token";
import Paragraph from "antd/es/typography/Paragraph";

const UserProfile: React.FC = () => {

  const { isLoading, user } = useAuth0();
  const { token } = Auth0Token();


  return (
    <Layout breadCrumb={["", "user", "profile"]}>
      <Card title="User Profile" bordered={false}>
        <Row>
          <Col span={6}>
            <UserAvatar reponsive={true} />
          </Col>
          <Col span={18}>
            <Descriptions layout="vertical">
              {!isLoading && user ?
                <>
                  <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                  <Descriptions.Item label="Nickname">{user.nickname}</Descriptions.Item>
                  <Descriptions.Item label="Email">{user.email}&nbsp;{user.email_verified ? <Tooltip title="email already verified"><CheckCircleTwoTone twoToneColor="#52c41a" /></Tooltip> : <Tooltip title="email NOT verified yet, please check your inbox"><CloseCircleTwoTone twoToneColor="red" /></Tooltip>}</Descriptions.Item>
                  <Descriptions.Item label="User ID">{user.sub}</Descriptions.Item>
                  <Descriptions.Item label="Updated At">{new Date(user.updated_at!).toLocaleString(
                    navigator.language,
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric"
                    }
                  )}</Descriptions.Item>
                  <Descriptions.Item label="API Gateway Access Token">
                    <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: < EyeOutlined /> }}>
                      {token}
                    </Paragraph>
                  </Descriptions.Item>
                </> : <Skeleton active />}

            </Descriptions>
          </Col>
        </Row>
      </Card>
    </Layout >
  );
};

export default UserProfile;
