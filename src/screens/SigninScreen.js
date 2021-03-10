import React from 'react'
import { View } from 'react-native'
import AuthForm from '../components/AuthForm'
import { mainBackgroundColor } from '../styles/_common'

const AuthScreen = () => {
    return (
        <View style={{ backgroundColor: mainBackgroundColor, flex: 1 }}>
            <AuthForm />
        </View>
    )
}

export default AuthScreen
