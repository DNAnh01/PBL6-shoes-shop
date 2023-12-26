package com.shop.shoes.project.data.source.remote

import com.shop.shoes.project.data.model.ResponseProduct
import com.shop.shoes.project.data.network.ApiService

class RemoteDataSourceImpl(
    private val apiService: ApiService
) : RemoteDataSource {
    override suspend fun getAllProducts(): ResponseProduct {
        return apiService.getAllProducts()
    }
}