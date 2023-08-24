// LINK DA API DIVIDIDO
// https://api.themoviedb.org/3/
//movie/now_playing?api_key=854ef6ccf32507aa784d9d13d0820594&language=pt-BR
import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;

// agora ir para pagina que deseja rederizar a api do filme
