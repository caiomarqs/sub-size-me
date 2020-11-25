import React, { useContext, useState } from 'react'
import ffmpeg from 'fluent-ffmpeg'
import { remote } from 'electron'
import fsModule from 'fs'

import { FileContex } from '../../contexts/FileContext'
import { AudioBitRate } from '../../models/AudioBitRate'

const fs: typeof fsModule = remote.require('fs')

const CompressButton = () => {

    const { fileState } = useContext(FileContex)
    const { videoFile } = fileState

    const [compress, setCompress] = useState<null | boolean>(null)
    const [target, setTarget] = useState('')

    const handleComprimir = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        ffmpeg.ffprobe(videoFile.path, (err, data) => {
            if (data.format.duration && target !== '') {
                const seg = Math.round(data.format.duration)
                console.log(seg)

                const bitRateTotal = (Number.parseInt(target) * 8 * 1024) / seg
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
                                    fs.unlinkSync(`${videoFile.getPathWithoutFileName()}temp_${videoFile.name}.mp4`)
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

        // console.log(videoFile.type)
    }

    return (
        <>
            <input type="text" onChange={(e) => setTarget(e.target.value)} />
            <button type="button" onClick={(e) => handleComprimir(e)} >Comprimir</button>
        </>
    )
}

export { CompressButton }