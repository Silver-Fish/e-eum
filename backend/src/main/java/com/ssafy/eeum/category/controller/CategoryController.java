package com.ssafy.eeum.category.controller;

import com.ssafy.eeum.category.dto.request.CategoryRequest;
import com.ssafy.eeum.category.dto.response.Response;
import com.ssafy.eeum.category.service.CategoryService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
public class CategoryController {
    private CategoryService categoryService;

    @PostMapping("/category")
    @ApiOperation(value = "카테고리 등록",
            notes = "카테고리 정보를 전달받아 새 카테고리 등록",
            response = Response.class)
    public Object saveCategory(HttpServletRequest request, @Valid @RequestBody CategoryRequest categoryRequest) {
        ResponseEntity response = null;
        return response;
    }
//    @GetMapping("URL")
//    @ApiOperation(value = "",
//            notes = "",
//            response = Response.class)
//    public Object getCategories()
}