import { Request, Response } from 'express';
import Cart from '../models/cart';

const calcTotal = (items: any[]) => items.reduce((acc, it) => acc + (Number(it.price || 0) * Number(it.quantity || 0)), 0);

export const getCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.body.id;
    if (!userId) return res.status(400).json({ message: 'Usuario no identificado' });

    const cart = await Cart.findOne({ user: userId }).lean();
    if (!cart) return res.json({ data: { items: [], total: 0 } });
    return res.json({ data: cart });
  } catch (error) {
    console.error('Error getCart:', error);
    return res.status(500).json({ message: 'Error al obtener carrito', error: String(error) });
  }
};

export const setCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.body.id;
    const items = req.body.items || [];
    if (!userId) return res.status(400).json({ message: 'Usuario no identificado' });

    const total = calcTotal(items);
    const updated = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items, total } },
      { upsert: true, new: true }
    ).lean();

    return res.json({ data: updated });
  } catch (error) {
    console.error('Error setCart:', error);
    return res.status(500).json({ message: 'Error al guardar carrito', error: String(error) });
  }
};

export const updateCartItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.body.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;
    if (!userId) return res.status(400).json({ message: 'Usuario no identificado' });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const idx = cart.items.findIndex((it: any) => String(it.id) === String(itemId));
    if (idx === -1) return res.status(404).json({ message: 'Item no encontrado en carrito' });

    if (quantity <= 0) {
      cart.items.splice(idx, 1);
    } else if (cart.items[idx]) {
      cart.items[idx].quantity = quantity;
    }

    cart.total = calcTotal(cart.items as any);
    await cart.save();
    return res.json({ data: cart });
  } catch (error) {
    console.error('Error updateCartItem:', error);
    return res.status(500).json({ message: 'Error al actualizar item', error: String(error) });
  }
};

export const removeCartItem = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.body.id;
    const itemId = req.params.itemId;
    if (!userId) return res.status(400).json({ message: 'Usuario no identificado' });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.items = cart.items.filter((it: any) => String(it.id) !== String(itemId));
    cart.total = calcTotal(cart.items as any);
    await cart.save();
    return res.json({ data: cart });
  } catch (error) {
    console.error('Error removeCartItem:', error);
    return res.status(500).json({ message: 'Error al eliminar item', error: String(error) });
  }
};

export default { getCart, setCart, updateCartItem, removeCartItem };
