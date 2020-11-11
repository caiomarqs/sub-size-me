import React, { useState } from 'react'
import fsModule from 'fs'
import path from 'path'
import { remote } from 'electron'

import VideoFormats from '../../models/VideoFormats'

import { DropZone } from '../DropZone'

const fs: typeof fsModule = remote.require('fs')
const dialog = remote.dialog

const UploadArea = () => {

    const [filePath, setFilePath] = useState<string | undefined>('')

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
                if (!file.canceled) setFilePath(file.filePaths[0].toString())
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

                if (!file.canceled) setFilePath(file.filePaths[0].toString())

            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleDropFile = (e: React.DragEvent) => {
        e.persist()
        setFilePath(e.dataTransfer.files.item(0)?.path)
    }

    return (
        <DropZone
            id="upload-area"
            onDrop={e => handleDropFile(e)}
            onClick={e => handleOpenFile(e)}
        >
            <p>{filePath?.split(/(\/|\\)/).pop()}</p>
        </DropZone>
    )
}

export { UploadArea }