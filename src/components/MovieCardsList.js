import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { h2, mainActionColor, mainBackgroundColor } from '../styles/_common'
import MovieCard from './MovieCard'

const MovieCardsList = ({
    listTitle = '',
    movies,
    horizontal = true,
    genres,
    selectedGenre,
    setSelectedGenre
}) => {

    const renderItem = ({ item }) => <MovieCard movie={item} />

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
                    itemStyle={{
                        backgroundColor: 'green',
                        marginLeft: 0,
                        paddingLeft: 15
                    }}
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
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%'
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
