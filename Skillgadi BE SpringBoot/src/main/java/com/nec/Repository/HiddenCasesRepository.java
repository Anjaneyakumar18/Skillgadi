package com.nec.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nec.Entity.HiddenCases;

public interface HiddenCasesRepository extends JpaRepository<HiddenCases, Long> {

    List<HiddenCases> findByCode_CodeId(Long codeId);
}
