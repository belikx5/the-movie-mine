import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { mainGreyColor } from '../styles/_common'

const MovieCard = ({ movie }) => {

    const title = movie.title.length > 25 ?  movie.title.slice(0, 22) + '..' : movie.title
    return (
        <View style={styles.container}>
            <Image style={styles.poster} source={movie.backPoster ? {uri:movie.backPoster} : require('../../assets/app-imgs/poster-not-found.jpg')} />
            <View style={styles.movieData}>
                <Text style={styles.movieDataItem}>{title}</Text>
                <Text style={styles.movieDataItem}>|</Text>
                <Text style={styles.movieDataItem}>Rating: {movie.rating}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 200,
        borderWidth: 2,
        borderColor: mainGreyColor,
        borderRadius: 5,
        marginBottom: 10
    },
    poster: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    movieData: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4, 
    },
    movieDataItem: {
        color: '#fff',
        fontSize: 18,
    }
})

export default MovieCard
