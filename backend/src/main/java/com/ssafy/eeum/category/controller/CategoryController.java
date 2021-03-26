package com.ssafy.eeum.category.controller;

import com.ssafy.eeum.account.domain.Account;
import com.ssafy.eeum.category.dto.request.CategoryUpdateRequest;
import com.ssafy.eeum.category.dto.response.CategoriesResponse;
import com.ssafy.eeum.category.dto.response.CategoryResponse;
import com.ssafy.eeum.category.service.CategoryService;
import com.ssafy.eeum.common.annotation.CurrentAccount;
import com.sun.istack.NotNull;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;

@Api(tags = {"3. Category"})
@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CategoryService categoryService;

    @PostMapping("")
    @ApiOperation(value = "카테고리 등록",
            notes = "카테고리 정보를 전달받아 새 카테고리 등록",
            response = ResponseEntity.class)
    public ResponseEntity<Long> saveCategory(@CurrentAccount Account account, String word, MultipartFile image) throws Exception {
        Long categoryNo = null;
        categoryNo = categoryService.save(account, word, image);
        return ResponseEntity.ok().body(categoryNo);
    }

    @GetMapping("")
    @ApiOperation(value = "카테고리 조회",
            notes = "카테고리 목록을 조회한다.",
            response = ResponseEntity.class)
    public ResponseEntity<Object> getCategoryList(Authentication authentication) {
        CategoriesResponse categoryResponses = categoryService.getCategoryList();
        return ResponseEntity.ok().body(categoryResponses);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "카테고리 수정",
            notes = "수정하려는 카테고리 이름과 이미지를 전달 받아 해당 카테고리 정보 수정",
            response = ResponseEntity.class)
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id, @RequestBody CategoryUpdateRequest categoryUpdateRequest) {
        categoryService.updateCategory(id, categoryUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "카테고리 한 개 삭제", notes = "카테고리의 id를 전달받아 해당 카테고리를 삭제", response = ResponseEntity.class)
    public ResponseEntity<String>deleteCategory(@PathVariable @NotNull Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}

//    @GetMapping("")
//    @ApiOperation(value = "카테고리 조회",
//            notes = "카테고리 목록을 조회한다.",
//            response = ResponseEntity.class)
////    public ResponseEntity<List<CategoryResponse>> getCategoryList(@CurrentAccount Account account, @RequestParam(required = false) Long id) {
////        List<CategoryResponse> categoryResponses = categoryService.getCategoryList(account,id);
////        return null;
////    }
//    public Object getCategory() {
//        ResponseEntity response = null;
//            CategoriesResponse categoriesResponse = categoryService.getCategoryList();
////            final ResponseEntity result = new ResponseEntity("success", "카테고리 목록 조회에 성공하였습니다.", categoriesResponse);
////            response = new ResponseEntity<>(result, HttpStatus.OK);
//        return CategoryResponse.listOf(categoriesResponse);
//    }
//    public ResponseEntity<?> searchCategory(Authentication authentication) {
//        CategoriesResponse categoriesResponse = categoryService.searchCategory((String) authentication.getPrincipal());
//        final Response result = new Response("success", "카테고리 목록 조회에 성공하였습니다.", categoriesResponse);
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
//    public Object updateCategory(HttpServletRequest request, @PathVariable @NotNull Long id, @RequestBody @Valid CategoryUpdateRequest categoryUpdateRequest) {
//        ResponseEntity response = null;
//            CategoryResponse returnCategory = categoryService.updateCategory(id, categoryUpdateRequest);
//            final Response result = new Response("Success", "카테고리 게시글 정보 수정 성공", returnCategory);
//            response = new ResponseEntity<>(result, HttpStatus.OK);
//            return response;
//        }