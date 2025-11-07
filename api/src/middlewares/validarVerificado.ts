import { NextFunction, Request, Response } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) => {
    const {verified} = req.body.usuarioConfirmado;

    if (!verified) {
        res.status(403).json({
            message: 'Usuario no está correctamente verificado'
        })
        return
    }
    next();
}