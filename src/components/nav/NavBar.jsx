import './navbar.css'
import {  NavLink, useNavigate, } from "react-router-dom";
import Logo from "../Logo";
import axios from 'axios';
import { useAuth } from '../../utils/contexts';

export default function NavBar() {
    const auth = useAuth();
    let navigate = useNavigate();

    async function handleLogout() {
        await axios.post("http://localhost:3000/logout", {logout: "logout"},{withCredentials: true,});
        auth.logout();
        return navigate("/");
    }
    
    return (
        <nav>
            <NavLink to={auth.user ? '../lists': '/'}><Logo className='logo' /></NavLink>
            {!auth.user && <>
                <NavLink to={'../login'}>Log In</NavLink>
                <NavLink to={'../register'}>Register</NavLink>
            </>}
            {auth.user && <>
                <NavLink to={'../lists'}>My Lists</NavLink>
                <NavLink to={'../friends'}>Friends</NavLink>
                <button onClick={handleLogout}>Log out</button>
            </>}
            
        </nav>
    )
}
