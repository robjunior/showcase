import { Box, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductFilters from '../../components/Products/ProductFilters';
import ProductGrid from '../../components/Products/ProductGrid';
import Sidebar from '../../components/Sidebar/SidebarMain';
import { Product } from '../../types/Product';

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

    useEffect(() => {
        axios.get<Product[]>('/api/products').then((response) => {
            setProducts(response.data);
            setFilteredProducts(response.data);
        });
    }, []);

    useEffect(() => {
        filterProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, sortOrder, priceRange]);

    const filterProducts = () => {
        let filteredProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        filteredProducts = filteredProducts.filter((product) => {
            return product.price >= priceRange[0] && product.price <= priceRange[1];
        });
        filteredProducts.sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
        setFilteredProducts(filteredProducts);
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };
    const handlePriceRangeChange = (value: [number, number]) => {
        setPriceRange(value);
    };

    return (
        <Flex>
            <Sidebar>
                <ProductFilters
                    searchTerm={searchTerm}
                    sortOrder={sortOrder}
                    priceRange={priceRange}
                    onSearchTermChange={handleSearchTermChange}
                    onSortOrderChange={handleSortOrderChange}
                    onPriceRangeChange={handlePriceRangeChange}
                />
            </Sidebar>
            <Box p={4} flex="1">
                <Heading as="h1" size="2xl" mt={12} mb={4}>Products</Heading>
                <ProductGrid products={filteredProducts} />
            </Box>
        </Flex>
    );
};

export default ProductsList;