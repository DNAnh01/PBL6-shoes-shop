package com.shop.shoes.project.ui.main.purchase

import android.app.Application
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.shop.shoes.project.data.model.BodyOrder
import com.shop.shoes.project.data.model.BodyPayment
import com.shop.shoes.project.data.model.ResponseOrder
import com.shop.shoes.project.data.source.Repository
import com.shop.shoes.project.utils.Pref.context
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

    fun goToPay(id: Int, listener: (String) -> Unit) {
        viewModelScope.launch {
            try {
                val response = repository.payment(BodyPayment(id = id))
                listener.invoke(response.vnpayUrl)
            } catch (e: Exception) {
                Toast.makeText(context, "wrong", Toast.LENGTH_SHORT).show()
            }
        }
    }
}