export default function MostrarErrores(props: mostrarErroresProps) {
    const styleError = { color: 'red' };

    return (
        <>
            {props.errores ? <ul style={styleError}>
                    {props.errores.map((error, indice) => <li key={indice}>{error}</li>)}
                </ul> : null}

        </>
    )
}

interface mostrarErroresProps {
    errores?: string[];

}
