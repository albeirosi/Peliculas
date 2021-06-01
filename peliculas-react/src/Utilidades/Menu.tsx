import { NavLink } from "react-router-dom";


export default function Menu() {
    const classActive="active";
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
            <div className="container-fluid" >
                <NavLink className="navbar-brand" activeClassName={classActive} to="/">Peliculas</NavLink>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={classActive}  to="/generos">
                                Géneros
                            </NavLink>
                           
                           
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" activeClassName={classActive} to="/peliculas/filtropeliculas">
                               Filtrar Películas
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

                    </ul>
                </div>
            </div >
        </nav>
    )


}
