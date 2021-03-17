package com.ssafy.eeum.category.service;

import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.category.dto.request.CategoryRequest;
import com.ssafy.eeum.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    // 카테고리 등록
    // Users 없어서
    @Transactional
    public Long save(CategoryRequest categoryRequest) {
        Category category = categoryRequest.toCategory();
//        category.setUser(user);
        categoryRepository.save(category);

        return category.getId();
    }
}
