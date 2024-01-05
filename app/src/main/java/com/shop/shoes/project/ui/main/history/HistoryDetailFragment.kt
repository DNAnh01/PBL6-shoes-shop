package com.shop.shoes.project.ui.main.history

import android.annotation.SuppressLint
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.FragmentHistoryDetailBinding
import com.shop.shoes.project.ui.base.BaseFragment
import com.shop.shoes.project.ui.main.cart.CartAdapter
import com.shop.shoes.project.ui.main.detail.DetailProductActivity
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Utils

class HistoryDetailFragment : BaseFragment<FragmentHistoryDetailBinding>() {
    private val historyViewModel by lazy { (context as HistoryActivity).historyViewModel }

    private val histories = mutableListOf<Cart>()

    private val cardAdapter by lazy(LazyThreadSafetyMode.NONE) {
        CartAdapter(isCart = false, histories, { pos ->
            goToDetail(histories[pos].product!!)
        }, {})
    }

    override fun initView() = binding.run {
        imgBack.setOnClickListener {
            activity?.finish()
        }
        rvShow.run {
            layoutManager = LinearLayoutManager(context)
            adapter = cardAdapter
        }
    }

    override fun initData() {
        listenHistory()
    }

    override fun initListener() = binding.run {
        imgBack.setOnClickListener {
            Navigation.findNavController(binding.root)
                .navigate(R.id.action_historyDetailFragment_to_historyFragment)
        }
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentHistoryDetailBinding = FragmentHistoryDetailBinding.inflate(inflater)

    @SuppressLint("NotifyDataSetChanged")
    private fun listenHistory() {
        historyViewModel.details.observe(this) {
            histories.run {
                clear()
                addAll(it)
            }
            cardAdapter.notifyDataSetChanged()
        }
    }

    private fun goToDetail(product: Product) {
        val json = Utils.convertProductToJson(product)
        val intent = Intent(activity, DetailProductActivity::class.java)
        intent.putExtra(Constants.EXTRA_PRODUCT, json)
        startActivity(intent)
    }
}