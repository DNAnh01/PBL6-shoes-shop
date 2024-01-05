package com.dnanh01.backend.response;

import java.math.BigDecimal;

public class BestSellingProductResponse {
    /**
     * 1,product_id,pbl6_shoes_shop,order_item,BIGINT,binary,20,1,0
     * 2,title,pbl6_shoes_shop,product,VARCHAR,utf8mb4,255,16,0
     * 3,image_url,pbl6_shoes_shop,product,VARCHAR,utf8mb4,255,110,0
     * 4,discounted_price,pbl6_shoes_shop,product,INT,binary,11,6,0
     * 5,appearance_count,,,DECIMAL,binary,33,2,0
     * 
     * 
     */
    private Long productId;
    private String title;
    private String imageUrl;
    private Integer discountedPrice;
    private BigDecimal appearanceCount;

    public BestSellingProductResponse() {
    }

    public BestSellingProductResponse(Long productId, String title, String imageUrl, Integer discountedPrice,
            BigDecimal appearanceCount) {
        this.productId = productId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.discountedPrice = discountedPrice;
        this.appearanceCount = appearanceCount;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(Integer discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public BigDecimal getAppearanceCount() {
        return appearanceCount;
    }

    public void setAppearanceCount(BigDecimal appearanceCount) {
        this.appearanceCount = appearanceCount;
    }

}
