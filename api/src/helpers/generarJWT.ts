import jwt from 'jsonwebtoken';

const generarJWT = (id: string = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.SECRET_KEY as string, {
            expiresIn: '24h'
        },
        (err: Error | null,  token: string | undefined) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token as string);
            }
        })
    })

}

export default generarJWT;