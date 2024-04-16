import {useState} from 'react'
import {PropTypes} from 'prop-types'


export default function InputArea(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleTitleChange(event) {
        const newValue = event.target.value;
        setTitle(newValue);
    }

    function handleDescriptionChange(event) {
        const newValue = event.target.value;
        setDescription(newValue);
    }

    function add() {
        props.addItem({title: title, description: description});
        setTitle("");
        setDescription("");
    }

    return (
        <div className="form">
            <input onChange={handleTitleChange} type="text" value={title} placeholder='Title'/>
            <textarea onChange={handleDescriptionChange} type="text" value={description} placeholder='Description' />
            <button onClick={add}>
                <span>Add</span>
            </button>
        </div>
    );
}

InputArea.propTypes = {
    addItem: PropTypes.func.isRequired,
}