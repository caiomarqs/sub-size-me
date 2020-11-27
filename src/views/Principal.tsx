import React from 'react'

import { UploadArea } from '../componets/UploadArea'
import { FileInfoSection } from '../componets/FileInfoSection'
import { CompressButton } from '../componets/CompressButton'
import { FileProvider } from '../contexts/FileContext'
import { TargetInfoSection } from '../componets/TargetInfoSection'
import { TargetProvider } from '../contexts/TargetContext'


const Principal = () => {
    return (
        <FileProvider>
            <div id='principal-container'>
                <UploadArea />
                <FileInfoSection />
                <TargetProvider>
                    <TargetInfoSection />
                    <CompressButton />
                </TargetProvider>
            </div>
        </FileProvider>
    )
}

export { Principal }