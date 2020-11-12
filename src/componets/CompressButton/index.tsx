import React, { useContext } from 'react'
import { FileContex } from '../../contexts/FileContext'

const CompressButton = () => {

    const { fileState } = useContext(FileContex)

    const handleComprimir = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log(fileState.videoFile.type)
    }

    return (
        <>
            <button type="button" onClick={(e) => handleComprimir(e)} >Comprimir</button>
        </>
    )
}

export { CompressButton }