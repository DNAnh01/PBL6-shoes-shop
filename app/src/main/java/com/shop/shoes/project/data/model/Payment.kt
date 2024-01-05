package com.shop.shoes.project.data.model

import com.google.gson.annotations.SerializedName

data class BodyPayment(
    @SerializedName("currentOrderId")
    var id: Int,
)

data class ResponsePayment(
    @SerializedName("vnpayUrl")
    var vnpayUrl: String
)