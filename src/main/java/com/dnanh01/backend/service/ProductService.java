package com.dnanh01.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.dnanh01.backend.dto.TopProductsDto;
import com.dnanh01.backend.exception.ProductException;
import com.dnanh01.backend.model.Product;
import com.dnanh01.backend.request.CreateProductRequest;

public interface ProductService {
    public Product createProduct(CreateProductRequest req);

    public String deleteProduct(Long productId) throws ProductException;

    public Product updateProduct(Long productId, Product req) throws ProductException;

    public Product findProductById(Long id) throws ProductException;

    public List<Product> findProductByCategory(String category);

    public List<Product> findAllProducts();

    public Page<Product> getAllProduct(String category, List<String> colors, List<String> sizes, Integer minPrice,
            Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);

    public List<TopProductsDto> getTopNewProducts();

    public List<TopProductsDto> getTopSellingProducts();

    public List<TopProductsDto> getTopRatingProducts();
}
