import services from '../services/api.services';
// const files = require('files');
// const jwtPath = '../config/config.json';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

/**
 * RIDES
 */
// GET
export const GET_RIDES = 'GET_RIDES';
export const GET_RIDES_ERROR = 'GET_RIDES_ERROR';

// DELETE
export const DELETE_RIDE_BY_ID = 'DELETE_RIDE_BY_ID';
export const DELETE_RIDE_BY_ID_ERROR = 'DELETE_RIDE_BY_ID_ERROR';

// POST
export const POST_RIDES = 'POST_RIDES';
export const POST_RIDES_ERROR = 'POST_RIDES_ERROR';

// UPDATE
export const UPDATE_RIDES = 'UPDATE_RIDES';
export const UPDATE_RIDES_ERROR = 'UPDATE_RIDES_ERROR';


/**
 * CUSTOMERS
 */
// GET
export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_CUSTOMERS_ERROR = 'GET_CUSTOMERS_ERROR';

// DELETE
export const DELETE_CUSTOMER_BY_ID = 'DELETE_CUSTOMER_BY_ID';
export const DELETE_CUSTOMER_BY_ID_ERROR = 'DELETE_CUSTOMER_BY_ID_ERROR';

// POST
export const POST_CUSTOMER = 'POST_CUSTOMER';
export const POST_CUSTOMER_ERROR = 'POST_CUSTOMER_ERROR';

// UPDATE
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const UPDATE_CUSTOMER_ERROR = 'UPDATE_CUSTOMER_ERROR';



/**
 * DRIVERS
 */
// GET
export const GET_DRIVERS = 'GET_DRIVERS';
export const GET_DRIVERS_ERROR = 'GET_DRIVERS_ERROR';

// DELETE
export const DELETE_DRIVER_BY_ID = 'DELETE_DRIVER_BY_ID';
export const DELETE_DRIVER_BY_ID_ERROR = 'DELETE_DRIVER_BY_ID_ERROR';

// POST
export const POST_DRIVER = 'POST_DRIVER';
export const POST_DRIVER_ERROR = 'POST_DRIVER_ERROR';

// UPDATE
export const UPDATE_DRIVER = 'UPDATE_DRIVER';
export const UPDATE_DRIVER_ERROR = 'UPDATE_DRIVER_ERROR';


/**
 * CARS
 */
// GET
export const GET_CARS = 'GET_CARS';
export const GET_CARS_ERROR = 'GET_CARS_ERROR';

// DELETE
export const DELETE_CAR_BY_ID = 'DELETE_CAR_BY_ID';
export const DELETE_CAR_BY_ID_ERROR = 'DELETE_CAR_BY_ID_ERROR';

// POST
export const POST_CAR = 'POST_CAR';
export const POST_CAR_ERROR = 'POST_CAR_ERROR';

// UPDATE
export const UPDATE_CAR = 'UPDATE_CAR';
export const UPDATE_CAR_ERROR = 'UPDATE_CAR_ERROR';

let jwt = '';


/**
 * TOKEN
 */
export const getToken = () => {
  return dispatch => {
      services.getJWTToken()
          .then(response => {
              console.log(response.data.token);
              // console.log(jwtPath);
              const message = 'TOKEN RECIBIDO CORRECTAMENTE.\nRecuerda que si refrescas la pagina tienes que volver a solicitar el Token'
              alert(message);
              jwt = response.data.token;
              dispatch(getTokenAsync(response));
              services.setJwtToken(jwt);
          })
          .catch(error => {
              console.log(error);
              alert(error);
              dispatch(getTokenErrorAsync(error));
          });
  }
}

export const getTokenAsync = (payload) => ({
  type: GET_TOKEN,
  payload: payload
});

export const getTokenErrorAsync = (error) => ({
  type: GET_TOKEN_ERROR,
  error: error
});



/**
 * RIDES
 */
// Para obtener todos los rides.
export const getRides = () => {
  console.log('inside actions '+jwt);
    return dispatch => {
        services.getRides()
            .then(response => {
                //console.log(response);
                dispatch(getRidesAsync(response));
            })
            .catch(error => {
                console.log(error);
                alert(error);
                dispatch(getRidesErrorAsync(error));
            });
    }
}

export const getRidesAsync = (payload) => ({
    type: GET_RIDES,
    payload: payload
});

