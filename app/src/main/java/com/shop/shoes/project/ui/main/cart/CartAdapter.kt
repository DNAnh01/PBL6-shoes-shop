package com.shop.shoes.project.ui.main.cart

import android.annotation.SuppressLint
import android.graphics.Color
import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.databinding.ItemCartBinding
import com.shop.shoes.project.databinding.ItemProductsBinding
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref

class CartAdapter(
    private val isCart: Boolean,
    private var records: List<Cart>,
    private val listener: (Int) -> Unit,
    private val listenerEdit: (Int) -> Unit,
) : RecyclerView.Adapter<CartAdapter.VH>() {
    inner class VH(private val binding: ItemCartBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun onBind(item: Cart) {
            binding.run {
                val price = "${item.price} ${Constants.PRICE}"
                val discount = "${item.discountedPrice} ${Constants.PRICE}"
                Glide.with(Pref.context).load(item.product?.imageUrl).into(imgPic)
                tvName.text = item.product?.title
                view.setBackgroundColor(Color.parseColor(item.product?.color))
                tvSize.text = item.size
                tvDiscount.text = price
                tvPrice.text = discount
                tvDiscount.paintFlags = Paint.STRIKE_THRU_TEXT_FLAG
                tvQuality.text = item.quantity.toString()
                if (!isCart) {
                    tvEdit.visibility = View.GONE
                }
                tvEdit.setOnClickListener {
                    listenerEdit(adapterPosition)
                }
            }
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH = VH(
        ItemCartBinding.inflate(LayoutInflater.from(parent.context), parent, false)
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
    fun updateData(new: List<Cart>) {
        records = new
        notifyDataSetChanged()
    }
}