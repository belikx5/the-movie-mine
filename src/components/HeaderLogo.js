import React from 'react'
import {Image } from 'react-native'

export default () => {
    return <Image 
        style={{height: 40, width: 60}} 
        source={require('../../assets/app-imgs/TMM-logo-small-light.png')}
    />
}