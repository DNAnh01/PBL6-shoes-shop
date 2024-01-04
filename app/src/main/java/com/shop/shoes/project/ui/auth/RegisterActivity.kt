package com.shop.shoes.project.ui.auth

import android.view.LayoutInflater
import com.shop.shoes.project.data.model.User
import com.shop.shoes.project.databinding.ActivityRegisterBinding
import com.shop.shoes.project.ui.base.BaseActivity
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Utils
import org.koin.android.ext.android.inject

class RegisterActivity : BaseActivity<ActivityRegisterBinding>() {

    private val viewModel by inject<LoginViewModel>()
    override fun viewBinding(inflate: LayoutInflater): ActivityRegisterBinding =
        ActivityRegisterBinding.inflate(inflate)

    override fun initView() {
    }

    override fun initData() {
    }

    override fun initListener() = binding.run {
        llLogin.setOnClickListener { finish() }
        btnRegister.setOnClickListener { handleSignUp() }
        cbShowPass.setOnCheckedChangeListener { _, isChecked ->
            Utils.showCharactersEDT(edtPassword, isChecked)
        }
    }

    private fun handleSignUp() {
        if (checkIsSignIn()) {
            viewModel.signUp(createUser()) { finish() }
        }
    }

    private fun createUser(): User {
        binding.run {
            return User(
                firstName = edtFirstName.text.toString(),
                lastName = edtLastname.text.toString(),
                email = edtEmail.text.toString(),
                password = edtPassword.text.toString(),
                mobile = edtPhone.text.toString(),
                role = Constants.ROLE
            )
        }
    }

    private fun checkIsSignIn(): Boolean {
        binding.run {
            if (edtEmail.text.toString() == "" || edtPassword.text.toString() == "" || edtFirstName.text.toString() == "" ||
                edtLastname.text.toString() == "" || edtPhone.text.toString() == ""
            ) {
                toast("Please enter enough information")
                return false
            } else if (!Utils.isValidPhoneNumber(edtPhone.text.toString())) {
                toast("Please enter right phone number")
                return false
            } else if (!Utils.isEmailValid(edtEmail.text.toString())) {
                toast("Please enter right email")
                return false
            }
            return true
        }
    }
}