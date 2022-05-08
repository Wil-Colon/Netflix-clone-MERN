import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyA1g9Zr3o18LSThKZ3vz823RFi6Wj-rf9c',
    authDomain: 'netflix-mern-ba5db.firebaseapp.com',
    projectId: 'netflix-mern-ba5db',
    storageBucket: 'netflix-mern-ba5db.appspot.com',
    messagingSenderId: '348512953618',
    appId: '1:348512953618:web:014287c8d351c3750a7fcb',
    measurementId: 'G-P9S46EP1QW',
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export default storage;
