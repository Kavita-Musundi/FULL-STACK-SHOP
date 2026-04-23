import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, searchProducts } from '../api';
import SearchBar from '../components/SearchBar';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

function Home() {
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
        const res = await getProducts();
        setProducts(res.data);
    };

    const validateForm = () => {
        if (!name.trim()) {
            alert('Product name is required');
            return false;
        }
        if (name.length < 2) {
            alert('Product name must be at least 2 characters');
            return false;
        }
        if (!price) {
            alert('Price is required');
            return false;
        }
        if (parseFloat(price) <= 0) {
            alert('Price must be greater than 0');
            return false;
        }
        if (quantity && parseInt(quantity) < 0) {
            alert('Quantity cannot be negative');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const product = { 
            name: name.trim(), 
            price: parseFloat(price), 
            quantity: parseInt(quantity) || 0, 
            description: description || '' 
        };
        
        try {
            if (editId) {
                await updateProduct(editId, product);
                alert('Product updated successfully!');
                setEditId(null);
            } else {
                await createProduct(product);
                alert('Product added successfully!');
            }
            
            setName(''); 
            setPrice(''); 
            setQuantity(''); 
            setDescription('');
            loadProducts();
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data;
                for (let key in errors) {
                    alert(errors[key]);
                }
            } else {
                alert('Something went wrong. Please try again.');
            }
        }
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
            try {
                await deleteProduct(id);
                alert('Product deleted successfully!');
                loadProducts();
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert('Please enter a search term');
            return;
        }
        try {
            const res = await searchProducts(searchTerm);
            if (res.data.length === 0) {
                alert('No products found matching "' + searchTerm + '"');
            }
            setProducts(res.data);
        } catch (error) {
            alert('Search failed. Please try again.');
        }
    };

    const handleShowAll = () => {
        setSearchTerm('');
        loadProducts();
    };

    const handleCancel = () => {
        setEditId(null);
        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
    };

    return (
        <div className="main-container">
            <h1 className="page-title">Shop</h1>
            
            <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
                onShowAll={handleShowAll}
            />
            
            <ProductForm 
                editId={editId}
                name={name}
                setName={setName}
                price={price}
                setPrice={setPrice}
                quantity={quantity}
                setQuantity={setQuantity}
                description={description}
                setDescription={setDescription}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
            
            <ProductList 
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Home;  