import { Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'

 const Parrafo1 = () => {
   return (
     <Text fontSize={{ base: "16px", lg: "20px" }} color="white" width={{ base: "100%", lg: "70%" }}>
       En nuestra empresa, nos dedicamos a ofrecer productos de alta calidad y un servicio al cliente excepcional. Nuestro compromiso es garantizar la satisfacción de nuestros clientes a través de una atención personalizada y soluciones adaptadas a sus necesidades.
     </Text>
   )
 }

export const About = () => {
  return (
    <div>
      <Container
      bgImage="/img/about.avif"
      bgSize="cover"
      maxWidth="none"
      height="100vh"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      flexDirection={{base:'column', lg:'row'}}
      justifyContent={{base:'center', lg:'space-between'}}
      alignItems={{base:'flex-start', lg:'flex-end'}}
      >
        <Heading as="h1" color="white" fontSize={{base:'4xl', sm:'5xl', md:'6xl', lg:'8xl'}} p="20px" >
          <Text as="span" fontWeight="700" fontSize={{base:'4xl', sm:'5xl', md:'6xl', lg:'8xl'}} display="block" color="white" >Sobre</Text>
          <Text as="span" fontWeight="700" fontSize={{base:'4xl', sm:'5xl', md:'6xl', lg:'8xl'}} color="white" >Nosotros</Text>
        </Heading>
        <Container  as="section" maxW="600px" margin="0" p="20px" display="flex" flexDirection="column" >
          <Parrafo1/>
          
        </Container>
      </Container>

    </div>
  )
}

