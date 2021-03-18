package com.ssafy.eeum.category.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.category.dto.request.CategoryUpdateRequest;
import com.ssafy.eeum.category.dto.response.CategoriesResponse;
import com.ssafy.eeum.category.dto.response.CategoryResponse;
import com.ssafy.eeum.category.repository.CategoryRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Value("${file.path}")
    private String filePath;

    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;

    // 카테고리 등록
    @Transactional
    public Long save(String email, String word, MultipartFile image) throws IOException {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> {return new NotFoundException(ErrorCode.USER_NOT_FOUND);});

        Category category = Category.builder().word(word).build();
        categoryRepository.save(category);
        account.addCategory(category);

        String imageUrl = "category/" + category.getId();
        category.setCategoryImageUrl(imageUrl);
        categoryRepository.save(category);

        File file = new File(filePath+imageUrl);
        file.createNewFile();
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(image.getBytes());
        fos.close();

        return category.getId();
    }

    // 카테고리 조회
    @Transactional
    public CategoriesResponse getCategoryList() {
        List<Category> categories;
        categories = categoryRepository.findAll();
        return new CategoriesResponse(categories);
    }

    public CategoriesResponse searchCategory(String email) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> {return new NotFoundException(ErrorCode.USER_NOT_FOUND);});
        List<Category> categories = categoryRepository.findByAccount(account);
        return new CategoriesResponse(categories);
    }

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