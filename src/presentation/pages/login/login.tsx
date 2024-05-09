import React, { useState } from 'react'
import './login-styles.scss';
import { Footer, FormStatus, Inputs, LoginHeader } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
    isLoading: boolean,
    errorMenssage: string
}
const Login: React.FC = () => {
    const [state] = useState<StateProps>({
        isLoading: false,
        errorMenssage: ''
    });

    return (
        <div className='login'>
            <LoginHeader />
            <Context.Provider value={state}>
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