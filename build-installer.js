const { MSICreator } = require('electron-wix-msi')
const path = require('path')

const APP_DIR = path.resolve(__dirname, './subsizeme-win32-x64')
const OUT_DIR = path.resolve(__dirname, './outputs/win32-x64')

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    description: "Sub Size Me, is a application for compressing video files",
    name: "SubSizeMe",
    manufacturer: "Sub Size Me, LLC",
    version: "1.0.0-alpha",
    arch: 'x64',
    ui: {
        chooseDirectory: true
    },
    exe: "subsizeme.exe",
    shortcutName: "Sub Size Me"
})

msiCreator.create().then(() => msiCreator.compile())