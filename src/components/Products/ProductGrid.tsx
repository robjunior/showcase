import { Flex, Grid, Box, Heading, Text } from '@chakra-ui/react';
import { Product } from '../../types/Product';

type Props = {
    products: Product[];
}

const ProductGrid = ({ products }: Props) => {
    return (
        <Flex
            direction="column"
            maxW={{ xl: "1200px" }}
            m="0 auto"
            minH="100vh"
        >
            
            <Grid
                w="full"
                gridGap="5"
                gridTemplateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
            >
                {products.map((product) => (
                    <Box key={product.id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                        <Heading as="h2" size="md" mb={2}>
                            {product.name}
                        </Heading>
                        <Text>R$ {product.price.toFixed(2)}</Text>
                    </Box>
                ))}
            </Grid>
        </Flex>
    );
};

export default ProductGrid;