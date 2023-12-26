package com.shop.shoes.project.ui.main.home

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.FragmentHomeBinding
import com.shop.shoes.project.ui.main.MainActivity
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.ui.main.home.adapter.ProductAdapter

class HomeFragment : BaseFragment<FragmentHomeBinding>() {

    private val homeViewModel by lazy { (context as MainActivity).shareViewModel }
    private val products = mutableListOf<Product>()
    private val bestProducts = mutableListOf<Product>()
    private val poster = arrayListOf(
        R.drawable.img_banner,
        R.drawable.img_banner_1,
        R.drawable.img_banner_2
    )
    private val adapter by lazy(LazyThreadSafetyMode.NONE) {
        ProductAdapter(products) { pos ->
            //TODO
        }
    }

    private val bestAdapter by lazy(LazyThreadSafetyMode.NONE) {
        ProductAdapter(bestProducts) { pos ->
           //TODO
        }
    }
    private val viewPagerAdapter by lazy { PosterViewPagerAdapter(poster) }

    override fun initView() = binding.run {
        rvProduct.layoutManager = GridLayoutManager(context, 2)
        rvBrandShoes.run {
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        }
        rvBest.layoutManager = GridLayoutManager(context, 2)
        viewPager.adapter = viewPagerAdapter
        dot.setViewPager(viewPager)
    }

    override fun initData() {
        homeViewModel.getAllProducts()
        listenVM()
    }

    override fun initListener() {
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentHomeBinding = FragmentHomeBinding.inflate(inflater)

    @SuppressLint("NotifyDataSetChanged")
    private fun listenVM() = binding.run {
        homeViewModel.product.observe(this@HomeFragment) {
            products.run {
                clear()
                addAll(it)
            }
            bestProducts.run {
                clear()
                addAll(it.take(4))
            }
            adapter.notifyDataSetChanged()
            rvProduct.adapter = adapter
            bestAdapter.notifyDataSetChanged()
            rvBest.adapter = bestAdapter
        }
    }
}