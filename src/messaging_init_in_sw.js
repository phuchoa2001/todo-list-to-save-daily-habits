import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCHqtj50ByeLd35h7dbcPpcKB4CNMWPTq8",
  authDomain: "thongbao-3d02a.firebaseapp.com",
  projectId: "thongbao-3d02a",
  storageBucket: "thongbao-3d02a.appspot.com",
  messagingSenderId: "8099311455",
  appId: "1:8099311455:web:7dddb3fe7f7203381bd0ea",
  measurementId: "G-PJRTQR5F22"
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);

      getToken(messaging, {
        vapidKey:
          "BDwa-HOYf7np3F553qcg1845dOIqJzGuuzyclxhZtyLh-qpTmqvcKvJKDYd2nPJIFMzNKHTFjv_aY7ssfci-2-A",
      }).then((currentToken) => {
        console.log("currentToken" , currentToken);
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();