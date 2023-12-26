package com.shop.shoes.project.data.network

import com.shop.shoes.project.data.model.ResponseProduct
import com.shop.shoes.project.utils.Constants
import retrofit2.http.GET

interface ApiService {
    @GET(Constants.GET_ALL_PRODUCTS)
    suspend fun getAllProducts(): ResponseProduct
}
