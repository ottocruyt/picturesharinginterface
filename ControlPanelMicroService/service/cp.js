'use strict';
var control = require('control-panel');
let cpDiv = document.getElementById('cp');

window.onload;

var panel = control(
  [
    {
      type: 'range',
      label: 'Log polling interval in minutes',
      min: 1,
      max: 60,
      step: 1,
      scale: 'linear',
      initial: 5,
    },
    { type: 'text', label: 'Listing Service Port', initial: '3001' },
    { type: 'text', label: 'Download Service Port', initial: '3002' },
    { type: 'text', label: 'comma separated IP List', initial: '[]' },

    {
      type: 'button',
      label: 'Save configuration',
      action: function () {
        saveConfiguration();
      },
    },
  ],
  {
    theme: 'dark',
    position: 'undefined',
    root: cpDiv,
    title: 'Picture Sharing Interface Control Panel',
    width: 600,
  }
);

function saveConfiguration() {
  //const validationOK = validate();
  //if (validationOK){
  //    try {
  //        createJSON();
  //        saveJSON();
  //        triggerReload();
  alert('config saved');
  //    } catch (error) {
  //        alert(error.message);
  //    }
  //}
}
