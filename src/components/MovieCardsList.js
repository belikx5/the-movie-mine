import React from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { AntDesign } from '@expo/vector-icons'
import { h2, mainActionColor } from '../styles/_common'
import MovieCard from './MovieCard'

const MovieCardsList = ({
    listTitle = '',
    movies,
    horizontal = true,
    genres,
    selectedGenre,
    setSelectedGenre
}) => {
    const navigation = useNavigation();
    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.push("Details", { movieId: item.id })}>
            <MovieCard movie={item} />
        </Pressable>
    )

    const genreDropdown = () => {
        return (
            <View style={styles.genrePickerWrapper}>
                <AntDesign
                    style={styles.genrePickerIcon}
                    name="caretdown"
                    size={15}
                    color={mainActionColor} />
                <Picker
                    style={styles.genrePicker}
                    mode="dropdown"
                    selectedValue={selectedGenre}
                    onValueChange={itemValue => {
                        setSelectedGenre(itemValue)
                    }}>
                    {genres.map(g => {
                        return <Picker.Item key={g.id} label={g.name} value={g.id} />
                    })}
                </Picker>
            </View>

        )
    }
    return (
        <View style={styles.container}>
            <Text style={h2.text}>{listTitle}</Text>
            {genres ? genreDropdown() : null}
            <FlatList
                style={styles.moviesList}
                data={movies}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                horizontal={horizontal}
                initialNumToRender={4}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        marginBottom: 20
    },
    moviesList: {
        alignSelf: 'center',
    },
    genrePickerWrapper: {
        width: '45%',
    },
    genrePickerIcon: {
        position: 'absolute',
        bottom: 18,
        right: 17,
        zIndex: 10
    },
    genrePicker: {
        color: mainActionColor,
    }
})

export default MovieCardsList
