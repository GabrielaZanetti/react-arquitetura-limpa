import React from 'react'
import './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Inputs: React.FC<Props> = (props: Props) => {
    return (
        <div className='inputWrap'>
            <input {...props} />
            <span className='status'></span>
        </div>
    )
}

export default Inputs;