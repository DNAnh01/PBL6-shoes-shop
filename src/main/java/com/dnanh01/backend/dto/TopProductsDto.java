package com.dnanh01.backend.dto;

import java.math.BigDecimal;
import java.util.Date;

public class TopProductsDto {
    public static final String PRODUCT_ID = "productId";
    public static final String PRODUCT_COLOR = "productColor";
    public static final String PRODUCT_CREATE_AT = "productCreateAt";
    public static final String PRODUCT_DESCRIPTION = "productDescription";
    public static final String PRODUCT_DISCOUNT_PERCENT = "productDiscountPercent";
    public static final String PRODUCT_DISCOUNTED_PRICE = "productDiscountedPrice";
    public static final String PRODUCT_IMAGE_URL = "productImageUrl";
    public static final String PRODUCT_PRICE = "productPrice";
    public static final String PRODUCT_QUANTITY = "productQuantity";
    public static final String PRODUCT_NAME = "productName";

    public static final String BRAND_ID = "brandId";
    public static final String BRAND_IMAGE_URL = "brandImageUrl";
    public static final String BRAND_NAME = "brandName";

    public static final String TOTAL_PRODUCTS_SOLD = "totalProductsSold";
    public static final String AVG_RATING_PRODUCT = "avgRatingProduct";

    private long productId;
    private String productColor;
    private Date productCreateAt;
    private String productDescription;
    private Integer productDiscountPercent;
    private Integer productDiscountedPrice;
    private String productImageUrl;
    private Integer productPrice;
    private Integer productQuantity;
    private String productName;

    private long brandId;
    private String brandImageUrl;
    private String brandName;

    private BigDecimal totalProductsSold;
    private BigDecimal avgRatingProduct;

    private TopProductsDto() {
    }

    private TopProductsDto(Builder builder) {
        this.productId = builder.productId;
        this.productColor = builder.productColor;
        this.productCreateAt = builder.productCreateAt;
        this.productDescription = builder.productDescription;
        this.productDiscountPercent = builder.productDiscountPercent;
        this.productDiscountedPrice = builder.productDiscountedPrice;
        this.productImageUrl = builder.productImageUrl;
        this.productPrice = builder.productPrice;
        this.productQuantity = builder.productQuantity;
        this.productName = builder.productName;

        this.brandId = builder.brandId;
        this.brandImageUrl = builder.brandImageUrl;
        this.brandName = builder.brandName;

        this.totalProductsSold = builder.totalProductsSold;
        this.avgRatingProduct = builder.avgRatingProduct;

    }

    public static Builder builder() {
        return new Builder();
    }

    public long getProductId() {
        return productId;
    }

    public String getProductColor() {
        return productColor;
    }

    public Date getProductCreateAt() {
        return productCreateAt;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public Integer getProductDiscountPercent() {
        return productDiscountPercent;
    }

    public Integer getProductDiscountedPrice() {
        return productDiscountedPrice;
    }

    public String getProductImageUrl() {
        return productImageUrl;
    }

    public Integer getProductPrice() {
        return productPrice;
    }

    public Integer getProductQuantity() {
        return productQuantity;
    }

    public String getProductName() {
        return productName;
    }

    public long getBrandId() {
        return brandId;
    }

    public String getBrandImageUrl() {
        return brandImageUrl;
    }

    public String getBrandName() {
        return brandName;
    }

    public BigDecimal getTotalProductsSold() {
        return totalProductsSold;
    }

    public BigDecimal getAvgRatingProduct() {
        return avgRatingProduct;
    }

    @Override
    public String toString() {
        return "TopProductsDto [productId=" + productId + ", productColor=" + productColor + ", productCreateAt="
                + productCreateAt + ", productDescription=" + productDescription + ", productDiscountPercent="
                + productDiscountPercent + ", productDiscountedPrice=" + productDiscountedPrice + ", productImageUrl="
                + productImageUrl + ", productPrice=" + productPrice + ", productQuantity=" + productQuantity
                + ", productName=" + productName + ", brandId=" + brandId + ", brandImageUrl=" + brandImageUrl
                + ", brandName=" + brandName + ", totalProductsSold=" + totalProductsSold + ", avgRatingProduct="
                + avgRatingProduct + "]";
    }

    public static class Builder {
        private long productId;
        private String productColor;
        private Date productCreateAt;
        private String productDescription;
        private Integer productDiscountPercent;
        private Integer productDiscountedPrice;
        private String productImageUrl;
        private Integer productPrice;
        private Integer productQuantity;
        private String productName;

        private long brandId;
        private String brandImageUrl;
        private String brandName;

        private BigDecimal totalProductsSold;
        private BigDecimal avgRatingProduct;

        private Builder() {
        }

        public Builder productId(long productId) {
            this.productId = productId;
            return this;
        }

        public Builder productColor(String productColor) {
            this.productColor = productColor;
            return this;
        }

        public Builder productCreateAt(Date productCreateAt) {
            this.productCreateAt = productCreateAt;
            return this;
        }

        public Builder productDescription(String productDescription) {
            this.productDescription = productDescription;
            return this;
        }

        public Builder productDiscountPercent(Integer productDiscountPercent) {
            this.productDiscountPercent = productDiscountPercent;
            return this;
        }

        public Builder productDiscountedPrice(Integer productDiscountedPrice) {
            this.productDiscountedPrice = productDiscountedPrice;
            return this;
        }

        public Builder productImageUrl(String productImageUrl) {
            this.productImageUrl = productImageUrl;
            return this;
        }

        public Builder productPrice(Integer productPrice) {
            this.productPrice = productPrice;
            return this;
        }

        public Builder productQuantity(Integer productQuantity) {
            this.productQuantity = productQuantity;
            return this;
        }

        public Builder productName(String productName) {
            this.productName = productName;
            return this;
        }

        public Builder brandId(long brandId) {
            this.brandId = brandId;
            return this;
        }

        public Builder brandImageUrl(String brandImageUrl) {
            this.brandImageUrl = brandImageUrl;
            return this;
        }

        public Builder brandName(String brandName) {
            this.brandName = brandName;
            return this;
        }

        public Builder totalProductsSold(BigDecimal totalProductsSold) {
            this.totalProductsSold = totalProductsSold;
            return this;
        }

        public Builder avgRatingProduct(BigDecimal avgRatingProduct) {
            this.avgRatingProduct = avgRatingProduct;
            return this;
        }

        public TopProductsDto build() {
            return new TopProductsDto(this);
        }
    }
}
