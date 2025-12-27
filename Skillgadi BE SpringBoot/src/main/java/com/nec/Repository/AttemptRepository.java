package com.nec.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nec.Entity.Attempt;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {

    // ✅ CORRECT QUERY (uses quizId column)
    @Query("""
        SELECT a
        FROM Attempt a
        WHERE a.quizId = :quizId
        ORDER BY a.score DESC
    """)
    List<Attempt> findLeaderboardByQuizId(@Param("quizId") Long quizId);
}
