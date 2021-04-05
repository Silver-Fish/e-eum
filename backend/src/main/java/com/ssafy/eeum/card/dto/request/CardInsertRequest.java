package com.ssafy.eeum.card.dto.request;

import com.ssafy.eeum.card.domain.Card;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * com.ssafy.eeum.card.dto.request
 * CardInsertRequest.java
 *
 * @author 이아영
 * @date 2021-03-18 오후 3:10
 * @변경이력
 **/

@NoArgsConstructor
@Getter
@ApiModel(description = "카드 등록 모델")
public class CardInsertRequest {
    @ApiModelProperty(value = "단어")
    @NotBlank
    @Length(max = 10, message = "단어의 최대 길이는 10자입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣? ]*$",message = "단어는 영어 대소문자,숫자,한글,?,공백만 가능합니다.")
    private String word;

    public CardInsertRequest(@NotBlank @Length(max = 10, message = "단어의 최대 길이는 10자입니다.") String word) {
        this.word = word;
    }

    public Card toCard() {
        return Card.builder()
                .word(word)
                .build();
    }
}
