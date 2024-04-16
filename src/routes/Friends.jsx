
import UserCard from '../components/UserCard';
import { useLoaderData } from 'react-router-dom';

export default function Friends() {
    let friends = useLoaderData();

    return (
        <div>
            <h1>My Friends</h1>
            {friends.map((friend) => {
                return <UserCard key={friend.id} id={friend.id} userName={friend.userName} avatar={friend.avatar}/>;
            })}
        </div>
    );
}