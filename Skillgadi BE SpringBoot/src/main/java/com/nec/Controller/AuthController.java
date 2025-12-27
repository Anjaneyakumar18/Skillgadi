package com.nec.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nec.Entity.User;
import com.nec.Service.AuthService;
import com.nec.dto.AuthResponsedto;
import com.nec.security.JwtUtil;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= ADMIN LOGIN =================
    @PostMapping("/admin")
    public ResponseEntity<?> admin(@RequestBody User user) {

        Optional<User> adminUser =
                authService.authenticate(user.getEmail(), user.getPasswordHash());

        if (adminUser.isEmpty()
                || adminUser.get().getRole() != User.Role.ADMIN) {

            return ResponseEntity.status(401)
                    .body("Invalid admin credentials");
        }

        User admin = adminUser.get();

        String token = jwtUtil.generateToken(
                admin.getEmail(),     // ✅ EMAIL
                "ADMIN"
        );

        return ResponseEntity.ok(
                new AuthResponsedto(
                        token,
                        admin.getUsername(),
                        "ADMIN"
                )
        );
    }

    // ================= USER REGISTER =================
    @PostMapping("/register")
    public String register(@RequestBody User user)
            throws MessagingException {

        return authService.register(user)
                ? "User registered successfully"
                : "Email already exists";
    }

    // ================= USER LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> authUser =
                authService.authenticate(
                        user.getEmail(),
                        user.getPasswordHash()
                );

        if (authUser.isEmpty()) {
            return ResponseEntity.status(401)
                    .body("Invalid credentials");
        }

        User u = authUser.get();

        String token = jwtUtil.generateToken(
                u.getEmail(),                 // ✅ EMAIL
                u.getRole().name()
        );

        return ResponseEntity.ok(
                new AuthResponsedto(
                        token,
                        u.getUsername(),
                        u.getRole().name()
                )
        );
    }
}
