package com.shop.shoes.project.data.source.remote

import com.shop.shoes.project.data.model.ResponseProduct

interface RemoteDataSource {
    suspend fun getAllProducts(): ResponseProduct
}
