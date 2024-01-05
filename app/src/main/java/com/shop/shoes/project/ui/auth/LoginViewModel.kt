package com.shop.shoes.project.ui.auth

import android.app.Application
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.Auth
import com.shop.shoes.project.data.model.User
import com.shop.shoes.project.data.source.Repository
import com.shop.shoes.project.utils.Pref
import com.shop.shoes.project.utils.Pref.context
import kotlinx.coroutines.launch
class LoginViewModel(application: Application, private val repository: Repository) :  AndroidViewModel(application){
    fun signIn(auth: Auth, listener: () -> Unit){
        viewModelScope.launch {
            try {
                val response = repository.signIn(auth)
                if(response.jwt != ""){
                    Toast.makeText(context, context.getString(R.string.sign_in_success), Toast.LENGTH_LONG).show()
                    Pref.accessToken = response.jwt
                    listener.invoke()
                }else{
                    Toast.makeText(context, context.getString(R.string.account_or_password_is_incorrect), Toast.LENGTH_LONG).show()
                }
            }catch (e: Exception){
                Toast.makeText(context, context.getString(R.string.account_is_not_exists), Toast.LENGTH_LONG).show()
            }
        }
    }

    fun signUp(auth: User, listener: () -> Unit){
        viewModelScope.launch {
            try {
                val response = repository.signUp(auth)
                if(response.jwt != ""){
                    Toast.makeText(context, context.getString(R.string.sign_up_success), Toast.LENGTH_LONG).show()
                    listener.invoke()
                }else{
                    Toast.makeText(context, context.getString(R.string.account_or_password_is_incorrect), Toast.LENGTH_LONG).show()
                }
            }catch (e: Exception){
                Toast.makeText(context, context.getString(R.string.register_error), Toast.LENGTH_LONG).show()
            }
        }
    }
}