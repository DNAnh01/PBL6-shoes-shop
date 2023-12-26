package com.shop.shoes.project.ui.main.cart

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.databinding.FragmentCartBinding
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.utils.Pref

class CartFragment : BaseFragment<FragmentCartBinding>() {

    override fun initView() = binding.run {
        rvCart.layoutManager = LinearLayoutManager(context)
        if (Pref.accessToken == "") {
            tvLogin.visibility = View.VISIBLE
        } else {
            tvLogin.visibility = View.GONE
        }
    }

    override fun initData() {
    }

    override fun initListener() {
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentCartBinding = FragmentCartBinding.inflate(inflater)

}