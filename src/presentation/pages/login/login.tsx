import React from 'react'
import './login-styles.scss';
import Header from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';
import Inputs from '@/presentation/components/input/input';
import FormStatus from '@/presentation/components/form-status/form-status';

const Login: React.FC = () => {
    return (
        <div className='login'>
            <Header />
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