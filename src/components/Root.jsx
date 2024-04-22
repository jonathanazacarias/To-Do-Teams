import {createContext, useState} from 'react';
import PropTypes from "prop-types"; 

const UserContext = createContext(null);

export default function Root({children}) {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

Root.propTypes = {
    children: PropTypes.func,
}