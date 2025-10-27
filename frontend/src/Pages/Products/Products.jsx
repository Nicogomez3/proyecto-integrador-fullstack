import { Box, Text, Grid, GridItem, Heading, Button, Img, Select, useToast } from '@chakra-ui/react';
import { products as productsData } from '../../Data/Products';
import React, { useEffect, useState } from 'react';
import Categories from '../../Components/Categories/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../redux/CartSlice/cartSlice';
import { setProducts } from '../../redux/ProductSlice/productSlice';
import { FaCartShopping } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion';

export const Products = () => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [productsToShow, setProductsToShow] = useState(6); // Número inicial de productos a mostrar
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const toast = useToast();
  const MotionGridItem = motion(GridItem);
  const MotionGrid = motion(Grid);

  useEffect(() => {
    // Despacha la acción para establecer los productos en el estado de Redux
    dispatch(setProducts(productsData));
  }, [dispatch]);

  useEffect(() => {
    // Filtra los productos según la categoría seleccionada
    let filteredProducts = [...products]; ;
    if (selectedCategory && selectedCategory !== 'Todo') {
      filteredProducts = products.filter(product => product.categoria === selectedCategory);
    }
    // Aplica el filtro de orden
    if (filter === 'price-asc') {
      filteredProducts.sort((a, b) => a.precio - b.precio);
    } else if (filter === 'price-desc') {
      filteredProducts.sort((a, b) => b.precio - a.precio);
    } else if (filter === 'name-asc') {
      filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filter === 'name-desc') {
      filteredProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
    setVisibleProducts(filteredProducts.slice(0, productsToShow)); // Mostrar solo los productos necesarios
  }, [products, selectedCategory, filter, productsToShow]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    toast({
      title: 'Producto añadido al carrito',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleShowMore = () => {
    setProductsToShow(productsToShow + 6); // Incrementa el número de productos a mostrar
  };

  const handleShowLess = () => {
    setProductsToShow(Math.max(productsToShow - 6, 6)); // Decrementa el número de productos a mostrar, pero no menos de 6
  };

  return (
    <Box display="flex" alignItems="center" marginTop="40px" justifyContent="center" flexDirection="column" width="100%" padding="20px">
      <Heading as="h2" fontSize="4xl" textAlign="center" margin="20px">Productos</Heading>
      <Categories />
      <Select placeholder="Ordenar por" onChange={handleFilterChange} width="200px" marginBottom="20px">
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
      </Select>
      <Box   
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"  
        maxW="1200px"
      >
        <AnimatePresence mode="wait">
          <MotionGrid
              key={selectedCategory + filter}
              templateColumns= {{ base: "1fr", lg: "repeat(3, 1fr)" }}
              justifyContent="center"
              p="20px"
              gap={6}
              w="100%"
              maxW="1200px"
              mx="auto"
              
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {visibleProducts.map((product) => (
            <GridItem key={product.id}    
                            boxShadow="-1px -1px 12px 2px rgba(0,0,0,0.34);   "
                            borderRadius="20px"
                            w={{ base:"280px", md:"325px", lg:"325px", xl:"400px" }}
                            
                            h="420px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            alignItems="center"
                            textAlign="center"
                            mx="auto"
            >
              <Img src={product.img} alt={product.nombre} w="250px" h="300px" objectFit="contain" borderRadius="12px" />
              <Box backgroundColor="#2d5356" p="20px" borderRadius="18px" display="flex" alignItems="center" justifyContent="space-between" width="100%" height="90px" mt="10px">
                <Box display="flex" flexDirection="column" alignItems="flex-start" lineHeight={2.0} justifyContent="center">
                  <Heading as="h3" color="white" textAlign="left" fontWeight="500" fontSize="16px">{product.nombre}</Heading>
                  <Text color="white" textAlign="left" fontWeight="semibold">$ {product.precio.toFixed(2)}</Text>

                </Box>
                <Box display="flex" flexDirection={{base: "column" , md:"row"}} alignItems={"center"} gap={{base:"5px" , md: "15px"}} justifyContent="center" mt="10px">
                  <Text color="white" fontWeight="semibold">{product.categoria}</Text>
                  <Button  color="#cf9220" backgroundColor="white" p="10px" borderRadius="50%" width={{base:"40px" , md:"50px"}} height={{base:"40px" , md:"50px"}} onClick={() => handleAddToCart(product)}>
                    <FaCartShopping fontSize="24px" />
                  </Button>

                </Box>

              </Box>
            </GridItem>
          ))}
          </MotionGrid>
        </AnimatePresence>
      
      </Box>
      
      <Box display="flex" justifyContent="center" marginTop="20px">
        {productsToShow < products.length && (
          <Button onClick={handleShowMore} marginRight="10px">
            Mostrar más
          </Button>
        )}
        {productsToShow > 6 && (
          <Button onClick={handleShowLess}>
            Mostrar menos
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Products;