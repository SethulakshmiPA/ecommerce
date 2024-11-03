import React from 'react';
import { Box, Image, Text, SimpleGrid, Heading } from 'react-bootstrap'; // Adjust import if needed

const featuredProductsData = [
  { id: 1, name: 'Stylish T-Shirt', image: 'https://via.placeholder.com/150', price: '$19.99' },
  { id: 2, name: 'Classic Jeans', image: 'https://via.placeholder.com/150', price: '$39.99' },
  { id: 3, name: 'Elegant Dress', image: 'https://via.placeholder.com/150', price: '$29.99' },
  { id: 4, name: 'Comfortable Sneakers', image: 'https://via.placeholder.com/150', price: '$49.99' },
];

const FeaturedProduct = () => {
  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>Featured Products</Heading>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {featuredProductsData.map(product => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" textAlign="center" p={4}>
            <Image src={product.image} alt={product.name} boxSize="150px" />
            <Text mt={2} fontWeight="bold">{product.name}</Text>
            <Text color="gray.500">{product.price}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeaturedProduct;
