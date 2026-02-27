package com.studymaterial.platform.repository;

import com.studymaterial.platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByCollegeId(String collegeId);

    boolean existsByCollegeId(String collegeId);

    Optional<User> findByEmail(String email);

    Optional<User> findByGoogleId(String googleId);

    Optional<User> findByVerificationToken(String token);

    boolean existsByEmail(String email);
}
