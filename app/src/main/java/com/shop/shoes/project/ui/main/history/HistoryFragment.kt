package com.shop.shoes.project.ui.main.history

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.activity.addCallback
import androidx.navigation.Navigation
import androidx.recyclerview.widget.LinearLayoutManager
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.History
import com.shop.shoes.project.databinding.FragmentHistoryBinding
import com.shop.shoes.project.ui.base.BaseFragment

class HistoryFragment : BaseFragment<FragmentHistoryBinding>() {
    private val historyViewModel by lazy { (context as HistoryActivity).historyViewModel }

    private val histories = mutableListOf<History>()

    private val historyAdapter by lazy(LazyThreadSafetyMode.NONE) {
        HistoryAdapter(histories) { pos ->
            historyViewModel.setCurrentDetail(histories[pos].orderItems)
            Navigation.findNavController(binding.root)
                .navigate(R.id.action_historyFragment_to_historyDetailFragment)
        }
    }

    override fun initView() = binding.run {
        rvShow.run {
            layoutManager = LinearLayoutManager(context)
            adapter = historyAdapter
        }
    }

    override fun initData() {
        listenHistory()
    }

    override fun initListener() = binding.run {
        activity?.run {
            onBackPressedDispatcher.addCallback(viewLifecycleOwner) { finish() }
        }
        imgBack.setOnClickListener {
            activity?.finish()
        }
    }

    override fun getViewBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentHistoryBinding = FragmentHistoryBinding.inflate(inflater)

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