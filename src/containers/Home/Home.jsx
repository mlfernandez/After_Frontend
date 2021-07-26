import React from 'react';
import { connect } from 'react-redux';
import './Home.scss';


const Home = (props) => {


            // Vista Home con usuario visitante
    if (props.credentials?.token !== '') {
        return (

            <div className="HomeContainer">
                Usuario visitante
            </div>
        
        );

            // Vista Home con usuario logeado
    }else if (props.credentials?.token === ''){
        return(

            <div className="HomeContainer">
                Usuario logeado
            </div>
        )
    }
}


export default connect((state) => ({
    credentials:state.credentials, 
    }))(Home);