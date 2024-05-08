import React, { memo } from 'react'
import Logo from '@/presentation/components/logo/logo';
import './login-header.scss'

const LoginHeader: React.FC = () => {
    return (
        <header className='header'>
            <Logo />
            <h1>4Dev - Enquetes para programadores</h1>
        </header>
    )
}

export default memo(LoginHeader);