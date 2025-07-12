export interface MaestroLoginRequest {
    id_usuario: string;
    contrasena: string;
}

export interface MaestroLoginResponseSuccess {
    message: string;
    success: true;
}

export interface MaestroLoginResponseError {
    message: string;
    success: false;
}