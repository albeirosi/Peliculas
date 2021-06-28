import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AutenticacionContext from "../Auth/AutenticacionContext";
import { logout } from "../Auth/manejadorJWT";
import Autorizado from './../Auth/Autorizado'
import Button from "./Button";

export default function Menu() {
    const classActive = "active";
    const {actualizar, claims} = useContext(AutenticacionContext);
    const history = useHistory();
    function obtenerNombreUsuario():string
    {
        return claims.filter(x=>x.nombre==="email")[0]?.valor;
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
            <div className="container-fluid" >
                <NavLink className="navbar-brand" activeClassName={classActive} to="/">Peliculas</NavLink>

                <div className="collapse navbar-collapse" style={{display:'flex',justifyContent:'space-between'}}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={classActive} to="/peliculas/filtropeliculas">
                                Filtrar Películas
                            </NavLink>
                        </li>
                        <Autorizado role='admin'
                            autorizado={
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={classActive} to="/generos">
                                            Géneros
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={classActive} to="/Cines">
                                            Cines
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={classActive} to="/Actores">
                                            Actores
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={classActive} to="/peliculas/crear">
                                            Crear Películas
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={classActive} to="/usuarios">
                                           Usuarios
                                        </NavLink>
                                    </li>
                                </>
                            }
                        />

                    </ul>
                    <div className="d-flex">
                        <Autorizado
                            autorizado = {<> 
                            <span className="nav-link colorLetra">Hola, {obtenerNombreUsuario()} </span>
                            <Button
                             onClick = {()=>{ logout(); actualizar([]); history.push("/")}} 

                             className="nav-link btn btn-link colorLetra"
                           
                             >Log out</Button>
                            </>}
                            noAutorizado = {<>
                                <NavLink to="/Registro" className="nav-link btn btn-link colorLetra" >Registro</NavLink>
                                <NavLink to="/Login" className="nav-link btn btn-link colorLetra" >Login</NavLink>

                                </>
                            }
                        />
                    </div>
                </div>
            </div >
        </nav>
    )


}

