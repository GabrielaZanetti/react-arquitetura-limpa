import React from 'react'
import Spinner from '@/presentation/components/spinner/spiner';
import './form-status-styles.scss'

const FormStatus: React.FC = () => {
    return (
        <div className='errorWrap'>
            <Spinner className='spinner' />
            <span className='error'>Error</span>
        </div>
    )
}

export default FormStatus;