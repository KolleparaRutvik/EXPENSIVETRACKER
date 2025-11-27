package com.manikanta.money;

import com.manikanta.money.User;
import com.manikanta.money.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String name, String email, String rawPassword) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        String hash = passwordEncoder.encode(rawPassword);
        User u = new User(name, email, hash);
        return userRepository.save(u);
    }

    public User authenticate(String email, String rawPassword) {
        Optional<User> maybe = userRepository.findByEmail(email);
        if (maybe.isEmpty()) throw new RuntimeException("Invalid credentials");
        User user = maybe.get();
        if (passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            return user;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
