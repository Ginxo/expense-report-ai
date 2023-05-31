import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import React from "react";

interface IUserAvatar {
    reponsive?: boolean;
    size?: number;
}

const UserAvatar: React.FC<IUserAvatar> = ({ reponsive = true, size = 48 }) => {
    const { isLoading, isAuthenticated, user } = useAuth0();
    const avatarResponsiveSize = { xs: 48, sm: 60, md: 80, lg: 100, xl: 140, xxl: 160 };

    return (
        !isLoading && isAuthenticated && user ?
            <Avatar size={reponsive ? avatarResponsiveSize : size} src={user.picture} />
            : <SkeletonAvatar size={size} active style={{ backgroundColor: "#bfbfbf" }} />
    );
};

export default UserAvatar;
