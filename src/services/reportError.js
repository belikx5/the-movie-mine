import { setErrorHandler } from 'expo-error-log/setErrorHandler.js'
import firebase from '../config/firebase'

const reportToFirebase = error => {
    firebase.firestore()
    .collection('errors')
    .add(error)
}

setErrorHandler({
    cb: reportToFirebase
})