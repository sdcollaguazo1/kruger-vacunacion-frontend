import { Vacuna } from "./vacuna"

export class Empleado {
    id:number
    nombre:string
    apellido:string
    cedula:string
    email:string
    fecha_nacimiento:Date
    direccion:string
    numero_telefono:string
    estado:boolean
    vacuna:Vacuna
    fecha_vacuna:string
    num_dosis:number
}
