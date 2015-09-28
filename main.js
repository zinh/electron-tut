'use strict';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var mainWindow = null;
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
app.on('ready', function() {
  mainWindow = new BrowserWindow({
             width: 700,
             height: 368,
             frame: false,
             resizable: false
  });
  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
  // mainWindow.openDevTools();
  mainWindow.show();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
