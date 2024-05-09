
import UserCard from '../components/UserCard';
import NavBar from '../components/nav/NavBar';
import AddFriendCard from '../components/AddFriendCard';
import { useLoaderData, useSubmit } from 'react-router-dom';
import { useAuth } from '../utils/contexts';
import { useState } from 'react';

export default function Friends() {
    const auth = useAuth();
    const friendData = useLoaderData();
    const submit = useSubmit();

    const friends = friendData.filter((record) => {
        return record.userId === auth.user.id && record.approved;
    })

    const requestsList = friendData.filter((record) => {
        return record.friendId === auth.user.id && !record.approved;
    })

    const requestedList = friendData.filter((record) => {
        return record.userId === auth.user.id && !record.approved;
    })

    const [requests, setRequests] = useState(requestsList);
    const [requested, setRequested] = useState(requestedList);


    function approve(requestId) {
        console.log(`Approved: ` + requestId);
        // setRequests(previousItems => previousItems.filter(request => request.id !== requestId));
        submit(JSON.stringify({ action: "approve", requestId: requestId }), { method: 'POST', encType: "application/json" });
    }

    function deny(requestId) {
        console.log(`Denied: ` + requestId);
        // setRequests(previousItems => previousItems.filter(request => request.id !== requestId));
        submit(JSON.stringify({ action: "deny", requestId: requestId }), { method: 'POST', encType: "application/json" });
    }

    function cancelRequest(requestId) {
        console.log(`Cancel request: ` + requestId);
        // setRequested(previousItems => previousItems.filter(request => request.id !== requestId));
        submit(JSON.stringify({ action: "cancel", requestId: requestId}), { method: 'POST', encType: "application/json" });
    }

    const requestsActions = [{ actionTitle: "Approve", actionFunction: approve }, { actionTitle: "Deny", actionFunction: deny }];
    const requestedActions = [{ actionTitle: "Cancel", actionFunction: cancelRequest}];

    return (
        <div>
            <NavBar loggedIn={true} />
            <h1>Friends</h1>
            <div>
                <h2>Add Friends</h2>
                <h3>Requests</h3>
                {requests.length < 1 ? <p>No friend requests</p> : requests.map((request) => {
                    return <AddFriendCard key={request.id} requestId={request.id} username={request.requestingUser} avatar={request.avatar} actions={requestsActions}/>;
                })}
                <h3>Requested</h3>
                {requested.length < 1 ? <p>No friends requested</p> : requested.map((request) => {
                    return <AddFriendCard key={request.id} requestId={request.id} username={request.requestedUser} avatar={request.avatar} actions={requestedActions} />;
                })}
            </div>
            <hr></hr>
            <h2>My friends</h2>
            {friends.map((friend) => {
                return <UserCard key={friend.id} id={friend.friendId} username={friend.requestedUser} avatar={friend.avatar}/>;
            })}
        </div>
    );
}