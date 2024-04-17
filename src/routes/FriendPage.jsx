import { useLoaderData } from "react-router-dom"

export default function FriendPage() {
    const friend = useLoaderData();

    return (
        <div>
            <h1>{friend.userName}</h1>
        </div>
    )
}