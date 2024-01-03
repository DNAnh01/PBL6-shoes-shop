package com.dnanh01.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dnanh01.backend.dto.TopProductsDto;
import com.dnanh01.backend.exception.ProductException;
import com.dnanh01.backend.model.Brand;
import com.dnanh01.backend.model.Product;
import com.dnanh01.backend.repository.BrandRepository;
import com.dnanh01.backend.repository.ProductRepository;
import com.dnanh01.backend.request.CreateProductRequest;

@Service
public class ProductServiceImplementation implements ProductService {

    private ProductRepository productRepository;
    // private UserService userService;
    private BrandRepository brandRepository;

    public ProductServiceImplementation(
            ProductRepository productRepository,
            UserService userService,
            BrandRepository brandRepository) {
        this.productRepository = productRepository;
        // this.userService = userService;
        this.brandRepository = brandRepository;

    }

    @Override
    public Product createProduct(CreateProductRequest req) {

        Brand foundBrand = brandRepository.findSingleBrandByName(req.getBrand().getName());

        if (foundBrand == null) {
            Brand saveBrand = new Brand();
            saveBrand.setName(req.getBrand().getName());
            saveBrand.setImageUrl(req.getBrand().getImageUrl());
            foundBrand = brandRepository.save(saveBrand);

        }

        Product product = new Product();
        product.setBrand(foundBrand);
        product.setDiscountPersent(req.getDiscountPersent());
        product.setColor(req.getColor());
        product.setCreateAt(LocalDateTime.now());
        product.setDescription(req.getDescription());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setImageUrl(req.getImageUrl());
        product.setTitle(req.getTitle());
        product.setWarehousePrice(req.getWarehousePrice());
        product.setPrice(req.getPrice());
        product.setSizes(req.getSize());
        product.setQuantity(req.getQuantity());

        Product savedProduct = productRepository.save(product);

        return savedProduct;
    }

    @Override
    public String deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        product.getSizes().clear();
        productRepository.delete(product);
        return "Product deleted successfully !!!";
    }

    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product = findProductById(productId);

        if (product.getId().equals(productId)) {
            // update so luong san pham
            product.setDescription(req.getDescription());
            product.setPrice(req.getPrice());
            product.setDiscountedPrice(req.getDiscountedPrice());
            product.setDiscountPersent(req.getDiscountPersent());
            product.setWarehousePrice(req.getWarehousePrice());
            product.setQuantity(req.getQuantity());
        }
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long id) throws ProductException {
        Optional<Product> opt = productRepository.findById(id);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw new ProductException("Product not found with id - " + id);
    }

    @Override
    public List<Product> findProductByBrand(String brand) {

        return null;
    }

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> getAllProduct(String brand, List<String> colors, List<String> sizes, Integer minPrice,
            Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        List<Product> products = productRepository.filterProducts(brand, minPrice, maxPrice, minDiscount, sort);
        if (!colors.isEmpty()) {
            /**
             * Lọc các sản phẩm mà màu sắc của chúng khớp với bất kỳ màu sắc nào trong
             * danh sách colors. Điều này được thực hiện bằng cách sử dụng một luồng của các
             * màu sắc từ colors và sử dụng anyMatch() để kiểm tra xem màu sắc của sản phẩm
             * có khớp với bất kỳ màu sắc nào trong danh sách colors. Lưu ý rằng việc kiểm
             * tra màu sắc được thực hiện không phân biệt chữ hoa và chữ thường (sử dụng
             * equalsIgnoreCase()).
             */
            products = products.stream()
                    .filter(p -> colors.stream()
                            .anyMatch(c -> c.equalsIgnoreCase(p.getColor())))
                    .collect(Collectors.toList());
        }
        if (stock != null) {
            if (stock.equals("in_stock")) {
                products = products.stream().filter(p -> p.getQuantity() > 0).collect(Collectors.toList());
            } else if (stock.equals("out_of_stock")) {
                products = products.stream().filter(p -> p.getQuantity() < 1).collect(Collectors.toList());
            }
        }
        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());
        List<Product> pageContent = products.subList(startIndex, endIndex);
        Page<Product> filteredProducts = new PageImpl<>(pageContent, pageable, products.size());
        return filteredProducts;
    }

    @Override
    public List<TopProductsDto> getTopNewProducts() {

        List<Object[]> rawResults = productRepository.getTopNewProducts();
        List<TopProductsDto> results = new ArrayList<>();

        if (rawResults != null && !rawResults.isEmpty()) {
            for (Object[] row : rawResults) {
                TopProductsDto dto = TopProductsDto.builder()
                        .productId((Long) row[0])
                        .productColor((String) row[1])
                        .productCreateAt((Date) row[2])
                        .productDescription((String) row[3])
                        .productDiscountPercent((Integer) row[4])
                        .productDiscountedPrice((Integer) row[5])
                        .productImageUrl((String) row[6])
                        .productPrice((Integer) row[7])
                        .productQuantity((Integer) row[8])
                        .productName((String) row[9])
                        .brandId((Long) row[10])
                        .brandImageUrl((String) row[11])
                        .brandName((String) row[12])
                        .build();
                results.add(dto);
            }
        }
        return results;
    }

    @Override
    public List<TopProductsDto> getTopSellingProducts() {
        List<Object[]> rawResults = productRepository.getTopSellingProducts();
        List<TopProductsDto> results = new ArrayList<>();

        if (rawResults != null && !rawResults.isEmpty()) {
            for (Object[] row : rawResults) {
                TopProductsDto dto = TopProductsDto.builder()
                        .productId((Long) row[0])
                        .productColor((String) row[1])
                        .productCreateAt((Date) row[2])
                        .productDescription((String) row[3])
                        .productDiscountPercent((Integer) row[4])
                        .productDiscountedPrice((Integer) row[5])
                        .productImageUrl((String) row[6])
                        .productPrice((Integer) row[7])
                        .productQuantity((Integer) row[8])
                        .productName((String) row[9])
                        .brandId((Long) row[10])
                        .brandImageUrl((String) row[11])
                        .brandName((String) row[12])
                        .totalProductsSold((BigDecimal) row[13])
                        .build();
                results.add(dto);
            }
        }
        return results;
    }

    @Override
    public List<TopProductsDto> getTopRatingProducts() {
        List<Object[]> rawResults = productRepository.getTopRatingProducts();
        List<TopProductsDto> results = new ArrayList<>();

        if (rawResults != null && !rawResults.isEmpty()) {
            for (Object[] row : rawResults) {
                TopProductsDto dto = TopProductsDto.builder()
                        .productId((Long) row[0])
                        .productColor((String) row[1])
                        .productCreateAt((Date) row[2])
                        .productDescription((String) row[3])
                        .productDiscountPercent((Integer) row[4])
                        .productDiscountedPrice((Integer) row[5])
                        .productImageUrl((String) row[6])
                        .productPrice((Integer) row[7])
                        .productQuantity((Integer) row[8])
                        .productName((String) row[9])
                        .brandId((Long) row[10])
                        .brandImageUrl((String) row[11])
                        .brandName((String) row[12])
                        .avgRatingProduct((BigDecimal) row[13])
                        .build();
                results.add(dto);
            }
        }
        return results;
    }
}
