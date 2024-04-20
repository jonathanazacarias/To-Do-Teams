import NavBar from "../components/nav/NavBar"

export default function Home() {
    return (
        <>
            <NavBar loggedIn={false} />

            <div id="detail">
                <h1>This is the home page</h1>
                <p>Advertising benifits of To-Do Teams</p>
            </div>
        </>
    )
}