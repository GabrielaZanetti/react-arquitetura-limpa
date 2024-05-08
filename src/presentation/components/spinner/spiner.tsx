import React from 'react'
import './spinner.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => {
    let classesName = "lds-ellipsis "+props.className;
    return (
        <div {...props} className={classesName}>
            <div /><div /><div /><div />
        </div>
    )
}

export default Spinner;