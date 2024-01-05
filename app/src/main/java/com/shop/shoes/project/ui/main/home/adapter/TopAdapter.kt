package com.shop.shoes.project.ui.main.home.adapter

import android.annotation.SuppressLint
import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.shop.shoes.project.data.model.TopItem
import com.shop.shoes.project.databinding.ItemProductsBinding
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref

class TopAdapter(
    private var records: List<TopItem>,
    private val listener: (Int) -> Unit,
) : RecyclerView.Adapter<TopAdapter.VH>() {
    inner class VH(private val binding: ItemProductsBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun onBind(item: TopItem) {
            binding.run {
                Glide.with(Pref.context).load(item.productImageUrl).into(imgPic)
                tvName.text = item.productName
                if (item.productDiscountPercent == 0) {
                    tvDiscount.visibility = View.GONE
                    val price = "${item.productPrice} ${Constants.PRICE}"
                    tvPrice.text = price
                    tvSale.visibility = View.GONE
                } else {
                    val discount = "${item.productPrice} ${Constants.PRICE}"
                    tvDiscount.text = discount
                    tvDiscount.paintFlags = Paint.STRIKE_THRU_TEXT_FLAG
                    val price = "${item.productDiscountedPrice} ${Constants.PRICE}"
                    tvPrice.text = price
                    val text = "-${item.productDiscountPercent}%"
                    tvSale.text = text
                }
                tvType.text = item.brandName
            }
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH = VH(
        ItemProductsBinding.inflate(LayoutInflater.from(parent.context), parent, false)
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