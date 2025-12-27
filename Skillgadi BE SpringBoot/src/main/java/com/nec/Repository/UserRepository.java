package com.nec.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nec.Entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

	

    Optional<User> findByEmail(String email);

    Page<User> findAllByOrderByUserIdDesc(Pageable pageable);

	boolean existsByEmail(String email);
}
