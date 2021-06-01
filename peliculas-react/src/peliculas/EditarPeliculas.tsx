import { cineDTO } from '../cines/cines.model'
import { generoDTO } from '../generos/generos.model'
import FormularioPeliculas from './FormularioPeliculas'

export default function EditarPeliculas() {

    const generos: generoDTO[] = [
        { id: 1, nombre: "Comedia" },
        { id: 2, nombre: "Acción" },
        { id: 3, nombre: "Drama" }]

    const cinesSelecionado: cineDTO[] = [{ id: 1, nombre: 'C.C. Cinema del parque' }]
    const cinesNoSelecionado: cineDTO[] = [{ id: 2, nombre: 'C.C. la herradura' }, { id: 3, nombre: 'C.C. la 14' }]
  const actoresSelecionados=[{ id: 2, nombre: 'El Samuel Jason', personaje: '', foto: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg' }]
    
    return (
        <>
            <h1>Editar Películas</h1>
            <FormularioPeliculas
                actoresSeleccionados = {actoresSelecionados}
                generosSeleccionados={[{ id: 2, nombre: "Acción" }]}
                generosNoSeleccionados={[{ id: 1, nombre: "Comedia" }, { id: 3, nombre: "Drama" }]}
                cinesSeleccionados={cinesSelecionado}
                cinesNoSeleccionados={cinesNoSelecionado}
                modelo={{ titulo: 'Iro man', enCines: true, trailer: 'url', fechaLanzamiento: new Date('2021-06-07T00:00:00') }}
                onSubmit={valores => console.log(valores)}

            />
        </>

    )
}