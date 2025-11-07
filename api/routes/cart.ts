import { Router } from 'express';
import { getCart, setCart, updateCartItem, removeCartItem } from '../controllers/cart';
import validarJWT from '../middlewares/validarJWT';

const router = Router();

router.get('/', validarJWT, getCart);
router.post('/', validarJWT, setCart);
router.put('/:itemId', validarJWT, updateCartItem);
router.delete('/:itemId', validarJWT, removeCartItem);

export default router;
