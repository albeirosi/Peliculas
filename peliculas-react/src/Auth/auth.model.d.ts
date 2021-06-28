export interface claim{
    nombre: string;
    valor:string;
}

export interface credencialesUsuario{
    email: string;//Email
    password: string;//Password
}

export interface respuestaAutenticacion{
    token: string,
    expiracion: Date;
}

export interface usuarioDTO{
    id:string;
    email:string;
}