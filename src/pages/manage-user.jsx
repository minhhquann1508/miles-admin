import { Button, Modal } from "antd"
import { Space, Table, Avatar } from 'antd';
import { getListUsers } from "../apis/user";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import UpdateUserForm from "../components/update-user-form";

function ManageUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateFormData, setIsUpdateFormData] = useState(null);

    // Các option để mở và đóng model
    const showModal = (record) => {
        setIsUpdateFormData(record);
        setIsModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchListUsers = async () => {
        const res = await getListUsers();

        return res.data;
    };

    const { isLoading, data: listData, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchListUsers
    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error fetching data</p>
    }

    else {
        const columns = [
            {
                title: 'Avatar',
                dataIndex: 'avatar',
                render: (url) => (
                    <Avatar src={<img src={url} alt="avatar" />} />
                )
            },
            {
                title: 'Họ tên',
                dataIndex: 'fullname',
            },
            {
                title: 'Email',
                dataIndex: 'email',
            },
            {
                title: 'Ngày tạo tài khoản',
                dataIndex: 'createdAt',
                render: (content) => (
                    <span>{moment(content).format('DD/MM/YYYY')}</span>
                )
            },
            {
                title: 'Vai trò',
                dataIndex: 'role',
            },
            {
                title: 'Tùy chọn',
                dataIndex: 'option',
                render: (mess, record) => (
                    <Space>
                        <Button onClick={() => showModal(record)}>Sửa</Button>
                        <Button>Xóa</Button>
                    </Space>
                )
            },
        ];

        let data = listData.users.map(item => {
            return {
                key: item._id,
                avatar: item.avatar,
                fullname: item.fullname,
                email: item.email,
                role: item.role,
                createdAt: item.createdAt,
            }
        })

        return (
            <div>
                <div className="flex justify-end mb-5">
                    <Button>Thêm người dùng</Button>
                </div>
                <Table columns={columns} dataSource={data} size="middle" />
                <Modal footer={false} title="Chỉnh sửa thông tin người dùng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <UpdateUserForm data={isUpdateFormData} />
                </Modal>
            </div>
        )
    }
}

export default ManageUser