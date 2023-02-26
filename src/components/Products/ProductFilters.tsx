import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Text } from '@chakra-ui/react';

type Props = {
  searchTerm: string;
  sortOrder: 'asc' | 'desc';
  priceRange: [number, number];
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSortOrderChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onPriceRangeChange: (value: [number, number]) => void;
}

const ProductFilters = ({ searchTerm, sortOrder, priceRange, onSearchTermChange, onSortOrderChange, onPriceRangeChange }: Props) => {
  return (
    <Box>
      <InputGroup mb="2em">
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input type="text" placeholder="Type to Search" value={searchTerm} onChange={onSearchTermChange} />
      </InputGroup>

      <Box mb="2em">
        <Text>Sort By:</Text>
        <Select w="auto" value={sortOrder} onChange={onSortOrderChange}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
      </Box>

      <InputGroup mb="2em">
        <Box w="auto">
          <Text mb={2}>Price Range: R$ {priceRange[0]} - R$ {priceRange[1]}</Text>
          <RangeSlider defaultValue={priceRange} min={0} max={100} onChange={onPriceRangeChange}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>
      </InputGroup>
    </Box>
  );
};

export default ProductFilters;