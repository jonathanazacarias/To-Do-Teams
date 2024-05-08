import { useState } from 'react'
import ToDoItem from './ToDoItem'
import InputArea from './InputArea'
import { PropTypes } from 'prop-types'
import InputDisplay from './InputDisplay'
import { useActionData, useSubmit } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useAuth } from '../utils/contexts'

export default function List(props) {
    const actionData = useActionData();
    const auth = useAuth();
    const submit = useSubmit();

    const { id, list_owner_id: listOwnerId, title, description, created_date: created, items } = props.toDoList;

    
    const [toDoItems, setToDoItems] = useState(items);
    const [listTitle, setListTitle] = useState(title);
    const [listDescription, setListDescription] = useState(description);

    if(actionData) {
        console.log(actionData);
    }

    function updateServer(updateContent) {
        let newTitle = listTitle;
        let newItems = toDoItems;
        let newDescription = listDescription;
        let time = new Date();
        let currentTime = time.toISOString();

        // check what content in the list is being updated
        // if the updated content is a edited list item
        if (updateContent.newItemList) {
            newItems = updateContent.newItemList;
        }
        // if the updated content is the list title
        if (updateContent.newListTitle) {
            newTitle = updateContent.newListTitle;
        }

        // if the updated content is a new list description
        if (updateContent.newListDescription) {
            newDescription = updateContent.newListDescription;
        }

        // if the updated content is a new list item
        if (updateContent.newListItem) {
            newItems = [...newItems, updateContent.newListItem];

        }

        let updatedList = {
            id: id,
            owner: listOwnerId,
            title: newTitle,
            description: newDescription,
            items: newItems,
            created: created,
            modified: currentTime,
            modifiedBy: auth.user.id,
        };

        submit(JSON.stringify(updatedList), { method: 'POST', encType: "application/json" });
    }

    
    function changeTitle(inputTitle) {
        setListTitle(inputTitle);
        updateServer({ newListTitle: inputTitle });
    }

    
    function changeDescription(inputDescription) {
        setListDescription(inputDescription);
        updateServer({ newListDescription: inputDescription });
    }

    
    function addItem(inputText) {
        setToDoItems(prevItems => {
            let newId = nanoid();
            let newItem = { id: newId, listId: id, title: inputText.title, description: inputText.description };
            updateServer({ newListItem: newItem });
            return [...prevItems, newItem];
        });

    }

    function updateItem(item) {
        // id of the item to be updated so we can find it in the list
        const itemId = item.id;

        setToDoItems(prevItems => {
            // find the list item to update
            const updateItemIndex = prevItems.findIndex(item => item.id === itemId);

            // get the list items that are before the list item that is being updated
            const beginningOfList = prevItems.slice(0, updateItemIndex);

            // get the list items that are after the list item that is being updated
            const endOfList = prevItems.slice(updateItemIndex + 1);

            // insert the items at front, new list, and items at back to a new list of items
            const newList = [...beginningOfList, item, ...endOfList];

            updateServer({ newItemList: newList })

            return newList;
        });
    }

    function deleteItem(itemId) {
        setToDoItems( prevItems => {
            // find the list item to delete
            const deleteItemIndex = prevItems.findIndex(item => item.id === itemId);

            // get the list items that are before the list item that is being updated
            const beginningOfList = prevItems.slice(0, deleteItemIndex);

            // get the list items that are after the list item that is being updated
            const endOfList = prevItems.slice(deleteItemIndex + 1);

            // create a new list that does not have the deleted item in it
            const newList = [...beginningOfList, ...endOfList];
            
            return newList;
        });
        submit(JSON.stringify({listId: id, itemId: itemId}), { method: 'DELETE', encType: "application/json" });
    }

    return (
        <div className="container">
            <div className="heading">
                <InputDisplay inputType='input' initialValue={listTitle} placeHolder='List Title' saveMethod={changeTitle} />
                <InputDisplay inputType='textArea' initialValue={listDescription} placeHolder='List Description' saveMethod={changeDescription} />
            </div>

            <div>
                <ul>
                    {toDoItems.map((mappedTodoItem) => (
                        <ToDoItem
                            key={mappedTodoItem.id}
                            id={mappedTodoItem.id}
                            listId={mappedTodoItem.listId}
                            title={mappedTodoItem.title}
                            description={mappedTodoItem.description}
                            updateItem={updateItem}
                            deleteItem={deleteItem}
                        />
                    ))}
                </ul>
            </div>
            <InputArea addItem={addItem} />
        </div>
    );
}

List.propTypes = {
    toDoList: PropTypes.object,
}