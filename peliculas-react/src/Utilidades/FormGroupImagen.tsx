
import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react"


export default function FormGroupImagen(props: formGroupImagenProps) {

    const divStyle = { marginTop: '10px' }
    const imgStyle = { width: '150px' }

    const [imagenBase64, setImagenBase64] = useState('');
    const { values } = useFormikContext<any>();
    const [imagenURL, setImagenURL ]=useState(props.imagenURL)


    const ManejadorOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.currentTarget.files) {
            const archivo = e.currentTarget.files[0];
            aBase64(archivo).then((representaconBase64: string) => setImagenBase64(representaconBase64)).catch(error => console.error(error))
            values[props.campo] = archivo
            setImagenURL('');
        }

    }

    const aBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        })
    }

    return (
        <>
            <div className="form-group">
                <label>{props.label}</label>
                <div>
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={ManejadorOnChange} />
                </div>
                {
                    imagenBase64 ?
                        <div>
                            <div style={divStyle}>
                                <img style={imgStyle} alt="Imagen seleccionada" src={imagenBase64} />
                            </div>
                        </div> : null
                }
                 {
                    imagenURL ?
                        <div>
                            <div style={divStyle}>
                                <img style={imgStyle} alt="Imagen seleccionada" src={imagenURL} />
                            </div>
                        </div> : null
                }
                

            </div>

        </>
    )
}

interface formGroupImagenProps {

    campo: string;
    label: string;
    imagenURL: string;

}

FormGroupImagen.defaultProps={
    imagenURL:''
}