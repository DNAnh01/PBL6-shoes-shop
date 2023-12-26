package com.shop.shoes.project.utils

import com.chibatching.kotpref.KotprefModel

object Pref : KotprefModel() {
    var accessToken by stringPref("")
    var userName by stringPref("")
}
