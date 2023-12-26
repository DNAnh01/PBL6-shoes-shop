package com.shop.shoes.project.ui.main.home.adapter

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.shop.shoes.project.data.model.Brand
import com.shop.shoes.project.databinding.ItemBrandBinding
import com.shop.shoes.project.utils.Pref

class BrandAdapter(
    private var records: List<Brand>,
    private val listener: (Int) -> Unit,
) : RecyclerView.Adapter<BrandAdapter.VH>() {
    inner class VH(private val binding: ItemBrandBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun onBind(item: Brand) {
            binding.run {
                Glide.with(Pref.context).load(item.imageUrl).into(imgPic)
                tvBrand.text = item.name
            }
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH = VH(
        ItemBrandBinding.inflate(LayoutInflater.from(parent.context), parent, false)
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