import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    ProductOutlined,
    OrderedListOutlined
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Space, theme } from 'antd';
const { Header, Sider, Content } = Layout;

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, []);

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
                        padding: '0',
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between'
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
                    <Space style={{ paddingRight: 12 }}>
                        <Avatar src={user.avatar} alt={user.fullname} />
                        <span>Xin chào, {user.fullname}</span>
                    </Space>
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