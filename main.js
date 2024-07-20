const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const userDataPath = path.join(os.homedir(), 'disk-def');
const licenseFilePath = path.join(userDataPath, 'license.json');

let splashWindow;
let licenseWindow;
let welcomeWindow;
let mainWindow;
let thanksWindow; 

function createSplashWindow() {
  if (splashWindow) {
    splashWindow.close();
  }

  splashWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  splashWindow.loadFile(path.join(__dirname, 'src/splash.html'));
}

function createLicenseWindow() {
  if (licenseWindow) {
    licenseWindow.close();
  }

  licenseWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  licenseWindow.loadFile(path.join(__dirname, 'src/license.html'));
}

function createWelcomeWindow() {
  if (welcomeWindow) {
    welcomeWindow.close();
  }

  welcomeWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  welcomeWindow.loadFile(path.join(__dirname, 'src/welcome.html'));
}

function createMainWindow() {
  if (mainWindow) {
    mainWindow.close();
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
}

function createThanksWindow() {
  if (thanksWindow) {
    thanksWindow.close();
  }

  thanksWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  thanksWindow.loadFile(path.join(__dirname, 'src/thanks.html'));
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
      createWelcomeWindow();
    } else {
      createMainWindow();
    }
    splashWindow.close();
  } else {
    createLicenseWindow();
    splashWindow.close();
  }
}

app.whenReady().then(() => {
  createSplashWindow();
  setTimeout(checkLicense, 5000);
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
    createWelcomeWindow();
  } else {
    createMainWindow();
  }
});

ipcMain.on('continue-to-main', () => {
  const licenseData = JSON.parse(fs.readFileSync(licenseFilePath));
  licenseData.showWelcome = false;
  fs.writeFileSync(licenseFilePath, JSON.stringify(licenseData));
  createMainWindow();

  
  if (thanksWindow) {
    thanksWindow.close();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
