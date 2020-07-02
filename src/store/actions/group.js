import * as actionTypes from './actionTypes';
import axios from '../../axios';
import { ACCESS_TOKEN } from '../../shared/utility';



export const setGroupDeatils= ( groupDetails ) => {
    return {
        type: actionTypes.SET_GROUP_DETAILS,
        groupDetails: groupDetails
    };
};

export const fetchGroupDeatilsFailed = () => {
    return {
        type: actionTypes.FETCH_GROUP_DETAILS_FAILED
    };
};

export const startGroupDeatils = () => {
    return {
        type: actionTypes.INIT_GROUP_DETAILS
    };
};

export const initGroupDeatils = (id) => {
    return dispatch => {
        dispatch(startGroupDeatils());

        const groupDetails = localStorage.getItem('groupDetails_' + id);
        if (!groupDetails) {

        axios.get('/app/v1/groups' + id + '?locale=en', {
            headers:   {
                        "Authorization": "Bearer vb12294e1f1ac6c12361b4516c5e155d0"//(localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN
                       }
            })
                        .then( response => {
                            console.log(response);

                            if(response.data.status){
                                console.log(response.data.data.group);
                                dispatch(setGroupDeatils(response.data.data.group));
                             
                            }else{
                                dispatch(fetchGroupDeatilsFailed());
                            }
                        } )
                        .catch( error => {
                            dispatch(fetchGroupDeatilsFailed());
                        } );  
                    
                         }
                   else{
                     dispatch(setGroupDeatils(JSON.parse(groupDetails)));
        }
          
     };
};

export const initGroupDetails = () => {
    return {
        type: actionTypes.INIT_GROUP_DETAILS
    };
};

export const createGroupFailed = () => {
    return {
        type: actionTypes.CREATE_GROUP_FAILED
    };
};

export const initCreateGroup = () => {
    return {
        type: actionTypes.INIT_CREATE_GROUP
    };
};

export const createGroupSuccess = () => {
    return {
        type: actionTypes.CREATE_GROUP_SUCCESS
    };
};


export const CreateGroup = (group, token) => {
    console.log(group);
    return dispatch => {
        dispatch(initCreateGroup());
        axios.post('/app/v1/groups', group, {
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem('tenant_key')) ?? ACCESS_TOKEN,
                    'X-Auth-Key': token
                }
            })
            .then(response => {
                console.log(response);
                if (response.data.status) {
                    dispatch(createGroupSuccess());

                } else {
                    dispatch(createGroupFailed());
                }
            })
            .catch(error => {
                dispatch(createGroupFailed());
            });

    }

};