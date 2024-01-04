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
import retrofit2.http.Body
import retrofit2.http.Path

interface RemoteDataSource {
    suspend fun signIn(@Body request: Auth): AuthResponse
    suspend fun getInfo(): User
    suspend fun signUp(@Body request: User): AuthResponse
    suspend fun getAllProducts(): ResponseProduct
    suspend fun getAllCarts(): ResponseCart
    suspend fun addNewCart(@Body body: BodyCart): ResponseCartAdd
    suspend fun updateCartItem(@Path("cartId") cartId: Int, @Body body: BodyCart): Cart
    suspend fun deleteNewCart(@Path("cartId") cartId: Int): ResponseCartAdd
    suspend fun changePass(@Body body: BodyChangePass): String
    suspend fun createOrder(@Body body: BodyOrder): ResponseOrder
    suspend fun payment(@Body body: BodyPayment): ResponsePayment
    suspend fun changeInfo(@Body body: BodyInfo): User
}
