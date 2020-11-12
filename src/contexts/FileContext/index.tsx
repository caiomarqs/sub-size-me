import React, { createContext, useReducer } from 'react'

import { fileReducer } from '../../reducers/FileReducer'
import { VideoFile } from '../../models/VideoFile'

import { IFileProvider, IFileState, IFileContex } from './interfaces'


const INITAL_FILE_STATE: IFileState = {
    videoFile: new VideoFile().getInstance()
}

const initialFileContex: IFileContex = {
    fileState: INITAL_FILE_STATE,
    dispatch: () => {}
}

const FileContex = createContext<IFileContex>(initialFileContex)

const FileProvider = ({ children, ...props }: IFileProvider) => {

    const [fileState, dispatch] = useReducer(fileReducer, INITAL_FILE_STATE)

    return (
        <FileContex.Provider value={{ fileState, dispatch }}>
            {children}
        </FileContex.Provider>
    )
}

export { FileContex, FileProvider }