import { PushNotifications } from "@capacitor/push-notifications";

export async function initPush() {
  try {
    console.log("🔥 initPush() EXECUTED");

    // Check & request permissions
    let perm = await PushNotifications.checkPermissions();
    if (perm.receive !== "granted") {
      perm = await PushNotifications.requestPermissions();
    }

    if (perm.receive === "granted") {
      await PushNotifications.register();
    }

    // Show token in popup
    PushNotifications.addListener("registration", (token) => {
      console.log("🔥 FCM Token:", token.value);
      alert("FCM Token:\n\n" + token.value); // <--- HERE
    });

    // Errors
    PushNotifications.addListener("registrationError", (error) => {
      console.error("FCM Registration Error", error);
      alert("FCM Registration Error:\n" + JSON.stringify(error));
    });
  } catch (err) {
    console.error("Push init error:", err);
    alert("Push Init Error:\n" + err.message);
  }
}
