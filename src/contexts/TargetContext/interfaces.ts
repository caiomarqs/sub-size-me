import { ReactNode } from 'react'

import { TargetFile } from '../../models/TargetFile'

import { ITargetActions } from '../../reducers/actions'

export interface ITargetState {
    targetFile: TargetFile
}

export interface ITargetContex {
    targetState: ITargetState
    dispatch: React.Dispatch<ITargetActions> | Function
}

export interface ITargetProvider {
    children: ReactNode | JSX.Element
}