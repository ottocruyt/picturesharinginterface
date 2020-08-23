"use strict";
const HOST = "localhost";
const PORT = 3003;
const API_ENDPOINT = "settings";
var control = require("control-panel");
const axios = require("axios");
let cpDiv = document.getElementById("cp");
const labels = {
  frequency: "Log polling interval in minutes",
  ports: {
    filelist: "Filelist Service Port",
    download: "Download Service Port",
  },
  iplist: "comma separated IP List",
};
let panel;
let options;
let newOptions;
(async () => {
  const response = await getConfigurationFromCronService();
  options = response.data;
  console.log(options);
  setUpControlPanel();
})();

function setUpControlPanel() {
  panel = control(
    [
      {
        type: "range",
        label: labels.frequency,
        min: 1,
        max: 60,
        step: 1,
        scale: "linear",
        initial: options.frequency,
      },
      {
        type: "text",
        label: labels.ports.filelist,
        initial: options.ports.filelist,
      },
      {
        type: "text",
        label: labels.ports.download,
        initial: options.ports.download,
      },
      { type: "text", label: labels.iplist, initial: options.iplist },

      {
        type: "button",
        label: "Save configuration",
        action: function () {
          saveConfiguration();
        },
      },
    ],
    {
      theme: "dark",
      position: "undefined",
      root: cpDiv,
      title: "Picture Sharing Interface Control Panel",
      width: 600,
    }
  );
}

async function getConfigurationFromCronService() {
  const url = `http://${HOST}:${PORT}/${API_ENDPOINT}`;
  const options = await axios.get(url);
  return options;
}

function saveConfiguration() {
  getOptionsFromForm();
  const validation = validate();
  if (validation.OK) {
    try {
      postNewConfiguration();
      alert("Config saved.");
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert(validation.message);
  }
}

function getOptionsFromForm() {
  let iplistFromForm;
  if (!Array.isArray(panel.state[labels.iplist])) {
    iplistFromForm = panel.state[labels.iplist].split(",");
  } else {
    iplistFromForm = panel.state[labels.iplist];
  }
  newOptions = {
    iplist: iplistFromForm,
    frequency: parseInt(panel.state[labels.frequency]),
    ports: {
      filelist: parseInt(panel.state[labels.ports.filelist]),
      download: parseInt(panel.state[labels.ports.download]),
    },
  };
}

function setOptionsInForm(optionsToSet) {
  panel.state[labels.iplist] = optionsToSet.iplist;
  panel.state[labels.frequency] = optionsToSet.frequency;
  panel.state[labels.ports.filelist] = optionsToSet.ports.filelist;
  panel.state[labels.ports.download] = optionsToSet.ports.download;
}

function validate() {
  const ports = validatePorts();
  const freq = validateFrequency();
  const iplist = validateIplist();
  return {
    OK: ports.OK && freq.OK && iplist.OK,
    message: `${ports.message} ${freq.message} ${iplist.message}`,
  };
}

function validatePorts() {
  const validation = {
    OK: true,
    message: "",
  };
  if (isNaN(newOptions.ports.filelist) || isNaN(newOptions.ports.download)) {
    validation.message = "Ports need to be a number.";
    validation.OK = false;
    return validation;
  }
  if (newOptions.ports.filelist < 0 || newOptions.ports.download < 0) {
    validation.message = "Ports need to be a positive number";
    validation.OK = false;
    return validation;
  }
  return validation;
}

function validateFrequency() {
  const validation = {
    OK: true,
    message: "",
  };
  if (isNaN(newOptions.frequency)) {
    validation.message = "Polling frequency needs to be a number.";
    validation.OK = false;
    return validation;
  }
  if (newOptions.frequency < 1) {
    validation.message = "Polling frequency needs to be at least every minute";
    validation.OK = false;
    return validation;
  }
  return validation;
}
function validateIplist() {
  const validation = {
    OK: true,
    message: "",
  };
  if (!Array.isArray(newOptions.iplist)) {
    validation.OK = false;
    validation.message = "IP List needs to be an array of comma seperated IPs.";
    return validation;
  }
  if (!newOptions.iplist.every(isIp)) {
    validation.OK = false;
    validation.message = "Not every IP is a valid IP.";
    return validation;
  }
  return validation;
}

const isIp = (ip) => {
  //
  const regex = new RegExp(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
  let checkedIp = ip.match(regex);
  return checkedIp !== null;
};

async function postNewConfiguration() {
  const url = `http://${HOST}:${PORT}/${API_ENDPOINT}`;
  const response = await axios.post(url, newOptions);
  console.log("Updated options:", response.data);
  options = response.data;
  setOptionsInForm(response.data);
}
