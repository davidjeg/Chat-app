'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { 'content-type': 'application/json' },
        });

        if (res.ok) {
            router.push('user/chat');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        console.log(name, value);

        setForm({ ...form, [name]: value });
    };
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <div className='flex flex-col w-full max-w-xl gap-8'>
                <h2 className='text-2xl text-center'>Register</h2>
                <form
                    onSubmit={handleRegister}
                    className='  flex flex-col gap-4 '>
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
                        onChange={handleChange}
                        type='password'
                        placeholder='Password'
                        className='border outline-none rounded-sm p-2 focus:ring transition focus:ring-blue-500'
                    />
                    <input
                        name='confirmPassword'
                        value={form.confirmPassword}
                        onChange={handleChange}
                        type='password'
                        placeholder='Confirm Password'
                        className='border outline-none rounded-sm p-2 focus:ring transition focus:ring-blue-500'
                    />
                    <button
                        type='submit'
                        className='bg-purple-500 text-zinc-100 p-2 rounded-md'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
