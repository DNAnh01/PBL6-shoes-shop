package com.shop.shoes.project.ui.main.account

import android.view.LayoutInflater
import com.shop.shoes.project.data.model.BodyInfo
import com.shop.shoes.project.data.model.User
import com.shop.shoes.project.databinding.ActivityInfoBinding
import com.shop.shoes.project.ui.base.BaseActivity
import com.shop.shoes.project.utils.Utils
import org.koin.android.ext.android.inject

class InfoActivity : BaseActivity<ActivityInfoBinding>() {
    private val infoViewModel by inject<InfoViewModel>()
    override fun viewBinding(inflate: LayoutInflater): ActivityInfoBinding =
        ActivityInfoBinding.inflate(inflate)

    override fun initView() {
        listenVM()
    }

    override fun initData() {
        infoViewModel.getInfo()
    }

    override fun initListener() = binding.run {
        btnBack.setOnClickListener { finish() }
        btnChangePass.setOnClickListener {
            Utils.showBottomChangePass(this@InfoActivity, infoViewModel)
        }
        btnChangeInfo.setOnClickListener { handleChangeInfo() }
    }

    private fun listenVM() {
        infoViewModel.user.observe(this) {
            if (it != null) {
                changeView(it)
            }
        }
    }

    private fun changeView(user: User) = binding.run {
        edtLastname.setText(user.lastName)
        edtFirstName.setText(user.firstName)
        edtEmail.setText(user.email)
        edtPhone.setText(user.mobile)
    }

    private fun handleChangeInfo() = binding.run {
        if (!Utils.isValidPhoneNumber(edtPhone.text.toString())) {
            toast("Please enter right phone number")
        } else if (!Utils.isEmailValid(edtEmail.text.toString())) {
            toast("Please enter right email")
        } else {
            infoViewModel.changeInfo(
                BodyInfo(
                    firstName = edtFirstName.text.toString(),
                    lastName = edtLastname.text.toString(),
                    mobile = edtPhone.text.toString(),
                )
            )
        }
    }
}