'use client';
import { Friend, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { ImageChange } from './ImageChange';

import { Socket, io } from 'socket.io-client';
import { Search } from './Search';
import { Navbar } from './Navbar';
import { SendMessage } from './SendMessage';
import { FriendList } from './FriendList';
import { MessagesContainer } from './MessagesContainer';

interface Props {
    friends: { friends: Friend[] };
    currentUser: User | null;
}
interface Messages {
    sender: string;
    text: string;
}
export const MainContainer = ({ friends, currentUser }: Props) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Messages[]>([]);
    const [isImageMenuVisible, setIsImageMenuVisible] =
        useState<boolean>(false);
    const [room, setRoom] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [sender, setSender] = useState<string>('');
    const [friend, setFriend] = useState<string>('');
    useEffect(() => {
        const newSocket = io('http://localhost:3001/');
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket?.emit('login', currentUser.id);
        }
    }, [currentUser, socket]);

    useEffect(() => {
        socket?.on('messageResponse', (data) => {
            setMessages([...messages, data]);
        });
    }, [socket, messages]);
    console.log(messages);

    useEffect(() => {
        if (currentUser?.id) {
            setSender(currentUser?.id);
        }
    }, [currentUser?.id]);

    const createRoom = (room: string) => {
        setRoom(room);
        socket?.emit('joinRoom', room);
        socket?.on('loadMessages', (ms) => {
            setMessages(ms);
        });
        setFriend(room);
    };

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket?.emit('message', {
            text: message,
            sender,
            socket: socket.id,
        });

        setMessage('');
    };

    return (
        <div className='flex  rounded-md h-full gap-2'>
            <div className='flex-0 w-full max-w-md relative gap-4 flex flex-col'>
                <Navbar currentUser={currentUser}>
                    <button onClick={() => setIsImageMenuVisible(true)}>
                        <FaRegUserCircle size='32' />
                    </button>
                </Navbar>
                <ImageChange
                    currentUser={currentUser}
                    isVisible={isImageMenuVisible}
                    setIsVisibile={setIsImageMenuVisible}
                />

                <Search />
                <div>
                    <h3 className='text-2xl font-semibold px-4 py-4'>Chats</h3>
                    <FriendList createRoom={createRoom} friends={friends} />
                </div>
            </div>
            <div className='flex-1  border  flex flex-col rounded-md'>
                <div className='flex gap-4 items-center p-2 shadow-md'>
                    <FaRegUserCircle size='32' />
                    <span>{friend}</span>
                </div>
                <MessagesContainer
                    currentUser={currentUser}
                    messages={messages}
                />

                <SendMessage
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};
