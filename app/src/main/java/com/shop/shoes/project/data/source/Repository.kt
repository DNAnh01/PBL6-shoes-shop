package com.shop.shoes.project.data.source

import com.shop.shoes.project.data.model.ResponseProduct
import com.shop.shoes.project.data.source.local.LocalDataSourceImpl
import com.shop.shoes.project.data.source.local.LocalDataSource
import com.shop.shoes.project.data.source.remote.RemoteDataSource
import com.shop.shoes.project.data.source.remote.RemoteDataSourceImpl

class Repository(
    private val localDataSource: LocalDataSourceImpl,
    private val remoteDataSource: RemoteDataSourceImpl
) : RemoteDataSource, LocalDataSource {

    override suspend fun getAllProducts(): ResponseProduct {
        return remoteDataSource.getAllProducts()
    }
}