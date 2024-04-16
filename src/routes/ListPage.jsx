import List from '../components/List'
import { useLoaderData } from 'react-router-dom'
import ToolBar from '../components/list toolbar/ToolBar'

export default function ListPage() {
    const list = useLoaderData();
    
    return (
        <div>
            <ToolBar />
            <List toDoList={list} />
        </div>
    )
}