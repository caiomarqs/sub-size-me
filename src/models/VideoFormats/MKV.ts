import { IVideoFormat } from './IVideoFormat'

export class MKV implements IVideoFormat {
    mkv = "mkv"
    name = "MKV Video"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}