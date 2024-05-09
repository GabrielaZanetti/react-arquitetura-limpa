import React, { useContext } from 'react'
import './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/spiner';
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
    const { isLoading, errorMenssage } = useContext(Context)

    return (
        <div data-testid="error-wrap" className='errorWrap'>
            { isLoading && <Spinner className='spinner' /> }
            { errorMenssage && <span className='error'>{errorMenssage}</span> }
        </div>
    )
}

export default FormStatus;