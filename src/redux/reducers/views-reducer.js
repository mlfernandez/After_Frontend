import {GETPROFILE, DELETE} from '../types';
const initialState = 
    'getprofile'
;
const viewsReducer = (state = initialState, action) => {
    switch(action.type){
        case GETPROFILE:
            return action.payload;       
        case DELETE:
            return initialState;
        default : 
            return state
    }
}
export default viewsReducer;