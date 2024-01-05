package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class ResponseCart(
    @SerializedName("cartItems")
    var cartItems: List<Cart> = emptyList(),
    @SerializedName("totalDiscountedPrice")
    var totalDiscountedPrice: Int = 0
)

data class Cart(
    @SerializedName("id")
    var id: Int? = null,
    @SerializedName("product")
    var product: Product? = null,
    @SerializedName("size")
    var size: String = "",
    @SerializedName("quantity")
    var quantity: Int = 0,
    @SerializedName("price")
    var price: Int = 0,
    @SerializedName("discountedPrice")
    var discountedPrice: Int = 0,
)

data class BodyCart(
    @SerializedName("productId")
    var productId: Int,
    @SerializedName("quantity")
    var quantity: Int,
    @SerializedName("size")
    var size: String = "",
    @SerializedName("color")
    var color: String = "",
)

data class ResponseCartAdd(
    @SerializedName("status")
    var status: Boolean,
)