import React, { useState } from 'react'
import fsModule from 'fs'
import path from 'path'
import { remote } from 'electron'

import VideoFormats from '../../models/VideoFormats'
import { platform } from 'os'

const fs: typeof fsModule = remote.require('fs')
const dialog = remote.dialog

const UploadArea = () => {

    const [filePath, setFilePath] = useState('')


    const handleUpload = () => {

        //Verificando se é nativo
        if (process.platform !== 'darwin') {
            console.log(platform)
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
            });
        }
    }



    return (
        <div id="upload-area">
            <p>{filePath}</p>
            <button id="upload" onClick={() => handleUpload()}>Upload File</button>
        </div>
    )
}

export { UploadArea }