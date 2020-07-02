import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    loading : false,
    groupDetails: [],
    error:false,
    message: null,
    page : 1,
    total_records: 0
}

const initGroupDeatils= ( state, action ) => {
    return updateObject( state, {
        loading: true
    } );
};

const setGroupDeatils= ( state, action ) => {
    return updateObject( state, {
        groupDetails: action.groupDetails,
        loading: false,
        error:false,
        message:null
    } );
};

const fetchGroupDeatilsFailed = (state, action) => {
    return updateObject( state, { loading: false, error: true, message: 'Could not fetch result.' } );
};



const groupReducer = ( state = initialState, action) =>{
    switch(action.type){
        case actionTypes.INIT_GROUP_DETAILS: return initGroupDeatils(state, action);   
        case actionTypes.SET_GROUP_DETAILS: return setGroupDeatils(state, action);    
        case actionTypes.FETCH_GROUP_DETAILS_FAILED: return fetchGroupDeatilsFailed(state, action);
        default:
            return state;
    }
}


export default groupReducer;
