import React from 'react';
import {urlCuentas} from './../Utilidades/endpoints';
import IndiceEntidad from './../Utilidades/IndiceEntidad'
import {usuarioDTO} from './auth.model';
import Button from './../Utilidades/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import confirmar from '../Utilidades/Confirmar';


export default function IndiceUsuarios(){

 async function hecerAdmin(id:string){
     await editarAdmin(`${urlCuentas}/hacerAdmin`,id);     
 }

 async function removerAdmin(id:string){
    await editarAdmin(`${urlCuentas}/removerAdmin`,id);     
}


    async function editarAdmin(url:string, id:string){
        await axios.post(url, JSON.stringify(id),{
            headers:{'Content-Type':'application/json'}
        }
        )
        Swal.fire({
            title:'Exito',
            text:'Operación realizada con éxito',
            icon:'success'
        })
    }

    return (
        <IndiceEntidad<usuarioDTO>
            url={`${urlCuentas}/listadoUsuarios`}
            titulo ="Usuarios"

                
            urlCrear ={`/Registro` }

        >
            {usuarios => <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                      {usuarios?.map(usuario =><tr key={usuario.id}>
                            <td>
                                <Button onClick={()=>confirmar(()=> hecerAdmin(usuario.id),
                                `¿Desea hacer admin al usuario ${usuario.email}?`, 'Realizar'
                                    )}>Hacer Admin</Button>

                                <Button className="btn btn-danger" style={{marginLeft:'1rem'}} 
                                        onClick={()=>confirmar(()=> removerAdmin(usuario.id),
                                    `¿Desea remover a ${usuario.email} como admin?`, 'Realizar'
                                        )}
                                >Remover Admin</Button>
                            </td>
                            <td>{usuario.email}</td>
                        </tr>
                        )}
                    </tbody>

                </>
            }

        </IndiceEntidad>
    )

}