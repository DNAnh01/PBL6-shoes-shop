package com.shop.shoes.project.ui.main

import android.view.LayoutInflater
import com.shop.shoes.project.R
import com.shop.shoes.project.databinding.ActivityMainBinding
import com.shop.shoes.project.ui.main.base.BaseActivity
import com.shop.shoes.project.utils.Constants

class MainActivity : BaseActivity<ActivityMainBinding>() {

    private val viewPagerAdapter by lazy { MainViewPagerAdapter(supportFragmentManager) }
    override fun viewBinding(inflate: LayoutInflater): ActivityMainBinding = ActivityMainBinding.inflate(inflate)

    override fun initView() {
        binding.viewPager.run {
            offscreenPageLimit = 0;
            adapter = viewPagerAdapter
        }
    }

    override fun initData() {
    }

    override fun initListener() {
        handleBottom()
    }

    private fun handleBottom() {
        binding.run {
            bottomNavigationView.setOnNavigationItemSelectedListener { menuItem ->
                when (menuItem.itemId) {
                    R.id.menu_search -> {
                        viewPager.setCurrentItem(Constants.MAIN_HOME, true)
                        true
                    }

                    R.id.menu_tickets -> {
                        viewPager.setCurrentItem(Constants.MAIN_CART, true)
                        true
                    }

                    R.id.menu_notification -> {
                        viewPager.setCurrentItem(Constants.MAIN_ACCOUNT, true)
                        true
                    }

                    else -> false
                }
            }
        }
    }

}
