import React, { useContext } from 'react'
import './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Inputs: React.FC<Props> = (props: Props) => {
    const { errorState } = useContext(Context);
    const error = errorState[props.name]

    const getStatus = (): string => {
        return '🔴'
    }
    const getTitle = (): string => {
        return error
    }

    return (

        <div className='inputWrap'>
            <input {...props} />
            <span data-testid={`${props.name}-status`} title={getTitle()} className='status'>{getStatus()}</span>
        </div>
    )
}

export default Inputs;