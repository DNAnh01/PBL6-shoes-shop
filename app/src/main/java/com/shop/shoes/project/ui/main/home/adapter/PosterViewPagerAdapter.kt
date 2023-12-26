package com.shop.shoes.project.ui.main.home

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.viewpager.widget.PagerAdapter
import com.shop.shoes.project.databinding.ItemPosterBinding

class PosterViewPagerAdapter(private val poster: List<Int>) : PagerAdapter() {

    private val list = poster
    override fun getCount(): Int = list.size
    override fun isViewFromObject(view: View, obj: Any): Boolean {
        return view == obj
    }

    override fun instantiateItem(viewGroup: ViewGroup, i: Int): Any {
        val binding = ItemPosterBinding.inflate(LayoutInflater.from(viewGroup.context), viewGroup, false)
        binding.run {
            clPoster.setBackgroundResource(list[i])
        }
        viewGroup.addView(binding.root)
        return binding.root
    }

    override fun destroyItem(viewGroup: ViewGroup, i: Int, obj: Any) {
        viewGroup.removeView(obj as ConstraintLayout)
    }
}