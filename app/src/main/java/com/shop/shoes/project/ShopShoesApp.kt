package com.shop.shoes.project

import android.app.Activity
import android.app.Application
import android.os.Bundle
import androidx.appcompat.app.AppCompatDelegate
import androidx.lifecycle.LifecycleObserver
import androidx.lifecycle.ProcessLifecycleOwner
import androidx.multidex.MultiDex
import androidx.multidex.MultiDexApplication
import com.chibatching.kotpref.Kotpref
import com.shop.shoes.project.di.appModule
import com.shop.shoes.project.ui.main.ShareViewModel
import com.shop.shoes.project.utils.eventbus.EventBusLifeCycle
import org.koin.android.ext.android.inject
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

class ShopShoesApp : MultiDexApplication(),
    Application.ActivityLifecycleCallbacks,
    LifecycleObserver {

    companion object {
        lateinit var instance: ShopShoesApp
    }

    val shareViewModel by inject<ShareViewModel>()

    private var currentActivity: Activity? = null
    override fun onCreate() {
        super.onCreate()
        MultiDex.install(this)
        setupKoin()
        Kotpref.init(this)
        instance = this
        EventBusLifeCycle.init(this)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
        registerActivityLifecycleCallbacks(this)
        ProcessLifecycleOwner.get().lifecycle.addObserver(this)
    }

    private fun setupKoin() {
        startKoin {
            androidContext(this@ShopShoesApp)
            modules(
                appModule
            )
        }
    }

    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
        currentActivity = activity
    }

    override fun onActivityStarted(activity: Activity) {
        currentActivity = activity
    }

    override fun onActivityResumed(activity: Activity) {
        currentActivity = activity
    }

    override fun onActivityPaused(activity: Activity) {
    }

    override fun onActivityStopped(activity: Activity) {
    }

    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {
    }

    override fun onActivityDestroyed(activity: Activity) {
    }
}
