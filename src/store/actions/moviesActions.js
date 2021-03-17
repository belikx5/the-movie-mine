import tmdb from '../../config/tmdbApi'
import {
    FETCH_NOW_PLAYING,
    FETCH_TOP_RATED,
    FETCH_GENRES,
    FETCH_MOVIES_BY_GENRE,
    FETCH_MOVIES_BY_NAME,
    FETCH_MOVIE_DETAILS,
    FETCH_MOVIE_TRAILER,
    FETCH_SIMILAR_MOVIES,
    FETCH_MOVIE_CAST
} from '../actionTypes'

const POSTER_URL = 'https://image.tmdb.org/t/p/original';
const YOUTUBE_URL = 'https://www.youtube.com/embed/';

export const fetchMovieDetails = movieId => async dispatch => {
    try {
        const { data } = await tmdb.get(`/movie/${movieId}`);
        const poster = data['poster_path'] !== null ? POSTER_URL + data['poster_path'] : '';
        const backPoster = data['backdrop_path'] !== null ? POSTER_URL + data['backdrop_path'] : poster;
        const movie = {
            title: data['title'],
            id: data['id'],
            budget: data['budget'],
            genres: data['genres'],
            homepage: data['homepage'],
            overview: data['overview'],
            rating: data['vote_average'],
            poster,
            backPoster,
            releaseDate: data['release_date'],
            runtime: data['runtime'],
        }
        dispatch({ type: FETCH_MOVIE_DETAILS, payload: movie });
    } catch (error) {
        dispatch({ type: FETCH_MOVIE_DETAILS, payload: null });
    }
}

export const fetchMovieCast = movieId => async dispatch => {
    try {
        const { data } = await tmdb.get(`/movie/${movieId}/credits`);
        const cast = data['cast'].length > 20 ? data['cast'].slice(0, 20) : data['cast'];
        const modifiedCast = cast.map(c => {
            const image = c['profile_path'] !== null ? POSTER_URL + c['profile_path'] : '';
            return {
                id: c['id'],
                name: c['name'],
                character: c['character'],
                image
            }
        });
        dispatch({ type: FETCH_MOVIE_CAST, payload: modifiedCast });
    } catch (error) {
        dispatch({ type: FETCH_MOVIE_CAST, payload: [] });
    }
}
export const fetchMovieDetailsTrailer = movieId => async dispatch => {
    try {
        const { data } = await tmdb.get(`/movie/${movieId}/videos`);
        const requiredVideo = data['results'].filter(v => v['type'] === 'Trailer' && v['site'] === 'YouTube')[0];
        const videoUrl = YOUTUBE_URL + requiredVideo['key'];
        dispatch({ type: FETCH_MOVIE_TRAILER, payload: videoUrl });
    } catch (error) {
        dispatch({ type: FETCH_MOVIE_TRAILER, payload: '' });
    }
}

export const fetchSimilarMovies = movieId => async dispatch => {
    try {
        const { data } = await tmdb.get(`/movie/${movieId}/similar`);
        const modifiedData = modifyResultsArray(data);
        dispatch({ type: FETCH_SIMILAR_MOVIES, payload: modifiedData });
    } catch (error) {
        dispatch({ type: FETCH_SIMILAR_MOVIES, payload: [] });
    }
}

export const findMoviesByName = movieName => async dispatch => {
    try {
        const { data } = await tmdb.get('/search/movie', {
            params: {
                query: movieName
            }
        });
        const modifiedData = modifyResultsArray(data);
        dispatch({ type: FETCH_MOVIES_BY_NAME, payload: modifiedData });
    } catch (err) {
        dispatch({ type: FETCH_MOVIES_BY_NAME, payload: [] });
    }
}

export const fetchNowPlaying = () => async dispatch => {
    try {
        const { data } = await tmdb.get('/movie/now_playing');
        const modifiedData = modifyResultsArray(data);
        dispatch({ type: FETCH_NOW_PLAYING, payload: modifiedData });
    } catch (err) {
        dispatch({ type: FETCH_NOW_PLAYING, payload: [] });
    }
}

export const fetchTopRated = () => async dispatch => {
    try {
        const { data } = await tmdb.get('/movie/top_rated');
        const modifiedData = modifyResultsArray(data);
        dispatch({ type: FETCH_TOP_RATED, payload: modifiedData });
    } catch (error) {
        dispatch({ type: FETCH_TOP_RATED, payload: [] });
    }
}

export const fetchGenres = () => async dispatch => {
    try {
        const { data } = await tmdb.get('/genre/movie/list');
        const modifiedData = data['genres'].map((g) => ({
            id: g['id'],
            name: g['name']
        }));
        dispatch({ type: FETCH_GENRES, payload: modifiedData });
    } catch (error) {
        dispatch({ type: FETCH_GENRES, payload: [] });
    }
}

export const fetchMoviesByGenre = (genreId) => async dispatch => {
    try {
        const { data } = await tmdb.get('/discover/movie', {
            params: {
                'with_genres': genreId
            }
        });
        const modifiedData = modifyResultsArray(data);
        dispatch({ type: FETCH_MOVIES_BY_GENRE, payload: modifiedData });
    } catch (error) {
        dispatch({ type: FETCH_MOVIES_BY_GENRE, payload: [] });
    }
}

const modifyResultsArray = data => {
    return data['results'].map((m) => {
        const poster = m['poster_path'] !== null ? POSTER_URL + m['poster_path'] : '';
        const backPoster = m['backdrop_path'] !== null ? POSTER_URL + m['backdrop_path'] : poster;
        return {
            id: m['id'],
            backPoster,
            title: m['title'],
            poster,
            rating: m['vote_average'],
        }
    });
}