import React from 'react';
import './DataContainer.scss';
import ViewProfile from '../../components/ViewProfile/ViewProfile';

import { connect } from 'react-redux';
/* import SearchTopRated from '../../components/SearchTopRated/SearchTopRated';
import SearchComingSoon from '../../components/SearchComingSoon/SearchComingSoon';
import SearchBy from '../../components/SearchBy/SearchBy';
import Shopping from '../../components/Shopping/Shopping';
import DataProfile from '../../components/DataProfile/DataProfile';
import DataAdminOrders from '../../components/DataAdminOrders/DataAdminOrders';
import DataAdminUsers from '../../components/DataAdminUsers/DataAdminUsers';
import DataAdminSearchMovie from '../../components/DataAdminSearchMovie/DataAdminSearchMovie';
import Faq from '../../components/Faq/Faq'; */


const DataContainer = (props) => {

    const changeView = () => {
        switch (props.views) {


            case 'getprofile':

                return <ViewProfile/>

/*             case 'getcomingsoon':

                return <SearchComingSoon/>    
           
            
            case 'getsearch':

                return <SearchBy/>      

            case 'getorder':

                return <Shopping/>       
            
            case 'getprofile':

                return <DataProfile/>   

            case 'getallorders':

                return <DataAdminOrders/>  

            case 'getallusers':

                return <DataAdminUsers/>     

            case 'getmoviebyid':

                return <DataAdminSearchMovie/>        

            case 'faq':

                return <Faq/>    */     
                
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
    tipodatos: state.tipodatos
}))(DataContainer);