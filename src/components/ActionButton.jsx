import { PropTypes } from "prop-types";

export default function ActionButton(props) {
    const { id, actionTitle, actionFunction } = props;

    function handleClick() {
        actionFunction(id);
    }

    return <button onClick={handleClick}>{actionTitle}</button>
}

ActionButton.propTypes = {
    id: PropTypes.string,
    actionTitle: PropTypes.string.isRequired,
    actionFunction: PropTypes.func.isRequired
}