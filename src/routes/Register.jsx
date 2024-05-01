import { useState, useEffect } from 'react'
import { Form, Link, useActionData, useNavigate} from 'react-router-dom'
import NavBar from '../components/nav/NavBar';
import { useAuth } from '../utils/contexts';


export default function Register() {
    const navigate = useNavigate();
    const auth = useAuth();

    const [showPassword, toggleShowPassword] = useState(false);
    const [showValPassword, toggleShowValPassword] = useState(false);

    const registrationResult = useActionData();
    

    useEffect(() => {
        if (registrationResult) {
            if (registrationResult.error) {
                console.log(registrationResult.error.response.data);
            } else {
                console.log(registrationResult);
                auth.login(registrationResult);
                navigate("../lists");
            }
        }
    }, [registrationResult, auth, navigate])

    let createWords = {
        header: 'Create Account',
        formName: 'create',
        formButton: 'Create Account',
        switchActionTitle: 'Already have an account?',
        switchActionButton: 'Login',
        oauthTitle: 'Or create account with:'
    }

    function handleShowPassword(event) {
        event.preventDefault();
        toggleShowPassword(!showPassword);
    }

    function handleShowValPassword(event) {
        event.preventDefault();
        toggleShowValPassword(!showValPassword);
    }

    return (
        <div>
            <NavBar loggedIn={false} />
            <h1>{ createWords.header}</h1>
            <Form method='post' >
                <label htmlFor="email">Email</label>
                <input type='text' name='email' placeholder='email' autoComplete='email' required/>
                <label htmlFor='username'>Display Name</label>
                <input type='text' name='username' placeholder='username' autoComplete='new-username' required/>
                <label htmlFor='password'>Password</label>
                <input type={showPassword ? 'text':'password'} name='password' placeholder='password' autoComplete='new-password' required/>
                <button onClick={handleShowPassword} >{showPassword ? 'Hide':'Show'}</button>
                <label htmlFor='passwordValidation'>Retype Password</label>
                <input type={showValPassword ? 'text' : 'password'} name='passwordValidation' placeholder='password' autoComplete='off' required/>
                <button onClick={handleShowValPassword} >{showValPassword ? 'Hide' : 'Show'}</button>
                <button type='submit'>{createWords.formButton}</button>
            </Form >
            <h3>{createWords.switchActionTitle}</h3>
            <Link to={"../login"}>{createWords.switchActionButton}</ Link>
            <hr />
            <h2>{createWords.oauthTitle}</h2>
            <button>Google</button>
            <button>Facebook</button>
        </div>
    )
}