
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { GETPROJECT, UPDATE } from '../../redux/types'
import { Input, notification } from 'antd';
import './ViewAdminProjectCreate.scss';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";




const DataProject = (props) => {
       
        //Hooks

        const [project, setProject] = useState([]); 
        const [datosProject, setDatosProject] = useState(
            {
                name : '',
                state : '',
                endDate : '',
                idCategory : '',
            }); 
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
        eEndDate : '', 
        
    });


    useEffect(() => {
    
   
       
      }, []);

    let user = props.credentials.user;   


    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosProject({...datosProject, [e.target.name]: e.target.value});
    }


    const checkError = (arg) => {
        switch (arg){

            case 'name':
                if(datosProject.name.length < 3){
                    setErrors({...errors, eName: 'El campo nombre debe tener más caracteres.'});
                }else if (! /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(datosProject.name) ) {
                    setErrors({...errors, eName: 'Introduce el formato de nombre valido'}); 
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;

            case 'endDate':
                let today = moment().format("DD/MM/YYYY")
                let endDate = moment(datosProject.endDate).format("DD/MM/YYYY")
                console.log (today)
                console.log (endDate)
                if (today > endDate){
                    setErrors({...errors, eEndDate: 'La fecha debe ser mayor a hoy'});
                }else {
                    setErrors({...errors, eEndDate: ''});
                }
            break;
            

            default:

            break;


        }
    }


 
    const cambiaDatos = async (info) => {
        switch (info) {
    
            case "getproject":
                props.dispatch({ type: GETPROJECT, payload: info });
    
                break;
    
    
            default:
    
                break;
            }
      };




    const createNewProject = async () => {   

        let today = moment().format("DD/MM/YYYY")
        let endDate = moment(datosProject.endDate).format("DD/MM/YYYY")
        
        if ((datosProject.name.length > 3) &
            (/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(datosProject.name) ) &
            (today < endDate)
            ) {
                
            let token = props.credentials.token;
            let state = document.getElementById("state").value;  
            let idCategory = document.getElementById("category").value;  

            var project = {

                name : datosProject.name,
                state: state,
                endDate: datosProject.endDate,
                idCategory: idCategory,
                
            }

            console.log(project)

            axios.post(("http://localhost:3006/project"), project, {headers:{'authorization':'Bearer ' + token}})    
            .then(res => {
                notification.success({message:'Proyecto creado',description: "Se ha creado el proyecto con éxito." });
        
            }).catch(err => {
    
                
            }); 
            setNewMessage("Proyecto creado con éxito.");
        

        } else { 

            
            setNewMessage("Los datos no son correctos, no se pudo crear el proyecto.");

        }
    }

    if (props.credentials?.user?.profile === "admin") {
        

        return (
            
            <div class="container">

                <div class="row row-cols">

                    <div class="col viewProyectHi">
                        <div class="viewProyectHi">¡{user.name}!</div>
                        <br />
                        <div><h5>¡Es hora de crear nuevos proyectos!</h5></div>
                    </div>  

                </div>

                <div class="row row-cols">

                    <div className = "registerForm"> 

                        <div className="inputRegister">

                            <div className = "form-group inputRegisterForm">

                                <input className="input form-control inputRegisterFormItem" type="text" name="name" 
                                    onChange={updateFormulario} onBlur={()=>checkError("name")} 
                                    placeholder="Nombre del proyecto" size="40" lenght='30'>
                                </input>
                    
                                <div className="msgError text-center mlf-text-small">{errors.eName}</div>
                                
                                <select id="state" class="form-select inputRegisterFormItem" aria-label="Default select example">
                                    <option selected>Elegir estado:</option>
                                    <option value="activo">activo</option>
                                    <option value="curso">curso</option>
                                    <option value="finalizado">finalizado</option>
                                    <option value="inactivo">inactivo</option>
                                </select>

                                <input className="input form-control inputRegisterFormItem" type="date" name="endDate" 
                                    onChange={updateFormulario} onBlur={()=>checkError("endDate")} 
                                    placeholder="Fecha finalizacion" size="40" lenght='8'>
                                </input>
                                
                                <div className="msgError text-center mlf-text-small">{errors.eEndDate}</div>

                                <select id="category" class="form-select inputRegisterFormItem" aria-label="Default select example">
                                    <option selected>Elegir categoría:</option>
                                    <option value="1">Tecnología</option>
                                    <option value="2">Negocios</option>
                                    <option value="3">Logística</option>
                                    <option value="4">Administración</option>
                                </select>
                                
                                
        

                            </div>

                        </div>

                        <div className="msgError text-center">{newMessage}</div>
                        <br />

                    </div>

                    <div className="row row-cols-4 ">
                        <div className="col mlf-submit-btn">
                        </div>
                        <div className="col mlf-submit-btn">
                            <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={()=>createNewProject()}>Guardar</button>
                        </div>
                        <div className="col mlf-submit-btn">
                        <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={() => cambiaDatos("getproject")}>Volver</button>
                        </div>
                        <div className="col mlf-submit-btn">
                        </div>
                    </div>





                </div>

            </div>    

        )

    }
}



export default connect((state)=>({
    credentials:state.credentials,
}))(DataProject);