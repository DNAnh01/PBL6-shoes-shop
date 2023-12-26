import java.io.FileInputStream
import java.util.Properties

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("kotlin-kapt")
    id("kotlin-parcelize")
}

android {
    compileSdk = 34

    defaultConfig {
        applicationId = "com.shop.shoes.project"
        minSdk = 24
        targetSdk = 34
        multiDexEnabled = true
        versionCode = 1
        versionName = "1.0"
        vectorDrawables.useSupportLibrary = true
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    val keystorePropertiesFile = rootProject.file("keystore.properties")

    // Initialize a new Properties() object called keystoreProperties.
    val keystoreProperties = Properties()

    // Load your keystore.properties file into the keystoreProperties object.
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))

    signingConfigs {
        create("release") {
            keyAlias = keystoreProperties["keyAlias"] as String?
            keyPassword = keystoreProperties["keyPassword"] as String?
            storeFile = keystoreProperties["storeFile"]?.let { file(it) }
            storePassword = keystoreProperties["storePassword"] as String?
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
        getByName("debug") {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            isDebuggable = true
        }
    }

    sourceSets {
        getByName("debug") {
            java.srcDir("src/debug/kotlin")
        }
        getByName("main") {
            java.srcDir("src/main/kotlin")
        }
        getByName("release") {
            java.srcDir("src/release/kotlin")
        }
    }

    testOptions { // <-- You need this
        unitTests {
            isReturnDefaultValues = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    lintOptions.isAbortOnError = false

    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation(Dependencies.AndroidX.coreKtx)
    implementation(Dependencies.AndroidX.appCompat)
    implementation(Dependencies.AndroidX.material)
    implementation(Dependencies.AndroidX.constraintLayout)
    implementation(Dependencies.AndroidX.viewBinding)
    implementation(Dependencies.AndroidX.lifecycleViewModel)
    implementation(Dependencies.AndroidX.lifecycleScope)
    implementation(Dependencies.AndroidX.lifecycleLiveData)
    implementation(Dependencies.AndroidX.lifecycleJv8)
    implementation(Dependencies.AndroidX.lificycleExt)
    implementation("androidx.navigation:navigation-fragment-ktx:2.7.5")
    implementation("androidx.navigation:navigation-ui-ktx:2.7.5")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.10.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    annotationProcessor(Dependencies.AndroidX.lifecycleCpl)

    implementation(Dependencies.AndroidX.textBlock)

    implementation(Dependencies.AndroidX.room)
    annotationProcessor(Dependencies.AndroidX.roomCompiler)
    implementation(Dependencies.AndroidX.roomKtx)
    kapt(Dependencies.AndroidX.roomCompiler)

    implementation(Dependencies.AndroidX.recyclerViewSelection)

    implementation(Dependencies.AndroidX.swipeLayout)

    implementation(Dependencies.Dragger2.dragger2)
    implementation(Dependencies.Dragger2.draggerSp)
    implementation(Dependencies.Dragger2.draggerAsp)
    kapt(Dependencies.Dragger2.draggerProcessor)
    kapt(Dependencies.Dragger2.draggerCompiler)
    compileOnly(Dependencies.Dragger2.javax)

    implementation(Dependencies.Retrofit.gson)
    implementation(Dependencies.Retrofit.retrofit2)
    implementation(Dependencies.Retrofit.retrofitConverter)
    implementation(Dependencies.Retrofit.okhttp3)
    implementation(Dependencies.Retrofit.converterScalars)

    implementation(Dependencies.MultiDex.multiDex)

    implementation(Dependencies.Koin.koinCore)
    implementation(Dependencies.Koin.koinAndroid)

    implementation(Dependencies.Pref.kotPref)
    implementation(Dependencies.Pref.kotPrefEnum)

    implementation(Dependencies.Other.lottie)
    implementation(Dependencies.Other.dotsindicator)
    implementation(Dependencies.Other.glide)
}