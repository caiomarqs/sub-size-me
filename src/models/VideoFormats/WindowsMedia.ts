import { IVideoFormat } from './IVideoFormat'

export class WindowsMedia implements IVideoFormat {
    asf = "asf"
    wma = "wma"
    wmv = "wmv"
    wm = "wm"
    wmz = "wmz"
    wms = "wms"
    name = "Windows Media"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}