package com.shop.shoes.project.ui.main.home

import android.annotation.SuppressLint
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.data.model.TopItem
import com.shop.shoes.project.databinding.FragmentHomeBinding
import com.shop.shoes.project.ui.main.MainActivity
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.ui.main.detail.DetailProductActivity
import com.shop.shoes.project.ui.main.home.adapter.BrandAdapter
import com.shop.shoes.project.ui.main.home.adapter.ProductAdapter
import com.shop.shoes.project.ui.main.home.adapter.TopAdapter
import com.shop.shoes.project.ui.main.search.SearchActivity
import com.shop.shoes.project.utils.BrandUtils
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Utils

class HomeFragment : BaseFragment<FragmentHomeBinding>() {

    private val homeViewModel by lazy { (context as MainActivity).shareViewModel }
    private val products = mutableListOf<Product>()
    private val tops = mutableListOf<TopItem>()
    private val brands = BrandUtils.brands

    private val adapter by lazy(LazyThreadSafetyMode.NONE) {
        ProductAdapter(products) { pos ->
            goToDetail(products[pos])
        }
    }

    private val brandAdapter by lazy(LazyThreadSafetyMode.NONE) {
        BrandAdapter(brands) { pos ->
            val list = homeViewModel.getAllProductsBaseBrand(brands[pos].name)
            products.run {
                clear()
                addAll(list)
            }
            adapter.updateData(products)
        }
    }

    private val topAdapter by lazy(LazyThreadSafetyMode.NONE) {
        TopAdapter(tops) { pos ->
            homeViewModel.getProductById(tops[pos].productId) { product ->
                if (product != null) {
                    goToDetail(product)
                } else {
                    toast(getString(R.string.something_wrong))
                }
            }
        }
    }

    override fun initView() = binding.run {
        rvProducts.layoutManager = GridLayoutManager(context, 2)
        rvBrand.run {
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
            adapter = brandAdapter
        }
        rvBestSeller.layoutManager = GridLayoutManager(context, 3)
    }

    override fun initData() {
        homeViewModel.getAllProducts()
        homeViewModel.getTop()
        listenVM()
        listenTop()
    }

    override fun initListener() {
        binding.tvSearch.setOnClickListener {
            startActivity(Intent(context, SearchActivity::class.java))
        }
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
            adapter.notifyDataSetChanged()
            rvProducts.adapter = adapter
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    private fun listenTop() = binding.run {
        homeViewModel.top.observe(this@HomeFragment) {
            tops.run {
                clear()
                addAll(it)
            }
            topAdapter.notifyDataSetChanged()
            rvBestSeller.adapter = topAdapter
        }
    }

    private fun goToDetail(product: Product) {
        val json = Utils.convertProductToJson(product)
        val intent = Intent(activity, DetailProductActivity::class.java)
        intent.putExtra(Constants.EXTRA_PRODUCT, json)
        startActivity(intent)
    }
}