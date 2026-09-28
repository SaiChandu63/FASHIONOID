window.FASHIONOID_API_URL = 'https://fashionoid.onrender.com/api';
/* FASHIONOID Firebase Web App configuration */
window.FASHIONOID_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBFe0NK-NRURSBsM4gYLvJpyi8rljnm-YY',
  authDomain: 'fashionoid-b4888.firebaseapp.com',
  projectId: 'fashionoid-b4888',
  storageBucket: 'fashionoid-b4888.firebasestorage.app',
  messagingSenderId: '624525081312',
  appId: '1:624525081312:web:5b5261a9bbc6cae6e06e85'
};
if(window.firebase && !firebase.apps.length){
  firebase.initializeApp(window.FASHIONOID_FIREBASE_CONFIG);
}