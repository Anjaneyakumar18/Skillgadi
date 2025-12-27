package com.nec.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.nec.Entity.Note;
import com.nec.Repository.NoteRepository;

@RestController
@RequestMapping("/api/notes")
public class UsersNotesController {

    private final NoteRepository noteRepository;

    public UsersNotesController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    /* ===============================
       GET 5 RECENT ACTIVE NOTES
       =============================== */
    @GetMapping("/recent")
    public List<Note> getRecentNotes() {
        return noteRepository
                .findTop5ByIsActiveTrueOrderByCreatedAtDesc();
    }

    /* ===============================
       SEARCH NOTES (IGNORE CASE)
       =============================== */
    @GetMapping("/search")
    public List<Note> searchNotes(
            @RequestParam String keyword
    ) {
        return noteRepository
                .searchNotesIgnoreCase(keyword);
    }

    /* ===============================
       RESPONSE DTO (HIDES driveLink)
       =============================== */
    
}
