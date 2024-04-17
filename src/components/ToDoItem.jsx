import { PropTypes } from 'prop-types'
import InputDisplay from './InputDisplay';

export default function ToDoItem(props) {
    const {id, title, description, updateItem} = props;
    function handleTitleChange(val) {
        updateItem({id: id, title: val, description: description});
    }
    function handleDescriptionChange(val) {
        updateItem({ id: id, title: title, description: val });
    }
    return (

        <div>
            <li>
                <InputDisplay inputType='input' initialValue={title} placeHolder='Title' saveMethod={handleTitleChange} />
                <InputDisplay inputType='textArea' initialValue={description} placeHolder='Description' saveMethod={handleDescriptionChange} />
            </li>
        </div>

    );
}

ToDoItem.propTypes = {
    updateItem: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}