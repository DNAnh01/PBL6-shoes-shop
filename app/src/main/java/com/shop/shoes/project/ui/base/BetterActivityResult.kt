package com.shop.shoes.project.ui.base

import android.content.Intent
import androidx.activity.result.ActivityResult
import androidx.activity.result.ActivityResultCaller
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContract
import androidx.activity.result.contract.ActivityResultContracts

class BetterActivityResult<Input, Result> private constructor(
    caller: ActivityResultCaller,
    contract: ActivityResultContract<Input, Result>,
    private var onActivityResult: OnActivityResult<Result>?
) {
    interface OnActivityResult<O> {
        fun onActivityResult(result: O)
    }

    private val launcher: ActivityResultLauncher<Input>

    init {
        launcher = caller.registerForActivityResult(
            contract
        ) { result: Result -> callOnActivityResult(result) }
    }

    fun setOnActivityResult(onActivityResult: OnActivityResult<Result>?) {
        this.onActivityResult = onActivityResult
    }

    @JvmOverloads
    fun launch(input: Input, onActivityResult: OnActivityResult<Result>? = this.onActivityResult) {
        if (onActivityResult != null) {
            this.onActivityResult = onActivityResult
        }
        launcher.launch(input)
    }

    private fun callOnActivityResult(result: Result) {
        if (onActivityResult != null) onActivityResult!!.onActivityResult(result)
    }

    companion object {
        fun <Input, Result> registerForActivityResult(
            caller: ActivityResultCaller,
            contract: ActivityResultContract<Input, Result>,
            onActivityResult: OnActivityResult<Result>?
        ): BetterActivityResult<Input, Result> {
            return BetterActivityResult(caller, contract, onActivityResult)
        }

        fun <Input, Result> registerForActivityResult(
            caller: ActivityResultCaller,
            contract: ActivityResultContract<Input, Result>
        ): BetterActivityResult<Input, Result> {
            return registerForActivityResult(caller, contract, null)
        }

        fun registerActivityForResult(
            caller: ActivityResultCaller
        ): BetterActivityResult<Intent, ActivityResult> {
            return registerForActivityResult<Intent, ActivityResult>(
                caller,
                ActivityResultContracts.StartActivityForResult()
            )
        }
    }
}