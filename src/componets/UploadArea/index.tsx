import React, { useContext, useState } from 'react'
import { remote } from 'electron'
import fsModule from 'fs'


import { VideoFormats } from '../../models/VideoFormats'
import { VideoFile } from '../../models/VideoFile'

import { DropZone } from '../DropZone'
import { FileContex } from '../../contexts/FileContext'
import { IFileContex } from '../../contexts/FileContext/interfaces'
import { FileActions } from '../../reducers/actions'


const fs: typeof fsModule = remote.require('fs')
const dialog = remote.dialog

const UploadArea = () => {

    const { fileState, dispatch }: IFileContex = useContext(FileContex)

    const [filePath, setFilePath] = useState<string | undefined>('')
    const [draggin, setDraggin] = useState(false)


    const handleFile = (filePath: string | undefined) => {
        const videoFile = new VideoFile(filePath)

        dispatch({
            type: FileActions.SET_FILE,
            payload: videoFile
        })

        setFilePath(videoFile.path)
    }

    const handleOpenFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        //Verificando se é nativo
        if (process.platform !== 'darwin') {
            console.log(process.platform)
            dialog.showOpenDialog({
                title: 'Selecione um video para comprimir',
                buttonLabel: 'Abrir',
                filters: VideoFormats.getAllVideoFormatsArray(),
                properties: ['openFile']
            }).then(file => {
                //Se não for cancelado seta path do arquivo
                if (!file.canceled)
                    handleFile(file.filePaths[0].toString())
            }).catch(err => {
                console.log(err)
            });
        }
        else {
            // If the platform is 'darwin' (macOS) 
            dialog.showOpenDialog({
                title: 'Select the File to be uploaded',
                buttonLabel: 'Abrir',
                filters: VideoFormats.getAllVideoFormatsArray(),
                properties: ['openFile', 'openDirectory']

            }).then(file => {
                if (!file.canceled)
                    handleFile(file.filePaths[0].toString())
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleDropFile = (e: React.DragEvent) => {
        e.persist()
        setDraggin(false)
        handleFile(e.dataTransfer.files.item(0)?.path)
    }

    return (
        <DropZone
            id="upload-area"
            onDrop={e => handleDropFile(e)}
            onClick={e => handleOpenFile(e)}
            onDragOver={_ => setDraggin(true)}
            onDragLeave={_ => setDraggin(false)}
        >
            <p>{fileState.videoFile.path}</p>
            <p>{draggin ? 'true' : 'false'}</p>
        </DropZone>
    )
}

export { UploadArea }

