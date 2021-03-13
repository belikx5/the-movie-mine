import React from 'react'
import { View, Dimensions } from 'react-native'
import { mainBackgroundColor } from '../styles/_common'

const Container = ({ children }) => {
    return (
        <View style={{ backgroundColor: mainBackgroundColor, flex: 1}}>
            {children}
        </View>
    )
}

export default Container
