import { User } from '@prisma/client';
interface Messages {
    sender: string;
    authorId: string;
    text: string;
}

interface Props {
    currentUser: User | null;
    messages: Messages[];
}
export const MessagesContainer = ({ messages, currentUser }: Props) => {
    return (
        <ul className=' flex-1  overflow-y-scroll'>
            {messages.map((ms, i) =>
                ms.authorId === currentUser?.id ? (
                    <li
                        className={`flex flex-col  ${
                            ms.authorId === currentUser?.id
                                ? 'text-left text-red-400'
                                : 'text-right'
                        }`}
                        key={i}>
                        <span>{ms.sender}</span>
                        <span className='p-2 bg-zinc-300 rounded-md '>
                            {ms.text}
                        </span>
                    </li>
                ) : (
                    <div key={i}>
                        <li>{ms.authorId}</li>
                        <li>{ms.text}</li>
                    </div>
                )
            )}
        </ul>
    );
};
