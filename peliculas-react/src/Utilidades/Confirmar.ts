import Swal from 'sweetalert2';

export default function confirmar(onConfirm:any, 
    titulo:string='¿Desea eliminar el registro?',
    texttoBotonConfirmacion:string='Eliminar')
    {
        Swal.fire({
            title:titulo,
            confirmButtonText:texttoBotonConfirmacion,
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#d33',
            cancelButtonColor:'#3085d6',
            cancelButtonText:'Cancelar'
            
        }).then(result=>{
            if(result.isConfirmed){
                onConfirm();     
            }
            
        })

}