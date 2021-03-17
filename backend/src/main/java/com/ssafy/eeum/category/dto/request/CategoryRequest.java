package com.ssafy.eeum.category.dto.request;

import com.ssafy.eeum.category.domain.Category;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "카테고리 등록 모델")
public class CategoryRequest {
    @ApiModelProperty(value = "단어")
    @NotBlank
    @Length(max = 10, message = "단어의 최대 길이는 10자 입니다.")
    private String word;

    @ApiModelProperty(value = "이미지")
    private String categoryImageUrl;

    public CategoryRequest(@NotBlank @Length(max = 10, message = "단어의 최대 길이는 10자 입니다.") String word, String categoryImageUrl) {
        this.word = word;
        this.categoryImageUrl = categoryImageUrl;
    }

    public Category toCategory() {
        return Category.builder()
                .word(word)
                .categoryImageUrl(categoryImageUrl)
                .build();
    }
}