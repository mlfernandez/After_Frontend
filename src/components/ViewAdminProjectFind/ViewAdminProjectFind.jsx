
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { GETPROJECT, UPDATE } from '../../redux/types'
import { Input, notification } from 'antd';
import './ViewAdminProjectFind.scss';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";




const DataProject = (props) => {
       
        //Hooks
        /* const [profile, setProfile] = useState([]);  */
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




    const searchProject = async () => {

        try {
            let token = props.credentials.token;
            let search = document.getElementById("search").value; 
            let query = document.getElementById("query").value; 
            
            console.log(token, "token")
            console.log(search, "search")
            console.log(query, "query")
    
            if (search === "id") {


                let body = {
                    idProject : query
                }

                console.log(body, "body")

                var res = await axios.post("http://localhost:3006/project/id", body, {headers:{'authorization':'Bearer ' + token}})

            }
            

            console.log(res, "esto es res")
            console.log(res.data, "esto es todo")
            setProject(res.data)
        } catch (err) {

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




    

    if (props.credentials?.user?.profile === "admin") {
        

        return (
            
            <div class="container">

                <div class="row row-cols">

                    <div class="col viewProyectHi">
                        <div class="viewProyectHi">¡{user.name}!</div>
                        <br />
                        <div><h5>¡Busquemos algun proyecto!</h5></div>
                    </div>  

                </div>

                <div class="row row-cols">

                    <div className = "registerForm"> 

                        <div className="inputRegister">

                            <div className = "form-group inputRegisterForm">


                                
                                <select id="search" class="form-select inputRegisterFormItem" aria-label="Default select example" onChange={()=>searchProject(document.getElementById("search").value)}>
                                    <option selected>Buscar por:</option>
                                    <option value="id">Id</option>
                                    <option value="nombre">Nombre</option>
                                    <option value="activo">activo</option>
                                    <option value="curso">curso</option>
                                    <option value="finalizado">finalizado</option>
                                    <option value="inactivo">inactivo</option>
                                    <option value="all">todos</option>
                                </select>

                                <input id="query" className="input form-control inputRegisterFormItem" type="text" name="name" 
                                    onChange={()=>searchProject(document.getElementById("query").value)}
                                    placeholder="Buscar" size="40" lenght='30'>
                                </input>
                    

                            </div>

                        </div>

                    </div>

                    <div className="row row-cols-4 ">
                        <div className="col mlf-submit-btn">
                        </div>
                        <div className="col mlf-submit-btn">
                            <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={()=>searchProject()}>Buscar</button>
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