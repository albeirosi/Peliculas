import { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Rating.css'
import AutenticacionContext from "../Auth/AutenticacionContext";
import Swal from "sweetalert2";


export default function Rating(props: ratingProps) {
    const [maximoValorArr, setMaximoValorArr] = useState<number[]>([]);
    const [valorSeleccionado, setValorSeleccionado] = useState(props.valorSeleccionado);
    const {claims} = useContext(AutenticacionContext);

    useEffect(() => {
        setMaximoValorArr(Array(props.maximoValor).fill(0));
    }, [props.maximoValor])

    function manejarMouseOver(voto: number) {
        setValorSeleccionado(voto);
    }

    function manejarClick(voto:number){
        if(claims.length===0){
            Swal.fire({title:"Error",text:'Debe loguearse para poder votar', icon:'error'});
            return;
        }

        setValorSeleccionado(voto);
        props.onChange(voto);

    }


    return (
        <>
            {maximoValorArr.map((valor, indice) => <FontAwesomeIcon
                icon='star' key={indice}
                onMouseOver = {() => manejarMouseOver(indice + 1)}
                onClick = {()=>manejarClick(indice + 1 )}
                className = {`fa-lg pointer ${valorSeleccionado >= indice + 1 ? 'checked':null}`}
            />
            )}
        </>
    )
}

interface ratingProps {
    maximoValor: number;
    valorSeleccionado: number;
    onChange(voto: number): void;
}