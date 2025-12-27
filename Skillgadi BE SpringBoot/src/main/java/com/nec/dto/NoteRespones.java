package com.nec.dto;

import com.nec.Entity.Note;

class NoteResponses {

        public Long noteId;
        public String title;
        public String description;
        public String price;

        public NoteResponses(Note note) {
            this.noteId = note.getNoteId();
            this.title = note.getTitle();
            this.description = note.getDescription();
            this.price = note.getPrice().toString();
        }
    }