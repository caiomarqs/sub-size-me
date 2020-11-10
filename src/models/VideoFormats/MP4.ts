import { IVideoFormat } from './IVideoFormat'

export class MP4 implements IVideoFormat {
    mp4 = "mp4"
    m4v = "m4v"
    mp4v = "mp4v"
    Tg2 = "3g2"
    Tgp2 = "3gp2"
    Tgp = "3gp"
    Tgpp = "3gpp"
    name = "MP4 Video"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}