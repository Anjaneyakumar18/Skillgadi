package com.nec.Service;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class RazorpayService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    public JSONObject createOrder(BigDecimal amount) throws Exception {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject req = new JSONObject();
        req.put("amount", amount.multiply(BigDecimal.valueOf(100))); // ₹1000
        req.put("currency", "INR");
        req.put("receipt", "receipt_001");

        Order order = client.orders.create(req);
        System.out.println("ORDER CREATED: " + order.toString());

        return order.toJson();
    }
}
