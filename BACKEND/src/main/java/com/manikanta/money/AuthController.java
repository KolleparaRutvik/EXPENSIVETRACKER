package com.manikanta.money;

import com.manikanta.money.LoginRequest;
import com.manikanta.money.LoginResponse;
import com.manikanta.money.RegisterRequest;
import com.manikanta.money.User;
import com.manikanta.money.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.frontend.origin:http://localhost:3000}")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest req) {
        try {
            User u = userService.register(req.name, req.email, req.password);
            Map<String, Object> resp = new HashMap<>();
            resp.put("id", u.getId());
            resp.put("name", u.getName());
            resp.put("email", u.getEmail());
            return ResponseEntity.ok(resp);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest req) {
        try {
            User u = userService.authenticate(req.email, req.password);
            LoginResponse lr = new LoginResponse(u.getId(), u.getName(), u.getEmail());
            return ResponseEntity.ok(lr);
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(Map.of("error", ex.getMessage()));
        }
    }
}
