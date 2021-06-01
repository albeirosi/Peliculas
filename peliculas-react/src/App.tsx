import './App.css';
import Menu from './Utilidades/Menu';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import rutas from './route-config';
import ConfigurarValidaciones from './Validaciones';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee);

ConfigurarValidaciones();

function App() {
  return (
    < >
      <BrowserRouter>
        <Menu />
        <br />
        <div className="container mt-5 " style={{border:'solid #d282'}}>
          <Switch >
            {rutas.map(rut => <Route key={rut.path} path={rut.path}
              exact={rut.exact}>
              <rut.componente />
            </Route>)}
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
