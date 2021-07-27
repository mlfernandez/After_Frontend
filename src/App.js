import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Navbar from './components/Navbar/Navbar';
import DataContainer from './containers/DataContainer/DataContainer';


/* ;

import DataContainer from './containers/DataContainer/DataContainer';
import Profile from './containers/Profile/Profile';
import MovieDetails from './containers/MovieDetails/MovieDetails';
import IntroTrailer from './containers/IntroTrailer/IntroTrailer';
import Payment from './containers/Payment/Payment';
import OrderTrailer from './containers/OrderTrailer/OrderTrailer';
import About from './containers/About/About'; */



function App() {
  return (
    <div>
      <BrowserRouter>
      
        <Navbar/>


        <Switch>

          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/datacontainer" exact component={DataContainer}/>
        



  {/*               
                <Route path="/datacontainer" exact component={DataContainer}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/moviedetails" exact component={MovieDetails}/>
                <Route path="/introtrailer" exact component={IntroTrailer}/>
                <Route path="/payment" exact component={Payment}/>
                <Route path="/ordertrailer" exact component={OrderTrailer}/>
                <Route path="/about" exact component={About}/> */}
      

        </Switch>

        
      </BrowserRouter>

    </div>
  );
}

export default App;
