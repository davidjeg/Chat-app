import { Friend } from '@prisma/client';
import { FaRegUserCircle } from 'react-icons/fa';
interface Props {
    friends: { friends: Friend[] };
    createRoom: (phone: string) => void;
}
export const FriendList = ({ friends, createRoom }: Props) => {
    return (
        <ul className='flex flex-col gap-2  '>
            {friends.friends.map((el) => (
                <li
                    className='cursor-pointer   hover:bg-zinc-700 hover:text-zinc-200 transition flex items-center gap-4  shadow-md p-4'
                    key={el.id}
                    onClick={() => createRoom(el.phone)}>
                    <FaRegUserCircle size='32' />
                    <span>{el.phone}</span>
                </li>
            ))}
        </ul>
    );
};
