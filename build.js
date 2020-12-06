let electronInstaller = require('electron-winstaller');

let settings = {
    appDirectory: './subsizeme-win32-x64',
    outputDirectory: './build',
    authors: 'caiomarqs',
    exe: './subsizeme.exe',
    noMsi: true,
    setupExe: "Sub Size Me",
    name: "Sub Size Me"
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});