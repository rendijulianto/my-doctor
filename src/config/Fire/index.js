import * as firebase from 'firebase/app';
import {} from 'firebase/auth';
import {} from 'firebase/database';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  databaseURL: '',
  appId: '',
};

// Initialize Firebase
const Fire = firebase.initializeApp(firebaseConfig);

export default Fire;
