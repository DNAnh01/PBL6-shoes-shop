package com.shop.shoes.project.di

import android.content.Context
import androidx.multidex.BuildConfig
import androidx.room.Room
import com.google.gson.GsonBuilder
import com.shop.shoes.project.data.network.ApiService
import com.shop.shoes.project.data.source.Repository
import com.shop.shoes.project.data.source.local.LocalDataSourceImpl
import com.shop.shoes.project.data.source.local.LocalDatabase
import com.shop.shoes.project.data.source.remote.RemoteDataSourceImpl
import com.shop.shoes.project.ui.auth.LoginViewModel
import com.shop.shoes.project.ui.main.ShareViewModel
import com.shop.shoes.project.ui.main.account.InfoViewModel
import com.shop.shoes.project.ui.main.history.HistoryViewModel
import com.shop.shoes.project.ui.main.purchase.PurchaseViewModel
import com.shop.shoes.project.utils.Constants
import com.shop.shoes.project.utils.Constants.SERVER
import com.shop.shoes.project.utils.Constants.TIME_OUT
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.koin.android.ext.koin.androidApplication
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory
import java.util.concurrent.TimeUnit

val appModule = module {
    viewModel { LoginViewModel(androidApplication(), get()) }
    viewModel { InfoViewModel(androidApplication(), get()) }
    viewModel { PurchaseViewModel(androidApplication(), get()) }
    viewModel { ShareViewModel(androidApplication(), get()) }
    viewModel { HistoryViewModel(androidApplication(), get()) }
    fun appApi(client: OkHttpClient, builder: GsonBuilder): ApiService {
        val retrofitBuilder = Retrofit.Builder()
            .baseUrl(SERVER)
            .addConverterFactory(ScalarsConverterFactory.create())
            .addConverterFactory(GsonConverterFactory.create(builder.create()))
            .client(client)
        val retrofit = retrofitBuilder.build()
        return retrofit.create(ApiService::class.java)
    }

    fun gsonBuilder(): GsonBuilder {
        return GsonBuilder()
    }

    fun provideOkHttpClient(context: Context): OkHttpClient {
        val logging = HttpLoggingInterceptor()
        logging.level =
            if (BuildConfig.DEBUG) HttpLoggingInterceptor.Level.BODY else HttpLoggingInterceptor.Level.NONE

        val builder = OkHttpClient.Builder()
            .addInterceptor(logging)
            .addInterceptor(HttpAuthorization())
            .connectTimeout(TIME_OUT, TimeUnit.MILLISECONDS)
            .writeTimeout(TIME_OUT, TimeUnit.MILLISECONDS)
            .readTimeout(TIME_OUT, TimeUnit.MILLISECONDS)
        return builder.build()
    }

    single {
        Room.databaseBuilder(
            androidApplication(),
            LocalDatabase::class.java,
            Constants.DATABASE_NAME
        ).allowMainThreadQueries().fallbackToDestructiveMigration().build()
    }
    single { appApi(provideOkHttpClient(androidContext()), gsonBuilder()) }
    single { Repository(get(), get()) }
    single { LocalDataSourceImpl(get()) }
    single { RemoteDataSourceImpl(get()) }
}
