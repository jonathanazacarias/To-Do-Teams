import { useState, } from "react";
import { PropTypes } from "prop-types";
import { AuthContext } from "./contexts";
import { Outlet } from "react-router-dom";
import Cookie from 'js-cookie';
import Cookies from "js-cookie";


export function AuthProvider() {
    const [user, setUser] = useState(null);
    
    if(Cookies.get("user")) {
        // setUser(Cookies.get("user"));
        console.log(Cookies.get("user"));
    }

    function login(user) {
        Cookie.set("user", user, {expires: 1});
        setUser(user);
    }

    function logout() {
        Cookies.remove("user");
        setUser(null);
    }

    return <AuthContext.Provider value={{user, login, logout}}><Outlet/></AuthContext.Provider>
}


AuthProvider.propTypes = {
    children: PropTypes.object,
}