export const getRidesErrorAsync = (error) => ({
    type: GET_RIDES_ERROR,
    error: error
});


// Para eliminar un ride by id.
export const deleteRideById = (rideId) => {
    return dispatch => {
        services.deleteRideById(rideId)
            .then(response => {
                console.log(response);
                dispatch(deleteRideByIdAsync(response));
                return services.getRides(); // Vuelvo a llamar la lista de rides para que la lista en el dom se actualize
            })
            .then(response => {
                dispatch(getRidesAsync(response));
            })
            .catch(error => {
                console.log(error);
                alert(error);
                dispatch(deleteRideByIdErrorAsync(error));
            });
    }
}

export const deleteRideByIdAsync = (payload) => ({
    type: DELETE_RIDE_BY_ID,
    payload: payload
});

export const deleteRideByIdErrorAsync = (error) => ({
    type: DELETE_RIDE_BY_ID_ERROR,
    error: error
});



// Para crear un nuevo Ride
export const postRides = (data) => {
    return dispatch => {
        services.postRide(data)
            .then(response => {
                console.log(response);
                dispatch(postRidesAsync(response));

                //Refresco la lista de rides en el dom
                return services.getRides()
            })
            .then(response => {
                dispatch(getRidesAsync(response))
            })
            .catch(error => {
                console.log(error);
                alert(error);
                dispatch(postRidesErrorAsync(error));
            });
    }
}

export const postRidesAsync = (payload) => ({
    type: POST_RIDES,
    payload: payload
});

export const postRidesErrorAsync = (error) => ({
    type: POST_RIDES_ERROR,
    error: error
});



// Para actualizar un ride
export const updateRideById = (rideId, data) => {
  return dispatch => {
    services.updateRideById(rideId, data)
      .then(response => {
        console.log(response);
        dispatch(updateRideAsync(response));
        
        //Refresco la lista de rides en el dom
        return services.getRides()
      })
      .then(response => {
        dispatch(getRidesAsync(response))
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch(updateRideErrorAsync(error));
      });
  }
}

export const updateRideAsync = (payload) => ({
  type: UPDATE_RIDES,
  payload: payload
});

export const updateRideErrorAsync = (error) => ({
  type: UPDATE_RIDES_ERROR,
  error: error
});



/**
 * CUSTOMERS
 *
 * 
 * */

export const getCustomers = () => {
  console.log('inside actions '+jwt);
  return dispatch => {
    services.getCustomers()
      .then(response => {
        console.log(response);
        dispatch(getCustomersAsync(response));
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch(getCustomersErrorAsync(error));
      });
  }
}

export const getCustomersAsync = (payload) => ({
  type: GET_CUSTOMERS,
  payload: payload
});

export const getCustomersErrorAsync = (error) => ({
  type: GET_CUSTOMERS_ERROR,
  error: error
});


// Para eliminar un customer by id.
export const deleteCustomerById = (customerId) => {
    return dispatch => {
        services.deleteCustomerById(customerId)
            .then(response => {
                console.log(response);
                dispatch(deleteCustomerByIdAsync(response));
                return services.getCustomers(); // Vuelvo a llamar la lista de Customers para que la lista en el dom se actualize
            })
            .then(response => {
                dispatch(getCustomersAsync(response));
            })
            .catch(error => {
                console.log(error);
                alert(error);
                dispatch(deleteCustomerByIdErrorAsync(error));
            });
    }
}

export const deleteCustomerByIdAsync = (payload) => ({
    type: DELETE_CUSTOMER_BY_ID,
    payload: payload
});

export const deleteCustomerByIdErrorAsync = (error) => ({
    type: DELETE_CUSTOMER_BY_ID_ERROR,
    error: error
});


// Para crear un nuevo customer
export const postCustomers = (data) => {
  return (dispatch) => {
    services
      .postCustomer(data)
      .then((response) => {
        console.log(response);
        dispatch(postCustomersAsync(response));

        //Refresco la lista de customers en el dom
        return services.getCustomers();
      })
      .then((response) => {
        dispatch(getCustomersAsync(response));
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch(postCustomersErrorAsync(error));
      });
  };
};

export const postCustomersAsync = (payload) => ({
  type: POST_CUSTOMER,
  payload: payload,
});

