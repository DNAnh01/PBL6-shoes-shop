package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("firstName")
    var firstName: String = "",
    @SerializedName("lastName")
    var lastName: String = "",
    @SerializedName("email")
    var email: String = "",
    @SerializedName("password")
    var password: String = "",
    @SerializedName("mobile")
    var mobile: String = "",
    @SerializedName("role")
    var role: String = ""
)

data class ResponseProfile(
    @SerializedName("body")
    var user: User
)