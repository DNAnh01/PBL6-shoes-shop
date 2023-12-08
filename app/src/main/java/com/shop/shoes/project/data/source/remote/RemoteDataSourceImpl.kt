package com.shop.shoes.project.data.source.remote

import com.shop.shoes.project.data.model.Auth
import com.shop.shoes.project.data.model.AuthResponse
import com.shop.shoes.project.data.model.BodyCart
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.ResponseCart
import com.shop.shoes.project.data.model.ResponseCartAdd
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


}