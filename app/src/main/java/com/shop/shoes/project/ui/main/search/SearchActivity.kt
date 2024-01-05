package com.shop.shoes.project.ui.main.search

import android.annotation.SuppressLint
import android.content.Intent
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import androidx.recyclerview.widget.GridLayoutManager
import com.shop.shoes.project.ShopShoesApp
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.ActivitySearchBinding
import com.shop.shoes.project.ui.base.BaseActivity
import com.shop.shoes.project.ui.main.detail.DetailProductActivity
import com.shop.shoes.project.ui.main.home.adapter.ProductAdapter
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Utils
import org.koin.android.ext.android.inject

class SearchActivity : BaseActivity<ActivitySearchBinding>() {
    private val searchViewModel by lazy { (application as ShopShoesApp).shareViewModel }
    private val products = mutableListOf<Product>()
    private val adapter by lazy(LazyThreadSafetyMode.NONE) {
        ProductAdapter(products) { pos ->
            goToDetail(products[pos])
        }
    }

    override fun viewBinding(inflate: LayoutInflater): ActivitySearchBinding =
        ActivitySearchBinding.inflate(inflate)

    override fun initView() {
        binding.rvProduct.layoutManager = GridLayoutManager(this, 2)
    }

    override fun initData() {
        searchViewModel.getAllProducts()
        listenVM()
    }

    override fun initListener() {
        binding.imgBack.setOnClickListener { finish() }
        listenerEditText()
    }

    @SuppressLint("NotifyDataSetChanged")
    private fun listenVM() = binding.run {
        searchViewModel.product.observe(this@SearchActivity) {
            products.run {
                clear()
                addAll(it)
            }
            adapter.notifyDataSetChanged()
            rvProduct.adapter = adapter
        }
    }

    private fun listenerEditText() {
        binding.edtSearch.run {
            addTextChangedListener(object : TextWatcher {
                override fun beforeTextChanged(s: CharSequence?, st: Int, c: Int, af: Int) {}

                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    val list = searchViewModel.search(s.toString().trim())
                    products.run {
                        clear()
                        addAll(list)
                    }
                    adapter.updateData(products)
                }

                override fun afterTextChanged(s: Editable?) {
                }
            })
        }
    }

    private fun goToDetail(product: Product) {
        val json = Utils.convertProductToJson(product)
        val intent = Intent(this, DetailProductActivity::class.java)
        intent.putExtra(Constants.EXTRA_PRODUCT, json)
        startActivity(intent)
    }
}