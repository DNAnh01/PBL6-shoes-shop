package com.shop.shoes.project.ui.main.purchase.fragment

import android.view.LayoutInflater
import android.view.ViewGroup
import com.shop.shoes.project.databinding.FragmentConfirmBinding
import com.shop.shoes.project.ui.base.BaseFragment

class ConfirmFragment : BaseFragment<FragmentConfirmBinding>() {
    override fun initView() {
    }

    override fun initData() {
    }

    override fun initListener() {
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentConfirmBinding = FragmentConfirmBinding.inflate(inflater)
}