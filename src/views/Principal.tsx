import React from 'react'

import { UploadArea } from '../componets/UploadArea'
import { CompressButton } from '../componets/CompressButton'
import { FileProvider } from '../contexts/FileContext'


const Principal = () => {
    return (
        <FileProvider>
            <div id='principal-container'>
                <UploadArea />
                <CompressButton />
            </div>
        </FileProvider>
    )
}

export { Principal }