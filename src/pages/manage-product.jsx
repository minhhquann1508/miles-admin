import { useQuery } from "@tanstack/react-query";
import { Button } from "antd"
import { Space, Table, Avatar } from 'antd';
import { getListProduct } from "../apis/product";
import moment from "moment";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ManageProductPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1;

    const { isLoading, data: listData, isError } = useQuery({
        queryKey: ['product', page],
        queryFn: () => getListProduct({ page: page })
    });

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error fetching data</div>;

    else {
        const columns = [
            {
                title: 'Hình ảnh',
                dataIndex: 'thumbnail',
                render: (url) => (
                    <Avatar src={<img src={url} alt="thumbnail" />} />
                )
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'productName',
            },
            {
                title: 'Giá (VNĐ)',
                dataIndex: 'price',
            },
            {
                title: 'Thương hiệu',
                dataIndex: 'brand',
            },
            {
                title: 'Danh mục',
                dataIndex: 'categories',
                render: (categories) => (
                    <span>{categories.join(', ')}</span>
                )
            },
            {
                title: 'Người bán',
                dataIndex: 'owner',
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
            },
            {
                title: 'Chức năng',
                dataIndex: 'createdAt',
                render: (text, record) => (
                    <Space>
                        <Button>Sửa</Button>
                        <Button>Xóa</Button>
                    </Space>
                )
            },
        ];

        const data = listData.data.products.map(item => {
            return {
                key: item._id,
                thumbnail: item.thumbnail,
                productName: item.productName,
                price: item.price.toLocaleString(),
                brand: item.brand.name,
                categories: item.categories.map(category => category.name),
                owner: item.owner.fullname,
                createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
            }
        })

        return (
            <div>
                <div className="flex justify-end mb-5">
                    <Button>Thêm sản phẩm</Button>
                </div>
                <div>
                    <Table
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (e) => {
                                }
                            }
                        }}
                        pagination={{
                            pageSize: listData.data.itemsPerPage,
                            current: page,
                            total: listData.data.total,
                            onChange: (page) => {
                                navigate(`/manage-product?page=${page}`)
                            }
                        }}
                        columns={columns}
                        dataSource={data} size="middle"
                    />
                </div>
            </div>
        )
    }
}

export default ManageProductPage