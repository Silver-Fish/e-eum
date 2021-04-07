package com.ssafy.eeum.category.dto.request;

import com.ssafy.eeum.category.domain.Category;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * com.ssafy.eeum.category.dto.request
 * CategoryUpdateRequest.java
 * @date    2021-04-07 오후 4:47
 * @author  차수연
 *
 * @변경이력
 **/
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
