import nodemailer from 'nodemailer';

// crear el transporte

const transporter = nodemailer.createTransport({
    host: "smtp.tuServidor.com",
    service: 'gmail',
    secure: true,
    auth: {
        user: "ngdopadromo@gmail.com",
        pass: "stso rtfb ofga sfck"
    },
    tls: {
    rejectUnauthorized: false, // 👈 ignora certificados no válidos
    },
    from: 'DecoShop <ngdopadromo@gmail.com>'
});

export const sendEmail = async ( to: string, code: string ): Promise<void> => {
    try {
        const mailOption = {
            from: '"DecoShop" <ngdopadromo@gmail.com>',
            to,
            subject: 'Codigo de verificacion',
            text: `Su codigo de verificacion es: ${ code }`
        };

        await transporter.sendMail( mailOption );
        console.log('Email enviado correctamente');
    } catch (error) {
        console.log('Error al enviar el email', error);
    }
}