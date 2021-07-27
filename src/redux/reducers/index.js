import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import views from './views-reducer'
/* import tipodatos from './tipodatos-reducer';
import movie from './movie-reducer';
import user from './user-reducer';
import order from './order-reducer'; */



const rootReducer = combineReducers({
    credentials,
    views,
/*     tipodatos,
    movie,
    user,
    order, */



   
});

export default rootReducer;