export const postCustomersErrorAsync = (error) => ({
  type: POST_CUSTOMER_ERROR,
  error: error,
});


// Para actualizar un customer
export const updateCustomerById = (customerId, data) => {
  return dispatch => {
    services.updateCustomerById(customerId, data)
      .then(response => {
        console.log(response);
        dispatch(updateCustomerAsync(response));
        
        //Refresco la lista de Customers en el dom
        return services.getCustomers()
      })
      .then(response => {
        dispatch(getCustomersAsync(response))
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch(updateCustomerErrorAsync(error));
      });
  }
}

export const updateCustomerAsync = (payload) => ({
  type: UPDATE_CUSTOMER,
  payload: payload
});

export const updateCustomerErrorAsync = (error) => ({
  type: UPDATE_CUSTOMER_ERROR,
  error: error,
});




/**
 * DRIVERS
 */
 
export const getDrivers = () => {
  return dispatch => {
    services.getDrivers()
      .then(response => {
        console.log(response);
        dispatch(getDriversAsync(response));
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch(getDriversErrorAsync(error));
      });
  }
}

export const getDriversAsync = (payload) => ({
  type: GET_DRIVERS,
  payload: payload
});

export const getDriversErrorAsync = (error) => ({
  type: GET_DRIVERS_ERROR,
  error: error
});


// Para eliminar un driver by id.
export const deleteDriverById = (driverId) => {
  return dispatch => {
      services.deleteDriverById(driverId)
          .then(response => {
              console.log(response);
              dispatch(deleteDriverByIdAsync(response));
              return services.getDrivers(); // Vuelvo a llamar la lista de Drivers para que la lista en el dom se actualize
          })
          .then(response => {
              dispatch(getDriversAsync(response));
          })
          .catch(error => {
              console.log(error);
              alert(error);
              dispatch(deleteDriverByIdErrorAsync(error));
          });
  }
}

export const deleteDriverByIdAsync = (payload) => ({
  type: DELETE_DRIVER_BY_ID,
  payload: payload
});

export const deleteDriverByIdErrorAsync = (error) => ({
  type: DELETE_DRIVER_BY_ID_ERROR,
  error: error
});


// Para crear un nuevo driver
export const postDriver = (data) => {
  return (dispatch) => {
    services
      .postDriver(data)
      .then((response) => {
        console.log(response);
        dispatch(postDriverAsync(response));

        //Refresco la lista de Driver en el dom
        return services.getDrivers();
      })
      .then((response) => {
        dispatch(getDriversAsync(response));
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch(postDriverErrorAsync(error));
      });
  };
};

export const postDriverAsync = (payload) => ({
  type: POST_DRIVER,
  payload: payload,
});

export const postDriverErrorAsync = (error) => ({
  type: POST_DRIVER_ERROR,
  error: error,
});



// Para actualizar un driver
export const updateDriverById = (driverId, data) => {
  return dispatch => {
    services.updateDriverById(driverId, data)
      .then(response => {
        console.log(response);
        dispatch(updateDriverAsync(response));
        
        //Refresco la lista de Drivers en el dom
        return services.getDrivers()
      })
      .then(response => {
        dispatch(getDriversAsync(response))
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch(updateDriverErrorAsync(error));
      });
  }
}

export const updateDriverAsync = (payload) => ({
  type: UPDATE_DRIVER,
  payload: payload
});

export const updateDriverErrorAsync = (error) => ({
  type: UPDATE_DRIVER_ERROR,
  error: error,
});




/**
 * CARS
 */

export const getCars = () => {
  return dispatch => {
    services.getCars()
      .then(response => {
        console.log(response);
        dispatch(getCarsAsync(response));
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch(getCarsErrorAsync(error));
      });
  }
}

export const getCarsAsync = (payload) => ({
  type: GET_CARS,
  payload: payload
});

export const getCarsErrorAsync = (error) => ({
  type: GET_CARS_ERROR,
  error: error
});


// Para eliminar un car by id.
export const deleteCarById = (carId) => {
  return dispatch => {
      services.deleteCarById(carId)
          .then(response => {
              console.log(response);
              dispatch(deleteCarByIdAsync(response));
              return services.getCars(); // Vuelvo a llamar la lista de Cars para que la lista en el dom se actualize
          })
          .then(response => {
              dispatch(getCarsAsync(response));
          })
          .catch(error => {
              console.log(error);
              alert(error);
              dispatch(deleteCarByIdErrorAsync(error));
          });
  }
}

