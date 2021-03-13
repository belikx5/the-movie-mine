import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { mainGreyColor } from '../styles/_common'

const GenreItem = ({ genre }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{genre}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 25,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderColor: mainGreyColor,
        borderWidth: 1,
        marginBottom: 5,
        marginRight: 5
    },
    text: {
        fontSize: 18,
        lineHeight: 24,
        color: mainGreyColor
    }
})

export default GenreItem
