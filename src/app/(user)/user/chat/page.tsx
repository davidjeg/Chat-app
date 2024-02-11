import { AddFriend } from '@/app/components/AddFriend';
import { getCurrentUser } from '@/app/utils/getCurrentUser';
import { MainContainer } from '@/app/components/MainContainer';
const getChat = async () => {
    const res = await fetch('http://localhost:3000/api/user/getFriend', {
        method: 'GET',
        cache: 'no-cache',
    });
    return res.json();
};

const page = async () => {
    const friends = await getChat();
    const currentUser = await getCurrentUser();
    return (
        <div className=' bg-purple-300 px-4 py-4 w-screen h-screen'>
            <div className='w-full bg-zinc-100 h-full  max-h-full rounded-md'>
                <MainContainer currentUser={currentUser} friends={friends} />
            </div>
        </div>
    );
};

export default page;
