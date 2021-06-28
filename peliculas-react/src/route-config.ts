import LandingPage from './LandingPage'
// import ListadoPeliculas from './peliculas/ListadoPeliculas';

import IndiceGeneros from './generos/IndiceGeneros'
import CrearGenero from './generos/CrearGenero'
import EditarGenero from './generos/EditarGenero'

import IndiceActores from './actores/IndiceActores'
import CrearActores from './actores/CrearActores'
import EditarActores from './actores/EditarActores'

import IndiceCines from './cines/IndiceCines'
import CrearCines from './cines/CrearCines'
import EditarCines from './cines/EditarCines'


import FiltrarPeliculas from './peliculas/FiltroPeliculas'
import CrearPeliculas from './peliculas/CrearPeliculas'
import EditarPeliculas from './peliculas/EditarPeliculas'
import RedirectLanding from './Utilidades/RedirectLanding'

import DetallePelicula from './peliculas/DetallePelicula'
import Registro from  './Auth/Registro'
import Login from './Auth/Login'
import IndiceUsuarios from './Auth/IndiceUsuarios'


const rutas=[
{path:'/generos',componente:IndiceGeneros,exact:true, esAdmin:true},
{path:'/generos/Crear',componente:CrearGenero, esAdmin:true},
{path:'/generos/Editar/:id(\\d+)',componente:EditarGenero, esAdmin:true},

{path:'/actores',componente:IndiceActores,exact:true, esAdmin:true},
{path:'/actores/Crear',componente:CrearActores, esAdmin:true},
{path:'/actores/Editar/:id(\\d+)',componente:EditarActores, esAdmin:true},

{path:'/cines',componente:IndiceCines,exact:true, esAdmin:true},
{path:'/cines/crear',componente:CrearCines, esAdmin:true},
{path:'/cines/editar/:id(\\d+)',componente:EditarCines, esAdmin:true},

{path:'/pelicula/:id(\\d+)', componente: DetallePelicula, exact:true},
{path:'/peliculas/filtropeliculas',componente:FiltrarPeliculas },
{path:'/peliculas/crear',componente:CrearPeliculas, esAdmin:true},
{path:'/peliculas/editar/:id(\\d+)',componente:EditarPeliculas , esAdmin:true},

{path:'/registro', componente:Registro},
{path:'/login', componente:Login},
{path:'/usuarios', componente:IndiceUsuarios, esAdmin:true},




{path:'/',componente:LandingPage,exact:true},
{path:'*',componente:RedirectLanding,exact:true},

];

export default rutas;