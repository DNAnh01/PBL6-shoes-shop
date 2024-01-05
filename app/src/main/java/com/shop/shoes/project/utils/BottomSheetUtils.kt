package com.shop.shoes.project.utils

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.shop.shoes.project.R
import com.shop.shoes.project.data.model.BodyCart
import com.shop.shoes.project.data.model.BodyChangePass
import com.shop.shoes.project.data.model.Cart
import com.shop.shoes.project.data.model.Product
import com.shop.shoes.project.data.model.Size
import com.shop.shoes.project.data.model.SizeShow
import com.shop.shoes.project.databinding.BottomSheetCartBinding
import com.shop.shoes.project.databinding.BottomSheetPassBinding
import com.shop.shoes.project.ui.main.ShareViewModel
import com.shop.shoes.project.ui.main.account.InfoViewModel
import com.shop.shoes.project.ui.main.cart.SizeAdapter

object BottomSheetUtils {
    private var sizeSelect = ""
    fun showBottomAddCart(context: Context, product: Product, viewModel: ShareViewModel) {
        val listSize = getListSizeShow(product.sizes)
        val sizeAdapter = SizeAdapter(listSize) { pos ->
            listSize.forEach {
                if (listSize[pos].quantity > 0) {
                    it.isSelected = it == listSize[pos]
                    sizeSelect = listSize[pos].size
                }
            }
        }
        val bottomSheetBinding = BottomSheetCartBinding.inflate(LayoutInflater.from(context))
        val bottomSheetDialog = BottomSheetDialog(context)
        bottomSheetDialog.setContentView(bottomSheetBinding.root)
        bottomSheetBinding.run {
            rvSize.run {
                layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
                adapter = sizeAdapter
            }
            btnSave.setOnClickListener {
                viewModel.addNewCart(
                    BodyCart(
                        productId = product.id,
                        quantity = tvQuality.text.toString().toInt(),
                        size = sizeSelect,
                        color = product.color
                    )
                ) {
                    bottomSheetDialog.dismiss()
                }
            }
            btnCancel.setOnClickListener {
                bottomSheetDialog.dismiss()
            }
            btnMinus.setOnClickListener {
                tvQuality.text =
                    changeQuality(tvQuality.text.toString(), isPlus = false, isEdit = false)
                if (tvQuality.text == "1") btnMinus.visibility = View.INVISIBLE
            }
            btnAdd.setOnClickListener {
                tvQuality.text =
                    changeQuality(tvQuality.text.toString(), isPlus = true, isEdit = false)
                btnMinus.visibility = View.VISIBLE
            }
        }
        bottomSheetDialog.show()
    }

    fun showBottomEditCart(context: Context, cart: Cart, viewModel: ShareViewModel) {
        val listSize = getListSizeShow(cart.product!!.sizes)
        sizeSelect = cart.size
        listSize.forEach {
            it.isSelected = it.size == cart.size
        }
        val sizeAdapter = SizeAdapter(listSize) { pos ->
            listSize.forEach {
                if (listSize[pos].quantity > 0) {
                    it.isSelected = it == listSize[pos]
                    sizeSelect = listSize[pos].size
                }
            }
        }
        val bottomSheetBinding = BottomSheetCartBinding.inflate(LayoutInflater.from(context))
        val bottomSheetDialog = BottomSheetDialog(context)
        bottomSheetDialog.setContentView(bottomSheetBinding.root)
        bottomSheetBinding.run {
            rvSize.run {
                layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
                adapter = sizeAdapter
            }
            tvQuality.text = cart.quantity.toString()
            if (tvQuality.text == "0") {
                btnMinus.visibility = View.INVISIBLE
                btnSave.text = context.getText(R.string.delete)
            } else {
                btnMinus.visibility = View.VISIBLE
            }
            btnSave.setOnClickListener {
                if (tvQuality.text.toString().toInt() != 0) {
                    viewModel.updateCart(
                        cartId = cart.id!!,
                        cart = BodyCart(
                            productId = cart.product!!.id,
                            quantity = tvQuality.text.toString().toInt(),
                            size = sizeSelect,
                            color = cart.product!!.color
                        )
                    ) {
                        bottomSheetDialog.dismiss()
                    }
                } else {
                    viewModel.deleteCart(cart.id!!) { bottomSheetDialog.dismiss() }
                }
            }
            btnCancel.setOnClickListener {
                bottomSheetDialog.dismiss()
            }
            btnMinus.setOnClickListener {
                tvQuality.text =
                    changeQuality(tvQuality.text.toString(), isPlus = false, isEdit = true)
                if (tvQuality.text == "0") {
                    btnMinus.visibility = View.INVISIBLE
                    btnSave.text = context.getText(R.string.delete)
                }
            }
            btnAdd.setOnClickListener {
                tvQuality.text =
                    changeQuality(tvQuality.text.toString(), isPlus = true, isEdit = true)
                btnMinus.visibility = View.VISIBLE
                btnSave.text = context.getText(R.string.save)
            }
        }
        bottomSheetDialog.show()
    }

    fun showBottomChangePass(context: Context, viewModel: InfoViewModel) {
        val bottomSheetBinding = BottomSheetPassBinding.inflate(LayoutInflater.from(context))
        val bottomSheetDialog = BottomSheetDialog(context)
        bottomSheetDialog.setContentView(bottomSheetBinding.root)
        bottomSheetBinding.run {
            cbShowPass.setOnCheckedChangeListener { _, isChecked ->
                Utils.showCharactersEDT(edtOld, isChecked)
                Utils.showCharactersEDT(edtNew, isChecked)
            }
            btnSave.setOnClickListener {
                if (edtNew.text.toString().trim() == "" || edtOld.text.toString().trim() == "") {
                    Toast.makeText(
                        context,
                        context.getString(R.string.please_enter_enough_information),
                        Toast.LENGTH_SHORT
                    ).show()
                } else if (edtNew.text.toString().trim() == edtOld.text.toString().trim()) {
                    Toast.makeText(
                        context,
                        context.getString(R.string.please_enter_different_values),
                        Toast.LENGTH_SHORT
                    ).show()
                } else {
                    viewModel.changePass(
                        BodyChangePass(
                            oldPass = edtOld.text.toString().trim(),
                            newPassword = edtNew.text.toString().trim()
                        )
                    ) { bottomSheetDialog.dismiss() }
                }
            }
            btnCancel.setOnClickListener {
                bottomSheetDialog.dismiss()
            }
        }
        bottomSheetDialog.show()
    }

    private fun getListSizeShow(list: List<Size>): List<SizeShow> {
        var isSelected = false
        val sizes = mutableListOf<SizeShow>()
        for (i in list.indices) {
            if (list[i].quantity == 0 || isSelected) {
                sizes.add(
                    SizeShow(size = list[i].name, isSelected = false, quantity = list[i].quantity)
                )
            } else {
                sizes.add(
                    SizeShow(size = list[i].name, isSelected = true, quantity = list[i].quantity)
                )
                sizeSelect = list[i].name
                isSelected = true
            }
        }
        return sizes
    }

    private fun changeQuality(quality: String, isPlus: Boolean, isEdit: Boolean): String {
        return try {
            val newData = if (isPlus) {
                quality.toInt() + 1
            } else {
                quality.toInt() - 1
            }
            if (newData < 1) {
                if (isEdit) "0" else "1"
            } else {
                "$newData"
            }
        } catch (e: Exception) {
            if (isEdit) "0" else "1"
        }
    }
}