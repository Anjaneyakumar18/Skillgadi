package com.nec.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nec.Entity.Attempt;
import com.nec.Service.AttemptService;

@RestController
@RequestMapping("/attempt")
public class AttemptController {

    @Autowired
    private AttemptService attemptService;

    // 🔥 LEADERBOARD API
    // GET /attempt/leaderboard?quizId=13
    @GetMapping("/leaderboard")
    public List<Attempt> leaderboard(@RequestParam Long quizId) {
        return attemptService.getLeaderboard(quizId);
    }
}
