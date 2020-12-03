import React, { useContext } from 'react'

import { FileContex } from '../../contexts/FileContext'
import { IFileContex } from '../../contexts/FileContext/interfaces'

const FileInfoSection = () => {

    const { fileState }: IFileContex = useContext(FileContex)

    return (
        <section id="file-info-section">
            <div className="file-name">
                <h3>Nome do arquivo</h3>
                <p>{fileState.videoFile.completeName || "-"}</p>
            </div>
            <div className="file-size">
                <h3>Tamanho atual</h3>
                <p>{fileState.videoFile.getPrettyFileSize()}</p>
            </div>
        </section>
    )
}

export { FileInfoSection }