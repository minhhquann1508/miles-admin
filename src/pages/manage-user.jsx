import { Button, Modal } from "antd"
import { Space, Table, Avatar } from 'antd';
import { getListUsers } from "../apis/user";
import moment from "moment";
import { useState } from "react";
import UpdateUserForm from "../components/update-user-form";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import FormAddUser from "../components/form-add-user";

function ManageUser() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1;

    //Mở modal chỉnh sửa người dùng
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateFormData, setIsUpdateFormData] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Các option để mở và đóng model update
    const showUpdateModal = (record) => {
        setIsUpdateFormData(record);
        setIsModalOpen(true);
    }
    const handleUpdateFormOk = () => {
        setIsModalOpen(false);
    };
    const handleUpdateFormCancel = () => {
        setIsModalOpen(false);
    };

    // Các option để mở và đóng model add
    const showAddModal = (record) => {
        setIsAddModalOpen(true);
    }
    const handleAddFormOk = () => {
        setIsAddModalOpen(false);
    };
    const handleAddFormCancel = () => {
        setIsAddModalOpen(false);
    };

    const fetchListUsers = async (params) => {
        const res = await getListUsers(params);

        return res.data;
    };

    const { isLoading, data: listData, isError } = useQuery({
        queryKey: ['users', page],
        queryFn: () => fetchListUsers({ page: page })
    });

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
                        <Button onClick={() => showUpdateModal(record)}>Sửa</Button>
                        <Button>Xóa</Button>
                    </Space>
                )
            },
        ];

        let data = listData?.users.map(item => {
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
                    <Button onClick={showAddModal}>Thêm người dùng</Button>
                </div>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    size="middle"
                    pagination={{
                        pageSize: listData?.itemsPerPage,
                        current: page,
                        total: listData?.total,
                        onChange: (page) => {
                            navigate(`/manage-user?page=${page}`)
                        }
                    }}
                />
                <Modal footer={false} title="Chỉnh sửa thông tin người dùng" open={isModalOpen} onOk={handleUpdateFormOk} onCancel={handleUpdateFormCancel}>
                    <UpdateUserForm data={isUpdateFormData} />
                </Modal>
                <Modal footer={false} title="Thêm tài khoản" open={isAddModalOpen} onOk={handleAddFormOk} onCancel={handleAddFormCancel}>
                    <FormAddUser />
                </Modal>
            </div>
        )
    }
}

export default ManageUser