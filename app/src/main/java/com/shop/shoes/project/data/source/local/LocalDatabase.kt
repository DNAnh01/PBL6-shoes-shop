package com.shop.shoes.project.data.source.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.shop.shoes.project.data.model.Test

@Database(
    entities = [
        Test::class
    ],
    version = 1,
    exportSchema = false
)
abstract class LocalDatabase : RoomDatabase() {
    abstract fun localDao(): LocalDao

}