import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, searchProducts } from './api';

function App() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const productData = {
            name: name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            description: description
        };

        if (editId) {
            await updateProduct(editId, productData);
            setEditId(null);
        } else {
            await createProduct(productData);
        }

        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        loadProducts();
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
        setDescription(product.description || '');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            loadProducts();
        }
    };

    const handleSearch = async () => {
        if (searchTerm) {
            const response = await searchProducts(searchTerm);
            setProducts(response.data);
        } else {
            loadProducts();
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>🛍️ Shop Product Management</h1>

            {/* Search Section */}
            <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '10px', width: '60%', marginRight: '10px' }}
                />
                <button onClick={handleSearch} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Search</button>
                <button onClick={loadProducts} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Show All</button>
            </div>

            {/* Add/Edit Product Form */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{editId ? 'Update' : 'Add'} Product</button>
                    {editId && (
                        <button type="button" onClick={() => {
                            setEditId(null);
                            setName('');
                            setPrice('');
                            setQuantity('');
                            setDescription('');
                        }} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    )}
                </form>
            </div>

            {/* Products List */}
            <div>
                <h2>All Products</h2>
                {products.length === 0 ? (
                    <p>No products found. Add your first product!</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {products.map((product) => (
                            <div key={product.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                <h3>{product.name}</h3>
                                <p>{product.description || 'No description'}</p>
                                <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#28a745' }}>Price: ₹{product.price}</p>
                                <p>Stock: {product.quantity || 0}</p>
                                <div>
                                    <button onClick={() => handleEdit(product)} style={{ padding: '5px 10px', marginRight: '10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDelete(product.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;