import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Navbar from './components/Navbar/Navbar';
import DataContainer from './containers/DataContainer/DataContainer';





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
          
        

      

        </Switch>

        
      </BrowserRouter>

    </div>
  );
}

export default App;
