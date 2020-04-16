import axios from 'axios';


//const accessToken = 'ff9294e1f1ac6c12361b4516c5e155d0';

const instance = axios.create({
 baseURL: 'https://api-dev.tradly.app',
//  headers:   {
//                 'tenant_key': accessToken
//             }
});
export default instance;