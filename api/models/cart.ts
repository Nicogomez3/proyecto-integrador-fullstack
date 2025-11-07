import { Model, Schema, Types, model } from 'mongoose';

export interface ICartItem {
  id: number | string;
  title?: string;
  desc?: string;
  price: number;
  quantity: number;
}

export interface ICart {
  user: Types.ObjectId;
  items: ICartItem[];
  total: number;
  createdAt?: Date;
}

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true },
    items: [
      {
        id: { type: Schema.Types.Mixed, required: true },
        title: { type: String },
        desc: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Cart: Model<ICart> = model<ICart>('Cart', CartSchema);

export default Cart;
