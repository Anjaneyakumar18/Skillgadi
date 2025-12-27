package com.nec.dto;

import java.math.BigDecimal;

public record NoteResponse(
        Long noteId,
        String title,
        BigDecimal price,
        Boolean isActive
) {}
