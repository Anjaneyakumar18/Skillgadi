package com.nec.Controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nec.Entity.Note;
import com.nec.Service.BuyNotesService;
import com.nec.Service.EmailService;
import com.nec.Service.RazorpayService;
import com.razorpay.Utils;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BuyNotesService buyNotesService;

    @Value("${razorpay.key.secret}")
    private String secret;

    @PostMapping(value = "/create-order", produces = "application/json")
    public ResponseEntity<String> createOrder(
            @RequestBody Map<String, Object> data
    ) throws Exception {

        BigDecimal amount =
            new BigDecimal(data.get("amount").toString());

        return ResponseEntity.ok(
            razorpayService.createOrder(amount).toString()
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(
            @RequestBody Map<String, Object> data
    ) throws Exception {

        String orderId = (String) data.get("razorpay_order_id");
        String paymentId = (String) data.get("razorpay_payment_id");
        String signature = (String) data.get("razorpay_signature");

        String payload = orderId + "|" + paymentId;

        boolean valid = Utils.verifySignature(
            payload, signature, secret.trim()
        );

        if (!valid) {
            return ResponseEntity.badRequest().body("PAYMENT FAILED");
        }

        if (Boolean.parseBoolean(data.get("mail").toString())) {
            String email = (String) data.get("email");
            String notes = (String) data.get("notes");
            BigDecimal amount =
                new BigDecimal(data.get("amount").toString());

            emailService.sendNotesMail(email, notes, "PRIVATE_LINK");
            buyNotesService.insertIntoDb(email, notes, amount);
        }

        return ResponseEntity.ok("PAYMENT VERIFIED & SUCCESS");
    }
}
