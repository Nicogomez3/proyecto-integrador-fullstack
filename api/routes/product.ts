import { Router } from "express";
import { createProduct, getProductById, getProducts, updateProduct } from "../controllers/products";

const router = Router();

// Obtener todos los productos
router.get('/', getProducts);
// Obtener un producto por ID
router.get('/:id', getProductById);
// Crear un nuevo producto
router.post('/', createProduct);
// Actualizar un producto existente
router.put('/:id', updateProduct);
export default router;