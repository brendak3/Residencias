/*Require from Electron.js*/
const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron')
/*Requires from Node.js*/
const url = require('url');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//Main Window
let win
//Modal Window LEGACY
let child

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    title: 'E.E.G. DataSet ITT Index',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // child = new BrowserWindow({ parent: win, modal: true, show: false })

  // and load the index.html of the app.
  //win.loadFile('views/index.html')
  // child.loadURL(url.format({
  //   pathname: path.join(__dirname, 'views/index.html'),
  //   protocol: 'file',
  //   slashes: true
  // }))
  //Maximizar la pantalla

  /*Load the html for the view*/
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file',
    slashes: true
  }))

  // child.once('ready-to-show', () => {
  //   child.show()
  // })

  // Open the DevTools.
  win.webContents.openDevTools()

  /*Navigation menu for the main window*/
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);

  /*Agrego un listener a la combinacion CMD+Q si se trata de macos*/
  // if (process.platform === 'darwin') {
  //   globalShortcut.register('Command+Q', () => {
  //     app.quit();
  //   })
  // }

  // Emitted when the window is closed.
  // child.on('closed', () => {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   win = null
  //
  //   /*El del video*/
  //   //app.quit();
  // })

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null

    /*El del video*/
    //app.quit();
  })
}


/*El arreglo con las opciones*/
const templateMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Test',
        accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
        click: () =>{
          createNewWindow();
          console.log('Entro')
        }
      },
      {
        label:'Calibrate Board',
        accelerator: process.platform === 'darwin' ? 'Command+A' : 'Ctrl+A',
        click: () =>{
          AltaWindow();
        }
      },
      {
        label: 'Exit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click: () => {
            app.quit();
            console.log(process.platform)
          }
      }
    ]
  }
]

//If the OS is macOS
if (process.plataform === 'darwin') {
  templateMenu.unshift({
    label: app.getName()
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
    console.log('Entro al metodo');
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//Window for making a new test
let newWindow
/*Para crear una nueva ventana*/
function createNewWindow(){
  /*Crea una nueva ventana*/
  newWindow = new BrowserWindow({
    parent: win,
    width: 1000,
    height: 800,
    title: 'New Window',
    webPreferences: {
      nodeIntegration: true
    }
  });

  newWindow.webContents.openDevTools()

  /*Quits the menu labels*/
  newWindow.setMenu(null);
  /*Loads the new view*/
  newWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/test.html'),
    protocol: 'file',
    slashes: true
  }));

  // Attach event listener to event that requests to update something in the second window
  // from the first window
  ipcMain.on('request-update-label-in-second-window', (event, arg) => {
      // Request to update the label in the renderer process of the second window
      secondWindow.webContents.send('action-update-label', arg);
  });


  /*For closing the emergent window*/
  newWindow.on('close', () => {
    newWindow = null;
  });
}

//Window for calibrating the board
let altaWindow
/*Para crear una nueva ventana*/
function AltaWindow(){
  /*Crea una nueva ventana*/
  altaWindow = new BrowserWindow({
    parent: win,
    width: 800,
    height: 600,
    title: 'Alta Usuario',
    webPreferences: {
      nodeIntegration: false
    }
  });
  /*Quitar el menu*/
  altaWindow.setMenu(null);
  /*Carga la nueva vista*/
  altaWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/altausuario.html'),
    protocol: 'file',
    slashes: true
  }));
  /*Para solo cerrar la ventana emergente. Se limpia la ventana creada*/
  altaWindow.on('close', () => {
    altaWindow = null;
  });
}
