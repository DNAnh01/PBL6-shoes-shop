object Dependencies {

    object Kotlin {
        const val stdlib = "org.jetbrains.kotlin:kotlin-stdlib-jdk8:${Versions.kotlin}"
    }

    object AndroidX {
        const val appCompat = "androidx.appcompat:appcompat:${Versions.appcompat}"
        const val coreKtx = "androidx.core:core-ktx:${Versions.coreKtx}"
        const val material = "com.google.android.material:material:${Versions.material}"
        const val constraintLayout =
            "androidx.constraintlayout:constraintlayout:${Versions.constraintLayout}"
        const val viewBinding = "androidx.databinding:viewbinding:7.4.0"

        const val lifecycleViewModel = "androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.1"
        const val lifecycleLiveData = "androidx.lifecycle:lifecycle-livedata-ktx:2.4.1"
        const val lifecycleJv8 = "androidx.lifecycle:lifecycle-common-java8:2.4.1"
        const val lificycleExt = "androidx.lifecycle:lifecycle-extensions:2.2.0"
        const val lifecycleCpl = "androidx.lifecycle:lifecycle-compiler:2.4.1"
        const val lifecycleScope = "androidx.lifecycle:lifecycle-runtime-ktx:2.4.1"

        const val room = "androidx.room:room-runtime:${Versions.room}"
        const val roomCompiler = "androidx.room:room-compiler:${Versions.room}"
        const val roomKtx = "androidx.room:room-ktx:${Versions.room}"

        const val recyclerViewSelection = "androidx.recyclerview:recyclerview-selection:1.0.0"

        const val swipeLayout = "androidx.swiperefreshlayout:swiperefreshlayout:1.1.0"

        const val textBlock = "com.google.android.gms:play-services-mlkit-text-recognition:18.0.2"
    }

    object Dragger2 {
        const val dragger2 = "com.google.dagger:dagger:2.35.1"
        const val draggerSp = "com.google.dagger:dagger-android:2.35.1"
        const val draggerAsp = "com.google.dagger:dagger-android-support:2.25.2"
        const val draggerProcessor = "com.google.dagger:dagger-android-processor:2.25.2"
        const val draggerCompiler = "com.google.dagger:dagger-compiler:2.25.2"
        const val javax = "org.glassfish:javax.annotation:10.0-b28"
    }

    object Retrofit {
        const val gson = "com.google.code.gson:gson:2.8.7"
        const val retrofit2 = "com.squareup.retrofit2:retrofit:2.9.0"
        const val retrofitConverter = "com.squareup.retrofit2:converter-gson:2.9.0"
        const val okhttp3 = "com.squareup.okhttp3:logging-interceptor:4.10.0"
        const val converterScalars = "com.squareup.retrofit2:converter-scalars:2.9.0"
    }

    object MultiDex {
        const val multiDex = "androidx.multidex:multidex:${Versions.multiDex}"
    }

    object Koin {
        const val koinCore = "io.insert-koin:koin-core:${Versions.koin}"
        const val koinAndroid = "io.insert-koin:koin-android:${Versions.koin}"
    }

    object Pref {
        const val kotPref = "com.chibatching.kotpref:kotpref:2.13.1"
        const val kotPrefEnum = "com.chibatching.kotpref:enum-support:2.13.1"
    }

    object Other {
        const val dotsindicator = "com.tbuonomo:dotsindicator:4.3"
        const val lottie = "com.airbnb.android:lottie:6.0.1"
        const val glide = "com.github.bumptech.glide:glide:4.16.0"
    }

}