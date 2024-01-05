package com.shop.shoes.project.ui.main.history

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.shop.shoes.project.data.model.Brand
import com.shop.shoes.project.data.model.History
import com.shop.shoes.project.databinding.ItemHistoryBinding
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref

class HistoryAdapter(
    private var records: List<History>,
    private val listener: (Int) -> Unit,
) : RecyclerView.Adapter<HistoryAdapter.VH>() {
    inner class VH(private val binding: ItemHistoryBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun onBind(item: History) {
            binding.run {
                tvEmail.text = item.user.email
                val address = "${item.ship.streetAddress}, ${item.ship.city}"
                tvAddress.text = address
                tvPhone.text = item.ship.mobile
                tvDate.text = item.ship.creationTime
                tvStatus.text = item.status
                tvTotal.text = "${item.price} ${Constants.PRICE}"
                btnDetail.setOnClickListener {
                    listener.invoke(adapterPosition)
                }
            }
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH = VH(
        ItemHistoryBinding.inflate(LayoutInflater.from(parent.context), parent, false)
    ).apply {
        itemView.setOnClickListener {
            if (adapterPosition != RecyclerView.NO_POSITION) {
                listener.invoke(adapterPosition)
                notifyDataSetChanged()
            }
        }
    }

    override fun getItemCount(): Int = records.size

    override fun onBindViewHolder(holder: VH, position: Int) {
        holder.onBind(records[position])
    }
}