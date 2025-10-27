import { Box, Container, Flex, Heading, Img, Link, Text } from '@chakra-ui/react'
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import React from 'react'

export const Footer = () => {
  return (
    <Box as="footer" display="flex" flexDirection="column"  justifyContent="center" gap="30px" alignItems="center" margin="0 auto"  color="black">
        <Box w="100%" display="flex" flexDirection="column" alignItems="center" gap="50px" justifyContent="center">
          <Box border="1px solid #dbdbdbdb"  width="100%" height="1px"></Box>
          <Heading fontSize={{base: "4xl" , lg:"6xl"}}>DecoShop<Text as="span" color="#d09423">.</Text></Heading>
          <Box border="1px solid #dbdbdbdb" width="100%" height="1px"></Box>
        </Box>
        <Box display="flex" flexDirection={{ base: "column", md:"row"}} justifyContent="space-around" alignItems={{base: 'flex-start' , md:"center"}} width={{ base: "auto", md:"100% "}}  marginLeft="200px" marginRight="200px" >
          <Box display="flex" flexDirection="column" gap="20px" fontSize={{base:"xl" , lg:"2xl"}} alignItems="flex-start">
            <Link>Sobre nosotros</Link>
            <Link>Nuestra Empresa</Link>
            <Link>Nuestra Historia</Link>
            <Link>Blog</Link>
          </Box>
          <Box display="flex" flexDirection="column" gap="20px" fontSize={{base:"xl" , lg:"2xl"}} alignItems="flex-start">
            <Link>Información</Link>
            <Link>Envios</Link>
            <Link>Politica de Privacidad</Link>
            <Link>Terminos y condiciones</Link>
            <Link>Devoluciones</Link>
          </Box>
          <Box display="flex" flexDirection="column" gap="20px" fontSize={{base:"xl" , lg:"2xl"}} alignItems="flex-start">
            <Link>Soporte</Link>
            <Link>Contactenos</Link>
            <Link>Ayuda</Link>
            <Link>FAQ</Link>
            <Link>Checkout</Link>
          </Box>
        </Box>
        <Box bg="#2d5356" width="100%" height={{base:"100vh" , md:"90px"}} textAlign="center" display="flex" flexDirection={{base:"column" , md:"row"}} justifyContent={{base:"center" , md:"space-around"}} alignItems="center" padding="20px" gap="4" >
          <Text color="white">Copyright@2025 Decoshop. Todos los derechos reservados </Text>
          <Box display="flex" flexDirection={{base:"column" , md:"row"}} gap="20px" alignItems="center">
            <Link  href="https://www.facebook.com" isExternal>
              <Box borderRadius="50%" bgColor="	#355d5f" boxShadow="0 0 0 1px rgba(255, 255, 255, 0.2)" padding="10px"   _hover={{ boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.5)", transform: "scale(1.05)" , bg:"#d09423"}} display="flex" justifyContent="center" alignItems="center">
                <FiFacebook color="white" size="20px" />

              </Box>
            </Link>
            <Link  href="https://www.instagram.com" isExternal>
              <Box borderRadius="50%" bgColor="#355d5f" border="1px solid rgba(255, 255, 255, 0.3)" padding="10px" _hover={{ boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.5)", transform: "scale(1.05)" , bg:"#d09423"}} display="flex" justifyContent="center" alignItems="center">
                <FiInstagram color="white" size="20px" />
              </Box>  
            </Link>
            <Link  href="https://www.twitter.com" isExternal>
              <Box borderRadius="50%" bgColor="#355d5f"  border="1px solid rgba(255, 255, 255, 0.3)" padding="10px" _hover={{ boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.5)", transform: "scale(1.05)" , bg:"#d09423"}} justifyContent="center" alignItems="center">
                <FaXTwitter color="white" size="18px" />
              </Box>

            </Link>
          </Box>
          <Box display="flex" gap="10px" alignItems="center" marginRight="20px">
            <Box bgColor="#e3e3e391"  borderRadius="2px"  display="flex" alignItems="center" justifyContent="center" width="52px" height="30px">
              <Img src='/img/ae3.avif' width="38px" />
            </Box>
            <Box bgColor="#e3e3e391"  borderRadius="2px"  display="flex" alignItems="center" justifyContent="center" width="52px" height="30px">
              <Img src='/img/mastercard.avif' width="36px" />
            </Box>
            <Box bgColor="#e3e3e391"  borderRadius="2px"  display="flex" alignItems="center" justifyContent="center" width="52px" height="30px">
              <Img src='/img/ae2.avif' width="36px" />
            </Box>
          </Box>
        </Box>
    </Box>
  )
}
