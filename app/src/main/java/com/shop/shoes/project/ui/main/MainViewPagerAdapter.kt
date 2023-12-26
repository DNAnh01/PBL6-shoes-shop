package com.shop.shoes.project.ui.main

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentStatePagerAdapter
import com.shop.shoes.project.ui.main.account.AccountFragment
import com.shop.shoes.project.ui.main.cart.CartFragment
import com.shop.shoes.project.ui.main.home.HomeFragment
import com.shop.shoes.project.utils.Constants

class MainViewPagerAdapter(fragmentManager: FragmentManager) :
    FragmentStatePagerAdapter(fragmentManager) {
    override fun getCount(): Int = Constants.MAIN_NUMBER_FRAGMENT

    override fun getItem(position: Int): Fragment {
        return when (position) {
            Constants.MAIN_HOME -> HomeFragment()
            Constants.MAIN_CART -> CartFragment()
            Constants.MAIN_ACCOUNT -> AccountFragment()
            else -> HomeFragment()
        }
    }
}