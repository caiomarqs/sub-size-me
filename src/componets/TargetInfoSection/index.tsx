import React, { useContext, useState } from 'react'

import { TargetContext } from '../../contexts/TargetContext'
import { ITargetContex } from '../../contexts/TargetContext/interfaces'
import { SimpleInput } from '../SimpleInput'
import { DropDown, IDropDownOption } from '../DropDown'
import { TargetActions } from '../../reducers/actions'
import { TargetFile } from '../../models/TargetFile'

const sizesOptions: IDropDownOption[] = [
    { label: "MB", value: "MB" },
    { label: "GB", value: "GB" }
]

const TargetInfoSection = () => {

    const { dispatch }: ITargetContex = useContext(TargetContext)

    const [targetSize, setTargetSize] = useState('')
    const [targetUnit, setTargetUnit] = useState(sizesOptions[0].value)

    const handleTargetSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetSize(e.target.value)

        dispatch({
            type: TargetActions.SET_TARGET,
            payload: new TargetFile(Number.parseInt(e.target.value), targetUnit)
        })
    }


    const handleTargetUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetUnit(e.target.value)
        
        dispatch({
            type: TargetActions.SET_TARGET,
            payload: new TargetFile(Number.parseInt(targetSize), e.target.value)
        })
    }

    return (
        <section id="target-info-section">
            <div className="target-size">
                <h3>Tamanho Final</h3>
                <SimpleInput
                    onChange={(e) => handleTargetSize(e)}
                    type="number"
                    value={targetSize}
                    min="0"
                />
                <DropDown
                    options={sizesOptions}
                    initialSelected="MB"
                    onChange={(e) => handleTargetUnit(e)}
                />
            </div>
            <div className="target-info">
                <h3>Qualidade</h3>
            </div>
        </section>
    )
}

export { TargetInfoSection }