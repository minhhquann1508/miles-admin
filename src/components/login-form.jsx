import { Button, Form, Input, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/slice/authSlice';
import { signInApi } from '../apis/user';
import { useEffect } from 'react';

function LoginForm() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isLoading, error } = useSelector((state) => state.auth);

    const onFinish = async (values) => {
        try {
            dispatch(signInStart());

            const res = await signInApi(values);

            if (res.data.success === false) {
                dispatch(signInFailure(res.data));
                return;
            } else {
                if (res.data?.user?.role === 'admin') {
                    dispatch(signInSuccess(res.data));
                    navigate('/dashboard');
                } else {
                    notification.warning({
                        message: 'Bạn không có quyền truy cập',
                        description: 'Vui lòng liên hệ với quản trị viên để đăng nhập',
                        duration: 1,
                    })
                    return;
                }
            }
        } catch (error) {
            dispatch(signInFailure(error));
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (error) {
            notification.error({
                message: 'Đăng nhập không thành công',
                description: error,
                duration: 1,
            })
        }
    }, [error])

    return (
        <Form
            name="basic"
            layout='vertical'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập email!',
                    },
                ]}
            >
                <Input size='large' />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                ]}
            >
                <Input.Password size='large' />
            </Form.Item>
            <Form.Item style={{ width: '100%' }}>
                <Button size='large' className='w-full font-bold' type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm