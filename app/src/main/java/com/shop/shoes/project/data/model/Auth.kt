package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class Auth(
    @SerializedName("email")
    var username: String,
    @SerializedName("password")
    var password: String,
)

data class AuthResponse(
    val jwt: String = "",
    val message: String? = null
)

data class BodyChangePass(
    @SerializedName("oldPassword")
    var oldPass: String,
    @SerializedName("newPassword")
    var newPassword: String,
)