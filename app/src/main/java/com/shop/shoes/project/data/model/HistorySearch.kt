package com.shop.shoes.project.data.model

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "history")
data class HistorySearch(
    @ColumnInfo(name = "id")
    @PrimaryKey(autoGenerate = true)
    var id: Int = 0,
    @ColumnInfo(name = "startStation")
    var startStation: Int,
    @ColumnInfo(name = "endStation")
    var endStation: Int,
    @ColumnInfo(name= "startDate")
    var startDate: String,
    @ColumnInfo(name= "endDate")
    var endDate: String
)