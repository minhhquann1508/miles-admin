import React, { useEffect } from 'react'
import LoginForm from '../components/login-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <div className='flex items-center h-svh'>
            <main className='flex items-center w-full h-full p-32 gap-20'>
                <div className='w-[60%] text-center'>
                    <h1 className='mb-3 text-[28px] uppercase font-extrabold'>Chào mừng đến với trang quản trị của Miles !</h1>
                    <p className='mb-3 text-[24px]'>Hãy đăng nhập để tiếp tục vào trang quản trị</p>
                </div>
                <div className='flex-grow flex flex-col justify-center'>
                    <h1 className='text-center mb-5 text-3xl uppercase font-extrabold'>Đăng nhập</h1>
                    <LoginForm />
                </div>
            </main>
        </div>

    )
}

export default LoginPage