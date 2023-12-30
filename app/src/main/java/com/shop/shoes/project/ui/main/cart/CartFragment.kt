package com.shop.shoes.project.ui.main.cart

import android.annotation.SuppressLint
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.FragmentCartBinding
import com.shop.shoes.project.ui.main.MainActivity
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.ui.main.detail.DetailProductActivity
import com.shop.shoes.project.ui.main.purchase.PurchaseActivity
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref
import com.shop.shoes.project.utils.Utils

class CartFragment : BaseFragment<FragmentCartBinding>() {

    private val carts = mutableListOf<Cart>()

    private val cartViewModel by lazy { (context as MainActivity).shareViewModel }
    private val adapter by lazy(LazyThreadSafetyMode.NONE) {
        CartAdapter(carts,
            listener = { pos ->
                goToDetail(carts[pos].product!!)
            },
            listenerEdit = { pos ->
                context?.let {
                    Utils.showBottomEditCart(
                        context = it,
                        cart = carts[pos],
                        viewModel = cartViewModel
                    )
                }
            }
        )
    }

    override fun initView() = binding.run {
        rvCart.layoutManager = LinearLayoutManager(context)
        if (Pref.accessToken == "") {
            tvLogin.visibility = View.VISIBLE
        } else {
            tvLogin.visibility = View.GONE
        }
    }

    override fun initData() {
        cartViewModel.getAllCart()
        listenCart()
    }

    override fun initListener() {
        binding.tvPurchase.setOnClickListener {
            startActivity(Intent(context, PurchaseActivity::class.java))
        }
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentCartBinding = FragmentCartBinding.inflate(inflater)

    @SuppressLint("NotifyDataSetChanged")
    private fun listenCart() = binding.run {
        cartViewModel.cart.observe(this@CartFragment) {
            if (it != null) {
                carts.run {
                    clear()
                    addAll(it.cartItems)
                }
                tvLogin.visibility = View.GONE
                adapter.notifyDataSetChanged()
                rvCart.adapter = adapter
                tvTotal.text = it.totalDiscountedPrice.toString()
            } else {
                if (Pref.accessToken == "") {
                    tvLogin.visibility = View.VISIBLE
                }
            }
        }
    }

    private fun goToDetail(product: Product) {
        val json = Utils.convertProductToJson(product)
        val intent = Intent(activity, DetailProductActivity::class.java)
        intent.putExtra(Constants.EXTRA_PRODUCT, json)
        startActivity(intent)
    }
}