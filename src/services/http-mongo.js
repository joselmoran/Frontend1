import axios from 'axios';
// const url = 'https://virtserver.swaggerhub.com/Eider/Taxi_API/1.0.0';
// const url = 'https://api.themoviedb.org/3';
const url = 'http://127.0.0.1:3030/api/v1';

// Para hacer todas las peticiones sobre el modulo 2(Mongo) del backend

export default axios.create({
    baseURL: url,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        
    }

});