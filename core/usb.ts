import "https://deno.land/x/webusb@0.5.0/mod.ts";

const devices = await navigator.usb.getDevices();

devices.forEach((device) => console.log(device.deviceId));