package com.cinema.cinemanagement.controller;

import com.cinema.cinemanagement.model.Role;
import com.cinema.cinemanagement.model.Status;
import com.cinema.cinemanagement.model.User;
import com.cinema.cinemanagement.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userRequest) {
        try {
            Role role;
            Status status;
            String username = userRequest.get("username");
            String password = userRequest.get("password");
            String roleHolder = userRequest.get("role");
            String fullName = userRequest.get("fullName");
            String email = userRequest.get("email");
            String phoneNumber = userRequest.get("phoneNumber");
            String statusHolder = userRequest.get("status");

            if(roleHolder.equals("MANAGER")) {
                role = Role.valueOf("MANAGER");
            } else if (roleHolder.equals("CLEANER")) {
                role = Role.valueOf("CLEANER");
            } else {
                role = Role.valueOf("RECEPTIONIST");
            }

            if(statusHolder.equals("ACTIVE")) {
                status = Status.valueOf("ACTIVE");
            } else if (statusHolder.equals("BUSY")) {
                status = Status.valueOf("BUSY");
            } else {
                status = Status.valueOf("NOT_ACTIVE");
            }

            User newUser = userService.registerUser(username, password, role, fullName, email, phoneNumber,
                                        status);

            return ResponseEntity.ok(Map.of(
                    "message", "User registered successfully",
                    "username", newUser.getUsername(),
                    "role", newUser.getRole()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/edit/{id}")
    public User editUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        return userService.editUser(id, updatedUser);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return  ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}