const settings = require("../../service/settings");

settings.set("frequency", 2);
const frequency = settings.get("frequency");
console.log("testSettingScript1 Freq:", frequency);
