import { Request, Response } from "express";
import  Product, { IProduct } from "../models/product";
import fs from 'fs/promises';
import path from 'path';

// Resolve data file relative to this file so it works whether the server is started
// from the repository root or from the `api` folder.
const dataFile = path.join(__dirname, '..', 'data', 'products.json');

// Simple: servir siempre el archivo JSON local para evitar dependencias de BD en la entrega
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const buf = await fs.readFile(dataFile, 'utf-8');
        const fileProducts = JSON.parse(buf);
        res.json({ data: fileProducts });
    } catch (error) {
        console.error('Error al leer products.json:', error);
        res.status(500).json({ message: 'Error al obtener productos', error: String(error) });
    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const buf = await fs.readFile(dataFile, 'utf-8');
        const fileProducts = JSON.parse(buf);
        const found = fileProducts.find((p: any) => String(p.id) === String(id) || String(p._id) === String(id));
        if (found) {
            res.json({ data: found });
            return;
        }
        res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
        console.error('Error al leer products.json para id:', id, error);
        res.status(500).json({ message: 'Error al obtener producto', error: String(error) });
    }
}

export const createProduct = async (req: Request, res: Response) : Promise<void> => {
    const { nombre, categoria, precio, descripcion, disponible, stock, img } = req.body;

    try {
        const product = new Product({
            nombre,
            categoria,
            precio,
            descripcion,
            disponible,
            stock,
            img
        })
        await product.save();

        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto",
            error
        })
    }
}

export const updateProduct = async (req: Request, res: Response) : Promise<void> => {
    const { id } = req.params;
    const {...data} = req.body;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if(!product) {
        res.status(404).json({
            message: 'Producto no encontrado'
        })
        return;
    }
    res.json({ product });
}

export const deleteProduct = async (req: Request, res: Response) : Promise<void> => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if(!product) {
        res.status(404).json({
            message: 'Producto no encontrado'
        })
        return;
    }
}