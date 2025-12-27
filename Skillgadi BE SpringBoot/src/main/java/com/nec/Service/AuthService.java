package com.nec.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nec.Entity.User;
import com.nec.Repository.UserRepository;

import jakarta.mail.MessagingException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailservice;

    // ================= REGISTER =================
    public boolean register(User user) throws MessagingException {

        if (userRepository.existsByEmail(user.getEmail())) {
            return false;
        }

        User u = new User();
        u.setUsername(user.getUsername());
        u.setEmail(user.getEmail());
        u.setPasswordHash(user.getPasswordHash()); // plain for now
        u.setGender(user.getGender());
        u.setMobileNumber(user.getMobileNumber());
        u.setRole(User.Role.USER);

        userRepository.save(u);
        emailservice.sendGreetingMail(u.getEmail());

        return true;
    }

    // ================= AUTHENTICATE (SINGLE SOURCE) =================
    public Optional<User> authenticate(String email, String password) {

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return Optional.empty();
        }

        User user = userOpt.get();

        // ✅ Plain-text comparison (as per your current setup)
        if (user.getPasswordHash().equals(password)) {
            return Optional.of(user);
        }

        return Optional.empty();
    }
}
