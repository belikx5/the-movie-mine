import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    fetchGenres,
    fetchNowPlaying,
    fetchTopRated,
    fetchMoviesByGenre,
    findMoviesByName
} from '../store/actions/moviesActions'
import Container from '../components/Container'
import MovieCardsList from '../components/MovieCardsList'
import SeacrhBar from '../components/SearchBar'


const HomeScreen = ({
    movies,
    fetchGenres,
    fetchNowPlaying,
    fetchTopRated,
    fetchMoviesByGenre,
    findMoviesByName
}) => {
    const [selectedGenre, setSelectedGenre] = useState(28);
    const [searchTerm, setSearchTerm] = useState('');

    console.log(movies.searchMovies)
    useEffect(() => {
        //     fetchNowPlaying();
        //    fetchTopRated();
        fetchGenres();
        fetchMoviesByGenre(selectedGenre);
    }, [])
    
    useEffect(() => {
        findMoviesByName(searchTerm);
    }, [searchTerm])

    useEffect(() => {
        fetchMoviesByGenre(selectedGenre);
    }, [selectedGenre])

    const renderMainFlow = () => {
        return (<ScrollView>
            <MovieCardsList listTitle="Now playing" movies={movies.nowPlaying} />
            <MovieCardsList listTitle="Top rated" movies={movies.topRated} />
            <MovieCardsList
                listTitle="By genre"
                movies={movies.byGenre}
                genres={movies.genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
            />
        </ScrollView>)
    }
    const renderSearchFlow = () => <View style={{ flex: 1, marginHorizontal: 10}}>
        <MovieCardsList horizontal={false} movies={movies.searchMovies} />
    </View>

    return (
        <Container>
            <SeacrhBar setSearchTerm={setSearchTerm} />
            {searchTerm ? renderSearchFlow() : renderMainFlow()}
        </Container>
    )
}

const mapStateToProps = (state) => ({
    movies: state.movies
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchGenres,
    fetchNowPlaying,
    fetchTopRated,
    fetchMoviesByGenre,
    findMoviesByName
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
