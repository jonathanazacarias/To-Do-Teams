import { useState, } from "react";
import {PropTypes} from "prop-types";
import { AuthContext } from "./contexts";
import { Outlet } from "react-router-dom";



export function AuthProvider() {
    const [user, setUser] = useState(null);

    function login(user) {
        setUser(user);
    }

    function logout() {
        setUser(null);
    }

    return <AuthContext.Provider value={{user, login, logout}}><Outlet/></AuthContext.Provider>
}


AuthProvider.propTypes = {
    children: PropTypes.object,
}
