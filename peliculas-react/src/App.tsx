import './App.css';
import Menu from './Utilidades/Menu';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import rutas from './route-config';
import ConfigurarValidaciones from './Validaciones';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import AutenticacionContext from './Auth/AutenticacionContext'
import {claim} from './Auth/auth.model';
import { useState } from 'react';
import { useEffect } from 'react';
import { obtenerClaims } from './Auth/manejadorJWT';
import {configurarInterceptor} from './Utilidades/Interceptores';


//library.add(fab, faCheckSquare, faCoffee);

ConfigurarValidaciones();
configurarInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(()=>{
    setClaims(obtenerClaims());
  },[])
  
  function actualizar(claims:claim[]){
    setClaims(claims);
  }

  function esAdmin(){
    return claims.findIndex(claim=> claim.nombre === 'role' && claim.valor === 'admin') > -1;
  }

  return (
    < >
      <BrowserRouter>
      <AutenticacionContext.Provider value ={{claims, actualizar}}>
      <Menu />
        <br />
        <div className="container mt-5 " style={{border:'solid #d282'}}>
          <Switch >
            {rutas.map(ruta => <Route key={ruta.path} path={ruta.path}
              exact={ruta.exact}>
                {ruta.esAdmin && !esAdmin() ? <>
                No tiene permiso para aceder a esta ruta
                </>:<ruta.componente />
                }
              
            </Route>)}
          </Switch>
        </div>
      </AutenticacionContext.Provider>       
      </BrowserRouter>
    </>
  )
}

export default App;
