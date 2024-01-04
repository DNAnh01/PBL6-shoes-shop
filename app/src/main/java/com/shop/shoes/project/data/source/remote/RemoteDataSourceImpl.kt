package com.shop.shoes.project.data.source.remote

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
import com.shop.shoes.project.data.network.ApiService

class RemoteDataSourceImpl(
    private val apiService: ApiService
) : RemoteDataSource {
    override suspend fun signIn(request: Auth): AuthResponse {
        return apiService.signIn(request)
    }

    override suspend fun getInfo(): User {
        return apiService.getInfo()
    }

    override suspend fun signUp(request: User): AuthResponse {
        return apiService.signUp(request)
    }

    override suspend fun getAllProducts(): ResponseProduct {
        return apiService.getAllProducts()
    }

    override suspend fun getAllCarts(): ResponseCart {
        return apiService.getAllCarts()
    }

    override suspend fun addNewCart(body: BodyCart): ResponseCartAdd {
        return apiService.addNewCart(body)
    }

    override suspend fun updateCartItem(cartId: Int, body: BodyCart): Cart {
        return apiService.updateCartItem(cartId, body)
    }

    override suspend fun deleteNewCart(cartId: Int): ResponseCartAdd {
        return apiService.deleteNewCart(cartId)
    }

    override suspend fun changePass(body: BodyChangePass): String {
        return apiService.changePass(body)
    }

    override suspend fun createOrder(body: BodyOrder): ResponseOrder {
        return apiService.createOrder(body)
    }

    override suspend fun payment(body: BodyPayment): ResponsePayment {
        return apiService.payment(body)
    }

    override suspend fun changeInfo(body: BodyInfo): User {
        return apiService.changeInfo(body)
    }


}