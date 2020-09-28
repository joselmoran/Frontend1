import axios from 'axios';

// const url = 'https://virtserver.swaggerhub.com/Eider/Taxi_API/1.0.0';
// const url = 'https://api.themoviedb.org/3';
const url = 'http://localhost:3040/api/v1';

// Para hacer todas las peticiones sobre el modulo 1(Postgres) del backend


export default axios.create({
  baseURL: url,
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',

  }
 
});
