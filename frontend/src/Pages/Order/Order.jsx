import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const items = useSelector((state) => state.cart.items) || [];
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const orders = useSelector((state) => state.order.orders);
  console.log("Órdenes en Redux:", orders);
  const navigate = useNavigate();
  console.log("Orden actual:", currentOrder);
  if (!currentOrder) {
    return <Text>No hay ordenes disponibles.</Text>
  }
  return (
    <Box  as="section" mt="120px" mb="60px" width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
        <Heading as="h2" fontSize={{base:"xl" , md:"2xl"}} bg="#2d5356" color="white" width={{base:"300px", md:"400px" , lg:"750px"}} textAlign="left" p="20px" borderTopLeftRadius={20} borderTopRightRadius={20}>
            Detalles de la orden
        </Heading>
        <Box display="flex"  flexDirection="column" bg="#f7f7f7" justifyContent="center" alignItems="center" width={{base:"300px", md:"400px" , lg:"750px"}} p="20px" borderBottomLeftRadius={20} borderBottomRightRadius={20}>
          <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px"> 
            <Text>Id de la orden: </Text>
            <Text as="span">{currentOrder.id}</Text>
          </Box>
          <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
            <Text>Fecha y hora:</Text>
            <Text as="span">{currentOrder.date}</Text>
          </Box>
          <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
            <Text>Precio Total:</Text>
            <Text as="span">$  {currentOrder.totalPrice?.toFixed(2)}</Text>
          </Box>
        </Box>

        <Heading as="h2" fontSize={{base:"xl" , md:"2xl"}} bg="#2d5356" color="white" width={{base:"300px", md:"400px" , lg:"750px"}} textAlign="left" p="20px" borderTopLeftRadius={20} borderTopRightRadius={20} mt="20px">Detalles de la compra</Heading>
        <Box display="flex" flexDirection="column" bg="#f7f7f7" justifyContent="center" alignItems="center" width={{base:"300px", md:"400px" , lg:"750px"}} p="20px" borderBottomLeftRadius={20} borderBottomRightRadius={20}>
                {currentOrder.items && currentOrder.items.length > 0 ?(
                currentOrder.items.map((item, index) => (
                <Box display="flex" flexDirection="column" alignItems="center" key={index}>
                    <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
                      <Text>Producto:</Text>
                      <Text as="span"> {item.nombre}</Text>
                    </Box>
                    <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
                      <Text>Cantidad: </Text>
                      <Text as="span"> {item.quantity} </Text>
                    </Box>
                    <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
                      <Text>Precio: </Text>
                      <Text as="span">$ {item.precio}</Text>
                    </Box>
                </Box>
                ))
          ): (<Text>No hay productos en la orden</Text>

          )}     

        </Box>
        <Heading as="h2" fontSize={{base:"xl" , md:"2xl"}} bg="#2d5356" color="white" width={{base:"300px", md:"400px" , lg:"750px"}} textAlign="left" p="20px" borderTopLeftRadius={20} borderTopRightRadius={20} mt="20px">Detalles del comprador</Heading>
        <Box display="flex" flexDirection="column" bg="#f7f7f7" justifyContent="center" alignItems="center" width={{base:"300px", md:"400px" , lg:"750px"}} p="20px" borderBottomLeftRadius={20} borderBottomRightRadius={20}>
          <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
            <Text>Nombre:</Text>
            <Text as="span">{currentOrder.buyer.name}</Text>
          </Box>
          <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
            <Text>Correo Electrónico:</Text>
            <Text as="span">{currentOrder.buyer.email}</Text>
          </Box>
          <Box display="flex" flexWrap="wrap" flexDirection={{base:"column" , md:"row"}} justifyContent="space-between" width={{base:"200px" , md:"300px" , lg:"600px"}} p="20px">
            <Text>Dirección:</Text>
            <Text as="span">{currentOrder.buyer.address}</Text>
          </Box>
        </Box>
        <Button marginTop="20px"bgColor="#2d5356" color="white" onClick={() => navigate("/")}> Volver a Inicio </Button>
    </Box>
  )
}

export default Order