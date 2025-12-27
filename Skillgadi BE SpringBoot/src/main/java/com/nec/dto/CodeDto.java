package com.nec.dto;

public class CodeDto {
    private Long codeId;
    private String name;

    public CodeDto(Long codeId, String name) {
        this.codeId = codeId;
        this.name = name;
    }

    public Long getCodeId() {
        return codeId;
    }

    public String getName() {
        return name;
    }
}
