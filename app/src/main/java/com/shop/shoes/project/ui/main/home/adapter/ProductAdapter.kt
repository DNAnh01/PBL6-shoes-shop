package com.shop.shoes.project.ui.main.home.adapter

import android.annotation.SuppressLint
import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.ItemProductsBinding
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref.context


class ProductAdapter(
    private var records: List<Product>,
    private val listener: (Int) -> Unit,
) : RecyclerView.Adapter<ProductAdapter.VH>() {
    inner class VH(private val binding: ItemProductsBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun onBind(item: Product) {
            binding.run {
                Glide.with(context).load(item.imageUrl).into(imgPic)
                tvName.text = item.title
                if (item.discountedPrice == 0) {
                    tvDiscount.visibility = View.GONE
                    val price = "${item.price} ${Constants.PRICE}"
                    tvPrice.text = price
                    tvSale.visibility = View.GONE
                } else {
                    val discount = "${item.price} ${Constants.PRICE}"
                    tvDiscount.text = discount
                    tvDiscount.paintFlags = Paint.STRIKE_THRU_TEXT_FLAG
                    val price = "${item.discountedPrice} ${Constants.PRICE}"
                    tvPrice.text = price
                    val text = "-${item.discountPersent}%"
                    tvSale.text = text
                }
                tvType.text = item.brand?.name
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

    @SuppressLint("NotifyDataSetChanged")
    fun updateData(new: List<Product>) {
        records = new
        notifyDataSetChanged()
    }
}