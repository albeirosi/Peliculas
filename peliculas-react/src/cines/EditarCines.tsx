import FormularioCines from './FormularioCines'

export default function EditarCines() {
    return (
        <>
            <h1>Edictar Cines</h1>
            <FormularioCines
                modelo={{ nombre: 'Sambil' }}
                onSubmit={valores => console.log(valores)} />
        </>
    )
}