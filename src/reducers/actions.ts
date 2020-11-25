import { VideoFile } from "../models/VideoFile";

export interface IFileActions {
    type: FileActions
    payload: VideoFile
}

export enum FileActions {
    SET_FILE,
    CLEAR_FILE
}