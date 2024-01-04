package com.shop.shoes.project.ui.main.account

import android.app.Application
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.BodyChangePass
import com.shop.shoes.project.data.model.BodyInfo
import com.shop.shoes.project.data.model.User
import com.shop.shoes.project.data.source.Repository
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Pref.context
import kotlinx.coroutines.launch

class InfoViewModel(application: Application, private val repository: Repository) :
    AndroidViewModel(application) {
    private val _user = MutableLiveData<User?>(null)
    val user = _user
    fun getInfo() {
        viewModelScope.launch {
            try {
                val response = repository.getInfo()
                _user.postValue(response)
            } catch (e: Exception) {
                _user.postValue(null)
                Toast.makeText(
                    context,
                    context.getString(R.string.get_info_fail),
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    fun changePass(body: BodyChangePass, listener: () -> Unit) {
        viewModelScope.launch {
            try {
                val response = repository.changePass(body)
                Toast.makeText(context, response, Toast.LENGTH_SHORT).show()
                if (response.contains("successfully")) {
                    listener.invoke()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    context,
                    context.getString(R.string.something_wrong),
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    fun changeInfo(body: BodyInfo) {
        viewModelScope.launch {
            try {
                val response = repository.changeInfo(body)
                if (response.email == _user.value!!.email) {
                    Toast.makeText(context, "Change success", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(context, "Change false", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    context,
                    context.getString(R.string.something_wrong),
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }
}