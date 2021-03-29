package com.ssafy.eeum.category.dto.request;

import com.ssafy.eeum.category.domain.Category;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@Getter
@ApiModel(description = "카테고리 수정 모델")
public class CategoryUpdateRequest {

    @ApiModelProperty(value = "단어")
    @NotBlank
    @Length(max = 10, message = "카테고리 이름의 총 길이는 10자 입니다.")
    private String word;

    public Category toCategory(){
        return Category.builder()
                .word(word)
                .build();
    }
}
