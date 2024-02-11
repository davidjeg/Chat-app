'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const Login = () => {
    const [form, setForm] = useState({ phone: '', password: '', email: '' });
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn('credentials', { ...form }).then((e) =>
            router.push('/user/chat')
        );
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setForm({ ...form, [name]: value });
    };

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <div className='flex flex-col w-full max-w-xl gap-8'>
                <h2 className='text-2xl text-center'>Login</h2>
                <form onSubmit={handleLogin} className='  flex flex-col gap-4 '>
                    <input
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        className='border outline-none rounded-sm p-2 focus:ring transition focus:ring-blue-500'
                        type='email'
                        placeholder='email'
                    />
                    <input
                        name='phone'
                        value={form.phone}
                        onChange={handleChange}
                        className='border outline-none rounded-sm p-2 focus:ring transition focus:ring-blue-500'
                        type='text'
                        placeholder='Phone Number'
                    />
                    <input
                        name='password'
                        value={form.password}
                        type='password'
                        onChange={handleChange}
                        placeholder='Password'
                        className='border outline-none rounded-sm p-2 focus:ring transition focus:ring-blue-500'
                    />
                    <button
                        type='submit'
                        className='bg-purple-500 text-zinc-100 p-2 rounded-md'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
