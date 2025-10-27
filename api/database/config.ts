import mongoose from "mongoose";

export const dbConnection = async():Promise<void> => {
    try {
        const dburl = process.env.DB_URL;
        
        if(!dburl) {
            throw new Error('No se ha definido la URL de la base de datos en las variables de entorno');
        }

        await mongoose.connect(dburl);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error(`Error al conectar con la base de datos`);
    }

}