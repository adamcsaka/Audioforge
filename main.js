const { app, BrowserWindow } = require('electron');
const path = require('path');

// Hardveres gyorsítás és web audio autoplay engedélyezése
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('ignore-gpu-blocklist');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // Tiszta menüsáv
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webgl: true
    }
  });

  mainWindow.setMenu(null); // Menü teljes eltávolítása
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
