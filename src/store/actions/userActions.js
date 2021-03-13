import firebase from '../../config/firebase'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ERROR, AUTH_SUCCESS, FETCH_USER, SIGN_OUT, SIGN_UP, CLEAR_ERROR } from '../actionTypes';

export const tryLocalSignin = (onSuccess, onError) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({type: AUTH_SUCCESS});
        onSuccess();
    } else {
        onError();
    }
}

export const signIn = (email, password, onSuccess, onError) => dispatch => {
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(async res => {
            const token = res.user?.uid;
            await AsyncStorage.setItem('token', token || '');
            dispatch({ type: AUTH_SUCCESS })
            onSuccess()
            //navigate('Welcome')
        }).catch(err => {
            dispatch({ type: AUTH_ERROR, payload: err.code });
            onError();
        })
}

export const signUp = (email, password, onSuccess, onError) => dispatch => {
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async res => {
            const token = res.user?.uid;
            await AsyncStorage.setItem('token', token || '');
            const user = {
                uid: res.user?.uid,
                avatar: '',
                nickname: email,
                email,
            }
            firebase.firestore()
                .collection('users')
                .doc(res.user?.uid)
                .set(user)
                .then(() => {
                    dispatch({ type: SIGN_UP, payload: user })
                    onSuccess();
                })
        })
        .catch(err => {
            dispatch({ type: AUTH_ERROR, payload: err.code });
            onError();
        })
}

export const signOut = () => dispatch => {
    firebase.auth()
        .signOut()
        .then(async () => {
            await AsyncStorage.removeItem('token');
            dispatch({ type: SIGN_OUT });
        })
}

export const fetchUser = () => dispatch => {
    firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser?.uid)
        .get()
        .then(doc => {
            const user = {
                uid: '',
                avatar: '',
                nickname: '',
                email: '',
            }
            if (doc.exists) {
                const data = doc.data();
                user.uid = data.uid;
                user.avatar = data.avatar;
                user.nickname = data.nickname;
                user.email = data.email;
                dispatch({ type: FETCH_USER, payload: user });
            } else {
                dispatch({ type: FETCH_USER, payload: user });
            }
        })
}

export const clearAuthError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR })
}