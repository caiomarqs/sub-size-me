import { IFileState } from '../contexts/FileContext/interfaces'
import { VideoFile } from '../models/VideoFile';

import { IFileActions, FileActions } from './actions'

export const fileReducer = (state: IFileState, action: IFileActions) => {
    switch (action.type) {
        case FileActions.SET_FILE: {
            return { videoFile: action.payload }
        }
        case FileActions.SET_FILE: {
            return { videoFile: new VideoFile().getInstance() }
        }
        default:
            return state;
    }
}