package com.shop.shoes.project.utils

import android.content.Context
import android.text.method.PasswordTransformationMethod
import android.widget.EditText
import com.google.gson.Gson
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.ui.main.ShareViewModel
import com.shop.shoes.project.ui.main.account.InfoViewModel
import java.text.SimpleDateFormat
import java.util.Locale

object Utils {

    fun convertProductToJson(product: Product): String {
        val gson = Gson()
        return gson.toJson(product)
    }

    fun convertJsonToProduct(json: String): Product {
        val gson = Gson()
        return gson.fromJson(json, Product::class.java)
    }

    fun convertDateFormat(inputDate: String): String {
        val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS", Locale.getDefault())
        val outputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
        val date = inputFormat.parse(inputDate)
        return if (date != null) {
            outputFormat.format(date)
        } else {
            inputDate
        }
    }

    fun showBottomAddCart(context: Context, product: Product, viewModel: ShareViewModel) {
        BottomSheetUtils.showBottomAddCart(context, product, viewModel)
    }

    fun showBottomEditCart(context: Context, cart: Cart, viewModel: ShareViewModel) {
        BottomSheetUtils.showBottomEditCart(context, cart, viewModel)
    }

    fun showCharactersEDT(edt: EditText, isShow: Boolean) {
        edt.run {
            if (isShow) {
                inputType =
                    android.text.InputType.TYPE_CLASS_TEXT or android.text.InputType.TYPE_TEXT_VARIATION_NORMAL
                transformationMethod = null
            } else {
                inputType =
                    android.text.InputType.TYPE_CLASS_TEXT or android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD
                transformationMethod = PasswordTransformationMethod.getInstance()
            }
        }
    }

    fun showBottomChangePass(context: Context, viewModel: InfoViewModel) {
        BottomSheetUtils.showBottomChangePass(context, viewModel)
    }

    fun isValidPhoneNumber(phoneNumber: String): Boolean {
        val phoneRegex = Regex("^0\\d{9}$")
        return phoneRegex.matches(phoneNumber)
    }
}