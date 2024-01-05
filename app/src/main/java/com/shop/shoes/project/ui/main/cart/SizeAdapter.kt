package com.shop.shoes.project.ui.main.cart

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.SizeShow
import com.shop.shoes.project.databinding.ItemSizeBinding

class SizeAdapter(
    private var records: List<SizeShow>,
    private val listener: (Int) -> Unit,
) : RecyclerView.Adapter<SizeAdapter.VH>() {
    inner class VH(private val binding: ItemSizeBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun onBind(item: SizeShow) {
            binding.run {
                tvSize.text = item.size
                root.setBackgroundResource(
                    if (item.quantity == 0) {
                        R.drawable.bg_box_grey
                    } else {
                        if (item.isSelected) R.drawable.bg_box_view else R.drawable.bg_box
                    }
                )
            }
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH = VH(
        ItemSizeBinding.inflate(LayoutInflater.from(parent.context), parent, false)
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