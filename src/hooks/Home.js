import React from "react";
import { useHistory } from "react-router-dom";
import logo from '../logo.svg';
import * as actions from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';

function Home() {

  const history = useHistory();
  const dispatch = useDispatch();
  const data = '';

  const checkToken = () => {
    dispatch(actions.getToken());
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      <h2>Home</h2>

      <div className="HomeButton">

        <button type="button" className=" btn btn-secondary HomeButton " onClick={() => history.push('rides')}>
          Rides
        </button>

        <button type="button" className="btn btn-danger HomeButton" onClick={() => history.push('customers')}>
          Customers
        </button>

        <button type="button" className="btn btn-warning HomeButton" onClick={() => history.push('cars')}>
          Cars
        </button>

        <button type="button" className="btn btn-light HomeButton" onClick={() => history.push('drivers')}>
          Drivers
        </button><br/>

      </div>

      

      <button type="button" class="btn btn-success" onClick={() => checkToken()}>
        Get TOKEN
      </button><br/>

      
    </header>
  </div>
    
      


    
  );
}

export default Home;