
import ListCard from '../components/ListCard';
import { useLoaderData } from 'react-router-dom';

export default function Lists() {
    let toDoLists = useLoaderData();

    return (
        <div>
            <h1>My Lists</h1>
            {toDoLists.map((list) => {
                return <ListCard toDoList={list} key={list.id} />
            })}
        </div>
    );
}