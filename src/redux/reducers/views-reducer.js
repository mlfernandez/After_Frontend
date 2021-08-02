import {GETPROFILE, GETCATEGORY, GETPROJECT, GETUSER, GETROLE, DELETE, GETNEWPROJECT, GETSEARCHPROJECT} from '../types';
const initialState = 
    'getprofile'
;
const viewsReducer = (state = initialState, action) => {
    switch(action.type){
        case GETPROFILE:
            return action.payload;      
            
        case GETPROJECT:
            return action.payload;   
                        
        case GETNEWPROJECT:
            return action.payload; 

        case GETSEARCHPROJECT:
            return action.payload;     

        case GETCATEGORY:
            return action.payload;   

        case GETUSER:
            return action.payload;   

        case GETROLE:
            return action.payload; 

        case DELETE:
            return initialState;
            
        default : 
            return state
    }
}
export default viewsReducer;