import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'
import { HiShoppingBag } from "react-icons/hi2";
import { FaShippingFast } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { MdKeyboardReturn } from "react-icons/md";


const Process = () => {
  return (
    <>
    <Container as="section" display="flex" flexDirection={{base: "column", sm: "row"}} bg="white" boxShadow="2xl" marginBottom="20px" marginTop="20px"
    borderRadius="20px" flexWrap="wrap" fontSize="24px" alignItems="center" justifyContent={{base:"center", md:"space-between", xl:"space-between"}} p="40px">
        <Box as="div" display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
            <Box bg="#da9c1d" color="white" display="flex" alignItems="center" justifyContent="center" borderRadius="50%" width="40px" height="40px"  >
                <HiShoppingBag />
                
            </Box>
            <Text as="p"   fontWeight="semibold"  fontSize="18px">Facil para comprar</Text>
        </Box>
      
        <Box as="div" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box bg="#da9c1d" color="white" display="flex" alignItems="center" justifyContent="center" borderRadius="50%" width="40px" height="40px" textAlign="center">
                <FaShippingFast />
            </Box>
            <Text as="p"  fontWeight="semibold" fontSize="18px">Envios rapidos</Text>
        </Box>   

        <Box as="div" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box bg="#da9c1d" color="white" display="flex" alignItems="center" justifyContent="center" borderRadius="50%" width="40px" height="40px" textAlign="center">
                <MdContactSupport />
            </Box>
            <Text as="p" fontWeight="semibold" fontSize="18px">Soporte 24/7</Text>
        </Box>

        <Box as="div" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box bg="#da9c1d" color="white" display="flex" alignItems="center" justifyContent="center" borderRadius="50%" width="40px" height="40px" textAlign="center">
                <MdKeyboardReturn />
            </Box>
            <Text as="p" fontWeight="semibold" fontSize="18px">Devoluciones al instante</Text>
        </Box>
    </Container>
    </>
  )
}

export default Process