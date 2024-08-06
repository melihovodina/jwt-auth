import React, { FC, useState } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { login, registration } from '../redux/store/reducers/actionCreators';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        dispatch(login({ email, password }));
    };

    const handleRegistration = () => {
        dispatch(registration({ email, password }));
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="email"
                onChange={handleEmailChange}
                value={email}
            />
            <input 
                type="password" 
                placeholder="password"
                onChange={handlePasswordChange}
                value={password}
            />
            <button onClick={handleLogin}>Sign in</button>
            <button onClick={handleRegistration}>Sign up</button>
        </div>
    )
}

export default LoginForm