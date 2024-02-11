'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export const AddFriend = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/user/addFriend', {
            method: 'POST',
            body: JSON.stringify(phoneNumber),
            headers: { 'content-type': 'application/json' },
        });
        if (res.ok) {
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='p-2 rounded-md outline-none'
                type='text'
                placeholder='Friend Phone Number'
                onChange={(e) => {
                    setPhoneNumber(e.target.value);
                }}
            />
        </form>
    );
};
