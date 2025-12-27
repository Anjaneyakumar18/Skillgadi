package com.nec.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nec.Entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByIsActiveTrue();
    
    List<Note> findByTitleContainingIgnoreCase(String title);
    
    
    Optional<Note> findByTitle(String title);

    
    
    List<Note> findTop5ByIsActiveTrueOrderByCreatedAtDesc();

    // Search notes by title (case-insensitive)
    @Query("""
        SELECT n FROM Note n
        WHERE n.isActive = true
        AND LOWER(n.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Note> searchNotesIgnoreCase(String keyword);

}
