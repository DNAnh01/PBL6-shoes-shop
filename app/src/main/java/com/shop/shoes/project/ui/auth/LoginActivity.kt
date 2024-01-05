package com.shop.shoes.project.ui.auth

import android.content.Intent
import android.view.LayoutInflater
import android.widget.Toast
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Auth
import com.shop.shoes.project.databinding.ActivityLoginBinding
import com.shop.shoes.project.ui.base.BaseActivity
import com.shop.shoes.project.utils.Utils
import org.koin.android.ext.android.inject

class LoginActivity : BaseActivity<ActivityLoginBinding>(){
    private val viewModel by inject<LoginViewModel>()
    override fun viewBinding(inflate: LayoutInflater): ActivityLoginBinding = ActivityLoginBinding.inflate(inflate)

    override fun initView() {
    }

    override fun initData() {
    }

    override fun initListener() = binding.run {
        llRegister.setOnClickListener { startActivity(Intent(this@LoginActivity, RegisterActivity::class.java)) }
        tvLater.setOnClickListener { finish() }
        btnLogin.setOnClickListener { handleSignIn() }
        cbShowPass.setOnCheckedChangeListener { _, isChecked ->
            Utils.showCharactersEDT(edtPassword, isChecked)
        }
    }

    private fun handleSignIn() {
        if(checkIsSignIn()){
            viewModel.signIn(createAuth()) {
                setResult(RESULT_OK)
                finish()}
        }else{
            Toast.makeText(this, getString(R.string.please_enter_enough_information), Toast.LENGTH_LONG).show()
        }
    }

    private fun createAuth() : Auth {
        binding.run {
            return Auth(username =  edtEmail.text.toString(),
                password = edtPassword.text.toString())
        }
    }

    private fun checkIsSignIn() : Boolean {
        binding.run {
            if(edtEmail.text.toString() == "" || edtPassword.text.toString() == ""){
                return false
            }
            return true
        }
    }
}