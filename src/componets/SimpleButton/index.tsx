import React from 'react'

interface ISimpleButton {
    title: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SimpleButton = ({ title, onClick, ...props }: ISimpleButton) => {
    return (
        <button onClick={onClick} className={'simple-button'}>
            <span>
                {title}
            </span>
        </button>
    )
}

export { SimpleButton }