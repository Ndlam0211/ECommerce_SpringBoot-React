package com.nguyendinhlam.demo5.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nguyendinhlam.demo5.config.AppConstants;
import com.nguyendinhlam.demo5.entity.Category;
import com.nguyendinhlam.demo5.payloads.CategoryDTO;
import com.nguyendinhlam.demo5.payloads.CategoryResponse;
import com.nguyendinhlam.demo5.service.CategoryService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody Category category) {
        CategoryDTO savedCategoryDTO = categoryService.createCategory(category);
        return new ResponseEntity<>(savedCategoryDTO, HttpStatus.CREATED);
    }

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getCategories(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_CATEGORIES_BY) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder) {

        CategoryResponse categoryResponse = categoryService.getCategories(
                pageNumber == 0 ? pageNumber : pageNumber - 1,
                pageSize,
                sortBy = "id",
                // "id".equals(sortBy) ? "categoryId" : sortBy,
                sortOrder);

        return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
    }

    @GetMapping("/public/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> getOneCategory(@PathVariable Long categoryId) {
        CategoryDTO categoryDTO = categoryService.getCategoryById(categoryId);

        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }

    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@Valid @RequestBody Category category,
            @PathVariable Long categoryId) {

        CategoryDTO categoryDTO = categoryService.updateCategory(category, categoryId);
        return new ResponseEntity<CategoryDTO>(categoryDTO, HttpStatus.OK);
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        String status = categoryService.deleteCategory(categoryId);
        return new ResponseEntity<String>(status, HttpStatus.OK);
    }
}
