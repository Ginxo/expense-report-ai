import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Layout as AntdLayout, Breadcrumb, Button, Col, Image, Menu, Row, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WindowsState from "../../../shared/hooks/windowsState";
import UserMenu from "./UserMenu";

const { Header, Sider, Content } = AntdLayout;

interface ILayout {
    breadCrumb?: string[]
    children: unknown;
}

const Layout: React.FC<ILayout> = ({ breadCrumb, children }) => {
    const { isAuthenticated } = useAuth0();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { width } = WindowsState();

    const location = useLocation();
    const [current, setCurrent] = useState(
        location.pathname === "/" || location.pathname === ""
            ? "/dashboard"
            : location.pathname,
    );
    useEffect(() => {
        if (location && current !== location.pathname) {
            setCurrent(location.pathname);
        }
    }, [location, current]);

    useEffect(() => setCollapsed((width < 800) === true), [width]);

    function handleClick(e: unknown) {
        setCurrent(e.key);
    }

    return (
        <AntdLayout style={{ height: "100vh" }}>
            <Header style={{ padding: "0px", margin: "0px" }}>
                <Row>
                    <Col span={12}>
                        <Image height={60} src={`${process.env.PUBLIC_URL}/logo.png`} preview={false} />
                    </Col>
                    <Col span={12} style={{ paddingRight: "32px" }}>
                        <UserMenu />
                    </Col>
                </Row>
            </Header>
            <AntdLayout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    {isAuthenticated ?
                        <Menu theme="dark" mode="inline" onClick={e => handleClick(e)}
                            items={[{ key: "/dashboard", icon: <DashboardOutlined />, label: (<Link to="/dashboard">Dashboard</Link>) }]} />
                        : null}

                </Sider>
                <AntdLayout style={{ padding: "0 24px 24px" }}>
                    <Header style={{ padding: 0, background: colorBgContainer, margin: "16px 0px" }}>
                        <Row>
                            <Col key="colCollapse">
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: "16px",
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </Col>
                            <Col key="colBreadcrumb">
                                <Breadcrumb style={{ margin: "20px 16px" }} items={breadCrumb ? breadCrumb.map(e => ({ title: e })) : []} />
                            </Col>
                        </Row>
                        <></>
                    </Header>
                    <Content
                        style={{
                            margin: "0px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </Content>
                </AntdLayout>
            </AntdLayout>
        </AntdLayout>
    );
};

export default Layout;
