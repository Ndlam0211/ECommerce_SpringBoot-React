package com.nguyendinhlam.demo5.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.nguyendinhlam.demo5.entity.Category;
import com.nguyendinhlam.demo5.entity.Product;
import com.nguyendinhlam.demo5.exceptions.APIException;
import com.nguyendinhlam.demo5.exceptions.ResourceNotFoundException;
import com.nguyendinhlam.demo5.payloads.CategoryDTO;
import com.nguyendinhlam.demo5.payloads.CategoryResponse;
import com.nguyendinhlam.demo5.repository.CategoryRepo;
import com.nguyendinhlam.demo5.service.CategoryService;
import com.nguyendinhlam.demo5.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDTO createCategory(Category category) {
        if (category == null || category.getCategoryName() == null || category.getCategoryName().isEmpty()) {
            throw new APIException("Invalid category data.");
        }

        Category existingCategory = categoryRepo.findByCategoryName(category.getCategoryName());

        if (existingCategory != null) {
            throw new APIException("Category with the name '" + category.getCategoryName() + "' already exists!");
        }

        Category savedCategory = categoryRepo.save(category);
        log.info("Category created with ID: {}", savedCategory.getId());
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        Optional<Category> categoryOptional = categoryRepo.findById(categoryId);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            return modelMapper.map(category, CategoryDTO.class);
        } else {
            throw new ResourceNotFoundException("Category", "categoryId", categoryId);
        }
        }

    @Override
    public CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = Sort.by(sortBy);
        sort = sortOrder.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);
        Page<Category> pageCategories = categoryRepo.findAll(pageDetails);

        List<Category> categories = pageCategories.getContent();

        if (categories.isEmpty()) {
            throw new APIException("No categories found!");
        }

        List<CategoryDTO> categoryDTOs = categories.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOs);
        categoryResponse.setPageNumber(pageCategories.getNumber());
        categoryResponse.setPageSize(pageCategories.getSize());
        categoryResponse.setTotalElements(pageCategories.getTotalElements());
        categoryResponse.setTotalPages(pageCategories.getTotalPages());
        categoryResponse.setLastPage(pageCategories.isLast());

        return categoryResponse;
    }

    @Override
    public CategoryDTO updateCategory(Category category, Long categoryId) {
        Category savedCategory = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        category.setId(categoryId);
        savedCategory = categoryRepo.save(category);

        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public String deleteCategory(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        List<Product> products = category.getProducts();
        products.forEach(product -> productService.deleteProduct(product.getProductId()));

        categoryRepo.delete(category);

        log.info("Category deleted with ID: {}", categoryId);
        return "Category with ID " + categoryId + " deleted successfully!";
    }
}
