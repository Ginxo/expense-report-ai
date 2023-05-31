import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined
} from '@ant-design/icons';
import { Layout as AntdLayout, Menu, Button, theme, Breadcrumb, Col, Row, Image } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import WindowsState from '../../../shared/hooks/windowsState';

const { Header, Sider, Content } = AntdLayout;

interface ILayout {
    breadCrumb?: string[]
    children: any;
}

const Layout: React.FC<ILayout> = props => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { width } = WindowsState();

    let location = useLocation();
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

    useEffect(() => setCollapsed((width < 800) === true), [width])

    function handleClick(e: any) {
        setCurrent(e.key);
    }

    return (
        <AntdLayout style={{ height: "100vh" }}>
            <Header style={{ padding: "0px", margin: "0px" }}>
                <Row>
                    <Col span={12}>
                        <Image height={60} src={`${process.env.PUBLIC_URL}/logo.png`} preview={false} />
                    </Col>
                    <Col span={12}>
                        <Menu theme="dark" mode="horizontal" onClick={e => handleClick(e)} style={{ flex: "auto", justifyContent: "flex-end" }}
                            items={[{ key: "/profile", icon: <UserOutlined />, label: (<Link to="/profile"></Link>) }]} />
                    </Col>
                </Row>
            </Header>
            <AntdLayout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu theme="dark" mode="inline" onClick={e => handleClick(e)}
                        items={[{ key: "/dashboard", icon: <DashboardOutlined />, label: (<Link to="/dashboard">Dashboard</Link>) }]} />
                </Sider>
                <AntdLayout style={{ padding: '0 24px 24px' }}>
                    <Header style={{ padding: 0, background: colorBgContainer, margin: "16px 0px" }}>
                        <Row>
                            <Col key="colCollapse">
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </Col>
                            <Col key="colBreadcrumb">
                                <Breadcrumb style={{ margin: '20px 16px' }} items={props.breadCrumb ? props.breadCrumb.map(e => ({ title: e })) : []} />
                            </Col>
                        </Row>
                        <></>
                    </Header>
                    <Content
                        style={{
                            margin: '0px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {props.children}
                    </Content>
                </AntdLayout>
            </AntdLayout>
        </AntdLayout>
    );
};

export default Layout;
