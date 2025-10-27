import { Router } from 'express';
import { recolectarErrores } from '../middlewares/recolectarErrores';
import validarJWT from '../middlewares/validarJWT';
import { getOrders , createOrder } from '../controllers/orders';
import { check } from 'express-validator';
import { isVerified } from '../middlewares/validarVerificado';

const router = Router();

router.get('/', [validarJWT, isVerified, recolectarErrores], getOrders);

router.post('/', [
    validarJWT,
    isVerified,
    check('price', 'El precio es obligatorio ').not().isEmpty(),
    check('total', 'El total es obligatorio ').not().isEmpty(),
    check('items', 'Los items son obligatorios ').not().isEmpty(),
    recolectarErrores
], createOrder);

export default router;