import { ReactNode } from 'react'

import { VideoFile } from '../../models/VideoFile'

import { IFileActions } from '../../reducers/actions'

export interface IFileState {
    videoFile: VideoFile
}

export interface IFileContex {
    fileState: IFileState
    dispatch: React.Dispatch<IFileActions> | Function
}

export interface IFileProvider {
    children: ReactNode | JSX.Element
}