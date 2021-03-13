import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { mainActionColor, mainHeaderColor } from '../styles/_common'

const Header = ({ title, headerRight }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {headerRight}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 45,
        backgroundColor: mainHeaderColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10
    },
    title: {
        fontSize: 22,
        color: mainActionColor,
        marginLeft: 16
    },
})

export default Header
