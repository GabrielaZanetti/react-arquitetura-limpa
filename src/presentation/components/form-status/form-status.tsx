import React, { useContext } from 'react'
import './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/spiner';
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
    const { state, errorState } = useContext(Context)
    const { isLoading } = state;
    const { main } = errorState;

    return (
        <div data-testid="error-wrap" className='errorWrap'>
            { isLoading && <Spinner className='spinner' /> }
            { main.errorMenssage && <span className='error'>{main.errorMenssage}</span> }
        </div>
    )
}

export default FormStatus;