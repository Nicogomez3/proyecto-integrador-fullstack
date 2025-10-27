import { Box, Button, Container, FormControl, FormLabel, Heading, Input, TagLabel, Text, Textarea } from '@chakra-ui/react'
import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import './contactStyle.css'
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiPhoneOutgoing } from "react-icons/pi";
import { SlPrinter } from "react-icons/sl";
import { LuMapPin } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";


export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_48q0phc', 
        'template_d8y812n', 
        form.current, {
        publicKey: 'A1rohxQk_vwSQDj3w',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };




  return (
    <>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="4"
      // height="100vh"
    >
        <Box display="flex" justifyContent="center" alignItems="center" color="white" bgColor="#2d5356" p="4" width="100%" height="350px" textAlign="center">
          <Heading as="h1" > 
            Contacto
          </Heading>

        </Box>
        <Box display="flex" flexDirection={{ base: "column" , lg: "row" }} alignItems="center" justifyContent="space-between" marginTop="70px" marginBottom="70px" maxWidth="1600px" width="100%">
            <Container display="flex" flexDirection="column" gap="4" width="100%">
              <Heading as="h3">
                Ponte en contacto
              </Heading>
              <Text width="100%">
                  Si tienes alguna duda o sugerencia, no dudes en contactarnos, estamos aqui para ayudarte con cada paso, sí tienes alguna pregunta, necesitas asistencia o quieres compartir tu experiencia, nuestro equipo de soporte estará encantado de ayudarte, nuestro equipo está aqui para ayudarte. 
              </Text>
              <Box display="flex" alignItems="center" gap="4" marginTop="20px">
                <Box fontSize="3xl" color="#ff6a1f" bgColor="#ffe3c6" p="3" borderRadius="12px">
                  <IoMailUnreadOutline />
                </Box>
                <Box>
                  <Text fontSize="small">
                    Correo electronico
                  </Text>
                  <Text fontWeight="500">
                    decoshop@soporte.com
                  </Text>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap="4" marginTop="20px">
                <Box fontSize="3xl" color="#0505ff" bgColor="#d0ecff" p="3" borderRadius="12px">
                  <PiPhoneOutgoing />
                </Box>
                <Box>
                  <Text fontSize="small">
                    Telefono
                  </Text>
                  <Text fontWeight="500">
                    351 123 4567
                  </Text>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap="4" marginTop="20px">
                <Box fontSize="3xl" color="#6504f7" bgColor="#f8e5ff" p="3" borderRadius="12px">
                  <SlPrinter />
                </Box>
                <Box>
                  <Text fontSize="small">
                    Fax
                  </Text>
                  <Text fontWeight="500">
                    (400) 123 4567
                  </Text>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap="4" marginTop="20px">
                <Box fontSize="3xl" color="#10a000" bgColor="#e0ffda" p="3" borderRadius="12px">
                  <LuMapPin />
                </Box>
                <Box>
                  <Text fontSize="small">
                    Oficinas
                  </Text>
                  <Text fontWeight="500">
                    Monseñor Pablo Cabrera 15, Córdoba, Argentina
                  </Text>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-start"  gap="4" marginTop="20px">
                <Heading as="h3" fontWeight="500" fontSize="3xl" >Seguinos en nuestras redes</Heading>
                <Box display="flex" gap="4">
                  <Box color="#c09300" bgColor="#fff9e6" p="3" borderRadius="full" cursor="pointer">
                    <FaInstagram />
                  </Box>
                  <Box color="#c09300" bgColor="#fff9e6" p="3" borderRadius="full" cursor="pointer">
                    <FaXTwitter />
                  </Box>
                  <Box color="#c09300" bgColor="#fff9e6" p="3" borderRadius="full" cursor="pointer">
                    <FiFacebook />
                  </Box>
                  <Box color="#c09300" bgColor="#fff9e6" p="3" borderRadius="full" cursor="pointer">
                    <FaPinterestP />
                  </Box>
                </Box>  
              </Box>

            </Container>
            <Container>
                <form className='form--contact' ref={form} onSubmit={sendEmail}>
                  <Heading as="h3" fontSize="2xl" fontWeight="400" textAlign="center" color="white">
                    Envianos un mensaje
                  </Heading>
                  <div className="form-group">
                    
                    <input type="text" name="user_name" placeholder='Nombre' />
                  </div>
                  <div className="form-group">
                    
                    <input type="email" name="user_email" placeholder='Correo electronico'/>

                  </div>
                  <div className="form-group">
                    
                    <textarea name="message" placeholder='Escribe tu mensaje aqui...' />
                  </div>
                  <input className='button-input' type="submit" value="Enviar" />
              </form>
            </Container>
        </Box>
    </Box>


    </>
  )
}

