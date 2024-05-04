import { useEffect, useState, } from "react";
import { PropTypes } from "prop-types";
import { AuthContext } from "./contexts";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";


export function AuthProvider() {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if (Cookies.get("user")) {
            const user = JSON.parse(Cookies.get("user"));
            setUser(user); 
        }
    },[]);
    

    function login(user) {
        Cookies.set("user", JSON.stringify(user), {expires: 1});
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
