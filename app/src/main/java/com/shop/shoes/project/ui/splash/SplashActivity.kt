package com.shop.shoes.project.ui.splash

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.lifecycleScope
import com.shop.shoes.project.ui.main.MainActivity
import com.shop.shoes.project.R
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        lifecycleScope.launch {
            delay(4000)
            goToMain()
        }
    }

    private fun goToMain(){
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}