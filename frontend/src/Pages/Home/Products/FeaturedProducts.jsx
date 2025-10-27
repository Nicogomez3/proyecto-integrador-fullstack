import { Box,Text, Grid, GridItem, Heading, SimpleGrid, Button, Img, } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { randomsPick } from '../../../utils/randomsPick';
import { Link, Navigate } from 'react-router-dom';
import { Recommended } from '../../../Data/Recommended';
import { FaCartShopping } from "react-icons/fa6";



export const FeaturedProducts = () => {


  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const randomProducts = randomsPick(Recommended, 6);
    setFeaturedProducts(randomProducts);
  }, []);

  const handleClick = () => {
    window.scroll(0, 0);
    Navigate("/Products");
  }

  return (
    <>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="100%" padding="20px">
            <Heading as="h2" fontSize="2xl" textAlign="center" margin="20px">Productos Destacados</Heading>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              maxWidth="1200px" 
              width="100%"
              padding="20px"
            
            >
              <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} justifyContent="center" width={{ base: "none", lg: "80%" }}   gap={6} p="20px">
                      {featuredProducts.map((product) => (
                          <GridItem 
                          key={product.id}
                          boxShadow="-1px -1px 12px 2px rgba(0,0,0,0.34);   "
                          borderRadius="20px"
                          w={{base:"250px", md:"325px", lg:"325px", xl:"400px"}}
                          h="420px"
                          
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          alignItems="center"
                          textAlign="center"
                          >
                            <Img src={product.img} alt={product.nombre} w="250px" h="300px" p="16px" objectFit="contain"  borderRadius="12px"/>
                            <Box backgroundColor="#2d5356" p="20px" borderRadius="18px" display="flex" alignItems="center" justifyContent="space-between" width="100%" height="90px" mt="10px">
                              <Box display="flex" flexDirection="column" alignItems="flex-start" lineHeight={2.0} justifyContent="center">
                                <Heading as="h3" color="white" fontWeight="500" fontSize="16px"> {product.nombre} </Heading>
                                <Text color="white" fontWeight="semibold"> $ {product.precio.toFixed(2)}</Text>
                              </Box>
                              <Box display="flex" alignItems={"center"} justifyContent="center" mt="10px">
                                <Button color="#cf9220" backgroundColor="white" p="10px" borderRadius="50%" width="50px" height="50px"  to="/Products" onClick={handleClick}>
                                  <Link to="/Products"> 
                                    <FaCartShopping fontSize="24px" />
                                  </Link>
                                </Button>
                              </Box>
                            </Box>
                            
                          
                          </GridItem>
                      ))}
              </Grid>
            </Box>
          
        </Box>

    </>
  );
};

