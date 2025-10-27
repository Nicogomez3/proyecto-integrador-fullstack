import { Box, Heading, Text, Button, Img} from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { clearCart } from '../../redux/CartSlice/cartSlice';


const Congratulations = () => {
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  if (!currentOrder) {
    return <Text>No hay órdenes disponibles.</Text>;
  }
  return (
    <Box display="flex" flexDirection="column" height="100vh
    " justifyContent="center" alignItems="center" p="20px">
      {/* <Box position="relative">
          <Box position="absolute" top="307px" right="160" fontSize="50px"   color="#d09423">
            <FaStar />
          </Box>
          <Box position="absolute" bottom="2" right="57" fontSize="50px"   color="#d09423">
            <FaStar />
          </Box>
          <Box position="absolute" bottom="-125px" left="-120px" fontSize="50px"   color="#d09423">
            <FaStar />
          </Box>
           
          <Img p="20px" color="#d09423" width="180px" transform="translate(-55%, 190%) rotate(55deg)"  src="img/arrow.png" alt="" />

          <Img transform="translate(-147%, 326%)" width="145px" src='img/arrow2.png'/>

          <Img transform="translate(145%, 62%) rotate(180deg)" width="145px" src='img/arrow2.png'/>

          <Box position="absolute" bottom="-260" left="210px" fontSize="50px"  p="20px" color="#d09423">
            <FaStar />
          </Box>
          <Box position="absolute" bottom="-234px" left="-215px" fontSize="50px"  p="20px" color="#d09423">
            <FaRegStar />
          </Box>
          <Box position="absolute" bottom="-145px" left="110px" fontSize="50px"  p="20px" color="#d09423">
              <FaRegStar />
          </Box>
      </Box> */}
      <Box fontSize="50px" bgColor="green.500" borderRadius="50%" p="20px" color="white" mb="20px">
        <FaCheck />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
        <Heading as="h1" fontSize={{base:"32px" , md:"64px"}}>¡Felicitaciones!</Heading>
        <Text>Tu pedido ha sido realizado con éxito.</Text>
        <Text>¡Gracias por tu compra!</Text>
        <Button mt="20px" onClick={() => navigate('/order')}>
            Ver Órdenes
        </Button>
      </Box>

    </Box>
  )
}

export default Congratulations