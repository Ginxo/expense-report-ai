import {
    LoadingOutlined
} from "@ant-design/icons";
import React from "react";
import "./PageLoader.css";

interface ISpinnerIcon {
    size?: number
    spin?: boolean
}

export const SpinnerIcon: React.FC<ISpinnerIcon> = ({ size = 48, spin = true }) => {
    return <LoadingOutlined style={{ fontSize: size }} spin={spin} />;
};
