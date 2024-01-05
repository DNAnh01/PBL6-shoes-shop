package com.shop.shoes.project.ui.main

import android.app.Application
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.BodyCart
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.data.model.ResponseCart
import com.shop.shoes.project.data.model.TopItem
import com.shop.shoes.project.data.source.Repository
import com.shop.shoes.project.utils.Pref
import kotlinx.coroutines.launch

class ShareViewModel(application: Application, private val repository: Repository) :
    AndroidViewModel(application) {
    private val _product = MutableLiveData<List<Product>>(emptyList())
    val product = _product

    private val _top = MutableLiveData<List<TopItem>>(emptyList())
    val top = _top
    fun getAllProducts() {
        viewModelScope.launch {
            try {
                val response = repository.getAllProducts()
                _product.postValue(response.content)
            } catch (e: Exception) {
                _product.postValue(emptyList())
            }
        }
    }

    fun getTop() {
        viewModelScope.launch {
            try {
                val response = repository.getTop()
                _top.postValue(response)
            } catch (e: Exception) {
                _top.postValue(emptyList())
            }
        }
    }

    fun getProductById(id: Int, listener: (Product?) -> Unit) {
        viewModelScope.launch {
            try {
                val response = repository.getProductById(id)
                listener.invoke(response)
            } catch (e: Exception) {
                listener.invoke(null)
            }
        }
    }

    fun getAllProductsBaseBrand(brand: String): List<Product> {
        val list = mutableListOf<Product>()
        if (brand == "All") {
            list.addAll(_product.value!!)
        } else {
            _product.value?.forEach {
                if (it.brand?.name!!.contains(brand)) {
                    list.add(it)
                }
            }
        }
        return list
    }

    fun search(name: String): List<Product> {
        val list = mutableListOf<Product>()
        _product.value?.forEach {
            if (it.title.toLowerCase().contains(name.toLowerCase())) {
                list.add(it)
            }
        }
        return list
    }

    private val _cart = MutableLiveData<ResponseCart?>()
    val cart = _cart
    fun getAllCart() {
        viewModelScope.launch {
            try {
                val response = repository.getAllCarts()
                _cart.postValue(response)
            } catch (e: Exception) {
                _cart.postValue(null)
            }
        }
    }

    fun clearCart() {
        _cart.postValue(null)
    }

    fun addNewCart(cart: BodyCart, listener: () -> Unit) {
        viewModelScope.launch {
            try {
                val response = repository.addNewCart(cart)
                if (response.status) {
                    Toast.makeText(
                        Pref.context,
                        Pref.context.getString(R.string.item_add_to_cart),
                        Toast.LENGTH_SHORT
                    ).show()
                    getAllCart()
                    listener.invoke()
                } else {
                    Toast.makeText(
                        Pref.context,
                        Pref.context.getString(R.string.add_cart_fail),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    Pref.context,
                    Pref.context.getString(R.string.add_cart_fail),
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    fun updateCart(cartId: Int, cart: BodyCart, listener: () -> Unit) {
        viewModelScope.launch {
            try {
                val response = repository.updateCartItem(cartId, cart)
                if (response.id != null) {
                    Toast.makeText(
                        Pref.context,
                        Pref.context.getString(R.string.cart_is_updated),
                        Toast.LENGTH_SHORT
                    ).show()
                    getAllCart()
                    listener.invoke()
                } else {
                    Toast.makeText(
                        Pref.context,
                        Pref.context.getString(R.string.update_cart_fail),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    Pref.context,
                    Pref.context.getString(R.string.update_cart_fail),
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    fun deleteCart(cartId: Int, listener: () -> Unit) {
        viewModelScope.launch {
            try {
                val response = repository.deleteNewCart(cartId)
                if (response.status) {
                    Toast.makeText(
                        Pref.context,
                        Pref.context.getString(R.string.delete_success),
                        Toast.LENGTH_SHORT
                    ).show()
                    getAllCart()
                    listener.invoke()
                } else {
                    Toast.makeText(
                        Pref.context,
                        Pref.context.getString(R.string.delete_fail),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    Pref.context,
                    Pref.context.getString(R.string.delete_fail),
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }
}