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

const initialState = {
    topRated: [],
    nowPlaying: [],
    genres: [],
    byGenre: [],
    searchMovies: [],
    selectedMovie: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_NOW_PLAYING: 
            return { ...state, nowPlaying: action.payload };
        case FETCH_TOP_RATED:
            return { ...state, topRated: action.payload };
        case FETCH_GENRES:
            return { ...state, genres: action.payload };
        case FETCH_MOVIES_BY_GENRE:
            return { ...state, byGenre: action.payload };
        case FETCH_MOVIES_BY_NAME:
            return { ...state, searchMovies: action.payload };
        case FETCH_MOVIE_DETAILS:
            return { ...state, selectedMovie: action.payload };
        case FETCH_MOVIE_TRAILER:
            return { ...state, selectedMovie: { ...state.selectedMovie, trailerUrl: action.payload }};
        case FETCH_SIMILAR_MOVIES:
            return { ...state, selectedMovie: { ...state.selectedMovie, similarMovies: action.payload }};
        case FETCH_MOVIE_CAST:
            return { ...state, selectedMovie: { ...state.selectedMovie, cast: action.payload }};
        default:
            return state;
    }
}