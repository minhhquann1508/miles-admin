import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    ProductOutlined,
    OrderedListOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const { pathname } = useLocation();

    const items = [
        {
            key: '/dashboard',
            icon: <HomeOutlined />,
            label: <Link to='/dashboard'>Dashboard</Link>,
        },
        {
            key: '/manage-user',
            icon: <UserOutlined />,
            label: <Link to='/manage-user'>Quản lý người dùng</Link>,
        },
        {
            key: '/manage-product',
            icon: <ProductOutlined />,
            label: <Link to='/manage-product'>Quản lý sản phẩm</Link>,
        },
        {
            key: '/manage-order',
            icon: <OrderedListOutlined />,
            label: <Link to='/manage-order'>Quản lý đơn hàng</Link>,
        },
    ]

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 650,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;