package com.ssafy.eeum.category.service;

import com.ssafy.eeum.category.exception.CategoryNotFound;
import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.category.dto.request.CategoryRequest;
import com.ssafy.eeum.category.dto.request.CategoryUpdateRequest;
import com.ssafy.eeum.category.dto.response.CategoryResponse;
import com.ssafy.eeum.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // 카테고리 등록
    // Users 없어서
    @Transactional
    public Long save(CategoryRequest categoryRequest) {
        Category category = categoryRequest.toCategory();
//        category.setUser(user);
        categoryRepository.save(category);

        return category.getId();
    }

    // 카테고리 조회
//    @Transactional
//    public CategoriesResponse getCategory(Long cursorId) {
////        Pageable page = PageRequest.of(0, Constant.PAGE_SIZE.getValue());
//        List<Category> categories;
//        categories = categoryRepository.findById(cursorId);
//
//        return new CategoriesResponse(categories);
//    }

    // 카테고리 수정
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryUpdateRequest categoryUpdateRequest) {
        Category category = findById(id);
        Category requestCategory = categoryUpdateRequest.toCategory();

        Category updatedCategory = category.update(requestCategory);
        return CategoryResponse.of(updatedCategory);
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow();
    }

    // 카테고리 삭제
    @Transactional
    public void deleteCategory(Long id) { categoryRepository.deleteById(id); }
}