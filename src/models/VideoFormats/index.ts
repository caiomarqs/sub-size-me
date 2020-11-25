import { IVideoFormat } from './IVideoFormat'

import { AVI } from './AVI'
import { Flash } from './Flash'
import { MP4 } from './MP4'
import { MKV } from './MKV'
import { MPEG, MPEGO } from './MPEG'
import { QuickTime } from './QuickTime'
import { WindowsMedia } from './WindowsMedia'

const avi = new AVI()
const flash = new Flash()
const mp4 = new MP4()
const mkv = new MKV()
const mpeg = new MPEG()
const mpego = new MPEGO()
const quickTime = new QuickTime()
const windowsMedia = new WindowsMedia()

export class VideoFormats {

    private static getTypeFormats(videoFormat: IVideoFormat): { name: string, extensions: string[] } {
        return {
            name: videoFormat.name,
            extensions: videoFormat.getAllFieldsValues()
        }
    }

    private static getAllTypeFormats(videosFormats: IVideoFormat[]): { name: string, extensions: string[] } {

        const mergeArrays = (...videosFormats: IVideoFormat[]) => {
            let jointArray: string[] = []
            videosFormats.forEach(videoFormats => {
                jointArray = [...jointArray, ...videoFormats.getAllFieldsValues()]
            })
            return Array.from(new Set([...jointArray]))
        }

        return {
            name: "All Accetable Formats",
            extensions: mergeArrays(...videosFormats)
        }
    }

    private static getAllFormats() {
        return {
            name: "All Formats",
            extensions: ['*']
        }
    }

    static getAllVideoFormatsArray(): Electron.FileFilter[] {
        return [
            this.getAllFormats(),
            this.getAllTypeFormats([avi, flash, mp4, mkv, mpeg, mpego, quickTime, windowsMedia]),
            this.getTypeFormats(avi),
            this.getTypeFormats(flash),
            this.getTypeFormats(mp4),
            this.getTypeFormats(mkv),
            this.getTypeFormats(mpeg),
            this.getTypeFormats(mpego),
            this.getTypeFormats(quickTime),
            this.getTypeFormats(windowsMedia),
        ]
    }

    static getAllVideoAccetableFormats(): Array<string> {
        const { extensions } = this.getAllTypeFormats([avi, flash, mp4, mkv, mpeg, mpego, quickTime, windowsMedia]);
        return extensions
    }
}

