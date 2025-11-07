import { sendEmail } from "../mailer/mailer";
import Usuario, { IUsuario} from "../models/usuario";

export const validarEmail = async ( email: string ): Promise<void> => {
    const existeEmail : IUsuario | null = await Usuario.findOne({ email });
    if (existeEmail && existeEmail.verified) {
        throw new Error(`El email: ${ email } ya está registrado y verificado`);
    }

    if (existeEmail && !existeEmail.verified) {
        await sendEmail( email, existeEmail.code as string );
        throw new Error(`El email: ${ email } ya está registrado pero no verificado. Se ha reenviado el código de verificación`);
    }
}