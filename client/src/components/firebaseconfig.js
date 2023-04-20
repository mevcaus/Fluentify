const { initializeApp } = require('firebase/app');
const { getAuth, GoogleAuthProvider, signInWithPopup } = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyCtilWZSba7y-cVjuJeJGoILGErUuUVhd4',
  authDomain: 'fluentify-649b5.firebaseapp.com',
  projectId: 'fluentify-649b5',
  storageBucket: 'fluentify-649b5.appspot.com',
  messagingSenderId: '803417376832',
  appId: '1:803417376832:web:399a880ede6a5d43c4b7a5',
  measurementId: 'G-2WDRY2TWB3',
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const googleSignup = () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider)
    .then((res) => res.user)
    .catch((err) => {
      console.error(err);
    });
};
