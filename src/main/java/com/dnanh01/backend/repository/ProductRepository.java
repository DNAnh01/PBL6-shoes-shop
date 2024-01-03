package com.dnanh01.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dnanh01.backend.dto.TopProductsDto;
import com.dnanh01.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
        @Query("SELECT p FROM Product p " +
                        "WHERE (p.brand.name = :brand OR :brand = '') " +
                        "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice)) "
                        +
                        "AND (:minDiscount IS NULL OR p.discountPersent >= :minDiscount) " +
                        "ORDER BY " +
                        "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
                        "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
        public List<Product> filterProducts(
                        @Param("brand") String brand,
                        @Param("minPrice") Integer minPrice,
                        @Param("maxPrice") Integer maxPrice,
                        @Param("minDiscount") Integer minDiscount,
                        @Param("sort") String sort);

        
        // --------------------GET TOP PRODUCTS--------------------

        // top 3 new products
        @Query(nativeQuery = true, value = "" +
                        "SELECT p.`id` AS " + TopProductsDto.PRODUCT_ID + ",  " +
                        "       p.`color` AS " + TopProductsDto.PRODUCT_COLOR + ",  " +
                        "       p.`create_at` AS " + TopProductsDto.PRODUCT_CREATE_AT + ", " +
                        "       p.`description` AS " + TopProductsDto.PRODUCT_DESCRIPTION + ", " +
                        "       p.`discount_persent` AS " + TopProductsDto.PRODUCT_DISCOUNT_PERCENT
                        + ", " +
                        "       p.`discounted_price` AS " + TopProductsDto.PRODUCT_DISCOUNTED_PRICE
                        + ",  " +
                        "       p.`image_url` AS " + TopProductsDto.PRODUCT_IMAGE_URL + ", " +
                        "       p.`price` AS " + TopProductsDto.PRODUCT_PRICE + ", " +
                        "       p.`quantity` AS " + TopProductsDto.PRODUCT_QUANTITY + ", " +
                        "       p.`title` AS " + TopProductsDto.PRODUCT_NAME + ",  " +
                        "       b.`id` AS " + TopProductsDto.BRAND_ID + ", " +
                        "       b.`image_url` AS " + TopProductsDto.BRAND_IMAGE_URL + ", " +
                        "       b.`name` AS " + TopProductsDto.BRAND_NAME + " " +
                        "FROM `product` p " +
                        "       JOIN `brand` b " +
                        "       ON p.`brand` = b.`id` " +
                        "       WHERE p.`quantity` > 0 " +
                        "       GROUP BY p.`id` " +
                        "       ORDER BY p.`create_at` DESC " +
                        "       LIMIT 3;")
        public List<Object[]> getTopNewProducts();

        // top 3 top selling products
        @Query(nativeQuery = true, value = "" +
                        "WITH `order_details_information` AS ( " +
                        "       SELECT  " +
                        "               oi.`quantity` AS oi_quantity, " +
                        "               oi.`product_id` AS oi_product_id " +
                        "       FROM `orders` o " +
                        "       JOIN `order_item` oi " +
                        "       ON o.`id` = oi.`order_id` " +
                        "       WHERE o.`order_status` = 'CONFIRMED' " +
                        "       GROUP BY oi.`id` " +
                        "), " +
                        "`top_3_best_selling_products` AS ( " +
                        "       SELECT  odi.`oi_product_id` AS product_id, " +
                        "               SUM(odi.`oi_quantity`) AS total_quantity " +
                        "       FROM `order_details_information` odi " +
                        "       GROUP BY odi.`oi_product_id` " +
                        "       ORDER BY total_quantity DESC " +
                        "       LIMIT 0, 3 " +
                        ") " +
                        "SELECT p.`id` AS " + TopProductsDto.PRODUCT_ID + ",  " +
                        "       p.`color` AS " + TopProductsDto.PRODUCT_COLOR + ",  " +
                        "       p.`create_at` AS " + TopProductsDto.PRODUCT_CREATE_AT + ", " +
                        "       p.`description` AS " + TopProductsDto.PRODUCT_DESCRIPTION + ", " +
                        "       p.`discount_persent` AS " + TopProductsDto.PRODUCT_DISCOUNT_PERCENT + ", " +
                        "       p.`discounted_price` AS " + TopProductsDto.PRODUCT_DISCOUNTED_PRICE + ",  " +
                        "       p.`image_url` AS " + TopProductsDto.PRODUCT_IMAGE_URL + ", " +
                        "       p.`price` AS " + TopProductsDto.PRODUCT_PRICE + ", " +
                        "       p.`quantity` AS " + TopProductsDto.PRODUCT_QUANTITY + ", " +
                        "       p.`title` AS " + TopProductsDto.PRODUCT_NAME + ", " +
                        "       b.`id` AS " + TopProductsDto.BRAND_ID + ", " +
                        "       b.`image_url` AS " + TopProductsDto.BRAND_IMAGE_URL + ", " +
                        "       b.`name` AS " + TopProductsDto.BRAND_NAME + ", " +
                        "       t3bsp.`total_quantity` AS " + TopProductsDto.TOTAL_PRODUCTS_SOLD + " " +
                        "FROM   `product` p " +
                        "JOIN   `brand` b " +
                        "ON     p.`brand` = b.`id` " +
                        "JOIN   `top_3_best_selling_products` t3bsp ON p.`id` = t3bsp.`product_id` " +
                        "WHERE  p.`id` in ( " +
                        "       SELECT t3bsp.`product_id` FROM `top_3_best_selling_products` AS t3bsp " +
                        ") " +
                        "GROUP BY p.`id`;")
        public List<Object[]> getTopSellingProducts();

        // top 3 rating products

        @Query(nativeQuery = true, value = "" +
                        "WITH `detailed_product_star_rating` AS ( " +
                        "       SELECT " +
                        "               r.`product_id` AS product_id, " +
                        "               avg(r.`rating`) AS r_avg_rating  " +
                        "       FROM `product` p " +
                        "       JOIN `review` r " +
                        "       ON p.`id` = r.`product_id` " +
                        "       WHERE p.`quantity` > 0 " +
                        "       GROUP BY r.`product_id` " +
                        "), " +
                        "`top_3_best_rating_products` AS ( " +
                        "       SELECT " +
                        "               dpsr.product_id, " +
                        "               dpsr.r_avg_rating  " +
                        "       FROM `detailed_product_star_rating` dpsr " +
                        "       ORDER BY dpsr.r_avg_rating DESC " +
                        "       LIMIT 0,3 " +
                        ") " +
                        "SELECT p.`id` AS " + TopProductsDto.PRODUCT_ID + ",  " +
                        "       p.`color` AS " + TopProductsDto.PRODUCT_COLOR + ",  " +
                        "       p.`create_at` AS " + TopProductsDto.PRODUCT_CREATE_AT + ", " +
                        "       p.`description` AS " + TopProductsDto.PRODUCT_DESCRIPTION + ", " +
                        "       p.`discount_persent` AS " + TopProductsDto.PRODUCT_DISCOUNT_PERCENT + ", " +
                        "       p.`discounted_price` AS " + TopProductsDto.PRODUCT_DISCOUNTED_PRICE + ",  " +
                        "       p.`image_url` AS " + TopProductsDto.PRODUCT_IMAGE_URL + ", " +
                        "       p.`price` AS " + TopProductsDto.PRODUCT_PRICE + ", " +
                        "       p.`quantity` AS " + TopProductsDto.PRODUCT_QUANTITY + ", " +
                        "       p.`title` AS " + TopProductsDto.PRODUCT_NAME + ", " +
                        "       b.`id` AS " + TopProductsDto.BRAND_ID + ", " +
                        "       b.`image_url` AS " + TopProductsDto.BRAND_IMAGE_URL + ", " +
                        "       b.`name` AS " + TopProductsDto.BRAND_NAME + ", " +
                        "       t3brp.r_avg_rating AS " + TopProductsDto.AVG_RATING_PRODUCT + " " +
                        "FROM `product` p " +
                        "JOIN `brand` b " +
                        "ON p.`brand` = b.`id` " +
                        "JOIN `top_3_best_rating_products` t3brp ON p.`id` = t3brp.`product_id` " +
                        "WHERE p.`id` in ( " +
                        "       SELECT t3brp.`product_id` FROM `top_3_best_rating_products` AS t3brp " +
                        ") " +
                        "GROUP BY p.`id`;")
        public List<Object[]> getTopRatingProducts();
}
