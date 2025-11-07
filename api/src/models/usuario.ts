import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUsuario {
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    code?: string;
    verified?: boolean;
}

const UsuarioSchema = new Schema<IUsuario>({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, required: [true, 'El email es obligatorio']},
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    rol: { type: String, default: ROLES.USER },
    code: { type: String },
    verified: { type: Boolean, default: false }
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, code, ...usuario } = this.toObject();
    return usuario;
}

const Usuario: Model<IUsuario> = model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario;