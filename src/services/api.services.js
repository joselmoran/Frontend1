import httpPostgress from './http-postgres';
import httpMongo from './http-mongo';

let jwtToken = '';



/**
 * TOKEN
 */
const getJWTToken = () => {
  return httpPostgress.get('/users/authenticate');
};

const setJwtToken = (token) => {
  jwtToken = token;
}

/**
 * RIDES
 */
const getRides = () => {
  console.log('jwttoken inside services'+ jwtToken);
  return httpMongo.get('/rides', {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const deleteRideById = (rideId) => {
  const url = `/rides/${rideId}/delete`;
  // http://localhost:3030/api/v1/sdsd77fsdfsdfsdfsdfsdf233/delete'
  return httpMongo.delete(url, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const postRide = (data) => {
  return httpMongo.post('/rides/create', data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}

const updateRideById = (rideId, data) => {
  const url = `/rides/${rideId}/update`;
  //! Como enviar el jwt en las cabeceras. tomado de: https://github.com/axios/axios/issues/858
  // return httpMongo.put( url, data, {headers:{'Authorization': 'Bearer token'}});
  return httpMongo.put( url, data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}

/**
 * CUSTOMERS
 */
const getCustomers= () => {
  return httpPostgress.get('/users/customers', {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const deleteCustomerById = (customerId) => {
  const url = `/users/customers/${customerId}/delete`;
  return httpPostgress.delete(url, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const postCustomer = (data) => {
  return httpPostgress.post('/users/customers/create', data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}

const updateCustomerById = (customerId, data) => {
  const url = `/users/customers/${customerId}/update`;
  return httpPostgress.put(url, data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}


/**
 * DRIVERS
 */
const getDrivers= () => {
  
  // return httpPostgress.get('/users/drivers', {
  //   headers: { Authorization: "Bearer " + token }
  // });
  return httpPostgress.get('/users/drivers', {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const deleteDriverById = (driverId) => {
  const url = `/users/drivers/${driverId}/delete`;
  return httpPostgress.delete(url, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const postDriver = (data) => {
  return httpPostgress.post('/users/drivers/create', data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}

const updateDriverById = (driverId, data) => {
  const url = `/users/drivers/${driverId}/update`;
  return httpPostgress.put(url, data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}


/**
 * CARS
 */

const getCars = () => {
  return httpPostgress.get('/cars', {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const deleteCarById = (carId) => {
  const url = `/cars/${carId}/delete`;
  console.log(url);
  return httpPostgress.delete(url, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
};

const postCar = (data) => {
  return httpPostgress.post('/cars/create', data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}

const updateCarById = (carId, data) => {
  const url = `/cars/${carId}/update`;
  return httpPostgress.put(url, data, {
      headers: { Authorization: "Bearer " + jwtToken }
    });
}

/*
const getCustomers = () => {
  return httpPostgress.get('/users/customers');
};


const getCars = () => {
  return http.get('/cars');
};

const getDrivers = () => {
  return http.get('/drivers');
};

const getRides = () => {
  return http.get('/rides');
};

const postCustomer = (data) => {
  return http.post('/customers/create', data);
}

const postDriver = (data) => {
  return http.post('/drivers/create', data);
}

const postCar = (data) => {
  return http.post('/cars/create', data);
}

const postRide = (data) => {
  return http.post('/rides/create', data);
}
*/
export default {
  getJWTToken,
  setJwtToken,

  getRides,
  deleteRideById,
  postRide,
  updateRideById,

  getCustomers,
  deleteCustomerById,
  postCustomer,
  updateCustomerById,

  getDrivers,
  deleteDriverById,
  postDriver,
  updateDriverById,

  getCars,
  deleteCarById,
  postCar,
  updateCarById,
}