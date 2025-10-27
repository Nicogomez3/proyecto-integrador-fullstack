import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const Discover = () => {
  return (
    <>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection={{base:'column', md:'column', lg:'row'}} gap="40px" marginLeft={{base:"25px" , lg:"70px"}} marginRight={{base:"25px" , lg:"70px"}} marginTop="50px" marginBottom="50px" >
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" borderRadius="18px"  h="500px"  p={{ base:"30px" ,lg:"60px"}}  bgImage="linear-gradient(rgba(76, 76, 76, 0.287), rgba(76, 76, 76, 0.287)), url('/img/about.avif')" 
            bgBlendMode="overlay"
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat" gap="40px" width={{base:"100%", lg:"600px"}}>
                <Heading width="80%" color="white" fontSize={{base:'2xl', md:"32px", lg:"36px"}} >Nuestro compromiso con la excelencia</Heading>
                <Text fontWeight="semi-bold" color="white" width={{base:'100%', lg:'40%'}} fontSize={{ base:"16px" , lg:"2xl" }}>Satisfacción garantizada en cada compra</Text>
                <Link to="/Products">
                  <Button color="white" bg="#d09423" width={{base:"150px" , lg:"200px"}} height="50px" borderRadius="40px">
                    Descubre más
                  </Button>
                </Link>
            </Box>
            <Box bg="#f5f5f5" p={{ base:"30px" ,lg:"60px"}} width={{base:"100%", lg:"600px"}} justifyContent="center" borderRadius="18px"  h="500px" display="flex"  allignItems="flex-start" flexDirection="column" gap="30px">
                <Text as = "span" fontSize="2xl" color="black">Ofertas exclusivas</Text>
                <Heading as="h2" width={{base: "100%" , lg:"80%"}} fontSize={{base:"2xl", md:"32px" ,lg:"4xl" }} color="black">Descubre nuestra colección de muebles</Heading>
                <Text fontSize={{ base:"16px" , lg:"xl" }} color="#2a2a2a">Tenés 10% de reintegro con nuestro cupón promocional</Text>
                <Link to="/Products">
                  <Button color="white" bg="#2d5356" borderRadius="40px" width={{base:"150px" , lg:"200px"}} height="50px" fontSize="lg">
                    Comprar ahora 
                  </Button>
                </Link>
                
            </Box>
        </Box>
    
    </>
  )
}

