package com.dnanh01.backend.service;
import java.util.List;
import com.dnanh01.backend.exception.UserException;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.request.ChangePasswordRequest;

public interface UserService {

    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

    public User getUserByEmail(String email) throws UserException;
    
    public User changePassword(Long userId, ChangePasswordRequest req) throws UserException;
    
    public boolean validatePassword(Long userId, ChangePasswordRequest req) throws UserException;
    
    public User updateUserProfile(Long userId, User req) throws UserException;

    public List<User> getAllUser();
}
