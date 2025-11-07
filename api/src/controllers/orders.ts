import { Request, Response} from 'express';
import Order , {IOrder} from '../models/orders';
import { ObjectId } from 'mongoose';

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    const usuarioId : ObjectId = req.body.usuarioConfirmado._id;

    // Buscar órdenes por el campo user (así está definido en el schema)
    const consulta = { user: usuarioId };

    const orders = await Order.find(consulta);

    res.json({
        data: orders
    })

};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const usuario : ObjectId = req.body.usuarioConfirmado._id;
    const orderData : IOrder = req.body;

    const data = {
        ...orderData,
        user: usuario,
        createdAt: new Date(),
        status: 'pending'
    }

    const order = new Order(data);

    // Esperar a que se guarde en la base de datos
    try {
        console.log('Creating order for user:', usuario.toString());
        console.log('Order payload:', JSON.stringify(data));
        const saved = await order.save();

        res.status(201).json({
            order: saved
        })
    } catch (error) {
        console.error('Error creating order:', error);
        // Si es un error de validación de Mongoose, devolver detalles para el cliente
        if ((error as any)?.name === 'ValidationError') {
            const details = Object.values((error as any).errors).map((e: any) => e.message);
            res.status(400).json({ message: 'Validation Error', details });
            return;
        }

        res.status(500).json({ message: error instanceof Error ? error.message : 'Error interno al crear la orden' });
    }

    res.status(201).json({
        order
    })
}