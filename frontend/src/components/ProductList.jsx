import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return <p>No products found. Add your first product!</p>;
    }

    return (
        <div className="products-section">
            <h2>Products List</h2>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p className="product-desc">{product.description || 'No description'}</p>
                        <p className="product-price">₹{product.price}</p>
                        <p className="product-stock">Stock: {product.quantity || 0}</p>
                        <div className="card-buttons">
                            <button 
                                onClick={() => onEdit(product)} 
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => onDelete(product.id)} 
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;


