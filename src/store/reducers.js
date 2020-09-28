import { GET_RIDES, GET_RIDES_ERROR, DELETE_RIDE_BY_ID, DELETE_RIDE_BY_ID_ERROR, POST_RIDES, POST_RIDES_ERROR,
          UPDATE_RIDES, UPDATE_RIDES_ERROR, GET_CUSTOMERS, GET_CUSTOMERS_ERROR, DELETE_CUSTOMER_BY_ID, DELETE_CUSTOMER_BY_ID_ERROR,
          GET_DRIVERS, GET_DRIVERS_ERROR, DELETE_DRIVER_BY_ID, DELETE_DRIVER_BY_ID_ERROR, GET_CARS, GET_CARS_ERROR,
          DELETE_CAR_BY_ID, DELETE_CAR_BY_ID_ERROR, POST_DRIVER, POST_DRIVER_ERROR, UPDATE_DRIVER, UPDATE_DRIVER_ERROR,
          POST_CUSTOMER,POST_CUSTOMER_ERROR, UPDATE_CUSTOMER, UPDATE_CUSTOMER_ERROR, POST_CAR, POST_CAR_ERROR,
          UPDATE_CAR, UPDATE_CAR_ERROR, GET_TOKEN, GET_TOKEN_ERROR } from './actions';

const initialState = {
  rides: [],
  rideError: '',
  deletedRide: '',
  deletedRideError: '',
  createdRide: '',
  createdRideError: '',
  updatedRide: '',
  updatedRideError: '',


  customers: [],
  customersError: '',
  deletedCustomer: '',
  deletedCustomerError: '',
  createdCustomer: '',
  createdCustomerError: '',
  updatedCustomer: '',
  updatedCustomerError: '',

  drivers: [],
  driversError: '',
  deletedDriver: '',
  deletedDriverError: '',
  createdDriver: '',
  createdDriverError: '',
  updatedDriver: '',
  updatedDriverError: '',

  cars: [],
  carsError: '',
  deletedCar: '',
  deletedCarError: '',
  createdCar: '',
  createdCarError: '',
  updatedCar: '',
  updatedCarError: '',

  tokenJwt:'', // Para almacenar el token
  tokenJwtError:'' // Para almacenar el token error


}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_TOKEN:
        return {
          ...state,
          tokenJwt: action.payload.data,
        };
      case GET_TOKEN_ERROR:
        return {
          ...state,
          tokenJwtError: action.payload,
        };
      case GET_RIDES:
        return {
          ...state,
          rides: action.payload.data,
        };
      case GET_RIDES_ERROR:
        return {
          ...state,
          rideError: action.payload,
        };
      case DELETE_RIDE_BY_ID:
        return {
          ...state,
          deletedRide: action.payload.data,
        };
      case DELETE_RIDE_BY_ID_ERROR:
        return {
          ...state,
          deletedRideError: action.payload,
        };
      case POST_RIDES:
        return {
          ...state,
          createdRide: action.payload.data,
        };
      case POST_RIDES_ERROR:
        return {
          ...state,
          createdRideError: action.payload,
        };
      case UPDATE_RIDES:
        return {
          ...state,
          updatedRide: action.payload.data,
        };
      case UPDATE_RIDES_ERROR:
        return {
          ...state,
          updatedRideError: action.payload,
        };
      case GET_CUSTOMERS:
        return {
          ...state,
          customers: action.payload.data,
        };
      case GET_CUSTOMERS_ERROR:
        return {
          ...state,
          customersError: action.payload,
        };
      case DELETE_CUSTOMER_BY_ID:
        return {
          ...state,
          deletedCustomer: action.payload.data,
        };
      case DELETE_CUSTOMER_BY_ID_ERROR:
        return {
          ...state,
          deletedCustomerError: action.payload,
        };
        case POST_CUSTOMER:
          return {
            ...state,
            createdCustomer: action.payload.data,
          };
        case POST_CUSTOMER_ERROR:
          return {
            ...state,
            createdCustomerError: action.payload,
          };
        case UPDATE_CUSTOMER:
          return {
            ...state,
            updatedCustomer: action.payload.data,
          };
        case UPDATE_CUSTOMER_ERROR:
          return {
            ...state,
            updatedCustomerError: action.payload,
          };
      case GET_DRIVERS:
        return {
          ...state,
          drivers: action.payload.data,
        };
      case GET_DRIVERS_ERROR:
        return {
          ...state,
          driversError: action.payload,
        };
      case DELETE_DRIVER_BY_ID:
        return {
          ...state,
          deletedDriver: action.payload.data,
        };
      case DELETE_DRIVER_BY_ID_ERROR:
        return {
          ...state,
          deletedDriverError: action.payload,
        };
      case POST_DRIVER:
        return {
          ...state,
          createdDriver: action.payload.data,
        };
      case POST_DRIVER_ERROR:
        return {
          ...state,
          createdDriverError: action.payload,
        };
      case UPDATE_DRIVER:
        return {
          ...state,
          updatedDriver: action.payload.data,
        };
      case UPDATE_DRIVER_ERROR:
        return {
          ...state,
          updatedDriverError: action.payload,
        };
      case GET_CARS:
        return {
          ...state,
          cars: action.payload.data,
        };
      case GET_CARS_ERROR:
        return {
          ...state,
          carsError: action.payload,
        };
      case DELETE_CAR_BY_ID:
        return {
          ...state,
          deletedCar: action.payload.data,
        };
      case DELETE_CAR_BY_ID_ERROR:
        return {
          ...state,
          deletedCarError: action.payload,
        };
      case POST_CAR:
        return {
          ...state,
          createdCar: action.payload.data,
        };
      case POST_CAR_ERROR:
        return {
          ...state,
          createdCarError: action.payload,
        };
      case UPDATE_CAR:
        return {
          ...state,
          updatedCar: action.payload.data,
        };
      case UPDATE_CAR_ERROR:
        return {
          ...state,
          updatedCarError: action.payload,
        };
      // case POST_CUSTOMERS:
      //   return {
      //     ...state,
      //     customer: action.payload.data
      //   }
      // case POST_CUSTOMERS_ERROR:
      //   return {
      //     ...state,
      //     customerError: action.payload.error
      //   }
      // case POST_CARS:
      //   return {
      //     ...state,
      //     car: action.payload.data
      //   }
      // case POST_CARS_ERROR:
      //   return {
      //     ...state,
      //     carError: action.payload.error
      //   }
      // case POST_DRIVERS:
      //   return {
      //     ...state,
      //     driver: action.payload.data
      //   }
      // case POST_DRIVERS_ERROR:
      //   return {
      //     ...state,
      //     driverError: action.payload.error
      //   }
      // case POST_RIDES:
      //   return {
      //     ...state,
      //     ride: action.payload.data
      //   }
      // case POST_RIDES_ERROR:
      //   return {
      //     ...state,
      //     rideError: action.payload.error
      //   }
      default:
        return state;
    }
};