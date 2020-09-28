import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { useHistory } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useInputHook } from "../my-hooks/input-hook";

function Drivers() {
  const history = useHistory();
  const dispatch = useDispatch();

  const drivers = useSelector((store) => store.drivers);
  
  const deletedDriver = useSelector((store) => store.deletedDriver);
  const deletedDriverError = useSelector((store) => store.deletedDriverError);
  let operation;

  // Input-hook fields.
  const {value: id, setValue: setId, bind: bindId, reset: resetId} = useInputHook('');
  const {value: driverId, setValue: setDriverId, bind: bindDriverId, reset: resetDriverID} = useInputHook('');
  const {value: username, setValue: setUsername, bind: bindUsername, reset: resetUsername} = useInputHook('');
  const {value: firstname, setValue: setFirstName, bind: bindFirstName, reset: resetFirstName} = useInputHook('');
  const {value: lastname, setValue: setLastname, bind: bindLastname, reset: resetLastname} = useInputHook('');
  const {value: age, setValue: setAge, bind: bindAge, reset: resetAge} = useInputHook('');
  const {value: phone, setValue: setPhone, bind: bindPhone, reset: resetPhone} = useInputHook('');


  // Tiene 2 funcionalidades, permite crear un neuvo ride o permite actualizar uno existente
  const handleSubmitDriver = (e) => {
    e.preventDefault();

    let data = {};

    if (operation === "cancelar"){
      return resetAllInputs();
    } 

    
    // const validFields = username && firstname && lastname && email && phone;


    // valido que el usuario ingrese todos los campos
    const allFields = driverId && username && firstname && lastname && age && phone;
    if (!allFields) return alert('Debes completar todos los campos');

    if (operation === 'nuevo') {
      data = { driver_id: driverId, firstname: firstname, lastname: lastname, phone: phone, username: username, age: age };
      dispatch(actions.postDriver(data));

    } else if (operation === 'actualizar') {
      console.log(operation);
      data = { driver_id: driverId, firstname: firstname, lastname: lastname, phone: phone, username: username, age: age };
      
      dispatch(actions.updateDriverById(id, data));

    }

    
    resetAllInputs();

  };

  const resetAllInputs = () => {
    // Reset fields.
    resetDriverID();
    resetUsername();
    resetFirstName();
    resetLastname();
    resetAge();
    resetPhone();
  }

  useEffect(() => {
    dispatch(actions.getDrivers());
  }, [dispatch]); // hace que no se este llamando, solo cambia cuando detecta un cambio en el dispatch

  const driverDetails = (driver, driverId) => {
    console.log("driver details:");
    console.log(driver);
    let detail = `${driver.driver_id} Details:\n\nFirst Name: ${driver.firstname}\nLast Name: ${driver.lastname}\nAge: ${driver.age}\nPhone: ${driver.phone}\nUsername ${driver.username}`;
    alert(detail);
    
  };

  /*
    age: 53
    driver_id: "16125399"
    firstname: "Fuller"
    id: 1
    lastname: "Bentley"
    phone: "5937368753"
    username: "F9U8U4"
  */


  // Setea los valores de ride en los hooks
  const updateDriverById = (driver, driverId) => {
    console.log(driver);
    console.log(driverId);

    setId(driver.id);
    setDriverId(driver.driver_id);
    setUsername(driver.username);
    setFirstName(driver.firstname);
    setLastname(driver.lastname);
    setAge(driver.age);
    setPhone(driver.phone);

   
  };

  const deleteDriverById = (driverId) => {
    console.log(driverId);
    dispatch(actions.deleteDriverById(driverId));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <p>React Drivers Form:</p>


        <form onSubmit={handleSubmitDriver}>
          <input placeholder="id" type="number" hidden {...bindId}></input><br></br>
          <input placeholder="driverId" type="number" {...bindDriverId}></input><br></br>
          <input placeholder="firstName" type="text" {...bindFirstName}></input><br></br>
          <input placeholder="lastname" type="text" {...bindLastname}></input><br></br>
          <input placeholder="username" type="text" {...bindUsername}></input><br></br>
          <input placeholder="age" type="number" {...bindAge}></input><br></br>
          <input placeholder="phone" type="number" {...bindPhone}></input><br></br>

          <input type="submit" onClick={() => { operation = "nuevo"; }} className="MyButton btn btn-primary" value="Nuevo"></input>
          <input type="submit" onClick={() => { operation = "actualizar"; }} className="MyButton btn btn-info" value="Update"></input>
          <input type="submit" onClick={() => { operation = "cancelar"; }} className="MyButton btn btn-danger" value="Cancelar"></input>
        </form>


        <br></br>
        <button value="Home" className="MyButton btn btn-light" onClick={() => history.push("")}>
          Home
        </button>

        
        <table class="demo">
          <caption>Drivers</caption>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Username</th>
              <th>Actions</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {drivers &&
              drivers.length > 0 &&
              drivers.map((driver) => (
                <tr>
                  <td>{driver.firstname + ' ' + driver.lastname}</td>
                  <td>{driver.username}</td>
                  <td>
                    <button className="btn btn-success MyButton" onClick={() => driverDetails(driver, driver.id)}> Details </button>
                    <button className="btn btn-primary MyButton" onClick={() => updateDriverById(driver, driver.id)}> Update </button>
                    <button className="btn btn-danger MyButton" onClick={() => deleteDriverById(driver.id)}> Delete </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Drivers;
