package com.shop.shoes.project.ui.main.purchase.fragment

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.FragmentConfirmBinding
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.ui.main.cart.CartAdapter
import com.shop.shoes.project.ui.main.detail.DetailProductActivity
import com.shop.shoes.project.ui.main.payment.PaymentActivity
import com.shop.shoes.project.ui.main.purchase.PurchaseActivity
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Utils

class ConfirmFragment : BaseFragment<FragmentConfirmBinding>() {

    private val purchaseViewModel by lazy { (context as PurchaseActivity).purchaseViewModel }

    private val shareViewModel by lazy { (context as PurchaseActivity).shareViewModel }

    private val address by lazy { (context as PurchaseActivity).address }

    private val carts = mutableListOf<Cart>()

    private var id = -1

    private val adapter by lazy(LazyThreadSafetyMode.NONE) {
        CartAdapter(false, carts,
            listener = { pos ->
                goToDetail(carts[pos].product!!)
            },
            listenerEdit = { _ ->
            }
        )
    }

    override fun initView() = binding.run {
        rvCart.layoutManager = LinearLayoutManager(context)
        val name = address!!.firstName + " " + address!!.lastName
        tvName.text = name
        tvPhone.text = address!!.mobile
        val locate = address!!.streetAddress + " " + address!!.city + " " + address!!.state
        tvAddress.text = locate
    }

    override fun initData() {
        listenPurchase()
        listenCart()
    }

    override fun initListener() = binding.run {
        tvCancel.setOnClickListener { goToBack() }
        tvBuy.setOnClickListener {
            purchaseViewModel.goToPay(id) { url ->
                startActivityForResult(
                    PaymentActivity.newIntent(context as PurchaseActivity, url),
                    Constants.REQUEST_CODE_PAY
                )
            }
        }
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentConfirmBinding = FragmentConfirmBinding.inflate(inflater)

    @SuppressLint("NotifyDataSetChanged")
    private fun listenPurchase() = binding.run {
        purchaseViewModel.order.observe(this@ConfirmFragment) {
            if (it != null) {
                id = it.id
                tvTotal.text = it.totalDiscountedPrice.toString()
            }
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    private fun listenCart() = binding.run {
        shareViewModel.cart.observe(this@ConfirmFragment) {
            if (it != null) {
                carts.run {
                    clear()
                    addAll(it.cartItems)
                }
                adapter.notifyDataSetChanged()
                rvCart.adapter = adapter
                tvTotal.text = it.totalDiscountedPrice.toString()
            }
        }
    }

    private fun goToDetail(product: Product) {
        val json = Utils.convertProductToJson(product)
        val intent = Intent(activity, DetailProductActivity::class.java)
        intent.putExtra(Constants.EXTRA_PRODUCT, json)
        startActivity(intent)
    }

    private fun goToBack() {
        Navigation.findNavController(binding.root)
            .navigate(R.id.action_confirmFragment_to_addressFragment)
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == Constants.REQUEST_CODE_PAY && resultCode == Activity.RESULT_OK) {
            toast("BUY SUCCESS")
            (context as PurchaseActivity).finish()
        }
    }
}