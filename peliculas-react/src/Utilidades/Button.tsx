
export default function Button(props:buttonProps){
  return (
      <button  
          className={props.className}
          onClick={props.onClick}
          type={props.type}
          disabled={props.disabled}>
    
          
          {props.children}
      </button>
    ) 
}

interface buttonProps{
    children:React.ReactNode;
    onClick?():void;
    type:"button" | "submit";
    className:string;
    disabled: boolean;
   
}

Button.defaultProps={
  type:"button",
  className:"btn btn-primary",
  disabled: false,
 
}