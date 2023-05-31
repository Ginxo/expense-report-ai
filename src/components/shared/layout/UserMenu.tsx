import {
    LogoutOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';
import React from 'react';
import ButtonLink from '../ButtonLink';
import UserAvatar from '../UserAvatar';

interface IUserMenu { }

const UserMenu: React.FC<IUserMenu> = () => {
    const { isLoading, isAuthenticated, user } = useAuth0();

    const subMenuElements: MenuProps['items'] = [
        {
            label: (
                <ButtonLink icon={<UserOutlined />} label="User Profile" to="/user/profile" />
            ),
            key: '0',
        },
        { type: 'divider' },
        {
            label: (
                <ButtonLink icon={<LogoutOutlined />} label="Logout" to="/logout" />
            ),
            key: '1',
        }
    ];

    return <Space align="end" style={{ float: "right" }} >
        {
            !isLoading && isAuthenticated && user ?
                <Dropdown menu={{ items: subMenuElements }} placement="bottomRight" arrow>
                    <a onClick={(e) => e.preventDefault()} href="/">
                        {user?.picture ? <UserAvatar reponsive={false} size={48} /> :
                            <Avatar size={48} icon={<UserOutlined />} />
                        }
                    </a>
                </Dropdown>
                : isLoading ?
                    <SkeletonAvatar active style={{ backgroundColor: '#bfbfbf' }} /> : <Avatar size={48} icon={<UserOutlined />} style={{ backgroundColor: '#bfbfbf' }} />}
    </Space >;

};

export default UserMenu;
