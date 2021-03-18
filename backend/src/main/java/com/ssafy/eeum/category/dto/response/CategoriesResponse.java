package com.ssafy.eeum.category.dto.response;

import com.ssafy.eeum.category.domain.Category;
import lombok.Getter;

import java.util.List;

@Getter
public class CategoriesResponse {
    List<CategoryResponse> categories;

    public CategoriesResponse(List<Category> categories) {
        this.categories = CategoryResponse.listOf(categories);
    }
}
