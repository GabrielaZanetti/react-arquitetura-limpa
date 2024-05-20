import React, { useContext } from 'react'
import './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/spiner';
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
    const { state } = useContext(Context)
    const { isLoading, mainError } = state;

    return (
        <div data-testid="error-wrap" className='errorWrap'>
            { isLoading && <Spinner className='spinner' /> }
            { mainError && <span data-testid="main-error" className='error'>{mainError}</span> }
        </div>
    )
}

export default FormStatus;