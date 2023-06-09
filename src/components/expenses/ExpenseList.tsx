import {
    ReloadOutlined
} from "@ant-design/icons";
import { Button, Col, Row, Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import Title from "antd/es/typography/Title";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { SpinnerIcon } from "../../shared/loader/SpinnerIcon";
import Auth0Token from "../../shared/hooks/auth0Token";
interface DataType {
    id: number;
    description: string;
    date: string;
    amount: number;
    idCategory: number;
    idSubcategory: number;
    idCoin: number;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    field?: string;
    order?: string;
    filters?: Record<string, FilterValue | null>;
}

const categories = ["", "COMIDA", "GASTOS DE CASA"]; // TODO

const columns: ColumnsType<DataType> = [
    {
        title: "Id",
        dataIndex: "id",
        sorter: true,
        width: "20%",
        responsive: ["sm"],
    },
    {
        title: "Concept",
        dataIndex: "description",
        sorter: true,
        width: "40%",
    },
    {
        title: "Category",
        dataIndex: "idCategory",
        filters: [
            { text: "Comida", value: "1" },
            { text: "Gastos de Casa", value: "2" },
        ],
        render: value => categories[value],
        responsive: ["sm"],
        width: "20%",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        sorter: true,
        width: "20%",
    },
];

const getTableParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    field: params.field,
    order: params.order,
    ...params.filters,
});

const ExpenseList: React.FC = () => {
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [tableParamsJson, setTableParamsJson] = useState<string>(JSON.stringify(tableParams));
    const { token } = Auth0Token();

    const fetchData = () => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_LAMBDA_GET_EXPENSES}?${qs.stringify(getTableParams(tableParams))}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(response => {
                setData(response.Items);
                setLoading(false);
                const tempTableParams = {
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: response.Count
                    },
                };
                setTableParams(tempTableParams);
                setTableParamsJson(JSON.stringify(tempTableParams));
            });
    };

    // eslint-disable-next-line
    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [tableParamsJson, token]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>
    ) => {
        const tempTableParams = {
            pagination,
            filters
        };
        setTableParams(tempTableParams);
        setTableParamsJson(JSON.stringify(tempTableParams));

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <>
            <Row>
                <Col span={20}><Title style={{ margin: "0px", padding: "0px" }}>Expenses</Title></Col>
                <Col span={4} >
                    <Tooltip title="Reload Data"><Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        loading={loading}
                        onClick={() => fetchData()}
                        style={{ float: "right" }}
                    /></Tooltip></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        columns={columns}
                        rowKey={record => record.id}
                        dataSource={data}
                        pagination={tableParams.pagination}
                        loading={loading ? { indicator: <SpinnerIcon size={48} spin={true} /> } : false}
                        onChange={(pagination, filters) => handleTableChange(pagination, filters)}
                    />
                </Col>
            </Row>
        </>
    );
};

export default ExpenseList;