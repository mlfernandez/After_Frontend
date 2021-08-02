
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { UPDATE } from '../../redux/types'
import { Input, notification } from 'antd';
import './ViewProfile.scss';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import PhotoProfile from '../../images/profilePhoto.png'



const DataProfile = (props) => {
       
        //Hooks
        const [profile, setProfile] = useState([]); 
        const [datosUser, setDatosUser] = useState(
            {
                name : props.credentials.user.name,
                lastName: props.credentials.user.lastName,
                lastName2: props.credentials.user.lastName2,
                email: props.credentials.user.email,
                password: props.credentials.user.password,
                password2: props.credentials.user.password2,
        });        


    const [errors, setErrors] = useState({
        eName : '',
        eLastName: '',
        eLastName2: '',
        eEmail: '',
        ePassword: '',
        ePassword2: '',
        
    });


    useEffect(() => {
    /*     setProfile("vistaLectura"); */
       
      }, []);

    let user = props.credentials.user;   

/*     const changeState = (tipoVista) => {        
        setProfile(tipoVista);
    } */



    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value});
    }


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
                    setErrors({...errors, eLastName: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName.length < 2){
                    setErrors({...errors, eLastName: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName) ) {
                    setErrors({...errors, eLastName: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, eLastName: ''});
                }  
            break;

            case 'lastName2':    
                if(datosUser.lastName2.length < 2){
                    setErrors({...errors, eLastName2: 'El campo Apellido no puede estar vacío.'});
                }else if (datosUser.lastName2.length < 2){
                    setErrors({...errors, eLast_name2: 'El apellido debe de tener al menos 2 caracteres'});
                }else if (! /^[a-z ,.'-]+$/i.test(datosUser.lastName2) ) {
                    setErrors({...errors, eLastName2: 'Introduce el formato de apellido valido'});     
                }else{
                    setErrors({...errors, eLastName2: ''});
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

            default:

            break;


        }
    }


    const saveData = async () => {   
        try { 
      
        let token = props.credentials.token;
        let idUser = props.credentials.user.id;
        let name = datosUser.name;
        let lastName = datosUser.lastName;
        let lastName2 = datosUser.lastName2;
        let email = datosUser.email;
        let password = datosUser.password;
        let password2 = datosUser.password2;


        console.log(idUser, "estoy en saveData")

        var body = {
            id: idUser,
            idUser : idUser,
            name : name,
            lastName: lastName,
            lastName2: lastName2,
            email: email,
            password: password,
            password2: password2,
            
        }

        console.log(body)

        let res = await axios.post('http://localhost:3006/user/update', body,{headers:{'authorization':'Bearer ' + token}});
        console.log(res.data)    



            let data = {
                token: token,
                user : res.data,
                idUser: idUser,
            }

                props.dispatch({type:UPDATE,payload:data});
   
           

    

                notification.success({message:'Atencion.',description: "Datos actualizados correctamente."}); 
            
            } catch (err) {
  
            
            }
    }

    
        return (
            
            <div class="container">

                <div class="row row-cols-2">

                    <div class="col mlf-photoProfile">
                        <img className="img-thumbnail mlf-photoProfile" alt="photo" src={PhotoProfile} width="30%"></img>
                        <div class="col">Boton Subir foto</div>
                    </div>
                    <div class="col">
                        <div class="viewProfileHi">¡Hola {user.name}!</div>
                        <br />
                        <div><h5>Este es tu perfil público,</h5></div>
                        <div><h5>puedes añadir o actualizar información sobre ti.</h5></div>
                    </div>  
                </div>

                <div class="row row-cols-1">
                    
                        <div className = "viewProfileForm"> 

                            <div className="inputViewProfile">
                        
                                <div className = "form-group inputViewProfileForm">

                                    <input className="input form-control inputViewProfileFormItem" type="text" name="name" placeholder={user.name} 
                                        onChange={updateFormulario} onBlur={()=>checkError("name")}
                                        size="40" lenght='30'>
                                    </input>

                                    <div className="msgError text-center mlf-text-small">{errors.eName}</div>

                                    <input className="input form-control inputViewProfileFormItem" type="text" name="lastName"  placeholder={user.lastName} 
                                        onChange={updateFormulario} onBlur={()=>checkError("lastName")}
                                        size="40" lenght='30'>
                                    </input>

                                    <div className="msgError text-center mlf-text-small">{errors.eLastName}</div>

                                    <input className="input form-control inputViewProfileFormItem" type="text" name="lastName2"  placeholder={user.lastName2} 
                                        onChange={updateFormulario} onBlur={()=>checkError("lastName2")}
                                        size="40" lenght='30'>
                                    </input>

                                    <div className="msgError text-center mlf-text-small">{errors.eLastName2}</div>
                                    <input className="input form-control inputViewProfileFormItem" type="text" name="email"  placeholder={user.email} 
                                        onChange={updateFormulario} onBlur={()=>checkError("email")}
                                        size="40" lenght='30'>
                                    </input>

                                    <div className="msgError text-center mlf-text-small">{errors.eEmail}</div>

                                    <input className="input form-control inputViewProfileFormItem" type="password" name="password"  placeholder="************" 
                                        onChange={updateFormulario} onBlur={()=>checkError("password")}
                                        size="34" lenght='8'>
                                    </input>

                                    <div className="msgError text-center mlf-text-small">{errors.ePassword}</div>
     

                                    <input className="input form-control inputViewProfileFormItem" type="password" name="password2"  placeholder="************" 
                                        onChange={updateFormulario} onBlur={()=>checkError("password2")}
                                        size="34" lenght='8'>
                                    </input>
                                    
                                    <div className="msgError text-center mlf-text-small">{errors.ePassword2}</div>
                                    

                                    </div>

                                </div>
                        
                        </div>

                        <div className="mlf-submit-btn">
                            <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={()=>saveData()}>Guardar</button>
                        </div>
                    
                    </div>
            </div>
        )
    }


export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);