import React from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { mainActionColor, mainGreyColor } from '../styles/_common'

const CastActorItem = ({ actor }) => {
    return (
        <View style={styles.itemContaner}>
            <Image style={styles.itemImage} source={actor.image ? { uri: actor.image} : require("../../assets/app-imgs/actor-not-found.jpg")} />
            <LinearGradient
                colors={["transparent", "rgb(23,23,23)"]}
                style={styles.itemGradientBackground}/>
            <View style={[styles.itemGradientBackground, styles.itemDataContainer]}>
                <Text style={styles.itemDataName}>{actor.name}</Text>
                <Text style={[styles.itemDataName, styles.itemDataSeparator]}>__</Text>
                <Text style={[styles.itemDataName, styles.itemDataNickname]}>{actor.character}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContaner: {
        height: 220,
        width: 140,
        marginRight: 10
    },
    itemImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
        borderBottomRightRadius: 35,
        borderBottomLeftRadius: 35
    },
    itemGradientBackground: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        borderRadius: 50,
        borderBottomRightRadius: 35,
        borderBottomLeftRadius: 35
    },
    itemDataContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    itemDataName: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    },
    itemDataSeparator: {
        color: mainActionColor
    },
    itemDataNickname: {
        color: mainGreyColor,
        marginBottom: 10
    }
})

export default CastActorItem
