package com.dnanh01.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dnanh01.backend.dto.TopProductsDto;
import com.dnanh01.backend.exception.ProductException;
import com.dnanh01.backend.model.Product;
import com.dnanh01.backend.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public ResponseEntity<Page<Product>> findProductByPropertiesHandler(
            @RequestParam String brand,
            @RequestParam List<String> color,
            @RequestParam List<String> size,
            @RequestParam Integer minPrice,
            @RequestParam Integer maxPrice,
            @RequestParam Integer minDiscount,
            @RequestParam String sort,
            @RequestParam String stock,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize

    ) {
        Page<Product> res = productService.getAllProduct(brand, color, size, minPrice, maxPrice, minDiscount, sort,
                stock, pageNumber, pageSize);
        System.out.println("Complete products");
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(
            @PathVariable Long productId) throws ProductException {
        Product product = productService.findProductById(productId);
        return new ResponseEntity<Product>(product, HttpStatus.ACCEPTED);
    }
    @GetMapping("/bestseller")
    public ResponseEntity<Product> findProductSeller(
            @PathVariable Long productId) throws ProductException {
        Product product = productService.findProductById(productId);
        return new ResponseEntity<Product>(product, HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/get-top-new-products")
    public ResponseEntity<List<TopProductsDto>> getTopNewProduct() {
        List<TopProductsDto> topNewProducts = productService.getTopNewProducts();
        return ResponseEntity.status(HttpStatus.OK).body(topNewProducts);
    }

    @GetMapping("/get-top-selling-products")
    public ResponseEntity<List<TopProductsDto>> getTopSellingProducts() {
        List<TopProductsDto> topSellingProducts = productService.getTopSellingProducts();
        return ResponseEntity.status(HttpStatus.OK).body(topSellingProducts);
    }

    @GetMapping("/get-top-rating-products")
    public ResponseEntity<List<TopProductsDto>> getTopRatingProducts() {
        List<TopProductsDto> topRatingProducts = productService.getTopRatingProducts();
        return ResponseEntity.status(HttpStatus.OK).body(topRatingProducts);
    }

}
