package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class BodyOrder(
    @SerializedName("firstName")
    var firstName: String,
    @SerializedName("lastName")
    var lastName: String,
    @SerializedName("mobile")
    var mobile: String,
    @SerializedName("streetAddress")
    var streetAddress: String,
    @SerializedName("city")
    var city: String,
    @SerializedName("state")
    var state: String,
    @SerializedName("zipCode")
    var zipCode: String = "11111",
)

data class ResponseOrder(
    @SerializedName("id")
    var id: Int,
    @SerializedName("cartItems")
    var cartItems: List<Cart> = emptyList(),
    @SerializedName("totalDiscountedPrice")
    var totalDiscountedPrice: Int = 0
)