import axios from 'axios';
import {obtenerToken} from './../Auth/manejadorJWT'

export function configurarInterceptor(){
     axios.interceptors.request.use(
         function(config){
             const token = obtenerToken();
             if(token){
                 config.headers.Authorization =`bearer ${token}`;
             }
            console.log(config);
             return config;
         },

         function(error){
            alert(2);
             return Promise.reject(error);
         }
     )
}

