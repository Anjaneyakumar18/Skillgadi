package com.nec.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nec.Entity.Attempt;
import com.nec.Repository.AttemptRepository;

@Service
public class AttemptService {

    @Autowired
    private AttemptRepository attemptRepository;

    // ✅ Get leaderboard for a quiz
    public List<Attempt> getLeaderboard(Long quizId) {
        return attemptRepository.findLeaderboardByQuizId(quizId);
    }
}
