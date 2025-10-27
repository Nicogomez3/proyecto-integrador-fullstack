import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../redux/CategoriesSlice/categoriesSlice';
import { selectCategory } from '../../redux/CategoriesSlice/categoriesSlice';

const Categories = () => {
    const dispatch = useDispatch()
    const selectedCategory = useSelector((state) => state.category.selectedCategory);
    const categories = useSelector((state) => state.category.categories);

    const handleCategoryClick = (category) => {
      dispatch(selectCategory(category));
    };

    return (
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap="10px" mb="20px">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            bg={selectedCategory === category ? '#2d5356' : 'gray.200'}
            color={selectedCategory === category ? 'white' : 'black'}
            _hover={{ bg: selectedCategory === category ? '#2d5356' : 'gray.300' }}
            transition= "all 0.6s ease"
            transform={selectedCategory === category ? 'scale(1.05)' : 'scale(1.0)'}
          >
            {category}
          </Button>
        ))}
      </Box>
    );
  };
  
  export default Categories;