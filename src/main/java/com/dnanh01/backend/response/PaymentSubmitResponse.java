package com.dnanh01.backend.response;

public class PaymentSubmitResponse {
    private String vnpayUrl;
    private Long orderId;
	public String getVnpayUrl() {
		return vnpayUrl;
	}
	public void setVnpayUrl(String vnpayUrl) {
		this.vnpayUrl = vnpayUrl;
	}
	
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public PaymentSubmitResponse(String vnpayUrl, String jwt, Long orderId) {
		super();
		this.vnpayUrl = vnpayUrl;
		this.orderId = orderId;
	}
    
  

}