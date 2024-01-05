package com.shop.shoes.project.ui.main.detail

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Review
import com.shop.shoes.project.databinding.ItemRatingBinding
import com.shop.shoes.project.utils.Utils

class RatingAdapter(
    private var records: List<Review>
) : RecyclerView.Adapter<RatingAdapter.VH>() {
    inner class VH(val binding: ItemRatingBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun onBind(item: Review) {
            binding.run {
                val name = item.user.firstName + item.user.lastName
                tvNameUser.text = name
                tvRating.text = item.rating.toString()
                tvDate.text = Utils.convertDateFormat(item.createAt)
                tvReview.text = item.quantity
            }
        }
    }

    @SuppressLint("NotifyDataSetChanged")
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH = VH(
        ItemRatingBinding.inflate(LayoutInflater.from(parent.context), parent, false)
    )

    override fun getItemCount(): Int = records.size

    override fun onBindViewHolder(holder: VH, position: Int) {
        holder.onBind(records[position])
        holder.binding.root.setBackgroundResource(if (position % 2 == 0) R.drawable.bg_box else R.drawable.bg_box_view)
    }
}