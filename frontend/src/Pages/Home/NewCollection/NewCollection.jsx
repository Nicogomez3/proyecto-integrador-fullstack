import { Box, Grid, Image, Text, Heading, Button, Link, VStack } from "@chakra-ui/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link as RouterLink } from "react-router-dom";

import React from 'react'
import './StylesCollection.css'
const NewCollection = () => {
     
return (

<Box display="flex" justifyContent="center" mt="30px" mb="30px" px="4" w="100%">
      <Grid
        w="100%"
        maxW="1280px"
        gap="10px"
        templateColumns={{ base: "1fr", xl: "repeat(3, 1fr)" }}
        templateRows={{ xl: "repeat(6, 1fr)" }}
      >
        {/* Caja 1 - Center Table */}
        <Box
          bg="#f7f7f7"
          p="30px"
          borderRadius="16px"
          gridColumn={{ xl: "span 2" }}
          gridRow={{ xl: "span 3" }}
          display="flex"
          alignItems={{ base: "center", md: "flex-start" }} 
          justifyContent={{ base: "center", md: "space-between" }}
          
        >
          <Box display="flex" flexDirection="column" h="100%">
            <Heading fontSize="sm" color="teal.600" mb="2" bg="white" p="1" borderRadius="full" width="fit-content">
              NUEVA COLECCION
            </Heading>
            <Text fontSize="xl" fontWeight="bold" mb="2">Mesa principal</Text>
            <Text>Mesa Cuadrada</Text>
            <Text>Mesa redonda</Text>
            <Text>Mesa de madera</Text>
            <Text>Mesa de madera</Text>

            <RouterLink to="/Products"  >
              <Box mt="2" display="flex" alignItems="center" color="teal.600" fontWeight="semibold">
                Ver todo <IoIosArrowRoundForward />
              </Box>
            </RouterLink>
          </Box>
          <Box>
            <Image src="/img/mesaRedonda.avif" display={{ base: "none" , md:"block"}} alt="Table" mt="20px" borderRadius="lg" w="500px" h="350px"  />
          </Box>
        </Box>

        {/* Caja 2 - Accent Chairs */}
        <Box
          bg="#f7f7f7"
          p="30px"
          borderRadius="16px"
          gridColumn={{ xl: "3" }}
          gridRow={{ xl: "1 / span 6" }}
          display="flex"
          alignItems={{ base: "center", md: "flex-end" }} 
          justifyContent={{ base: "center", md: "space-between" }}
        >
          <Box display="flex" flexDirection="column" h="100%" >
            <Heading fontSize="sm" color="teal.600" mb="2" bg="white" p="1" borderRadius="full" width="fit-content">
              NUEVA COLECCION
            </Heading>
            <Text fontSize="xl" fontWeight="bold" mb="2">Sillas decorativas</Text>
            <Text>Sillón</Text>
            <Text>Sillón orejero</Text>
            <Text>Silla de café</Text>
            <Text>Silla con ruedas</Text>
            <RouterLink to="/Products"  >
              <Box mt="2" display="flex" alignItems="center" color="teal.600" fontWeight="semibold">
                Ver todo <IoIosArrowRoundForward />
              </Box>
            </RouterLink>
          </Box>
          <Image src="/img/antiguo.avif" display={{ base: "none" , md:"block"}} alt="Chair" mt="20px" borderRadius="lg" w="290px" h="400px" />
        </Box>

        {/* Caja 3 - Lighting Lamp */}
        <Box
          bg="#f7f7f7"
          p="30px"
          borderRadius="16px"
          gridColumn={{ xl: "1" }}
          gridRow={{ xl: "4 / span 3" }}
          display="flex"
          alignItems={{ base: "center", md: "flex-start" }} 
          justifyContent={{ base: "center", md: "space-between" }}
        >
          <Box display="flex" flexDirection="column" h="100%">
            <Heading fontSize="sm" color="teal.600" mb="2" bg="white" p="1" borderRadius="full" width="fit-content">
              NUEVA COLECCION
            </Heading>
            <Text fontSize="xl" fontWeight="bold" mb="2">Lampara luminosas</Text>
            <Text>Lamparas de piso</Text>
            <Text>Lamparas Tripode</Text>
            <Text>Lamparas de Mesa</Text>
            <Text>Lamparas para estudio</Text>
            <RouterLink to="/Products"  >
              <Box mt="2" display="flex" alignItems="center" color="teal.600" fontWeight="semibold">
                Ver todo <IoIosArrowRoundForward />
              </Box>
            </RouterLink>
          </Box>
          <Image src="/img/product6.avif" alt="Lamp" mt="90px" h="150px" display={{ base: "none" , md:"block"}} borderRadius="lg" w="250px" objectFit="contain" />
        </Box>

        {/* Caja 4 - Get Discount */}
        <Box
          bg="teal.900"
          p="30px"
          borderRadius="16px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="white"
          gridColumn={{ xl: "2" }}
          gridRow={{ xl: "4 / span 3" }}
        >
          <Box bg="orange.400" borderRadius="full" px="4" py="1" fontWeight="bold" mb="4">
            Ofertas Exclusivas
          </Box>
          <Text fontSize="3xl" fontWeight="semibold">20% Descuento</Text>
        </Box>
      </Grid>
    </Box>


)

}

export default NewCollection