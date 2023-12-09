package com.shop.shoes.project.ui.auth

import android.view.LayoutInflater
import android.widget.Toast
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.User
import com.shop.shoes.project.databinding.ActivityRegisterBinding
import com.shop.shoes.project.ui.base.BaseActivity
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Utils
import org.koin.android.ext.android.inject

class RegisterActivity : BaseActivity<ActivityRegisterBinding>(){

    private val viewModel by inject<LoginViewModel>()
    override fun viewBinding(inflate: LayoutInflater): ActivityRegisterBinding = ActivityRegisterBinding.inflate(inflate)

    override fun initView() {
    }

    override fun initData() {
    }

    override fun initListener() =binding.run {
        llLogin.setOnClickListener { finish() }
        btnRegister.setOnClickListener { handleSignUp() }
        cbShowPass.setOnCheckedChangeListener { _, isChecked ->
            Utils.showCharactersEDT(edtPassword, isChecked)
        }
    }

    private fun handleSignUp() {
        if(checkIsSignIn()){
            viewModel.signUp(createUser()) {finish()}
        }else{
            Toast.makeText(this, getString(R.string.please_enter_enough_information), Toast.LENGTH_LONG).show()
        }
    }

    private fun createUser() : User {
        binding.run {
            return User(firstName = edtFirstName.text.toString(),
                lastName = edtLastname.text.toString(),
                email = edtEmail.text.toString(),
                password = edtPassword.text.toString(),
                mobile = edtPhone.text.toString(),
                role = Constants.ROLE)
        }
    }

    private fun checkIsSignIn() : Boolean {
        binding.run {
            if(edtEmail.text.toString() == "" || edtPassword.text.toString() == "" || edtFirstName.text.toString() == "" ||
                edtLastname.text.toString() == "" || edtPhone.text.toString() == "" ){
                return false
            }
            return true
        }
    }
}