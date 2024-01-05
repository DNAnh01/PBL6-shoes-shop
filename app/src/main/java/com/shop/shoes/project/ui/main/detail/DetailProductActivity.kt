package com.shop.shoes.project.ui.main.detail

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.shop.shoes.project.ShopShoesApp
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.data.model.Review
import com.shop.shoes.project.databinding.ActivityDetailProductBinding
import com.shop.shoes.project.ui.auth.LoginActivity
import com.shop.shoes.project.ui.base.BaseActivity
import com.shop.shoes.project.utils.BottomSheetUtils
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref
import com.shop.shoes.project.utils.Utils

class DetailProductActivity : BaseActivity<ActivityDetailProductBinding>() {

    private val cartViewModel by lazy { (application as ShopShoesApp).shareViewModel }

    private var entity: Product? = null

    private val listRating = mutableListOf<Review>()

    private val adapter by lazy(LazyThreadSafetyMode.NONE) { RatingAdapter(listRating) }

    override fun viewBinding(inflate: LayoutInflater): ActivityDetailProductBinding =
        ActivityDetailProductBinding.inflate(inflate)

    override fun initView() = binding.run {
        if (entity != null) {
            Glide.with(this@DetailProductActivity).load(entity!!.imageUrl).into(imgPic)
            tvName.text = entity!!.title
            val quality = "${entity!!.quantity} products available"
            tvQuality.text = quality
            tvDes.text = entity!!.description
            showPrice()
            showRating(entity!!.reviews)
        } else {
            finish()
        }
    }

    override fun initData() {
        val json = intent.getStringExtra(Constants.EXTRA_PRODUCT)
        if (json != null) {
            entity = Utils.convertJsonToProduct(json)
        }
    }

    override fun initListener() = binding.run {
        imgBack.setOnClickListener { finish() }
        llAddCart.setOnClickListener {
            if (Pref.accessToken == "") {
                startActivityForResult(
                    Intent(
                        this@DetailProductActivity,
                        LoginActivity::class.java
                    ), Constants.REQUEST_CODE_LOGIN
                )
            } else {
                Utils.showBottomAddCart(
                    context = this@DetailProductActivity,
                    product = entity!!,
                    viewModel = cartViewModel
                )
            }
        }
    }

    private fun getRating(list: List<Review>): String {
        var rate = 0
        list.forEach {
            rate += it.rating
        }
        rate /= list.size
        return rate.toString()
    }

    @SuppressLint("NotifyDataSetChanged")
    private fun showRating(list: List<Review>) = binding.run {
        if (list.isNotEmpty()) {
            tvRating.text = getRating(list)
            tvNoRating.visibility = View.GONE
            rvRating.layoutManager = LinearLayoutManager(this@DetailProductActivity)
            listRating.run {
                clear()
                addAll(list)
            }
            adapter.notifyDataSetChanged()
            rvRating.adapter = adapter
        } else {
            clRating.visibility = View.GONE
        }
    }

    private fun showPrice() = binding.run {
        val price = "${entity!!.price} ${Constants.PRICE}"
        if (entity!!.discountedPrice == 0) {
            tvDiscount.visibility = View.GONE
            tvPrice.text = price
            tvSale.visibility = View.GONE
        } else {
            tvDiscount.text = price
            tvDiscount.paintFlags = Paint.STRIKE_THRU_TEXT_FLAG
            val discount = "${entity!!.discountedPrice} ${Constants.PRICE}"
            tvPrice.text = discount
            val text = "-${entity!!.discountPersent}%"
            tvSale.text = text
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK && requestCode == Constants.REQUEST_CODE_LOGIN) {
            Utils.showBottomAddCart(
                context = this@DetailProductActivity,
                product = entity!!,
                viewModel = cartViewModel
            )
        }
    }
}