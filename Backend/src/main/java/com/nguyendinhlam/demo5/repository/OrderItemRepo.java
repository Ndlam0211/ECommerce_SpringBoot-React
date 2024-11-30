package com.nguyendinhlam.demo5.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nguyendinhlam.demo5.entity.OrderItem;

@Repository

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {

}
