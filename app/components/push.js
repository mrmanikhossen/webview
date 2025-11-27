import { PushNotifications } from "@capacitor/push-notifications";

let tokenCallback = null;

export function onToken(callback) {
  tokenCallback = callback;
}

export async function initPush() {
  let perm = await PushNotifications.checkPermissions();

  if (perm.receive !== "granted") {
    perm = await PushNotifications.requestPermissions();
  }

  if (perm.receive === "granted") {
    await PushNotifications.register();
  }

  PushNotifications.addListener("registration", (token) => {
    console.log("🔥 Token:", token.value);
    if (tokenCallback) tokenCallback(token.value);
  });
}
