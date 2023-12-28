package com.dnanh01.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dnanh01.backend.config.JwtProvider;
import com.dnanh01.backend.exception.UserException;
import com.dnanh01.backend.model.Order;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.repository.UserRepository;
import com.dnanh01.backend.request.ChangePasswordRequest;

@Service
public class UserServiceImplementation implements UserService {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder;

    public UserServiceImplementation(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findUserById(Long userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        }
        throw new UserException("User not found with id - " + userId);
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserException("User not found with email - " + email);
        }
        return user;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

@Override
public List<User> getAllUser() {
	return userRepository.findAll();
}
    @Override
    public boolean validatePassword(Long userId, ChangePasswordRequest req) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Retrieve the hashed password from the user
            String hashedPassword = user.getPassword();
            String currentPassword = req.getOldPassword();

            // Use the PasswordEncoder to compare the raw password with the hashed password
            return passwordEncoder.matches(currentPassword, hashedPassword);
        }

        // Handle the case when the user is not found (throw exception or return false)
        return false;
    }

    @Override
    public User changePassword(Long userId, ChangePasswordRequest req) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Hash the new password
            String hashedPassword = passwordEncoder.encode(req.getNewPassword());

            // Set the new hashed password for the user
            user.setPassword(hashedPassword);

            // Save the updated user to the repository
            return userRepository.save(user);
        }

        // Handle the case when the user is not found (throw exception or return null)
        return null;
    }
    @Override
    public User updateUserProfile(Long userId, User req) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Cập nhật thông tin cá nhân từ request
            user.setFirstName(req.getFirstName());
            user.setLastName(req.getLastName());
           // user.setEmail(req.getEmail());
            user.setMobile(req.getMobile());

            // Lưu người dùng đã cập nhật vào cơ sở dữ liệu
            return userRepository.save(user);
        }

        // Handle the case when the user is not found (throw exception or return null)
        return null;
    }
    
}
