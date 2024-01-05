package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class History(
    @SerializedName("user")
    var user: User,
    @SerializedName("orderItems")
    var orderItems: List<Cart>,
    @SerializedName("shippingAddress")
    var ship: Ship,
    @SerializedName("orderStatus")
    var status: String,
    @SerializedName("totalDiscountedPrice")
    var price: Int,
)

data class Ship(
    @SerializedName("user")
    var user: User,
    @SerializedName("streetAddress")
    var streetAddress: String,
    @SerializedName("city")
    var city: String,
    @SerializedName("mobile")
    var mobile: String,
    @SerializedName("creationTime")
    var creationTime: String,
    @SerializedName("orderStatus")
    var status: String,
    @SerializedName("totalDiscountedPrice")
    var price: Int,
)