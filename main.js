const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const si = require('systeminformation');

const userDataPath = path.join(os.homedir(), 'disk-def');
const licenseFilePath = path.join(userDataPath, 'license.json');

let mainWindow = null;

function createWindow() {
  if (mainWindow) {
    mainWindow.close();
  }

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    resizable: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.on('enter-full-screen', () => {
    mainWindow.setFullScreen(false);
  });

  mainWindow.on('leave-full-screen', () => {
    mainWindow.setFullScreen(false);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile(path.join(__dirname, 'src/splash.html'));

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') {
      event.preventDefault();
    }
    if ((input.key === 'R' && input.control) || (input.key === 'R' && input.meta)) {
      event.preventDefault();
    }
  });
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

async function getSystemInfo() {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const disk = await si.diskLayout();
    const temperature = await si.temperatures();
    const tempFilesSize = checkTempFilesSize();

    return { cpu, memory, disk, temperature, tempFilesSize };
  } catch (error) {
    console.error('Error fetching system info:', error);
    return { error: error.message };
  }
}

function checkTempFilesSize() {
  const tempPath = os.tmpdir();
  try {
    const files = fs.readdirSync(tempPath);
    let totalSize = 0;
    files.forEach(file => {
      const filePath = path.join(tempPath, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    });
    return totalSize / (1024 * 1024 * 1024); 
  } catch (error) {
    console.error('Error checking temp files size:', error);
    return 0;
  }
}

function cleanTempFiles() {
  const tempPath = os.tmpdir();
  try {
    const files = fs.readdirSync(tempPath);
    files.forEach(file => {
      const filePath = path.join(tempPath, file);
      fs.unlinkSync(filePath);
    });
    console.log('Temporary files cleaned.');
    return true;
  } catch (error) {
    console.error('Error cleaning temp files:', error);
    return false;
  }
}

app.whenReady().then(() => {
  createWindow();
  setTimeout(checkLicense, 2500);

  globalShortcut.register('Ctrl+Shift+I', () => {
    mainWindow.webContents.openDevTools();
  });

  globalShortcut.register('F11', () => {

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

ipcMain.on('license-valid', async () => {
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

ipcMain.handle('get-system-info', async () => {
  return await getSystemInfo();
});

ipcMain.handle('clean-temp-files', async () => {
  return cleanTempFiles();
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
