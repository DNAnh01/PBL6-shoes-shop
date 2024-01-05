package com.shop.shoes.project.ui.main.history

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.History
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.data.model.User
import com.shop.shoes.project.data.source.Repository
import kotlinx.coroutines.launch

class HistoryViewModel(application: Application, private val repository: Repository) :
    AndroidViewModel(application) {
    private val _histories = MutableLiveData<List<History>>(emptyList())
    val histories = _histories

    private val _details = MutableLiveData<List<Cart>>(emptyList())
    var details = _details
    fun getHistory() {
        viewModelScope.launch {
            try {
                val response = repository.getHistory()
                _histories.postValue(response)
            } catch (e: Exception) {
                _histories.postValue(emptyList())
            }
        }
    }

    fun setCurrentDetail(list: List<Cart>) {
        _details.postValue(list)
    }
}