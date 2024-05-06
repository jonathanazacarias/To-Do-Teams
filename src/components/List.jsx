import { useState } from 'react'
import ToDoItem from './ToDoItem'
import InputArea from './InputArea'
import { PropTypes } from 'prop-types'
import InputDisplay from './InputDisplay'
import { useSubmit } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useAuth } from '../utils/contexts'

export default function List(props) {

    const auth = useAuth();

    const { id, list_owner_id: listOwnerId, title, description, created_date: created, items } = props.toDoList;

    const submit = useSubmit();
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

        submit(JSON.stringify(updatedList), { method: 'post', encType: "application/json" });
    }

    const [listTitle, setListTitle] = useState(title);
    function changeTitle(inputTitle) {
        setListTitle(inputTitle);
        updateServer({ newListTitle: inputTitle });
    }

    const [listDescription, setListDescription] = useState(description);
    function changeDescription(inputDescription) {
        setListDescription(inputDescription);
        updateServer({ newListDescription: inputDescription });
    }

    const [toDoItems, setToDoItems] = useState(items);
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
            let updateItemIndex = prevItems.findIndex(item => item.id === itemId);

            // get the list items that are before the list item that is being updated
            let beginningOfList = prevItems.slice(0, updateItemIndex);

            // get the list items that are after the list item that is being updated
            let endOfList = prevItems.slice(updateItemIndex + 1);

            // insert the items at front, new list, and items at back to a new list of items
            let newList = [...beginningOfList, item, ...endOfList];

            updateServer({ newItemList: newList })

            return newList;
        });
    }

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
                            onChecked={deleteItem}
                            updateItem={updateItem}
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