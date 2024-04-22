import './navbar.css'
import {  NavLink, useNavigate, } from "react-router-dom";
import Logo from "../Logo";
import PropTypes from "prop-types";
import axios from 'axios';

export default function NavBar(props) {
    let {loggedIn} = props;
    let navigate = useNavigate();

    async function handleLogout() {
        const response = await axios.post("http://localhost:3000/logout", {logout: "logout"},{withCredentials: true,});
        console.log(response);
        return navigate("/");
    }
    
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
                <button onClick={handleLogout}>Log out</button>
            </>}
            
        </nav>
    )
}

NavBar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
}