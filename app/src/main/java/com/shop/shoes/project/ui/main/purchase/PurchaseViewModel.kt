package com.shop.shoes.project.ui.main.purchase

import android.app.Application
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.shop.shoes.project.data.model.BodyOrder
import com.shop.shoes.project.data.model.ResponseOrder
import com.shop.shoes.project.data.source.Repository
import kotlinx.coroutines.launch

class PurchaseViewModel(application: Application, private val repository: Repository) :
    AndroidViewModel(application) {

    private val _order = MutableLiveData<ResponseOrder?>()
    val order = _order

    fun createOrder(bodyOrder: BodyOrder, listenSuccess: () -> Unit, listenFail: () -> Unit) {
        viewModelScope.launch {
            try {
                val response = repository.createOrder(bodyOrder)
                _order.postValue(response)
                listenSuccess.invoke()
            } catch (e: Exception) {
                _order.postValue(null)
                listenFail.invoke()
            }
        }
    }
}