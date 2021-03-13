import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { h2, mainActionColor, mainGreyColor } from '../styles/_common'
import {
    fetchMovieDetails,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchMovieDetailsTrailer
} from '../store/actions/moviesActions'
import Container from '../components/Container'
import GenreItem from '../components/GenreItem'
import MovieCardsList from '../components/MovieCardsList'
import CastActorItem from '../components/CastActorItem'

const DetailsScreen = ({
    route,
    selectedMovie,
    fetchMovieDetails,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchMovieDetailsTrailer
}) => {
    console.log('movie', selectedMovie)
    useEffect(() => {
        fetchMovieDetails(299536);
        fetchMovieCast(299536);
        fetchSimilarMovies(299536);
        // fetchMovieDetailsTrailer(11);
    }, [])


    const renderMovieDetails = () => (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.headerContainer}>
                <Image
                    style={styles.headerPoster}
                    source={selectedMovie.poster ? { uri: selectedMovie.poster } : require("../../assets/app-imgs/poster-not-found.jpg")} />
                <LinearGradient
                    colors={["transparent", "rgb(23,23,23)"]}
                    style={styles.headerGradientBackground} />
                <View style={styles.headerGradientBackground}>
                    <Image style={styles.headerPlayIcon} source={require("../../assets/app-imgs/watch-movie-icon.png")} />
                    <Text style={styles.headerMovieTitle}>{selectedMovie.title}</Text>
                </View>
            </View>
            <View style={styles.dataContainer}>
                <View style={styles.dataContainerMain}>
                    <Text style={styles.dataH2}>Genre</Text>
                    <View style={styles.dataGenresList}>
                        {selectedMovie.genres.map(g => <GenreItem key={g.id} genre={g.name} />)}
                    </View>
                    <Text style={styles.dataH2}>Overview</Text>
                    <Text style={styles.dataText}>
                        {selectedMovie.overview}
                    </Text>
                    <View style={styles.dataHorizontalDataList}>
                        <View>
                            <Text style={styles.dataH2}>Release</Text>
                            <Text style={[styles.dataText, styles.dataTextHighlighted]}>
                                {selectedMovie.releaseDate}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.dataH2}>Run Time</Text>
                            <Text style={[styles.dataText, styles.dataTextHighlighted]}>
                                {selectedMovie.runtime}m
                        </Text>
                        </View>
                        <View>
                            <Text style={styles.dataH2}>Budget</Text>
                            <Text style={[styles.dataText, styles.dataTextHighlighted]}>
                                ${selectedMovie.budget}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.dataHomepageContainer}>
                        <Text style={{ ...h2.text, color: mainGreyColor }}>Homepage</Text>
                        <Text style={[
                            styles.dataText,
                            styles.dataTextHighlighted,
                            styles.dataLink,
                            { marginLeft: 15 }
                        ]}>
                            {selectedMovie.homepage.replace(/http(s)?:\/\//, "")}
                        </Text>
                    </View>
                </View>

                {selectedMovie?.cast
                    ? <>
                        <Text style={styles.dataH2}>Casts</Text>
                        <FlatList
                            style={{ marginBottom: 10 }}
                            data={selectedMovie.cast}
                            horizontal
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <CastActorItem actor={item} />}
                        />
                    </>
                    : null
                }
                {selectedMovie?.similarMovies
                    ? <>
                        <MovieCardsList listTitle="Similar Movies" movies={selectedMovie.similarMovies} />
                    </>
                    : null
                }

            </View>
        </ScrollView>
    )

    return (
        <Container>
            {selectedMovie ? renderMovieDetails() : <ActivityIndicator size="small" color={mainActionColor} />}
        </Container>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 260,
        width: '100%'
    },
    headerPoster: {
        height: '100%',
        width: '100%'
    },
    headerGradientBackground: {
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    headerPlayIcon: {
        position: 'absolute',
        top: '40%',
        left: '45%'
    },
    headerMovieTitle: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center'
    },
    dataContainer: {
        marginLeft: 10
    },
    dataContainerMain: {
        paddingRight: 10
    },
    dataH2: {
        ...h2.text,
        color: mainGreyColor,
        marginTop: 10,
    },
    dataText: {
        fontSize: 18,
        color: '#fff'
    },
    dataTextHighlighted: {
        color: mainActionColor
    },
    dataLink: {
        flex: 1,
        flexWrap: 'wrap'
    },
    dataGenresList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dataHorizontalDataList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    dataHomepageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    }
})

const mapStateToProps = state => ({
    selectedMovie: state.movies.selectedMovie
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMovieDetails,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchMovieDetailsTrailer
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)
