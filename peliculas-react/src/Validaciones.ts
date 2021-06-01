

import * as Yup from 'yup'


export default function configurarValidaciones(){
    Yup.addMethod(Yup.string,'primeraLetraMayuscula',function(){
        return this.test('primera-letra-mayuscula','La primera lectra debe ser mayúscula',
        function (valor){
            if(valor && valor.length>0){
                const primeraletra=valor.substring(0,1);
                return primeraletra===primeraletra.toUpperCase();
            }
            return true;
        })
    })
}