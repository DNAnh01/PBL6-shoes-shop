package com.shop.shoes.project.data.source.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.shop.shoes.project.data.model.HistorySearch

@Database(
    entities = [
        HistorySearch::class
    ],
    version = 1,
    exportSchema = false
)
abstract class LocalDatabase : RoomDatabase() {
    abstract fun localDao(): LocalDao

}