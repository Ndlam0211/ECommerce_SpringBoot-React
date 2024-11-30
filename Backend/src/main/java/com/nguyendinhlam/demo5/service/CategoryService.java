package com.nguyendinhlam.demo5.service;

import com.nguyendinhlam.demo5.entity.Category;
import com.nguyendinhlam.demo5.payloads.CategoryDTO;
import com.nguyendinhlam.demo5.payloads.CategoryResponse;

public interface CategoryService {
    CategoryDTO createCategory(Category category);

    CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    CategoryDTO updateCategory(Category category, Long categoryId);

    CategoryDTO getCategoryById(Long categoryId);

    String deleteCategory(Long categoryId);
}
