import { IVideoFile } from './IVideoFile'
import { VideoFormats } from '../VideoFormats'

export class VideoFile implements IVideoFile {
    name: string | undefined = ""
    path: string = ""
    type: string | undefined = ""
    completeName: string | undefined = ""
    fileSizeBytes: number | undefined = 0

    constructor(relativePath?: string | undefined, size?: number) {

        if (this.isAcceptableVideoFile(relativePath?.split(/\./).pop()) && relativePath) {
            this.completeName = relativePath.split(/(\/|\\)/).pop()
            this.name = relativePath.split(/(\/|\\)/).pop()?.split(/\./).slice(0, -1).join("")
            this.path = relativePath
            this.type = relativePath.split(/\./).pop()
            this.fileSizeBytes = size;
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

    getPrettyFileSize() {
        if (this.fileSizeBytes === 0 || this.fileSizeBytes === undefined) {
            return '0 Bytes';
        }
        else {
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(this.fileSizeBytes) / Math.log(k));

            return parseFloat((this.fileSizeBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }

    getInstance() {
        return this
    }
}