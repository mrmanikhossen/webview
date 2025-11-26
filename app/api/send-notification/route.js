// pages/api/send-notification.js
export async function POST(req, res) {
  const serverKey =
    process.env.FCM_SERVER_KEY ||
    "BMIDrI71SvqvTNvqmyo1mAggxfsUAp7N43jemRrmY7y9sMwEGUuaUkXptDko32ikptuSS8AyjGDekc_EArQPtNw";

  const message = {
    to: "/topics/all",
    notification: {
      title: "Hello!",
      body: "This is a broadcast notification.",
    },
  };

  const response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `key=${serverKey}`,
    },
    body: JSON.stringify(message),
  });

  const data = await response.json();
  return res.status(200).json(data);
}
