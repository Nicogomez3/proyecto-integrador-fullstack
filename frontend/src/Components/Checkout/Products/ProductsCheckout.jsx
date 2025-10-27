import { Box, Container, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const ProductsCheckout = () => {
    const items = useSelector((state) => state.cart.items)
    const total = items.reduce((acc, item) => acc + item.quantity * item.precio, 0);
  return (
    <Container as="section" display="flex" flexDirection="column" bg="#f2f2f2" p="0px"  borderRadius="14px">
        <Text fontSize="2xl" borderTopRadius="14px" p="20px" bg="#2d5356" color="white" mb="20px"  fontWeight="bold">Tu orden</Text>
        {items.length === 0 ? (
            <Text>No hay productos en el carrito</Text>
        ): (
            items.map((item) => (
                <Box key={item.id} display="flex" p="0 30px" alignItems="center" 
                mb="10px">
                    <Image src={item.img} alt={item.nombre} boxSize="50px"/>
                    <Box ml="10px">
                        <Text fontWeight="bold">
                            {item.nombre}
                        </Text>
                        <Text>
                            Cantidad: {item.quantity}
                        </Text>
                        <Text>
                            Precio: ${item.precio.toFixed(2)}
                        </Text>
                    </Box> 
                </Box>
            ))
        )}
        <Box mb="20px" p="20px 30px" bg="white" width="100%" color="black">
            <Text fontWeight="bold">Total: ${total.toFixed(2)}</Text>
        </Box>
    </Container>
  )
}

export default ProductsCheckout