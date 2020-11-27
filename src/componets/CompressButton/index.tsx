import React, { useCallback, useContext, useEffect, useState } from 'react'
import ffmpeg from 'fluent-ffmpeg'
import { remote } from 'electron'
import fsModule from 'fs'

import { SimpleButton } from '../SimpleButton'
import { FileContex } from '../../contexts/FileContext'
import { TargetContext } from '../../contexts/TargetContext'
import { AudioBitRate } from '../../models/AudioBitRate'
import { VideoFile } from '../../models/VideoFile'

const fs: typeof fsModule = remote.require('fs')

const CompressButton = () => {

    const { fileState } = useContext(FileContex)
    const { targetState } = useContext(TargetContext)

    const [videoFile, setVideoFile] = useState<VideoFile>(fileState.videoFile)
    const [compress, setCompress] = useState<null | boolean>(null)


    useEffect(() => {
        setVideoFile(fileState.videoFile)
    }, [fileState.videoFile])


    const handleComprimir = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()


        ffmpeg.ffprobe(videoFile.path, (err, data) => {

            if (data.format.duration && data.streams[0].avg_frame_rate && targetState.targetFile.sizeNumber !== 0) {
                const seg = data.format.duration
                const frameRate = data.streams[0].avg_frame_rate.toString().split(/(\/)/)[0]

                //um kbyte é 8 kbit 
                const bitRateTotal = (targetState.targetFile.getSizeKBit() / seg) - (Number.parseInt(frameRate) * .2) - 1
                const audioBitRate = new AudioBitRate().getNearBitRate(Math.round(bitRateTotal))
                const videoBitRate = bitRateTotal - audioBitRate

                console.log(bitRateTotal)
                console.log(audioBitRate)
                console.log(videoBitRate)


                if (videoFile.path && videoFile.type && videoFile.name) {
                    const first = ffmpeg(videoFile.path)
                        .videoCodec('libx264')
                        .videoBitrate(`${videoBitRate}k`)
                        .addOption(['-pass', '1'])
                        .addOption(['-f', 'null NUL'])
                        .on('error', err => {
                            console.log(err);
                        })
                        .on('end', _ => {
                            ffmpeg(videoFile.path)
                                .addOptions(["-pass", "2"])
                                .videoCodec('libx264')
                                .videoBitrate(`${videoBitRate}k`)
                                .audioCodec('aac')
                                .audioBitrate(`${audioBitRate}k`)
                                .addOption(['-y'])
                                .format('mp4')
                                .on('error', err => {
                                    console.log(err);
                                })
                                .on('end', _ => {
                                    setCompress(false)

                                    const tempFile = `${videoFile.getPathWithoutFileName()}temp_${videoFile.name}.mp4`

                                    if(fs.existsSync(tempFile)){
                                        fs.unlinkSync(tempFile)
                                    }
                                    
                                })
                                .saveToFile(`${videoFile.getPathWithoutFileName()}compress_${videoFile.name}.mp4`)
                                .run();
                        })
                        .saveToFile(`${videoFile.getPathWithoutFileName()}temp_${videoFile.name}.mp4`)
                    first.run()
                }
            }
            else {
                alert('insira um target')
            }
        })
    }

    return (
        <div className="compress-button-container">
            <SimpleButton onClick={(e) => handleComprimir(e)} title="Comprimir" />
        </div>
    )
}

export { CompressButton }