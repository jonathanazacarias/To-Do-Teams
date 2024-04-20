import './navbar.css'
import { NavLink, } from "react-router-dom";
import Logo from "../Logo";
import PropTypes from "prop-types";

export default function NavBar(props) {
    let {loggedIn} = props;
    
    return (
        <nav>
            <NavLink to={loggedIn ? '../lists': '/'}><Logo className='logo' /></NavLink>
            {!loggedIn && <>
                <NavLink to={'../login'}>Log In</NavLink>
                <NavLink to={'../register'}>Register</NavLink>
            </>}
            {loggedIn && <>
                <NavLink to={'../lists'}>My Lists</NavLink>
                <NavLink to={'../friends'}>Friends</NavLink>
                <button>Log out</button>
            </>}
            
        </nav>
    )
}

NavBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}