package com.nguyendinhlam.demo5.service;

import com.nguyendinhlam.demo5.payloads.UserDTO;
import com.nguyendinhlam.demo5.payloads.UserReponse;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO);

    UserDTO getUserByEmail(String email);

    UserReponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserDTO getUserById(Long userId);

    UserDTO updateUser(Long userId, UserDTO userDTO);

    String deleteUser(Long userId);
}
