import './navbar.css'
import { Link, } from "react-router-dom";
import Logo from "../Logo";
import PropTypes from "prop-types";

export default function NavBar(props) {
    let {loggedIn} = props;
    
    return (
        <nav>
            <Link to={loggedIn ? 'lists': '/'}><Logo className='logo' /></Link>
            {!loggedIn && <>
                <Link to={'login'}>Log In</Link>
            </>}
            {loggedIn && <>
                <Link to={'lists'}>My Lists</Link>
                <Link to={'friends'}>Collaborators</Link>
                <button>Log out</button>
            </>}
            
        </nav>
    )
}

NavBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}