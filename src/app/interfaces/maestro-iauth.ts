export interface MaestroLoginRequest {
    id_usuario: string;
    contrasena: string;
}

export interface MaestroSessionResponseMesasage {
    message: string;
    success: true;
}