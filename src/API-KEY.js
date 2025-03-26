 const API_KEY = 'fb4cd284e11fdf824b6fa16ffb08b0d7'

 const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    params:{
        'api_key': API_KEY
    }
})