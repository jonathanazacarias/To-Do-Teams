
import UserCard from '../components/UserCard';
import NavBar from '../components/nav/NavBar';
import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../utils/contexts';

export default function Friends() {
    const auth = useAuth();
    const friendData = useLoaderData();

    const friends = friendData.filter((record) => {
        return record.userId === auth.user.id && record.approved;
    })

    const requests = friendData.filter((record) => {
        return record.friendId === auth.user.id && !record.approved;
    })

    const requested = friendData.filter((record) => {
        return record.userId === auth.user.id && !record.approved;
    })

    // approved: true
    // friendId: 20
    // id: "ab"
    // requestedUser: "Jon"
    // requestingUser: "Tina"
    // userId: 23

    return (
        <div>
            <NavBar loggedIn={true} />
            <h1>Friends</h1>
            <h2>Add Friends</h2>
            <h3>Requests</h3>
            {requests.map((friend) => {
                return <UserCard key={friend.id} id={friend.friendId} username={friend.requestingUser} avatar={friend.avatar} />;
            })}
            <h3>Requested</h3>
            {requested.map((friend) => {
                return <UserCard key={friend.id} id={friend.friendId} username={friend.requestedUser} avatar={friend.avatar} />;
            })}
            <h2>My friends</h2>
            {friends.map((friend) => {
                return <UserCard key={friend.id} id={friend.friendId} username={friend.requestedUser} avatar={friend.avatar}/>;
            })}
        </div>
    );
}