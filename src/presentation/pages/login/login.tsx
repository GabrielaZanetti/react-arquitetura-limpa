import React from 'react'
import './login-styles.scss';
import { Footer, FormStatus, Inputs, LoginHeader } from '@/presentation/components';

const Login: React.FC = () => {
    return (
        <div className='login'>
            <LoginHeader />
            <form className='form'>
                <h2>Login</h2>
                <Inputs type="email" name='email' placeholder='Digite seu email' />
                <Inputs type="password" name='password' placeholder='Digite sua senha' />
                <button className='submit' type='submit'>Entrar</button>
                <span className='link'>Criar conta</span>
                <FormStatus />
            </form>
            <Footer />
        </div>
    )
}

export default Login