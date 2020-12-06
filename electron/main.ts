import { app, App, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import * as childProcess from 'child_process'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        minHeight: 680,
        maxWidth: 600,
        minWidth: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            backgroundThrottling: false,
            enableRemoteModule: true
        },
        center: true,
        backgroundColor: "#161723",

    })

    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`http://localhost:4000`);
    }
    else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, '../dist/index.html'),
                protocol: 'file:',
                slashes: true
            })
        )
    }
}

const handleSquirrelEvent = (application: App) => {
    if (process.argv.length === 1) {
        return false;
    }

    const appFolder = path.resolve(process.execPath, '..');
    const updateDotExe = path.resolve(path.join(appFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = (command: string, args: any) => {
        let spawnedProcess, error;

        try {
            spawnedProcess = childProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) { }

        return spawnedProcess;
    };

    const spawnUpdate = (args: any) => {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            spawnUpdate(['--createShortcut', exeName]);
            setTimeout(application.quit, 1000);
            return true;
        case '--squirrel-uninstall':
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;
        case '--squirrel-obsolete':
            application.quit();
            return true;
    }
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
        if (handleSquirrelEvent(app)) {
            return;
        }

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
}

startUp()