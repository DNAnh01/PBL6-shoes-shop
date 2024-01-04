package com.shop.shoes.project.data.network

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
import com.shop.shoes.project.utils.Constants
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface ApiService {
    @POST(Constants.SIGN_IN)
    suspend fun signIn(@Body request: Auth): AuthResponse

    @POST(Constants.SIGN_UP)
    suspend fun signUp(@Body request: User): AuthResponse

    @GET(Constants.GET_INFO)
    suspend fun getInfo(): User

    @GET(Constants.GET_ALL_PRODUCTS)
    suspend fun getAllProducts(): ResponseProduct

    @GET(Constants.GET_ALL_CART)
    suspend fun getAllCarts(): ResponseCart

    @PUT(Constants.ADD_CART)
    suspend fun addNewCart(@Body body: BodyCart): ResponseCartAdd

    @PUT("${Constants.UPDATE_CART}{cartId}")
    suspend fun updateCartItem(@Path("cartId") cartId: Int, @Body body: BodyCart): Cart

    @DELETE("${Constants.DELETE_CART}{cartId}")
    suspend fun deleteNewCart(@Path("cartId") cartId: Int): ResponseCartAdd

    @POST(Constants.CHANGE_PASS)
    suspend fun changePass(@Body body: BodyChangePass): String

    @POST(Constants.CREATE_ORDER)
    suspend fun createOrder(@Body body: BodyOrder): ResponseOrder

    @POST(Constants.PAYMENT)
    suspend fun payment(@Body body: BodyPayment): ResponsePayment

    @PUT(Constants.CHANGE_INFO)
    suspend fun changeInfo(@Body body: BodyInfo): User
}
