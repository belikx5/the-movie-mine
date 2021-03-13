import axios from 'axios'
import Constants from 'expo-constants'


export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: { 
        'api_key': Constants.manifest.extra.tmdbApiKey,
        'language': 'en-US'
    }
})