import { IFileState } from '../contexts/FileContext/interfaces'
import { ITargetState } from '../contexts/TargetContext/interfaces';
import { TargetFile } from '../models/TargetFile';

import { ITargetActions, TargetActions } from './actions'

export const targetReducer = (state: ITargetState, action: ITargetActions) => {
    switch (action.type) {
        case TargetActions.SET_TARGET: {
            return { targetFile: action.payload }
        }
        case TargetActions.CLEAR_TARGET: {
            return { targetFile: new TargetFile().getInstance() }
        }
        default:
            return state;
    }
}