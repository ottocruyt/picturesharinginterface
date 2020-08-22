const cron = require('node-cron');
const files = require('./files.js');
const fileLists = require('./filelists.js');
const settings = require('./settings.js');
let currentlyScheduledCronJob;
let everyXminutes = 1;

// ┌────────────── second (optional)
// │   ┌──────────── minute
// │   │ ┌────────── hour
// │   │ │ ┌──────── day of month
// │   │ │ │ ┌────── month
// │   │ │ │ │ ┌──── day of week
// │   │ │ │ │ │
// │   │ │ │ │ │
//(*)  * * * * *

const startup = () => {
  console.log('Starting up crons');
  console.log('Running cron job once on startup');
  cronJob();
  scheduleCrons();
};

const cronJob = async () => {
  downloadAllFilesFromAllVehicles();
};

const scheduleCrons = () => {
  everyXminutes = settings.get('frequency');
  const scheduleFrequency = `*/${everyXminutes} * * * *`;
  currentlyScheduledCronJob = cron.schedule(
    scheduleFrequency,
    async function () {
      checkConfigChange(); // before running the cronjob, check for a change in settings. this only works if set via settings.set if already started.
      cronJob();
    }
  );
  console.log(`Cron job scheduled to run every ${everyXminutes} minutes`);
};

const downloadAllFilesFromAllVehicles = async () => {
  console.log(`${new Date()} -- Started Cron Job`);
  try {
    const filelist = await fileLists.get();
    files.downloadAndUntar(filelist);
  } catch (error) {
    console.log(
      `Problem during filelist cron job: ${error.config.url} -- ${error.response.status}: ${error.response.statusText}`
    );
  }
};

const rescheduleCrons = () => {
  console.log('Rescheduling Cron Job');
  currentlyScheduledCronJob.stop();
  console.log('Stopped Cron Job');
  startup();
};

const checkConfigChange = () => {
  console.log('checking config');
  console.log('everyXminutes: ', everyXminutes);
  const configMinutes = settings.get('frequency');
  console.log('config: ', configMinutes);

  if (everyXminutes != configMinutes) {
    console.log('Detected frequency change.');
    rescheduleCrons();
  }
};

module.exports = {
  startup,
  rescheduleCrons,
};
