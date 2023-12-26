package com.shop.shoes.project.ui.splash

import android.content.Intent
import android.view.LayoutInflater
import androidx.lifecycle.lifecycleScope
import com.shop.shoes.project.databinding.ActivitySplashBinding
import com.shop.shoes.project.ui.main.MainActivity
import com.shop.shoes.project.ui.base.BaseActivity
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class SplashActivity : BaseActivity<ActivitySplashBinding>() {
    override fun viewBinding(inflate: LayoutInflater): ActivitySplashBinding = ActivitySplashBinding.inflate(inflate)

    override fun initView() {
        lifecycleScope.launch {
            delay(4000)
            goToMain()
        }
    }

    override fun initData() {
    }

    override fun initListener() {
    }

    private fun goToMain(){
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}