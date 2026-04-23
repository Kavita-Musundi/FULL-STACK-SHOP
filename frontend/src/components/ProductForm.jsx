import React from 'react';

function ProductForm({ 
    editId, name, setName, 
    price, setPrice, 
    quantity, setQuantity, 
    description, setDescription, 
    onSubmit, onCancel 
}) {
    return (
        <div className="form-section">
            <h2>{editId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter product name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input 
                        type="text" 
                        placeholder="Enter description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Price</label>
                        <input 
                            type="number" 
                            step="0.01"
                            placeholder="0.00" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input 
                            type="number" 
                            placeholder="0" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>
                <button type="submit" className="submit-btn">{editId ? 'Update' : 'Add'} Product</button>
                {editId && (
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

export default ProductForm;