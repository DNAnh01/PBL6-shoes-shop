package com.shop.shoes.project.ui.main.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.databinding.FragmentHomeBinding
import com.shop.shoes.project.ui.base.BaseFragment

class HomeFragment : BaseFragment<FragmentHomeBinding>() {
    override fun initView() = binding.run {
        rvProduct.layoutManager = GridLayoutManager(context, 2)
        rvBrandShoes.run {
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        }
        rvBest.layoutManager = GridLayoutManager(context, 2)
        dot.setViewPager(viewPager)
    }

    override fun initData() {
    }

    override fun initListener() {
        binding.tvSearchProduct.setOnClickListener {
            //TODO
        }
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentHomeBinding = FragmentHomeBinding.inflate(inflater)
}