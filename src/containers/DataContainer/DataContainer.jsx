import React from 'react';
import './DataContainer.scss';
import ViewProfile from '../../components/ViewProfile/ViewProfile';

import { connect } from 'react-redux';



const DataContainer = (props) => {

    const changeView = () => {
        switch (props.views) {


            case 'getprofile':

                return <ViewProfile/>
    
                
            default:

                return 
        }

    }

    return (
        <div>

            <div className="boxPerfilUsuario">
            
                <div className="datos">
                    {changeView()}
                </div>
            </div>


        </div>
    )

}

export default connect((state) => ({
    user: state.credentials.user,
    views: state.views
}))(DataContainer);