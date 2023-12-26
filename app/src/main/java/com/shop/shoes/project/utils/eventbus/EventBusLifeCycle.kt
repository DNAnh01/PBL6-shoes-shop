package com.shop.shoes.project.utils.eventbus

import android.app.Application

object EventBusLifeCycle {

    private lateinit var app: Application

    fun init(app: Application) {
        EventBusLifeCycle.app = app
    }

    fun getApp(): Application = app
}