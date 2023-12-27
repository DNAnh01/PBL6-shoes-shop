
package com.dnanh01.backend.dto;

public class SingleStatsDto<T> {
    public static final String VALUE = "value";

    private String title;
    private T value;
    private String color;
    private String icon;

    public SingleStatsDto() {
    }

    public SingleStatsDto(String title, T value, String color, String icon) {
        this.title = title;
        this.value = value;
        this.color = color;
        this.icon = icon;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

}