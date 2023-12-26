package com.shop.shoes.project.di

import com.shop.shoes.project.utils.Pref
import okhttp3.Interceptor
import okhttp3.Response

class HttpAuthorization : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val builder = chain.request().newBuilder()
        if(Pref.accessToken != "") builder.header("Authorization", "Bearer ${Pref.accessToken}")
        return chain.proceed(builder.build())
    }
}


