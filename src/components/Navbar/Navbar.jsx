import React from 'react';
import {notification} from 'antd';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown';
import './Navbar.scss';
import { connect } from 'react-redux';
import { LOGOUT, GETPROFILE, GETPROJECT, GETCATEGORY, GETROLE, GETUSER } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navbar = (props) => {


  let history = useHistory();


/*   const takeMe = (where) => {
    history.push(where);
  }
 */

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

        case "getprofile":
            props.dispatch({ type: GETPROFILE, payload: info });

            break;

        case "getproject":
            props.dispatch({ type: GETPROJECT, payload: info });

            break;

        case "getcategory":
            props.dispatch({ type: GETCATEGORY, payload: info });

            break;

        case "getrole":
            props.dispatch({ type: GETROLE, payload: info });

            break;

        case "getuser":
            props.dispatch({ type: GETUSER, payload: info });

            break;


        default:

            break;
        }
  };

  

    // Vista navbar usuario visitante
  if (props.credentials?.token === '') {
    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 rounded">
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
    )

    // vista navbar usuario logeado
  } else if ((props.credentials?.user?.profile === "user" )) {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 rounded">
      <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse">
              <a class="navbar-brand mlf-logo-bracket" href="/">[</a>
              <a class="navbar-brand mlf-logo" href="/">AFTER</a>
              <a class="navbar-brand mlf-logo-bracket" href="/">]</a>
          </div>

          <div className="blank"></div>
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
 
                  </form>
          </div>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle btn btn-outline-dark me-2 mlf-btn-color-solid mlf-btn-profile" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon className="iconMenuLateral" icon={faUser}/> Perfil
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <li><a class="dropdown-item" onClick={() => cambiaDatos("getprofile")}>Mis datos</a></li>
                          <li><a class="dropdown-item" href="#">Mis proyectos</a></li>
                          <li><a class="dropdown-item" href="#">Otros</a></li>
                      </ul>
                  </li>
              </ul>    
          </div>
      </div>
  </nav>

        )

        // Vista administrador
    } else if (props.credentials?.user?.profile === "admin"){
        return (
          <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 rounded">
          <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse">
                  <a class="navbar-brand mlf-logo-bracket" href="/">[</a>
                  <a class="navbar-brand mlf-logo" href="/">AFTER</a>
                  <a class="navbar-brand mlf-logo-bracket" href="/">]</a>
              </div>
    
              <div className="blank"></div>
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
             {/*              <button class="btn btn-outline-dark me-2 mlf-btn-color" type="button"  onClick={()=> cambiaDatos('projects')} >Mis proyectos</button> */}
                          
                      </form>
              </div>
    
              <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle btn btn-outline-dark me-2 mlf-btn-color-solid mlf-btn-profile" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon className="iconMenuLateral" icon={faUser}/> Perfil Admin
                          </a>
                          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                              <li><a class="dropdown-item" onClick={() => cambiaDatos("getprofile")}>Mis datos</a></li>
                              <li><a class="dropdown-item" onClick={() => cambiaDatos("getproject")}>CRUD proyectos</a></li>
                              <li><a class="dropdown-item" onClick={() => cambiaDatos("getcategory")}>CRUD categorías</a></li>
                              <li><a class="dropdown-item" onClick={() => cambiaDatos("getrole")}>CRUD roles</a></li>
                              <li><a class="dropdown-item" onClick={() => cambiaDatos("getuser")}>CRUD usuarios</a></li>
                          </ul>
                      </li>
                  </ul>    
              </div>
          </div>
      </nav>
        )
    }

};


export default connect((state)=>({credentials:state.credentials}))(Navbar);