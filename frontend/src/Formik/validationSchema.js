import * as Yup from 'yup';

export const validationSchema = Yup.object({
    name: Yup.string().required('Nombre es obligatorio'),
    lastName: Yup.string().required('Apellido es obligatorio'),
    phone: Yup.string().required('Teléfono es obligatorio'),
    email: Yup.string().email('Email inválido').required('Email es obligatorio'),
    province: Yup.string().required('Provincia es obligatorio'),
    city: Yup.string().required('Localidad es obligatorio'),
    address: Yup.string().required('Dirección es obligatorio'),
  });

export const registerValidationSchema = Yup.object({
    name: Yup.string().required('Nombre es obligatorio'),
    lastName: Yup.string().required('Apellido es obligatorio'),
    phone: Yup.string().required('Teléfono es obligatorio'),
    email: Yup.string().email('Email inválido').required('Email es obligatorio'),
    password: Yup.string().min(8, "Minimo 8 caracteres").required('Contraseña es obligatoria'),
    confirmPassword: Yup.string().required('Campo Obligatorio').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
})

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Email es obligatorio'),
    password: Yup.string().min(8, "Minimo 8 caracteres").required('Contraseña es obligatoria')

})