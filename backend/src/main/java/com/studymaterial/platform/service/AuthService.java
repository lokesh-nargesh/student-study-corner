package com.studymaterial.platform.service;

import com.studymaterial.platform.dto.JwtResponse;
import com.studymaterial.platform.dto.LoginRequest;
import com.studymaterial.platform.dto.RegisterRequest;
import com.studymaterial.platform.entity.Role;
import com.studymaterial.platform.entity.User;
import com.studymaterial.platform.repository.*;
import com.studymaterial.platform.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    BranchRepository branchRepository;

    @Autowired
    AcademicYearRepository academicYearRepository;

    @Autowired
    SemesterRepository semesterRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailService emailService;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        // Find user and check if email is verified
        User user = userRepository.findByCollegeId(loginRequest.getCollegeId())
                .orElseThrow(() -> new RuntimeException("User not found"));

//        if (!user.isEmailVerified()) {
//            throw new RuntimeException("Please verify your email before logging in.");
//        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getCollegeId(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getCollegeId(),
                userDetails.getName(),
                userDetails.getRole().name());
    }

    @Transactional
    public String registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByCollegeId(registerRequest.getCollegeId())) {
            throw new RuntimeException("Error: College ID is already taken!");
        }

        if (registerRequest.getEmail() != null && userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        String verificationToken = UUID.randomUUID().toString();

        User user = User.builder()
                .collegeId(registerRequest.getCollegeId())
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(encoder.encode(registerRequest.getPassword()))
                .role(Role.STUDENT)
                .emailVerified(false)
                .verificationToken(verificationToken)
                .course(courseRepository.findById(registerRequest.getCourseId()).orElse(null))
                .branch(branchRepository.findById(registerRequest.getBranchId()).orElse(null))
                .academicYear(academicYearRepository.findById(registerRequest.getAcademicYearId()).orElse(null))
                .semester(semesterRepository.findById(registerRequest.getSemesterId()).orElse(null))
                .build();

        userRepository.save(user);

        // Send verification email
        if (registerRequest.getEmail() != null && !registerRequest.getEmail().isEmpty()) {
            try {
                emailService.sendVerificationEmail(registerRequest.getEmail(), verificationToken);
            } catch (Exception e) {
                // Log the error but don't fail registration
                System.err.println("Failed to send verification email: " + e.getMessage());
            }
        }

        return "User registered successfully! Please check your email to verify your account.";
    }

    @Transactional
    public String verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        userRepository.save(user);

        return "Email verified successfully! You can now log in.";
    }
}
