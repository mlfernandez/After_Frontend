import React from 'react';
import './DataContainer.scss';
import ViewProfile from '../../components/ViewProfile/ViewProfile';

import { connect } from 'react-redux';



const DataContainer = (props) => {

    const changeView = () => {
        switch (props.views) {


            case 'getprofile':

                return <ViewProfile/>

            /* case 'getproject':

                return 
        
            case 'getcategory':

                return 
            
                                
            case 'getrole':

                return 
                
                             
            case 'getuser':

                return  */
    
                
            default:

                return 
        }

    }

    return (
        <div>

            <div>
            
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