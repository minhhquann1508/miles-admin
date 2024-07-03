import React, { useEffect } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
} from 'antd';
const { RangePicker } = DatePicker;

const UpdateUserForm = ({ data }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                _id: data.key,
                fullname: data.fullname,
                email: data.email,
                role: data.role,
            });
        }
    }, [data]);

    return (
        <Form
            form={form}
            variant="filled"
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item
                label="Id người dùng"
                name="_id"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input disabled={true} />
            </Form.Item>

            <Form.Item
                label="Họ tên"
                name="fullname"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input disabled={true} />
            </Form.Item>

            <Form.Item
                label="Chức vụ"
                name="role"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input disabled={true} />
            </Form.Item>

            {/* <Form.Item
                label="InputNumber"
                name="InputNumber"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                label="TextArea"
                name="TextArea"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Mentions"
                name="Mentions"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Mentions />
            </Form.Item>

            <Form.Item
                label="Select"
                name="Select"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Select />
            </Form.Item>

            <Form.Item
                label="Cascader"
                name="Cascader"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Cascader />
            </Form.Item>

            <Form.Item
                label="TreeSelect"
                name="TreeSelect"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <TreeSelect />
            </Form.Item>

            <Form.Item
                label="DatePicker"
                name="DatePicker"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label="RangePicker"
                name="RangePicker"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <RangePicker />
            </Form.Item> */}

            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit">
                    Chỉnh sửa
                </Button>
            </Form.Item>
        </Form>
    );
};
export default UpdateUserForm;