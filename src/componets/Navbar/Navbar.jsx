import React from 'react';
import {Input, notification} from 'antd';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown';
import './Navbar.scss';
import { connect } from 'react-redux';
import { LOGOUT, PROFILE } from '../../redux/types';
/* import { LOGOUT, LOGOUTTIPODATOS, PROFILE, DELETE, FAQ} from '../../redux/types'; */
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navbar = (props) => {


  let history = useHistory();


  const takeMe = (where) => {
    history.push(where);
  }


    // Logout
  const logOut = () => {

    let mensaje = "Hasta pronto " + props.credentials.user.name

    notification.success({message:'¡Hasta luego!',description: mensaje});

    props.dispatch({ type: LOGOUT });
    
/*     props.dispatch({ type: LOGOUTTIPODATOS });
    props.dispatch({ type: DELETE }); */

/*     setTimeout(() => {
      history.push('/datacontainer');
    }, 1) */

    setTimeout(() => {
      history.push('/');
    }, 1)

  }


  const cambiaDatos = async (info) => {
    switch (info) {
/*         case "faq":
            props.dispatch({ type: FAQ, payload: info });

            break;
 */
        case "profile":
        /*     props.dispatch({ type: PROFILE, payload: info }); */

            break;

      default:

        break;
    }
  };

  

    // Vista navbar usuario visitante
  if (props.credentials?.token === '') {
    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse">
                    <a class="navbar-brand mlf-logo-bracket" href="/">[</a>
                    <a class="navbar-brand mlf-logo" href="/">AFTER</a>
                    <a class="navbar-brand mlf-logo-bracket" href="/">]</a>
                </div>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categorías
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">Negocios</a></li>
                                <li><a class="dropdown-item" href="#">Tecnología</a></li>
                                <li><a class="dropdown-item" href="#">Management</a></li>
                            </ul>
                            
                        </li>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-dark me-2 mlf-btn-color" type="submit" >Buscar</button>
                        </form>
                    </ul>
                        <form class="d-flex justify-content-end">
                            <button class="btn btn-outline-dark me-2 mlf-btn-color" type="button" onClick={() => history.push('/login')}>Inicia sesión</button>
                            <button class="btn btn-outline-dark me-2 mlf-btn-color-solid" type="button" onClick={() => history.push('/register')}>Regístrate</button>
                        </form>
               
                </div>
            </div>
        </nav>

/* 


      <div className="nav">
        <div className="logo">
          <NavLink to="/"><img className="img" src={Logo} alt={"logo"}/></NavLink>
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
      </div> */
    )

    // vista navbar usuario logeado
  } else {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse">
              <a class="navbar-brand mlf-logo-bracket" href="/">[</a>
              <a class="navbar-brand mlf-logo" href="/">AFTER</a>
              <a class="navbar-brand mlf-logo-bracket" href="/">]</a>
          </div>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Categorías
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li><a class="dropdown-item" href="#">Negocios</a></li>
                          <li><a class="dropdown-item" href="#">Tecnología</a></li>
                          <li><a class="dropdown-item" href="#">Management</a></li>
                      </ul>
                      
                  </li>
                  <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button class="btn btn-outline-dark me-2 mlf-btn-color" type="submit" >Buscar</button>
                  </form>
              </ul>
                  <form class="d-flex justify-content-end">
                      <button class="btn btn-outline-dark me-2 mlf-btn-color" type="button"  onClick={()=>logOut()} to="/">Cerrar sesión</button>
                      <button class="btn btn-outline-dark me-2 mlf-btn-color" type="button"  onClick={()=> cambiaDatos('projects')} >Mis proyectos</button>
                      <button class="btn btn-outline-dark me-2 mlf-btn-color-solid" type="button" onClick={() => history.push('/profile')}>
                        <div className="fotoUser"><FontAwesomeIcon className="iconMenuLateral" onClick={() => cambiaDatos("profile")} icon={faUser}/> Perfil</div>
                      </button>
                  </form>
         
          </div>
      </div>
  </nav>
  /* 
      <div className="nav">
        <div className="logo">
          <NavLink to="/"><img className="img" src={Logo} alt={"logo"}/></NavLink>
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


              <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/profile" ><div className="fotoUser"><img id="fotoNavBar" alt={"photoUser"} src={PhotoProfile} onClick={() => cambiaDatos("profile")}/></div>
              </NavLink>
            </div>
          </div>
        </div>
      </div> */
        )
    }
};


export default connect((state)=>({credentials:state.credentials}))(Navbar);