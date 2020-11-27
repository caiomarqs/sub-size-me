import React, { createContext, useReducer } from 'react'

import { TargetFile } from '../../models/TargetFile'

import { ITargetContex, ITargetState, ITargetProvider } from './interfaces'
import { targetReducer } from '../../reducers/TargetReducer'

const INITAL_TARGET_STATE: ITargetState = {
    targetFile: new TargetFile().getInstance()
}

const initialTargetContex: ITargetContex = {
    targetState: INITAL_TARGET_STATE,
    dispatch: () => {}
}

const TargetContext = createContext<ITargetContex>(initialTargetContex)

const TargetProvider = ({ children, ...props }: ITargetProvider) => {

    const [targetState, dispatch] = useReducer(targetReducer, INITAL_TARGET_STATE)

    return (
        <TargetContext.Provider value={{ targetState, dispatch }}>
            {children}
        </TargetContext.Provider>
    )
}

export { TargetContext, TargetProvider }