package com.shop.shoes.project.ui.main.account

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.airbnb.lottie.LottieDrawable
import com.shop.shoes.project.R
import com.shop.shoes.project.databinding.FragmentAccountBinding
import com.shop.shoes.project.ui.auth.LoginActivity
import com.shop.shoes.project.ui.main.MainActivity
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref

class AccountFragment : BaseFragment<FragmentAccountBinding>() {

    private val shareViewModel by lazy { (context as MainActivity).shareViewModel }
    override fun initView() = binding.run {
        playAnimation()
        if (Pref.accessToken == "") {
            tvLogout.visibility = View.GONE
            view.visibility = View.GONE
        }
    }

    override fun initData() {
    }

    override fun initListener() = binding.run {
        tvInfo.setOnClickListener {
            mustBeLogin {
                startActivity(Intent(context, InfoActivity::class.java))
            }
        }
        tvSupport.setOnClickListener { sendFeedBack() }
        tvLogout.setOnClickListener {
            Pref.accessToken = ""
            tvLogout.visibility = View.GONE
            view.visibility = View.GONE
            shareViewModel.clearCart()
        }
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentAccountBinding = FragmentAccountBinding.inflate(inflater)

    private fun playAnimation() {
        binding.animationView.run {
            playAnimation()
            repeatCount = LottieDrawable.INFINITE
        }
    }

    private fun mustBeLogin(listener: () -> Unit) {
        if (Pref.accessToken == "") {
            startActivityForResult(
                Intent(context, LoginActivity::class.java),
                Constants.REQUEST_CODE_LOGIN
            )
        } else {
            listener.invoke()
        }
    }

    private fun sendFeedBack() {
        try {
            val emailIntent = Intent(Intent.ACTION_SENDTO)
            val emailSubjectFormat = getString(R.string.we_will_support_you_as_soon_as_possible)
            val emailSubject = String.format(
                emailSubjectFormat, getString(R.string.app_name)
            )
            emailIntent.data =
                Uri.parse("mailto:" + getString(R.string.email_feedback))
            emailIntent.putExtra(
                Intent.EXTRA_SUBJECT,
                emailSubject
            )
            startActivity(Intent.createChooser(emailIntent, "Send Feedback"))
        } catch (e: ActivityNotFoundException) {
            toast(getString(R.string.no_mail_found))
        } catch (e: Exception) {
            toast(getString(R.string.error_can_not_send))
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            binding.run {
                tvLogout.visibility = View.VISIBLE
                view.visibility = View.VISIBLE
            }
            shareViewModel.getAllCart()
            shareViewModel.getAllProducts()
        }
    }

}