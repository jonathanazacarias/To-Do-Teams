import {PropTypes} from 'prop-types'
import {Link} from 'react-router-dom'
export default function UserCard(props) {
    const {id, username, avatar} = props;

    return (
        <Link to={`${id}`} className="listCard">
            <h2>{username}</h2>
            <p>{avatar}</p>
        </Link>
    )

}

UserCard.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
}