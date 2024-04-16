import { Outlet, } from 'react-router-dom'
import NavBar from '../components/nav/NavBar';

export default function Root() {
    
    return (
        <>
            <NavBar loggedIn={false}/>

            <div id="detail">
                <Outlet/>
            </div>
        </>
    );
}