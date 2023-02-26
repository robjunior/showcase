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
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Product } from '../../types/Product';

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

                <InputGroup>
                    <Select ml={4} w="auto" value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </Select>
                </InputGroup>
                <InputGroup>
                    <Box ml={4} w="300px">
                        <Text mb={2}>Price Range: R$ {priceRange[0]} - R$ {priceRange[1]}</Text>
                        <RangeSlider defaultValue={priceRange} min={0} max={100} onChange={handlePriceRangeChange}>
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                        </RangeSlider>
                    </Box>
                </InputGroup>
            </Flex>
            <Flex>
                {filteredProducts.map((product) => (
                    <Box key={product.id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                        <Heading as="h2" size="md" mb={2}>
                            {product.name}
                        </Heading>
                        <Text>R$ {product.price.toFixed(2)}</Text>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default ProductList;