import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../../redux/AuthSlice/authSlice';
import InputLogin from '../../UI/InputLogin/InputLogin';
import { loginInitialValues } from '../../Formik/initialValues';
import { loginValidationSchema } from '../../Formik/validationSchema';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const loggedInUser = useSelector((state) => {
    console.log('Estado completo de auth:', state.auth); // Registra el estado completo
    return state.auth.loggedInUser;
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    console.log('Valores enviados al iniciar sesión:', values);
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  useEffect(() => {
    if (loggedInUser) {
      console.log('Usuario logueado:', loggedInUser); // Para depuración
      navigate('/'); // Redirige al inicio solo si el usuario está logueado
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Box as="section" width="100%" height="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Heading>
          Inicia Sesión
        </Heading>     
        <Box display="flex" flexDirection="column" marginTop="20px" justifyContent="center" alignItems="center" bg="#2d5356"  p="20px" borderRadius="12px" width={{ base:"300px" , md: "400px" }} height="400px" boxShadow="lg">
          <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
            {({ isValid, dirty, setErrors }) => {
              useEffect(() => {
                if (error) {
                  setErrors({ email: error, password: error });
                }
              }, [error, setErrors]);

              return (
                <Form>
                  <InputLogin name="email" type="email" placeholder="Email" />
                  <InputLogin name="password" type="password" placeholder="Contraseña" />
                  {error && (
                    <Text color="red.500" textAlign="center" mt="10px">{error}</Text>
                  )}
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt="20px" gap="10px">
                    <Button outline="none" backgroundColor="#da9c1d" _hover={{ backgroundColor: "#ebc16b" }} color="white" disabled={!(isValid && dirty)} type="submit">
                      Iniciar Sesión
                    </Button>
                    <Link to="/register">
                      <Text textDecoration="underline" color="white">¿No tienes cuenta? Registrate</Text>
                    </Link>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
        
      
    </Box>
  );
};

export default Login;