import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IButtonLink {
    to: string;
    label: string;
    icon?: React.ReactNode;
}

const ButtonLink: React.FC<IButtonLink> = ({ to, label, icon }) => {
    const navigate = useNavigate();

    function handleClick() {
        navigate(to);
    }
    return <Button type="link" icon={icon} onClick={() => handleClick()}>{label}</Button>
};

export default ButtonLink;
