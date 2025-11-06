import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FormControl, FormLabel, Input, Button, Container, Box } from '@chakra-ui/react';
import { initialValues } from '../../../Formik/initialValues';
import { validationSchema } from '../../../Formik/validationSchema';
import { Input as InputForm } from '../../../UI/Input/Input';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrderThunk } from '../../../redux/OrderSlice/orderSlice';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart Items:", cartItems);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);


  const handleSubmit = (values) => {
    console.log("✅ Submit ejecutado correctamente");  
    console.log("Valores del formulario:", values);
    console.log("Submit ejecutado");
    if (!cartItems || cartItems.length === 0) {
      console.error('No hay artículos en el carrito');
      alert('No hay artículos en el carrito');
      return;
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0)
  
  console.log("Precio total calculado:", totalPrice);

    console.log("Valores del formulario:", values); // Depuración

    // Mapear items a la forma que espera el backend y asegurar campos obligatorios
    const itemsForBackend = cartItems.map((it) => {
      const title = it.title || it.nombre || it.name || it.titulo || it.description || '';
      const desc = it.desc || it.description || title || 'Sin descripción';
      const price = Number(it.precio ?? it.price ?? it.unitPrice ?? 0);
      const quantity = Number(it.quantity ?? it.cantidad ?? 1);

      return {
        desc,
        id: it.id || it.productId || it._id || 0,
        price,
        quantity,
        title,
      };
    });

    // Validaciones simples en frontend antes de enviar
    if (!values.name || !values.lastName || !values.email || !values.phone || !values.address) {
      alert('Completa los datos de envío: nombre, apellido, email, teléfono y dirección');
      return;
    }

    // Asegurar que no hay items con campos inválidos
    const invalidItem = itemsForBackend.find(i => !i.desc || !i.title || !i.price || !i.quantity);
    if (invalidItem) {
      alert('Hay un artículo en el carrito con datos incompletos. Revisa el carrito antes de confirmar.');
      return;
    }

    const price = itemsForBackend.reduce((total, i) => total + i.price * i.quantity, 0);
    const total = price; // ajustar si hay impuestos/envío

    const orderData = {
      price,
      total,
      items: itemsForBackend,
      shippingDetails: {
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        cellphone: String(values.phone || '').trim(),
        location: `${values.province || ''} - ${values.city || ''}`,
        address: values.address,
      },
    };

    (async () => {
      try {
        const actionResult = await dispatch(createOrderThunk(orderData));
        unwrapResult(actionResult);
        navigate('/congratulations');
      } catch (err) {
        console.error('Error creando orden:', err);
        // err puede ser un objeto con message y details (desde rejectWithValue)
        const message = err?.message || err || 'Error al crear la orden';
        if (err?.details && Array.isArray(err.details)) {
          alert(`${message}:\n- ${err.details.join('\n- ')}`);
        } else {
          alert(message);
        }
      }
    })();
  }
  
  return (
   <Container as='section' width="100%"  display='flex' p="0" justifyContent='center' alignItems='center'>
    <Formik
    
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
    {({ handleSubmit, isValid, dirty, values }) => (
      
      
      <Form onSubmit={handleSubmit}  style={{ width: '100%', maxWidth: '800px' }}>
       
        <Box display="flex" flexWrap="wrap" gap="10px" width="100%">
          <InputForm name='name' htmlFor='nombre' type='text' placeholder='Nombre' id='nombre' width="calc(50% - 10px)">
            Nombre
          </InputForm>

          <InputForm name='lastName' htmlFor='apellido' type='text' placeholder='Apellido' id='apellido' width="calc(50% - 10px)">
            Apellido
          </InputForm>

          <InputForm name='email' htmlFor='email' type='email' placeholder='Correo' id='email' width="calc(50% - 10px)">
            Correo
          </InputForm>

          <InputForm name='phone' htmlFor='phone' type='number' placeholder='Numero' id='numero' width="calc(50% - 10px)">
            Telefono
          </InputForm>
        </Box>    
        <Box display="flex" width="100%" gap="10px" >
          <InputForm name='province'  htmlFor='provincia' type='text' placeholder='Provincia' id='provincia' width="440px"> 
            Provincia
          </InputForm>

          <InputForm name='city'  htmlFor='localidad' type='text' placeholder='Localidad' id='localidad' width="440px">
            Localidad
          </InputForm>

          <InputForm name='address' htmlFor='direccion' type='text' placeholder='Dirección' id='direccion' width="440px">
            Dirección
          </InputForm>

        </Box>

        
       
       

       <Button type='submit' mt={4} bgColor="#2d5356" colorScheme='teal' disabled={!(isValid && dirty)}>Confirmar pago</Button>
   
      </Form>

      
    )}
    </Formik>
   </Container> 
  );
  
  
}

export default CheckoutForm;