export const deleteCarByIdAsync = (payload) => ({
  type: DELETE_CAR_BY_ID,
  payload: payload
});

export const deleteCarByIdErrorAsync = (error) => ({
  type: DELETE_CAR_BY_ID_ERROR,
  error: error
});


// Para crear un nuevo car
export const postCar = (data) => {
  return (dispatch) => {
    services
      .postCar(data)
      .then((response) => {
        console.log(response);
        dispatch(postCarAsync(response));

        //Refresco la lista de Cars en el dom
        return services.getCars();
      })
      .then((response) => {
        dispatch(getCarsAsync(response));
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch(postCarErrorAsync(error));
      });
  };
};

export const postCarAsync = (payload) => ({
  type: POST_CAR,
  payload: payload,
});

export const postCarErrorAsync = (error) => ({
  type: POST_CAR_ERROR,
  error: error,
});



// Para actualizar un driver
export const updateCarById = (carId, data) => {
  return dispatch => {
    services.updateCarById(carId, data)
      .then(response => {
        console.log(response);
        dispatch(updateCarAsync(response));
        
        //Refresco la lista de Cars en el dom
        return services.getCars()
      })
      .then(response => {
        dispatch(getCarsAsync(response))
      })
      .catch(error => {
        console.log(error);
        alert(error);
        dispatch(updateCarErrorAsync(error));
      });
  }
}

export const updateCarAsync = (payload) => ({
  type: UPDATE_CAR,
  payload: payload
});

export const updateCarErrorAsync = (error) => ({
  type: UPDATE_CAR_ERROR,
  error: error,
});


/*

export const postCustomers = (data) => {
    return dispatch => {
      services.postCustomer(data)
        .then(response  => {
          console.log(response);
          dispatch(postCustomersAsync(response));
        })
        .catch(error => {
          console.log(error);
                alert(error);
          dispatch(postCustomersErrorAsync(error));
        });
    }
  }
  
export const postCustomersAsync = (payload) => ({
  type: POST_CUSTOMERS,
  payload: payload
});

export const postCustomersErrorAsync = (error) => ({
  type: POST_CUSTOMERS_ERROR,
  error: error
});



export const getCustomers = () => {
  return dispatch => {
    services.getCustomers()
      .then(response => {
        console.log(response);
        dispatch(getCustomersAsync(response));
      })
      .catch(error => {
        console.log(error);
        dispatch(getCustomersErrorAsync(error));
      });
  }
}

export const getCustomersAsync = (payload) => ({
  type: GET_CUSTOMERS,
  payload: payload
});

export const getCustomersErrorAsync = (error) => ({
  type: GET_CUSTOMERS_ERROR,
  error: error
});





export const postCars = (data) => {
    return dispatch => {
      services.postCar(data)
        .then(response  => {
          console.log(response);
          dispatch(postCarsAsync(response));
        })
        .catch(error => {
          console.log(error);
          dispatch(postCarsErrorAsync(error));
        });
    }
  }
  
export const postCarsAsync = (payload) => ({
  type: POST_CARS,
  payload: payload
});

export const postCarsErrorAsync = (error) => ({
  type: POST_CARS_ERROR,
  error: error
});



export const postDrivers = (data) => {
    return dispatch => {
      services.postDriver(data)
        .then(response  => {
          console.log(response);
          dispatch(postDriversAsync(response));
        })
        .catch(error => {
          console.log(error);
          dispatch(postDriversErrorAsync(error));
        });
    }
  }
  
export const postDriversAsync = (payload) => ({
  type: POST_DRIVERS,
  payload: payload
});

export const postDriversErrorAsync = (error) => ({
  type: POST_DRIVERS_ERROR,
  error: error
});


export const postRides = (data) => {
    return dispatch => {
      services.postRide(data)
        .then(response  => {
          console.log(response);
          dispatch(postRidesAsync(response));
        })
        .catch(error => {
          console.log(error);
          dispatch(postRidesErrorAsync(error));
        });
    }
  }
  
export const postRidesAsync = (payload) => ({
  type: POST_RIDES,
  payload: payload
});

export const postRidesErrorAsync = (error) => ({
  type: POST_RIDES_ERROR,
  error: error
});

*/