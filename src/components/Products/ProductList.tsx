import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { RangeSlider } from '@chakra-ui/react';

interface Product {
    id: number;
    name: string;
    price: number;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [priceRange, setPriceRange] = useState([0, 100]);

    useEffect(() => {
        axios.get<Product[]>('/products').then((response) => {
            setProducts(response.data);
            setFilteredProducts(response.data);
        });
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchTerm, sortOrder, priceRange]);

    const filterProducts = () => {
        let filteredProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        filteredProducts = filteredProducts.filter((product) => {
            return product.price >= priceRange[0] && product.price <= priceRange[1];
        });

        filteredProducts.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
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
        <Box p={4}>
            <Heading as="h1" mb={4}>
                Product List
            </Heading>
            <Flex mb={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
                    <Input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchTermChange} />
                </InputGroup>
                <Select ml={4} w="150px" value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </Select>
                <Box ml={4} w="300px">
                    <Text mb={2}>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
                    <RangeSlider defaultValue={priceRange} min={0} max={100} onChange={handlePriceRangeChange} />
                </Box>
            </Flex>
            <Box>
                {filteredProducts.map((product) => (
                    <Box key={product.id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                        <Heading as="h2" size="md" mb={2}>
                            {product.name}
                        </Heading>
                        <Text>${product.price.toFixed(2)}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ProductList;