import { IVideoFormat } from './IVideoFormat'

export class Flash implements IVideoFormat {
    flv = "flv";
    name = "Flash Video"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}