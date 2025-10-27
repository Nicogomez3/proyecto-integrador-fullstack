import express, { Express } from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';
import authRoutes from '../routes/auth';
import orderRoutes from '../routes/orders';

//Creamos el servidor

export class Server {
    app: Express;
    port: string | number | undefined;
    authPath: string;
    orderPath: string;
    productPath: string

// Configuramos el constructor
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.authPath = '/auth';
        this.orderPath = '/orders';
        this.productPath = '/products';

        //Metodo para conectar a la base de datos
        this.conectarDB();

        //Metodo para ejecutar los middlewares
        this.middlewares();

        //Metodo para definir las rutas
        this.routes();
    }

    //Definimos los metodos

    //Metodo para conectar a la base de datos
     async conectarDB(): Promise<void> {
        await dbConnection()
    }

    //Metodo para ejecutar los middlewares
    middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    //Metodo para definir las rutas
    routes(): void {
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.orderPath, orderRoutes)
        // this.app.use(this.productPath, productRoutes)
    }
 




    //Metodo para escuchar el servidor
    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}