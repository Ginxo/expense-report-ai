import { Spin } from "antd";
import React from "react";
import "./PageLoader.css";
import { SpinnerIcon } from "./SpinnerIcon";

interface ISpinner {
    size?: number
    spin?: boolean
}

export const Spinner: React.FC<ISpinner> = ({ size = 48, spin = true }) => {
    return <Spin indicator={<SpinnerIcon size={size} spin={spin} />} />;
};
