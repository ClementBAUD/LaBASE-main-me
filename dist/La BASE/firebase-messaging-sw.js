importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js');


// Chek
// firebase.initializeApp({
//   apiKey: "AIzaSyB54xH8A190fTYq2IdFe2MVdDdgoSSLS1c",
//   authDomain: "labase-2a742.firebaseapp.com",
//   projectId: "labase-2a742",
//   storageBucket: "labase-2a742.appspot.com",
//   messagingSenderId: "26421304097",
//   appId: "1:26421304097:web:3a173cdf75c7e0162bbc60",
//   measurementId: "G-165VM5BYTL"
// });

// PROD
firebase.initializeApp({
  apiKey: "AIzaSyAsd5ODmTBGSc9NY2G2uGnK3fsHVpXjwIQ",
  authDomain: "base-a51b1.firebaseapp.com",
  projectId: "base-a51b1",
  storageBucket: "base-a51b1.appspot.com",
  messagingSenderId: "324295242104",
  appId: "1:324295242104:web:484228f1a08faea69b588d",
  measurementId: "G-RT18276PHV"

});
const messaging = firebase.messaging();
