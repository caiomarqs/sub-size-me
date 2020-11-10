import { IVideoFormat } from './IVideoFormat'

export class AVI extends String implements IVideoFormat {
    avi = "avi";
    mp4 = "mp4";
    name = "AVI"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}