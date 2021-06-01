

export default function SelectGeneric(props:selectGenericProps){
      
    return(

        <>
                   <div className="form-group">
                        <label >Registros por Página:  </label>
                        <select className="form-control col-6" 
                        defaultValue = {10}                          
                        onChange = {( e )=>{                            
                            props.onPaginaSelect(1);
                            props.onChangeSelect(parseInt(e.currentTarget.value, 10))
                        }}

                        > <option value={1}>1</option>
                            <option value={3}>3</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>


        </>
    )

}


interface selectGenericProps{ 
    onPaginaSelect(valor:number):void;
   onChangeSelect(records:any):void;
}

