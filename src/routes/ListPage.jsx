import List from '../components/List'
import { useLoaderData } from 'react-router-dom'
import ToolBar from '../components/list toolbar/ToolBar'
import NavBar from '../components/nav/NavBar';

export default function ListPage() {
    const list = useLoaderData();
    
    return (
        <div>
            <NavBar/>
            <ToolBar />
            <List toDoList={list} />
        </div>
    )
}