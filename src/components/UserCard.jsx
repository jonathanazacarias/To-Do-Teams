import {PropTypes} from 'prop-types'
import {Link} from 'react-router-dom'
export default function UserCard(props) {
    const {id, userName, avatar} = props;

    return (
        <Link to={`${id}`} className="listCard">
            <h2>{userName}</h2>
            <p>{avatar}</p>
        </Link>
    )

}

UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}