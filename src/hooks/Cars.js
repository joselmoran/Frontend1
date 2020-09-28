import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { useHistory } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useInputHook } from "../my-hooks/input-hook";

function Cars() {
  const history = useHistory();
  const dispatch = useDispatch();

  const cars = useSelector((store) => store.cars);
  const deletedCar = useSelector((store) => store.deletedCar);
  const deletedCarError = useSelector((store) => store.deletedCarError);

  let operation;

  // Input-hook fields.
  const {value: carId, setValue: setCarId, bind: bindCarId, reset: resetCarId} = useInputHook('');
  const {value: plateNumber, setValue: setPlateNumber, bind: bindPlateNumber, reset: resetPlateNumber} = useInputHook('');
  const {value: motorSerial, setValue: setMotorSerial, bind: bindMotorSerial, reset: resetMotorSerial} = useInputHook('');
  const {value: chassisSerial, setValue: setChassisSerial, bind: bindChassisSerial, reset: resetChassisSerial} = useInputHook('');
  const {value: color, setValue: setColor, bind: bindColor, reset: resetColor} = useInputHook('');
  const {value: model, setValue: setModel, bind: bindModel, reset: resetModel} = useInputHook('');

  // Tiene 2 funcionalidades, permite crear un neuvo ride o permite actualizar uno existente
  const handleSubmitCar = (e) => {
    e.preventDefault();

    let data = {};

    if (operation === "cancelar"){
      return resetAllInputs();
    } 

    
    // const validFields = username && firstname && lastname && email && phone;


    // valido que el usuario ingrese todos los campos
    const allFields = plateNumber && motorSerial && chassisSerial && color && model ;

    if (!allFields) return alert('Debes completar todos los campos');

    if (operation === 'nuevo') {
      data = { chassis: chassisSerial, color: color, model: model, motor: motorSerial, plate: plateNumber.toString()};
      dispatch(actions.postCar(data));

    } else if (operation === 'actualizar') {
      console.log(operation);
      data = { chassis: chassisSerial, color: color, model: model, motor: motorSerial, plate: plateNumber.toString()};
      
      dispatch(actions.updateCarById(carId, data));

    }

    resetAllInputs();

  };

  const resetAllInputs = () => {
    // Reset fields.
    resetCarId();
    resetPlateNumber();
    resetMotorSerial();
    resetChassisSerial();
    resetColor();
    resetModel();
  }

  useEffect(() => {
    dispatch(actions.getCars());

  }, [dispatch]); // hace que no se este llamando, solo cambia cuando detecta un cambio en el dispatch

  const carDetails = (car, carId) => {
    console.log("car details:");
    console.log(car);
    let detail = `${car.id} Details:\n\nPlate: ${car.plate}\nModel: ${car.model}\nMotor: ${car.motor}\nChassis: ${car.chassis}\nColor: ${car.color}`;
    alert(detail);
    
  };

  /*
    chassis: "XAM05JSI9MD82ZG40XF53914MXY"
    color: "orange"
    id: 1
    model: "Dodge"
    motor: "KFR99BWM1DG74RX07AF93893"
    plate: "F9B7X3"
  */


  // Setea los valores de ride en los hooks
  const updateCarById = (car, carId) => {
    console.log(car);
    console.log(carId);

    setCarId(car.id);
    setPlateNumber(car.plate);
    setMotorSerial(car.motor);
    setChassisSerial(car.chassis);
    setColor(car.color);
    setModel(car.model);

   
  };

  const deleteCarById = (carId) => {
    console.log(carId);
    dispatch(actions.deleteCarById(carId));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <p>React Cars Form:</p>

        <form onSubmit={handleSubmitCar}>
          <input placeholder="carId" className="MyInput" type="text" hidden {...bindCarId}></input><br></br>
          <input placeholder="model" className="MyInput" type="text" {...bindModel}></input><br></br>
          <input placeholder="plateNumber" className="MyInput" type="text" {...bindPlateNumber}></input><br></br>
          <input placeholder="color" className="MyInput" type="text" {...bindColor}></input><br></br>
          <input placeholder="motorSerial" className="MyInput" type="text" {...bindMotorSerial}></input><br></br>
          <input placeholder="chassisSerial" className="MyInput" type="text" {...bindChassisSerial}></input><br></br>

          <input type="submit" onClick={() => { operation = "nuevo"; }} className="MyButton btn btn-primary" value="Nuevo"></input>
          <input type="submit" onClick={() => { operation = "actualizar"; }} className="MyButton btn btn-info" value="Update"></input>
          <input type="submit" onClick={() => { operation = "cancelar"; }} className="MyButton btn btn-danger" value="Cancelar"></input>
        </form>


        
        <br></br>
        <button value="Home" className="MyButton btn btn-light" onClick={() => history.push("")}>
          Home
        </button>



        <table class="demo">
          <caption>Cars</caption>
          <thead>
            <tr>
              <th>Model</th>
              <th>Plate</th>
              <th>Actions</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {cars &&
              cars.length > 0 &&
              cars.map((car) => (
                <tr>
                  <td>{car.model}</td>
                  <td>{car.plate}</td>
                  <td>
                    <button className="btn btn-success MyButton" onClick={() => carDetails(car, car.id)}> Details </button>
                    <button className="btn btn-primary MyButton" onClick={() => updateCarById(car, car.id)}> Update </button>
                    <button className="btn btn-danger MyButton" onClick={() => deleteCarById(car.id)}> Delete </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Cars;