package com.nec.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.nec.Entity.Code;

public interface CodeRepository extends JpaRepository<Code, Long> {

    @Query("SELECT c.codeId AS codeId, c.name AS name FROM Code c")
    List<CodeBasicView> findAllBasic();
}
