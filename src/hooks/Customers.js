import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { useHistory } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useInputHook } from "../my-hooks/input-hook";

function Customers() {
  const history = useHistory();
  const dispatch = useDispatch();

  const customers = useSelector((store) => store.customers);
  const deletedCustomer = useSelector((store) => store.deletedCustomer);
  const deletedCustomerError = useSelector((store) => store.deletedCustomerError);
  let operation;

  // Input-hook fields.
  const { value: id, setValue: setId, bind: bindId, reset: resetId } = useInputHook('');
  const { value: customerId, setValue: setCustomerId, bind: bindCustomerId, reset: resetCustomerId } = useInputHook('');
  const { value: firstname, setValue: setFirstname, bind: bindFirstname, reset: resetFirstname } = useInputHook('');
  const { value: lastname, setValue: setLastname, bind: bindLastname, reset: resetLastname } = useInputHook('');
  const { value: phone, setValue: setPhone, bind: bindPhone, reset: resetPhone } = useInputHook('');
  const { value: username, setValue: setUsername, bind: bindUsername, reset: resetUsername } = useInputHook('');
  const { value: email, setValue: setEmail, bind: bindEmail, reset: resetEmail } = useInputHook('');


  // Tiene 2 funcionalidades, permite crear un neuvo ride o permite actualizar uno existente
  const handleSubmitCustomer = (e) => {
    e.preventDefault();

    let data = {};

    if (operation === "cancelar"){
      return resetAllInputs();
    } 


    // valido que el usuario ingrese todos los campos
    const allFields = username && firstname && lastname && email && phone;
    if (!allFields) return alert('Debes completar todos los campos');

    if (operation === 'nuevo') {
      data = { customer_id: customerId, firstname: firstname, lastname: lastname, phone: phone, username: username, email: email };
      dispatch(actions.postCustomers(data));

    } else if (operation === 'actualizar') {
      // console.log(operation);
      data = { customer_id: customerId, firstname: firstname, lastname: lastname, phone: phone, username: username, email: email };
      
      dispatch(actions.updateCustomerById(id, data));

    }
    
    
    resetAllInputs();

  };

  const resetAllInputs = () => {
    // Reset fields.
    resetCustomerId();
    resetUsername();
    resetFirstname();
    resetLastname();
    resetEmail();
    resetPhone();
  }

  useEffect(() => {
    dispatch(actions.getCustomers());

  }, [dispatch]); // hace que no se este llamando, solo cambia cuando detecta un cambio en el dispatch

  const customerDetails = (customer, customerId) => {
    console.log("Customer details:");
    console.log(customer);
    let detail = `${customer.customer_id} Details:\n\nFirst Name: ${customer.firstname}\nLast Name: ${customer.lastname}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nUsername ${customer.username}`;
    alert(detail);
    // console.log(customerId);
  };

  /*
    customer_id: 16417399
    email: "sit.amet.luctus@nonummy.co.uk"
    firstname: "Rooney"
    id: 129
    lastname: "Levy"
    phone: "6418021079"
    username: "D5A1M5L5F6"
  */


  // Setea los valores de ride en los hooks
  const updateCustomerById = (customer, customerId) => {
    console.log(customer);
    console.log(customerId);

    setId(customer.id);
    setCustomerId(customer.customer_id);
    setUsername(customer.username);
    setFirstname(customer.firstname);
    setLastname(customer.lastname);
    setEmail(customer.email);
    setPhone(customer.phone);
  };

  const deleteCustomerById = (customerId) => {
    console.log(customerId);
    dispatch(actions.deleteCustomerById(customerId));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <p>React Customers Form:</p>


        <form onSubmit={handleSubmitCustomer}>
          <input placeholder="id" type="number" className="MyInput" hidden {...bindId}></input><br></br>
          <input placeholder="customerId" type="number" className="MyInput"  {...bindCustomerId}></input><br></br>
          <input placeholder="firstname" type="text" className="MyInput" {...bindFirstname}></input><br></br>
          <input placeholder="lastname" type="text" className="MyInput" {...bindLastname}></input><br></br>
          <input placeholder="username" type="text" className="MyInput" {...bindUsername}></input><br></br>
          <input placeholder="email" type="email" className="MyInput" {...bindEmail}></input><br></br>
          <input placeholder="phone" type="number" className="MyInput" {...bindPhone}></input><br></br>

          <input type="submit" onClick={() => { operation = "nuevo"; }} className="MyButton btn btn-primary" value="Nuevo"></input>
          <input type="submit" onClick={() => { operation = "actualizar"; }} className="MyButton btn btn-info" value="Update"></input>
          <input type="submit" onClick={() => { operation = "cancelar"; }} className="MyButton btn btn-danger" value="Cancelar"></input>
        </form>

        <br></br>
        <button value="Home" className="MyButton btn btn-light" onClick={() => history.push("")}>
          Home
        </button>



        <table class="demo">
          <caption>Customers</caption>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.length > 0 &&
              customers.map((customer) => (
                <tr>
                  <td>{customer.firstname + ' ' + customer.lastname}</td>
                  <td>{customer.email}</td>
                  <td>
                    <button className="btn btn-success MyButton" onClick={() => customerDetails(customer, customer.id)}> Details </button>
                    <button className="btn btn-primary MyButton" onClick={() => updateCustomerById(customer, customer.id)}> Update </button>
                    <button className="btn btn-danger MyButton" onClick={() => deleteCustomerById(customer.id)}> Delete </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Customers;
