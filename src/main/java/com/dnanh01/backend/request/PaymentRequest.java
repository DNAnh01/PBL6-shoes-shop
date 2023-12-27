package com.dnanh01.backend.request;

public class PaymentRequest {
    private Long currentOrderId;

    public PaymentRequest() {
    }

    public PaymentRequest(Long currentOrderId) {
        this.currentOrderId = currentOrderId;
    }

    public Long getCurrentOrderId() {
        return currentOrderId;
    }

    public void setCurrentOrderId(Long currentOrderId) {
        this.currentOrderId = currentOrderId;
    }

}