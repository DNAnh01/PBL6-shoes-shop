package com.shop.shoes.project.ui.main.purchase

import android.view.LayoutInflater
import com.shop.shoes.project.ShopShoesApp
import com.shop.shoes.project.data.model.BodyOrder
import com.shop.shoes.project.databinding.ActivityPurchaseBinding
import com.shop.shoes.project.ui.base.BaseActivity
import org.koin.android.ext.android.inject

class PurchaseActivity : BaseActivity<ActivityPurchaseBinding>() {

    val shareViewModel by lazy { (application as ShopShoesApp).shareViewModel }

    var address: BodyOrder? = null

    val purchaseViewModel by inject<PurchaseViewModel>()

    override fun viewBinding(inflate: LayoutInflater): ActivityPurchaseBinding =
        ActivityPurchaseBinding.inflate(inflate)

    override fun initView() {
    }

    override fun initData() {
    }

    override fun initListener() {
    }
}