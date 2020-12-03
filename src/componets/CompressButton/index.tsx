import React, { useContext, useEffect, useState } from 'react'
import ffmpeg from 'fluent-ffmpeg'
import { remote } from 'electron'
import fsModule from 'fs'
import childProcessModule from 'child_process'

import { SimpleButton } from '../SimpleButton'
import { FileContex } from '../../contexts/FileContext'
import { TargetContext } from '../../contexts/TargetContext'
import { AudioBitRate } from '../../models/AudioBitRate'
import { VideoFile } from '../../models/VideoFile'

const fs: typeof fsModule = remote.require('fs')
const process: typeof childProcessModule = remote.require('child_process')

const CompressButton = () => {

    const { fileState } = useContext(FileContex)
    const { targetState } = useContext(TargetContext)

    const [videoFile, setVideoFile] = useState<VideoFile>(fileState.videoFile)
    const [compressPercent, setCompressPercent] = useState<null | number>(null)


    useEffect(() => {
        setVideoFile(fileState.videoFile)
    }, [fileState.videoFile])


    const handleComprimir = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (videoFile.path === "") {
            alert("Selecione ou arraste um arquivo!!")
            return
        }
        if (targetState.targetFile.sizeNumber === 0) {
            alert("Insira o tamanho quer comprimir o video!!")
            return
        }

        ffmpeg.ffprobe(videoFile.path, (err, data) => {

            if (err) {
                console.log(err)
                return
            }

            if (data.format.duration && data.streams[0].avg_frame_rate) {
                const seg = data.format.duration
                const frameRate = data.streams[0].avg_frame_rate.toString().split(/(\/)/)[0]

                //um kbyte é 8 kbit 
                const bitRateTotal = (targetState.targetFile.getSizeKBit() / seg) - (Number.parseInt(frameRate) * .2) - 1
                const audioBitRate = AudioBitRate.getNearBitRate(Math.round(bitRateTotal))
                const videoBitRate = bitRateTotal - audioBitRate

                if (videoFile.path && videoFile.type && videoFile.name) {
                    ffmpeg(videoFile.path)
                        .videoCodec('libx264')
                        .videoBitrate(`${videoBitRate}k`)
                        .addOption(['-pass', '1'])
                        .addOption(['-f', 'null NUL'])
                        .addOption(['-y'])
                        .addOption(['-vsync cfr'])
                        .on('error', err => {
                            console.log(err);
                        })
                        .on('end', _ => {
                            ffmpeg(videoFile.path)
                                .videoCodec('libx264')
                                .videoBitrate(`${videoBitRate}k`)
                                .audioCodec('aac')
                                .audioBitrate(`${audioBitRate}k`)
                                .format('mp4')
                                .addOptions(["-pass", "2"])
                                .addOption(['-y'])
                                .on('error', err => {
                                    console.log(err);
                                })
                                .on('end', _ => {
                                    const tempFile = `${videoFile.getPathWithoutFileName()}temp_${videoFile.name}.mp4`

                                    if (fs.existsSync(tempFile)) {
                                        fs.unlinkSync(tempFile)

                                        if (confirm(`Seu aqruivo foi salvo como: compress_${videoFile.name}.mp4\nDeseja abrir o local do arqivo?`)) {
                                            process.exec(`start "" "${videoFile.getPathWithoutFileName()}"`);
                                        }
                                    }

                                    setCompressPercent(null)
                                })
                                .saveToFile(`${videoFile.getPathWithoutFileName()}compress_${videoFile.name}.mp4`)
                                .run();

                            setCompressPercent(100)
                        })
                        .on('progress', (progress) => {
                            //TODO - Fix compress sometimes nubmer come backs
                            setCompressPercent(+Math.round(progress.percent))
                        })
                        .saveToFile(`${videoFile.getPathWithoutFileName()}temp_${videoFile.name}.mp4`)
                        .run()
                }
            }
        })
    }

    return (
        <div className="compress-button-container">
            {
                compressPercent === null
                    ?
                    <SimpleButton onClick={(e) => handleComprimir(e)} title="Comprimir" />
                    :
                    <div className="status-container">

                        <p>Status: {compressPercent}%</p>

                        <div className="status-bar">
                            <div
                                className="status-progres"
                                style={{ width: compressPercent === null ? '0%' : `${compressPercent}%` }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}

export { CompressButton }