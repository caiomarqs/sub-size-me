import { IVideoFile } from './IVideoFile'
import { VideoFormats } from '../VideoFormats'

export class VideoFile implements IVideoFile {
    name: string | undefined = ""
    path: string | undefined = ""
    type: string | undefined = ""

    constructor(relativePath?: string | undefined) {
        this.name = relativePath?.split(/(\/|\\)/).pop()
        this.path = relativePath
        this.type = this.isAcceptableVideoFile(relativePath?.split(/\./).pop()) ? relativePath?.split(/\./).pop() : ''
    }

    isAcceptableVideoFile(format: string | undefined) {
        if (format) {
            const validation = VideoFormats.getAllVideoAccetableFormats().includes(format)
            if (!validation) throw new Error("Video format is not accetable")
            return validation
        } else {
            return false
        }
    }

    getInstance() {
        return this
    }
}