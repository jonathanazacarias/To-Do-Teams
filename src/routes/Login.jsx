import { Form, useActionData/*redirect*/ } from 'react-router-dom'
import { useState } from 'react'


export default function Login() {
    const invalidLogin = useActionData();
    if(invalidLogin) {
        console.log(`Do something to indicate incorrect login`);
    }

    const [createAccount, setCreateAccount] = useState(false);
    let loginWords = {
        header: 'Login',
        formName: 'login',
        formButton: 'Login',
        switchActionTitle: 'Don\'t have an account?',
        switchActionButton: 'Create Account',
        oauthTitle: 'Or login with:'
    }
    let createWords = {
        header: 'Create Account',
        formName: 'create',
        formButton: 'Create Account',
        switchActionTitle: 'Already have an account?',
        switchActionButton: 'Login',
        oauthTitle: 'Or create account with:'
    }

    function handleChangeIntent() {
        setCreateAccount(!createAccount);
    }

    return (
        <div>
            <h1>{createAccount ? createWords.header : loginWords.header}</h1>
            <Form method='post' action='' name={createAccount ? createWords.formName : loginWords.formName}>
                <input type='text' name='email' placeholder='email' />
                <input type='password' name='password' placeholder='password' />
                {createAccount && <input type='password' name='passwordValidation' placeholder='type password again' />}
                <button type ='submit'>{createAccount ? createWords.formButton : loginWords.formButton}</button>
            </Form >
            <h3>{createAccount ? createWords.switchActionTitle : loginWords.switchActionTitle}</h3>
            <button onClick={handleChangeIntent}>{createAccount ? createWords.switchActionButton : loginWords.switchActionButton}</button>
            <hr />
            <h2>{createAccount ? createWords.oauthTitle : loginWords.oauthTitle}</h2>
            <button>Google</button>
            <button>Facebook</button>
        </div>
    )
}