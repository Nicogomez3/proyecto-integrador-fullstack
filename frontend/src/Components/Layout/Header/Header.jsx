import { Box, Button, Container, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toggleMenu } from '../../../redux/MenuSlice/menuSlice';
import Cart from '../../Cart/Cart';
import { logoutUser } from '../../../redux/AuthSlice/authSlice';
// import { FaRegUser } from "react-icons/fa";
// import { PiSignIn } from "react-icons/pi";
import { motion, AnimatePresence } from 'framer-motion';
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";


export const Header = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const isMenuOpen = useSelector(state => state.menu.isOpen);
    const isOpen = useSelector((state) => state.cart.isOpen);
    const MotionMenu = motion(Container);


    const handleLogout = () => {
      dispatch(logoutUser());
    };

    const handleClick = () => {
      window.scroll(0, 0);
      navigate("/Products");
    }

  const NavLinkHover = ({ to, children }) => (
    <Box
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        bottom: "-2px",
        left: 0,
        width: "0%",
        height: "2px",
        bg: "#da9c1d",
        transition: "width 0.3s ease-in-out",
      }}
      _hover={{
        _after: { width: "100%" },
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
);

  return (
    <>
    <Flex 
    as="header" 
    transition="background-color 0.3s ease"
    margin="0 auto"
    justifyContent="space-between"
    align="center" 
    p="0 30px 0 30px" 
    height="70px"
    position="fixed" 
    top="0" 
    left="0" 
    zIndex="10" 
    width="100%"
    bgColor="#2d5356"
    >    
        <Heading color="white">DecoShop<Text color="#da9c1d"  as="span">.</Text> </Heading>    
            <Flex 
                as="nav" 
                display= "flex" 
                color='white' 
                listStyleType="none" 
                alignItems="center"
                justifyContent="space-between"       
            >
              <IconButton bg="transparent" 
              icon={ isMenuOpen ? <CloseIcon /> : <HamburgerIcon color="white" fontSize="3xl" />}
              onClick={() => dispatch(toggleMenu())}
              display={{ base: "block", md: "none" }}
              aria-label="Toggle Menu"
              />    
              <AnimatePresence>
                {isMenuOpen && (
                  <MotionMenu
                    as='ul'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, y: -10 }}
                    
                    display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
                    flexDirection={{ base: "column", md: "row" }}
                    color='white'  
                    gap="4" 
                    margin="0"
                    fontSize={{ base: "24px", md: "16px" }}
                    position={{ base: "absolute", md:"static" }}
                    top="60px"
                    right="0px"  
                    padding={{ base: "40px 30px 0 0", md: "30px" }}
                    zIndex="5"
                    bg={{ base: "#2d5356", md:"none" }}
                    alignItems={{ base: "flex-end", md:"center" }}
                    justifyContent={{ base: "none", md:"space-between" }}
                    borderRadius={{ base: "0 0 10px 10px", lg: "none" }}
                    height={{ base: "calc(100vh - 60px)", md: "auto" }}
                    w={{ base: "50%" }}
                  >
                    <Heading as='h2' marginBottom="30px" display={{ base: "block", md:"none" }}>DecoShop</Heading>   
                    <NavLinkHover to="/">Inicio</NavLinkHover>
                    <NavLinkHover to="/About">Nosotros</NavLinkHover>
                    <NavLinkHover to="/Contact">Contacto</NavLinkHover>
                    <NavLinkHover to="/Products" onClick={handleClick}>Productos</NavLinkHover>

                    {loggedInUser ? (
                      <Container
                        display="flex"
                        padding="0"
                        flexDirection={{ base: "column", md:"row" }}
                        alignItems={{ base: "flex-end", md:"center" }}
                        gap="10px"
                      >
                        <Text color="white">{loggedInUser.name}</Text>
                        <Button bg="#da9c1d" color="white" onClick={handleLogout}>
                          Cerrar Sesión
                        </Button>
                      </Container>
                    ) : (
                      <>
                        <Button
                          bg="transparent" 
                          _focus={{ boxShadow: 'none' }} 
                          _hover={{ bg: 'transparent' }}  
                          color="white"
                          minWidth={{ base: "auto", md: "150px" }}
                        > 
                          <Link to="/login">
                            <CiLogin size={"28px"} />
                          </Link>
                        </Button>

                        <Button 
                          bg="transparent"
                          _focus={{ boxShadow: 'none' }} 
                          _hover={{ bg: 'transparent' }}  
                          color="white" 
                        >
                          <Link to="/register">
                            <CiUser size={"28px"} />
                          </Link>
                        </Button>
                      </>
                    )}
                  </MotionMenu>
                )}
              </AnimatePresence>
              <Container
              as='ul'
              display={{ base: "none", md: "flex" }}
              flexDirection="row"
              color='white'  
              gap="4" 
              margin="0"
              fontSize={{ base: "16px", md: "14px" , lg: "16px" }}
              alignItems="center"
              justifyContent="space-between"
              padding="30px"
            >
              <NavLinkHover to="/">Inicio</NavLinkHover>
              <NavLinkHover to="/About">Nosotros</NavLinkHover>
              <NavLinkHover to="/Contact">Contacto</NavLinkHover>
              <NavLinkHover to="/Products" onClick={handleClick}>Productos</NavLinkHover>

              {loggedInUser ? (
                <Container display="flex" padding="0" flexDirection="row" alignItems="center" gap="10px">
                  <Text color="white">{loggedInUser.name}</Text>
                  <Button bg="#da9c1d" color="white" onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </Container>
              ) : (
                <>
                
                    <Link to="/login">
                        <CiLogin size={"28px"}/>
                    </Link>
                    <Link to="/register">
                      <CiUser size={"28px"} />
                    </Link>
                </>
              )}
            </Container>
             

              <Container as='div'cursor="pointer" color="white" fontSize='24px' width="0px" padding="0px" marginInlineStart="0px" marginEnd="0px" marginStart="0px" marginInlineEnd="0px"       paddingRight="30px">
               <Cart/>
              </Container>
              
      
                       
            </Flex>

            
        
    </Flex>    
        
    </>
  )
}

