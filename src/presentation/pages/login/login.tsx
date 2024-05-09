import React from 'react'
import './login-styles.scss';
import Spinner from '@/presentation/components/spinner/spiner';
import Header from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';
import Inputs from '@/presentation/components/input/input';

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
                <div className='errorWrap'>
                    <Spinner className='spinner' />
                    <span className='error'>Error</span>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Login