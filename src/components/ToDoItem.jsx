import { PropTypes } from 'prop-types'
import InputDisplay from './InputDisplay';

export default function ToDoItem(props) {
    const {id, title, description, updateItem} = props;
    function handleChange() {
        updateItem({id: id, title: title, description: description});
    }
    return (

        <div>
            <li>
                <InputDisplay inputType='input' initialValue={title} placeHolder='Title' saveMethod={handleChange} />
                <InputDisplay inputType='textArea' initialValue={description} placeHolder='Description' saveMethod={handleChange} />
            </li>
        </div>

    );
}

ToDoItem.propTypes = {
    updateItem: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}