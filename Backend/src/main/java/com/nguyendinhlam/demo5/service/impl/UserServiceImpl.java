package com.nguyendinhlam.demo5.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.nguyendinhlam.demo5.config.AppConstants;
import com.nguyendinhlam.demo5.entity.Address;
import com.nguyendinhlam.demo5.entity.Cart;
import com.nguyendinhlam.demo5.entity.Role;
import com.nguyendinhlam.demo5.entity.User;
import com.nguyendinhlam.demo5.exceptions.APIException;
import com.nguyendinhlam.demo5.exceptions.ResourceNotFoundException;
import com.nguyendinhlam.demo5.payloads.AddressDTO;
import com.nguyendinhlam.demo5.payloads.CartDTO;
import com.nguyendinhlam.demo5.payloads.ProductDTO;
import com.nguyendinhlam.demo5.payloads.UserDTO;
import com.nguyendinhlam.demo5.payloads.UserReponse;
import com.nguyendinhlam.demo5.repository.AddressRepo;
import com.nguyendinhlam.demo5.repository.RoleRepo;
import com.nguyendinhlam.demo5.repository.UserRepo;
import com.nguyendinhlam.demo5.service.CartService;
import com.nguyendinhlam.demo5.service.UserService;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private CartService cartService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        try {
            // Map UserDTO to User
            User user = modelMapper.map(userDTO, User.class);

            // Create a new Cart and associate it with the user
            Cart cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);

            // Fetch the role and set it to the user
            Role role = roleRepo.findById(AppConstants.USER_ID)
                    .orElseThrow(() -> new ResourceNotFoundException("Role", "id", AppConstants.USER_ID));
            user.getRoles().add(role);

            // Get address details from userDTO
            String country = userDTO.getAddress().getCountry();
            String state = userDTO.getAddress().getState();
            String city = userDTO.getAddress().getCity();
            String pincode = userDTO.getAddress().getPincode();
            String street = userDTO.getAddress().getStreet();
            String buildingName = userDTO.getAddress().getBuildingName();

            // Check if the address already exists
            Address address = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(
                    country, state, city, pincode, street, buildingName);

            if (address == null) {
                // Create a new address if it doesn't exist
                address = new Address(country, state, city, pincode, street, buildingName);
                address = addressRepo.save(address);
            }

            // Associate the address with the user
            user.setAddresses(List.of(address));

            // Save the user and update the cart
            User registeredUser = userRepo.save(user);
            cart.setUser(registeredUser);

            // Map the registered user back to UserDTO
            userDTO = modelMapper.map(registeredUser, UserDTO.class);
            userDTO.setAddress(
                    modelMapper.map(user.getAddresses().stream().findFirst().orElse(null), AddressDTO.class));

            return userDTO;

        } catch (DataIntegrityViolationException e) {
            throw new APIException("User already exists with emailId: " + userDTO.getEmail());
        }
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
            userDTO.setAddress(
                    modelMapper.map(user.getAddresses().stream().findFirst().orElse(null), AddressDTO.class));
        }

        if (user.getCart() != null) {
            CartDTO cartDTO = modelMapper.map(user.getCart(), CartDTO.class);
            List<ProductDTO> products = user.getCart().getCartItems().stream()
                    .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
                    .collect(Collectors.toList());
            cartDTO.setProducts(products);
            userDTO.setCartDTO(cartDTO);
        }

        return userDTO;
    }

    @Override
    public UserReponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<User> pageUsers = userRepo.findAll(pageDetails);
        List<User> users = pageUsers.getContent();
        if (users.size() == 0) {
            throw new APIException("No User exists !!!");
        }
        List<UserDTO> userDTOS = users.stream().map(user -> {
            UserDTO dto = modelMapper.map(user, UserDTO.class);
            if (user.getAddresses().size() != 0) {
                dto.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
            }
            // CartDTO cart modelMapper.map(user.getCart(), CartDTO.class);
            // List<ProductDTO> products user.getCart().getCartItems().stream()
            // .map(item> modelMapper.map(item.getProduct(),
            // ProductDTO.class)).collect(Collectors.toList());
            // dto.setCart(cart);
            // dto.getCart().setProducts (products);
            return dto;
        }).collect(Collectors.toList());
        UserReponse userResponse = new UserReponse();
        userResponse.setContent(userDTOS);
        userResponse.setPageNumber(pageUsers.getNumber());
        userResponse.setPageSize(pageUsers.getSize());
        userResponse.setTotalElements(pageUsers.getTotalElements());
        userResponse.setTotalPages(pageUsers.getTotalPages());
        userResponse.setLastPage(pageUsers.isLast());
        return userResponse;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
        // CartDTO cart modelMapper.map(user.getCart(), CartDTO.class);
        // List<ProductDTO> products user.getCart().getCartItems().stream()
        // .map(item-> modelMapper.map(item.getProduct(),
        // ProductDTO.class)).collect(Collectors.toList());
        // userDTO.setCart(cart);
        // userDTO.getCart().setProducts (products);
        return userDTO;
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        String encodedPass = passwordEncoder.encode(userDTO.getPassword());

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setEmail(userDTO.getEmail());
        user.setPassword(encodedPass);

        if (userDTO.getAddress() != null) {
            String country = userDTO.getAddress().getCountry();
            String state = userDTO.getAddress().getCity();
            String city = userDTO.getAddress().getState();
            String pincode = userDTO.getAddress().getPincode();
            String street = userDTO.getAddress().getStreet();
            String buildingName = userDTO.getAddress().getBuildingName();
            Address address = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(country, state,
                    city, pincode, street, buildingName);
            if (address == null) {
                address = new Address(country, state, city, pincode, street, buildingName);
                address = addressRepo.save(address);
                user.setAddresses(List.of(address));
            }
        }
        userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
        // CartDTO cart modelMapper.map(user.getCart(), CartDTO.class);
        // List<ProductDTO> products user.getCart().getCartItems().stream()
        // .map(item-> modelMapper.map(item.getProduct(), ProductDTO.class)).collect
        // (Collectors.toList());
        // userDTO.setCart(cart);
        // userDTO.getCart().setProducts (products);
        return userDTO;
    }

    @Override
    public String deleteUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        // List<CartItem> cartItems user.getCart().getCartItems();
        // Long cartId user.getCart().getCartId();
        // cartItems.forEach(item -> {
        // Long productId item.getProduct().getProductId();
        // cartService.deleteProductFromCart(cartId, productId);
        // });
        userRepo.delete(user);
        return "User with userId H + userId + deleted successfully!!!";
    }
}
