package com.nec.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.nec.Entity.Code;
import com.nec.Repository.CodeBasicView;
import com.nec.Repository.CodeRepository;
import com.nec.dto.CodeDto;

@RestController
@RequestMapping("/api/code")
@CrossOrigin
public class CodeController {

    @Autowired
    private CodeRepository codeRepository;

    // Get all coding problems
    @GetMapping
    public List<CodeBasicView> getAllCodes() {
        return codeRepository.findAllBasic();
    }

    // Get problem by ID
    @GetMapping("/{id}")
    public Code getCodeById(@PathVariable Long id) {
        return codeRepository.findById(id).orElse(null);
    }

    // Create new coding problem
    @PostMapping
    public Code createCode(@RequestBody Code code) {
        return codeRepository.save(code);
    }

    // Delete problem
    @DeleteMapping("/{id}")
    public void deleteCode(@PathVariable Long id) {
        codeRepository.deleteById(id);
    }
}
