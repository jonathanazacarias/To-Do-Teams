
import ListCard from '../components/ListCard';
import NavBar from '../components/nav/NavBar';
import { useLoaderData, useSubmit, } from 'react-router-dom';
import { nanoid } from 'nanoid'

export default function Lists() {
    let toDoLists = useLoaderData();
    let submit = useSubmit();

    function createNewList() {
        let currentTime = new Date().toISOString();
        let newId = nanoid();
        let newList = {
            id: newId,
            title: "",
            description: "",
            items: [],
            owner: { userId: "123456", userName: "current user", avatar: "" },
            contributers: [],
            created: currentTime,
            modified: currentTime,
            modifiedBy: { userId: "123456", userName: "current user", avatar: "" },
        }

        submit(JSON.stringify(newList), { method: 'post', encType: "application/json" });
    }

    return (
        <div>
            <NavBar loggedIn={true} />
            <h1>My Lists</h1>
            <button onClick={createNewList}>New List</button>
            {toDoLists.map((list) => {
                
                return <ListCard toDoList={list} key={list.id} />
            })}
        </div>
    );
}