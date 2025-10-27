import { Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decrementItemQuantity, incrementItemQuantity, toggleCart } from '../../redux/CartSlice/cartSlice';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isOpen)
  const items = useSelector((state) => state.cart.items) || [];
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose} = useDisclosure();
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(clearCart());
    onModalClose();
  }

  const handleDecrement = (item) => {
    if(item.quantity === 1) {
      setItemToDelete(item);
      onDeleteModalOpen();
    } else {
      dispatch(decrementItemQuantity(item.id));
    }
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      dispatch(decrementItemQuantity(itemToDelete.id));
      onDeleteModalClose();
    }
  };

  return (
    <>
          <Box position="relative" onClick={() => dispatch(toggleCart())}>
            <AiOutlineShopping />
              <Box position="absolute" fontSize="16px" bottom="10px" left="12px" bgColor="tomato" borderRadius="50%" width="20px" height="20px" display="flex" justifyContent="center" alignItems="center">
                  <span> {totalItems} </span>
              </Box>
          </Box>
          <Drawer  isOpen={isOpen} placement='right' onClose={() => dispatch(toggleCart())}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Carrito de Compras</DrawerHeader>
              <DrawerBody display="flex" flexDirection="column" justifyContent="space-between">
                <Box display="flex" flexDirection="column" gap="30px">
                  {items.length === 0 ? (
                    <Text>Tu carrito está vacío</Text>
                  ) : (
                    items.map((item) => (
                    <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center" mb="10px" gap="10px">
                      <Text> {item.nombre} </Text>
                      <Img src={item.img} alt={item.nombre} width="50px" height="50px" />
                      <Box display="flex" alignItems="center">
                        <Button onClick={() => handleDecrement(item)}>-</Button>
                        <Text mx="10px"> {item.quantity} </Text>
                        <Button onClick={() => dispatch(incrementItemQuantity(item.id))}>+</Button>
                      </Box>
                    </Box>  
        
                    ))
          
                  )
              
                }

             


              </Box>

              <Box marginTop="70px">
                  <Text>Total: $ {items.reduce((total, item) => total + item.quantity * item.precio, 0).toFixed(2)} </Text>
              </Box>


                <Box display="flex" gap="20px">

                  <Button onClick={() => 
                    navigate('/Checkout')
                  }>Finalizar Compra</Button>
                  <Button onClick={onModalOpen}>Vaciar</Button>
                </Box>
               
                
              </DrawerBody>
            </DrawerContent>
          
          </Drawer>
     
          <Modal isOpen={isModalOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirmar</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>¿Estás seguro de que deseas vaciar el carrito?</Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" onClick={handleClearCart}>
                    Si, Vaciar
                  </Button>
                  <Button ml={3} onClick={onModalClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
            </ModalContent>      
          </Modal>
            
          <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirmar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>¿Estás seguro de que deseas eliminar este producto del carrito?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" onClick={handleDeleteItem}>Sí, eliminar</Button>
                <Button ml={3} onClick={onDeleteModalClose}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
      </Modal>  
         
    </>
  )
}

export default Cart