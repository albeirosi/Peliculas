import { landingPageDTO } from './peliculas/peliculas.model';
import React, { useEffect, useState } from 'react';
import ListadoPeliculas from './peliculas/ListadoPeliculas'
import axios, { AxiosResponse } from 'axios';
import { urlPeliculas } from './Utilidades/endpoints';
import AlertaContext from './Utilidades/AlertaContext';



export default function LandingPage() {

  const [peliculas, setPeliculas] = useState<landingPageDTO>({})

  useEffect(() => {
    cargarDatos();
  },[])

  function cargarDatos(){
    axios.get(urlPeliculas)
    .then((respuesta:AxiosResponse<landingPageDTO>)=>{
      setPeliculas(respuesta.data);
    })
  }
  return (
    <>
  
    <AlertaContext.Provider value={()=>cargarDatos()}>
       <h3>En cartelera</h3>
      <ListadoPeliculas peliculas={peliculas.enCines} />

      <h3>Próximos Estrenos</h3>
      <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
    </AlertaContext.Provider>
     

    </>


  )
}