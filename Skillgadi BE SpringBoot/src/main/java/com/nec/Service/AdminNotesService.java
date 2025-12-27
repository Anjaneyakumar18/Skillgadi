package com.nec.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nec.dto.NoteResponse;
import com.nec.dto.NoteRevenueResponse;
import com.nec.Entity.Note;
import com.nec.Repository.NotePaymentRepository;
import com.nec.Repository.NoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminNotesService {

    private final NoteRepository noteRepository;
    private final NotePaymentRepository notePaymentRepository;

    /* ===== Notes CRUD ===== */

    public Note addNote(Note note) {
        return noteRepository.save(note);
    }

    public List<NoteResponse> getAllNotes() {
        return noteRepository.findAll()
                .stream()
                .map(n -> new NoteResponse(
                        n.getNoteId(),
                        n.getTitle(),
                        n.getPrice(),
                        n.getIsActive()
                ))
                .toList();
    }

    public void disableNote(Long noteId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow();
        note.setIsActive(false);
        noteRepository.save(note);
    }

    /* ===== Revenue ===== */

    public NoteRevenueResponse getRevenueByPeriod(LocalDateTime from) {
        BigDecimal revenue =
                notePaymentRepository.getRevenueFromDate(from);
        return new NoteRevenueResponse(revenue);
    }
}
