export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const countryFilter = (code, data) => {
   
    let filterCountry= data.filter(country => {  
        return parseInt(code) === parseInt(country.dial_code);
 
     }).reduce((filterCountry, el)=>{
        return el;
     }, {})

     return filterCountry;
}


// CONSTANTS


export const ACCESS_TOKEN = 'ff9294e1f1ac6c12361b4516c5e155d0';

export const EXPIRY_TIME = 250;