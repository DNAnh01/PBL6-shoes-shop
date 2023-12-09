package com.shop.shoes.project.ui.main.home

import android.annotation.SuppressLint
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.FragmentHomeBinding
import com.shop.shoes.project.ui.main.MainActivity
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.ui.main.detail.DetailProductActivity
import com.shop.shoes.project.ui.main.home.adapter.BrandAdapter
import com.shop.shoes.project.ui.main.home.adapter.ProductAdapter
import com.shop.shoes.project.ui.main.search.SearchActivity
import com.shop.shoes.project.utils.BrandUtils
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Utils

class HomeFragment : BaseFragment<FragmentHomeBinding>() {

    private val homeViewModel by lazy { (context as MainActivity).shareViewModel }
    private val products = mutableListOf<Product>()
    private val bestProducts = mutableListOf<Product>()
    private val brands = BrandUtils.brands
    private val poster = arrayListOf(
        R.drawable.img_banner,
        R.drawable.img_banner_1,
        R.drawable.img_banner_2
    )
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
    private val bestAdapter by lazy(LazyThreadSafetyMode.NONE) {
        ProductAdapter(bestProducts) { pos ->
            goToDetail(products[pos])
        }
    }
    private val viewPagerAdapter by lazy { PosterViewPagerAdapter(poster) }

    override fun initView() = binding.run {
        rvProducts.layoutManager = GridLayoutManager(context, 2)
        rvBrand.run {
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
            adapter = brandAdapter
        }
        rvBestSeller.layoutManager = GridLayoutManager(context, 2)
        viewPager.adapter = viewPagerAdapter
        dotIndicator.setViewPager(viewPager)
    }

    override fun initData() {
        homeViewModel.getAllProducts()
        listenVM()
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
            bestProducts.run {
                clear()
                addAll(it.take(4))
            }
            adapter.notifyDataSetChanged()
            rvProducts.adapter = adapter
            bestAdapter.notifyDataSetChanged()
            rvBestSeller.adapter = bestAdapter
        }
    }

    private fun goToDetail(product: Product) {
        val json = Utils.convertProductToJson(product)
        val intent = Intent(activity, DetailProductActivity::class.java)
        intent.putExtra(Constants.EXTRA_PRODUCT, json)
        startActivity(intent)
    }
}