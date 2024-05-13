import React, { useContext } from 'react'
import './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Inputs: React.FC<Props> = (props: Props) => {
    const { state, setState } = useContext(Context);
    const error = state[`${props.name}Error`]

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const getStatus = (): string => {
        return '🔴'
    }

    const getTitle = (): string => {
        return error
    }

    return (

        <div className='inputWrap'>
            <input {...props} data-testid={props.name} onChange={handleChange} />
            <span data-testid={`${props.name}-status`} title={getTitle()} className='status'>{getStatus()}</span>
        </div>
    )
}

export default Inputs;