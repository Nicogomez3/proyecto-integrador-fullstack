import { Router } from "express";
import { check } from "express-validator";
import { validarEmail } from "../helpers/validacionesDB";
import { login, register, verifyUser } from "../controllers/auth";
import { recolectarErrores } from "../middlewares/recolectarErrores";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email').custom( validarEmail ),
    recolectarErrores
], register);

// Ruta para iniciar sesión
router.post('/login', [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    recolectarErrores
], login);

// Ruta para verificar el usuario
router.post('/verify',[
    check('email', 'El email no es válido').isEmail(),
    check('code', 'El código de verificación es obligatorio').not().isEmpty(),
], verifyUser);


export default router;
