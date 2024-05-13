import UserCard from '../components/UserCard';
import NavBar from '../components/nav/NavBar';
import AddFriendCard from '../components/AddFriendCard';
import SearchBar from '../components/search bar/SearchBar';
import { useActionData, useLoaderData, useSubmit } from 'react-router-dom';
import { useAuth } from '../utils/contexts';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export default function Friends() {
    const auth = useAuth();
    const friendData = useLoaderData();
    const actionData = useActionData();
    const submit = useSubmit();

    const friendsList = friendData.filter((record) => {
        return record.approved;
    })

    const requestsList = friendData.filter((record) => {
        return record.friendId === auth.user.id && !record.approved;
    })

    const requestedList = friendData.filter((record) => {
        return record.userId === auth.user.id && !record.approved;
    })

    const [friends, setFriends] = useState(friendsList);
    const [requests, setRequests] = useState(requestsList);
    const [requested, setRequested] = useState(requestedList);

    const [userSuggestionList, setUserSuggestionList] = useState([]);

    useEffect(() => {
        if (actionData) {
            if (actionData.success.list) {
                const list = actionData.success.list.filter(friend => {
                    for (let i = 0; i < friendData.length; i++) {
                        if (friend.id === friendData[i].id) {
                            return false;
                        }
                    }
                    return true;
                });
                setUserSuggestionList(list);
            } else if(actionData.success.friendRequest){
                const requestedList = friendData.filter((record) => {
                    return record.userId === auth.user.id && !record.approved;
                })
                setRequested(requestedList);
            } else if (actionData.success.approved) {
                const friends = friendData.filter((record) => {
                    return record.approved;
                })
                setFriends(friends);
            } else {
                console.log(actionData);
            }

        }
    }, [actionData, friendData]);
    


    function approve(requestId) {
        setRequests(previousItems => previousItems.filter(request => request.id !== requestId));
        submit(JSON.stringify({ action: "approve", requestId: requestId }), { method: 'POST', encType: "application/json" });
    }

    function deny(requestId) {
        setRequests(previousItems => previousItems.filter(request => request.id !== requestId));
        submit(JSON.stringify({ action: "deny", requestId: requestId }), { method: 'POST', encType: "application/json" });
    }

    function cancelRequest(requestId) {
        setRequested(previousItems => previousItems.filter(request => request.id !== requestId));
        submit(JSON.stringify({ action: "cancel", requestId: requestId}), { method: 'POST', encType: "application/json" });
    }

    const requestsActions = [{ actionTitle: "Approve", actionFunction: approve }, { actionTitle: "Deny", actionFunction: deny }];
    const requestedActions = [{ actionTitle: "Cancel", actionFunction: cancelRequest}];

    function handleSearch(searchInput) {
        submit(JSON.stringify({ action: "search", searchInput:  searchInput }), { method: 'POST', encType: "application/json" });
    }

    function handleSelection(userId) {
        let newRequestId = nanoid();
        submit(JSON.stringify({ action: "request", userId: userId, id: newRequestId }), { method: 'POST', encType: "application/json" });
    }

    return (
        <div>
            <NavBar loggedIn={true} />
            <h1>Friends</h1>
            <div>
                <h2>Add Friends</h2>
                <SearchBar searchFunction={handleSearch} userSelectionFunction={handleSelection} userSuggestionList={userSuggestionList} />
                <h3>Requests</h3>
                {requests.length < 1 ? <p>No friend requests</p> : requests.map((request) => {
                    return <AddFriendCard key={request.id} requestId={request.id} username={request.requestingUser} avatar={request.avatar} actions={requestsActions}/>;
                })}
                <h3>Requested</h3>
                {requested.length < 1 ? <p>No requestes</p> : requested.map((request) => {
                    return <AddFriendCard key={request.id} requestId={request.id} username={request.requestedUser} avatar={request.avatar} actions={requestedActions} />;
                })}
            </div>
            <hr></hr>
            <h2>My friends</h2>
            {friends.map((friend) => {
                if(friend.friendId === auth.user.id) {
                    return <UserCard key={friend.id} id={friend.userId} username={friend.requestingUser} avatar={friend.avatar} />;
                } else {
                    return <UserCard key={friend.id} id={friend.friendId} username={friend.requestedUser} avatar={friend.avatar} />;
                }
                
            })}
        </div>
    );
}