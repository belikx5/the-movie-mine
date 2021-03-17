import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import Constants from 'expo-constants'

const { extra } = Constants.manifest;
const firebaseConfig = {
    apiKey: extra.apiKey,
    authDomain: extra.authDomain,
    projectId: extra.projectId,
    storageBucket: extra.storageBucket,
    messagingSenderId: extra.messagingSenderId,
    appId: extra.appId
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
}


export default firebase;