import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/features/ProductCard';
import { Product } from '../types/Product';

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: products, loading, error } = useFetch<Product[]>('/data/products.json');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const product = products?.find((p) => p.id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>

      <Box display="flex" justifyContent="center">
        <ProductCard product={product} isDetailsPage={true} />
      </Box>
    </Container>
  );
};

export default ProductDetailsPage;
