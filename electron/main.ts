import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 652,
        height: 600,
        maxWidth: 652,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false,
            enableRemoteModule: true
        },
        center: true,
        backgroundColor: "#161723",

    })

    // win.on('focus', () => {
    //     win.webContents.send('browser-window-focus')
    // })

    // win.on('blur', () => {
    //     win.webContents.send('browser-window-blur')
    // })

    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`http://localhost:4000`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, '../public/index.html'),
                protocol: 'file:',
                slashes: true
            })
        )
    }
    // win.loadFile('public/index.html')
}

const startUp = () => {
    app.allowRendererProcessReuse = true
    app.commandLine.appendSwitch('disable-renderer-backgrounding')

    app.whenReady().then(createWindow)
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
}

startUp()