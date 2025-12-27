package com.nec.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.nec.Entity.HiddenCases;
import com.nec.Repository.HiddenCasesRepository;

@RestController
@RequestMapping("/api/hidden-cases")
@CrossOrigin
public class HiddenCasesController {

    @Autowired
    private HiddenCasesRepository hiddenCasesRepository;

    // Get hidden cases for a specific code problem
    @GetMapping("/code/{codeId}")
    public List<HiddenCases> getHiddenCasesByCode(@PathVariable Long codeId) {
        return hiddenCasesRepository.findByCode_CodeId(codeId);
    }

    // Add hidden case
    @PostMapping
    public HiddenCases addHiddenCase(@RequestBody HiddenCases hiddenCase) {
        return hiddenCasesRepository.save(hiddenCase);
    }

    // Delete hidden case
    @DeleteMapping("/{id}")
    public void deleteHiddenCase(@PathVariable Long id) {
        hiddenCasesRepository.deleteById(id);
    }
}
