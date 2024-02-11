import React from 'react';

interface Props {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const SendMessage = ({ message, setMessage, sendMessage }: Props) => {
    return (
        <div className='bg-zinc-200 p-4'>
            <form className='flex gap-4' onSubmit={sendMessage}>
                <input
                    name='message'
                    className='p-2 rounded-md outline-none w-full border focus:ring focus:ring-blue-500 transition '
                    value={message}
                    type='text'
                    placeholder='message'
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <button
                    type='submit'
                    className='bg-blue-500 p-2 rounded-md text-zinc-200'>
                    Send
                </button>
            </form>
        </div>
    );
};
