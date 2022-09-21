import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// var firebaseConfig =  {
//     apiKey: "AIzaSyCQTAopyrqBIJIXt-eQ9KPejTOzU1zABFE",
//     authDomain: "otp-app-demo-b0ae0.firebaseapp.com",
//     projectId: "otp-app-demo-b0ae0",
//     storageBucket: "otp-app-demo-b0ae0.appspot.com",
//     messagingSenderId: "207731686800",
//     appId: "1:207731686800:web:7caf8a0ad6de7f8b2e0715"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyDuL9rQW0bmHj-hqBltthA4cctqCu9SHOs",
    authDomain: "otp-app-demo-a640e.firebaseapp.com",
    projectId: "otp-app-demo-a640e",
    storageBucket: "otp-app-demo-a640e.appspot.com",
    messagingSenderId: "164679870782",
    appId: "1:164679870782:web:5ca58d278e758abe92e46f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase