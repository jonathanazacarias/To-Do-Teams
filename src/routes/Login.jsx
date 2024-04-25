import { useEffect, useState,} from 'react'
import { Form, useActionData, Link, useNavigate, } from 'react-router-dom'
import NavBar from '../components/nav/NavBar';
import { useAuth } from '../utils/contexts';



export default function Login() {
    const auth = useAuth();


    const [showPassword, toggleShowPassword] = useState(false);

    const navigate = useNavigate();

    const loginData = useActionData();

    

    useEffect(() => {
        console.log("login data: "+loginData);
        console.log("authed user: "+auth.user);
        if (loginData) {
            
            if (loginData.error) {
                console.log("do something to indicate incorrect login.");
            } else {
                auth.login(loginData);
                navigate("../lists");
            }
        }
        if (auth.user) {
            navigate("../lists");
        }
    }, [loginData, auth, navigate])
    
    

    let loginWords = {
        header: 'Login',
        formName: 'login',
        formButton: 'Login',
        switchActionTitle: 'Don\'t have an account?',
        switchActionButton: 'Create Account',
        oauthTitle: 'Or login with:'
    }

    function handleShowPassword(event) {
        event.preventDefault();
        toggleShowPassword(!showPassword);
    }
    
    return (
        <div>
            <NavBar loggedIn={false} />
            <h1>{loginWords.header}</h1>
            <Form method='post'>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' placeholder='email' autoComplete='email'/>
                <label htmlFor='password'>Password</label>
                <input type={showPassword ? 'text' : 'password'} name='password' placeholder='password' autoComplete='current-password' />
                <button onClick={handleShowPassword} >{showPassword ? 'Hide' : 'Show'}</button>
                <button type ='submit'>{loginWords.formButton}</button>
            </Form >
            <h3>{loginWords.switchActionTitle}</h3>
            <Link to={"../register"}>{loginWords.switchActionButton}</Link>
            <hr />
            <h2>{loginWords.oauthTitle}</h2>
            <button>Google</button>
            <button>Facebook</button>
        </div>
    )
}