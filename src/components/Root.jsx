import { useState, } from 'react';
import { Outlet } from 'react-router-dom';

export default function Root() {
    const [user, setUser] = useState(null);
    return <Outlet context={{user, setUser}} />;
}
