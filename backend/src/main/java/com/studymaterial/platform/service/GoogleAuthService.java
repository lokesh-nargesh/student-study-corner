package com.studymaterial.platform.service;

import com.studymaterial.platform.dto.JwtResponse;
import com.studymaterial.platform.entity.Role;
import com.studymaterial.platform.entity.User;
import com.studymaterial.platform.repository.UserRepository;
import com.studymaterial.platform.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    @Value("${google.client-id:}")
    private String googleClientId;

    /**
     * Verifies Google ID token and creates/logins the user. The frontend sends
     * the Google credential (ID token) after Google Sign-In. We verify it by
     * calling Google's tokeninfo endpoint.
     */
    public JwtResponse authenticateGoogleUser(String idToken) {
        // Verify token with Google
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> payload;
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = restTemplate.getForObject(
                    "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken,
                    Map.class
            );
            payload = result;
        } catch (Exception e) {
            throw new RuntimeException("Invalid Google token");
        }

        if (payload == null || !googleClientId.equals(payload.get("aud"))) {
            throw new RuntimeException("Invalid Google token audience");
        }

        String googleId = (String) payload.get("sub");
        String email = (String) payload.get("email");
        String name = (String) payload.get("name");

        // Find or create user
        Optional<User> existingUser = userRepository.findByGoogleId(googleId);
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
        } else {
            // Check if a user with same email exists
            Optional<User> emailUser = userRepository.findByEmail(email);
            if (emailUser.isPresent()) {
                user = emailUser.get();
                user.setGoogleId(googleId);
                user.setEmailVerified(true);
                userRepository.save(user);
            } else {
                user = new User();
                user.setName(name != null ? name : "Google User");
                user.setEmail(email);
                user.setGoogleId(googleId);
                user.setCollegeId("G-" + googleId.substring(0, Math.min(8, googleId.length())));
                user.setPassword(""); // No password for Google users
                user.setRole(Role.STUDENT);
                user.setEmailVerified(true);
                userRepository.save(user);
            }
        }

        String jwt = jwtUtils.generateToken(user);
        return new JwtResponse(jwt, user.getId(), user.getCollegeId(), user.getName(), user.getRole().name());
    }
}
