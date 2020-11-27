import React from 'react'


interface ISimpleInput {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    type?: string
    min?: string
}

const SimpleInput = ({ onChange = () => { }, value, type, min,  ...props }: ISimpleInput) => {
    return <input
        onChange={(e) => onChange(e)}
        className="simple-input"
        value={value}
        type={type}
        min={min}
        {...props}
    />
}

export { SimpleInput }