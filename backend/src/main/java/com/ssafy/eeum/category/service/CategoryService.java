package com.ssafy.eeum.category.service;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.account.repository.AccountRepository;
import com.ssafy.eeum.card.domain.AccountCard;
import com.ssafy.eeum.category.domain.Category;
import com.ssafy.eeum.category.dto.request.CategoryUpdateRequest;
import com.ssafy.eeum.category.dto.response.CategoriesResponse;
import com.ssafy.eeum.category.dto.response.CategoryResponse;
import com.ssafy.eeum.category.repository.CategoryRepository;
import com.ssafy.eeum.common.exception.ErrorCode;
import com.ssafy.eeum.common.exception.NotFoundException;
import com.ssafy.eeum.common.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

/**
 * com.ssafy.eeum.category.service
 * CategoryService.java
 * @date    2021-04-07 오후 5:11
 * @author  차수연
 *
 * @변경이력
 **/

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    @Value("${file.path}")
    private String filePath;

    @Value("${file.defaultpath}")
    private String defaultPath;

    @Value("${eeum.defaultemail}")
    private String defaultEmail;

    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;

    // 카테고리 등록
    public Long save(Account account, String word, MultipartFile image) throws Exception {
        account = findAccount(account.getEmail());
        Category category = Category.builder().word(word).account(account).build();
        categoryRepository.save(category);

        if (image != null && !image.isEmpty()) {
            String imageUrl = account.getId() + "/category/" + category.getId();
            category.setCategoryImageUrl(imageUrl);
            categoryRepository.save(category);

            File folder = new File(filePath + account.getId() + "/category");
            log.info(folder.mkdirs() ? "success make dir" : "fail make dir");

            File file = new File(filePath + imageUrl);
            log.info(filePath + imageUrl);
            log.info(file.createNewFile() ? "success make file" : "fail make file");
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(image.getBytes());
            fos.close();
        } else {
            category.setCategoryImageUrl(defaultPath);
        }

        return category.getId();
    }

    // 카테고리 조회
    @Transactional(readOnly = true)
    public List<CategoryResponse> findList(Account account) {
        List<Category> categories = null;
        account = findAccount(account == null ? defaultEmail : account.getEmail());
        categories = account.getCategories();
        return CategoryResponse.listOf(categories);
    }

    public CategoriesResponse searchCategory(String email) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.USER_NOT_FOUND);
                });
        List<Category> categories = categoryRepository.findByAccount(account);
        return new CategoriesResponse(categories);
    }

    // 카테고리 수정
    public void updateCategory(Long id, CategoryUpdateRequest categoryUpdateRequest) {
        Category category = findById(id);
        Category requestCategory = categoryUpdateRequest.toCategory();
        category.update(requestCategory);
    }

    private Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow();
    }

    // 카테고리 삭제
    public void deleteCategory(Long id) {
        Category category = findCategory(id);
        Account account = category.getAccount();
        account.deleteCategory(category);

        category.getCards().stream().forEach(card -> {
            ImageUtil.deleteFile(filePath, card.getImageUrl());
        });
        ImageUtil.deleteFile(filePath, category.getCategoryImageUrl());

        categoryRepository.deleteById(id);
    }

    private Account findAccount(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.USER_NOT_FOUND);
                });
    }

    private Category findCategory(Long typeId) {
        return categoryRepository.findById(typeId)
                .orElseThrow(() -> {
                    return new NotFoundException(ErrorCode.CATEGORY_NOT_FOUND);
                });
    }
}