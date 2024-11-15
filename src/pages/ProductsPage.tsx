import { useState } from 'react';
import { Container, Typography, Box, Pagination } from '@mui/material';
import { useProduct } from '../store/productContext';
import ProductCard from '../components/features/ProductCard';
import { Product } from '../types/Product';

const ProductsPage = () => {
  const { products } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center">
        Our Products
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 3, md: 4 },
          justifyContent: 'space-between',
        }}
      >
        {currentProducts.map((product: Product) => (
          <Box
            key={product.id}
            sx={{
              width: { xs: '100%', sm: '48%', md: '30%', lg: '22%' },
              mb: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ProductsPage;
