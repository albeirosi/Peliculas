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


const rutas=[
{path:'/generos',componente:IndiceGeneros,exact:true},
{path:'/generos/Crear',componente:CrearGenero},
{path:'/generos/Editar/:id(\\d+)',componente:EditarGenero},

{path:'/actores',componente:IndiceActores,exact:true},
{path:'/actores/Crear',componente:CrearActores},
{path:'/actores/Editar/:id(\\d+)',componente:EditarActores},

{path:'/cines',componente:IndiceCines,exact:true},
{path:'/cines/crear',componente:CrearCines},
{path:'/cines/editar',componente:EditarCines},


{path:'/peliculas/filtropeliculas',componente:FiltrarPeliculas},
{path:'/peliculas/crear',componente:CrearPeliculas},
{path:'/peliculas/editar',componente:EditarPeliculas},


{path:'/',componente:LandingPage,exact:true},


{path:'*',componente:RedirectLanding,exact:true},

];

export default rutas;