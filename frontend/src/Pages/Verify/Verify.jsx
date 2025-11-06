import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserThunk } from "../../redux/AuthSlice/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text } from "@chakra-ui/react";

export default function Verify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailPendingVerification, error } = useSelector((state) => state.auth);
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (!emailPendingVerification) {
      alert('No hay un email registrado para verificar. Vuelve a registrarte.');
      return;
    }

    try {
      // trim para evitar espacios accidentales
      const actionResult = await dispatch(verifyUserThunk({ email: emailPendingVerification, code: code.trim() }));
  unwrapResult(actionResult);
  // éxito -> mostrar mensaje y redirigir al login para que el usuario inicie sesión
  alert('Código verificado. Ahora puedes iniciar sesión.');
  navigate('/login');
    } catch (err) {
      // err proviene de rejectWithValue y contiene el mensaje normalizado
      const message = err || 'Código incorrecto o expirado';
      alert(message);
    }
  };

  return (
    <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" h="100vh">
      <Text mb="4">Te enviamos un código de verificación a {emailPendingVerification || 'tu email'}</Text>
      <Input
        placeholder="Código de verificación"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        width="250px"
        mb="3"
      />
      <Button colorScheme="teal" onClick={handleVerify}>
        Verificar
      </Button>
      {error && <Text color="red.400">{error}</Text>}
    </Box>
  );
}
