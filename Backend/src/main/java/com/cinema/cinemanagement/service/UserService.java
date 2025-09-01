package com.cinema.cinemanagement.service;

import com.cinema.cinemanagement.exception.MovieDuplicateException;
import com.cinema.cinemanagement.exception.MovieNotFoundException;
import com.cinema.cinemanagement.model.Role;
import com.cinema.cinemanagement.model.Status;
import com.cinema.cinemanagement.model.User;
import com.cinema.cinemanagement.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String username, String password, Role role, String fullName, String email,
                             String phoneNumber, Status status) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setStatus(status);
        user.setEnabled(true);

        return userRepository.save(user);
    }

    public User editUser(Long id, User updatedUser) {
        User existing = getUserById(id);

        boolean isDuplicate = userRepository.existsByUsername(updatedUser.getUsername());

        if (isDuplicate) {
            throw new MovieDuplicateException("A user with the same username already exists");
        }

        existing.setUsername(updatedUser.getUsername());
        existing.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        existing.setRole(updatedUser.getRole());
        existing.setFullName(updatedUser.getFullName());
        existing.setEmail(updatedUser.getEmail());
        existing.setPhoneNumber(updatedUser.getPhoneNumber());
        existing.setStatus(updatedUser.getStatus());
        existing.setEnabled(updatedUser.isEnabled());
        return userRepository.save(existing);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUseById(Long id) {
        return userRepository.findById(id);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).
                orElseThrow(() -> new MovieNotFoundException("User with the id " + id + " not found."));
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}