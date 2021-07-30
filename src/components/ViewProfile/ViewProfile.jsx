
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { UPDATE } from '../../redux/types'
import { Input, notification } from 'antd';
import './ViewProfile.scss';
import moment from 'moment';



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
        setProfile("vistaLectura");
       
      }, []);

    let user = props.credentials.user;   

    const changeState = (tipoVista) => {        
        setProfile(tipoVista);
    }



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


    const saveData = async (tipoVista) => {   
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

        let res = await axios.post('http://localhost:3006/user',body,{headers:{'authorization':'Bearer ' + token}});
        console.log(res.data)    



            let data = {
                token: token,
                user : res.data,
                idUser: idUser,
            }

                props.dispatch({type:UPDATE,payload:data});
   
           

                setProfile(tipoVista);

                notification.success({message:'Atencion.',description: "Datos actualizados correctamente."}); 
            
            } catch (err) {
  
            
            }
    }

    if (profile === "vistaLectura") {
    
        return (
            
            <div>

{/*                 <div class="row row-cols-2 row-cols-lg-3">
                    <div class="col">Column</div>
                    <div class="col">Column</div>
                    <div class="col">Column</div>
                    <div class="col">Column</div>
                    <div class="col">Column</div>
                    <div class="col">Column</div>
                    <div class="col-4 col-lg-2">Column</div>
                    <div class="col-4 col-lg-2">Column</div>
                    <div class="col-4 col-lg-2">Column</div>
                    <div class="col-4 col-lg-2">Column</div>
                    <div class="col-4 col-lg-2">Column</div>
                    <div class="col-4 col-lg-2">Column</div>
                </div> */}
                <div className="tituloDataProfile">Perfil del usuario</div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUserProfile"><img className="img"  alt="Profile photo" /></div>
                        <p>Nombre: <input className="inputBaseUser"  readonly="readonly" type="text" name="name" value={user.name} size="34" lenght='30'></input></p>
                        <p>Primer apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName1"  value={user.last_name1} size="34" lenght='30' ></input></p>
                        <p>Segundo apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName2"  value={user.last_name2} size="34" lenght='30'></input></p>
                        <p>Email: <input className="inputBaseUser"  readonly="readonly" type="text" name="email"  value={user.email} size="34" lenght='30'></input></p>
                        <p>Password: <input className="inputBaseUser"  readonly="readonly" type="password" name="password"  value="************" size="34" lenght='8'></input></p>
                        <p>Fecha de nacimiento: <input className="inputBaseUser"  readonly="readonly" type="text" name="birthday" value={moment(user.birthday).format('L')} ></input></p>   
                    </div>


                    <div className="infoUser2">
                    
                        <div className="botonEdit"><div className="sendButtonEdit" onClick={(()=>changeState("vistaEdicion"))}>Editar</div></div>
                        <div className="inputBlank"><p>Datos de pago se pueden editar.</p></div>
                        <p>Número de tarjeta: <input className="inputBaseUser"  readonly="readonly" type="text" name="creditCardNumber"  value={user.creditCardNumber} size="34" lenght='30'></input></p>
                        <p>Nombre del titular: <input className="inputBaseUser"  readonly="readonly" type="text" name="creditCardName"  value={user.creditCardName} size="34" lenght='30'></input></p>
                        <p>Fecha de expiración: <input className="inputBaseUser"  readonly="readonly" type="text" name="creditCardExpDate"  value={moment(user.creditCardExpDate).format('L')} size="34" lenght='30'></input></p>
                        <p>Código de seguridad: <input className="inputBaseUser"  readonly="readonly" type="password" name="creditCardSecureCodeNumber" value="************" size="34" lenght='30'></input></p>
                        <p>DNI: <input className="inputBaseUser"  readonly="readonly" type="text" name="dni"  value={user.dni} size="34" maxlenght='9' ></input></p>

                    </div>

                </div>

            </div>
        )
    } else {
        return (
            <div>
                <div className="tituloDataProfile"><h1>Editar datos del usuario</h1></div>
                <div className="boxDataProfileUser">

                    <div className="infoUser1">
                        <div className="fotoUserProfile"><img className="img" alt="Profile photo" /></div>
                        <p>Nombre: <input className="inputBaseUser"  readonly="readonly" type="text" name="name" value={user.name} size="34" lenght='30'></input></p>
                        <p>Primer apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName1"  value={user.last_name1} size="34" lenght='30' ></input></p>
                        <p>Segundo apellido: <input className="inputBaseUser"  readonly="readonly" type="text" name="lastName2"  value={user.last_name2} size="34" lenght='30'></input></p>
                        <p>Email: <input className="inputBaseUser"  readonly="readonly" type="text" name="email"  value={user.email} size="34" lenght='30'></input></p>
                        <p>Password: <input className="inputBaseUser"  readonly="readonly" type="password" name="password"  value="************" size="34" lenght='8'></input></p>
                        <p>Fecha de nacimiento: <input className="inputBaseUser"  readonly="readonly" type="text" name="birthday" value={moment(user.birthday).format('L')} ></input></p>   
                    </div>
    

                    <div className="infoUser2">
                        <div className="botonEdit"><div className="sendButtonEdit"  onClick={(()=>saveData("vistaLectura"))}>Guardar</div></div>
                        <div className="inputBlank"><p>Datos de pago se pueden editar.</p></div>
                        <p>Número de tarjeta:  </p>
                        <input className="inputBaseUser"   type="text" name="creditCardNumber" onChange={updateFormulario} onBlur={()=>checkError("creditCardNumber")} placeholder={user.creditCardNumber} size="34" lenght='30'></input>
                        <div>{errors.eCreditCardNumber}</div>
                        <p>Nombre del titular: </p>
                        <input className="inputBaseUser"   type="text" name="creditCardName"  onChange={updateFormulario} onBlur={()=>checkError("creditCardName")} placeholder={user.creditCardName} size="34" lenght='30'></input>
                        <div>{errors.eCreditCardName}</div>
                        <p>Fecha de expiración: </p>
                        <input className="inputBaseUser"  type="text" name="creditCardExpDate" onChange={updateFormulario} onBlur={()=>checkError("creditCardExpDate")} placeholder={moment(user.creditCardExpDate).format('L')} size="34" lenght='30'></input>
                        <div>{errors.eCreditCardExpDate}</div>
                        <p>Código de seguridad: </p>
                        <input className="inputBaseUser"   type="password" name="creditCardSecureCodeNumber" onChange={updateFormulario} onBlur={()=>checkError("creditCardSecureCodeNumber")}  placeholder="************" size="34" lenght='30'></input>
                        <div>{errors.eCreditCardSecureCodeNumber}</div>
                        <p>DNI: </p>
                        <input className="inputBaseUser" readonly="readonly" type="text" name="dni"  placeholder={props.credentials.user.dni} size="34" maxlenght='9' ></input>
        

                    </div>

                </div>

            </div>
        )
    }
}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProfile);