import { useState } from 'react'
import ToDoItem from './ToDoItem'
import InputArea from './InputArea'
import {PropTypes} from 'prop-types'
import InputDisplay from './InputDisplay'

export default function List(props) {
    const title = props.toDoList.title;
    const items = props.toDoList.items;

    const [listTitle, setListTitle] = useState(title);
    function changeTitle(inputTitle) {
        setListTitle(inputTitle);
        // also need to do db save here
    }

    const [toDoItems, setToDoItems] = useState(items);
    function addItem(inputText) {
        setToDoItems(prevItems => {
            let newId = prevItems.length+1;
            return [...prevItems, {id: newId, title: inputText.title, description: inputText.description}];
        });
        // also need to do db save here
    }

    // function updateItem(id) {
    //     setToDoItems(prevItems => {
    //         let updateItem = prevItems.find(item => item.id == id);

    //     })
    // }

    function deleteItem(id) {
        setToDoItems(prevItems => {
            return prevItems.filter((item) => {
                return item.id !== id;
            });
        });
        // also need to do db save here
    }

    return (
        <div className="container">
            <div className="heading">
                <InputDisplay inputType='input' initialValue={listTitle} placeHolder='List Title' saveMethod={changeTitle}/>
            </div>
            <InputArea addItem={addItem} />
            <div>
                <ul>
                    {toDoItems.map((mappedTodoItem) => (
                        <ToDoItem
                            key={mappedTodoItem.id}
                            id={mappedTodoItem.id}
                            title={mappedTodoItem.title}
                            description={mappedTodoItem.description}
                            onChecked={deleteItem}
                            // updateItem={updateItem}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

List.propTypes = { 
    toDoList: PropTypes.object, 
}