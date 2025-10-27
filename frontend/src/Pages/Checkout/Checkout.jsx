import React from 'react'

import { Box, Heading } from '@chakra-ui/react'
import Form from '../../Components/Checkout/Form/Form'
import ProductsCheckout from '../../Components/Checkout/Products/ProductsCheckout'

 const Checkout = () => {
  return (
    <div>
        <Box display="flex"  gap="50px" flexDirection="column" justifyContent="space-between"  alignItems="center" >
            <Box bg="#2d5356" height="350px" width="100%" display="flex" justifyContent="center" alignItems="center">
               <Heading as="h1" size="3xl" p="60px" color="white"  width="100%"  textAlign="center">Checkout</Heading>
            </Box>
            <Box display="flex" flexDirection={{base:"column-reverse" , md:"row"}} p="20px" gap="20px" mb="40px" width="100%" maxWidth="1600px">
              <Form />
              <ProductsCheckout />
            </Box>
         
        </Box>
       
    </div>
  )
}

export default Checkout

