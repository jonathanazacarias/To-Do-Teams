import { Link, } from "react-router-dom"
import { PropTypes } from 'prop-types'

export default function ListCard(props) {
    const { id, title, description } = props.toDoList;
    const deleteList = props.deleteFunction;

    function handleDelete() {
        deleteList(id);
    }

    return (
        <div>
            <Link to={`${id}`} className="listCard">
                <h2>{title}</h2>
                <p>{description}</p>
            </Link>
            <button onClick={handleDelete}>Delete</button>
        </div>

    )
}

ListCard.propTypes = {
    toDoList: PropTypes.object,
    deleteFunction: PropTypes.func
}