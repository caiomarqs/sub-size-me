import { IVideoFormat } from './IVideoFormat'

export class QuickTime implements IVideoFormat {
    mov = "mov"
    mp4 = "mp4"
    m4v = "m4v"
    m4a = "m4a"
    qt = "qt"
    crm = "crm"
    Tgp = "3gp"
    Tg2 = "3g2"
    name = "QuickTime Video"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}