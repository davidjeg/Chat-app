'use client';

import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
    isVisible: boolean;
    setIsVisibile: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | null;
}
export const ImageChange = ({
    isVisible,
    setIsVisibile,
    currentUser,
}: Props) => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: currentUser?.name ? currentUser.name : '',
        info: currentUser?.info ? currentUser.info : '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => {
            return { ...prev, [name]: value };
        });
    };
    useEffect(() => {}, []);

    const handleNickChange = async () => {
        const res = await fetch('http://localhost:3000/api/user/settings', {
            method: 'PATCH',
            body: JSON.stringify(form),
            headers: { 'content-type': 'application/json' },
        });

        if (res.ok) {
            router.refresh();
        }
    };

    return (
        <div
            className={`absolute w-full h-full top-0 left-0  transition p-4 bg-zinc-100 ${
                isVisible
                    ? 'opacity-1  translate-x-0'
                    : 'opacity-0 -translate-x-20 pointer-events-none'
            }`}>
            <button onClick={() => setIsVisibile(false)}>
                <FaArrowLeft />
            </button>
            <div className='flex justify-center  flex-col items-center gap-4'>
                <button>
                    <FaUserCircle size={200} />
                </button>
                <div className='flex flex-col'>
                    <span>Nick.</span>
                    <div className='flex gap-4'>
                        <input
                            name='name'
                            onChange={handleChange}
                            value={form.name}
                            type='text'
                            placeholder={``}
                            className='p-2 outline-none rounded-md'
                        />
                        <button
                            className='outline-none bg-blue-500 p-2 text-zinc-200 rounded-md'
                            onClick={handleNickChange}>
                            save
                        </button>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span>Info.</span>
                    <div className='flex gap-4'>
                        <input
                            name='info'
                            onChange={handleChange}
                            value={form.info}
                            type='text'
                            placeholder={``}
                            className='p-2 outline-none rounded-md'
                        />
                        <button
                            className='outline-none bg-blue-500 p-2 text-zinc-200 rounded-md'
                            onClick={handleNickChange}>
                            save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
