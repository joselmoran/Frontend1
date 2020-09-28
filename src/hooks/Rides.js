import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { useHistory } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useInputHook } from "../my-hooks/input-hook";

function Rides() {
  const history = useHistory();
  const dispatch = useDispatch();

  const tokenJwt = useSelector((store) => store.tokenJwt);
  
  const rides = useSelector((store) => store.rides);
  const deletedRide = useSelector((store) => store.deletedRide);
  const deletedRideError = useSelector((store) => store.deletedRideError);
  let operation;

  // Input-hook fields.
  const { value: rideId, setValue: setRideId, bind: bindRideId, reset: resetRideId, } = useInputHook("");
  const { value: firstPoint, setValue: setFirstPoint, bind: bindFirstPoint, reset: resetFirstPoint, } = useInputHook("");
  const { value: targetPoint, setValue: setTargetPoint, bind: bindTargetPoint, reset: resetTargetPoint, } = useInputHook("");
  const { value: customerId, setValue: setCustomerId, bind: bindCustomerId, reset: resetCustomerId, } = useInputHook("");
  const { value: driverId, setValue: setDriverId, bind: bindDriverId, reset: resetDriverId, } = useInputHook("");
  const { value: time, setValue: setTime, bind: bindTime, reset: resetTime, } = useInputHook("");


  // Tiene 2 funcionalidades, permite crear un neuvo ride o permite actualizar uno existente
  const handleSubmitRider = (e) => {
    e.preventDefault();
    let data = {};

    if (operation === "cancelar"){
      return resetAllInputs();
    } 
    
    let validLatFirstPoint = firstPoint.includes('"lat":');
    let validLatSecondPoint = firstPoint.includes('"lat":');
    let validLongFirstPoint = targetPoint.includes('"lng":');
    let validLongSecondPoint = targetPoint.includes('"lng":');

    const validFiels = validLatFirstPoint && validLatSecondPoint && validLongFirstPoint && validLongSecondPoint;

    
    console.log(validFiels);
    // valido que el usuario ingrese todos los campos
    let allFields = firstPoint && targetPoint && customerId && driverId
    if(!allFields) return alert('completa todos los campos');

    // Valido que si ingrese una latitud y una longitud
    if (!validFiels) return alert('Los campos de First Point y Target Point deben tener la siguiente estructura {"lat": "3.9", "lng": "-7.4"}');

    if (operation === 'nuevo') {
      data = { first_point: firstPoint.toString(), target_point: targetPoint, customer_id: customerId, driver_id: driverId };
      dispatch(actions.postRides(data));
      
    } else if (operation === 'actualizar') {
      console.log(operation);
      data = { id: rideId, first_point: firstPoint, target_point: targetPoint, customer_id: customerId, driver_id: driverId };
      dispatch(actions.updateRideById(rideId, data));
      
    }

    resetAllInputs();
    
  };

  const resetAllInputs = () => {
    // Reset fields.
    resetRideId();
    resetFirstPoint();
    resetTargetPoint();
    resetCustomerId();
    resetDriverId();
    resetTime();
  }

  useEffect(() => {
    console.log('useEffect'+tokenJwt.token);
    dispatch(actions.getRides());
    
  }, [dispatch]); // hace que no se este llamando, solo cambia cuando detecta un cambio en el dispatch

  const rideDetails = (ride, rideId) => {
    console.log("Ride details:");
    console.log(ride);
    let detail = `${ride._id} Details:\n\nFirst_point: ${ride.first_point}\nTarget_point: ${ride.target_point}\nCustomer_id: ${ride.customer_id}\nCustomer_id: ${ride.driver_id}\nCustomer_id: ${ride.time}`;
    alert(detail);
    // console.log(customerId);
  };

  /*
    customer_id: 82
    driver_id: "36"
    first_point: "{"lat":"21.13087", "lng":"135.57175"}"
    id: "5f597e4a36d2cdcb26cc36ff"
    target_point: "{"lat": "-67.87201", "lng":"89.36315"}"
    time: "2020-03-31T07:39:00.000Z"
    _id: "5f597e4a36d2cdcb26cc36ff"
  */


  // Setea los valores de ride en los hooks
  const updateRideById = (ride, rideId) => {
    // console.log(rideId);
    // console.log(ride);
    setRideId(ride._id);
    setFirstPoint(ride.first_point);
    setTargetPoint(ride.target_point);
    setCustomerId(ride.customer_id);
    setDriverId(ride.driver_id);
    setTime(ride.time);
  };

  const deleteRideById = (rideId) => {
    console.log(rideId);
    dispatch(actions.deleteRideById(rideId));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <p>React Rides Form:</p>

        {/* <button onClick={() => showHideForm()}></button> */}

        <form onSubmit={handleSubmitRider} id="rideForm">
          <input placeholder="rideId" type="hidden" className="MyInput" {...bindRideId}></input>
          <br></br>
          <input placeholder="firstPoint" type="text" className="MyInput" {...bindFirstPoint}></input>
          <br></br>
          <input placeholder="targetPoint" type="text" className="MyInput" {...bindTargetPoint}></input>
          <br></br>
          <input placeholder="customerId" type="number" className="MyInput" {...bindCustomerId}></input>
          <br></br>
          <input placeholder="driverId" type="number" className="MyInput" {...bindDriverId}></input>
          <br></br>
          <input placeholder="time" type="text" className="MyInput" {...bindTime} readOnly></input>
          <br></br>

          <input type="submit" onClick={() => { operation = "nuevo"; }}  className="MyButton btn btn-primary" value="Nuevo"></input>
          <input type="submit" onClick={() => { operation = "actualizar"; }} className="MyButton btn btn-info" value="update"></input>
          <input type="submit" onClick={() => { operation = "cancelar"; }} className="MyButton btn btn-danger" value="Cancelar"></input>
        </form>

        <br></br>
        <button value="Home" className="MyButton btn btn-light" onClick={() => history.push("")}>
          Home
        </button>

        
        

        <table class="demo">
          <caption>Rides Table</caption>
          <thead>
            <tr>
              <th>First Point</th>
              <th>Target Point</th>
              <th>Actions</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {rides &&
              rides.length > 0 &&
              rides.map((ride) => (
                <tr>
                  <td>{ride.first_point}</td>
                  <td>{ride.target_point}</td>
                  <td>
                    <button className="btn btn-success MyButton"  onClick={() => rideDetails(ride, ride._id)}> Details </button>
                    <button className="btn btn-primary MyButton" onClick={() => updateRideById(ride, ride._id)}> Update </button>
                    <button className="btn btn-danger MyButton"  onClick={() => deleteRideById(ride._id)}> Delete </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Rides;

