import { Box, Button, Flex, Heading, Img, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


export const ChooseUs = () => {
  return (
    <>
      <Box bg="#f5f5f5" borderRadius="16px" display="flex" padding="30px" justifyContent="center" alignItems="center" flexDirection={{base:'column', md:'column', lg:'row'}} gap="40px" 
      width={{ base: "95%", md: "80%", lg: "900px" }}
      mx="auto"
        marginTop="50px" marginBottom="50px">
        <Box>
          <Heading as="h2" fontSize={{base:'2xl', md:"32px", lg:"36px" }} color="black" width={{base:"100%", lg:"400px    "}}>Por qué elegirnos</Heading>
          <Text fontWeight="semi-bold" color="blackAlpha.700" width={{base:'100%', lg:'70%'}} fontSize={{ base:"16px" , lg:"2xl" }}>Comprometidos con la calidad y el servicio al cliente</Text>
          
          <Link to="/About">
            <Button  bgColor="#2d5356" borderRadius="40px" width={{base:"150px" , lg:"200px"}} height="50px" fontSize="lg" color="white" marginTop="20px"> 
              Sobre Nosotros
            </Button>
          </Link>
        </Box>
        <Box>
          <Img src="/img/support.avif" objectFit="cover" alt="Choose Us" width={{base:"100%", lg:"600px"}} height="400px" borderRadius="18px" />
        </Box>
      </Box>
    </>
  )
}

