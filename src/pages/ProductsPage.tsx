import { useState } from 'react';
import { Container, Typography, Box, Skeleton, Pagination } from '@mui/material';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/features/ProductCard';
import { Product } from '../types/Product';

const ProductsPage = () => {
  const { data: products, loading, error } = useFetch<Product[]>('/data/products.json');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (loading)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width="60%" sx={{ marginBottom: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={350} sx={{ marginBottom: 2 }} />
        <Skeleton variant="text" width="80%" />
      </Container>
    );

  if (error) return <div>Error: {error}</div>;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

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
        {currentProducts?.map((product) => (
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
          count={Math.ceil((products?.length || 0) / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ProductsPage;
