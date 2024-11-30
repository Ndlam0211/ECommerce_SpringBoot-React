package com.nguyendinhlam.demo5.service.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nguyendinhlam.demo5.entity.Cart;
import com.nguyendinhlam.demo5.entity.Category;
import com.nguyendinhlam.demo5.entity.Product;
import com.nguyendinhlam.demo5.exceptions.APIException;
import com.nguyendinhlam.demo5.exceptions.ResourceNotFoundException;
import com.nguyendinhlam.demo5.payloads.CartDTO;
import com.nguyendinhlam.demo5.payloads.ProductDTO;
import com.nguyendinhlam.demo5.payloads.ProductResponse;
import com.nguyendinhlam.demo5.repository.CartRepo;
import com.nguyendinhlam.demo5.repository.CategoryRepo;
import com.nguyendinhlam.demo5.repository.ProductRepo;
import com.nguyendinhlam.demo5.service.CartService;
import com.nguyendinhlam.demo5.service.FileService;
import com.nguyendinhlam.demo5.service.ProductService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartService cartService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${project.image}")
    private String path;

    @Override
    public ProductDTO addProduct(Long categoryId, Product product) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        boolean isProductNotPresent = category.getProducts().stream()
                .noneMatch(p -> p.getProductName().equals(product.getProductName())
                        && p.getDescription().equals(product.getDescription()));

        if (isProductNotPresent) {
            product.setImage("default.png");
            product.setCategory(category);

            Double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
            product.setSpecialPrice(specialPrice);

            Product savedProduct = productRepo.save(product);
            return modelMapper.map(savedProduct, ProductDTO.class);
        } else {
            throw new APIException("Product already exists!");
        }
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

        Page<Product> pageProducts = productRepo.findAll(pageDetails);
        List<ProductDTO> productDTOs = pageProducts.getContent().stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());

        return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
                pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
    }

    @Override
    public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy,
            String sortOrder) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

        Page<Product> pageProducts = productRepo.findByCategoryId(categoryId, pageDetails);
        List<Product> products = pageProducts.getContent();

        if (products.isEmpty()) {
            throw new APIException(category.getCategoryName() + " category doesn't contain any products!");
        }

        List<ProductDTO> productDTOs = products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());

        return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
                pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
    }

    @Override
    public ProductResponse searchProductByKeyword(
                    String keyword,
                    Long categoryId,
                    Integer pageNumber,
                    Integer pageSize,
                    String sortBy,
                    String sortOrder) {
            // Create a Sort object based on sortBy and sortOrder
            Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Order.asc(sortBy) : Sort.Order.desc(sortBy));

            // Create a Pageable object with pagination and sorting details
            Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

            // Fetch products that match the keyword from the repository
            Page<Product> pageProducts = productRepo.findByProductNameLike("%" + keyword + "%", pageDetails);

            // Filter products by category if categoryId is provided
            List<Product> products = pageProducts.getContent();
            if (categoryId != null && categoryId != 0) {
                    products = products.stream()
                                    .filter(product -> product.getCategory() != null
                                                    && product.getCategory().getId() != null
                                                    && product.getCategory().getId().equals(categoryId))
                                    .collect(Collectors.toList());
            }

            // Map filtered products to ProductDTO
            List<ProductDTO> productDTOs = products.stream()
                            .map(product -> modelMapper.map(product, ProductDTO.class))
                            .collect(Collectors.toList());

            // Prepare the ProductResponse
            ProductResponse productResponse = new ProductResponse();
            productResponse.setContent(productDTOs);
            productResponse.setPageNumber(pageProducts.getNumber());
            productResponse.setPageSize(pageProducts.getSize());
            productResponse.setTotalElements(pageProducts.getTotalElements());
            productResponse.setTotalPages((int) Math.ceil((double) pageProducts.getTotalElements() / pageSize));
            productResponse.setLastPage(pageProducts.isLast());

            return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, Product product) {
        // Fetch the existing product from the database
        Product productFromDB = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        // Check if the product was found
        if (productFromDB == null) {
                throw new APIException("Product not found with productId: " + productId);
        }

        // Update product details
        product.setImage(productFromDB.getImage());
        product.setProductId(productId);
        product.setCategory(productFromDB.getCategory());

        // Calculate the special price
        double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
        product.setSpecialPrice(specialPrice);

        // Save the updated product
        Product savedProduct = productRepo.save(product);

        // Fetch carts containing the product
        List<Cart> carts = cartRepo.findCartsByProductId(productId);

        // Map carts to CartDTOs and update cart items
        List<CartDTO> cartDTOs = carts.stream().map(cart -> {
                CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
                List<ProductDTO> products = cart.getCartItems().stream()
                .map(cartItem -> modelMapper.map(cartItem.getProduct(), ProductDTO.class))
                .collect(Collectors.toList());
                cartDTO.setProducts(products);
                return cartDTO;
        }).collect(Collectors.toList());

        // Update product in carts
        cartDTOs.forEach(cartDTO -> cartService.updateProductInCarts(cartDTO.getCartId(), productId));

        // Return the updated product as a ProductDTO
        return modelMapper.map(savedProduct, ProductDTO.class);
    }


    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        String fileName = fileService.uploadImage(path, image);
        product.setImage(fileName);

        Product updatedProduct = productRepo.save(product);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

    @Override
    public String deleteProduct(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        List<Cart> carts = cartRepo.findCartsByProductId(productId);
        carts.forEach(cart -> cartService.deleteProductFromCart(cart.getCartId(), productId));

        productRepo.delete(product);
        return "Product with ID " + productId + " deleted successfully!";
    }

    @Override
    public InputStream getProductImage(String fileName) throws FileNotFoundException {
        return fileService.getResource(path, fileName);
    }

    @Override
    public ProductDTO getProductById(Long productId){
        Optional<Product> productOptional = productRepo.findById(productId);

        if(productOptional.isPresent()){
                Product product = productOptional.get();
                return modelMapper.map(product,ProductDTO.class);
        }else{
                throw new ResourceNotFoundException("Product", "productId", productId);
        }
    }
}
