import { useQuery } from "@tanstack/react-query";
import { Button } from "antd"
import { Space, Table, Avatar } from 'antd';
import { getListProduct } from "../apis/product";
import moment from "moment";

function ManageProductPage() {
    const { isLoading, data: listData, isError } = useQuery({
        queryKey: ['product'],
        queryFn: () => getListProduct({ page: 1 })
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
                <Table
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (e) => {
                            }
                        }
                    }}
                    columns={columns}
                    dataSource={data} size="middle"
                />
            </div>
        )
    }
}

export default ManageProductPage