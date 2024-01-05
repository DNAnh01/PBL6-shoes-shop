package com.shop.shoes.project.ui.main.payment

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebViewClient
import com.shop.shoes.project.databinding.ActivityPaymentBinding
import com.shop.shoes.project.ui.base.BaseActivity
import com.shop.shoes.project.utils.Constants

class PaymentActivity : BaseActivity<ActivityPaymentBinding>() {

    private var url = ""

    companion object {
        fun newIntent(context: Context, url: String) =
            Intent(context, PaymentActivity::class.java).apply {
                putExtra(Constants.KEY_PAY, url)
            }
    }

    override fun viewBinding(inflate: LayoutInflater): ActivityPaymentBinding =
        ActivityPaymentBinding.inflate(inflate)

    @SuppressLint("SetJavaScriptEnabled")
    override fun initView() = binding.run {
        if (url != "") {
            webView.settings.javaScriptEnabled = true
            webView.settings.domStorageEnabled = true
            webView.webViewClient = WebViewClient()
            webView.webChromeClient = WebChromeClient()
            webView.settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            webView.loadUrl(url)
        } else {
            finish()
        }
    }

    override fun initData() {
        val intent = intent
        if (intent != null && intent.hasExtra(Constants.KEY_PAY)) {
            url = intent.getStringExtra(Constants.KEY_PAY)!!
        }
    }

    override fun initListener() {
        binding.imgBack.setOnClickListener {
            setResult(RESULT_OK)
            finish()
        }
    }

    override fun onBackPressed() {
        setResult(RESULT_OK)
        super.onBackPressed()
    }
}