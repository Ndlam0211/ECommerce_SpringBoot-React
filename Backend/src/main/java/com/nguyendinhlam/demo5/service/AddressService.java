package com.nguyendinhlam.demo5.service;

import java.util.List;

import com.nguyendinhlam.demo5.entity.Address;
import com.nguyendinhlam.demo5.payloads.AddressDTO;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO);

    List<AddressDTO> getAddresses();

    AddressDTO getAddress(Long addressId);

    AddressDTO updateAddress(Long addressId, Address address);

    String deleteAddress(Long addressId);
}
