"use client";

import { useEffect } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

export default function PushSetup() {
  useEffect(() => {
    // Step 1: Ask for permission
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        PushNotifications.register();
      }
    });

    // Step 2: Listen for registration success
    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration success, token:", token.value);
    });

    PushNotifications.addListener("registration", async (token) => {
      await fetch(
        `https://iid.googleapis.com/iid/v1/${token.value}/rel/topics/all`,
        {
          method: "POST",
          headers: {
            Authorization: "key=YOUR_LEGACY_SERVER_KEY",
          },
        }
      );
    });
    // Step 3: Errors
    PushNotifications.addListener("registrationError", (err) => {
      console.error("Push registration error:", err.error);
    });

    // Step 4: Notification received while app is open
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Push received:", notification);
      }
    );

    // Step 5: Notification tapped by user
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log("Push action:", notification);
      }
    );
  }, []);

  return null;
}
