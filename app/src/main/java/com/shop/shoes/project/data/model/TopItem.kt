package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class TopItem(
    @SerializedName("productId")
    var productId: Int,
    @SerializedName("productDiscountedPrice")
    var productDiscountedPrice: Int,
    @SerializedName("productPrice")
    var productPrice: Int,
    @SerializedName("productDiscountPercent")
    var productDiscountPercent: Int,
    @SerializedName("productName")
    var productName: String,
    @SerializedName("brandName")
    var brandName: String,
    @SerializedName("productImageUrl")
    var productImageUrl: String
)