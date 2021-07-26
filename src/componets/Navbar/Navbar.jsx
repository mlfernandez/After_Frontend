import React from 'react';
import Logo from '../../images/afterlog.png';
import PhotoProfile from '../../images/afterlog.png'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT, LOGOUTTIPODATOS, PROFILE, DELETE, FAQ} from '../../redux/types';
import { useHistory } from 'react-router-dom';
import {Input, notification} from 'antd';

const Header = (props) => {


  let history = useHistory();


  const takeMe = (where) => {
    history.push(where);
  }

  const logOut = () => {

    let mensaje = "Hasta pronto " + props.credentials.user.name

    notification.success({message:'Logout correcto.',description: mensaje});

    props.dispatch({ type: LOGOUT });
    
/*     props.dispatch({ type: LOGOUTTIPODATOS });
    props.dispatch({ type: DELETE }); */

    setTimeout(() => {
      history.push('/datacontainer');
    }, 1)

  }


  const cambiaDatos = async (info) => {
    switch (info) {
        case "faq":
            props.dispatch({ type: FAQ, payload: info });

            break;

        case "profile":
            props.dispatch({ type: PROFILE, payload: info });

            break;

      default:

        break;
    }
  };



  if (props.credentials?.token == '') {
    return (
      <div className="nav">
        <div className="logo">
          <NavLink to="/"><img className="img" src={Logo} /></NavLink>
        </div>

        <div className="blank"></div>

        <div className="NavMenu" >
        <div className="NavLink">
            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">About</NavLink>
          </div>
          <div className="NavLink">
            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/register">Registrarse</NavLink>
          </div>
          <div className="NavLink" activeClassName="selected">
          <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    )

  } else {
    return (
      <div className="nav">
        <div className="logo">
          <NavLink to="/"><img className="img" src={Logo} /></NavLink>
        </div>
        <div className="blank"></div>
        <div className="NavMenu">
          <div className="NavLink">
            
            <div className="NavLink">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/about">About</NavLink>
            </div>
            
            <div className="NavLink">
              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} onClick={()=>logOut()} to="/">Logout</NavLink>
            </div>

            <div className="NavLink" activeClassName="selected">


              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/profile" ><div className="fotoUser"><img id="fotoNavBar" src={PhotoProfile} onClick={() => cambiaDatos("profile")} alt="Profile photo" /></div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
        )
}


};


export default connect((state)=>({credentials:state.credentials}))(Header);