import { PropTypes } from 'prop-types'
import ActionButton from './ActionButton';

export default function AddFriendCard(props) {
    const { requestId, username, avatar, actions } = props;

    return (
        <div>
            <p>{username}</p>
            <p>{avatar}</p>
            {actions.map((action, index) => {
                return <ActionButton key={index} id={requestId} actionTitle={action.actionTitle} actionFunction={action.actionFunction}></ActionButton>
            })}
            
        </div>
    )
}

AddFriendCard.propTypes = {
    requestId: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
    actions: PropTypes.array
}