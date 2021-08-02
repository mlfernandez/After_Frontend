import React from 'react';
import './DataContainer.scss';
import { connect } from 'react-redux';
import ViewProfile from '../../components/ViewProfile/ViewProfile';
import ViewAdminProject from '../../components/ViewAdminProject/ViewAdminProject';
import ViewAdminProjectCreate from '../../components/ViewAdminProjectCreate/ViewAdminProjectCreate';
import ViewAdminProjectFind from '../../components/ViewAdminProjectFind/ViewAdminProjectFind';



const DataContainer = (props) => {

    const changeView = () => {
        switch (props.views) {


            case 'getprofile':

                return <ViewProfile/>

            case 'getproject':

                return <ViewAdminProject/>
        
            case 'getcategory':

                return 
            
                                
            case 'getrole':

                return 
                
                             
            case 'getuser':

                return  
    
            case 'getnewproject':

                return <ViewAdminProjectCreate/>

            case 'getsearchproject':

                return <ViewAdminProjectFind/>    

                
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