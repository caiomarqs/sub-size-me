import React, { useContext, useState } from 'react'
import { OpenDialogOptions, remote } from 'electron'
import fsModule from 'fs'

import { VideoFormats } from '../../models/VideoFormats'
import { VideoFile } from '../../models/VideoFile'

import { DropZone } from '../DropZone'
import { SimpleButton } from '../SimpleButton'
import { FileContex } from '../../contexts/FileContext'
import { IFileContex } from '../../contexts/FileContext/interfaces'
import { FileActions } from '../../reducers/actions'

const fs: typeof fsModule = remote.require('fs')
const dialog = remote.dialog

const UploadArea = () => {

    const { fileState, dispatch }: IFileContex = useContext(FileContex)

    const [draggin, setDraggin] = useState(false)
    const [openFile, setOpenFile] = useState(false)


    const handleFile = (filePath: string | undefined, size?: number) => {
        const videoFile = new VideoFile(filePath, size)

        dispatch({
            type: FileActions.SET_FILE,
            payload: videoFile
        })

        document.getElementById('target-size-input')?.focus()

    }

    const handleOpenFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenFile(true)
        
        let properties: OpenDialogOptions= {
            title: 'Selecione um video para comprimir',
            buttonLabel: 'Abrir',
            filters: VideoFormats.getAllVideoFormatsArray(),
            properties: ['openFile']
        }

        //on macos
        if (process.platform === 'darwin') {
            properties = {
                title: 'Select the File to be uploaded',
                buttonLabel: 'Abrir',
                filters: VideoFormats.getAllVideoFormatsArray(),
                properties: ['openFile', 'openDirectory']
    
            }
        }

        dialog.showOpenDialog(properties).then(file => {
            if (!file.canceled) {
                const path = (file.filePaths[0].toString())
                const size = fs.statSync(path).size
                handleFile(path, size)
            }
            setOpenFile(false)

        }).catch(err => {
            console.log(err)
        });
    }

    const handleDropFile = (e: React.DragEvent) => {
        e.persist()
        setDraggin(false)
        handleFile(
            e.dataTransfer.files.item(0)?.path,
            e.dataTransfer.files.item(0)?.size,
        )
    }

    return (
        <DropZone
            id="upload-area"
            onDrop={e => handleDropFile(e)}
            onDragOver={_ => setDraggin(true)}
            onDragLeave={_ => setDraggin(false)}
        >
            <img src={require('../../assets/img/drop-area.svg')} />
            <div className="drop-container">

                <div className="drop-content">
                    <p>Arraste e solte o arquivo!</p>
                    <span>ou</span>
                    <SimpleButton
                        onClick={e => !openFile ? handleOpenFile(e) : () => { }}
                        title={fileState.videoFile.completeName === "" ? "Selecione Arquivo" : "Mude o Arquivo"}
                    />
                </div>
            </div>
        </DropZone>
    )
}

export { UploadArea }