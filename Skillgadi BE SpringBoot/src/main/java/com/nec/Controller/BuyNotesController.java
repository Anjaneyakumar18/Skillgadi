//package com.nec.Controller;
//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.nec.Service.BuyNotesService;
//import com.nec.Service.EmailService;
//import com.razorpay.Utils;
//
//@RestController
//@RequestMapping("/payments/notes")
//public class BuyNotesController {
//
//    @Autowired 
//    private BuyNotesService buyNotesService;
//
//    @Autowired
//    private EmailService emailService;
//
//    @Value("${razorpay.key.secret}")
//    private String secret;
//
//    // ✅ TEST MAIL
//    @GetMapping("/try-mail")
//    public void sendMail() throws Exception {
//        emailService.sendNotesMail(
//            "asrithakajjayam@gmail.com",
//            "Nimmakai Ashok notes",
//            "https://drive.google.com/file/d/1MHBb-8nXIbCAzP0tzQN4QccbTuFdePR8/view"
//        );
//    }
//
//    // ✅ CREATE ORDER (FIXED)
//    @PostMapping(
//    	    value = "/create-order",
//    	    consumes = "application/json",
//    	    produces = "application/json"
//    	)
//    public ResponseEntity<String> createOrder(
//            @RequestBody Map<String, Object> data
//    ) throws Exception {
//    	for(int i=0;i<=10;i++) {
//    		System.out.println("resged notes payments");
//    	}
//
//        Long amount = Long.valueOf(data.get("amount").toString());
//        String email = data.get("email").toString();
//        String notes = data.get("notes").toString();
//        String link  = data.get("link").toString();
//
//        return ResponseEntity.ok(
//            buyNotesService.createOrder(amount, email, notes, link).toString()
//        );
//    }
//
//    // ✅ VERIFY PAYMENT (ALREADY GOOD)
//    @PostMapping("/verify")
//    public ResponseEntity<String> verify(@RequestBody Map<String, String> data)
//            throws Exception {
//
//        String orderId = data.get("razorpay_order_id");
//        String paymentId = data.get("razorpay_payment_id");
//        String signature = data.get("razorpay_signature");
//
//        if (orderId == null || paymentId == null || signature == null) {
//            return ResponseEntity.badRequest().body("INVALID RESPONSE");
//        }
//
//        String payload = orderId + "|" + paymentId;
//
//        boolean valid = Utils.verifySignature(payload, signature, secret);
//
//        if (valid) {
//        	emailService.sendNotesMail(
//                    data.get("email"),
//                    data.get("notes"),
//                    data.get("link")
//                );
//            return ResponseEntity.ok("PAYMENT VERIFIED & SUCCESS");
//        }
//        return ResponseEntity.badRequest().body("PAYMENT FAILED");
//    }
//            
//
//          
//}
