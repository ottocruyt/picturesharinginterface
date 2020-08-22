const settings = require("../../service/settings");

setTimeout(() => {
  const frequency = settings.get("frequency");
  console.log("testSettingScript2 Freq:", frequency);
}, 10000);
