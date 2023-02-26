import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../types/Product';
interface Props { }

const ProductList: React.FC<Props> = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [sortKey, setSortKey] = useState<'name' | 'price'>('name');
    const [filterName, setFilterName] = useState<string>('');
    const [filterMinPrice, setFilterMinPrice] = useState<number | ''>('');
    const [filterMaxPrice, setFilterMaxPrice] = useState<number | ''>('');

    useEffect(() => {
        axios.get('/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const filteredProducts = products
        .filter((product) => product.name.toLowerCase().includes(filterName.toLowerCase()))
        .filter((product) => filterMinPrice === '' || product.price >= filterMinPrice)
        .filter((product) => filterMaxPrice === '' || product.price <= filterMaxPrice);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortKey === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return a.price - b.price;
        }
    });

    return (
        <div>
            <div>
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortKey} onChange={(e) => setSortKey(e.target.value as 'name' | 'price')}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <div>
                <label htmlFor="filter-name">Filter by name:</label>
                <input
                    id="filter-name"
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="filter-min-price">Filter by minimum price:</label>
                <input
                    id="filter-min-price"
                    type="number"
                    value={filterMinPrice}
                    onChange={(e) => setFilterMinPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="filter-max-price">Filter by maximum price:</label>
                <input
                    id="filter-max-price"
                    type="number"
                    value={filterMaxPrice}
                    onChange={(e) => setFilterMaxPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;