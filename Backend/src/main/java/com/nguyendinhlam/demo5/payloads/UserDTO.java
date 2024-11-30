package com.nguyendinhlam.demo5.payloads;

import java.util.HashSet;
import java.util.Set;

import com.nguyendinhlam.demo5.entity.Cart;
import com.nguyendinhlam.demo5.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String email;
    private String password;
    private Set<Role> roles = new HashSet<>();
    private AddressDTO address;
    public CartDTO cartDTO;
}
