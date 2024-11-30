package com.nguyendinhlam.demo5.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyendinhlam.demo5.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
    Page<Product> findByProductNameLike(String keyword, Pageable pageDetails);

    Page<Product> findByCategoryId(Long categoryId, Pageable pageDetails);
}
