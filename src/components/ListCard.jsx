import { Link, } from "react-router-dom"
import { PropTypes } from 'prop-types'

export default function ListCard(props) {
    const {id, title, description } = props.toDoList;

    return (
        <Link to={`${id}`} className="listCard">
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    )
}

ListCard.propTypes = {
    toDoList: PropTypes.object,
}