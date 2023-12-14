package com.dnanh01.backend.request;

import java.time.LocalDateTime;

public class ShippingAddressRequest {

    private String streetAddress;

    private String city;

    private String state;

    private String zipCode;

    public ShippingAddressRequest() {

    }

    public ShippingAddressRequest(String streetAddress, String city, String state, String zipCode) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    @Override
    public String toString() {
        return "ShippingAddressRequest [streetAddress=" + streetAddress + ", city=" + city + ", state=" + state
                + ", zipCode=" + zipCode + "]";
    }

}
