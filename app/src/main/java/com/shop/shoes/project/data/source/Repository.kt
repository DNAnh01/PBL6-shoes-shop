package com.shop.shoes.project.data.source

import com.shop.shoes.project.data.model.Auth
import com.shop.shoes.project.data.model.AuthResponse
import com.shop.shoes.project.data.model.BodyCart
import com.shop.shoes.project.data.model.BodyChangePass
import com.shop.shoes.project.data.model.BodyInfo
import com.shop.shoes.project.data.model.BodyOrder
import com.shop.shoes.project.data.model.BodyPayment
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.ResponseCart
import com.shop.shoes.project.data.model.ResponseCartAdd
import com.shop.shoes.project.data.model.ResponseOrder
import com.shop.shoes.project.data.model.ResponsePayment
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

    override suspend fun deleteNewCart(cartId: Int): ResponseCartAdd {
        return remoteDataSource.deleteNewCart(cartId)
    }

    override suspend fun changePass(body: BodyChangePass): String {
        return remoteDataSource.changePass(body)
    }

    override suspend fun createOrder(body: BodyOrder): ResponseOrder {
        return remoteDataSource.createOrder(body)
    }

    override suspend fun payment(body: BodyPayment): ResponsePayment {
        return remoteDataSource.payment(body)
    }

    override suspend fun changeInfo(body: BodyInfo): User {
        return remoteDataSource.changeInfo(body)
    }

}