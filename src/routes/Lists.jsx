
import ListCard from '../components/ListCard';
import NavBar from '../components/nav/NavBar';
import { useLoaderData, useSubmit, } from 'react-router-dom';
import { nanoid } from 'nanoid'
import { useAuth } from '../utils/contexts';

export default function Lists() {
    let toDoLists = useLoaderData();
    let submit = useSubmit();
    const auth = useAuth();

    function createNewList() {
        let currentTime = new Date().toISOString();
        let newId = nanoid();
        let newList = {
            id: newId,
            title: "NEW LIST",
            description: auth.user.username+"'s new list.",
            items: null,
            owner: auth.user,
            contributers: null,
            created: currentTime,
            modified: currentTime,
            modifiedBy: auth.user,
        }

        submit(JSON.stringify(newList), { method: 'POST', encType: "application/json" });
    }

    function deleteList(listId) {
        submit(JSON.stringify({id: listId}), { method: 'DELETE', encType: "application/json" });
    }

    return (
        <div>
            <NavBar />
            <h1>{auth.user.username}&apos;s Lists</h1>
            <button onClick={createNewList}>New List</button>
            {toDoLists.map((list) => {
                return <ListCard toDoList={list} key={list.id} deleteFunction={deleteList}/>
            })}
        </div>
    );
}