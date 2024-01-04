package com.shop.shoes.project.ui.main.history

import android.annotation.SuppressLint
import android.view.LayoutInflater
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.data.model.History
import com.shop.shoes.project.databinding.ActivityHistoryBinding
import com.shop.shoes.project.ui.base.BaseActivity
import org.koin.android.ext.android.inject

class HistoryActivity : BaseActivity<ActivityHistoryBinding>() {

    private val historyViewModel by inject<HistoryViewModel>()

    private val histories = mutableListOf<History>()

    private val historyAdapter by lazy(LazyThreadSafetyMode.NONE) {
        HistoryAdapter(histories) { pos ->
            //TODO
        }
    }

    override fun viewBinding(inflate: LayoutInflater): ActivityHistoryBinding =
        ActivityHistoryBinding.inflate(inflate)

    override fun initView() = binding.run {
        imgBack.setOnClickListener {
            finish()
        }
        rvShow.run {
            layoutManager = LinearLayoutManager(this@HistoryActivity)
            adapter = historyAdapter
        }
    }

    override fun initData() {
        historyViewModel.getHistory()
        listenHistory()
    }

    override fun initListener() {
    }

    @SuppressLint("NotifyDataSetChanged")
    private fun listenHistory() {
        historyViewModel.histories.observe(this) {
            histories.run {
                clear()
                addAll(it)
            }
            historyAdapter.notifyDataSetChanged()
        }
    }
}