const { app, BrowserWindow } = require('electron')
const { shell } =require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nativeWindowOpen: true,
            nodeIntegration: true
        },
        icon: ""
    })

    win.removeMenu()
    win.loadFile('src/html/index.html')

    document.body.addEventListener('click', event => {
        if (event.target.tagName.toLowerCase() === 'a' && event.target.protocol != 'file:') {
            event.preventDefault();
            shell.openExternal(event.target.href);
        }
    })
}

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

