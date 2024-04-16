import NavBar from "../components/nav/NavBar"
import { Outlet, } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <NavBar loggedIn={true} />

            <div id="detail">
                <Outlet />
            </div>
        </>
    )
}