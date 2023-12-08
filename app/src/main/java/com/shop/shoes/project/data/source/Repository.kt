package com.shop.shoes.project.data.source

import com.shop.shoes.project.data.model.Auth
import com.shop.shoes.project.data.model.AuthResponse
import com.shop.shoes.project.data.model.BodyCart
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.ResponseCart
import com.shop.shoes.project.data.model.ResponseCartAdd
import com.shop.shoes.project.data.model.ResponseProduct
import com.shop.shoes.project.data.model.User
import com.shop.shoes.project.data.source.local.LocalDataSourceImpl
import com.shop.shoes.project.data.source.local.LocalDataSource
import com.shop.shoes.project.data.source.remote.RemoteDataSource
import com.shop.shoes.project.data.source.remote.RemoteDataSourceImpl

class Repository(
    private val localDataSource: LocalDataSourceImpl,
    private val remoteDataSource: RemoteDataSourceImpl
) : RemoteDataSource, LocalDataSource {
    override suspend fun signIn(request: Auth): AuthResponse {
        return remoteDataSource.signIn(request)
    }

    override suspend fun getInfo(): User {
        return remoteDataSource.getInfo()
    }

    override suspend fun signUp(request: User): AuthResponse {
        return remoteDataSource.signUp(request)
    }

    override suspend fun getAllProducts(): ResponseProduct {
        return remoteDataSource.getAllProducts()
    }

    override suspend fun getAllCarts(): ResponseCart {
        return remoteDataSource.getAllCarts()
    }

    override suspend fun addNewCart(body: BodyCart): ResponseCartAdd {
        return remoteDataSource.addNewCart(body)
    }

    override suspend fun updateCartItem(cartId: Int, body: BodyCart): Cart {
        return remoteDataSource.updateCartItem(cartId, body)
    }

}