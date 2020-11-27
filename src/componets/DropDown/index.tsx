import React, { useState } from 'react'

interface IDropDownOption {
    value: string,
    label: string
}

interface IDropDown {
    initialSelected: string,
    options: IDropDownOption[],
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}


const DropDown = ({ initialSelected, options, onChange = () => {}, ...props }: IDropDown) => {

    const [value, setValue] = useState(initialSelected)

    return (
        <select 
            className="drop-down" 
            value={value} 
            onChange={(e) => {
                onChange(e)
                setValue(e.target.value)
            }}>
            {
                options.map((op, i) => <option key={i} value={op.value}>{op.label}</option>)
            }
        </select>
    )
}

export { DropDown, IDropDownOption }