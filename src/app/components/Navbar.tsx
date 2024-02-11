'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect, useRef, Children } from 'react';
import { User } from '@prisma/client';
import { FaRegUserCircle } from 'react-icons/fa';
import { VscKebabVertical } from 'react-icons/vsc';

interface Props {
    currentUser: User | null;
    children: React.ReactElement;
}

let socket;
export const Navbar = ({ currentUser, children }: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isSettingsMenuVisible, setIsSeetingsMenuVisite] =
        useState<boolean>(false);
    const dropDownRef = useRef<null | HTMLUListElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(e.target as Node)
            ) {
                setIsVisible(false);
            }
        };
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='p-2 flex  items-center justify-between shadow-md'>
            <div className='flex gap-2 items-center'>
                {children}
                <span>
                    {currentUser?.name ? currentUser.name : currentUser?.phone}
                </span>
            </div>
            <div className='relative '>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className='flex items-center'>
                    <VscKebabVertical size='18' />
                </button>
                <ul
                    ref={dropDownRef}
                    className={`${
                        isVisible ? 'opacity-1' : 'opacity-0'
                    } absolute bg-zinc-200 rounded-md p-4 right-0 transition mt-4`}>
                    <li>SignOut</li>
                </ul>
            </div>
        </nav>
    );
};
