export enum StatusEnum {
    ACT = "Activo",
    INAC = "Inactivo"
}
export interface User {
    id?: number,
    nombres: string,
    apellidos: string,
    edad: number,
    telefono: number,
    email: string,
    status: StatusEnum
}