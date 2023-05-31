import {
  LoadingOutlined
} from "@ant-design/icons";
import React from "react";
import "./PageLoader.css";
import { Spin } from "antd";
import Layout from "../../components/shared/layout/Layout";

export const PageLoader: React.FC = () => {
  return (
    <Layout>
      <div className='loader-container'>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}></Spin>
      </div>
    </Layout>
  );
};
