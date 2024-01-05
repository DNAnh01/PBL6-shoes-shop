package com.shop.shoes.project.ui.main.history

import android.view.LayoutInflater
import com.shop.shoes.project.databinding.ActivityHistoryBinding
import com.shop.shoes.project.ui.base.BaseActivity
import org.koin.android.ext.android.inject

class HistoryActivity : BaseActivity<ActivityHistoryBinding>() {

    val historyViewModel by inject<HistoryViewModel>()

    override fun viewBinding(inflate: LayoutInflater): ActivityHistoryBinding =
        ActivityHistoryBinding.inflate(inflate)

    override fun initView() {
    }

    override fun initData() {
        historyViewModel.getHistory()
    }

    override fun initListener() {
    }
}