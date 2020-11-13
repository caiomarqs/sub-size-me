import { IVideoFile } from './IVideoFile'
import { VideoFormats } from '../VideoFormats'

export class VideoFile implements IVideoFile {
    name: string | undefined = ""
    path: string = ""
    type: string | undefined = ""
    completeName: string | undefined = ""

    constructor(relativePath?: string | undefined) {
        
        if (this.isAcceptableVideoFile(relativePath?.split(/\./).pop()) && relativePath) {
            this.completeName = relativePath.split(/(\/|\\)/).pop()
            this.name = relativePath.split(/(\/|\\)/).pop()?.split(/\./).slice(0, -1).join("")
            this.path = relativePath
            this.type = relativePath.split(/\./).pop()
        }

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

    getPathWithoutFileName() {
        if (this.path !== undefined) {
            return this.path
                .split(/(\/|\\)/)
                .slice(0, -1)
                .join("")
        }
        return ""
    }

    getInstance() {
        return this
    }
}