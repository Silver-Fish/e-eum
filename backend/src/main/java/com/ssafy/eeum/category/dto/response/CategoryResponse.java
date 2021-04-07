package com.ssafy.eeum.category.dto.response;

import com.ssafy.eeum.category.domain.Category;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

/**
 * com.ssafy.eeum.category.dto.response
 * CategoryResponse.java
 * @date    2021-04-07 오후 4:47
 * @author  차수연
 *
 * @변경이력
 **/
@Getter
public class CategoryResponse {
    private Long id;
    private String word;

    public CategoryResponse(Long id, String word, String categoryImageUrl) {
        this.id = id;
        this.word = word;
    }

    public static CategoryResponse of(Category category) {
        return new CategoryResponse(category.getId(), category.getWord(), category.getCategoryImageUrl());
    }

    public static List<CategoryResponse> listOf(List<Category> categories) {
        List<CategoryResponse> categoryResponses = new ArrayList<>();

        for (Category category : categories) {
            categoryResponses.add(of(category));
        }
        return categoryResponses;
    }
}