package com.ssafy.eeum.category.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.category.dto.request.CategoryUpdateRequest;
import com.ssafy.eeum.category.dto.response.CategoryResponse;
import com.ssafy.eeum.category.service.CategoryService;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import com.sun.istack.NotNull;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

/**
 * com.ssafy.eeum.category.controller
 * CategoryController.java
 * @date    2021-04-07 오후 5:06
 * @author  차수연
 *
 * @변경이력
 **/

@Api(tags = {"3. Category"})
@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CategoryService categoryService;

    @PostMapping("")
    @ApiOperation(value = "카테고리 등록",
            notes = "카테고리 정보를 전달받아 새 카테고리 등록")
    public ResponseEntity<Long> saveCategory(@ApiIgnore @CurrentAccount Account account, String word, MultipartFile image) throws Exception {
        Long categoryNo = null;
        categoryNo = categoryService.save(account, word, image);
        return ResponseEntity.ok().body(categoryNo);
    }

    @GetMapping("")
    @ApiOperation(value = "카테고리 조회",
            notes = "카테고리 목록을 조회한다.")
    public ResponseEntity<List<CategoryResponse>> getCategoryList(@ApiIgnore @CurrentAccount Account account) {
        List<CategoryResponse> categoryResponses = categoryService.findList(account);
        return ResponseEntity.ok().body(categoryResponses);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "카테고리 수정",
            notes = "수정하려는 카테고리 이름과 id를 전달 받아 해당 카테고리 정보 수정")
    public ResponseEntity<Void> updateCategory(@PathVariable @NotNull Long id, @RequestBody @Valid CategoryUpdateRequest categoryUpdateRequest) {
        categoryService.updateCategory(id, categoryUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "카테고리 한 개 삭제", notes = "카테고리의 id를 전달받아 해당 카테고리를 삭제")
    public ResponseEntity<String>deleteCategory(@PathVariable @NotNull Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}