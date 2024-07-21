const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const userDataPath = path.join(os.homedir(), 'disk-def');
const licenseFilePath = path.join(userDataPath, 'license.json');

let mainWindow = null;

function createWindow() {
  if (mainWindow) {
    mainWindow.close();
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  
  mainWindow.loadFile(path.join(__dirname, 'src/splash.html'));
}

function checkLicense() {
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath);
  }

  if (!fs.existsSync(licenseFilePath)) {
    fs.writeFileSync(licenseFilePath, JSON.stringify({ isLicensed: false, showWelcome: false }));
  }

  const licenseData = JSON.parse(fs.readFileSync(licenseFilePath));

  if (licenseData.isLicensed) {
    if (licenseData.showWelcome) {
      mainWindow.loadFile(path.join(__dirname, 'src/welcome.html'));
    } else {
      mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
    }
  } else {
    mainWindow.loadFile(path.join(__dirname, 'src/license.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  setTimeout(checkLicense, 2500);

  
  globalShortcut.register('Ctrl+Shift+I', () => {
    
  });
});

ipcMain.on('validate-license', async (event, licenseKey) => {
  const isValid = licenseKey === 'A1GUE-ZDGN6-LG5M3';

  if (isValid) {
    const licenseData = JSON.parse(fs.readFileSync(licenseFilePath));
    licenseData.isLicensed = true;
    licenseData.showWelcome = true;
    fs.writeFileSync(licenseFilePath, JSON.stringify(licenseData));
    event.reply('license-validation-result', { valid: true });
  } else {
    event.reply('license-validation-result', { valid: false });
  }
});

ipcMain.on('license-valid', () => {
  const licenseData = JSON.parse(fs.readFileSync(licenseFilePath));
  if (licenseData.showWelcome) {
    mainWindow.loadFile(path.join(__dirname, 'src/welcome.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }
});

ipcMain.on('continue-to-main', () => {
  const licenseData = JSON.parse(fs.readFileSync(licenseFilePath));
  licenseData.showWelcome = false;
  fs.writeFileSync(licenseFilePath, JSON.stringify(licenseData));

  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    globalShortcut.unregisterAll(); 
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
