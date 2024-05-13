// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA81402-AlR-ZxF-jbxGQ70plx_VKhMKhc',
  authDomain: 'workwise-b9e56.firebaseapp.com',
  projectId: 'workwise-b9e56',
  storageBucket: 'workwise-b9e56.appspot.com',
  messagingSenderId: '996024000310',
  appId: '1:996024000310:web:1be0f897d41124fba2dd97',
  measurementId: 'G-NMF9WWPSFB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
