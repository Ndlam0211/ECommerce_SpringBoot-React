package com.nguyendinhlam.demo5.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyendinhlam.demo5.entity.Category;

public interface CategoryRepo extends JpaRepository<Category, Long> {

    Category findByCategoryName(String categoryName);

}
