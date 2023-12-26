package com.shop.shoes.project.ui.base

import android.content.Intent
import android.os.Bundle
import android.os.SystemClock
import android.text.TextUtils
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.core.view.WindowCompat
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.lifecycleScope
import androidx.viewbinding.ViewBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

abstract class BaseActivity<B : ViewBinding> : FragmentActivity() {
    protected lateinit var binding: B
    private var permissionComplete: ((Boolean) -> Unit)? = null
    private var lastClickTime: Long = 0

    val activityLauncher: BetterActivityResult<Intent, ActivityResult> =
        BetterActivityResult.registerActivityForResult(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN or WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE)
        binding = viewBinding(LayoutInflater.from(this))
        setContentView(binding.root)
        initData()
        initView()
        initListener()
    }

    protected val viewException: Array<View>?
        protected get() = null

    protected abstract fun viewBinding(inflate: LayoutInflater): B
    protected abstract fun initView()
    protected abstract fun initData()
    protected abstract fun initListener()

    fun aVoidDoubleClick(): Boolean {
        if (SystemClock.elapsedRealtime() - lastClickTime < 500) {
            return true
        }
        lastClickTime = SystemClock.elapsedRealtime()
        return false
    }

    fun toast(content: String?) {
        lifecycleScope.launch(Dispatchers.Main) {
            if (!TextUtils.isEmpty(content)) Toast.makeText(
                this@BaseActivity,
                content,
                Toast.LENGTH_SHORT
            ).show()
        }
    }

}