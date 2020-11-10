import { IVideoFormat } from './IVideoFormat'

export class MPEG implements IVideoFormat {
    ac3 = "ac3"
    vob = "vob"
    m2v = "m2v"
    m2p = "m2p"
    m2a = "m2a"
    mpeg = "mpeg"
    mod = "mod"
    mpg = "mpg"
    m2t = "m2t"
    m2ts = "m2ts"
    mts = "mts"
    ts = "ts"
    m1a = "m1a"
    mp4 = "mp4"
    m4v = "m4v"
    m4a = "m4a"
    mpa = "mpa"
    mpe = "mpe"
    mpv = "mpv"
    m1v = "m1v"
    avc = "avc"
    acc = "acc"
    f4v = "f4v"
    T64 = "264"
    Tgp = "3gp"
    Tgpp = "3gpp"
    name = "MPEG"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}

export class MPEGO implements IVideoFormat {
    mpeg = "mpeg"
    mpe = "mpe"
    mpv = "mpv"
    m2p = "m2p"
    mpg = "mpg"
    m2v = "m2v"
    m2a = "m2a"
    m2t = "m2t"
    ts = "ts"
    name = "MPEG Optimized"

    getAllFieldsValues() {
        const values = Object.entries(this).map(fields => fields[0] !== "name" ? fields[1] : '')
        return values.filter(val => val !== '')
    }
}