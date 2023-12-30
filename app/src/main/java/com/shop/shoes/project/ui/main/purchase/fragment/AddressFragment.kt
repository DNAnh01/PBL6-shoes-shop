package com.shop.shoes.project.ui.main.purchase.fragment

import android.view.LayoutInflater
import android.view.ViewGroup
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.BodyOrder
import com.shop.shoes.project.databinding.FragmentAddressBinding
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.ui.main.purchase.PurchaseActivity

class AddressFragment : BaseFragment<FragmentAddressBinding>() {

    private val purchaseViewModel by lazy { (context as PurchaseActivity).purchaseViewModel }
    override fun initView() {
    }

    override fun initData() {
    }

    override fun initListener() = binding.run {
        tvCancel.setOnClickListener { activity?.finish() }
        tvBuy.setOnClickListener {
            handleBuy()
        }
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentAddressBinding = FragmentAddressBinding.inflate(inflater)

    private fun isValidPhoneNumber(phoneNumber: String): Boolean {
        val phoneRegex = Regex("^0\\d{9}$")
        return phoneRegex.matches(phoneNumber)
    }

    private fun handleBuy() = binding.run {
        if (isCanBuy()) {
            (context as PurchaseActivity).address = BodyOrder(
                firstName = tvFirst.text.toString().trim(),
                lastName = tvLast.text.toString().trim(),
                mobile = tvPhone.text.toString().trim(),
                streetAddress = tvAddress.text.toString().trim(),
                city = tvCity.text.toString().trim(),
                state = tvState.text.toString().trim()
            )
            purchaseViewModel.createOrder((context as PurchaseActivity).address, {
                toast("hehe")
            }, {
                toast(getString(R.string.something_wrong))
            })
        }
    }

    private fun isCanBuy(): Boolean = binding.run {
        if (tvFirst.text.toString().trim() == "") {
            toast("please enter your first name")
            return false
        } else if (tvLast.text.toString().trim() == "") {
            toast("please enter your last name")
            return false
        } else if (tvPhone.text.toString().trim() == "") {
            toast("please enter your phone number")
            return false
        } else if (!isValidPhoneNumber(tvPhone.text.toString())) {
            toast("please enter right your phone number")
            return false
        } else if (tvAddress.text.toString().trim() == "") {
            toast("please enter your address")
            return false
        } else if (tvCity.text.toString().trim() == "") {
            toast("please enter your city")
            return false
        } else if (tvState.text.toString().trim() == "") {
            toast("please enter your state")
            return false
        } else return true
    }
}