import React, { useState, useEffect } from 'react'
import './login-styles.scss';
import { Footer, FormStatus, Inputs, LoginHeader } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation';

type Props = {
    validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: '',
    });

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password)
        })
    }, [state.email, state.password])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        setState({ ...state, isLoading: true })
    }

    return (
        <div className='login'>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form className='form' onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <Inputs type="email" name='email' placeholder='Digite seu email' />
                    <Inputs type="password" name='password' placeholder='Digite sua senha' />
                    <button data-testid="submit" className='submit' type='submit' disabled={!!state.emailError || !!state.passwordError} >Entrar</button>
                    <span className='link'>Criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login