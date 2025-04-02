
package com.qcmcreator.qcmapi.controller;

import com.qcmcreator.qcmapi.dto.request.LoginRequest;
import com.qcmcreator.qcmapi.dto.request.SignupRequest;
import com.qcmcreator.qcmapi.dto.response.JwtResponse;
import com.qcmcreator.qcmapi.dto.response.MessageResponse;
import com.qcmcreator.qcmapi.dto.response.UserResponse;
import com.qcmcreator.qcmapi.model.ERole;
import com.qcmcreator.qcmapi.model.Role;
import com.qcmcreator.qcmapi.model.User;
import com.qcmcreator.qcmapi.repository.RoleRepository;
import com.qcmcreator.qcmapi.repository.UserRepository;
import com.qcmcreator.qcmapi.security.TokenUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private TokenUtils tokenUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);
        
        if (user == null || !loginRequest.getPassword().equals(user.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Invalid username or password!"));
        }

        String token = tokenUtils.generateToken(user.getUsername(), user.getId());
        
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user account
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());  // Note: In a real app, you should hash this password

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);
        
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            String token = headerAuth.substring(7);
            
            if (tokenUtils.validateToken(token)) {
                String username = tokenUtils.getUsernameFromToken(token);
                Long userId = tokenUtils.getUserIdFromToken(token);
                
                User user = userRepository.findByUsername(username).orElse(null);
                
                if (user != null) {
                    return ResponseEntity.ok(new UserResponse(
                            user.getId(), 
                            user.getUsername(), 
                            user.getEmail()
                    ));
                }
            }
        }
        
        return ResponseEntity.status(401).body(new MessageResponse("Not authenticated"));
    }
}
