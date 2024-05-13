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
        emailError: 'Campo obrigatorio',
        passwordError: 'Campo obrigatorio',
        mainError: '',
    });

    useEffect(() => {
        validation.validate({ email: state.email })
    }, [state.email])

    return (
        <div className='login'>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form className='form'>
                    <h2>Login</h2>
                    <Inputs type="email" name='email' placeholder='Digite seu email' />
                    <Inputs type="password" name='password' placeholder='Digite sua senha' />
                    <button data-testid="submit" className='submit' type='submit' disabled>Entrar</button>
                    <span className='link'>Criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Login