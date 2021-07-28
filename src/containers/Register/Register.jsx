import React, {useState} from 'react';
import "./Register.scss";
import axios from 'axios';
import {useHistory} from "react-router";
import moment from 'moment';
import {connect} from 'react-redux';
import {notification} from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import 'antd/dist/antd.css'

const Register = () => {
    let history = useHistory();

    //Hooks
    const [datosUser, setDatosUser] = useState(
        {
            name : '',
            lastName: '',
            lastName2: '',
            email: '',
            password: '',
            password2: '',
            photo: '',
            profile: '',
    });

    const [errors, setErrors] = useState({
        eName : '',
        elastName: '',
        elastName2: '',
        eEmail: '',
        ePassword: '',
        ePassword2: '',
        ePhoto: '',
        eProfile: '',
    });

    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }


    //Comprobación de errores en los campos completados
    const checkError = (arg) => {
        switch (arg){
            case 'name':
                if(datosUser.name.length < 2){
                    setErrors({...errors, eName: 'El campo nombre no puede estar vacío.'});
                }else if(datosUser.name.length < 2){
                    setErrors({...errors, eName: 'El nombre debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.name) ) {
                    setErrors({...errors, eName: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;

            case 'lastName':   
                if(datosUser.lastName.length < 2){
                    setErrors({...errors, elastName: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName.length < 2){
                    setErrors({...errors, elastName: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName) ) {
                    setErrors({...errors, elastName: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, elastName: ''});
                }  
            break;

            case 'lastName2':    
                if(datosUser.lastName2.length < 2){
                    setErrors({...errors, elastName2: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName2.length < 2){
                    setErrors({...errors, eLast_name2: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName2) ) {
                    setErrors({...errors, elastName2: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, elastName2: ''});
                   }   
            break;

            case 'email':
                if(datosUser.email.length < 1){
                    setErrors({...errors, eEmail: 'El campo email no puede estar vacío.'});
                }else if (datosUser.email.length < 4){
                    setErrors({...errors, eEmail: 'El email debe de tener al menos 4 caracteres'});
                }else if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(datosUser.email) ) {
                    setErrors({...errors, eEmail: 'Introduce el formato de email valido ejemplo@ejemplo.com'});                    
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'password':

            // cuando finalize el modo prueba activar password caracteres y simbolos y largo de 8
            // if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(datosUser.password)){
                    // setErrors({...errors, ePassword: 'La contraseña debe tener al menos 8 caracteres'});
       
                if(datosUser.password.length < 1){
                    setErrors({...errors, ePassword: 'El campo password no puede estar vacío.'});
                }else if (datosUser.password.length < 6){
                    setErrors({...errors, ePassword: 'El password debe de tener al menos 6 caracteres'});
                }else if (!/^\+?[0-9]{6}/.test(datosUser.password) ) {
                    setErrors({...errors, ePassword: 'Introduce el password valido'}); 
                }else{
                    setErrors({...errors, ePassword: ''});
                }
                
            break;

            case 'password2':
                if (datosUser.password !== datosUser.password2){
                    setErrors({...errors, ePassword2: 'Las contraseñas no coinciden.'});
                }else{
                    setErrors({...errors, ePassword2: ''});
                }
            break;

        }
    }

    const ejecutaRegistro = async () => {
        

        let  user = {

            name : datosUser.name,
            lastName: datosUser.lastName,
            lastName2: datosUser.lastName2,
            email: datosUser.email,
            password: datosUser.password,
            password2: datosUser.password2,        

        }

        var  array = Object.entries(user);
        var num = array.length;

        for (let x = 0; x < num; x++){
            if(array[x][1] === ''){
                let campoVacio = ("El campo " + array[x][0] + " no puede estar vacío.");
                return setNewMessage(campoVacio);
            }

        }
       
     
         axios.post(("http://localhost:3006/user"), user)        
        .then(res => {
            notification.success({message:'Usuario registrado.',description: "Te hemos enviado un email para activar la cuenta." });

            setTimeout(()=> {
                history.push('/login');
            }, 5000);     
        }).catch(err => {
           
            var errorText = err.response.data.message;
            if (errorText.includes("email")){
                setNewMessage(JSON.stringify("El email ya existe en la base de datos."));

            } else {
                setNewMessage(JSON.stringify(err.response.data.message));            
            }
            
        });     
      
    }    

    return (

<div className = "registerContainer">

    <h5 className="registerTitle">Comienza a ganar experiencia, ¡regístrate!</h5>

    <div className = "registerForm"> 

        <div className="inputRegister">

                <div className="iconRegisterForm">
                    <div className="icon"><FontAwesomeIcon className="iconRegisterFormItem" icon={faUser}/> {/* name */}</div>
                    
                    <div className="icon"><FontAwesomeIcon className="iconRegisterFormItem" icon={faAt}/> {/* email */}</div>
                    
                    <div className="icon"><FontAwesomeIcon className="iconRegisterFormItem" icon={faLock}/> {/* password */}</div>
                    
                    <div className="icon"><FontAwesomeIcon className="iconRegisterFormItem" icon={faLock}/> {/* password2 */}</div>
                    
                </div>
            
                <div className = "form-group inputRegisterForm">
                    
                    <input className="input" type="text" name="name" className="form-control inputRegisterFormItem"
                        onChange={updateFormulario} onBlur={()=>checkError("name")} 
                        placeholder="Nombre" size="40" lenght='30'>
                    </input>
                    
                    <div className="msgError text-center mlf-text-small">{errors.eName}</div>

                    <input className="input" type="email" name="email" className="form-control inputRegisterFormItem"
                        onChange={updateFormulario} onBlur={()=>checkError("email")} 
                        placeholder="Email" size="40" lenght='30'>
                    </input>
                    
                    <div className="msgError text-center mlf-text-small">{errors.eEmail}</div>

                    <input className="input" type="password" name="password" className="form-control inputRegisterFormItem"
                        onChange={updateFormulario} onBlur={()=>checkError("password")} 
                        placeholder="Contraseña" size="40" lenght='8'>
                    </input>
                    
                    <div className="msgError text-center mlf-text-small">{errors.ePassword}</div>

                    <input className="input" type="password" name="password2" className="form-control inputRegisterFormItem"
                        onChange={updateFormulario} onBlur={()=>checkError("password2")} 
                        placeholder="Confirmar contraseña" size="40" lenght='8'>
                    </input>
                    
                    <div className="msgError text-center" mlf-text-small>{errors.ePassword2}</div>

                </div>

            </div>
            
            <div className="mlf-submit-btn">
                <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={()=>ejecutaRegistro()}>Enviar</button>
            </div>

            <div className="msgError text-center">{newMessage}</div>

            <p className="forgot-password text-center">
                ¿Ya tienes cuenta? <a href="/login">¡Inicia sesión aqui!</a>
            </p>
        </div>
    </div>

)

}

export default connect()(Register);