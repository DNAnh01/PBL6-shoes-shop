package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class ResponseProduct(
    @SerializedName("content")
    var content: List<Product> = emptyList()
)

data class Product(
    @SerializedName("id")
    var id: Int,
    @SerializedName("title")
    var title: String = "",
    @SerializedName("description")
    var description: String = "",
    @SerializedName("price")
    var price: Int = 0,
    @SerializedName("discountedPrice")
    var discountedPrice: Int = 0,
    @SerializedName("discountPersent")
    var discountPersent: Int = 0,
    @SerializedName("quantity")
    var quantity: Int = 0,
    @SerializedName("color")
    var color: String = "#FFFFFF",
    @SerializedName("sizes")
    var sizes: List<Size> = emptyList(),
    @SerializedName("imageUrl")
    var imageUrl: String = "",
    @SerializedName("reviews")
    var reviews: List<Review> = emptyList(),
    @SerializedName("brand")
    var brand: Brand? = null
)

data class Size(
    @SerializedName("name")
    var name: String = "",
    @SerializedName("quantity")
    var quantity: Int = 0,
)

data class SizeShow(var size: String, var quantity: Int = 0, var isSelected: Boolean = false)

data class Review(
    @SerializedName("id")
    var id: Int = 0,
    @SerializedName("review")
    var quantity: String = "",
    @SerializedName("rating")
    var rating: Int = 0,
    @SerializedName("user")
    var user: User,
    @SerializedName("createAt")
    var createAt: String = ""
)

data class Brand(
    @SerializedName("id")
    var id: Int = 0,
    @SerializedName("name")
    var name: String = "",
    @SerializedName("imageUrl")
    var imageUrl: String = "",
)