import { TargetFile } from "../models/TargetFile";
import { VideoFile } from "../models/VideoFile";

export interface IFileActions {
    type: FileActions
    payload: VideoFile
}

export enum FileActions {
    SET_FILE,
    CLEAR_FILE
}

export interface ITargetActions {
    type: TargetActions
    payload: TargetFile
}

export enum TargetActions {
    SET_TARGET,
    CLEAR_TARGET
}