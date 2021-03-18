package com.ssafy.eeum.category.dto.response;

import com.ssafy.eeum.category.domain.Category;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class CategoryResponse {
    private Long id;
    private String word;
    private String categoryImageUrl;

    public CategoryResponse(Long id, String word, String categoryImageUrl) {
        this.id = id;
        this.word = word;
        this.categoryImageUrl = categoryImageUrl;
    }

    public static CategoryResponse of(Category category) {
        return new CategoryResponse(category.getId(),category.getWord(),category.getCategoryImageUrl());
    }

    public static List<CategoryResponse> listOf(List<Category> categories){
        List<CategoryResponse> categoryResponses = new ArrayList<>();

        for (Category category : categories) {
            categoryResponses.add(of(category));
        }
        return categoryResponses;
    }
}


