package com.nec.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nec.Entity.Note;
import com.nec.Entity.NotePayment;
import com.nec.Entity.User;

public interface NotePaymentRepository
        extends JpaRepository<NotePayment, Long> {

    // Payments for a note
    List<NotePayment> findByNoteAndPaymentStatus(
            Note note,
            NotePayment.PaymentStatus status
    );

    // Revenue for notes (time-based)
    @Query("""
        SELECT COALESCE(SUM(n.amount), 0)
        FROM NotePayment n
        WHERE n.paymentStatus = 'SUCCESS'
        AND n.paymentTime >= :from
    """)
    BigDecimal getRevenueFromDate(LocalDateTime from);
    
    boolean existsByUserAndNoteAndPaymentStatus(
            User user,
            Note note,
            NotePayment.PaymentStatus status
        );
    
    
    
}
