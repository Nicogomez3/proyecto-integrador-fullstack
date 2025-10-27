import { Request, Response} from 'express';
import Usuario , { IUsuario } from '../models/usuario';
import bcryptjs from 'bcryptjs';
import { ROLES } from '../helpers/constants';
import Randomstring from 'randomstring';
import { sendEmail } from '../mailer/mailer';
import  generarJWT  from '../helpers/generarJWT';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password, rol} = req.body;

    const usuario = new Usuario({ nombre, email, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync( password, salt );

    // Verificar si el rol es admin

    const adminKey = req.headers['adminkey'];

    if (adminKey === process.env.KEYFORADMIN) {
        usuario.rol = ROLES.ADMIN;
    }

    // Creamos y almacenamos el código de verificación

    const newCode = Randomstring.generate(6)
    usuario.code = newCode;

    await usuario.save();

    // Enviar email de verificación
    await sendEmail(email, newCode);

    res.status(201).json({
        usuario
    })
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } :IUsuario = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if(!usuario) {
            res.status(400).json({
                message: 'No se encontró el usuario con ese email'
            })
            return;
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if (!validPassword) {
            res.status(400).json({
                message: 'La contraseña es incorrecta'
            });
            return;
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor'
        })
    }
}

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    const { email, code } : IUsuario = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            res.status(400).json({
                message: 'No se encontró el usuario con ese email'
            })
            return;
        }

        if (usuario.verified) {
            res.status(400).json({
                message: 'El usuario ya ha sido verificado'
            })
            return;
        }

        if (usuario.code !== code) {
            res.status(400).json({
                message: 'El código de verificación es incorrecto'
            })
            return;
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( { email }, { verified: true } )
        res.status(200).json({
            message: 'Usuario verificado correctamente',
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error en el servidor'
        })
    }

}