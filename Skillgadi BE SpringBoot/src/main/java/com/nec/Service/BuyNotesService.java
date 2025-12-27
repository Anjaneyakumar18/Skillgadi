package com.nec.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.nec.Entity.Note;
import com.nec.Entity.NotePayment;
import com.nec.Entity.User;
import com.nec.Repository.NotePaymentRepository;
import com.nec.Repository.NoteRepository;
import com.nec.Repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class BuyNotesService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Autowired
    private NotePaymentRepository notePaymentRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public JSONObject createOrder(Long amount) throws Exception {

        RazorpayClient client =
            new RazorpayClient(keyId, keySecret);

        JSONObject req = new JSONObject();
        req.put("amount", amount * 100);
        req.put("currency", "INR");
        req.put("receipt", "notes_" + System.currentTimeMillis());

        Order order = client.orders.create(req);
        return order.toJson();
    }

    public void insertIntoDb(
            String email,
            String noteTitle,
            BigDecimal amount
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Note note = noteRepository.findByTitle(noteTitle)
                .orElseThrow(() ->
                        new RuntimeException("Note not found"));

        boolean alreadyPaid =
                notePaymentRepository
                        .existsByUserAndNoteAndPaymentStatus(
                                user,
                                note,
                                NotePayment.PaymentStatus.SUCCESS
                        );

        if (alreadyPaid) return;

        NotePayment payment = new NotePayment();
        payment.setUser(user);
        payment.setNote(note);
        payment.setAmount(amount);
        payment.setPaymentStatus(
                NotePayment.PaymentStatus.SUCCESS
        );
        payment.setPaymentTime(LocalDateTime.now());
        payment.setEmailSent(true);

        notePaymentRepository.save(payment);
    }
}
