package com.nec.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.nec.Entity.User;
import com.nec.Repository.UserRepository;
import com.nec.dto.UserResponse;

@Service
public class UserService {

    @Autowired
    private UserRepository userrepository;
    
    
    public User updateProfile(String email, String mobileNumber, Integer yearOfStudy) {
        User user = userrepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setMobileNumber(mobileNumber);
        user.setYearOfStudy(yearOfStudy);

        return userrepository.save(user);
    }

    public User getUserByEmail1(String email) {
        return userrepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 🔍 Search by email
    public UserResponse getUserByEmail(String email) {
        User user = userrepository.findByEmail(email).orElse(null);
        if (user == null) return null;

        return new UserResponse(
            user.getUserId(),
            user.getUsername(),
            user.getEmail(),
            user.getCreatedAt()
        );
    }

    // 📦 Recent users (offset + limit)
    public List<UserResponse> getRecentUsers(int offset, int limit) {

        return userrepository
            .findAllByOrderByUserIdDesc(PageRequest.of(offset / limit, limit))
            .getContent()
            .stream()
            .map(user -> new UserResponse(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt()
            ))
            .collect(Collectors.toList());
    }
    
    public Optional<User> authenticate(String email, String password) {

        Optional<User> userOpt = userrepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (user.getPasswordHash().equals(password)) { // keeping your logic
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}
