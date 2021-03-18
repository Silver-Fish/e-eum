package com.ssafy.eeum.category.controller;

import com.ssafy.eeum.category.dto.request.CategoryRequest;
import com.ssafy.eeum.category.dto.request.CategoryUpdateRequest;
import com.ssafy.eeum.category.dto.response.CategoriesResponse;
import com.ssafy.eeum.category.dto.response.CategoryResponse;
import com.ssafy.eeum.category.dto.response.Response;
import com.ssafy.eeum.category.service.CategoryService;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@ApiResponses(value = {
        @ApiResponse(code = 401, message = "Unauthorized", response = Response.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Response.class),
        @ApiResponse(code = 404, message = "Not Found", response = Response.class),
        @ApiResponse(code = 500, message = "Failure", response = Response.class)})

@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("")
    @ApiOperation(value = "카테고리 등록",
            notes = "카테고리 정보를 전달받아 새 카테고리 등록",
            response = Response.class)
    public ResponseEntity<String> category(@Valid @RequestBody CategoryRequest categoryRequest) {
        categoryService.save(categoryRequest);
        return new ResponseEntity<String>("Created", HttpStatus.CREATED);
    }

    @GetMapping("")
    @ApiOperation(value = "카테고리 조회",
            notes = "카테고리 목록을 조회한다.",
            response = Response.class)
    public Object getCategory() {
        ResponseEntity response = null;
        try {
            CategoriesResponse categoriesResponse = categoryService.getCategoryList();
            final Response result = new Response("success", "카테고리 목록 조회에 성공하였습니다.", categoriesResponse);
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            final Response result = new Response("error", "카테고리 목록 조회 실패", null);
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "카테고리 수정",
            notes = "수정하려는 카테고리 이름과 이미지를 전달 받아 해당 카테고리 정보 수정",
            response = Response.class)
    public Object updateCategory(HttpServletRequest request, @PathVariable @NotNull Long id, @RequestBody @Valid CategoryUpdateRequest categoryUpdateRequest) {
        ResponseEntity response = null;
        try {
//            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
//            if (no != null) {
//                if (no.equals(categoryService.findById(id).getUser().getNo())) {
                    CategoryResponse returnCategory = categoryService.updateCategory(id, categoryUpdateRequest);
                    final Response result = new Response("Success", "카테고리 게시글 정보 수정 성공", returnCategory);
                    response = new ResponseEntity<>(result, HttpStatus.OK);
//                } else {
//                    final Response result = new Response("error", "카테고리를 수정할 수 있는 권한이 없습니다.", null);
//                    response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
//                }
//            } else {
//                final Response result = new Response("error", "유효하지 않은 토큰 값입니다.", null);
//                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            } catch (Exception e) {
                final Response result = new Response("error", "카테고리 정보 수정 실패", null);
                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }
            return response;
        }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "카테고리 한 개 삭제", notes = "카테고리의 id를 전달받아 해당 카테고리를 삭제", response = Response.class)
//    public Object deleteCategory(HttpServletRequest request, @PathVariable @NotNull Long id) {
    public ResponseEntity<String>deleteCategory(@PathVariable @NotNull Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
//        ResponseEntity response = null;
//        try {
////            Long no = (long) jwtUtil.getNo(cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME).getValue());
////            if (no != null) {
////                if (no.equals(categoryService.findById(id).getUser().getNo())) {
////                    categoryService.deleteCategory(id);
//                    final Response result = new Response("Success", "카테고리 정보 삭제 성공", null);
//                    response = new ResponseEntity<>(result, HttpStatus.OK);
////                } else {
////                    final Response result = new Response("error", "카테고리 정보를 삭제할 수 있는 권한이 없습니다.", null);
////                    response = new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
////                }
////            } else {
////                final Response result = new Response("error","유효하지 않은 토큰 값입니다.", null);
////                response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
////            }
//        } catch (Exception e) {
//            final Response result = new Response("error", "카테고리 정보 삭제 실패", null);
//            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//        }
//        return response;
//    }
}