import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Feather, FontAwesome5  } from '@expo/vector-icons';
import { logo } from '../styles/svgImages'
import { mainBackgroundColor, mainActionColor, btn, link } from '../styles/_common'


const WelcomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <SvgXml xml={logo} />
                <Image style={styles.bigLogo} source={require('../../assets/app-imgs/TMM-logo.png')} />
                <TouchableOpacity style={[btn.wrapper, styles.button]} onPress={() => navigation.navigate('Signin')}>
                    <Feather name="mail" size={24} color={mainActionColor} />
                    <Text style={btn.text}>Sign in with email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[btn.wrapper, styles.button]}>
                    <FontAwesome5 name="facebook" size={24} color="blue" />
                    <Text style={btn.text}>Sign in with Facebook</Text>
                </TouchableOpacity>
                <View style={link.linkBlock}>
                    <Text style={link.linkBlockText}>Need an account?</Text>
                    <TouchableOpacity>
                        <Text style={[link.linkBlockText, link.linkBlockTextAction]}>Sign up!</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: mainBackgroundColor
    },
    content: {
        width: 300,
        marginTop: '50%',
        alignItems: 'center',
        alignSelf: 'center'
    }, 
    bigLogo: {
        width: 286,
        height: 72,
        marginBottom: '70%'
    },
    button: {
        width: 245,
        marginBottom: 10
    }
})

export default WelcomeScreen
