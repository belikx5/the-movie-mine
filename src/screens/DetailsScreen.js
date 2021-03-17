import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useRoute } from '@react-navigation/native'
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { errorColor, h2, mainActionColor, mainGreyColor } from '../styles/_common'
import {
    fetchMovieDetails,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchMovieDetailsTrailer
} from '../store/actions/moviesActions'
import {
    addToWatchList,
    removeFromWatchList
} from '../store/actions/userActions'
import { savePosterToDevice } from '../services/savePhotoToDevice'

import Container from '../components/Container'
import GenreItem from '../components/GenreItem'
import MovieCardsList from '../components/MovieCardsList'
import CastActorItem from '../components/CastActorItem'
import VideoPlayer from '../components/VideoPlayer'

const DetailsScreen = ({
    selectedMovie,
    watchlist,
    fetchMovieDetails,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchMovieDetailsTrailer,
    addToWatchList,
    removeFromWatchList
}) => {

    const [playVideo, setPlayVideo] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [savingPoster, setSavingPoster] = useState(false);
    const route = useRoute();
    const id = route.params.movieId;

    useEffect(() => {
        if (!selectedMovie || (selectedMovie && selectedMovie.id !== id)) {
            fetchMovieData();
        }
    }, [])

    const onSavePoster = () => {
        setSavingPoster(true);
        savePosterToDevice(
            selectedMovie.title,
            selectedMovie.poster,
            () => setSavingPoster(false)
        );
    }

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            fetchMovieData();
            setRefreshing(false);
        }, 1500)
    }

    const fetchMovieData = () => {
        fetchMovieDetails(id);
        fetchMovieCast(id);
        fetchSimilarMovies(id);
        fetchMovieDetailsTrailer(id);
    }

    const renderRefreshControl = () => <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

    const renderSavePosterButton = () => {
        if (savingPoster) return <ActivityIndicator size="large" color={mainActionColor} />
        else return <TouchableOpacity onPress={onSavePoster}>
            <Feather style={styles.actionsItem} name="download" size={30} color={mainActionColor} />
        </TouchableOpacity>
    }

    const renderWatchlistActon = () => {
        if (watchlist.filter(w => w.id === selectedMovie.id).length > 0)
            return (
                <TouchableOpacity onPress={() => removeFromWatchList(selectedMovie.id)}>
                    <MaterialCommunityIcons style={styles.actionsItem} name="playlist-remove" size={32} color={errorColor} />
                </TouchableOpacity>
            )
        else
            return (
                <TouchableOpacity onPress={() => addToWatchList(selectedMovie)}>
                    <Entypo style={styles.actionsItem} name="plus" size={32} color="#52FF00" />
                </TouchableOpacity>

            )
    }

    const renderMovieDetails = () => (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={renderRefreshControl()} >
            <View style={styles.headerContainer}>
                {playVideo
                    ? <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => setPlayVideo(false)} style={styles.closeVideoPlayerIcon}>
                            <AntDesign name="closecircleo" size={26} color={mainActionColor} />
                        </TouchableOpacity>
                        <VideoPlayer videoUrl={selectedMovie.trailerUrl} />
                    </View>
                    : <>
                        <Image
                            style={styles.headerPoster}
                            source={selectedMovie.poster ? { uri: selectedMovie.poster } : require("../../assets/app-imgs/poster-not-found.jpg")} />
                        <LinearGradient
                            colors={["transparent", "rgb(23,23,23)"]}
                            style={styles.headerGradientBackground} />
                        <View style={styles.headerGradientBackground}>
                            {selectedMovie.trailerUrl
                                ? <TouchableOpacity onPress={() => setPlayVideo(true)} style={styles.headerPlayIcon} >
                                    <Image source={require("../../assets/app-imgs/watch-movie-icon.png")} />
                                </TouchableOpacity>
                                : null
                            }
                            <Text style={styles.headerMovieTitle}>{selectedMovie.title}</Text>
                        </View>
                    </>
                }
            </View>
            <View style={styles.dataContainer}>
                <View style={styles.dataContainerMain}>
                    <View style={styles.dataContainerActions}>
                        <Text style={styles.dataH2}>Genre</Text>
                        <View style={styles.actions}>
                            {renderWatchlistActon()}
                            {renderSavePosterButton()}
                        </View>
                    </View>
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
                        {selectedMovie.homepage
                            ? (<>
                                <Text style={{ ...h2.text, color: mainGreyColor }}>Homepage</Text>
                                <Text style={[
                                    styles.dataText,
                                    styles.dataTextHighlighted,
                                    styles.dataLink,
                                    { marginLeft: 15 }
                                ]}>
                                    {selectedMovie.homepage.replace(/http(s)?:\/\//, "")}
                                </Text>
                            </>
                            )
                            : null
                        }
                    </View>
                </View>

                {selectedMovie?.cast?.length
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
                {selectedMovie?.similarMovies?.length
                    ? <MovieCardsList listTitle="Similar Movies" movies={selectedMovie.similarMovies} />
                    : null
                }

            </View>
        </ScrollView>
    )

    return (
        <Container>
            {selectedMovie && selectedMovie.id === id
                ? renderMovieDetails()
                : <ActivityIndicator style={{ marginTop: '20%' }} size="large" color={mainActionColor} />
            }
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
    closeVideoPlayerIcon: {
        position: 'absolute',
        top: '5%',
        right: '1%',
        zIndex: 10
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
    dataContainerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionsItem: {
        marginTop: 10,
        marginLeft: 10
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
    selectedMovie: state.movies.selectedMovie,
    watchlist: state.user.watchlist
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMovieDetails,
    fetchMovieCast,
    fetchSimilarMovies,
    fetchMovieDetailsTrailer,
    addToWatchList,
    removeFromWatchList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)
