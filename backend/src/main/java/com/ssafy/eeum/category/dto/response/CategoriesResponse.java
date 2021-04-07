package com.ssafy.eeum.category.dto.response;

import com.ssafy.eeum.category.domain.Category;
import lombok.Getter;

import java.util.List;

/**
 * com.ssafy.eeum.category.dto.response
 * CategoriesResponse.java
 * @date    2021-04-07 오후 4:47
 * @author  차수연
 *
 * @변경이력
 **/
@Getter
public class CategoriesResponse {
    List<CategoryResponse> categories;

    public CategoriesResponse(List<Category> categories) {
        this.categories = CategoryResponse.listOf(categories);
    }
}
