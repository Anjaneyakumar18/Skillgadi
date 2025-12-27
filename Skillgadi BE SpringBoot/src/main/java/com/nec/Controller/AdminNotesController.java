package com.nec.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nec.dto.NoteResponse;
import com.nec.dto.NoteRevenueResponse;
import com.nec.Entity.Note;
import com.nec.Repository.NoteRepository;
import com.nec.Service.AdminNotesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/notes")
@RequiredArgsConstructor
public class AdminNotesController {

    private final AdminNotesService adminNotesService;
    
    @Autowired
    NoteRepository noteRepository;

    // Add note
    @PostMapping
    public ResponseEntity<Note> addNote(@RequestBody Note note) {
        return ResponseEntity.ok(
                adminNotesService.addNote(note)
        );
    }

    // View all notes
    @GetMapping
    public ResponseEntity<List<NoteResponse>> getAllNotes() {
        return ResponseEntity.ok(
                adminNotesService.getAllNotes()
        );
    }



    // Notes revenue (time-based)
    @GetMapping("/revenue")
    public ResponseEntity<NoteRevenueResponse> revenueByDate(
            @RequestParam int days
    ) {
        LocalDateTime from =
                LocalDateTime.now().minusDays(days);
        return ResponseEntity.ok(
                adminNotesService.getRevenueByPeriod(from)
        );
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Note>> searchNotes(
            @RequestParam String title
    ) {
        return ResponseEntity.ok(
                noteRepository.findByTitleContainingIgnoreCase(title)
        );
    }

    // 4️⃣ Disable note (stop purchase)
    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableNote(@PathVariable Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setIsActive(false);
        noteRepository.save(note);
        return ResponseEntity.ok().build();
    }

    // 5️⃣ Enable note (allow purchase again)
    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableNote(@PathVariable Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setIsActive(true);
        noteRepository.save(note);
        return ResponseEntity.ok().build();
    }
    
}
