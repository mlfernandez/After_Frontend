
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {LOGIN} from '../../redux/types'
import {notification} from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import './Login.scss';
import 'antd/dist/antd.css';




const Login = (props) => {

    let history = useHistory();

    //Hooks
    const [credentials, setCredentials] = useState({email:'', password:''});
    const [msgError, setMensajeError] = useState('');
    
    //Handle
    const updateCredentials = (e) => {
        setCredentials ({...credentials, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                logueame();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    },[credentials]);

    const logueame = async () => {

        //Primero, testeamos los datos
            
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email) ) {
             setMensajeError('Introduce el formato de email valido ejemplo@ejemplo.com');
             return;
        }

        //Luego, generamos el body de datos
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        
        //Axios      
        try {var res = await axios.post('http://localhost:3006/login', body);
           
        console.log(res.data.user)
               
                let data = {
                    token : res.data.token,
                    user : res.data.user,
                    idUser: res.data.user.id,
                    
                }

                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
                               
                //Mensaje de bienvenida
                let description = ("¡Hola " + res.data.user.name + "!");
                
    
                notification.success({message:'Login correcto.',description: description});
                
                //Redireccion           
                history.push("/datacontainer");

            } catch (err) {
                    
                   if (err.response.data.message.includes("La cuenta no está activa.")) {   
                       
                    console.log(err.response.data.message)
                    notification.warning({message:'Atencion!', description: "La cuenta no está activa. Por favor, revisa tu correo electrónico y activa tu cuenta."});

                    } else { 
                    
                    notification.warning({message:'Atencion.',description: "Usuario o password incorrecto."});              
                    }
            
                
                }
                    
}

    return (

        <div className = "loginContainer">

            <h5 className="loginTitle">¡Inicia sesión en tu cuenta de [ After ]!</h5>

            
    
            <div className = "loginForm"> 

                <div className="inputLogin">

                    <div className="iconLoginForm">
                        <FontAwesomeIcon className="iconLoginFormItem" icon={faUser}/>
                        <FontAwesomeIcon className="iconLoginFormItem" icon={faLock}/>
                    </div>
                
                    <div className = "form-group inputLoginForm">

                        <input className="input form-control inputLoginFormItem" type="email" name="email" placeholder="Email" 
                            onChange={updateCredentials} size="40" lenght='30'>
                        </input>

                        <input className="input form-control inputLoginFormItem" type="password" name="password" placeholder="Contraseña" 
                            onChange={updateCredentials} size="40" lenght='30'>
                        </input>

                        </div>
                        <div className = "form-group inputLoginForm">
                        </div>

                     </div>
                
                <div className="mlf-submit-btn">
                    <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={()=>logueame()}>Iniciar sesión</button>

                </div>

                <div className="msgError text-center">{msgError}</div>

                <p className="forgot-password text-center">
                    Olvidó la <a href="#">contraseña?</a>
                </p>
                <p className="forgot-password text-center">
                    ¿Aun no tienes cuenta? <a href="/register">¡Registrate aqui!</a>
                </p>
            </div>
        </div>
    )
      
        
    
}

export default connect()(Login);