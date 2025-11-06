import { Model, Schema, Types, model } from "mongoose";

export interface IProduct {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    descripcion: string;
    disponible: boolean;
    stock: number;
    img: string;
}


const productSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  disponible: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  img: { type: String, required: true }
});

const Product: Model<IProduct> = model('Product', productSchema);

export default Product;
