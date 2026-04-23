package com.techxyte.shop.service;

import com.techxyte.shop.entity.Product;
import com.techxyte.shop.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public Product saveProduct(Product product) {
        return productRepo.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProductById(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product with ID " + id + " not found"));
    }

    public void deleteProductById(Long id) {
        if (!productRepo.existsById(id)) {
            throw new RuntimeException("Product with ID " + id + " not found");
        }
        productRepo.deleteById(id);
    }

    public List<Product> searchProductByName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new RuntimeException("Search term cannot be empty");
        }
        return productRepo.findByNameContaining(name);
    }
}