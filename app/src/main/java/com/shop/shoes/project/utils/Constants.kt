package com.shop.shoes.project.utils

object Constants {
    const val MAIN_NUMBER_FRAGMENT: Int = 3
    const val MAIN_HOME: Int = 0
    const val MAIN_CART: Int = 1
    const val MAIN_ACCOUNT: Int = 2
    const val SERVER = "https://pbl6-shoes-shop-production-f0c7.up.railway.app"
    const val DATABASE_NAME = "saved.db"
    const val TIME_OUT = 60_000L
    const val SIGN_IN = "/auth/signin"
    const val GET_INFO = "/api/users/profile"
    const val GET_ALL_PRODUCTS =
        "/api/products/?color=&size=&minPrice=0&maxPrice=10000000&minDiscount=0&brand=&stock=null&sort=price_low&pageNumber=0&pageSize=20"
    const val GET_ALL_CART = "/api/cart/"
    const val REQUEST_CODE_LOGIN = 123
    const val REQUEST_CODE_PAY = 124
    const val REQUEST_CODE_PURCHASE = 125
    const val ROLE = "USER"
    const val ADD_CART = "/api/cart/add"
    const val UPDATE_CART = "/api/cart_items/"
    const val DELETE_CART = "/api/cart_items/"
    const val SIGN_UP = "/auth/signup"
    const val CHANGE_PASS = "/api/users/change-password"
    const val EXTRA_PRODUCT = "productExtra"
    const val CREATE_ORDER = "/api/orders/"
    const val PAYMENT = "/api/payment/mobileVnpay"
    const val CHANGE_INFO = "/api/users/update"
    const val KEY_PAY = "pay_act"
}