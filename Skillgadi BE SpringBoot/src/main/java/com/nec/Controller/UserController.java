package com.nec.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nec.Entity.User;
import com.nec.Service.UserService;
import com.nec.dto.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userservice;

    @GetMapping("/profile")
    public User getProfile(@RequestParam String email) {
        return userservice.getUserByEmail1(email);
    }

    // Update phone + year
    @PostMapping("/update-profile")
    public User updateProfile(@RequestBody UpdateProfileRequest req) {
        return userservice.updateProfile(
                req.getEmail(),
                req.getMobileNumber(),
                req.getYearOfStudy()
        );
    }
    
    
    // 🔍 Search user by email
    @GetMapping("/search")
    public UserResponse searchByEmail(@RequestParam String email) {
        return userservice.getUserByEmail(email);
    }

    // 📦 Recent users with pagination
    @GetMapping("/recent")
    public List<UserResponse> getRecentUsers(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "20") int limit) {

        return userservice.getRecentUsers(offset, limit);
    }
}
